# 评论系统配置

Shirone 遵循**零额外负担原则**：当评论系统未启用（`enable: false` 或省略）时，系统绝不发起任何外部网络请求，客户端不加载任何第三方 JS 脚本，保持纯净性能。

本篇文档介绍如何通过 `config/comment.yaml` 接入评论系统。当前支持两个 Provider：

- [Twikoo](https://twikoo.js.org/)：需要自建或托管后端（Vercel、Railway、腾讯云开发、独立服务器等）；
- [Giscus](https://giscus.app/)：基于 GitHub Discussions，**零后端**，评论数据存储在你自己的公开仓库中。

评论系统在文章底部的展示效果：

![Twikoo 评论系统在文章底部的展示界面](../../images/02-config/06-comment/01-twikoo-comment-preview.png)
*图 1-1：Twikoo 评论系统在文章底部的展示界面*

---

## 接入 Twikoo

### 第一步：获取 Twikoo 服务端环境地址

参考 [Twikoo 官方文档](https://twikoo.js.org/) 部署好你的服务端（支持部署在 Vercel、Railway、腾讯云开发或独立服务器），获取到你的环境地址或环境 ID（例如 `https://twikoo.example.com`）。

### 第二步：修改 `config/comment.yaml`

```yaml
# 1. 开启全局评论系统总开关
enable: true

# 2. 评论服务提供商设置为 twikoo
provider: "twikoo"

# 3. 开启视口懒加载（推荐保持 true，滚动到评论区附近时才动态加载外部脚本）
lazy: true

# 4. Twikoo 专有参数配置
twikoo:
  # 填入第一步获取到的环境 ID 或私有部署域名
  envId: "https://twikoo.example.com"

  # 前端脚本 CDN 地址（默认使用官方稳定版本）
  scriptUrl: "https://cdn.jsdelivr.net/npm/twikoo@1.7.20/dist/twikoo.min.js"

  # 界面语言："auto"（跟随站点语言）| "zh-CN" | "zh-TW" | "en" | "ja"
  lang: "auto"

  # 评论输入框占位提示文字
  placeholder: "欢迎留下你的想法与评论..."
```

---

## 接入 Giscus

Giscus 把评论区挂在 GitHub Discussions 上，无需部署任何服务端，适合已经用 GitHub 托管博客的博主。

### 第一步：准备仓库与 giscus App

1. 准备一个**公开** GitHub 仓库，并在仓库 Settings → General → Features 中开启 **Discussions**；
2. 安装 [giscus App](https://github.com/apps/giscus) 并授权给该仓库；
3. 打开 [giscus.app](https://giscus.app/zh-CN)，选择该仓库与 Discussion 分类（推荐 **Announcements**——仅维护者可开新讨论，避免访客误开主题帖），页面会生成 `data-repo-id` 与 `data-category-id`，记下这两个值。

### 第二步：修改 `config/comment.yaml`

```yaml
enable: true
provider: "giscus"

giscus:
  # 公开仓库，格式 "owner/repo"
  repo: "owner/repo"
  # 第一步获取的仓库 ID
  repoId: "R_xxxxxxxxxx"
  # 第一步获取的分类 ID
  categoryId: "DIC_xxxxxxxxxx"
```

`repo`、`repoId`、`categoryId` 三者**必填**，任一缺失时评论区静默关闭（与全局未启用完全等价，不报错、零额外负担）。

### 可选参数

```yaml
giscus:
  # ...必填字段同上...
  # Discussion 分类名（与 categoryId 对应，仅用于展示范围约束）
  category: "Announcements"
  # 页面与 Discussion 的映射：pathname | url | title | og:title | specific | number
  mapping: "pathname"
  # 严格标题匹配（SHA-1 校验），避免 GitHub 模糊搜索误配相似标题
  strict: false
  # 是否显示主贴表情反应
  reactionsEnabled: true
  # 是否向页面发送 Discussion 元数据（一般保持 false）
  emitMetadata: false
  # 评论输入框位置："bottom"（默认）| "top"
  inputPosition: "bottom"
  # 明暗两套 giscus 主题（主题键或自定义主题 CSS URL），
  # 站点明暗切换时自动同步给评论区
  theme:
    light: "light"
    dark: "dark"
  # 评论语言："auto" 跟随站点语言，或 giscus 语言码（如 "zh-CN"、"en"）
  lang: "auto"
  # giscus client.js 地址；自托管 giscus 时替换为自有地址
  scriptUrl: "https://giscus.app/client.js"
```

---

## 单独关闭某篇文章的评论

如果你希望在某篇特定文章或公告中关闭评论区，无需修改全局配置，只需在该文章的顶部头部信息中加上：

```yaml
---
title: "这是一篇禁止评论的通知"
comment: false
---
```
