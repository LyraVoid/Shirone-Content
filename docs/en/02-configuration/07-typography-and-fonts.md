# Typography and Global Font Configuration

`config/font.yaml` manages site-wide typography families, fallback chains, and the automated font subsetting pipeline.

---

## Font Role Division

Shirone categorizes typography into 3 distinct roles:
1. `body`: Latin characters and base punctuation (alphanumeric glyphs, common Western symbols);
2. `cjk`: Chinese, Japanese, and Korean glyphs (Simplified/Traditional Chinese, Hiragana, Katakana, Hangul);
3. `mono`: Monospace code fonts (used in code blocks, inline code, and terminal outputs).

---

## Mode 1: Pure System Fonts Mode (Zero Font Asset Downloads)

If you prioritize zero font download overhead and rely entirely on client device system fonts, set `mode` to `system`:

```yaml
mode: "system"
fontFamilies: []
```

In this mode, the build system bundles no font assets, delivering the smallest possible payload and fastest initial load times.

---

## Mode 2: Custom Fonts Mode (Recommended Default)

Leverages modern Latin typefaces paired with rounded CJK fonts to achieve Material 3 Expressive aesthetics:

```yaml
mode: "custom"

fontFamilies:
  # 1. Modern Latin body font: Outfit
  - id: "outfit-body"
    family: "Outfit"
    role: "body"
    source: "fontsource"
    variants:
      - file: "@fontsource/outfit/400.css"
        weight: 400
        style: "normal"
      - file: "@fontsource/outfit/500.css"
        weight: 500
        style: "normal"
      - file: "@fontsource/outfit/700.css"
        weight: 700
        style: "normal"
    fallback: ["ui-sans-serif", "system-ui", "sans-serif"]
    display: "swap"
    preload: true

  # 2. CJK font: Yozai Medium (comprehensive Chinese and Japanese coverage)
  - id: "yozai-cjk"
    family: "Yozai Medium"
    role: "cjk"
    source: "local"
    variants:
      - file: "src/assets/fonts/Yozai-Medium.ttf"
        weight: 500
        style: "normal"
    fallback: ["system-ui", "sans-serif"]
    display: "swap"
    preload: true

  # 3. Monospace code font: JetBrains Mono
  - id: "jetbrains-mono"
    family: "JetBrains Mono"
    role: "mono"
    source: "fontsource"
    variants:
      - file: "@fontsource/jetbrains-mono/400.css"
        weight: 400
        style: "normal"
    fallback: ["ui-monospace", "monospace"]
    display: "swap"
    preload: false

# 4. Automated Font Subsetting Pipeline Configuration
subsetting:
  enable: true             # Automatically subsets CJK fonts during production build
  includeContent: true     # Scans all posts and moments content
  includeI18n: true        # Scans site-wide i18n dictionaries
  includeConfig: true      # Scans site configurations and navigation labels
  includeCommon: true      # Includes common punctuation and base symbols
  allowRemoteText: false   # Allows fetching remote text for analysis (keep false for safety)
```

---

## Automated Font Subsetting Pipeline

CJK font files typically range from 15MB to 30MB, which severely impacts page load speed if shipped intact. Shirone includes a fully automated Chinese/CJK font subsetting pipeline:

- **Development Environment**: Automatically loads full un-subsetted fonts so every newly typed CJK glyph renders immediately during local drafting;
- **Production Build Pipeline**: Automatically scans all articles, moments, configurations, and i18n dictionary files, dynamically extracting used glyphs into a customized `.woff2` font subset. This shrinks a 15MB font down to ~300KB (over 97% reduction), dramatically accelerating global load times.

---

## Using Your Own Local CJK Font

1. Place your `.woff2` or `.ttf` font file into the theme code repository at `src/assets/fonts/`;
2. Update `font.yaml` by pointing the `file` path under `role: "cjk"` to your font file. During build, the theme automatically runs subsetting and budget checks on it.
