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

## 2. 代码文件树

用于展示清晰的项目结构或目录树：

```markdown
:::file-tree
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

## 6. 文本荧光高亮与剧透黑幕

### 荧光笔高亮
```markdown
这是普通文本，==这段文字会被荧光标记笔高亮显示==。
```

### 剧透黑幕（点击或鼠标悬浮显现）
```markdown
最终的凶手其实是 :spoiler[管家本人]。
```

---

## 7. 数学公式

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

## 8. Mermaid 流程图与图表

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

## 9. GitHub 仓库名片卡

使用单行指令即可在正文中插入精美的 GitHub 仓库卡片：

```markdown
::github{repo="LyraVoid/Shirone"}
```

---

## 10. 图片自适应宽度与画廊网格

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

## 11. 代码块高级排版与元数据

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
