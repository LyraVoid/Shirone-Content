# Comment System Configuration

Shirone follows the **Zero Extra Burden Principle**: when the comment system is disabled (`enable: false` or omitted), the theme issues zero external network requests and loads 0 third-party client-side JavaScript, maintaining pristine performance.

This document covers integrating the [Twikoo](https://twikoo.js.org/) comment system via `config/comment.yaml`.

Comment section rendering preview at the bottom of an article:

![Twikoo Comment System Preview](../../images/02-config/06-comment/01-twikoo-comment-preview.png)
*Figure 1-1: Twikoo comment system interface at the bottom of an article*

---

## Integration Steps

### Step 1: Obtain Twikoo Server Environment URL

Deploy your backend according to the [Twikoo Documentation](https://twikoo.js.org/) (supports Vercel, Railway, Tencent CloudBase, or standalone VPS), and obtain your environment URL or environment ID (e.g., `https://twikoo.example.com`).

### Step 2: Configure `config/comment.yaml`

```yaml
# 1. Master comment toggle
enable: true

# 2. Provider set to twikoo
provider: "twikoo"

# 3. Lazy loading toggle (recommended true: loads scripts only when scrolled into viewport)
lazy: true

# 4. Twikoo dedicated parameters
twikoo:
  # Environment ID or self-hosted backend domain from Step 1
  envId: "https://twikoo.example.com"

  # Frontend script CDN URL (defaults to official stable release)
  scriptUrl: "https://cdn.jsdelivr.net/npm/twikoo@1.7.19/dist/twikoo.min.js"

  # Interface language: "auto" (follows site language) | "zh-CN" | "zh-TW" | "en" | "ja"
  lang: "auto"

  # Comment textarea placeholder text
  placeholder: "Share your thoughts and feedback..."
```

---

## Disabling Comments on Specific Posts

To disable comments for a specific post or announcement without affecting global settings, add `comment: false` in the post's frontmatter:

```yaml
---
title: "Maintenance Notice with Comments Disabled"
comment: false
---
```
