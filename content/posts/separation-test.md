---
title: "Shirone 内容与配置分离端到端全量测试"
published: 2026-08-28
description: "本文用于对 Shirone 独立内容仓架构进行全链路功能与语法扩展验证。"
category: "工程架构"
tags:
  - "Architecture"
  - "Separation"
  - "M3E"
  - "Test"
pinned: true
draft: false
comment: true
---

* [SSR]: 服务端静态渲染（Server-Side Rendering）
* [AST]: 抽象语法树（Abstract Syntax Tree）

这是一篇来自独立内容仓库的测试文章。Shirone 博客主题通过内容物化与配置覆盖机制实现了完全解耦，支持零水合开销的 SSR 架构与 AST 解析。

## 1. 提示与警告容器

:::tip
这是一条在独立内容仓库中编写的 Tip 技巧提示。
:::

:::important
这是一条关键的重要信息说明，用于测试 M3E 风格容器。
:::

:::warning
这是一条需要注意的警告提醒。
:::

## 2. 选项卡组容器

:::option-group
=== npm
```bash
npm install
```
=== pnpm
```bash
pnpm install
```
=== yarn
```bash
yarn install
```
:::

## 3. 折叠面板容器

:::collapse{title="点击展开架构细节" default-open=false}
这里是默认折叠的详细内容，验证平滑展开与 Markdown 嵌套。
:::

## 4. 步骤列表容器

:::steps
1. **配置独立仓库**
   在 `config/*.yaml` 中配置全站个性化参数。

2. **编写内容与数据**
   在 `content/` 与 `data/` 下撰写文章与页面数据。

3. **双仓联动部署**
   通过 GitHub Actions 或 Webhook 触发自动构建。
:::

## 5. 交互式代码树

:::code-tree{title="分离架构核心流向" height="300px" entry="config/site.yaml"}
```yaml title="config/site.yaml"
title: "Shirone"
themeColor:
  hue: 315
```

```json title="shirone.content.json"
{
  "name": "shirone-test-content",
  "schemaVersion": "1.0.0"
}
```
:::

## 6. 行内批注与高亮标记

在独立仓库中编写批注^[这是一条测试批注，验证批注扩展在双仓下的渲染表现]与 ==M3E 荧光高亮标记== 均可正常生效。

## 7. 数学公式

质能守恒：$E = mc^2$

高斯积分：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
