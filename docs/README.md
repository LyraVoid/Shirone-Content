# Shirone 官方文档 / Documentation

[简体中文](./zh-CN/README.md) | [English](./en/README.md)

欢迎查阅 Shirone 博客主题使用文档。你可以点击上方链接进入对应语言的完整手册，也可以直接通过下方目录浏览各章节。

Welcome to the Shirone documentation. Choose your preferred language above to read the full guide, or browse chapters directly using the table of contents below.

> 提示：`docs/` 目录已被构建和同步脚本排除，阅读或修改文档不会触发线上构建。
>
> Note: The `docs/` directory is excluded from builds and synchronization pipelines.

---

## 目录导航 / Table of Contents

### 快速入门 / Quickstart

| 篇目 | 简体中文 | English | 简介 / Summary |
| :--- | :--- | :--- | :--- |
| 01 | [概念理解](./zh-CN/01-quickstart/01-concepts.md) | [Concepts](./en/01-quickstart/01-concepts.md) | 双仓分离架构的核心理念与优势 |
| 02 | [初始化私有仓库](./zh-CN/01-quickstart/02-init-private-repo.md) | [Initialize Private Repo](./en/01-quickstart/02-init-private-repo.md) | `content:eject` 一键抽离与模板初始化 |
| 03 | [本地预览与实时调试](./zh-CN/01-quickstart/03-local-preview.md) | [Local Preview](./en/01-quickstart/03-local-preview.md) | 本地预览服务与实时监听编写 |
| 04 | [命令行工具与工作流](./zh-CN/01-quickstart/04-cli-workflows.md) | [CLI Workflows](./en/01-quickstart/04-cli-workflows.md) | 校验、同步、导出与清理命令速查 |

### 全站配置 / Site Configuration

| 篇目 | 简体中文 | English | 简介 / Summary |
| :--- | :--- | :--- | :--- |
| 01 | [配置覆盖核心原理](./zh-CN/02-configuration/01-overlay-principles.md) | [Overlay Principles](./en/02-configuration/01-overlay-principles.md) | 最小化覆盖与对象合并/数组替换规则 |
| 02 | [站点基础与视觉定制](./zh-CN/02-configuration/02-site-and-visuals.md) | [Site & Visuals](./en/02-configuration/02-site-and-visuals.md) | 站点信息、主题色彩、横幅壁纸与纹理 |
| 03 | [顶栏导航与侧边栏编排](./zh-CN/02-configuration/03-navbar-and-sidebar.md) | [Navbar & Sidebar](./en/02-configuration/03-navbar-and-sidebar.md) | 导航预设、下拉菜单与单/双侧栏布局 |
| 04 | [追番与追剧配置](./zh-CN/02-configuration/04-anime-tracking.md) | [Anime Tracking](./en/02-configuration/04-anime-tracking.md) | 本地清单与 Bilibili / Bangumi 数据同步 |
| 05 | [侧栏音乐播放器配置](./zh-CN/02-configuration/05-music-player.md) | [Music Player](./en/02-configuration/05-music-player.md) | 本地音乐、自定义曲目与网易云歌单 |
| 06 | [评论系统配置](./zh-CN/02-configuration/06-comment-system.md) | [Comment System](./en/02-configuration/06-comment-system.md) | 零额外负担原则与 Twikoo 评论接入 |
| 07 | [全站字体配置](./zh-CN/02-configuration/07-typography-and-fonts.md) | [Typography & Fonts](./en/02-configuration/07-typography-and-fonts.md) | 自定义字体与全自动中文字体裁剪 |
| 08 | [大模型与 AI 检索配置](./zh-CN/02-configuration/08-llms-and-ai-search.md) | [LLMs & AI Search](./en/02-configuration/08-llms-and-ai-search.md) | `/llms.txt` 静态生成与隐私脱敏过滤 |

### 内容撰写 / Content Authoring

| 篇目 | 简体中文 | English | 简介 / Summary |
| :--- | :--- | :--- | :--- |
| 01 | [文章发布指南](./zh-CN/03-content-authoring/01-writing-posts.md) | [Writing Posts](./en/03-content-authoring/01-writing-posts.md) | 文章元数据、置顶、草稿与文章加密 |
| 02 | [动态说说发布指南](./zh-CN/03-content-authoring/02-writing-moments.md) | [Writing Moments](./en/03-content-authoring/02-writing-moments.md) | 日常动态随笔、心情图标与多图展示 |
| 03 | [相册管理指南](./zh-CN/03-content-authoring/03-album-management.md) | [Album Management](./en/03-content-authoring/03-album-management.md) | 本地照片、外链相册与加密相册维护 |
| 04 | [页面数据实体维护](./zh-CN/03-content-authoring/04-data-entities.md) | [Data Entities](./en/03-content-authoring/04-data-entities.md) | 设备、友链、项目、技能与时间线数据 |
| 05 | [扩展排版语法速查](./zh-CN/03-content-authoring/05-markdown-syntax-guide.md) | [Markdown Syntax Guide](./en/03-content-authoring/05-markdown-syntax-guide.md) | 提示容器、代码树、标签页与图表组件 |

### 自动部署 / Deployment

| 篇目 | 简体中文 | English | 简介 / Summary |
| :--- | :--- | :--- | :--- |
| 01 | [GitHub Actions 跨仓自动构建](./zh-CN/04-deployment/01-github-actions-dispatch.md) | [GitHub Actions Cross-Repo Trigger](./en/04-deployment/01-github-actions-dispatch.md) | 推荐方案：PAT 联动与全自动编译发布 |
| 02 | [云托管平台 Deploy Hook 部署](./zh-CN/04-deployment/02-hosting-deploy-hooks.md) | [Hosting Platform Deploy Hooks](./en/04-deployment/02-hosting-deploy-hooks.md) | Cloudflare / Vercel / EdgeOne / Netlify |
| 03 | [常见问题与排查指南](./zh-CN/04-deployment/03-troubleshooting-faq.md) | [Troubleshooting & FAQ](./en/04-deployment/03-troubleshooting-faq.md) | 令牌权限、日期格式与常见构建问题排查 |