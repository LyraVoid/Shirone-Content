# Album Media Scope

The sibling `README.md` is the complete album data contract. These local notes call out operational constraints that are easy to miss:

- Keep one `info.json` per `public/images/albums/<id>/` directory. For local albums, keep `cover.webp` or `cover.jpg` out of the numbered photo sequence; use zero-padded names when scanner order and stable public URLs matter.
- Preserve the `layout` and `columns` values through protected-album unlock. A protected album uses the same gallery contract as an unprotected album; the password is a static browser gate, not server-side authorization, and known files under `public/` remain directly addressable.
- Do not place secrets or claims of server authorization in album metadata. Remote media remains controlled by its remote host, and sample media must retain its existing licensing note.
- After changing `info.json` or image files, run `npx.cmd playwright test tests/site/albums.spec.ts` from the repository root. Check generated album routes and both protected and unprotected variants when applicable.
