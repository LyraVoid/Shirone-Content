---
title: "Markdown Field Parameter Cards"
description: "Structured layout for API and component parameter documentation."
published: 2026-08-30
draft: true
series: "starter-guide"
seriesOrder: 2
---

When documenting APIs, component props, or configuration options, use `field-group` containers to organize related parameters. Declare the field name on the first line of the container, add metadata tags, then write the description in Markdown.

:::: field-group

::: field tex
@type object
@optional

Configuration object for the TeX formula parser.
:::

::: field output
@type `'svg' | 'chtml'`
@default `'svg'`
@optional

Output format: vector SVG or standard HTML.
:::

::::

## Basic Field Cards

Required, optional, and deprecated states can be combined. Separate default values from types for quick scanning.

:::: field-group

::: field title
@type string
@required

Display title for the component. Shown in the page header; keep it short.
:::

::: field disabled
@type boolean
@default `false`
@optional

Whether the control is disabled.
:::

::: field locale
@type `'en' | 'zh_CN' | 'ja'`
@default `'zh_CN'`
@optional

Locale code for formatting dates and text.
:::

::::

## Rich Content Descriptions

Field descriptions support full Markdown syntax. Use links, bold text, lists, and inline code after the metadata lines.

:::: field-group

::: field render
@type `(value: unknown) => string`
@required

Function to render a data value into final output. The callback must return a **safe string**.

- Keep rendering logic deterministic;
- Avoid async network requests inside the callback.
:::

::: field retries
@type number
@default `3`
@optional

Maximum number of retries on request failure.
:::

::: field legacyMode
@type boolean
@deprecated

Retained for backward compatibility. New projects should use the unified configuration.
:::

::::

## Standalone Field Usage

For annotating a single parameter in body text or next to a code block, use a standalone `field` block:

::: field format
@type `'short' | 'long'`
@default `'short'`
@optional

Controls the length of formatted output.
:::