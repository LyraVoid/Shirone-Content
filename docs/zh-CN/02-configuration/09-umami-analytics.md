# Umami 网站统计配置

Shirone 遵循**零额外负担原则**：当 Umami 统计未启用（`enable: false` 或省略）时，系统绝不发起任何外部网络请求，客户端不注入任何统计脚本与额外 DOM 结构，保持纯净的加载速度与零包体积开销。

本篇文档介绍如何通过 `config/umami.yaml` 接入 [Umami](https://umami.is/) 网站访问统计。

---

## 接入步骤

### 第一步：获取 Umami 分享链接

1. 登录你的 Umami 后台管理面板；
2. 进入 **Settings** -> **Websites**，找到对应的站点并点击 **Edit**；
3. 进入 **Share URL** 标签页，创建一个公开分享链接；
4. 复制生成的链接（格式形如 `https://your-umami.com/share/<shareId>` 或 `https://cloud.umami.is/analytics/us/share/<shareId>`）。

### 第二步：修改 `config/umami.yaml`

在内容仓库的 `config/umami.yaml` 中配置启用：

```yaml
# 1. 开启全局 Umami 统计总开关
enable: true

# 2. 填入第一步获取到的 Umami 分享链接
shareUrl: "https://your-umami.com/share/<shareId>"

# 3. 可选：只有需要向 Umami 上报访问时才同时填写以下两项
# websiteId: "your-website-id"
# scriptUrl: "https://your-umami.com/script.js"
```

`websiteId` 与 `scriptUrl` 都是可选字段。两项同时省略时，Shirone 只读取公开分享统计；需要访问采集时必须同时填写两项，单独填写任一字段都不会加载 Umami 采集脚本。

---

## 客户端与 API 能力

启用并完成同步构建后，浏览器端会自动挂载统计客户端：

- 访问数据支持内存与本地存储双级缓存（默认 1 小时缓存有效周期）；
- 开发者可以通过 `window.oddmisc` 在控制台或自定义组件中获取全站访问量、单页访问量与当前实时在线访客数。
