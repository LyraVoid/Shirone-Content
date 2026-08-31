---
title: "Markdown 字段参数卡片"
description: "结构化 API 与组件参数说明卡片排版演示。"
published: 2026-08-30
draft: true
---

在编写 API 接口文档、组件属性说明或配置项清单时，使用 `field-group` 容器可将多个相关参数整齐排列。在三冒号首行声明字段名称，紧接着添加元数据标签，随后书写 Markdown 格式的详细说明文字。

:::: field-group

::: field tex
@type object
@optional

TeX 公式解析器配置对象。
:::

::: field output
@type `'svg' | 'chtml'`
@default `'svg'`
@optional

输出格式，支持矢量 SVG 或通用 HTML 结构。
:::

::::

## 基础字段卡片

必填、可选与废弃状态可自由组合。默认值与类型分开标注，便于读者快速扫描检索。

:::: field-group

::: field title
@type string
@required

组件的展示标题。此值将显示在页面头部，建议保持简短。
:::

::: field disabled
@type boolean
@default `false`
@optional

控件是否处于禁用状态。
:::

::: field locale
@type `'en' | 'zh_CN' | 'ja'`
@default `'zh_CN'`
@optional

用于格式化日期与文本的语言区域代码。
:::

::::

## 丰富内容描述

字段描述区域支持完整 Markdown 语法。在元数据行之后可自由使用超链接、文本加粗、列表与行内代码。

:::: field-group

::: field render
@type `(value: unknown) => string`
@required

用于将数据值渲染为最终输出的函数。回调需返回**安全字符串**。

- 保持渲染逻辑确定性；
- 避免在回调函数内部发起异步网络请求。
:::

::: field retries
@type number
@default `3`
@optional

请求失败时的最大重试次数。
:::

::: field legacyMode
@type boolean
@deprecated

保留用于向后兼容。新项目建议直接采用统一配置。
:::

::::

## 单字段独立使用

当仅需在正文或代码块旁对单个参数做标注时，可以直接使用独立的 `field` 块：

::: field format
@type `'short' | 'long'`
@default `'short'`
@optional

控制输出结果的格式化长度。
:::
