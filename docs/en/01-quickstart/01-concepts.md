# Understanding Content Separation Architecture

## A Plain Metaphor

Think of your personal blog as a custom-built residence:

- **Theme Code Repository**: The structural framework, electrical wiring, plumbing, and construction crew. It governs UI smoothness, dark/light mode transitions, mobile drawer mechanics, image compression, and build pipelines. It is maintained by the theme author and open-sourced publicly.
- **Personal Content Repository**: The interior furniture, personal diaries, framed photographs, and personal notes placed inside after moving in. It holds all your original articles, moments, photo albums, profile details, and custom color selections. It is owned entirely by you and can remain strictly private.

In traditional static blog architectures, the house and its furniture are tightly coupled into a single repository. Modifying the wall paint or upgrading the plumbing frequently risks overwriting personal content or triggering severe merge conflicts.

Shirone's **Content Separation Architecture** (Dual-Repository Architecture) completely decouples these two concerns: your content resides exclusively within your private content repository, while the theme code repository handles static compilation and visual rendering.

---

## Dual-Repository Collaborative Workflow

The synchronization and deployment pipeline is fully automated with zero manual file transfers:

```mermaid
flowchart LR
    A[Author creates in content repo] -->|Push commit| B[GitHub Actions]
    B -->|Dispatch build event| C[Theme code repository]
    C -->|Fetch latest content & overlay config| D[Config validation & font subsetting]
    D -->|Static compilation| E[Global CDN & hosting platform]
```

1. **Authoring in Content Repository**: Write articles and update configurations, then execute `git push` to GitHub;
2. **Automated Pipeline Trigger**: A lightweight GitHub Actions workflow in the content repository dispatches an event to the theme repository;
3. **Secure Synchronization & Overlay**: The theme repository pulls the latest content and performs recursive object merges between your overrides and theme defaults;
4. **Compilation & Global Distribution**: The theme repository builds optimized static pages and publishes them to global edge networks.

---

## Key Advantages of Content Separation

### 1. Zero Upstream Upgrade Conflicts

Open-source themes continually ship new features, bug fixes, and layout optimizations.
Under the dual-repository architecture, all your markdown posts and custom configurations remain in your external repository. When upgrading the theme, you can pull and rebase upstream commits into your theme fork with **zero merge conflicts against your articles**.

### 2. Strict Personal Privacy Protection

You may wish to keep your theme code repository public on GitHub to showcase customizations, while your blog content contains:
- Unfinished drafts and private essays;
- Family albums and private memories;
- Sensitive site credentials or tokens.

Content separation allows you to keep your **content repository private** while maintaining your **theme repository public**. External visitors can inspect the codebase without gaining access to your raw private articles or media assets.

### 3. Focus on Creation Without Build Errors

Content creators do not need to debug complex toolchains or npm dependency trees. You only interact with two straightforward directories:
- Write Markdown/MDX articles under `content/`;
- Customize site title, colors, and layout in clean YAML files under `config/`.
