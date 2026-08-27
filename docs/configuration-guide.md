# 全站配置指南

## 配置机制与合并原则

Shirone 的配置系统采用领域隔离与强类型合并设计。在内容仓库的 `config/` 目录下，每个 YAML 文件对应主题的一个配置领域：

1. **按需覆盖**：只需写出需要覆盖的键。未显式声明的字段自动使用主题内置默认值，在主题升级时自动应用新增配置项；
2. **字典对象深度合并**：嵌套字典会逐层向下递归合并；
3. **列表数组整体替换**：对于数组类型，例如导航栏链接、侧栏组件排布、字体清单，采用整体替换语义。若需修改列表中的某一单项，需写出完整的列表条目；
4. **编译期严格校验**：所有 YAML 配置在构建前都会被编译为 TypeScript 强类型对象并执行静态检查。键名拼写错误或类型不匹配会直接报错并给出修正提示。

---

## 核心配置领域详解

### 1. 站点基础与视觉定制：`site.yaml`

控制站点的基本标识、横幅壁纸、动态配色、背景纹理与顶部加载进度条：

```yaml
# 站点发布地址与基础子路径
site: "https://example.com/"
base: "/"
title: "我的博客"
subtitle: "记录生活与技术"
lang: "zh_CN"

# 顶栏排版：内容居中或靠左
topAppBar:
  contentAlign: "center"

# 主题配色系统
themeColor:
  hue: 315              # 默认色相，范围 0 到 360
  fixed: false          # 是否对访客固定颜色
  style: "tonalSpot"    # 配色风格：tonalSpot | vibrant | expressive 等
  spec: "2025"          # 规范版本："2021" 或 "2025"

# 背景模式与背景纹理系统
wallpaperMode:
  defaultMode: "banner" # 默认背景："banner" 壁纸模式，"none" 纯色模式

texture:
  enable: true
  # 纹理预设：none | starlight | cyber-dots | topography | geometric | sakura
  defaultPreset: "starlight"
  defaultOpacity: 0.12  # 纹理浓度，建议 0.05 到 0.25
  allowMotion: true     # 是否允许微动效

# 横幅壁纸与多图轮播
banner:
  src:
    desktop:
      - "assets/images/banner/desktop/1.webp"
    mobile:
      - "assets/images/banner/mobile/1.webp"
  position: "center"
  dim:
    enable: true
    opacity: 0.24
  homeText:
    enable: true
    title: "我的博客"
    subtitle:
      - "第一条副标题"
      - "第二条副标题"
    typewriter:
      enable: true
      speed: 100
      deleteSpeed: 50
      pauseTime: 2000
      loop: true
  carousel:
    enable: true
    interval: 6000      # 轮播间隔，单位毫秒
    fadeDuration: 1200  # 淡入淡出时长，单位毫秒
    # 运镜模式：ken-burns | zoom-in | zoom-out | pan-left | pan-right | none
    animation: "ken-burns"
  waves:
    enable: true
```

---

### 2. 顶部导航栏编排：`nav-bar.yaml`

采用整体替换模式，支持直接引用内置预设、自定义外部链接以及下拉子菜单：

```yaml
links:
  # 引用内置预设，自动处理多语言名称与标准图标
  - preset: Home
  - preset: Archive

  # 下拉子菜单分组
  - name: "关于"
    icon: "material-symbols:info-outline-rounded"
    children:
      - preset: About
      - preset: Skills
      - preset: Projects
      - preset: Devices
      - preset: Timeline

  # 自定义外部链接
  - name: "源码"
    url: "https://github.com/LyraVoid/Shirone"
    icon: "fa6-brands:github"
    external: true
```

常用可用预设名称：`Home`, `Archive`, `Friends`, `Moments`, `Anime`, `Compass`, `Skills`, `Projects`, `Devices`, `Timeline`, `Albums`, `Categories`, `Tags`, `About`。

---

### 3. 侧边栏布局与组件：`sidebar.yaml`

控制侧边栏单栏或双栏排布与组件展示规则：

```yaml
enable: true
# 编排模式："single" 单栏紧凑，"dual" 宽屏双栏
arrangement: "dual"
side: "left"

components:
  - type: "profile"
    enable: true
    slot: "top"

  - type: "music"
    enable: true
    slot: "top"

  - type: "announcement"
    enable: true
    slot: "top"
    pages: ["home"]     # 仅在首页展示

  - type: "categories"
    enable: true
    slot: "sticky"      # 滚动吸顶
    collapseAfter: 5    # 超出 5 项显示展开按钮

  - type: "tags"
    enable: true
    slot: "sticky"
    collapseAfter: 6

  - type: "stats"
    enable: true
    slot: "top"
    column: "secondary" # 放置于副侧栏
    pages: ["home", "archive", "categories", "tags"]

  - type: "calendar"
    enable: true
    slot: "top"
    column: "secondary"

  - type: "toc"
    enable: true
    slot: "sticky"
    column: "secondary"
    pages: ["post"]     # 仅在文章详情页展示
```

