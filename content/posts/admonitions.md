---
title: Markdown Admonitions
published: 2026-08-27
description: Present notes, warnings, and optional details with Shirone's M3E Markdown containers.
tags: [Demo, Markdown, Admonition, Shirone]
category: Guide
lang: en
draft: false
---

Admonitions keep supporting information visually distinct while preserving the article's reading flow. Every form is rendered on the server and uses the same compact M3E component.

## Semantic variants

::: note Deployment context
The spaced form accepts a plain custom title while remaining compatible with the reference syntax.
:::

:::info
Use information blocks for neutral context that helps readers understand the surrounding section.
:::

:::tip[Existing **label** syntax]
The original bracket label remains available and can contain inline Markdown emphasis.
:::

> [!IMPORTANT]
> GitHub Alert syntax enters the same renderer, so existing articles keep one visual language.

:::warning
Check environment variables before running a production build.
:::

:::caution
Do not publish credentials, local configuration, or private keys with an example.
:::

## Optional details

::: details Inspect the complete command
The disclosure uses native browser semantics and remains keyboard accessible without client JavaScript.

```powershell
npx.cmd astro check
pnpm.cmd build
```

- It starts closed.
- Long code can scroll inside its own code block.
- The container remains within the article width on narrow screens.
:::

## Author syntax

```markdown
:::note[Existing title syntax]
Content
:::

::: warning Plume-compatible title syntax
Content
:::

> [!TIP]
> GitHub Alert syntax

::: details Optional content
Hidden until the reader opens it.
:::
```
