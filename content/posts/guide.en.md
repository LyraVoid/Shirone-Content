---
title: "Welcome to the Shirone Content Repo"
published: 2026-08-27
description: "A sample post showing Shirone's typography and metadata configuration."
image: "./image.png"
category: "Getting Started"
tags:
  - "Shirone"
  - "blog"
  - "guide"
pinned: true
series: "starter-guide"
seriesOrder: 1
draft: false
comment: true
---

## Welcome

This is a sample post using the content separation architecture. Posts live in a separate content repository, fully decoupled from the theme code.

### Metadata Fields

The frontmatter supports these fields:

- `title`: Post title
- `published`: Publication date, format `YYYY-MM-DD`
- `updated`: Last modified date, optional
- `description`: Post summary
- `image`: Cover image path or external URL
- `category`: Post category
- `tags`: Tag list
- `pinned`: Whether to pin the post
- `series`: Series slug, corresponds to `content/series/<slug>.md`
- `seriesOrder`: Order within series (integer); defaults to publication date
- `draft`: Whether the post is a draft; drafts are excluded from production builds
- `comment`: Whether to enable comments for this post

### Code Highlighting

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

### Blockquote Style

> This is a standard blockquote example.