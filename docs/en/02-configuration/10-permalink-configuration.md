# Article Permalink Configuration (Permalink)

This document describes how to configure sitewide article permalink formats and how to specify root-level custom permalinks or aliases for individual articles in your content repository.

---

## Overview & Core Capabilities

Shirone provides a versatile article permalink architecture:

1. **Default Behavior (Out of the box)**:
   - Sitewide permalinks are disabled by default (`enable: false`). Article routes remain at standard `/posts/<slug>/` (derived from the filename).
2. **Template-Based Global Permalinks**:
   - When enabled (`enable: true`), articles generate root-level URLs based on your configured format template (e.g. `/2024/12/01/my-post/`, `/42-my-post/`, or `/tech/my-post/`).
3. **Per-Post Custom Root Permalinks**:
   - Define `permalink` in a post's frontmatter to mount it directly at any root-level path. This has highest precedence.
4. **Post Aliases (Alias)**:
   - Define `alias` in a post's frontmatter to create `/posts/<alias>/` fallback and redirect routes.
5. **Ecosystem-Wide Consistency**:
   - All permalinks are seamlessly consumed across homepage cards, archives, post navigation, discovery carousels, RSS/Atom feeds, and LLM text dumps.

---

## Configuration File (`config/permalink.yaml`)

Configure in your content repository at `config/permalink.yaml`:

```yaml
# Whether to enable global permalinks (default: false, links use /posts/<slug>/ when false)
enable: false

# Format template for global permalinks (effective when enable is true)
format: "%year%/%monthnum%/%day%/%postname%"
```

### Available Placeholders

| Placeholder | Description | Example |
| --- | --- | --- |
| `%year%` | 4-digit year | `2024` |
| `%monthnum%` | 2-digit month (01-12) | `05` |
| `%day%` | 2-digit day (01-31) | `18` |
| `%hour%` | 2-digit hour (00-23) | `14` |
| `%minute%` | 2-digit minute (00-59) | `30` |
| `%second%` | 2-digit second (00-59) | `00` |
| `%post_id%` | 1-based sequential number sorted ascending by published date (drafts excluded) | `1`, `42` |
| `%postname%` | Filename slug (lowercase) | `my-first-post` |
| `%raw_postname%` | Original filename preserving case | `My-First-Post` |
| `%category%` | Category name ("uncategorized" if empty) | `tech` |

### Common Format Examples

- **Date Hierarchy**:
  ```yaml
  format: "%year%/%monthnum%/%day%/%postname%"
  # Generates: /2024/05/18/my-first-post/
  ```
- **Year-Month Hyphenated**:
  ```yaml
  format: "%year%-%monthnum%-%postname%"
  # Generates: /2024-05-my-first-post/
  ```
- **WordPress Numeric ID Style**:
  ```yaml
  format: "%post_id%-%postname%"
  # Generates: /1-my-first-post/
  ```
- **Category Prefix**:
  ```yaml
  format: "%category%/%postname%"
  # Generates: /tech/my-first-post/
  ```

---

## Per-Post Frontmatter Overrides

You can set custom paths in individual Markdown / MDX frontmatter:

```yaml
---
title: "My Special Article"
published: 2024-05-18
category: "Notes"

# 1. Custom root permalink (highest priority, directly mounted at site root)
permalink: "special/about-me"
# Resolved URL: /special/about-me/

# 2. Post alias (mounted under /posts/<alias>/)
alias: "my-alias-name"
# Resolved URL: /posts/my-alias-name/
---
```

---

## Resolution Precedence

The canonical URL is resolved according to this precedence:

1. **Per-Post Frontmatter `permalink`**: When specified (e.g. `special/about-me`), resolved directly as `/special/about-me/`.
2. **Global `permalink.yaml`**: When `enable: true`, formatted according to the template.
3. **Per-Post Frontmatter `alias`**: When specified (e.g. `my-alias`), resolved as `/posts/my-alias/`.
4. **Default Filename Slug**: Resolved as `/posts/<slug>/`.

---

## Best Practices

1. **Clean slashes**: Leading and trailing slashes in `permalink` or `alias` are normalized automatically.
2. **Avoid root collisions**: Since custom `permalink` is rooted at `/`, avoid naming routes that collide with core pages (such as `about`, `archive`, `friends`, `moments`, etc.).
3. **Sequential numbering**: `%post_id%` strictly skips draft posts (`draft: true`), ensuring stable numbering for published posts.
