# 云托管平台 Deploy Hook 部署

如果你习惯将主题代码仓直接托管在 Cloudflare Pages、Vercel、腾讯云 EdgeOne 或 Netlify 等平台，并由平台自身的构建机拉取内容进行静态打包，你可以使用**部署钩子触发模式**。

在这种模式下，内容仓库每次推送更新，会自动向托管平台的 Deploy Hook 发送请求，平台接收到请求后自动启动构建流程。

```mermaid
sequenceDiagram
    autonumber
    actor Author as 博主
    participant ContentRepo as 个人内容仓库
    participant Hosting as 托管平台构建机
    participant ThemeRepo as 主题代码仓库

    Author->>ContentRepo: git push 推送文章或配置修改
    ContentRepo->>ContentRepo: 运行内容语法与格式校验
    ContentRepo->>Hosting: 发送 POST 请求触发 Deploy Hook
    Hosting->>ThemeRepo: 克隆主题代码仓库
    Hosting->>ContentRepo: 通过 CONTENT_REPO_URL 拉取最新内容
    Hosting->>Hosting: 执行配置覆盖与静态打包
    Hosting->>Hosting: 发布并更新全球 CDN 节点
```

---

## 1. Cloudflare Pages 配置步骤

### 第一步：导入项目与构建设置
1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)；
2. 进入 **Compute (Workers & Pages)** -> **Create** -> 选择 **Pages** 选项卡（**严禁选择 Worker 模式**）；
3. 连接你的 GitHub 账号，并选择你的主题代码仓库（例如 `Shirone`）；
4. 配置构建设置：
   - **Framework preset**：选择 **None** 或 **Astro**；
   - **Build command**：`pnpm run build`
   - **Build output directory**：`dist`

![Cloudflare Pages 创建与设置](../../images/04-deploy/02-hook/02-pages-deploy.png)
*图 1-1：Cloudflare Pages 构建参数配置*

### 第二步：配置构建环境变量
在项目创建向导或 **Settings** -> **Environment variables** 中，添加以下环境变量：

| 环境变量名 | 推荐值 | 说明 |
| :--- | :--- | :--- |
| `NODE_VERSION` | `22` | **必填**，指定 Node.js 22 运行环境 |
| `GIT_TERMINAL_PROMPT` | `0` | **必填**，防止 Git 产生终端交互等待 |
| `CONTENT_REPO_URL` | `https://x-access-token:你的令牌@github.com/用户名/内容仓名.git` | **私有内容仓必填**，附带访问令牌的克隆地址 |
| `BILI_SESSDATA` | `你的凭证` | *可选*，用于追番私密列表同步 |

![Cloudflare 环境变量配置](../../images/04-deploy/02-hook/06-env-config.png)
*图 1-2：配置构建环境变量*

### 第三步：创建 Deploy Hook
1. 进入该 Pages 项目的 **Settings** -> **Builds & deployments**；
2. 向下滚动找到 **Deploy hooks**，点击 **Add deploy hook**；
3. 填写名称（如 `content-update`），分支选择 `main`，点击 **Add hook**；
4. 复制生成的 Webhook URL。

![Cloudflare Deploy Hook 配置](../../images/04-deploy/02-hook/07-deploy-hook-config.png)
*图 1-3：创建并复制 Deploy Hook 地址*

### 第四步：在 GitHub 内容仓库中配置 Secret
1. 打开你的 **GitHub 私有内容仓库** -> **Settings** -> **Secrets and variables** -> **Actions**；
2. 点击 **New repository secret**；
3. 填写配置项：
   - **Name**：必须填入 `CLOUDFLARE_DEPLOY_HOOK`（全大写）
   - **Secret**：粘贴刚才复制的 Cloudflare 部署钩子 URL；
4. 点击 **Add secret** 保存。

---

## 2. Vercel 配置步骤

