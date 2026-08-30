# Extended Markdown Syntax Reference

Shirone incorporates a comprehensive suite of Markdown extension components adhering to Material 3 Expressive standards. All components are statically rendered via AST transformers at build time, ensuring zero runtime layout shifts and minimal client payload.

---

## 1. Callout Containers

### Custom Triple-Colon Container Syntax

```markdown
:::note
This is an informational note container.
:::

:::tip
This is a helpful tip container.
:::

:::important
This is an important notice container.
:::

:::warning
This is an operational warning container.
:::

:::caution
This is a high-risk caution container.
:::
```

### GitHub Alert Blockquote Compatibility
Standard GitHub alert blockquotes are also fully supported:

```markdown
> [!NOTE]
> Informational note content

> [!TIP]
> Helpful tip content

> [!IMPORTANT]
> Important notice content

> [!WARNING]
> Operational warning content

> [!CAUTION]
> Caution alert content
```

---

## 2. Directory File Trees

Used to present project file structures and directory trees:

```markdown
:::file-tree
- src/
  - components/
    - atoms/
    - molecules/
    - organisms/
  - config/
    - siteConfig.ts
  - content/
    - posts/
- public/
- package.json
:::
```

---

## 3. Code and Multi-Option Tabs

Used to switch between different programming languages or configuration formats:

```markdown
:::tabs
== JavaScript
```javascript
console.log("Hello, Shirone!");
```

== TypeScript
```typescript
const greeting: string = "Hello, Shirone!";
console.log(greeting);
```

== Python
```python
print("Hello, Shirone!")
```
:::
```

---

## 4. Step-by-Step Procedure Guides

Used for numbered instruction sequences:

```markdown
:::steps
1. **Install Dependencies**
   Run `pnpm install` in your terminal to install dependencies.

2. **Configure Environment Variables**
   Set the local path or remote URL of your content repository.

3. **Start Local Preview**
   Run `pnpm dev` and open your browser for live preview.
:::
```

---

## 5. Collapsible Accordion Panels

Used to collapse lengthy logs, references, or troubleshooting steps:

```markdown
:::collapse-panel{title="Click to expand detailed diagnostic logs"}
Detailed logs and troubleshooting steps reside here.
Supports Markdown text, images, and code snippets.
:::
```

---

## 6. Text Highlighters and Spoilers

### Highlighter Pen Effect
```markdown
This is standard text, and ==this section is highlighted with a marker pen==.
```

### Spoiler Mask (Revealed on hover or click)
```markdown
The culprit is revealed to be :spoiler[the butler].
```

---

## 7. Mathematical Formulas

Full KaTeX math formula rendering:

### Inline Formulas
```markdown
Mass-energy equivalence is $E = mc^2$, and Euler's formula is $e^{i\pi} + 1 = 0$.
```

### Block Display Formulas
```markdown
$$
\int_{-\infty}^{+\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

---

## 8. Mermaid Diagrams and Flowcharts

Supports sequence diagrams, flowcharts, and state diagrams:

````markdown
```mermaid
flowchart LR
    A[Write content] --> B[Save file]
    B --> C[Incremental sync]
    C --> D[Browser hot reload]
```
````

---

## 9. GitHub Repository Cards

Embed interactive GitHub repository summary cards:

```markdown
::github{repo="LyraVoid/Shirone"}
```

---

## 10. Responsive Image Sizing and Gallery Grids

### Custom Image Width
```markdown
![Banner Image](/assets/images/banner.webp){width=75%}
```

### Multi-Image Side-by-Side Gallery
```markdown
:::image-grid{columns=2}
![Image 1](/images/sample1.webp)
![Image 2](/images/sample2.webp)
:::
```

---

## 11. Code Block Metadata and Highlighting

Code blocks support title frames, line highlighting, and diff markers:

````markdown
```typescript title="src/config/site.ts" ins={3-4} del={1}
const oldConfig = false;
export const siteConfig = {
  title: "My Blog",
  lang: "en"
};
```
````

---

## 12. Video Embed Components

Shirone provides responsive, lazy-loaded video embedding directives for major platforms and custom video playback:

### Bilibili Video Embed
```markdown
::bilibili{bvid="BV1fK4y1s7Qf" title="Bilibili Sample Video" p=1}
```

### YouTube Video Embed
```markdown
::youtube{id="5gIf0_xpFPI" title="YouTube Sample Video"}
```

### AcFun Video Embed
```markdown
::acfun{acid="ac48649632" title="AcFun Sample Video"}
```

### ArtPlayer Custom HTML5 Video Player
Ideal for local MP4/WebM videos placed under `public/` or external HTTPS CDN URLs:
```markdown
::artplayer{src="/videos/example.mp4" title="Sample Demo Video"}
```

---

## 13. Inline Audio Reader and Pronunciation Player

Embed lightweight inline audio chips into flowing prose:

```markdown
Listen to the audio pronunciation sample: :audio-reader[Daily Greeting]{src="/assets/audio/Ciallo.wav"}
```

---

## 14. Markdown Includes and Snippet Reuse

Reuse shared Markdown snippets across articles with support for line ranges and named regions:

```markdown
<!-- Full file include -->
<!-- @include: ../snippets/common-notice.md -->

<!-- Line range include (lines 2 to 8) -->
<!-- @include: ../snippets/api-example.md{2-8} -->

<!-- Named region include (#public-api) -->
<!-- @include: ../snippets/api-example.md#public-api -->
```

---

## 15. Abbreviations and Content Annotations

### Abbreviations (Hover tooltip expansion)
Define abbreviations anywhere in your document (typically at the bottom):
```markdown
*[SSR]: Server-Side Rendering
*[AST]: Abstract Syntax Tree

Both SSR and AST transformations take place during static build.
```

### Inline Content Annotations
```markdown
Astro leverages an Islands architecture [+islands].

[+islands]:
  Islands are interactive UI components embedded within purely static HTML.
```
