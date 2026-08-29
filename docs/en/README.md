# Shirone Content Separation Guide

[简体中文](../zh-CN/README.md) | [Documentation Index](../README.md)

Welcome to the Shirone Content Separation Documentation.

This guide explains how to manage your blog content and theme code in separate repositories. It covers content repository setup, configuration overlays, post authoring, typography extensions, and automated deployment.

> The `docs/` directory is excluded from builds and synchronization.

---

## Documentation Overview

### Part 1: Quickstart
- [01. What is Content Separation Architecture](./01-quickstart/01-concepts.md) — Understand the dual-repository architecture and its core advantages
- [02. Initializing Private Content Repository](./01-quickstart/02-init-private-repo.md) — Extract an existing blog with `content:eject` or clone from official template
- [03. Local Preview and Real-Time Debugging](./01-quickstart/03-local-preview.md) — Launch the local dev server and watch mode for live editing
- [04. CLI Tooling and Collaborative Workflows](./01-quickstart/04-cli-workflows.md) — Full CLI toolchain: watch, validate, status, export, and clean

### Part 2: Site Configuration
- [01. Configuration Overlay Core Principles](./02-configuration/01-overlay-principles.md) — Minimal overlay principle, recursive object merges, and array replacement rules
- [02. Site Foundation and Visual Customization](./02-configuration/02-site-and-visuals.md) — Site identity, banner wallpaper, carousel, typewriter, and background textures
- [03. Top Navigation Bar and Sidebar Layout](./02-configuration/03-navbar-and-sidebar.md) — Navigation links, presets, dropdown menus, single/dual column sidebars
- [04. Anime and Drama Tracking Page Configuration](./02-configuration/04-anime-tracking.md) — Pure local mode, Bilibili and Bangumi synchronization strategies
- [05. Sidebar Music Player Configuration](./02-configuration/05-music-player.md) — Mixed enhanced mode, pure local mode, custom lists, and NetEase playlists
- [06. Comment System Configuration](./02-configuration/06-comment-system.md) — Zero Extra Burden principle and Twikoo comment integration
- [07. Typography and Global Font Configuration](./02-configuration/07-typography-and-fonts.md) — Custom font packages, system fonts mode, and automated font subsetting pipeline
- [08. Large Language Models and AI Discovery Configuration](./02-configuration/08-llms-and-ai-search.md) — Static generation of /llms.txt and /llms-full.txt, excerpt truncation, privacy desensitization
- [09. Umami Analytics Configuration](./02-configuration/09-umami-analytics.md) — Zero Extra Burden principle, site statistics, and public share URL setup

### Part 3: Content Authoring and Data Management
- [01. Post Publishing and Typography Guide](./03-content-authoring/01-writing-posts.md) — Article frontmatter metadata, pinned posts, drafts, and encryption
- [02. Moments Publishing Guide](./03-content-authoring/02-writing-moments.md) — Daily updates, mood iconography, and photo grids
- [03. Photo Album Management Guide](./03-content-authoring/03-album-management.md) — Local photo albums, external CDN albums, and encrypted galleries
- [04. Page Data Entities Maintenance](./03-content-authoring/04-data-entities.md) — Devices, friend links, projects, skills, timeline, and compass
- [05. Extended Markdown Syntax Reference](./03-content-authoring/05-markdown-syntax-guide.md) — Callouts, file trees, tabs, steps, KaTeX math, Mermaid diagrams, and GitHub cards

### Part 4: Automated Deployment
- [01. GitHub Actions Cross-Repo Build Trigger](./04-deployment/01-github-actions-dispatch.md) — Recommended workflow: automated pull, font subsetting, and global static release
- [02. Hosting Platform Deploy Hooks](./04-deployment/02-hosting-deploy-hooks.md) — Cloudflare Pages, Vercel, EdgeOne, Netlify deploy hook setup
- [03. Troubleshooting and FAQ](./04-deployment/03-troubleshooting-faq.md) — Token permissions, draft status, date formats, and build diagnostics
