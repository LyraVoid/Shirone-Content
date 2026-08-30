# Post Publishing and Typography Guide

This guide explains how to write and publish blog articles, configure metadata frontmatter, and protect private posts using article encryption.

---

## Creating a New Post

Articles reside in the content repository under `content/posts/`. Shirone supports two organization styles:

### Method 1: Directory Structure with Co-Located Assets (Recommended)
Create a folder under `content/posts/` containing an `index.md` (or `index.mdx`) alongside local images and covers:
```text
content/posts/my-travel/
├── index.md
├── cover.webp
└── photo.webp
```
This method bundles images together with your article text, allowing standard relative image paths in Markdown and making content migration straightforward.

### Method 2: Single-File Post
Create an individual `.md` or `.mdx` file directly inside `content/posts/`, for example:
`content/posts/my-first-post.md`

Best suited for purely textual articles or posts using external CDN image hosting.

---

## Frontmatter Metadata Specification

Every post begins with a YAML frontmatter block enclosed by triple dashes `---`:

```yaml
---
# Article title (required)
title: "My First Blog Post"

# Publication date (required; recommended format: YYYY-MM-DD)
published: 2026-08-27

# Exact publication timestamp (optional; ISO 8601 format with timezone offset)
# Enables precise second-level ordering for posts published on the same day; must match published date under configured timeZone
publishedAt: 2026-08-27T10:30:00+08:00

# Last modified date (optional; recommended format: YYYY-MM-DD)
updated: 2026-08-28

# Exact modification timestamp (optional; ISO 8601 format with timezone offset)
updatedAt: 2026-08-28T15:45:00+08:00

# Excerpt / description (optional, used in cards and SEO metadata; falls back to leading text)
description: "A comprehensive summary of modern frontend architecture and content separation."

# Cover image (optional; supports absolute paths, relative paths, or remote URLs)
image: "https://example.com/cover.webp"

# Category (optional, single category)
category: "Tech Notes"

# Tags list (optional, multiple tags)
tags:
  - "Astro"
  - "Frontend"
  - "Tutorial"

# Pin post to top of post lists (defaults to false)
pinned: false

# Draft flag (if true, excluded from production builds)
draft: false

# Enable comments on this post (defaults to true)
comment: true
---
```

---

## Publication Timestamps and Timezone-Aware Ordering

When publishing multiple posts on the same date, or when you wish to record exact minute-level timestamps, use `publishedAt` and `updatedAt`:

1. **Timezone Independence**: The build system interprets and formats article timestamps using `timeZone` in `config/site.yaml` (defaults to `"Asia/Shanghai"`). It is independent of the site UI language (`lang`); switching languages never shifts archive calendar dates or sorting order;
2. **Calendar Consistency Verification**: If both `published` and `publishedAt` are specified, the build pipeline verifies that the timestamp falls within the exact calendar day of `published` under the site timeZone;
3. **Same-Day Ordering Rule**:
   - Posts published on the same date are ordered chronologically by `publishedAt` in descending order (newest first);
   - Posts without `publishedAt` fall back to date-level sorting with a stable deterministic order.

## Post Encryption and Privacy Protection

For private journals or content restricted to authorized readers, use the built-in **post encryption**:

```yaml
---
title: "Encrypted Personal Diary"
published: 2026-08-27
category: "Life"

# Enable encryption
encrypted: true

# Access password (string or numeric)
password: "your_secret_password"

# Password hint (optional; displayed in visitor password prompt)
passwordHint: "What is the author's favorite anime character?"

# Hide excerpt preview on homepage cards (defaults to true)
hideHomeContent: true
---
```

### Encryption Mechanics
- Article bodies are encrypted into ciphertexts during build time; plain passwords are never bundled into client assets;
- When visitors open an encrypted article, a prompt requests the password, which the client browser decrypts dynamically in memory;
- Encrypted posts are automatically excluded from LLM discovery endpoints (`/llms.txt` and `/llms-full.txt`).

---

## Extended Typography and Components

Shirone provides a suite of Material 3 Expressive Markdown components:
- **Callout Containers** (`:::note`, `:::tip`, `:::important`, `:::warning`, `:::caution`)
- **Directory File Trees** (`:::file-tree`, `:::code-tree`)
- **Code & Multi-Option Tabs** (`:::tabs`, `:::tab`)
- **Ordered Steps Guide** (`:::steps`, `:::step`)
- **Mathematical Formulas** (KaTeX rendering)
- **Diagrams and Flowcharts** (Mermaid charts)
- **GitHub Repository Cards** (`::github{repo="user/repo"}`)
- **Highlighters, Collapse Panels, and Spoilers**

For the complete syntax catalog and examples, refer to: [05. Extended Markdown Syntax Reference](./05-markdown-syntax-guide.md).
