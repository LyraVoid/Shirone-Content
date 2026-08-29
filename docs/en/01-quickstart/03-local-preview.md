# Local Preview and Real-Time Debugging

Before pushing articles or configuration changes to remote environments, you can start a local development server to inspect rendering output in real time.

---

## Prerequisites

Ensure both folders exist on your machine:
1. **Theme Code Repository** (e.g., `D:\Code\Shirone`);
2. **Personal Content Repository** (e.g., `D:\Code\my-blog-content`).

And install dependencies in the theme code repository:
- Windows: `pnpm.cmd install`
- macOS / Linux: `pnpm install`

---

## Method 1: Quick Local Preview (Single Synchronization)

### 1. On Windows (PowerShell)

Navigate to the **theme code repository** root and run:

```powershell
# 1. Set local content repository absolute path
$env:CONTENT_DIR = "D:\Code\my-blog-content"

# 2. Run one-shot content synchronization and config overlay
pnpm.cmd content:sync

# 3. Start local development server
pnpm.cmd dev
```

Setting path and executing synchronization:

![Set Content Path and Sync](../../images/01-quickstart/03-preview/01-local-preview-content.png)
*Figure 1-1: Setting content directory path and executing synchronization*

Starting development server:

![Terminal Dev Server Output](../../images/01-quickstart/03-preview/02-local-preview-terminal.png)
*Figure 1-2: Development server terminal output*

### 2. On macOS / Linux (Bash / Zsh)

Navigate to the **theme code repository** root and run:

```bash
# 1. Set local content repository absolute path
export CONTENT_DIR="/Users/yourname/Code/my-blog-content"

# 2. Run one-shot content synchronization and config overlay
pnpm content:sync

# 3. Start local development server
pnpm dev
```

The terminal displays the local URL:

```text
  Local    http://localhost:4321/
```

Open `http://localhost:4321/` in your browser to view your blog rendered directly from your private content repository:

![Local Browser Preview](../../images/01-quickstart/03-preview/03-local-preview-browser.png)
*Figure 1-3: Local browser blog rendering preview*

---

## Method 2: Live Hot Reload (Incremental Watch Mode)

When actively writing Markdown posts or tuning YAML configurations, running manual sync commands repeatedly is inefficient.
Use the **incremental watch mode**:

1. **Terminal 1** (Start Astro dev server):
   ```powershell
   $env:CONTENT_DIR = "D:\Code\my-blog-content"
   pnpm.cmd dev
   ```
2. **Terminal 2** (Start incremental file watcher):
   ```powershell
   $env:CONTENT_DIR = "D:\Code\my-blog-content"
   pnpm.cmd content:watch
   ```

Whenever you save a Markdown post or YAML file in an external editor (such as Obsidian or VS Code), the watcher synchronizes changed files to the code repository and triggers Astro hot module reloading immediately.

---

## Advanced CLI Tooling

Beyond `content:sync` and `content:watch`, Shirone provides in-memory preflight validation (`content:validate`), differential export (`content:export`), safe cleanup (`content:clean`), and connection inspection (`content:status`).
For detailed usage, refer to: [04. CLI Tooling and Collaborative Workflows](./04-cli-workflows.md).

---

## FAQ and Tips

### 1. How do I stop the preview server?
Press `Ctrl + C` in the terminal to terminate the dev server or watcher process.

### 2. What if the terminal reports a path not found error?
Verify that `$env:CONTENT_DIR` points to a valid absolute path containing `config/`, `content/`, and `shirone.content.json`.
