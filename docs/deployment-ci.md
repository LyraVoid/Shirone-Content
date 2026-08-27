# 自动化构建与持续集成部署

## 双仓构建工作流架构

Shirone 的双仓协同流水线由两部分组成：

```text
[个人内容仓库] ──git push──▶ [触发校验流水线] ──通过后──▶ [通知代码仓或部署钩子]
                                                            │
    ┌───────────────────────────────────────────────────────┘
    ▼
[主题代码仓 / 托管平台构建机]
    ├── 1. 拉取内容仓库对应提交
    ├── 2. 执行 pnpm content:sync 物化与深合并
    ├── 3. 执行 TypeScript 强类型静态检查
    ├── 4. 执行中文字体子集化与高保真压缩
    ├── 5. 生成全量 HTML/CSS 静态产物
    └── 6. 全球 CDN 边缘网络分发部署
```

---

## 方案 A：GitHub Actions 派发模式

推荐使用该方案。由代码仓的 GitHub Actions 流水线全权处理构建与打包，能够享受到全量中文字体切片压缩与静态优化的完整能力。

### 步骤一：创建个人访问令牌

1. 登录 GitHub，访问 **Settings -> Developer Settings -> Personal access tokens -> Fine-grained tokens**；
2. 点击 **Generate new token**；
3. 填写令牌名称，在 **Repository access** 中选择 **Only select repositories** 并选中你的**主题代码仓库**；
4. 在 **Permissions -> Repository permissions** 中将 **Contents** 权限设置为 **Access: Read and write**；
5. 生成并复制该令牌。

### 步骤二：在内容仓库配置密钥

1. 打开你的**内容仓库**页面；
2. 依次进入 **Settings -> Secrets and variables -> Actions**；
3. 点击 **New repository secret**；
4. 密钥名称填入 `DISPATCH_TOKEN`，值为刚才复制的访问令牌。

配置完成后，每次向内容仓库 `main` 分支推送提交，`.github/workflows/trigger-build.yml` 会自动通知代码仓启动构建。

---

## 方案 B：托管平台部署钩子直连模式

如果你将主题代码仓库直接关联到了托管平台，例如 Cloudflare Pages、Vercel、EdgeOne，并希望在内容仓库推送时由平台构建机直接拉取内容进行构建，可配置对应的平台部署钩子。

### 1. Cloudflare Pages

1. 登录 Cloudflare 控制台，进入你的 Pages 项目；
2. 进入 **Settings -> Builds & deployments -> Deploy hooks**；
3. 点击 **Add deploy hook**，设置分支为 `main` 并生成钩子链接；
4. 在内容仓 Actions 密钥中添加 `CLOUDFLARE_DEPLOY_HOOK`，值为该链接。

### 2. Vercel

1. 登录 Vercel 控制台，进入你的项目；
2. 进入 **Settings -> Git -> Deploy Hooks**；
3. 输入名称并指定分支为 `main`，点击 **Create Hook**；
4. 在内容仓 Actions 密钥中添加 `VERCEL_DEPLOY_HOOK`，值为该链接。

### 3. 腾讯云 EdgeOne Pages

1. 登录 EdgeOne 控制台，进入你的 Pages 应用；
2. 进入应用设置中的触发器管理；
3. 创建新的部署钩子，获取 Webhook 地址；
4. 在内容仓 Actions 密钥中添加 `EDGEONE_DEPLOY_HOOK`，值为该地址。

### 4. Netlify

1. 登录 Netlify 控制台，进入 **Site configuration -> Build & deploy -> Continuous deployment -> Build hooks**；
2. 点击 **Add build hook**，指定分支为 `main`；
3. 在内容仓 Actions 密钥中添加 `NETLIFY_DEPLOY_HOOK`，值为该链接。

---

## 平台构建机环境变量配置

若采用在平台构建机拉取私有内容仓的方式，需在平台的项目环境变量中配置以下参数：

| 环境变量名 | 示例值 | 说明 |
| --- | --- | --- |
| `NODE_VERSION` | `22` | 指定 Node 运行环境版本，建议 20 或 22 |
| `GIT_TERMINAL_PROMPT` | `0` | 禁止 Git 在终端发生交互式密码询问 |
| `CONTENT_REPO_URL` | `https://x-access-token:ghp_xxx@github.com/USER/content-repo.git` | 带访问凭据的内容仓库 Git 地址 |
| `BILI_SESSDATA` | `xxxx` | 可选的 Bilibili 追番同步凭证 |

---

## 安全规范与最佳实践

1. **私密凭据绝不上库**：所有个人访问令牌、Cookie 或 API 密钥必须严格保存在 GitHub Secrets 或平台的加密环境变量中，绝对禁止明文提交至 Git 仓库中的任何 YAML 或 Markdown 文件；
2. **最小权限原则**：生成的个人访问令牌仅需授予主题代码仓的 Contents 读写权限，切勿使用全权限经典令牌；
3. **隔离生效验证**：`docs/` 目录以及仓库根目录的 `README.md` 已被流水线触发器与同步脚本自动排除，日常修改文档不会消耗构建额度。
