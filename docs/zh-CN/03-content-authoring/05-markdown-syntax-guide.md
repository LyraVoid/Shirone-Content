# 扩展排版语法速查

Shirone 主题内置了一整套遵循 M3E 设计规范的 Markdown 扩展组件。所有扩展均在构建期由 AST 转换器完成静态渲染，具备零客户端冗余与零布局抖动的高性能特性。

---

## 1. 提示与警告容器

### 自定义三冒号容器语法

```markdown
:::note
这是一段普通的便签说明文字。
:::

:::tip
这是一个实用的技巧提示。
:::

:::important
这是一条关键的重要信息说明。
:::

:::warning
这是一条需要注意的警告提醒。
:::

:::caution
这是一条高风险操作的危险警告。
:::
```

### GitHub Alert 引用语法兼容
同时也完全支持标准 GitHub 提示块语法：

```markdown
> [!NOTE]
> 便签说明内容

> [!TIP]
> 实用技巧内容

> [!IMPORTANT]
> 重要须知内容

> [!WARNING]
> 警告提示内容

> [!CAUTION]
> 危险注意内容
```

---

## 2. 目录树与代码树

### 目录文件树（`:::file-tree`）
用于展示清晰的项目结构或目录树，支持列表嵌套与终端输出两种形式：

```markdown
:::file-tree{title="项目目录结构" icon="colored"}
- src/
  - components/
    - atoms/
    - molecules/
    - organisms/
  - config/
    - siteConfig.ts
  - content/
    - posts/
- public/
- package.json
:::
```

也可以使用围栏代码块语法展示终端输出的目录结构：
````markdown
```file-tree title="编译产物目录" icon="simple"
dist
├── assets
└── index.html
```
````

### 多文件交互式代码树（`:::code-tree`）
用于将多个代码文件组织为带有左侧目录导航、文件切换与顶部标签栏的交互式容器，并支持一键展开为全屏模态框：

````markdown
:::code-tree{title="组件示例" height="420px" entry="Button.svelte"}
```svelte title="Button.svelte"
<script>
  let { label = "点击" } = $props();
</script>

<button class="btn">{label}</button>
```

```css title="Button.css"
.btn {
  padding: 8px 16px;
  border-radius: 8px;
}
```
:::
````

- **全屏模态展开**：点击代码树右上角的全屏展开按钮即可进入沉浸式全屏模态框，支持自适应双栏布局与语法高亮，按下 `Escape` 键或点击右上角关闭按钮即可退出全屏；
- **本地目录引入**：支持使用 `@[code-tree title="配置目录" entry="siteConfig.ts"](/src/config)` 直接将本地目录解析为代码树。

---

## 3. 代码标签页与多选项卡

用于在同一区域切换展示不同语言代码或配置说明：

```markdown
:::tabs
== JavaScript
```javascript
console.log("Hello, Shirone!");
```

== TypeScript
```typescript
const greeting: string = "Hello, Shirone!";
console.log(greeting);
```

== Python
```python
print("Hello, Shirone!")
```
:::
```

---

## 4. 操作步骤条

用于分步引导操作流程：

```markdown
:::steps
1. **安装依赖**
   在终端运行 `pnpm install` 安装项目全部依赖。

2. **配置环境变量**
   在环境设置中填入内容仓库的本地路径或远程仓库地址。

3. **启动预览**
   运行 `pnpm dev` 打开本地浏览器进行实时预览。
:::
```

---

## 5. 折叠面板

用于收纳长代码、参考资料或可选排错步骤：

```markdown
:::collapse-panel{title="点击展开查看详细日志"}
这里是折叠在内部的详细内容。
可以包含 Markdown 格式文本、图片或代码块。
:::
```

---

## 6. 字段参数卡片

用于在编写开发文档、组件说明或 API 规范时，以结构化、高可读性的卡片形式展示参数字段、类型定义与默认值。组件为纯静态渲染，零客户端脚本负担。

### 多字段组合卡片（`:::: field-group`）
使用四冒号外层容器包裹多个三冒号 `field` 子块：

```markdown
:::: field-group

::: field title
@type string
@required

组件的主标题文本。将显示在页面顶部标题栏中。
:::

::: field disabled
@type boolean
@default `false`
@optional

是否将控件置为禁用状态。
:::

::: field locale
@type `'en' | 'zh_CN' | 'ja'`
@default `'zh_CN'`
@optional

用于格式化日期与展示语言的区域标识代码。
:::

::: field legacyMode
@type boolean
@deprecated

旧版兼容模式开关。新接入建议直接使用统一规范。
:::

::::
```

### 单字段独立卡片（`::: field`）
在正文中需要针对某一个参数单独插入说明时，可以直接使用单卡片语法：

```markdown
::: field timeout
@type number
@default `5000`
@optional

请求超时等待毫秒数。超时后将自动触发重试逻辑。
:::
```

