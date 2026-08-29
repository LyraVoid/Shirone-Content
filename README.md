# Shirone 官方内容模板仓库

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Theme](https://img.shields.io/badge/Theme-Shirone-pink.svg)](https://github.com/LyraVoid/Shirone)
[![Schema](https://img.shields.io/badge/Schema-content--manifest.v1-purple.svg)](shirone.content.json)

这是 Shirone 博客主题的官方内容模板仓库，专为**内容与代码完全解耦**的双仓架构而设计。

在本架构下，博主所有的原创文章、生活动态、摄影相册、自定义页面数据与全站个性化配置均独立保存在本私有仓库中；主题的核心渲染引擎、视觉样式、工程依赖与持续集成流水线则由主题代码仓库统一维护。两者通过自动化流水线无缝连接，实现**文章隐私保护**、**上游无痛升级零冲突**以及**专注于内容创作**的现代博客体验。

---

## 教程与文档索引

本仓库内置了完整的中文教程体系，存放在 `docs/` 目录下（该目录已被自动化构建与同步流水线排除，阅读或修改不会触发线上构建计费）：

| 教程模块 | 入口链接 | 核心内容说明 |
| :--- | :--- | :--- |
| **快速入门** | [01-快速入门/](./docs/01-快速入门/) | 概念理解、`content:eject` 一键解耦迁出、本地预览与 CLI 工作流 |
| **全站配置** | [02-全站配置/](./docs/02-全站配置/) | 最小化配置覆盖原理、站点基础、导航侧栏、追番音乐、字体与评论 |
| **内容撰写** | [03-内容撰写/](./docs/03-内容撰写/) | 文章发布、动态说说、相册管理、数据实体维护与 Markdown 扩展排版语法 |
| **自动部署** | [04-自动部署/](./docs/04-自动部署/) | GitHub Actions 派发模式、托管平台部署钩子与常见排错手册 |
| **教程全景** | [完整使用指南](./docs/README.md) | 所有模块的全景导览与速查索引 |

---

## 目录结构与映射关系

本内容仓库与主题代码仓库之间的标准目录映射关系如下：

| 内容仓库路径 | 代码仓映射路径 | 职能说明 |
| :--- | :--- | :--- |
| `content/posts/` | `src/content/posts/` | Markdown 与 MDX 格式的长篇博客文章 |
| `content/moments/` | `src/content/moments/` | 生活动态说说与即时随笔 |
| `content/spec/` | `src/content/spec/` | 关于我与友链申请文案 |
| `config/` | `src/user/user-config.ts` | 各功能领域的 YAML 覆盖配置（构建期自动生成桥接层） |
| `data/` | `src/data/` | 设备、友链、项目、技能、时间线、罗盘等结构化数据 |
| `assets/` | `src/assets/` | 参与构建期优化与 WebP 压缩的本地图片资源 |
| `public/` | `public/` | 由 Web 服务器直接分发的静态多媒体与自定义相册 |
| `docs/` | 无（自动排除） | 教程与使用指南，不参与生产构建与同步 |
| `shirone.content.json` | 根目录元数据 | 内容仓库协议标识与挂载清单 |

---

## 快速起步

### 方式一：从现有博客一键解耦迁出（强烈推荐）

如果你已经在本地克隆或 Fork 了主题代码仓库，只需在代码仓根目录运行一条命令即可一键完成抽离：

```powershell
# 1. 运行一键解耦迁移向导（默认导出至上一级目录 ../shirone-content）
pnpm.cmd content:eject --yes

# 2. 进入导出的外部目录并推送到个人的 GitHub 私有仓库
cd ../shirone-content
git init -b main
git add .
git commit -m "feat: 初始化博客私有内容仓库"
git remote add origin git@github.com:你的用户名/my-blog-content.git
git push -u origin main
```

### 方式二：克隆官方模板仓库直接起步

如果你希望从零开始建立全新内容仓，可直接克隆本模板并重定向至个人的 GitHub 私有仓库：

```bash
git clone https://github.com/LyraVoid/Shirone-Content.git my-blog-content
cd my-blog-content
git remote set-url origin git@github.com:你的用户名/my-blog-content.git
git push -u origin main
```

---

## 本地开发与写作工作流

在主题代码仓库根目录下，通过环境变量指定内容仓路径即可启动日常写作与调试：

### 1. 单次同步与本地预览

在 Windows PowerShell 中：
```powershell
$env:CONTENT_DIR = "D:\Code\my-blog-content"
pnpm.cmd content:sync
pnpm.cmd dev
```

在 macOS / Linux Bash 中：
```bash
export CONTENT_DIR="/path/to/my-blog-content"
pnpm content:sync
pnpm dev
```

### 2. 实时增量监听（边写边看）

在第一个终端运行 `pnpm dev`，在第二个终端运行监听命令。保存文件时会自动完成同步并触发浏览器热重载：

```powershell
pnpm.cmd content:watch
```

### 3. 常用 CLI 命令速查

- `pnpm content:validate`：纯内存安全预检，快速排查 YAML 格式与字段拼写错误；
- `pnpm content:status`：检查当前内容源路径、连接状态与配置差异；
- `pnpm content:export`：按最小化覆盖原则将本地调试修改反向沉淀至内容仓；
- `pnpm content:clean`：清理代码仓内的本地同步缓存并自动创建快照备份。

---

## 配置覆盖核心原则

`config/` 目录下的每个 YAML 文件对应主题的一个功能模块，遵循**最小化覆盖原则**：

1. **按需定制**：只写想改的键，未声明字段自动继承主题默认值，平滑跟进主题升级；
2. **合并规则**：字典对象按层级递归合并，列表数组整体替换；
3. **类型安全**：构建期通过 TypeScript 严格校验，拼写错误时终端会给出纠错建议。

### 核心配置文件一览

- `site.yaml`：网站标题、副标题、默认背景模式、横幅壁纸多图轮播与背景纹理系统
- `profile.yaml`：博主头像、昵称、签名与社交平台链接
- `nav-bar.yaml`：顶部导航栏条目清单、预设条目（`LinkPresets`）与下拉子菜单
- `sidebar.yaml`：侧边栏单栏/双栏布局编排、组件清单与吸顶跟随
- `comment.yaml`：评论系统服务提供商与 Twikoo 连接参数
- `anime.yaml`：追番追剧页面主数据源与 Bilibili/Bangumi 同步策略
- `music.yaml`：侧栏音乐播放器模式（混合/本地/自定义/网易云歌单）
- `font.yaml`：全站中文字体、西文字体与全自动字体子集裁剪流水线
- `llms.yaml`：大语言模型与 AI 检索端点（/llms.txt 与 /llms-full.txt）及私密内容脱敏
- `footer.yaml` 与 `footer.html`：页脚自定义 HTML 片段注入

---

## 自动化构建与部署流水线

### 1. 派发密钥配置

在当前内容仓库的 **Settings -> Secrets and variables -> Actions** 中配置对应密钥：

- **方案 A（推荐，GitHub Actions 派发模式）**：
  配置 `DISPATCH_TOKEN`（个人访问令牌，需对主题代码仓拥有 Contents 读写权限）。内容推送后自动通知代码仓完成字体子集切片压缩、全量静态构建与发布上线。
- **方案 B（托管平台部署钩子模式）**：
  在 Cloudflare Pages、Vercel、腾讯云 EdgeOne 或 Netlify 等平台中配置部署钩子，并在本内容仓中配置对应的 Secret（如 `CLOUDFLARE_DEPLOY_HOOK`）。

### 2. 自动化触发机制

当向本仓库的 `main` 分支推送提交时：
1. `.github/workflows/trigger-build.yml` 首先调用主题代码仓的可复用校验工作流，验证 YAML 配置语法与 Markdown 元数据；
2. 校验通过后，工作流自动向主题代码仓派发构建事件或请求云平台部署钩子；
3. 目标平台拉取最新内容，完成全量静态打包与全球节点更新。

---

## 开源许可证

本项目采用 [MIT 许可证](LICENSE)。