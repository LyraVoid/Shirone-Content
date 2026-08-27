# 内容撰写与数据管理手册

## 文章撰写（`content/posts/`）

所有常规博客文章均保存在 `content/posts/` 目录下，支持 `.md` 与 `.mdx` 格式。

### 1. 文章头部元数据规范

```yaml
---
title: "文章标题"
published: 2026-08-27
updated: 2026-08-28        # 可选，最后更新时间
description: "文章摘要介绍"  # 用于 SEO 与列表卡片描述
image: "https://example.com/cover.webp" # 封面图路径或外链
category: "技术分享"        # 分类名称
tags:
  - "Astro"
  - "前端"
pinned: false              # 是否置顶展示
draft: false               # 是否为草稿（设为 true 时生产构建自动排除）
comment: true              # 是否开启本篇文章评论区

# 文章加密保护（可选）
encrypted: false
password: "your_password"
passwordHint: "提示信息"
---
```

### 2. 丰富排版能力

- **代码高亮**：使用标准三反引号包裹，支持指定语言与代码高亮；
- **提示引用区块**：使用 `>` 编写引用与强调说明；
- **公式渲染**：支持标准 KaTeX 数学公式语法；
- **图表绘制**：使用 ```mermaid 代码块绘制流程图、时序图与架构图。

---

## 动态说说（`content/moments/`）

说说用于记录生活随笔、短评与即时动态，保存在 `content/moments/` 目录下。

### 说说元数据规范

```yaml
---
published: 2026-08-27 15:30:00
location: "北京"
mood: "material-symbols:sentiment-satisfied-outline-rounded" # Iconify 图标
tags:
  - "摄影"
  - "随笔"
pinned: false
draft: false
images:
  - src: "https://example.com/photo1.webp"
    alt: "拍摄配图"
---

这里是说说的正文内容，支持完整的 Markdown 基础排版语法。
```

---

## 特殊单页文案（`content/spec/`）

- `content/spec/about.md`：关于页面正文文案；
- `content/spec/friends.md`：友链申请页面的申请规范与说明文案。

---

## 数据实体管理（`data/`）

独立页面的结构化数据采用纯 TypeScript 文件维护，支持完整的类型推断：

| 文件路径 | 对应展示页面 | 关键字段说明 |
| --- | --- | --- |
| `data/anime.ts` | `/anime/`（追番） | `title`, `cover`, `rating`, `status`, `progress`, `year`, `genres` |
| `data/devices.ts` | `/devices/`（设备） | `id`, `name`, `brand`, `category`, `status`, `specs`, `description`, `icon` |
| `data/friends.ts` | `/friends/`（友链） | `title`, `imgurl`, `desc`, `siteurl`, `tags` |
| `data/music.ts` | 侧栏播放器本地曲目 | `id`, `title`, `artist`, `cover`, `source`, `duration` |
| `data/projects.ts` | `/projects/`（项目） | `key`, `title`, `summary`, `category`, `phase`, `technologies`, `repository` |
| `data/skills.ts` | `/skills/`（技能） | `name`, `description`, `icon`, `category`, `level` |
| `data/timeline.ts` | `/timeline/`（时间线） | `title`, `date`, `category`, `description`, `highlights`, `tags`, `links` |
| `data/compass.ts` | `/compass/`（罗盘） | 分组 `key`、`name` 与单个条目 `label`、`href`、`icon`、`note` |

---

## 相册管理（`public/images/albums/`）

相册系统通过目录驱动，在 `public/images/albums/<相册标识>/` 下放置 `info.json` 即可生成独立相册。

### 1. 本地照片相册

在相册目录下放置 `cover.webp` 以及按序号命名的本地图片（`01.webp`, `02.webp`）：

```json
{
  "title": "北京之行",
  "description": "城市建筑与街头抓拍",
  "date": "2026-08-01",
  "location": "北京",
  "tags": ["摄影", "城市"],
  "layout": "masonry",
  "columns": 3,
  "hidden": false
}
```

### 2. 远端外链相册

使用 `mode: "external"` 并在 `photos` 数组中声明外链图片：

```json
{
  "mode": "external",
  "title": "自然风光",
  "description": "高画质风光摄影集",
  "date": "2026-08-01",
  "cover": "https://example.com/cover.webp",
  "tags": ["风光"],
  "layout": "masonry",
  "columns": 3,
  "photos": [
    {
      "src": "https://example.com/photo1.webp",
      "title": "山峦日落",
      "width": 1920,
      "height": 1080
    }
  ]
}
```

### 3. 加密相册

在 `info.json` 中配置 `"password": "访问密码"`，构建时会自动对照片数据进行静态加密封装，访客在浏览器输入正确密码后方可解密浏览。
