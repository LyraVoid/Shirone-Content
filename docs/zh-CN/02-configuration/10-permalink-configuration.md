# 文章固定链接配置 (Permalink)

本篇文档介绍如何在内容仓库中配置全站文章的固定链接（Permalink）格式模板，以及如何为单篇文章指定根路径自定义链接或别名。

---

## 概述与核心能力

Shirone 提供了灵活且高度可定制的文章固定链接架构：

1. **默认行为（开箱即用）**：
   - 全站固定链接默认处于关闭状态（`enable: false`），文章路由保持为标准的 `/posts/<slug>/`（由文件名生成）。
2. **基于模板的全局固定链接**：
   - 启用后（`enable: true`），文章将根据配置的格式模板生成根级别 URL（例如 `/2024/12/01/my-post/`、`/42-my-post/` 或 `/tech/my-post/`）。
3. **单篇自定义根路径链接**：
   - 在文章的 Frontmatter 中设置 `permalink`，即可将其直接挂载到根路径下，拥有最高优先级。
4. **文章别名（Alias）**：
   - 在文章的 Frontmatter 中设置 `alias`，可生成 `/posts/<alias>/` 格式的备用路由与重定向访问。
5. **全站生态一致性**：
   - 生成的固定链接会在首页卡片、归档页、文章导航、发现轮播、RSS/Atom 订阅源及 LLM 数据端点中无缝生效。

---

## 配置文件 (`config/permalink.yaml`)

在内容仓库的 `config/permalink.yaml` 中进行如下配置：

```yaml
# 是否开启全局固定链接（默认为 false，关闭时文章访问链接为 /posts/<slug>/）
enable: false

# 全局固定链接格式模板（仅在 enable: true 时生效）
format: "%year%/%monthnum%/%day%/%postname%"
```

### 可用占位符一览

| 占位符 | 说明 | 示例 |
| --- | --- | --- |
| `%year%` | 4 位年份 | `2024` |
| `%monthnum%` | 2 位月份（01-12） | `05` |
| `%day%` | 2 位日期（01-31） | `18` |
| `%hour%` | 2 位小时（00-23） | `14` |
| `%minute%` | 2 位分钟（00-59） | `30` |
| `%second%` | 2 位秒数（00-59） | `00` |
| `%post_id%` | 按发布时间升序排列的连续序号（排除草稿，从 1 开始） | `1`, `42` |
| `%postname%` | 文件名 slug（转换为全小写） | `my-first-post` |
| `%raw_postname%` | 保留大小写的原始文件名 | `My-First-Post` |
| `%category%` | 分类名称（若无分类则默认为 "uncategorized"） | `tech` |

### 常见格式示例

- **按年月日层级划分**：
  ```yaml
  format: "%year%/%monthnum%/%day%/%postname%"
  # 生成 URL: /2024/05/18/my-first-post/
  ```
- **年月短横线连接**：
  ```yaml
  format: "%year%-%monthnum%-%postname%"
  # 生成 URL: /2024-05-my-first-post/
  ```
- **WordPress 风格纯数字 ID**：
  ```yaml
  format: "%post_id%-%postname%"
  # 生成 URL: /1-my-first-post/
  ```
- **按分类前缀划分**：
  ```yaml
  format: "%category%/%postname%"
  # 生成 URL: /tech/my-first-post/
  ```

---

## 单篇 Frontmatter 覆盖

可以在具体文章的 Markdown / MDX 头部进行个性化路径覆盖：

```yaml
---
title: "我的某篇特殊文章"
published: 2024-05-18
category: "笔记"

# 1. 自定义根路径固定链接（优先级最高，直接挂载在站点根路径）
permalink: "special/about-me"
# 最终解析 URL: /special/about-me/

# 2. 文章别名（挂载在 /posts/<alias>/ 路径下）
alias: "my-alias-name"
# 最终解析 URL: /posts/my-alias-name/
---
```

---

## 链接解析优先级

最终规范 URL 会严格按照以下优先级顺序进行解析判定：

1. **单篇 Frontmatter 中的 `permalink`**：显式指定时（如 `special/about-me`），直接解析为根路径 `/special/about-me/`。
2. **全局 `permalink.yaml` 配置**：当 `enable: true` 时，根据模板格式化生成。
3. **单篇 Frontmatter 中的 `alias`**：显式指定时（如 `my-alias`），解析为 `/posts/my-alias/`。
4. **默认文件名 Slug**：默认解析为 `/posts/<slug>/`。

---

## 最佳实践建议

1. **规范斜杠处理**：在 Frontmatter 中填写的 `permalink` 与 `alias`，其前后的首尾斜杠系统会自动规范化处理。
2. **避免根路径冲突**：由于自定义 `permalink` 直接挂载在根路径 `/` 下，请避免与博客核心页面（例如 `about`、`archive`、`friends`、`moments` 等）发生路由命名冲突。
3. **序号稳定性保证**：`%post_id%` 会严格跳过草稿状态的文章（`draft: true`），确保正式发布文章的数字序号始终稳定有序。
