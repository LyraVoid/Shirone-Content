# Album Directory

Create a separate directory for each album under `public/images/albums/<album-id>/`.

Each album directory must include an `info.json` metadata file:

## Local Album Example

```json
{
  "title": "Sample Album",
  "description": "Album description",
  "date": "2026-08-01",
  "location": "Beijing",
  "tags": ["photography", "daily"],
  "layout": "masonry",
  "columns": 3,
  "hidden": false
}
```

Place the cover image as `cover.webp` and photos as numbered files like `01.webp`, `02.webp` directly in the album directory.

## Remote Album Example

```json
{
  "mode": "external",
  "title": "Remote Album",
  "description": "Album loaded via external links",
  "date": "2026-08-01",
  "cover": "https://example.com/cover.webp",
  "tags": ["landscape"],
  "layout": "masonry",
  "columns": 3,
  "photos": [
    {
      "src": "https://example.com/photo1.webp",
      "title": "Photo Title",
      "description": "Photo description",
      "width": 1920,
      "height": 1080
    }
  ]
}
```

## Password-Protected Albums

Add `"password": "your-password"` to `info.json` to require a password for album access.