---
title: "Image Gallery Grid: Syntax and Complete Examples"
published: 2026-07-13
description: "A complete guide to image gallery grid syntax, parameters, cropping, responsive behavior, captions, and lightbox navigation."
tags: [Markdown, Gallery, Image Grid, Demo]
category: "Examples"
draft: false
---

`:::grid` is the blog's image gallery container directive. It arranges ordinary Markdown images in a responsive grid with a consistent aspect ratio and automatically enables lightbox viewing. Use it for article images, screenshots, portfolios, or small albums.

Images in the same gallery use the same card ratio. By default, center cropping fills every card and keeps each row tidy; clicking an image opens the complete original in a lightbox. Every gallery has its own lightbox group and does not mix with other images in the post.

> This post is both feature documentation and a visual test page. View the examples at desktop, tablet, and mobile widths, then click any image to verify lightbox grouping.

## Minimal Syntax

Write Markdown images directly between `:::grid` and the closing `:::`:

````markdown
:::grid
![Image description](./image-1.webp)

![Image description](./image-2.webp)
:::
````

Each image must occupy its own paragraph, with a blank line between images. Keep only images in a gallery; write paragraphs, lists, and code blocks outside the container.

Here is the result of the minimal syntax. Without parameters, the grid uses three columns, a `16/10` ratio, and `cover` by default.

:::grid
![Minimal syntax result: first image](./landscape-1.webp)

![Minimal syntax result: second image](./landscape-2.webp)
:::

## Parameters at a Glance

Write all parameters in braces after the opening directive: `:::grid{parameter="value"}`.

| Parameter | Allowed values | Default | Purpose |
| --- | --- | --- | --- |
| `columns` | Integers from `1` to `6` | `3` | Number of columns per row on desktop. Invalid values fall back to `3`. |
| `aspect` | A positive ratio, such as `16/9`, `3/4`, or `1/1` | `16/10` | The displayed card ratio, not the original image ratio. |
| `fit` | `cover`, `contain` | `cover` | Image fitting mode. `cover` crops to fill; `contain` preserves the complete image and may leave empty space. |

Complete example:

````markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![First image](./image-1.webp "Optional caption")

![Second image](./image-2.webp "Optional caption")

![Third image](./image-3.webp "Optional caption")
:::
````

The following result uses the three-column landscape syntax above. Compare the card ratio, column count, and the way a title takes precedence over alt text as the caption:

:::grid{columns="3" aspect="16/9" fit="cover"}
![Parameter example: first landscape image](./landscape-1.webp "Landscape caption 1")

![Parameter example: second landscape image](./landscape-2.webp "Landscape caption 2")

![Parameter example: third landscape image](./landscape-3.webp "Landscape caption 3")
:::

## Captions and Alt Text

An image's alt text serves both as accessible alternative text and as its default caption. When an image has an optional title, the title is used as the caption instead:

```markdown
![Text used for accessibility](./image.webp "Caption shown below the image")
```

In the same row, captions align to the bottom of every card. A wrapping caption does not make the others float at a different height. Ratio text such as `3:4` and `16:9` can be written directly in body text, headings, and alt text without escaping.

This example demonstrates the default alt-text caption, an explicit title caption, and bottom alignment for a longer caption:

:::grid{columns="3" aspect="1/1"}
![This image has no title, so its alt text is the caption](./square-1.webp)

![Second square image with accessible alt text](./square-2.webp "This title is displayed as the caption")

![Accessible description of a 3:4 poster](./square-3.webp "This is a longer caption for checking that every caption remains aligned to the bottom of its card when it wraps")
:::

## Layout and Cropping

Desktop layouts use the number of columns specified by `columns`. Below `768px`, grids use at most two columns; below `480px`, they switch to one column. The card wrapper fixes the `aspect` ratio and clips rounded corners, while the image fills the card without the theme's default image margins.

