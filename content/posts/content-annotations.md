---
title: Content Annotations
published: 2026-08-27
description: Add compact, accessible supporting notes to Shirone articles without interrupting the reading flow.
tags: [Demo, Markdown, Annotation, Shirone]
category: Guide
lang: en
draft: false
---

Content annotations keep supporting context close to a sentence without placing it directly in the reading flow. Activate the small note marker to reveal its content.

## Basic syntax

Add a `[+label]` reference in ordinary prose, then define the matching note elsewhere in the same article.

```markdown
Astro renders most of a page ahead of time and hydrates **interactive islands** [+islands] only when they need to become interactive.

[+islands]:
  An island is an interactive UI component surrounded by static HTML. This keeps the default page lightweight while preserving focused interactivity.
```

Astro renders most of a page ahead of time and hydrates **interactive islands** [+islands] only when they need to become interactive.

[+islands]:
  An island is an interactive UI component surrounded by static HTML. This keeps the default page lightweight while preserving focused interactivity.

## Rich content

Definitions may contain paragraphs, emphasis, links, lists, and inline code [+rich-note] while the surrounding sentence continues normally.

[+rich-note]:
  **Authoring guidance**

  - Keep the first sentence self-contained.
  - Use a link when readers may need the primary source.
  - Prefer concise examples such as `client:visible`.

  See the [Astro islands documentation](https://docs.astro.build/en/concepts/islands/) for the full model.

## Multiple definitions

Reuse a label [+review] to present a short sequence of related notes behind one marker.

[+review]: Start with the decision that changes the reader's next action.
[+review]: Keep implementation evidence separate from background context.
[+review]: Remove details that belong in the main article instead of the annotation.

Undefined references such as `[+missing]` remain ordinary text, so an unfinished definition never creates an empty control.
