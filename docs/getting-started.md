# 快速入门指南

## 什么是内容分离架构

传统的静态博客通常将主题代码、静态资源、插件依赖与博主个人的文章、配置混合存储在同一个 Git 仓库中。这种结构会导致以下痛点：

1. **主题升级困难**：上游主题发布新功能或修复缺陷时，合并上游提交极易发生代码冲突；
2. **隐私泄露风险**：公开主题仓库容易误将私密文章、敏感配置或未公开照片推送到公网；
3. **协作边界模糊**：内容创作者被迫接触复杂的打包工具与框架代码。

Shirone 采用内容与代码完全解耦的双仓架构：
- **主题代码仓库**：开源公开，负责组件实现、样式渲染、打包构建与多端部署流水线；
- **个人内容仓库**：私有存储，仅负责存放博主个人的 Markdown 文章、动态、相册、YAML 配置文件与多媒体资源。

---

## 第一步：创建内容仓库

1. 在 GitHub 上创建一个新的私有仓库（例如命名为 `my-blog-content`）；
2. 克隆本官方模板仓库到本地；
3. 将本地远程仓库地址修改为你新建的私有仓库并完成首次推送：

```bash
git remote set-url origin git@github.com:YOUR_USERNAME/my-blog-content.git
git push -u origin main
```

---

## 第二步：理解目录职责

| 目录路径 | 用途说明 | 物化目标路径 |
| --- | --- | --- |
| `config/` | 覆盖全站各功能领域的 YAML 配置文件 | 编译进 `src/user/user-config.ts` |
| `content/` | 文章、动态说说与独立页面文案 | `src/content/` |
| `data/` | 页面纯内容数据实体（如设备、友链、音乐） | `src/data/` |
| `assets/` | 本地图片（参与构建期格式转换与压缩优化） | `src/assets/` |
| `public/` | 静态媒体资源（直接由 Web 服务器对外分发） | `public/` |
| `docs/` | 教程说明文档（不参与站点构建与同步） | 无 |

---

## 第三步：本地开发与预览

在主题代码仓库根目录下，通过设置 `CONTENT_DIR` 环境变量指定内容仓库的本地绝对路径：

### 在 Windows PowerShell 中：

```powershell
# 指定本地内容仓库路径
$env:CONTENT_DIR = "D:\Code\my-blog-content"

# 执行一次全量增量同步
pnpm content:sync

# 启动本地开发预览服务器
pnpm dev
```

### 在 macOS / Linux Bash 中：

```bash
export CONTENT_DIR="/path/to/my-blog-content"
pnpm content:sync
pnpm dev
```

### 边写边看（监听模式）：

在编写文章或调整配置时，可新开一个终端窗口运行监听命令。当内容仓库中的文件发生变更时，主题代码仓将自动执行增量物化并触发页面热重载：

```powershell
pnpm content:watch
```

---

## 第四步：完成首次发布

1. 修改 `config/site.yaml` 中的 `site`、`title` 等基础信息；
2. 修改 `config/profile.yaml` 中的个人资料；
3. 将修改提交并推送到你的内容仓库 `main` 分支；
4. 参照 [自动化构建与持续集成部署](./deployment-ci.md) 配置流水线密钥，即可完成全自动部署。
