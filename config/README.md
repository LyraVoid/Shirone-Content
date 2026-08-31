# 站点配置覆盖说明

本目录下的每个 YAML 文件对应覆盖主题仓库里的一个配置领域。构建阶段由代码仓的同步脚本编译并与主题默认配置进行递归合并。

## 合并规则

1. **按需覆盖**：只写需要修改的键。未显式声明的键将自动沿用主题默认值，在主题升级时自动享受新增特性的默认配置。
2. **对象递归合并，数组整体替换**：对于字典对象进行深度合并；对于列表数组，例如导航栏链接、侧边栏组件清单、字体清单等，采用整体替换语义。若需修改列表中的某一单项，需写出完整的列表清单。
3. **强类型编译拦截**：所有配置文件均受到主题 TypeScript 类型的严格约束。键名拼写错误、枚举值越界或类型不匹配均会在构建前被类型检查拦截，并给出修正建议。

## 可用配置清单

| 配置文件 | 覆盖的主题配置 | 作用说明 |
| --- | --- | --- |
| `site.yaml` | `siteConfig` | 站点标题、语言、横幅壁纸、主题色与背景纹理 |
| `profile.yaml` | `profileConfig` | 博主头像、昵称、签名与社交链接 |
| `license.yaml` | `licenseConfig` | 文章页底部版权协议声明 |
| `announcement.yaml` | `announcementConfig` | 首页顶部公告栏文案与链接 |
| `font.yaml` | `fontConfig` | 全站自定义正文、中文字体与等宽代码字体 |
| `nav-bar.yaml` | `navBarConfig` | 顶栏导航链接、预设组合与下拉子菜单 |
| `sidebar.yaml` | `sidebarConfig` | 侧边栏单栏或双栏布局与组件排布 |
| `post-list.yaml` | `postListConfig` | 文章列表分页大小与排版布局模式 |
| `article.yaml` | `articleConfig` | 文章详情页阅读时间、过期提示与推荐阅读 |
| `comment.yaml` | `commentConfig` | 评论系统提供商与连接参数 |
| `context-menu.yaml` | `contextMenuConfig` | 桌面端右键上下文菜单动作与页面过滤 |
| `fab.yaml` | `fabConfig` | 悬浮控制按钮位置与功能清单 |
| `footer.yaml` | `footerConfig` | 页脚自定义 HTML 注入开关 |
| `footer.html` | `FooterConfig.html` | 页脚自定义 HTML 片段，如工信部备案号 |
| `devices.yaml` | `devicesConfig` | 个人设备展示页分类与展示规则 |
| `anime.yaml` | `animeConfig` | 追番页面数据源模式与快照拉取策略 |
| `music.yaml` | `musicConfig` | 侧栏音乐播放器模式与歌单配置 |
| `projects.yaml` | `projectsConfig` | 开源项目展示页分类与筛选规则 |
| `skills.yaml` | `skillsConfig` | 技能图谱页分类与展示规则 |
| `timeline.yaml` | `timelineConfig` | 大事记时间线分类与排序方向 |
| `image-bloom.yaml` | `imageBloomConfig` | 图片色彩辉光占位动画参数 |
| `expressive-code.yaml` | `expressiveCodeConfig` | 文章代码块语法高亮主题 |
| `llms.yaml` | `llmsConfig` | 大语言模型与 AI 检索端点（/llms.txt 与 /llms-full.txt）、排除标签与核心引导页 |
| `umami.yaml` | `umamiConfig` | Umami 网站访问量与在线访客统计 |

