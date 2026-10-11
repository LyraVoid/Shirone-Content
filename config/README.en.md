# Site Configuration Overrides

Each YAML file in this directory overrides a specific configuration domain from the theme repository. During the build, the sync script in the code repo compiles these and recursively merges them with the theme's defaults.

## Merge rules

1. **Override only what you need.** Keys you don't specify inherit the theme's defaults, so you automatically get new default settings when the theme upgrades.
2. **Objects merge deeply; arrays replace entirely.** For dictionaries, the merge is recursive. For lists like navigation links, sidebar component lists, or font lists, the entire array is replaced. To change one item in a list, write out the full list.
3. **Type checking catches mistakes early.** All config files are validated against the theme's TypeScript types. Misspelled keys, out-of-range enum values, or type mismatches are caught before build with suggestions for fixing them.

## Available configuration files

| Config file | Theme config it overrides | What it controls |
| --- | --- | --- |
| `site.yaml` | `siteConfig` | Site title, language, banner wallpaper, theme color, and background texture |
| `profile.yaml` | `profileConfig` | Author avatar, nickname, bio, and social links |
| `license.yaml` | `licenseConfig` | Copyright notice at the bottom of article pages |
| `announcement.yaml` | `announcementConfig` | Announcement bar text and links at the top of the homepage |
| `font.yaml` | `fontConfig` | Custom body, Chinese, and monospace code fonts for the whole site |
| `nav-bar.yaml` | `navBarConfig` | Top navigation links, preset groups, and dropdown menus |
| `sidebar.yaml` | `sidebarConfig` | Single or dual column sidebar layout and component arrangement |
| `post-list.yaml` | `postListConfig` | Article list pagination size and layout mode |
| `permalink.yaml` | `permalinkConfig` | Global permalink format template and enable/disable switch |
| `article.yaml` | `articleConfig` | Article detail page reading time, expiration notice, and recommended reading |
| `comment.yaml` | `commentConfig` | Comment system provider and connection parameters |
| `context-menu.yaml` | `contextMenuConfig` | Desktop right-click context menu actions and page filters |
| `fab.yaml` | `fabConfig` | Floating action button position and feature list |
| `footer.yaml` | `footerConfig` | Toggle for custom HTML injection in the footer |
| `footer.html` | `FooterConfig.html` | Custom HTML snippet for the footer, such as ICP registration number |
| `devices.yaml` | `devicesConfig` | Device showcase page categories and display rules |
| `games.yaml` | `gamesConfig` | Game showcase page categories and filter rules |
| `anime.yaml` | `animeConfig` | Anime tracking page data source mode and snapshot pull strategy |
| `music.yaml` | `musicConfig` | Sidebar music player mode and playlist configuration |
| `projects.yaml` | `projectsConfig` | Open source project showcase categories and filter rules |
| `skills.yaml` | `skillsConfig` | Skills graph page categories and display rules |
| `timeline.yaml` | `timelineConfig` | Timeline event categories and sort order |
| `image-bloom.yaml` | `imageBloomConfig` | Image color bloom placeholder animation parameters |
| `expressive-code.yaml` | `expressiveCodeConfig` | Syntax highlighting theme for code blocks in articles |
| `llms.yaml` | `llmsConfig` | LLM and AI search endpoints (/llms.txt and /llms-full.txt), excluded tags, and core navigation pages |
| `umami.yaml` | `umamiConfig` | Umami website traffic and online visitor analytics |
| `series.yaml` | `seriesConfig` | Series index page title, description, and in-article series card display position |
