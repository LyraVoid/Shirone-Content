---
title: Markdown Steps
published: 2026-08-27
description: Present sequential instructions as a compact, accessible step flow in Shirone.
tags: [Demo, Markdown, Steps, Shirone]
category: Guide
lang: en
draft: false
---

Use Steps for procedures whose order matters. The component keeps the article reading flow intact: a quiet numbered rail provides orientation while headings, paragraphs, links, lists, and code retain their native Markdown roles.

## Ordered list syntax

Wrap one Markdown ordered list in a `:::steps` container. Each top-level list item becomes one step.

````markdown
:::steps[Production deployment]
1. **Clone and prepare the workspace**

   Clone the repository and enter the project directory.

   ```powershell
   git clone https://github.com/LyraVoid/Shirone.git
   Set-Location Shirone
   ```

2. **Install dependencies**

   Use the repository's pinned package manager.

   ```powershell
   pnpm.cmd install
   ```

3. **Run project checks**

   Confirm Astro diagnostics and TypeScript checks pass.

   ```powershell
   npx.cmd astro check
   pnpm.cmd type-check
   ```

4. **Build the production site**

   Generate the static site and search index.

   ```powershell
   pnpm.cmd build
   ```
:::
````

:::steps[Production deployment]
1. **Clone and prepare the workspace**

   Clone the repository and enter the project directory.

   ```powershell
   git clone https://github.com/LyraVoid/Shirone.git
   Set-Location Shirone
   ```

2. **Install dependencies**

   Use the repository's pinned package manager.

   ```powershell
   pnpm.cmd install
   ```

3. **Run project checks**

   Confirm Astro diagnostics and TypeScript checks pass.

   ```powershell
   npx.cmd astro check
   pnpm.cmd type-check
   ```

4. **Build the production site**

   Generate the static site and search index.

   ```powershell
   pnpm.cmd build
   ```
:::

## Options

- `:::steps[Title]` or `title="Title"` adds a visible label and accessible name.
- `start=4` changes the first displayed step number.
- The container must contain exactly one ordered list. Invalid or mixed input remains ordinary readable Markdown instead of being interpreted heuristically.
- Rendering is completed during the site build and adds no client JavaScript or network requests.
