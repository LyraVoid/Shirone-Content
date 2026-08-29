# Shirone 博客内容分离使用指南

[English](../en/README.md) | [文档索引](../README.md)

欢迎查阅 Shirone 博客主题的内容分离使用文档。

本文档介绍如何将**博客内容**与**主题前端代码**解耦管理，涵盖内容仓库初始化、配置覆盖、文章撰写、排版扩展以及自动化部署等全流程说明。

> `docs/` 目录已被构建与同步排除。

---

## 教程全景导览

### 第一部分：快速入门
- [01. 什么是内容分离架构](./01-quickstart/01-concepts.md) —— 用通俗的语言理解双仓架构与核心优势
- [02. 初始化私有内容仓库](./01-quickstart/02-init-private-repo.md) —— 使用 content:eject 一键解耦迁出或从模板克隆初始化私有仓库
- [03. 本地预览与实时调试](./01-quickstart/03-local-preview.md) —— 在个人电脑上启动开发服务器与边写边看实时监听
- [04. 命令行工具与协同工作流](./01-quickstart/04-cli-workflows.md) —— 实时监听、安全预检、状态检查、反向导出与安全清理完整命令体系

### 第二部分：全站配置
- [01. 配置覆盖核心原理](./02-configuration/01-overlay-principles.md) —— 最小化覆盖原则、对象层级合并与数组整体替换规则
- [02. 站点基础与视觉定制](./02-configuration/02-site-and-visuals.md) —— 网站标题、横幅壁纸、多图轮播、打字机动效与背景纹理系统
- [03. 顶栏导航与侧边栏编排](./02-configuration/03-navbar-and-sidebar.md) —— 导航链接、预设清单、下拉子菜单、侧栏单双栏与组件摆放
- [04. 追番与追剧页面配置](./02-configuration/04-anime-tracking.md) —— 本地手写模式与 Bilibili、Bangumi 数据同步策略
- [05. 侧栏音乐播放器配置](./02-configuration/05-music-player.md) —— 混合增强模式、本地独立模式、自定义列表与网易云歌单
- [06. 评论系统配置](./02-configuration/06-comment-system.md) —— 零额外负担原则与 Twikoo 评论系统接入
- [07. 全站字体与排版配置](./02-configuration/07-typography-and-fonts.md) —— 自定义字体包加载、纯系统字体模式与全自动字体子集裁剪流水线
- [08. 大模型与 AI 检索端点配置](./02-configuration/08-llms-and-ai-search.md) —— /llms.txt 与 /llms-full.txt 静态生成、摘要截断与私密内容脱敏
- [09. Umami 网站统计配置](./02-configuration/09-umami-analytics.md) —— 零额外负担原则、访问统计与公开分享链接接入

### 第三部分：内容撰写与数据管理
- [01. 文章发布与排版指南](./03-content-authoring/01-writing-posts.md) —— 文章元数据字段详解、草稿置顶与加密保护
- [02. 动态说说发布指南](./03-content-authoring/02-writing-moments.md) —— 记录日常瞬间、心情图标与多图展示
- [03. 相册管理指南](./03-content-authoring/03-album-management.md) —— 本地照片相册、网络外链相册与加密相册
- [04. 页面数据实体维护](./03-content-authoring/04-data-entities.md) —— 个人设备、友情链接、开源项目、技能图谱、时间线与罗盘
- [05. 扩展排版语法速查](./03-content-authoring/05-markdown-syntax-guide.md) —— 容器指令、代码树、代码标签页、步骤条、数学公式、流程图与 GitHub 卡片

### 第四部分：自动化部署
- [01. GitHub Actions 跨仓自动构建](./04-deployment/01-github-actions-dispatch.md) —— 推荐方案：推送内容自动通知代码仓完成构建发布
- [02. 云托管平台 Deploy Hook 部署](./04-deployment/02-hosting-deploy-hooks.md) —— Cloudflare Pages、Vercel、EdgeOne、Netlify 部署钩子配置
- [03. 常见问题与排查指南](./04-deployment/03-troubleshooting-faq.md) —— 令牌权限排查、草稿状态、日期格式与构建报错解决