### 字段元数据标签说明

| 元数据标签 | 作用与格式说明 | 渲染表现 |
| :--- | :--- | :--- |
| `@name` | 显式指定字段名称（默认自动读取 `field` 后紧跟的名称） | 卡片标题 |
| `@type` | 参数的数据类型（如 `string`、`boolean`、联合类型等） | 等宽代码徽块 |
| `@default` | 参数的默认取值（如 `false`、`3000`） | 默认值标记块 |
| `@required` | 必填字段标识 | 醒目的必填状态徽标 |
| `@optional` | 可选字段标识 | 可选状态徽标 |
| `@deprecated` | 已废弃字段标识 | 警示样式的废弃状态徽标 |

- 元数据标签需置于字段正文描述之前；
- 标签之后的正文完全支持标准 Markdown 语法，包括加粗、超链接、行内代码与列表。

---

## 7. 文本荧光高亮与剧透黑幕

### 荧光笔高亮
```markdown
这是普通文本，==这段文字会被荧光标记笔高亮显示==。
```

### 剧透黑幕（点击或鼠标悬浮显现）
```markdown
最终的凶手其实是 :spoiler[管家本人]。
```

---

## 8. 数学公式

全面支持 KaTeX 数学公式渲染：

### 行内公式
```markdown
质能方程为 $E = mc^2$，欧拉公式为 $e^{i\pi} + 1 = 0$。
```

### 独立块级公式
```markdown
$$
\int_{-\infty}^{+\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

---

## 9. Mermaid 流程图与图表

支持使用 Mermaid 代码块绘制时序图、流程图与状态图：

````markdown
```mermaid
flowchart LR
    A[编写内容] --> B[保存文件]
    B --> C[增量同步]
    C --> D[浏览器热重载]
```
````

---

## 10. GitHub 仓库名片卡

使用单行指令即可在正文中插入精美的 GitHub 仓库卡片：

```markdown
::github{repo="LyraVoid/Shirone"}
```

---

## 11. 图片自适应宽度与画廊网格

### 控制单张图片展示宽度
```markdown
![横幅图片](/assets/images/banner.webp){width=75%}
```

### 多图并排画廊网格
```markdown
:::image-grid{columns=2}
![图片一](/images/sample1.webp)
![图片二](/images/sample2.webp)
:::
```

---

## 12. 代码块高级排版与元数据

代码块支持指定文件名、高亮特定行号、新增/删除行标记以及终端框架：

````markdown
```typescript title="src/config/site.ts" ins={3-4} del={1}
const oldConfig = false;
export const siteConfig = {
  title: "我的博客",
  lang: "zh_CN"
};
```
````

---

## 13. 视频嵌入组件

主题内置了常见视频平台嵌入与自建播放器指令，支持懒加载与响应式宽高比适配：

### Bilibili 视频嵌入
```markdown
::bilibili{bvid="BV1fK4y1s7Qf" title="B站示例视频" p=1}
```

### YouTube 视频嵌入
```markdown
::youtube{id="5gIf0_xpFPI" title="YouTube 示例视频"}
```

### AcFun 视频嵌入
```markdown
::acfun{acid="ac48649632" title="AcFun 示例视频"}
```

### ArtPlayer 自建/直链视频播放器
适用于存放在本地 `public/` 或对象存储外链的 MP4/WebM 视频：
```markdown
::artplayer{src="/videos/example.mp4" title="示例视频演示"}
```

---

## 14. 行内语音与音频朗读组件

支持在正文中插入轻量的行内音频/语音播放器：

```markdown
点击试听日语日常发音：:audio-reader[日常问候语]{src="/assets/audio/Ciallo.wav"}
```

---

## 15. Markdown 片段包含与复用

支持跨文章引入公共 Markdown 片段或代码示例，支持行号范围与区域选择：

```markdown
<!-- 全量引入指定片段文件 -->
<!-- @include: ../snippets/common-notice.md -->

<!-- 仅引入指定行号区间（第 2 至 8 行） -->
<!-- @include: ../snippets/api-example.md{2-8} -->

<!-- 仅引入指定命名区域（#public-api） -->
<!-- @include: ../snippets/api-example.md#public-api -->
```

---

## 16. 缩略词悬浮解释与内容注解

### 缩略词定义（鼠标悬浮提示全称）
在文章任意位置（通常放于文末）定义缩略词：
```markdown
*[SSR]: Server-Side Rendering
*[AST]: Abstract Syntax Tree

SSR 与 AST 转换均在构建期完成，生成静态 HTML。
```

### 内容悬浮注解
```markdown
Astro 采用了独特的孤岛架构 [+islands]。

[+islands]:
  孤岛是由静态 HTML 包围的独立可交互组件，按需加载 JavaScript。
```
