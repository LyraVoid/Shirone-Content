# Top Navigation Bar and Sidebar Layout

## 1. Top Navigation Bar: `config/nav-bar.yaml`

The top navigation bar defines menu items for desktop headers and the mobile navigation drawer. The link list follows a **full array replacement** strategy; your configuration should list all items you want to display.

### Navigation Item Authoring Methods

#### Method A: Using Built-in Theme Presets (Recommended)
Theme presets automatically resolve localized titles, M3E iconography, and active route highlighting:
```yaml
links:
  - preset: Home        # Homepage
  - preset: Archive     # Post Archive
  - preset: Friends     # Friend Links
  - preset: Moments     # Micro-blog Moments
```

**Theme Navigation Presets Reference Table**:
| Preset Name | Route Path | Default Purpose |
| :--- | :--- | :--- |
| `Home` | `/` | Main blog home and latest post feed |
| `Archive` | `/archive/` | Chronological post archive |
| `Friends` | `/friends/` | Friend links collection |
| `Moments` | `/moments/` | Micro-blogging moments feed |
| `Anime` | `/anime/` | Anime and drama watchlists |
| `Compass` | `/compass/` | Site compass and curated bookmarks |
| `Skills` | `/skills/` | Skills matrix and proficiency ratings |
| `Projects` | `/projects/` | Open source projects and works |
| `Devices` | `/devices/` | Personal hardware and desk setup |
| `Timeline` | `/timeline/` | Historical milestone timeline |
| `Albums` | `/albums/` | Photography and gallery albums |
| `Categories` | `/categories/` | Post category index |
| `Tags` | `/tags/` | Tag cloud index |
| `About` | `/about/` | Author profile and introduction |
| `GitHub` | Source repo URL | External GitHub repository link |

#### Method B: Custom Internal or External Links
Specify custom titles, URLs, and Iconify icons:
```yaml
links:
  - name: "Knowledge Base"
    url: "https://wiki.example.com"
    icon: "material-symbols:menu-book-rounded"
    external: true     # Opens in a new tab
```

#### Method C: Multi-Level Dropdown Menus
Use the `children` array to create expandable dropdown submenus:
```yaml
links:
  - name: "Profile"
    icon: "material-symbols:account-circle-outline-rounded"
    children:
      - preset: About
      - preset: Skills
      - preset: Projects
      - preset: Devices
      - preset: Timeline
```

![Top Navigation Dropdown Submenu](../../images/02-config/03-navbar/01-navbar-dropdown.png)
*Figure 1-1: Multi-level dropdown submenu in top navigation bar*

---

## 2. Sidebar Layout Configuration: `config/sidebar.yaml`

Shirone provides a data-driven sidebar layout system supporting single-column or dual-column layouts on wide displays, with granular control over sticky behavior and page routing filters.

### Complete Configuration Example

```yaml
enable: true

# Sidebar layout mode:
# - "single": Single-column layout (all components in one sidebar)
# - "dual": Dual-column layout (expands to 3-column layout on displays >= 1280px)
arrangement: "dual"

# Primary sidebar placement: "left" (default) | "right"
side: "left"

# Sidebar components list (rendered top-to-bottom in array order)
components:
  # 1. Author profile card (reads from profile.yaml)
  - type: "profile"
    enable: true
    slot: "top"         # "top" fixes component at the top

  # 2. Sidebar music player (reads from music.yaml)
  - type: "music"
    enable: true
    slot: "top"

  # 3. Homepage announcement banner (filtered to homepage only)
  - type: "announcement"
    enable: true
    slot: "top"
    pages: ["home"]     # Page filter

  # 4. Post categories list (sticky positioning)
  - type: "categories"
    enable: true
    slot: "sticky"      # "sticky" remains in viewport during page scroll
    collapseAfter: 5    # Shows "Expand" button when exceeding 5 items

  # 5. Tag cloud
  - type: "tags"
    enable: true
    slot: "sticky"
    collapseAfter: 15

  # 6. Site runtime statistics (placed in secondary column in dual mode)
  - type: "stats"
    enable: true
    slot: "top"
    column: "secondary" # "secondary" places in auxiliary column in dual mode

  # 7. Mini monthly post calendar
  - type: "calendar"
    enable: true
    slot: "top"
    column: "secondary"
    startOfWeek: "mon"  # First day of week: "mon" (Monday) | "sun" (Sunday)

  # 8. Table of contents (active only on post detail pages with sticky tracking)
  - type: "toc"
    enable: true
    slot: "sticky"
    column: "secondary"
    pages: ["post"]     # Post pages only
```

### Sidebar Component Parameters Reference

- **Docking Position (`slot`)**:
  - `"top"`: Positioned statically at the top of the sidebar;
  - `"sticky"`: Affixed within the sticky scroll container, persisting during long page scrolls.
- **Column Assignment (`column`)**:
  - `"primary"`: Placed in the main sidebar (default);
  - `"secondary"`: Placed in the secondary sidebar (active when `arrangement: "dual"` and screen width $\ge$ 1280px).
- **Page Filter (`pages`)**:
  - Omitting or supplying an empty array renders the component across all pages;
  - Supported page identifiers: `"home"`, `"archive"`, `"friends"`, `"moments"`, `"anime"`, `"compass"`, `"skills"`, `"projects"`, `"devices"`, `"timeline"`, `"albums"`, `"about"`, `"categories"`, `"tags"`, `"post"`, `"rss"`, `"atom"`.

---

## 3. Desktop Context Menu: `config/context-menu.yaml`

Shirone features a Material 3 Expressive desktop context menu with zero extra burden: when disabled, zero DOM footprint, zero client runtime listeners, and zero external requests are produced.

### Configuration Example

```yaml
# Master toggle: whether to enable desktop context menu
# When set to false, zero DOM nodes and zero client scripts are injected
enable: true

# Page filters: omit or leave empty to enable on all pages
# Restrict to specific pages if desired
pages:
  - home
  - post
  - moments

# Actions list rendered in top-to-bottom array order
actions:
  - copySelection
  - backToTop
  - sharePageLink
```

### Actions and Trigger Rules

| Action ID | Action Label | Availability Criteria | Effect |
| :--- | :--- | :--- | :--- |
| `copySelection` | Copy Selection | Non-empty text selection intersecting target | Copies selected plain text to clipboard |
| `backToTop` | Back to Top | Page has scrolled down | Smoothly scrolls viewport back to page top |
| `sharePageLink` | Copy Page Link | Always available on allowed pages | Copies full current page URL to clipboard |

### Interaction and Accessibility Features
- **Context-Aware Visibility**: Irrelevant actions are hidden rather than disabled (e.g. Copy is absent when no text is selected);
- **Keyboard Navigation**: Use Arrow keys to cycle items, Home/End to jump to bounds, and Escape to close;
- **Client-Side Routing Resilience**: Managed at the persistent layout layer, automatically closing and reconnecting across Swup page transitions.
