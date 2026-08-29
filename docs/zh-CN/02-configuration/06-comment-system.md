# 评论系统配置

Shirone 遵循**零额外负担原则**：当评论系统未启用（`enable: false` 或省略）时，系统绝不发起任何外部网络请求，客户端不加载任何第三方 JS 脚本，保持纯净性能。

本篇文档介绍如何通过 `config/comment.yaml` 接入 [Twikoo](https://twikoo.js.org/) 评论系统。

评论系统在文章底部的展示效果：

![Twikoo 评论系统在文章底部的展示界面](../../images/02-config/06-comment/01-twikoo-comment-preview.png)
*图 1-1：Twikoo 评论系统在文章底部的展示界面*

---

## 接入步骤

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
  scriptUrl: "https://cdn.jsdelivr.net/npm/twikoo@1.7.19/dist/twikoo.min.js"

  # 界面语言："auto"（跟随站点语言）| "zh-CN" | "zh-TW" | "en" | "ja"
  lang: "auto"

  # 评论输入框占位提示文字
  placeholder: "欢迎留下你的想法与评论..."
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