### 第一步：导入项目与构建设置
1. 登录 [Vercel 控制台](https://vercel.com/)，点击 **Add New...** -> **Project**；
2. 导入你的主题代码仓库；
3. 构建命令填入 `pnpm run build`，输出目录填入 `dist`。

### 第二步：配置构建环境变量
在 **Environment Variables** 设置中添加：

| 环境变量名 | 推荐值 | 说明 |
| :--- | :--- | :--- |
| `NODE_VERSION` | `22` | 指定 Node 运行版本 |
| `GIT_TERMINAL_PROMPT` | `0` | 防止终端交互等待 |
| `CONTENT_REPO_URL` | `https://x-access-token:你的令牌@github.com/用户名/内容仓名.git` | **私有仓必填** |
| `BILI_SESSDATA` | `你的凭证` | *可选* |

### 第三步：创建 Deploy Hook
1. 进入项目 **Settings** -> **Git**；
2. 找到 **Deploy Hooks** 区域，点击 **Create Hook**；
3. 填写 Hook 名称与分支 `main`，点击 **Create** 并复制生成的 URL。

### 第四步：在 GitHub 内容仓库中配置 Secret
在私有内容仓库的 **Settings** -> **Secrets and variables** -> **Actions** 中添加：
- **Name**：`VERCEL_DEPLOY_HOOK`
- **Secret**：粘贴复制的 Vercel Deploy Hook URL。

---

## 3. 腾讯云 EdgeOne Pages 配置步骤

### 第一步：创建 Pages 应用
1. 登录 [腾讯云 EdgeOne 控制台](https://console.cloud.tencent.com/edgeone/pages)；
2. 点击 **新建 Pages 应用**，授权并绑定你的主题代码仓库；
3. 构建命令填入 `pnpm run build`，产物目录填入 `dist`。

### 第二步：配置环境变量
在构建设置中添加 `NODE_VERSION`、`GIT_TERMINAL_PROMPT` 与 `CONTENT_REPO_URL`。

### 第三步：创建部署钩子触发器
1. 进入应用的 **触发器** 设置页面；
2. 新建 **部署钩子**，选择分支为 `main`；
3. 保存并复制生成的触发 URL。

![EdgeOne 钩子创建位置](../../images/04-deploy/02-hook/12-edgeone-deploy-hook.png)
*图 3-1：腾讯云 EdgeOne 部署钩子配置*

### 第四步：在 GitHub 内容仓库中配置 Secret
在私有内容仓库的 **Settings** -> **Secrets and variables** -> **Actions** 中添加：
- **Name**：`EDGEONE_DEPLOY_HOOK`
- **Secret**：粘贴复制的 EdgeOne 部署钩子 URL。

---

## 4. Netlify 配置步骤

### 第一步：导入项目与构建设置
1. 登录 [Netlify 控制台](https://app.netlify.com/)，点击 **Add new site** -> **Import an existing project**；
2. 选择 **GitHub** 并授权选择你的主题代码仓库；
3. 配置构建命令为 `pnpm run build`，输出目录为 `dist`。

### 第二步：配置构建环境变量
在 **Site configuration** -> **Environment variables** 中添加 `NODE_VERSION`、`GIT_TERMINAL_PROMPT` 与 `CONTENT_REPO_URL`。

### 第三步：创建 Build Hook
1. 进入项目的 **Site configuration** -> **Build & deploy** -> **Continuous deployment**；
2. 找到 **Build hooks**，点击 **Add build hook**；
3. 填写名称并将分支指定为 `main`，点击 **Save** 并复制生成的 Webhook URL。

### 第四步：在 GitHub 内容仓库中配置 Secret
在私有内容仓库的 **Settings** -> **Secrets and variables** -> **Actions** 中添加：
- **Name**：`NETLIFY_DEPLOY_HOOK`
- **Secret**：粘贴复制的 Netlify Webhook URL。

---

## 自动化工作流与密钥对照总结

内容仓自动化触发工作流 [`.github/workflows/trigger-build.yml`](../../../.github/workflows/trigger-build.yml) 中支持的部署密钥对照：

| 托管平台 | GitHub Secret 变量名（严格匹配） | 触发机制说明 |
| :--- | :--- | :--- |
| **跨仓联动构建（推荐）** | `DISPATCH_TOKEN` | 通知主题代码仓通过 GitHub Actions 执行拉取、编译与发布 |
| **Cloudflare Pages** | `CLOUDFLARE_DEPLOY_HOOK` | 推送后向 Cloudflare Deploy Hook 发送 POST 请求触发重新拉取与构建 |
| **Vercel** | `VERCEL_DEPLOY_HOOK` | 推送后向 Vercel Deploy Hook 发送 POST 请求触发重新部署 |
| **腾讯云 EdgeOne** | `EDGEONE_DEPLOY_HOOK` | 推送后向 EdgeOne 部署钩子发送 POST 请求触发构建发布 |
| **Netlify** | `NETLIFY_DEPLOY_HOOK` | 推送后向 Netlify Build Hook 发送 POST 请求触发重新编译 |
