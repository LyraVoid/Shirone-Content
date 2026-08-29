# Large Language Models and AI Discovery Configuration

Adhering to the [llms.txt specification](https://llmstxt.org/) and the Zero Extra Burden Principle, Shirone statically generates `/llms.txt` (concise index) and `/llms-full.txt` (full compiled content) at build time. This provides structured Markdown indices for LLM discovery without impacting reader experience or adding client-side JS overhead.

This document explains how to customize AI discovery settings via `config/llms.yaml` in your content repository.

---

## Configuration Template

Create `config/llms.yaml` in your content repository:

```yaml
# Enable static generation of /llms.txt and /llms-full.txt (defaults to true)
enable: true

# Generate /llms-full.txt containing full text of all public posts (defaults to true)
generateFull: true

# Site summary presented to LLMs (optional)
# Falls back to site.subtitle or profile.bio if omitted
siteSummary: "A personal blog focused on modern frontend architecture and expressive visual design."

# Maximum excerpt truncation length per post in /llms.txt index (default 200 characters)
descriptionMaxLength: 200

# Sensitive tag blacklist filter (optional)
# Posts tagged with any matching tag are never exposed to LLM endpoints
excludeTags:
  - "secret"
  - "private"
  - "diary"

# Sensitive category blacklist filter (optional)
excludeCategories: []

# Core navigation guide pages (array replaced entirely)
corePages:
  - title: "Home"
    url: "/"
    description: "Main blog entrance and latest post stream."
  - title: "About"
    url: "/about/"
    description: "Author profile, technical stack, and background."
  - title: "Archive"
    url: "/archive/"
    description: "Chronological index of all published writings."

# Custom sections (optional, for recommending external open-source projects or resources)
customSections:
  - title: "Open Source Projects"
    description: "Featured open source repositories maintained by the author."
    items:
      - title: "Shirone Theme"
        url: "https://github.com/LyraVoid/Shirone"
        description: "A Material 3 Expressive blog theme for Astro."
```

---

## Privacy Protection and Filtering Rules

### 1. Strict Security Isolation
During endpoint generation, the system enforces the following privacy filters:
- **Encrypted Posts Omitted**: Articles marked with `encrypted: true` are excluded unconditionally;
- **Drafts Omitted**: Articles marked with `draft: true` are excluded unconditionally;
- **Blacklist Tag & Category Filtering**: Articles matching `excludeTags` or `excludeCategories` are completely omitted.

### 2. Common Configuration Scenarios

- **Scenario A: Standard Defaults (Recommended)**
  No `config/llms.yaml` needed; all public non-draft articles are compiled into `/llms.txt` and `/llms-full.txt`.
- **Scenario B: Disable AI Discovery Completely**
  Set `enable: false` in `config/llms.yaml`. Endpoints return 404 with zero build output.
- **Scenario C: Lightweight Index Only for Large Sites**
  Set `generateFull: false` to produce only `/llms.txt`, skipping full-text aggregation.
