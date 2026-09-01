# 文章发布与排版指南

本篇文档介绍如何在内容仓库中编写与发布技术博客文章、管理文章元数据以及使用文章加密功能。

---

## 建立新文章

文章存放在内容仓库的 `content/posts/` 目录下，支持两种组织方式：

### 方式一：文件夹目录形式（最常用，推荐）
在 `content/posts/` 下新建一个独立文件夹，并在其中放入 `index.md`（或 `index.mdx`）及文章专属的封面与插图：
```text
content/posts/my-travel/
├── index.md
├── cover.webp
└── photo.webp
```
这种方式将每篇文章的图文资源集中存放在同个目录下，在 Markdown 中引用图片时可直接使用相对路径，管理和迁移最为清晰方便。

### 方式二：单文件形式（适合无本地独立配图的纯文本文章）
在 `content/posts/` 下直接新建单个 `.md` 或 `.mdx` 文件，例如：
`content/posts/my-first-post.md`

适合配图全部使用外部图床外链，或没有本地插图的纯文字速记。

---

## 文章头部元数据规范

每篇文章的开头必须用三条横线 `---` 包裹一段元数据，用于定义文章标题、日期与分类：

```yaml
---
# 文章主标题（必填）
title: "我的第一篇博客文章"

# 发布日期（必填，建议格式：YYYY-MM-DD）
published: 2026-08-27

# 精确发布时间戳（可选，ISO 8601 格式，含时区偏移）
# 用于同一天发布多篇文章时的精准排序，其日历日期在 site.yaml 的 timeZone 下必须与 published 一致
publishedAt: 2026-08-27T10:30:00+08:00

# 最后更新日期（可选，建议格式：YYYY-MM-DD）
updated: 2026-08-28

# 精确更新时间戳（可选，ISO 8601 格式，含时区偏移）
updatedAt: 2026-08-28T15:45:00+08:00

# 文章摘要（可选，用于卡片简介与搜索引擎摘要，留空时自动截取正文前段）
description: "这是一篇关于现代前端技术架构与内容分离的实战总结。"

# 文章封面图（可选，支持绝对路径、相对路径或网络外链）
image: "https://example.com/cover.webp"

# 所属分类（可选，单分类）
category: "技术笔记"

# 标签列表（可选，可添加多个）
tags:
  - "Astro"
  - "前端"
  - "教程"

# 是否置顶显示在列表最前（默认为 false）
pinned: false

# 是否为草稿（设为 true 时在生产构建中自动隐藏）
draft: false

# 是否开启本篇文章的评论互动（默认为 true）
comment: true

# 自定义根路径固定链接（可选，优先级最高，如 "notes/my-special-page" => /notes/my-special-page/）
permalink: ""

# 文章别名（可选，生成 /posts/<alias>/ 访问路径）
alias: ""


---
```

---

## 精确发布时间与时区排序规范

当你在同一天发布多篇博客，或者需要精确记录文章与更新的具体时刻时，可以使用 `publishedAt` 与 `updatedAt`：

1. **时区独立性**：系统通过 `config/site.yaml` 中的 `timeZone`（默认 `"Asia/Shanghai"`）统一换算文章的归档日历日期与时间。它独立于站点前台语言（`lang`），切换语言绝不会导致归档时间轴或排序产生漂移；
2. **日历一致性校验**：若同时填写了 `published` 与 `publishedAt`，系统会在构建期严格校验 `publishedAt` 在站点时区下的日历日期是否与 `published` 完全相符（例如 `published: 2026-08-27` 与 `publishedAt: 2026-08-27T10:30:00+08:00` 合法；若时间戳跨到了次日则会报错拦截）；
3. **同日文章排序规则**：
   - 同一天发布的文章，优先按 `publishedAt` 的具体时间戳降序排列（最新发布的在前）；
   - 未声明 `publishedAt` 的文章将按 `published` 日期降序排列并保持稳定的默认顺序。

## 文章加密保护功能

如果你有一篇私人日记或不想对公众完全公开的文章，可以使用内置的**文章加密功能**：

```yaml
---
title: "这是一篇加密的个人日记"
published: 2026-08-27
category: "生活"

# 开启加密
encrypted: true

# 设置访问密码（支持字符串或数字）
password: "your_secret_password"

# 密码提示文字（访客在输入密码界面可见，可选）
passwordHint: "博主最喜欢的动漫人物名字是什么？"

# 首页卡片是否隐藏正文摘要预览（默认为 true）
hideHomeContent: true
---
```

### 加密机制说明
- 构建期正文内容通过高强度算法加密打包为密文，真实密码绝不会打包进前端静态资源；
- 访客在进入文章页面时会弹出密码输入框，输入正确密码后由浏览器在本地动态解密渲染；
- 加密文章会自动被大模型检索端点（`/llms.txt` 与 `/llms-full.txt`）剔除，确保私密安全。

---

## 扩展排版语法与高级组件

Shirone 主题内置了丰富的 M3E 设计风格排版扩展组件，包括：
- **提示与警告容器**（`:::note`, `:::tip`, `:::important`, `:::warning`, `:::caution`）
- **代码文件树**（`:::code-tree`, `:::file-tree`）
- **代码标签页与多选项卡**（`:::tabs`, `:::tab`）
- **操作步骤条**（`:::steps`, `:::step`）
- **数学公式**（KaTeX 公式渲染）
- **流程图与图表**（Mermaid 绘图）
- **GitHub 仓库名片卡**（`::github{repo="user/repo"}`）
- **文本荧光笔高亮、折叠面板与剧透黑幕**

完整排版语法与代码示例请参阅专用速查指南：[05. 扩展排版语法速查](./05-markdown-syntax-guide.md)。
