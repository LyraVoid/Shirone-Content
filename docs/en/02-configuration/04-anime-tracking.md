# Anime and Drama Tracking Page Configuration

`config/anime.yaml` manages data sources and rendering policies for the `/anime/` tracking page.

---

## Core Design Philosophy

The anime tracking page employs a **local-first and zero client-side blocking** architecture:
- Regardless of external synchronization providers, the client browser never sends blocking requests directly to Bilibili or Bangumi;
- External data is fetched and stored as local snapshot files during build time, ensuring fast local rendering unaffected by third-party API instability;
- If external API requests fail or time out, the system silently falls back to local data in `data/anime.ts` to prevent broken layouts.

Anime tracking page rendering preview:

![Anime Tracking Page Preview](../../images/02-config/04-anime/01-anime-page-preview.png)
*Figure 1-1: Anime and drama tracking page cards and progress bars*

---

## Operating Modes

### Mode 1: Pure Local Data Mode (Recommended Default)

Best for maintaining watchlists manually with zero external dependencies and guaranteed stability.

```yaml
enable: true
pageSize: 12            # Items per page; omitted or invalid values fall back to 12

source:
  kind: "local"         # Reads directly from data/anime.ts
```

Simply append anime entries in TypeScript format within `data/anime.ts`. Ratings, episode progress, and status tags are generated automatically.

---

### Mode 2: Bangumi Account Synchronization

Synchronizes anime and drama collections from your public Bangumi account.

```yaml
enable: true

source:
  kind: "snapshot"
  provider: "bangumi"
  file: "bangumi.json"
  fetchOnDev: true

fallback:
  kind: "local"         # Falls back to data/anime.ts on sync failure

providers:
  bangumi:
    enable: true
    userId: "your_bangumi_username_or_id"
    # Cover image handling mode:
    # - "remote": Load direct bgm.tv links (default; the image host has no hotlink protection)
    # - "local": Download covers into the local static directory during sync
    # - "none": Disable covers and use theme gradient placeholders
    cover:
      mode: "remote"
      # Optional mirror prefix concatenated directly with the full cover URL (remote mode only)
      mirror: ""
    request:
      pageSize: 30       # Items fetched per request
      maxItems: 300      # Upper limit of fetched items
      minDelayMs: 300    # Rate limiting delay in milliseconds
```

---

### Mode 3: Bilibili Watchlist Synchronization

Synchronizes anime and drama watchlists from your Bilibili space.

```yaml
enable: true

source:
  kind: "snapshot"
  provider: "bilibili"
  file: "bilibili.json"
  fetchOnDev: true

fallback:
  kind: "local"

providers:
  bilibili:
    enable: true
    # Numeric UID of your Bilibili user space (e.g., 114514)
    vmid: "114514"
    # Environment variable name holding SESSDATA (never hardcode tokens in YAML)
    sessdataEnv: "BILI_SESSDATA"
    # Cover image handling mode:
    # - "local": Downloads cover images locally during build, zero external requests (recommended)
    # - "remote": Loads direct image links from Bilibili
    # - "none": Disables covers, using theme color gradients instead
    cover:
      mode: "local"
      useWebp: true
```

#### Obtaining Bilibili Space UID:
Open your personal space page; the trailing number in the URL is your UID:

![Bilibili Space UID](../../images/02-config/04-anime/02-bilibili-id.png)
*Figure 1-2: Bilibili personal space URL and UID location*

#### Obtaining Bilibili SESSDATA:
Locate the stored Cookie entry in your browser's Developer Tools:

![Bilibili SESSDATA Cookie](../../images/02-config/04-anime/03-bilibili-sessdata.png)
*Figure 1-3: Retrieving SESSDATA credential from browser cookies*

> Security Notice: If your Bilibili watchlist is set to private, configure `BILI_SESSDATA` in GitHub Actions Secrets or your local environment. **Never commit raw cookie credentials into YAML configuration files.**

---

## Page Pagination vs. Sync Batch Size

`pageSize` shows up in two places—don't mix them up:

| Setting | Purpose | Default |
| --- | --- | --- |
| Top-level `pageSize` | Anime entries rendered per page on `/anime/` | `12` |
| `providers.<provider>.request.pageSize` | Entries requested per sync batch | Bangumi `50` / Bilibili `30` |

```yaml
enable: true
pageSize: 12            # Items per page; positive integer. Omitted, 0, negative or fractional values fall back to 12
```

A pager appears once the list spans more than one page. Search, status and page number are written into the URL (`?q=` / `?status=` / `?page=`), so a refresh or a shared link keeps the same view; changing the search or status jumps back to page 1.
