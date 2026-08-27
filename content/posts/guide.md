---
title: "欢迎使用 Shirone 内容仓库"
published: 2026-08-27
description: "这是一篇示例文章，展示了 Shirone 博客主题的排版样式与元数据配置。"
image: "./image.png"
category: "使用指南"
tags:
  - "Shirone"
  - "博客"
  - "指南"
pinned: true
draft: false
comment: true
---

## 欢迎使用

这是一篇在内容分离架构下的示例文章。本篇文章保存在独立的内容仓库中，与主题代码完全解耦。

### 元数据说明

文章顶部的 Frontmatter 支持以下字段：

- `title`：文章标题
- `published`：发布日期，格式如 `YYYY-MM-DD`
- `updated`：最后修改日期，可选
- `description`：文章摘要描述
- `image`：文章封面图路径或外部链接
- `category`：文章所属分类
- `tags`：标签列表
- `pinned`：是否置顶
- `draft`：是否为草稿，草稿在生产构建时会被自动过滤
- `comment`：是否开启本篇文章的评论区

### 代码高亮

```typescript
interface SiteIdentity {
  name: string;
  repo: string;
  mode: "external" | "local";
}

const config: SiteIdentity = {
  name: "Shirone",
  repo: "Shirone-Content",
  mode: "external"
};
```

### 提示块样式

> 这是一个标准的引用与提示区块示例。
