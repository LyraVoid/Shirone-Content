# Moments Publishing Guide

Moments are lightweight micro-posts designed for capturing spontaneous thoughts, brief essays, daily updates, or photography snapshots, rendered on the `/moments/` timeline.

---

## Creating a New Moment

Create a new Markdown file inside the content repository under `content/moments/`.

We recommend date-prefixed filenames, for example:
`content/moments/2026-08-27-cafe-afternoon.md`

---

## Moment Metadata and Content Format

Every moment file contains YAML frontmatter:

```yaml
---
# Publication timestamp (required; includes hours, minutes, and seconds)
published: 2026-08-27 16:45:00

# Location (optional)
location: "Beijing · Chaoyang"

# Mood icon (optional; Iconify icon identifier)
mood: "material-symbols:sentiment-satisfied-outline-rounded"

# Tags list (optional)
tags:
  - "Daily"
  - "Cafe"

# Pin to top of moments stream (defaults to false)
pinned: false

# Draft flag (defaults to false)
draft: false

# Encryption (optional; a non-empty password enables it, no need to also set encrypted: true)
encrypted: false
password: ""
passwordHint: ""

# Photo grid image list (optional; supports multiple images)
images:
  - src: "https://example.com/photo1.webp"
    alt: "Afternoon tea snapshot"
  - src: "https://example.com/photo2.webp"
    alt: "Coffee latte art"
---

The afternoon sun was gentle today. Spent hours coding at my favorite corner cafe.
The autumn breeze makes everything feel calm and refreshing.
```

Moments timeline and image grid preview:

![Moments Timeline and Image Grid](../../images/03-content/02-moments/01-moments-timeline-preview.png)
*Figure 1-1: Moments timeline feed and multi-image card layout*

---

## Recommended Mood Icons

Discover additional icons on [Icones Icon Explorer](https://icones.js.org/). Popular choices include:

- Happy & Cheerful: `material-symbols:sentiment-satisfied-outline-rounded`
- Excited: `material-symbols:sentiment-excited-outline-rounded`
- Focused & Neutral: `material-symbols:sentiment-neutral-outline-rounded`
- Tired: `material-symbols:sentiment-sad-outline-rounded`
- Inspired: `material-symbols:lightbulb-outline-rounded`

---

## Encrypted Moments

Works just like posts: a non-empty `password` turns encryption on, and `encrypted: true` only spells it out. If you set `true` but forget the password, the build stops with `Encrypted moments require a non-empty password`.

```yaml
---
published: 2026-09-02 21:00:00
encrypted: true
password: "your-super-secret-password"
passwordHint: "My favourite anime"
tags: ["Diary"]
---

This body only appears after unlocking.
```

- **Encrypted**: body, location, mood, display tags and the image list (references).
- **Public**: publish time, pinned state, password hint and the `filterTags` used by the filter bar; tags remain visible.
- **Images are not encrypted**: image files still sit under `public/` and anyone with the URL can open them—don't use an encrypted moment for sensitive images.
- **No unlock cache**: refreshing or re-entering `/moments/` asks for the password again; posts and albums remember it for the current tab.