---

### 4. 追番与追剧页面：`anime.yaml`

支持本地手写数据与外部服务快照同步两种核心模式：

```yaml
enable: true

source:
  # 数据源模式：
  # - "local"：直接读取 data/anime.ts 本地数据，零外部依赖，稳定可控
  # - "snapshot"：读取同步生成的本地脱敏快照文件
  kind: "local"

  # 当 kind 为 "snapshot" 时指定提供方："bangumi" 或 "bilibili"
  # provider: "bangumi"

  # 快照文件名称
  # file: "bangumi.json"

fallback:
  # 降级策略："local" 静默回退到本地数据，"empty" 显示空状态
  kind: "local"

providers:
  bangumi:
    enable: false
    userId: "your_user_id"
    request:
      pageSize: 30
      maxItems: 300
      minDelayMs: 300

  bilibili:
    enable: false
    vmid: "your_vmid"
    sessdataEnv: "BILI_SESSDATA"
    cover:
      # 封面模式："local" 下载到本地，"remote" 远端加载，"none" 渐变占位
      mode: "local"
      useWebp: true
```

---

### 5. 侧栏音乐播放器：`music.yaml`

支持四种工作模式：

```yaml
enable: true

# 播放器模式：
# - "local"：本地模式，读取 data/music.ts
# - "custom"：自定义模式，直接在下方 tracks 字段配置
# - "meting"：云端歌单模式，通过 Meting 接口加载
# - "mixed"：混合模式，同时加载本地曲目与云端歌单，首屏秒开且支持降级
provider: "mixed"

defaultVolume: 0.7
defaultMode: "sequence" # 播放循环模式："sequence" 顺序，"loop" 单曲，"random" 随机

meting:
  server: "netease"     # 音乐平台："netease"、"tencent"、"kugou"
  type: "playlist"      # 资源类型："playlist"、"song"、"album"、"artist"
  id: "14164869977"

# custom 模式下的曲目清单
# tracks:
#   - id: "song-1"
#     title: "歌曲名称"
#     artist: "演唱者"
#     cover: "assets/images/music/cover.webp"
#     source: "https://example.com/song.mp3"
#     duration: 240
```

---

### 6. 评论系统：`comment.yaml`

遵循零额外负担原则，默认完全关闭：

```yaml
enable: false
provider: "none"        # 可选："none" 或 "twikoo"
lazy: true              # 视口懒加载

twikoo:
  envId: "https://your-twikoo.example.com"
  scriptUrl: "https://cdn.jsdelivr.net/npm/twikoo@1.7.19/dist/twikoo.min.js"
  lang: "auto"
  placeholder: "来留下你的足迹吧..."
```

---

### 7. 全站字体：`font.yaml`

```yaml
mode: "custom"          # "custom" 启用自定义字体，"system" 纯系统字体省流量模式

fontFamilies:
  - id: "outfit-body"
    family: "Outfit"
    role: "body"        # 基础正文角色
    source: "fontsource"
    variants:
      - file: "@fontsource/outfit/400.css"
        weight: 400
        style: "normal"
    fallback: ["ui-sans-serif", "system-ui", "sans-serif"]
    display: "swap"

  - id: "yozai-cjk"
    family: "Yozai Medium"
    role: "cjk"         # 中日韩文字角色
    source: "local"
    variants:
      - file: "src/assets/fonts/Yozai-Medium.ttf"
        weight: 500
        style: "normal"
    fallback: ["system-ui", "sans-serif"]
    display: "swap"
```

---

### 8. 其他配置文件速览

- `profile.yaml`：博主头像、昵称、签名与社交平台外链；
- `post-list.yaml`：列表分页大小与排版模式；
- `article.yaml`：长期未更新提醒天数与文末延伸阅读推荐数量；
- `devices.yaml`：设备展示页的场景分类筛选标签；
- `projects.yaml`：开源项目页分类筛选标签；
- `skills.yaml`：技能图谱分类筛选标签；
- `timeline.yaml`：大事记时间线分类与排序方向；
- `fab.yaml`：右下角悬浮按钮的位置、尺寸与功能条目；
- `image-bloom.yaml`：图片加载时的色彩辉光模糊半径与动画过渡；
- `expressive-code.yaml`：代码高亮浅色与深色主题；
- `license.yaml`：文章底部版权协议声明；
- `announcement.yaml`：首页顶部公告内容与链接；
- `footer.yaml` 与 `footer.html`：页脚自定义 HTML 内容注入，例如工信部备案号。