- Choose `cover`: the recommended default. Images are cropped from the center to fill the card, making the gallery look consistent.
- Choose `contain`: the full original image is shown without cropping. When its ratio differs from the card, the theme background remains visible; use this for images that cannot be cropped.
- To preserve the complete image without empty space, set `aspect` close to the original image ratio or place the image in a grid of its own.

The following examples place the same portrait images in `16/9` cards with `cover` and `contain`. The first crops them; the second preserves the full image and leaves background space.

````markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![Image description](./image-1.webp "Optional caption")

![Image description](./image-2.webp "Optional caption")
:::

:::grid{columns="3" aspect="16/9" fit="contain"}
![Image description](./image-1.webp "Optional caption")

![Image description](./image-2.webp "Optional caption")
:::
````

:::grid{columns="3" aspect="16/9" fit="cover"}
![First cover result](./default-portrait-1.webp "Cover: center crop")

![Second cover result](./default-portrait-2.webp "Cover: fill the card")

![Third cover result](./default-portrait-3.webp "Cover: a more consistent layout")
:::

:::grid{columns="3" aspect="16/9" fit="contain"}
![First contain result](./default-portrait-1.webp "Contain: preserve the complete original")

![Second contain result](./default-portrait-2.webp "Contain: empty space may appear")

![Third contain result](./default-portrait-3.webp "Contain: suitable for edge details")
:::

## Default Configuration

Without attributes, the default is three columns, a `16/10` ratio, and `cover` cropping. These three portrait images verify default cropping and captions.

````markdown
:::grid
![Image description](./image-1.webp)

![Image description](./image-2.webp)

![Image description](./image-3.webp)
:::
````

:::grid
![Default configuration: portrait image one](./default-portrait-1.webp)

![Default configuration: portrait image two](./default-portrait-2.webp)

![Default configuration: portrait image three](./default-portrait-3.webp)
:::

## Three-Column Portraits: 3:4

With `aspect="3/4"`, the three portrait images fill consistently proportioned vertical cards. If an original image has a different ratio, `cover` crops its edges from the center.

````markdown
:::grid{columns="3" aspect="3/4"}
![Portrait image description](./portrait-1.webp)

![Portrait image description](./portrait-2.webp)

![Portrait image description](./portrait-3.webp)
:::
````

:::grid{columns="3" aspect="3/4"}
![3:4 test image one](./default-portrait-1.webp "Portrait 1")

![3:4 test image two](./default-portrait-2.webp "Portrait 2")

![3:4 test image three](./default-portrait-3.webp "Portrait 3")
:::

## Three-Column Landscapes: 16:9

This set demonstrates a common video-cover ratio in a three-column layout. Cropping is minimal when the landscape images are close to the card ratio.

````markdown
:::grid{columns="3" aspect="16/9"}
![Landscape image description](./landscape-1.webp)

![Landscape image description](./landscape-2.webp)

![Landscape image description](./landscape-3.webp)
:::
````

:::grid{columns="3" aspect="16/9"}
![16:9 test image one](./feature-landscape-1.webp)

![16:9 test image two](./feature-landscape-2.webp)

![16:9 test image three](./feature-landscape-3.webp)
:::

## Two-Column Squares: 1:1

Two columns work well when larger preview cards are needed. The third image moves to the next row. The final row keeps its grid-track width instead of stretching images to fill the row.

````markdown
:::grid{columns="2" aspect="1/1"}
![Square image description](./square-1.webp)

![Square image description](./square-2.webp)

![Square image description](./square-3.webp)
:::
````

:::grid{columns="2" aspect="1/1"}
![1:1 test image one](./mixed-square-1.webp)

![1:1 test image two](./mixed-square-2.webp)

![1:1 test image three](./mixed-square-3.webp)
:::

## Four Columns with `contain`

`fit="contain"` does not crop the original image. When the image ratio differs from the card ratio, the theme background remains visible. This is intentional, not a layout issue. It also verifies that four-column grids and separate lightbox groups do not interfere with each other.

