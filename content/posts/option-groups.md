---
title: Markdown Option Groups
published: 2026-08-28
description: Present related Markdown alternatives in compact, synchronized M3E option groups.
tags: [Demo, Markdown, Tabs, Shirone]
category: Guide
lang: en
draft: false
---

Option groups keep equivalent instructions together without repeating the surrounding explanation. Each option accepts full block Markdown, while the selected value can synchronize with another group on the same page.

## Choose a package manager

Use `@tab:active` to select the initial option. A suffix after `#` supplies a stable value without changing the visible title.

::: tabs#package-manager

@tab npm

Install the package with npm:

```powershell
npm install astro
```

@tab:active **pnpm**#pnpm

Install the package with pnpm:

```powershell
pnpm.cmd add astro
```

@tab Bun#bun

Install the package with Bun:

```powershell
bun add astro
```

:::

## Run the project

This group shares the `package-manager` id. Selecting an option above updates the matching command below and remembers that choice for the next visit.

::: tabs#package-manager

@tab npm

```powershell
npm run dev
```

@tab pnpm

```powershell
pnpm.cmd dev
```

@tab Bun#bun

```powershell
bun run dev
```

:::

## Many alternatives

Longer option rows remain on one line and scroll within their own navigation area on narrow screens.

::: tabs

@tab Local workstation

Use the local toolchain while developing a feature.

@tab Hosted preview environment

Publish a temporary preview for review.

@tab Continuous integration

Run deterministic validation for every change.

@tab Production deployment

Promote a verified artifact to production.

@tab Offline recovery workflow

Restore from a local artifact when the network is unavailable.

:::

## Author syntax

````markdown
::: tabs#package-manager

@tab npm

Use npm instructions here.

@tab:active **pnpm**#pnpm

Use pnpm instructions here.

:::
````

Each group needs at least two `@tab` sections, and every section needs body content separated from its marker by a blank line. Invalid or incomplete groups remain readable as ordinary Markdown.
