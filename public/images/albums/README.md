# Albums

Create one directory per album under `public/images/albums/<id>/`.

Each directory needs an `info.json` file. Local albums use `cover.webp` or `cover.jpg` and automatically scan the remaining image files; keep the cover file out of the numbered photo sequence. If a basename has both a WebP and another image extension, the WebP file is selected. Filenames such as `sunset_beach.webp` expose `beach` as a photo tag.

For predictable local ordering and readable generated metadata, use zero-padded numeric names such as `01.webp`, `02.webp`, and `03.webp`. The scanner sorts names with numeric-aware `localeCompare`, and the basename contributes to the generated photo `alt`/`title`, tags, and public image URL. Avoid hashes or mixed prefixes unless they are intentional. When renaming an existing album, preserve the scanner order and run the album regression test afterward.

```json
{
  "title": "Local album",
  "description": "Album description",
  "date": "2025-08-01",
  "location": "Tokyo",
  "tags": ["travel"],
  "layout": "masonry",
  "columns": 3,
  "hidden": false
}
```

For remote media, set `mode` to `external` and provide `cover` plus a `photos` array. Each photo requires `src`; `thumbnail`, `alt`, `title`, `description`, `tags`, `width`, `height`, `camera`, `lens`, and `settings` are optional. Prefer supplying `width` and `height`: the gallery uses them to preserve the source aspect ratio and to order masonry photos by orientation. If omitted, dimensions are measured after the image loads.

`hidden: true` removes an album from `/albums/` but keeps its static detail route. A `password` creates a protected album. The build emits only an encrypted photo manifest to the protected page; the browser decrypts it after a successful password entry. The password itself is never sent to the browser. This is a static-site access gate, not server-side authorization. Remote URLs remain directly controlled by their host, and local files under `public/` remain directly addressable if their URL is known.

Protected albums use the same `layout` and `columns` contract as regular albums. Set `layout` to `masonry` when the album should use the left-to-right masonry gallery; unlocking must not require a separate layout configuration.

The included examples demonstrate local, external, hidden, and protected modes. The sample images are copied from the research fixture for development and are not claimed as generally redistributable media.

After changing an album's `info.json` or image files, run `npx.cmd playwright test tests/site/albums.spec.ts` from the project root.
