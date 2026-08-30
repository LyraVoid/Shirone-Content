# 初始化私有内容仓库

搭建个人内容仓库有两种便捷途径：

- **方式一（强烈推荐）：使用 `content:eject` 一键解耦迁出** —— 如果你已经克隆或 Fork 了主题代码仓库，只需一条命令即可将文章、相册、自定义页面数据与基础配置自动抽离为标准的内容仓库；
- **方式二：从官方模板仓库直接克隆初始化** —— 适合直接从零起步、直接以双仓形态开始建站的博主。

---

## 方式一：使用 `content:eject` 一键解耦迁出（强烈推荐）

如果你已经拥有主题代码仓库（例如 `D:\Code\Shirone`），使用主题内置的解耦向导是最优雅、最省心的初始化方式。

### 为什么推荐 `content:eject`？
- **全自动结构组装**：自动提取文章、动态、相册、数据实体，并生成合规的 `shirone.content.json` 清单与 GitHub Actions 自动化触发工作流；
- **最小化配置安全导出**：仅导出 `site.yaml` 与 `profile.yaml` 等核心身份标识，绝不把主题默认值写死，确保未来主题升级平滑；
- **代码仓安全防护**：自动在代码仓的 `.gitignore` 中追加忽略规则并安全取消 Git 跟踪，同时物理保留本地文件，本地开发预览完全不受影响；
- **自动绑定本地路径**：自动将代码仓的开发环境与迁出的外部目录建立本地关联。

---

### 第一步：在代码仓运行一键解耦命令

打开终端进入你的**主题代码仓库**根目录，运行解耦命令：

```powershell
# 1. 预演模式：查看即将迁出的文件清单（不修改磁盘）
pnpm.cmd content:eject

# 2. 确认无误后执行迁出（默认导出至上一级目录的 ../shirone-content）
pnpm.cmd content:eject --yes

# 提示：你也可以通过 --out 参数指定自定义导出路径，例如：
pnpm.cmd content:eject --yes --out "D:\Code\my-blog-content"
```

> macOS / Linux 用户请使用 `pnpm content:eject --yes`。

---

### 第二步：在 GitHub 上创建空白私有仓库

1. 登录 [GitHub](https://github.com/) 账号；
2. 点击右上角 **+** 号，选择 **New repository**；
3. 填写仓库信息：
   - **Repository name**：建议命名为 `my-blog-content` 或 `shirone-content`；
   - **Visibility**：**务必勾选 Private（私有仓库）**；
   - **Initialize this repository with**：**不要勾选**任何初始化选项（保持完全空白）；
4. 点击底部的 **Create repository** 创建仓库。

![GitHub 新建私有仓库界面](../../images/01-quickstart/02-init/01-github-create-repo.png)
*图 1-1：GitHub 新建私有仓库选项配置*

---

### 第三步：将导出的内容仓库推送到 GitHub

打开终端进入刚刚导出的内容仓库目录，执行 Git 初始化与推送：

```bash
# 1. 进入导出的外部内容目录
cd ../shirone-content

# 2. 初始化 Git 仓库并提交
git init -b main
git add .
git commit -m "feat: 初始化博客私有内容仓库"

# 3. 关联你的 GitHub 私有仓库地址并推送
git remote add origin git@github.com:你的用户名/my-blog-content.git
git push -u origin main
```

至此，你的独立私有内容仓库已全部初始化完毕。

---

## 方式二：从官方模板仓库克隆初始化

如果你希望从头开始建立一个全新的空白内容仓库，可以直接克隆官方模板仓库：

### 第一步：在 GitHub 上创建空白私有仓库
按照上述步骤在 GitHub 上创建一个空白的 Private 私有仓库（不要勾选任何初始化文件）。

![GitHub 空白仓库指引页面](../../images/01-quickstart/02-init/02-repo-initial-page.png)
*图 1-2：GitHub 空白仓库克隆指引页面*

### 第二步：克隆官方内容模板到本地
在电脑终端中运行：

```bash
# 1. 克隆官方内容模板仓库
git clone https://github.com/LyraVoid/Shirone-Content.git my-blog-content

# 2. 进入刚刚克隆下来的目录
cd my-blog-content
```

![终端运行克隆命令输出](../../images/01-quickstart/02-init/03-git-clone-output.png)
*图 1-3：克隆官方模板仓库到本地*

### 第三步：将远程地址重定向为你自己的私有仓库

```bash
# 将远程仓库 origin 的地址更换为你第一步创建的私有仓库地址
git remote set-url origin git@github.com:你的用户名/my-blog-content.git

# 验证远程地址是否修改成功
git remote -v
```

![个人仓库地址](../../images/01-quickstart/02-init/04-git-remote-output.png)
*图 1-4：验证远程仓库地址重定向*

### 第四步：推送首次提交到你的私有仓库

```bash
# 将模板内容推送到你的私有仓库 main 分支
git push -u origin main
```

![终端运行推送命令输出](../../images/01-quickstart/02-init/05-git-push-output.png)
*图 1-5：推送模板内容到个人私有仓库*

刷新 GitHub 页面，你将看到完整的目录结构已经全部准备就绪：

![GitHub 私有仓库最终页面](../../images/01-quickstart/02-init/06-repo-final-page.png)
*图 1-6：私有仓库初始化就绪页面*

---

## 内容仓库核心目录结构速查

无论采用哪种初始化方式，你的内容仓库均包含以下核心结构：

```text
my-blog-content/
├── .github/workflows/       # 自动触发构建的 GitHub Actions 脚本
│   └── trigger-build.yml.example # 跨仓触发工作流模板（去掉 .example 启用）
├── config/                  # 全站个性化配置 YAML 文件
│   ├── site.yaml            # 站点基本信息、色彩与横幅壁纸
│   └── profile.yaml         # 博主头像、昵称与社交链接
├── content/                 # 原创文章与生活动态
│   ├── posts/               # Markdown / MDX 格式博客长文
│   ├── moments/             # 动态生活说说
│   └── spec/                # 关于与友链申请文案
├── data/                    # 结构化数据实体（设备、友链、项目、技能等）
├── public/                  # 自定义相册照片与静态多媒体资源
└── shirone.content.json     # 内容仓库元数据标识文件
```

---

## 下一步

内容仓库创建完成后，请继续阅读：
- [03. 本地预览与实时调试](./03-local-preview.md) —— 在个人电脑上启动开发服务器，进行边写边看实时预览；
- [04. 命令行工具与协同工作流](./04-cli-workflows.md) —— 掌握日常写作、配置预检与导出的 CLI 命令行工具。
