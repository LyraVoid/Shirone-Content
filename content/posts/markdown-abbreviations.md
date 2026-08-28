---
title: Markdown Abbreviations
published: 2026-08-28
description: Define common acronyms once and keep their full meaning available in normal article text.
tags: [Demo, Markdown, Typography, Shirone]
category: Guide
lang: en
draft: false
---

Abbreviations keep technical writing compact while preserving the full term for readers who need it. A defined term renders as a native `abbr` element with its meaning available on hover and to assistive technology.

## In context

SSR-first output keeps the initial document visible before JavaScript runs. When measuring its reading experience, LCP and CLS reveal whether the first visible content is fast and stable.

An abbreviation can also appear next to ordinary Markdown such as **SSR** guidance, but literal code such as `SSR` and links like [LCP documentation](https://web.dev/articles/lcp) remain untouched.

## Define terms

Place definitions anywhere in the same Markdown document. They do not render as visible paragraphs, and only matching terms in that article receive the semantic abbreviation treatment.

```markdown
*[SSR]: Server-Side Rendering
*[LCP]: Largest Contentful Paint
*[CLS]: Cumulative Layout Shift

SSR makes an HTML response available before client code runs.
```

*[SSR]: Server-Side Rendering
*[LCP]: Largest Contentful Paint
*[CLS]: Cumulative Layout Shift

## Authoring boundaries

Terms must begin with a letter or number and may contain letters, numbers, periods, underscores, plus signs, and hyphens. Each definition applies to the current article only; an invalid or duplicate definition remains ordinary Markdown instead of silently replacing another term.
