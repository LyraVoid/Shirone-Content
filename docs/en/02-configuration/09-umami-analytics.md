# Umami Analytics Configuration

Shirone adheres to the **Zero Extra Burden Principle**: when Umami analytics is disabled (`enable: false` or omitted), the system produces zero external network requests, zero script injections, and zero layout shift or bundle bloat.

This guide explains how to configure [Umami](https://umami.is/) analytics via `config/umami.yaml`.

---

## Setup Steps

### Step 1: Obtain Umami Share URL

1. Log in to your Umami dashboard;
2. Navigate to **Settings** -> **Websites**, select your website, and click **Edit**;
3. Go to the **Share URL** tab and create a public share link;
4. Copy the generated URL (e.g., `https://your-umami.com/share/<shareId>` or `https://cloud.umami.is/analytics/us/share/<shareId>`).

### Step 2: Configure `config/umami.yaml`

In your content repository, edit `config/umami.yaml`:

```yaml
# 1. Enable Umami analytics globally
enable: true

# 2. Enter your Umami share URL from Step 1
shareUrl: "https://your-umami.com/share/<shareId>"

# 3. Optional: set both values only when this site should send visits to Umami
# websiteId: "your-website-id"
# scriptUrl: "https://your-umami.com/script.js"
```

`websiteId` and `scriptUrl` are optional paired fields. When both are omitted, Shirone only reads public shared statistics. To enable visit tracking, set both fields; setting either field alone does not load the Umami tracking script.

---

## Client API Capabilities

Once enabled and synchronized, the analytics runtime is injected into the client environment:

- Cached automatically in memory and local storage (default 1-hour cache duration);
- Access site stats, page stats, and active visitor counts via `window.oddmisc` in developer tools or custom components.
