# CLI Tooling and Collaborative Workflows

Shirone provides a dedicated suite of CLI tools tailored for the Content Separation Architecture. Whether writing in external editors, executing preflight validation on YAML configurations, or performing bidirectional synchronization, each action is handled via concise commands.

---

## CLI Command Quick Reference

| Command | Core Purpose | Typical Timing | Disk Modification Behavior |
| :--- | :--- | :--- | :--- |
| `pnpm content:sync` | One-shot full synchronization | Pull latest content before local preview | Overwrites temp content in code repo |
| `pnpm content:watch` | Real-time incremental watcher | Live writing and tuning in external editor | Automatic incremental writes |
| `pnpm content:validate` | In-memory preflight validation | Quick syntax and type verification | Pure memory check, zero disk writes |
| `pnpm content:status` | Status and diff inspection | Check active content source and diffs | Read-only inspection |
| `pnpm content:export` | Differential reverse export | Export local modifications to content repo | Writes to external content repo |
| `pnpm content:clean` | Safe reset and cleanup | Clear temporary synced files & restore demo | Resets code repo, backs up snapshot |
| `pnpm content:eject` | One-click decoupling wizard | Extract monolithic blog to dual-repo setup | Exports full content structure |

> Windows PowerShell users: use `pnpm.cmd <command>`.

---

## 1. Real-Time Incremental Watcher: `content:watch`

```bash
pnpm content:watch
```

### Typical Scenarios
Writing articles or tweaking YAML configurations in Obsidian, VS Code, or Typora, expecting the browser to reflect changes on file save.

### Core Behaviors and Rules
- **Incremental Response**: Debounced file watching synchronizes only modified files;
- **Instant Configuration Compilation**: Modifying any `config/*.yaml` regenerates the TypeScript configuration bridge and triggers Astro hot reloading;
- **Media Asset Synchronization**: Newly added images or album folders sync to the code repository asset directory automatically.

### Operational Notes
- Stop the watcher anytime with `Ctrl + C`;
- Run concurrently alongside `pnpm dev` in a separate terminal window.

---

## 2. In-Memory Preflight Validation: `content:validate`

```bash
pnpm content:validate
```

### Typical Scenarios
Verifying YAML syntax or article Frontmatter fields without launching a full development server or touching disk files.

### Core Behaviors and Rules
- **Pure In-Memory Validation**: Performs YAML parsing, schema matching, and TypeScript diagnostics in memory;
- **Zero Disk Writes**: No temporary files written to either repository;
- **Precise Diagnostic Feedback**: Misspelled keys (e.g., `titel` instead of `title`) trigger line-number annotations with correct field suggestions.

### Operational Notes
- Ideal as a pre-commit Git hook or initial CI gatekeeper;
- Repeat validation until the green pass indicator is displayed.

---

## 3. Status and Diff Inspection: `content:status`

```bash
pnpm content:status
```

### Typical Scenarios
Checking which content directory is currently bound, verifying remote connectivity, and reviewing pending file differences.

### Core Behaviors and Rules
- Displays active `CONTENT_DIR` or `CONTENT_REPO_URL`;
- Lists overridden configuration files and total article counts;
- Detects unresolved paths or schema anomalies.

---

## 4. Differential Reverse Export: `content:export`

```bash
pnpm content:export
```

### Typical Scenarios
Persisting configuration or styling adjustments made during local theme debugging back into your external content repository.

### Core Behaviors and Rules
- **Minimal Overlay Export**: Exports only keys that differ from theme defaults, preventing hardcoded defaults in YAML;
- **Future-Proof Upgrades**: Unmodified settings remain omitted, allowing seamless inheritance of future theme updates.

### Operational Notes
- Prompts with a file modification summary before writing;
- Run when the content repository is in a clean Git state.

---

## 5. Safe Cleanup and Reset: `content:clean`

```bash
pnpm content:clean
```

### Typical Scenarios
Restoring the theme code repository to a clean default demo state, or purging stale temporary files from local experiments.

### Core Behaviors and Rules
- **Automated Snapshot Archiving**: Automatically packages current local content into a timestamped archive under `.cache/content-backups/` prior to data cleanup;
- **Code Repository Reset**: Purges synchronized content copies and reinstates default demo articles and configs.

### Operational Notes
- **Your genuine content repository remains untouched**: This command only cleans temporary working copies in the theme repository;
- **Snapshot Recovery**: If needed, previous states can be restored from `.cache/content-backups/`.

---

## 6. One-Click Decoupling Migration: `content:eject`

```bash
pnpm content:eject --target <destination_path>
```

### Typical Scenarios
Migrating from a monolithic single-repository blog to a decoupled dual-repository architecture (usually executed once).

### Core Behaviors and Rules
- Extracts all posts, moments, albums, data entities, and configuration overrides;
- Generates a compliant `shirone.content.json` manifest and GitHub Actions trigger workflow;
- Retains original file hierarchy and metadata integrity.
