---
title: Markdown Marker Highlights
published: 2026-08-28
description: Highlight key phrases with token-driven marker syntax in Shirone Markdown.
tags: [Demo, Markdown, Typography, Shirone]
category: Guide
lang: en
draft: false
---

Marker highlights bring attention to a specific phrase without turning the surrounding paragraph into a separate component. They render as native `<mark>` elements during the build and inherit the active M3E color system.

## Default emphasis

Use `==text==` when the article's primary color should carry the emphasis. This is useful for ==one decision that readers should retain== while they continue through an ordinary paragraph.

The marker may contain ==nested **Markdown emphasis**== when the phrase needs a stronger hierarchy.

## Semantic colors

Use a suffix when the meaning needs a different tonal role. The available variants are `primary`, `secondary`, `tertiary`, `error`, and `tip`.

- ==Primary connects the phrase to the active theme=={.primary}
- ==Secondary keeps a supporting distinction quiet=={.secondary}
- ==Tertiary adds a separate editorial signal=={.tertiary}
- ==Error identifies a condition that needs correction=={.error}
- ==Tip highlights practical guidance=={.tip}

## Author syntax

```markdown
==Primary marker==

==Secondary marker=={.secondary}
==Tertiary marker=={.tertiary}
==Error marker=={.error}
==Tip marker=={.tip}
```

Inline code such as `==literal marker syntax==` and fenced examples stay literal, so documentation can explain the syntax without triggering it.
