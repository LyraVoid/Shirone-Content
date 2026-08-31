# 配置覆盖核心原理

在 Shirone 博客体系中，全站配置采用**声明式覆盖机制**。你无需克隆或改动主题的核心代码，只需在内容仓库的 `config/` 目录下按需编写对应的 YAML 配置文件，即可轻松定制站点的每一个细节。

---

## 核心设计理念

### 1. 最小化覆盖原则
在 YAML 文件中，你**只需要声明自己想要定制的键**，未填写的字段会自动继承主题的默认配置。

这样做有两大核心优势：
- **配置文件极其清爽**：无需维护数千行的庞大默认配置；
- **主题升级平滑**：当主题发布新版本并引入新的配置项或优化默认值时，博客会自动继承新特性，避免旧默认值覆盖导致布局异常。

### 2. 区分对象合并与数组替换

在编写 YAML 配置时，系统遵循两大合并规则：

```mermaid
flowchart TD
    A[用户编写 YAML 配置] --> B{字段属于什么类型?}
    B -->|嵌套字典对象| C[按层级递归合并]
    B -->|列表数组| D[整体替换]
    C --> E[仅覆盖声明的子键，未声明子键继承默认值]
    D --> F[以用户给出的完整数组为准]
```

- **嵌套对象（按层级递归合并）**：
  例如在 `site.yaml` 中，如果你只想修改横幅壁纸打字机的输入速度，只需写：
  ```yaml
  banner:
    homeText:
      typewriter:
        speed: 150
  ```
  打字机的删除速度、停顿时间以及壁纸轮播的其他参数仍会自动继承主题默认值。

- **列表数组（整体替换）**：
  凡是数组类型的清单（例如顶栏导航条目 `nav-bar.yaml`、侧边栏组件清单 `sidebar.yaml`、社交外链 `profile.links`、网站图标 `site.favicon`），均采用**整体替换**规则。
  这是因为列表项的增删与排列顺序具有强烈的整体性，局部修补容易引起歧义。因此在配置数组时，需要完整列出你希望保留和展示的条目。

---

## 配置生效机制与防写错保护

### 1. 写错字段智能纠错提示

在修改 YAML 时，偶尔可能会手滑打错配置项名称或填错格式。

Shirone 内置了严格的格式检查机制。在运行 `pnpm content:validate` 预检或执行内容同步时，系统会在内存中快速完成检查。一旦发现拼写错误，终端会明确指出发生错误的文件与属性路径，并贴心地推测你原本想写的正确字段：

```text
  config/site.yaml's banner.homeText: Type '{ titel: string }' is not assignable to type 'DeepPartial<HomeTextConfig>'
    Did you mean "title"?
```

这种机制让你在本地就能第一时间发现并修正问题，无需等到部署上线后才排查错误。

### 2. 配置是如何生效的？（自动生成的桥接文件）

在执行同步（`pnpm content:sync`）或进行生产构建时，系统会在后台自动将 `config/` 目录下的所有 YAML 文件整合转换为 `src/user/user-config.ts` 桥接文件。

这个过程会在后台自动完成两项核心优化：
- **图标自动打包离线化**：自动扫描你在配置中填写的每一个 Iconify 图标名称，并在构建期打包进本地资源，访问时无需向外部网络请求图标；
- **站点文字自动参与字体瘦身**：自动提取你在配置中填写的网站主副标题、博主昵称与签名等文本，送入字体裁剪流水线，确保中文字体不缺字且体积小巧；
- **完全自动化维护**：该桥接文件属于系统生成物，每次同步都会自动刷新，平时完全不需要手动去查看或修改它。

---

## 全站配置文件速查总表

所有配置文件均存放在内容仓库的 `config/` 目录下：

| 配置文件路径 | 负责的功能领域 | 默认覆盖策略 |
| :--- | :--- | :--- |
| `config/site.yaml` | 站点基本标识与时区、横幅壁纸、多图轮播、打字机、背景纹理 | 对象递归合并 |
| `config/profile.yaml` | 博主头像、昵称、签名、社交平台链接列表 | 对象合并（`links` 数组替换） |
| `config/nav-bar.yaml` | 顶部导航栏条目清单、预设条目与下拉子菜单 | 数组整体替换（专用覆盖类型） |
| `config/sidebar.yaml` | 侧边栏单/双栏模式、侧栏组件排布与吸顶规则 | 对象合并（`components` 数组替换） |
| `config/font.yaml` | 全站中文字体、西文字体、等宽代码字体与子集化裁剪 | 对象合并（`fontFamilies` 数组替换） |
| `config/anime.yaml` | 追番追剧页面主数据源、Bilibili/Bangumi 同步策略 | 对象递归合并 |
| `config/music.yaml` | 侧栏音乐播放器四种模式、网易云歌单与自定义曲目 | 对象递归合并 |
| `config/comment.yaml` | 评论系统服务提供商与 Twikoo 连接参数 | 对象递归合并 |
| `config/context-menu.yaml` | 桌面端右键上下文菜单、快捷动作清单与页面过滤 | 对象合并（`actions` 数组替换） |
| `config/post-list.yaml` | 文章列表分页大小、列表或网格排版模式 | 对象递归合并 |
| `config/article.yaml` | 文章阅读时长、长期未更新提醒、相关文章推荐与海报分享 | 对象递归合并 |
| `config/devices.yaml` | 个人数码设备展示页分类与筛选规则 | 对象合并（`categories` 数组替换） |
| `config/projects.yaml` | 开源项目展示页分类与阶段筛选规则 | 对象合并（`categories` 数组替换） |
| `config/skills.yaml` | 技能图谱页分类与熟练度规则 | 对象合并（`categories` 数组替换） |
| `config/timeline.yaml` | 大事记时间线分类与排序方向 | 对象合并（`categories` 数组替换） |
| `config/fab.yaml` | 右下角悬浮操作按钮清单与对齐边距 | 对象合并（`items` 数组替换） |
| `config/image-bloom.yaml` | 图片加载色彩辉光防抖占位动画参数 | 对象递归合并 |
| `config/expressive-code.yaml` | 文章代码高亮浅色与深色主题 | 对象递归合并 |
| `config/license.yaml` | 文章底部版权协议声明 | 对象递归合并 |
| `config/announcement.yaml` | 首页顶部公告栏文案、类型与行动链接 | 对象递归合并 |
| `config/llms.yaml` | 大语言模型与 AI 检索端点生成（/llms.txt）、排除标签与核心页面引导 | 对象合并（`corePages` 数组替换） |
| `config/umami.yaml` | Umami 公开统计与可选访问采集（`websiteId`、`scriptUrl` 成对填写） | 对象递归合并 |
| `config/footer.yaml` | 页脚自定义 HTML 注入功能总开关 | 对象递归合并 |
| `config/footer.html` | 页脚自定义 HTML 片段源码 | 原样复制映射 |

