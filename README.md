# Shirone 官方内容模板仓库

这是 Shirone 博客主题的官方内容分离模板仓库。

采用内容与代码完全解耦的架构，本仓库仅负责存储博主个人的文章、动态、相册、自定义页面数据实体与个性化配置；主题的核心渲染逻辑、样式规范、工程依赖、持续集成与构建部署由主题代码仓库全权负责。

---

## 目录映射与边界划分

内容仓库与主题代码仓库的目录映射关系如下：

| 内容仓库路径 | 主题代码仓库物化路径 | 说明 |
| --- | --- | --- |
| `content/` | `src/content/` | 存放 Markdown 与 MDX 格式的文章、说说与页面文案 |
| `config/` | `src/user/user-config.ts` | 存放各领域的 YAML 覆盖配置，构建期深合并 |
| `data/` | `src/data/` | 存放相册、设备、追番、友链、项目、技能等数据实体 |
| `assets/` | `src/assets/` | 存放参与构建期优化的本地图片 |
| `public/` | `public/` | 存放直接由 Web 服务器对外分发的静态媒体资源 |

> 注：本仓库根目录的 `README.md`、`LICENSE` 以及 `.github/` 工作流文件属于内容仓专属元数据，同步脚本在物化时会自动跳过，不会影响代码仓结构。

---

## 配置覆盖机制

`config/` 目录下的每个 YAML 文件对应主题的一个配置领域：

1. **按需声明**：只需声明需要自定义的字段。未声明的字段将直接沿用主题默认值，在主题升级时自动跟进新增特性的默认配置。
2. **合并规则**：
   - **字典对象**：递归深度合并；
   - **列表数组**：整体替换，例如导航栏链接列表、侧栏组件清单，需要完整给出条目。
3. **强类型编译检查**：同步脚本在构建期将 YAML 解析生成 TypeScript 模块并提交给编译器进行全量类型检查。拼写错误、非法枚举值或类型不匹配将直接报错并提示正确字段名。

### 配置文件速查

- `site.yaml`：站点标题、副标题、默认背景模式、横幅壁纸与背景纹理系统
- `profile.yaml`：博主头像、昵称、签名与社交平台外链
- `nav-bar.yaml`：顶部导航栏链接清单、预设条目与下拉子菜单
- `sidebar.yaml`：侧边栏单栏或双栏布局模式与组件排布
- `comment.yaml`：评论系统服务提供商与连接参数，支持 Twikoo
- `anime.yaml`：追番页面主数据源与降级策略
- `music.yaml`：侧栏音乐播放器模式与歌单配置
- `font.yaml`：正文、中日韩文字与等宽代码字体配置
- `post-list.yaml`：文章列表分页数量与排版布局
- `article.yaml`：文章阅读时长、长期未更新提醒与推荐阅读
- `devices.yaml`：设备展示页场景分类与规则
- `projects.yaml`：开源项目页展示规则
- `skills.yaml`：技能图谱页展示规则
- `timeline.yaml`：大事记时间线展示规则与排序方向
- `fab.yaml`：右下角悬浮操作按钮位置与功能
- `image-bloom.yaml`：图片色彩辉光过渡动画参数
- `expressive-code.yaml`：代码高亮深浅主题
- `license.yaml`：文章版权协议声明
- `announcement.yaml`：首页公告栏文案与链接
- `footer.yaml` 与 `footer.html`：页脚自定义 HTML 注入

---

## 数据实体管理

`data/` 目录存放各独立页面的纯内容数据：

- `data/anime.ts`：追番与追剧条目清单
- `data/devices.ts`：个人数码与桌面设备清单
- `data/friends.ts`：友情链接清单
- `data/music.ts`：本地播放曲目清单
- `data/projects.ts`：开源项目与作品清单
- `data/skills.ts`：技能列表与熟练度
- `data/timeline.ts`：个人经历与站点里程碑
- `data/compass.ts`：常用导航书签与罗盘瓷砖

---

## 本地开发与预览

在主题代码仓库根目录下，通过环境变量指定内容仓路径即可完成同步与本地预览：

### 1. 同步内容并启动开发服务器

在 PowerShell 中执行：

```powershell
$env:CONTENT_DIR = "G:\Code\Blog\Shirone-Content-Offical"
pnpm content:sync
pnpm dev
```

在 Bash 中执行：

```bash
export CONTENT_DIR="/path/to/Shirone-Content-Offical"
pnpm content:sync
pnpm dev
```

### 2. 实时监听变更

若希望在内容仓库修改 Markdown 或 YAML 配置时自动热重载，可保持一个专用终端运行监听命令：

```powershell
pnpm content:watch
```

---

## 持续集成与自动化部署

### 1. 密钥配置

在当前内容仓库的 **Settings -> Secrets and variables -> Actions** 中根据自己的部署拓扑配置以下密钥：

#### 方案 A：通过个人访问令牌通知代码仓构建（推荐，全自动化流水线）

适用于由代码仓 GitHub Actions 执行静态打包并发布至 GitHub Pages、Cloudflare Pages、Vercel 等平台：

- `DISPATCH_TOKEN`：具备代码仓写入权限的个人访问令牌。内容推送后自动通知代码仓运行 GitHub Actions 流水线，完成内容拉取、字体压缩、静态打包与全网发布。

#### 方案 B：直接请求托管平台的部署钩子（直连构建模式）

适用于在托管平台中直接绑定代码仓，并在平台的构建命令中通过环境变量拉取本内容仓的场景。只需在当前内容仓中配置对应平台的部署钩子密钥：

- `CLOUDFLARE_DEPLOY_HOOK`：Cloudflare Pages 部署钩子地址（在 Cloudflare Pages 项目设置的 Deploy Hooks 中获取）
- `VERCEL_DEPLOY_HOOK`：Vercel 部署钩子地址（在 Vercel 项目设置的 Git -> Deploy Hooks 中获取）
- `EDGEONE_DEPLOY_HOOK`：腾讯云 EdgeOne Pages 部署钩子地址（在 EdgeOne Pages 应用触发器中获取）
- `NETLIFY_DEPLOY_HOOK`：Netlify 部署钩子地址（在 Netlify 项目设置的 Build hooks 中获取）

### 2. 工作流触发机制

当向本仓库的 `main` 分支推送变更时：
1. `.github/workflows/trigger-build.yml` 首先调用主题代码仓的可复用校验工作流，验证 YAML 配置语法与 Markdown 元数据；
2. 校验通过后，工作流将根据配置的密钥，自动向主题代码仓派发构建事件，或向已配置的 Cloudflare、Vercel、EdgeOne 等平台部署钩子发送网络触发请求；
3. 目标平台接收请求后，拉取最新内容完成全量静态打包与全球节点更新。
