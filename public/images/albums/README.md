# 相册目录说明

在 `public/images/albums/<相册标识>/` 下为每个相册建立一个独立目录。

每个相册目录下需要包含一个 `info.json` 元数据配置文件：

## 本地相册配置示例

```json
{
  "title": "示例相册",
  "description": "相册描述说明",
  "date": "2026-08-01",
  "location": "北京",
  "tags": ["摄影", "日常"],
  "layout": "masonry",
  "columns": 3,
  "hidden": false
}
```

本地相册直接在相册目录下放置 `cover.webp` 封面图以及按序号命名的照片文件，例如 `01.webp`、`02.webp`。

## 远端外链相册配置示例

```json
{
  "mode": "external",
  "title": "远端相册",
  "description": "通过网络外链加载的相册",
  "date": "2026-08-01",
  "cover": "https://example.com/cover.webp",
  "tags": ["风景"],
  "layout": "masonry",
  "columns": 3,
  "photos": [
    {
      "src": "https://example.com/photo1.webp",
      "title": "照片标题",
      "description": "照片描述",
      "width": 1920,
      "height": 1080
    }
  ]
}
```

## 加密相册

在 `info.json` 中配置 `"password": "你的密码"` 即可启用相册访问密码锁。
