# Sidebar Music Player Configuration

`config/music.yaml` controls the integrated music player in the blog sidebar.

---

## Operating Modes Comparison

| Mode Name | `provider` Value | Data Source | Features and Use Cases |
| :--- | :--- | :--- | :--- |
| **Mixed Enhanced Mode** (Recommended) | `"mixed"` | `data/music.ts` + Cloud playlist | Instant first-screen playback from local audio; asynchronously fetches remote playlist; silently falls back to local tracks on network error |
| **Pure Local Mode** | `"local"` | `data/music.ts` | Zero external network requests; loads local assets directly on first screen; fully functional offline |
| **Custom List Mode** | `"custom"` | `tracks` array in YAML | Quick inline declaration of external audio tracks in configuration |
| **Cloud Playlist Mode** | `"meting"` | NetEase / QQ Music public playlists | Fetches remote platform playlists with automated cover and lyric resolution |

Player expanded state and playlist view:

![Sidebar Music Player Expanded View](../../images/02-config/05-music/01-music-player-preview.png)
*Figure 1-1: Sidebar music player expanded state and playlist interface*

---

## Mode 1: Mixed Enhanced Mode (Recommended)

```yaml
enable: true
provider: "mixed"

# Default initial volume (0.0 to 1.0)
defaultVolume: 0.7

# Default playback mode:
# - "sequence": Sequential playback (default)
# - "repeat-one": Single track repeat
# - "shuffle": Shuffle playback
defaultMode: "sequence"

# Cloud playlist settings
meting:
  server: "netease"     # Music provider: "netease" (NetEase) | "tencent" (QQ Music) | "kugou" (Kugou)
  type: "playlist"      # Resource type: "playlist" | "song" | "album"
  id: "14164869977"     # Playlist ID
```

---

## Mode 2: Pure Local Mode

Ideal for hosting audio files under `public/assets/music/` or in private object storage:

```yaml
enable: true
provider: "local"
defaultVolume: 0.7
defaultMode: "sequence"
```

Tracks are declared in `data/music.ts`, for example:

```typescript
export const musicTracks = [
  {
    id: "song-1",
    title: "口笛で愛は歌えない",
    artist: "Dazbee",
    cover: "assets/images/music/dazbee.webp",
    source: "/assets/music/dazbee.mp3",
    duration: 241
  }
];
```

---

## Mode 3: Custom List Mode

Define track items directly in the YAML configuration:

```yaml
enable: true
provider: "custom"
defaultVolume: 0.7
defaultMode: "sequence"

tracks:
  - id: "custom-1"
    title: "春雷の頃"
    artist: "22/7"
    cover: "https://example.com/cover.webp"
    source: "https://example.com/audio.mp3"
    duration: 242
```

---

## Obtaining NetEase Music Playlist ID

1. Open [NetEase Cloud Music Web](https://music.163.com/) in your browser;
2. Navigate to your desired public playlist;
3. Check the browser address bar for the URL:
   `https://music.163.com/#/playlist?id=14164869977`
4. The trailing numeric ID `14164869977` is your playlist ID; enter it into `meting.id`.