````markdown
:::grid{columns="4" aspect="16/9" fit="contain"}
![Image description](./image-1.webp)

![Image description](./image-2.webp)

![Image description](./image-3.webp)
:::
````

:::grid{columns="4" aspect="16/9" fit="contain"}
![Contain: portrait image one](./default-portrait-1.webp)

![Contain: portrait image two](./default-portrait-2.webp)

![Contain: portrait image three](./default-portrait-3.webp)
:::

## Single-Column Detail Image

One column is suitable when an image needs a larger reading size. It remains one column on desktop, tablet, and mobile, and the original is still available in the lightbox.

````markdown
:::grid{columns="1" aspect="16/9"}
![Image description](./detail.webp)
:::
````

:::grid{columns="1" aspect="16/9"}
![Single-column test image](./feature-landscape-1.webp)
:::

## Sparse Five-Column Row

Five columns verify a higher supported column count. With only three images, the final row remains left-aligned instead of stretching the images.

````markdown
:::grid{columns="5" aspect="1/1"}
![Thumbnail description](./thumb-1.webp)

![Thumbnail description](./thumb-2.webp)

![Thumbnail description](./thumb-3.webp)
:::
````

:::grid{columns="5" aspect="1/1"}
![Five-column test image one](./mixed-square-1.webp)

![Five-column test image two](./mixed-square-2.webp)

![Five-column test image three](./mixed-square-3.webp)
:::

## Mixed Images in Six Columns

Six columns are the current maximum. Mixing landscape and portrait images verifies `cover` cropping, captions on narrow cards, and a dense desktop layout. For readable article content, two to four columns are usually preferable.

````markdown
:::grid{columns="6" aspect="1/1"}
![Image description](./image-1.webp)

![Image description](./image-2.webp)

![Image description](./image-3.webp)

![Image description](./image-4.webp)

![Image description](./image-5.webp)

![Image description](./image-6.webp)
:::
````

:::grid{columns="6" aspect="1/1"}
![Six-column test image one](./default-portrait-1.webp)

![Six-column test image two](./default-portrait-2.webp)

![Six-column test image three](./default-portrait-3.webp)

![Six-column test image four](./feature-landscape-1.webp)

![Six-column test image five](./feature-landscape-2.webp)

![Six-column test image six](./feature-landscape-3.webp)
:::

## Four-Column Squares: 1:1

Four square images with the same ratio are a typical four-column layout. Desktop displays all four in one row; tablet collapses to two columns and mobile to one.

````markdown
:::grid{columns="4" aspect="1/1"}
![Square image description](./square-1.webp)

![Square image description](./square-2.webp)

![Square image description](./square-3.webp)

![Square image description](./square-4.webp)
:::
````

:::grid{columns="4" aspect="1/1"}
![Square image one](./square-1.webp)

![Square image two](./square-2.webp)

![Square image three](./square-3.webp)

![Square image four](./square-4.webp)
:::

## Six-Column Landscapes: 16:9

Six landscape columns work well for thumbnail previews, portfolios, and screenshot indexes. Even if original ratios differ slightly, `cover` fills every `16/9` card consistently.

````markdown
:::grid{columns="6" aspect="16/9"}
![Landscape image description](./landscape-1.webp)

![Landscape image description](./landscape-2.webp)

![Landscape image description](./landscape-3.webp)

![Landscape image description](./landscape-4.webp)

![Landscape image description](./landscape-5.webp)

![Landscape image description](./landscape-6.webp)
:::
````

:::grid{columns="6" aspect="16/9"}
![Landscape image one](./landscape-1.webp)

![Landscape image two](./landscape-2.webp)

![Landscape image three](./landscape-3.webp)

![Landscape image four](./landscape-4.webp)

![Landscape image five](./landscape-5.webp)

