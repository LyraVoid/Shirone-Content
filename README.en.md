# Shirone Official Content Template Repository

[简体中文](./README.md) | **English** | [Documentation](./docs/README.md)

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Theme](https://img.shields.io/badge/Theme-Shirone-pink.svg)](https://github.com/LyraVoid/Shirone)
[![Schema](https://img.shields.io/badge/Schema-content--manifest.v1-purple.svg)](shirone.content.json)

This is the official content template repository for the Shirone blog theme, designed for decoupled content and code repositories.

In this setup:
- **Content repository** (this repo): Stores your markdown posts, moments, albums, page data, and site configurations (recommended to keep private);
- **Code repository**: Maintains the theme source code, styles, and build pipelines.

When content is pushed, automated workflows trigger a rebuild with your latest content. This avoids merge conflicts during upstream theme upgrades and keeps private drafts and data secure.

---

## Documentation Index

Documentation is available in the `docs/` directory (excluded from builds and synchronization):

| Section | Link | Summary |
| :--- | :--- | :--- |
| **Quickstart** | [01-quickstart/](./docs/en/01-quickstart/01-concepts.md) | Concepts, `content:eject` decoupling migration, local preview, and CLI workflows |
| **Configuration** | [02-configuration/](./docs/en/02-configuration/01-overlay-principles.md) | Minimal overlay principle, site foundation, navigation, music, fonts, and comments |
| **Content Authoring** | [03-content-authoring/](./docs/en/03-content-authoring/01-writing-posts.md) | Post publishing, moments, album management, data entities, and Markdown extensions |
| **Deployment** | [04-deployment/](./docs/en/04-deployment/01-github-actions-dispatch.md) | GitHub Actions cross-repo trigger, hosting platform deploy hooks, and troubleshooting |
| **English Docs** | [English Guide](./docs/en/README.md) | Full English documentation overview and chapters |
| **Chinese Docs** | [中文文档](./docs/zh-CN/README.md) | Complete documentation in Simplified Chinese |

---

## Directory Layout and Mapping

The standard path mapping between the content repository and theme code repository is as follows:

| Content Repository Path | Theme Code Repository Mapping | Functional Description |
| :--- | :--- | :--- |
| `content/posts/` | `src/content/posts/` | Markdown and MDX long-form blog articles |
| `content/moments/` | `src/content/moments/` | Micro-blogging timeline moments and short essays |
| `content/spec/` | `src/content/spec/` | About page and friend link application copy |
| `config/` | `src/user/user-config.ts` | YAML configuration overrides (auto-compiled into bridge layer) |
| `data/` | `src/data/` | Structured data (devices, friends, projects, skills, timeline, compass) |
| `assets/` | `src/assets/` | Local images optimized and compressed to WebP during build |
| `public/` | `public/` | Static media assets and custom photo albums served directly |
| `docs/` | None (automatically excluded) | Usage guides and documentation; excluded from builds and sync |
| `shirone.content.json` | Root repository metadata | Content repository manifest and protocol identifier |

---

## Quickstart

### Method 1: One-Click Decoupling Migration from Existing Blog (Highly Recommended)

If you have already cloned or forked the theme code repository locally, execute a single command in the code repository root:

```powershell
# 1. Run one-click decoupling wizard (defaults to ../shirone-content)
pnpm.cmd content:eject --yes

# 2. Switch to the exported directory and push to your private GitHub repository
cd ../shirone-content
git init -b main
git add .
git commit -m "feat: initialize private blog content repository"
git remote add origin git@github.com:your_username/my-blog-content.git
git push -u origin main
```

### Method 2: Clone Official Template Directly

If you prefer starting fresh from an empty repository, clone this template and redirect it to your personal private repository:

```bash
git clone https://github.com/LyraVoid/Shirone-Content.git my-blog-content
cd my-blog-content
git remote set-url origin git@github.com:your_username/my-blog-content.git
git push -u origin main
```

---

## Local Development and Authoring Workflow

Set the content repository path via environment variable in the theme code repository root:

### 1. Single Sync and Local Preview

In Windows PowerShell:
```powershell
$env:CONTENT_DIR = "D:\Code\my-blog-content"
pnpm.cmd content:sync
pnpm.cmd dev
```

In macOS / Linux Bash:
```bash
export CONTENT_DIR="/path/to/my-blog-content"
pnpm content:sync
pnpm dev
```

### 2. Live Incremental Watch Mode (Live Preview)

Run `pnpm dev` in Terminal 1, and start the file watcher in Terminal 2. Changes trigger incremental synchronization and browser hot reload:

```powershell
pnpm.cmd content:watch
```

### 3. Essential CLI Commands

- `pnpm content:validate`: In-memory preflight validation for YAML syntax and schema checks;
- `pnpm content:status`: Inspect active content source path, connectivity, and configuration differences;
- `pnpm content:export`: Export local modifications back to the content repository following minimal overlay rules;
- `pnpm content:clean`: Reset temporary synchronized files in the code repository with automated snapshot archiving.

---

## Configuration Overlay Core Principles

YAML files in `config/` correspond to specific functional domains and follow the **Minimal Configuration Overlay Principle**:

1. **On-Demand Customization**: Declare only keys you want to change; omitted keys inherit theme defaults automatically;
2. **Merging Rules**: Nested dictionary objects merge recursively; list arrays replace entirely;
3. **Type Safety**: Strictly validated against TypeScript types during build; typos trigger helpful corrections.

### Core Configuration Files

- `site.yaml`: Site title, subtitle, default wallpaper mode, banner carousel, and background textures
- `profile.yaml`: Author avatar, nickname, bio, and social platform links
- `nav-bar.yaml`: Top navigation links, preset items (`LinkPresets`), and dropdown submenus
- `sidebar.yaml`: Single/dual column layout, component list, and sticky positioning
- `comment.yaml`: Comment service provider and Twikoo connection parameters
- `anime.yaml`: Anime tracking data sources and Bilibili/Bangumi sync policies
- `music.yaml`: Sidebar music player modes (mixed, local, custom, NetEase playlists)
- `font.yaml`: CJK fonts, Latin body fonts, and automated font subsetting pipeline
- `llms.yaml`: LLM discovery endpoints (/llms.txt and /llms-full.txt) and privacy filtering
- `footer.yaml` & `footer.html`: Custom footer HTML snippet injection
- `umami.yaml`: Umami analytics master toggle and share URL

---

## Automated Build and Deployment Pipelines

### 1. Deployment Secret Configuration

Under **Settings -> Secrets and variables -> Actions** in this content repository:

- **Method A (Recommended: GitHub Actions Cross-Repo Build Trigger)**:
  Configure `DISPATCH_TOKEN` (fine-grained personal access token with Contents Read/Write access on the theme repository). Pushing content automatically triggers CJK font subsetting, static compilation, and global distribution.
- **Method B (Hosting Platform Deploy Hook Mode)**:
  Configure deploy hooks on Cloudflare Pages, Vercel, Tencent Cloud EdgeOne, or Netlify, and store the webhook URL in repository secrets (e.g., `CLOUDFLARE_DEPLOY_HOOK`).

### 2. Automated Pipeline Trigger

When pushing commits to the `main` branch:
1. `.github/workflows/trigger-build.yml` validates YAML syntax and Markdown frontmatter using the theme's reusable validation workflow;
2. Upon successful validation, the workflow dispatches a build event or invokes the configured deploy hook;
3. The hosting runner pulls the latest content, compiles static assets, and deploys globally.

---

## License

This project is licensed under the [MIT License](LICENSE).
