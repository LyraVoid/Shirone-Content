# Understanding Content Separation Architecture

## Core Concept

Think of your personal blog as a house:

- **Theme code repository**: The structural framework, plumbing, and construction. It governs UI interactions, dark/light themes, responsive layout, image optimization, and build pipelines. It is maintained publicly by the theme author.
- **Personal content repository**: The furniture, photographs, and personal notes placed inside. It stores your articles, moments, photo albums, profile info, and custom configurations. It is owned entirely by you and can remain private.

In a traditional single-repository setup, content and theme source code are mixed together. When upgrading the theme, you often encounter Git merge conflicts against your local articles.

Shirone's **Content Separation Architecture** (Dual-Repository Architecture) decouples these two concerns: your content resides independently in your private content repository, while the theme code repository handles pulling content, compiling static assets, and rendering the site.

---

## Dual-Repository Workflow

The synchronization and deployment pipeline is driven by automated workflows:

```mermaid
flowchart LR
    A[Author creates in content repo] -->|Push commit| B[GitHub Actions]
    B -->|Dispatch build event| C[Theme code repository]
    C -->|Fetch latest content & overlay config| D[Config validation & font subsetting]
    D -->|Static compilation| E[Global CDN & hosting platform]
```

1. **Authoring in Content Repository**: Write articles and update configurations, then execute `git push` to GitHub;
2. **Automated Pipeline Trigger**: A lightweight GitHub Actions workflow in the content repository dispatches an event to the theme repository;
3. **Synchronization & Overlay**: The theme repository pulls the latest content and merges your overrides with theme defaults according to defined rules;
4. **Compilation & Deployment**: The theme repository compiles static pages and publishes them to edge hosting platforms.

---

## Key Advantages

### 1. Conflict-Free Theme Upgrades

Open-source themes continuously release updates and fixes.
With content separated, your posts and configurations do not live in the code repository. When new theme versions are released, you can sync upstream changes directly without merge conflicts against your articles.

### 2. Privacy Protection for Personal Content

You may want to make your theme repository public, but blog content often includes:
- Unfinished drafts and private essays;
- Family albums and private memories;
- Sensitive site credentials or tokens.

The dual-repository architecture lets you keep your **content repository private** while leaving your **theme repository public**, preventing sensitive content from being exposed.

### 3. Focus on Content Authoring

Creators do not need to deal with complex build tools or dependency trees. You only need to focus on two tasks:
- Write Markdown/MDX articles under `content/`;
- Adjust site metadata and colors in clean YAML files under `config/`.