![Landscape image six](./landscape-6.webp)
:::

## Three-Column Portraits: 3:4

This group of six portrait images demonstrates a common layout for people, posters, or mobile screenshots. The images form two rows of three, with captions aligned to the bottom.

````markdown
:::grid{columns="3" aspect="3/4"}
![Portrait image description](./portrait-1.webp)

![Portrait image description](./portrait-2.webp)

![Portrait image description](./portrait-3.webp)

![Portrait image description](./portrait-4.webp)

![Portrait image description](./portrait-5.webp)

![Portrait image description](./portrait-6.webp)
:::
````

:::grid{columns="3" aspect="3/4"}
![Portrait image one](./portrait-1.webp)

![Portrait image two](./portrait-2.webp)

![Portrait image three](./portrait-3.webp)

![Portrait image four](./portrait-4.webp)

![Portrait image five](./portrait-5.webp)

![Portrait image six](./portrait-6.webp)
:::

## Edge-Critical Content: `cover` and Lightbox

These images contain important text or details near their edges. `cover` keeps the grid tidy but may crop those edges; click an image to view the uncropped original in the lightbox. Use clear captions for edge-sensitive images, or use `contain` below.

````markdown
:::grid{columns="3" aspect="16/9" fit="cover"}
![Edge-critical content](./critical-1.webp "Open the lightbox to view the complete edge content")

![Edge-critical content](./critical-2.webp "Open the lightbox to view the complete edge content")

![Edge-critical content](./critical-3.webp "Open the lightbox to view the complete edge content")
:::
````

:::grid{columns="3" aspect="16/9" fit="cover"}
![First edge-critical image](./critical-1.webp "Open the lightbox to view the complete edge content")

![Second edge-critical image](./critical-2.webp "Open the lightbox to view the complete edge content")

![Third edge-critical image](./critical-3.webp "Open the lightbox to view the complete edge content")
:::

## Extreme Ratios with `contain`

For banners, long screenshots, and other extreme image ratios, `contain` displays the complete original. Unlike `cover`, it may leave theme-background space, but it never crops content.

````markdown
:::grid{columns="3" aspect="16/9" fit="contain"}
![Complete screenshot description](./wide-1.webp)

![Complete screenshot description](./wide-2.webp)

![Complete screenshot description](./wide-3.webp)
:::
````

:::grid{columns="3" aspect="16/9" fit="contain"}
![Extreme-ratio image one](./extreme-1.webp)

![Extreme-ratio image two](./extreme-2.webp)

![Extreme-ratio image three](./extreme-3.webp)
:::

## Transparent Images

Transparent images reveal the card's theme background. This single-column `contain` example makes the transparent areas, original edges, and lightbox behavior easy to inspect.

````markdown
:::grid{columns="1" aspect="16/9" fit="contain"}
![Transparent image description](./transparent.webp)
:::
````

:::grid{columns="1" aspect="16/9" fit="contain"}
![Transparent-background test image](./transparent-1.webp)
:::

## Lightbox Navigation

Click any image in a grid to open the Fancybox lightbox. There you can zoom, rotate, enter fullscreen, view thumbnails, and navigate with the arrow keys. Navigation is limited to the current `:::grid` container: for example, clicking "16:9 test image one" only opens the other two landscape images in that section.

Ordinary Markdown images in the same post continue to be handled separately; they are not added to any grid gallery.

## Checklist

1. Images in each grid have consistent dimensions, with captions below the cards.
2. Images scale slightly on hover; after clicking, they can be zoomed, rotated, and navigated with the keyboard.
3. Clicking "16:9 test image one" lets the lightbox browse only the other two landscape images in that section.
4. Below 768px, grids use at most two columns; below 480px, they use one column.
5. Portrait images in "Four Columns with `contain`" are fully visible with empty space and no cropping.
6. Five- and six-column grids retain their specified column count on wide screens, then collapse to two or one column according to the responsive rules.
