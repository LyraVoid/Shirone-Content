# Hosting Platform Deploy Hooks

If your theme code repository is hosted directly on Cloudflare Pages, Vercel, Tencent Cloud EdgeOne, or Netlify where the platform's build runner fetches content and compiles static assets, use the **Deploy Hook Trigger Mode**.

In this mode, whenever you push commits to your content repository, the GitHub Actions workflow sends an HTTP POST request to the hosting platform's Deploy Hook URL, triggering an automated remote build.

```mermaid
sequenceDiagram
    autonumber
    actor Author as Author
    participant ContentRepo as Content Repository
    participant Hosting as Hosting Platform Build Runner
    participant ThemeRepo as Theme Code Repository

    Author->>ContentRepo: git push new posts or config changes
    ContentRepo->>ContentRepo: Runs content syntax and schema validation
    ContentRepo->>Hosting: Sends HTTP POST request to Deploy Hook
    Hosting->>ThemeRepo: Clones theme code repository
    Hosting->>ContentRepo: Pulls latest content via CONTENT_REPO_URL
    Hosting->>Hosting: Executes config overlay & static build
    Hosting->>Hosting: Publishes build to global CDN edge nodes
```

---

## 1. Cloudflare Pages Configuration

### Step 1: Import Project and Build Settings
1. Sign in to the [Cloudflare Dashboard](https://dash.cloudflare.com/);
2. Navigate to **Compute (Workers & Pages)** -> **Create** -> Select **Pages** (**do not select Worker mode**);
3. Connect your GitHub account and select your theme code repository (e.g., `Shirone`);
4. Configure build settings:
   - **Framework preset**: Select **None** or **Astro**;
   - **Build command**: `pnpm run build`
   - **Build output directory**: `dist`

![Cloudflare Pages Setup](../../images/04-deploy/02-hook/02-pages-deploy.png)
*Figure 1-1: Cloudflare Pages build parameter configuration*

### Step 2: Set Build Environment Variables
In the setup wizard or under **Settings** -> **Environment variables**, configure:

| Variable Name | Recommended Value | Purpose |
| :--- | :--- | :--- |
| `NODE_VERSION` | `26` | **Required**, specifies the Node.js 26 runtime |
| `PNPM_VERSION` | `11.28.2` | **Recommended**, matches the theme repo's `packageManager` pin |
| `GIT_TERMINAL_PROMPT` | `0` | **Required**, disables interactive Git prompts |
| `CONTENT_REPO_URL` | `https://x-access-token:YOUR_PAT@github.com/user/content-repo.git` | **Required for private content repo**, authenticated clone URL |
| `BILI_SESSDATA` | `YOUR_CREDENTIAL` | *Optional*, for Bilibili private anime sync |

![Cloudflare Environment Variables](../../images/04-deploy/02-hook/06-env-config.png)
*Figure 1-2: Configuring build environment variables*

### Step 3: Create Deploy Hook
1. Open the Pages project **Settings** -> **Builds & deployments**;
2. Scroll to **Deploy hooks** and click **Add deploy hook**;
3. Name the hook (e.g., `content-update`), choose branch `main`, and click **Add hook**;
4. Copy the generated Webhook URL.

![Cloudflare Deploy Hook Setup](../../images/04-deploy/02-hook/07-deploy-hook-config.png)
*Figure 1-3: Creating and copying Deploy Hook URL*

### Step 4: Configure Secret in GitHub Content Repository
1. Open your **private content repository** -> **Settings** -> **Secrets and variables** -> **Actions**;
2. Click **New repository secret**;
3. Enter secret values:
   - **Name**: Must be `CLOUDFLARE_DEPLOY_HOOK` (exact uppercase)
   - **Secret**: Paste the copied Cloudflare Deploy Hook URL;
4. Click **Add secret** to save.

---

## 2. Vercel Configuration

### Step 1: Import Project and Build Settings
1. Sign in to the [Vercel Dashboard](https://vercel.com/) and click **Add New...** -> **Project**;
2. Import your theme code repository;
3. Set build command to `pnpm run build` and output directory to `dist`.

### Step 2: Set Build Environment Variables
On the import screen, expand **Environment Variables** to add variables directly. You can also add them later under **Deployments** -> **Environments**.

The Node.js version is not part of the import form. After the project is created, go to **Settings** -> **General** -> **Node.js Version** and select `26.x`. Vercel does not read a `NODE_VERSION` environment variable; Node comes from project settings or `package.json` `engines.node`.

Add these variables:

| Variable Name | Recommended Value | Purpose |
| :--- | :--- | :--- |
| `GIT_TERMINAL_PROMPT` | `0` | Prevents interactive prompt hangs |
| `CONTENT_REPO_URL` | `https://x-access-token:YOUR_PAT@github.com/user/content-repo.git` | **Required for private content repo** |
| `CONTENT_REPO_REF` | `main` | *Optional*, pin a branch or tag |
| `BILI_SESSDATA` | `YOUR_CREDENTIAL` | *Optional* |

You can add environment variables directly on the import screen:

![Adding environment variables on the Vercel import screen](../../images/04-deploy/02-hook/13-vercel-import-env.png)

After deployment, open **Deployments** from the project sidebar:

![Vercel project overview](../../images/04-deploy/02-hook/14-vercel-project-overview.png)

Then open **Environments** to add or update variables:

![Vercel Environments](../../images/04-deploy/02-hook/15-vercel-environments.png)

### Step 3: Create Deploy Hook
1. Go to project **Settings** -> **Git**;
2. Scroll to **Deploy Hooks** and click **Create Hook**;
3. Name the hook, set branch to `main`, click **Create**, and copy the URL.

### Step 4: Configure Secret in GitHub Content Repository
In your content repository under **Settings** -> **Secrets and variables** -> **Actions**, add:
- **Name**: `VERCEL_DEPLOY_HOOK`
- **Secret**: Paste the Vercel Deploy Hook URL.

---

## 3. Tencent Cloud EdgeOne Pages Configuration

### Step 1: Create Pages Application
1. Sign in to the [EdgeOne Console](https://console.cloud.tencent.com/edgeone/pages);
2. Click **Create Application**, authorize GitHub, and select your theme repository;
3. Set build command to `pnpm run build` and output directory to `dist`.

### Step 2: Set Environment Variables
Select Node.js `24` (EdgeOne's highest selectable version; Shirone builds correctly on it). Add `GIT_TERMINAL_PROMPT=0` and `CONTENT_REPO_URL`, plus `CONTENT_REPO_REF=main` if you need to pin a branch.

### Step 3: Create Deploy Hook Trigger
1. Go to application **Triggers** settings;
2. Create a new **Deploy Hook** targeting branch `main`;
3. Copy the generated trigger URL.

![EdgeOne Deploy Hook](../../images/04-deploy/02-hook/12-edgeone-deploy-hook.png)
*Figure 3-1: Tencent Cloud EdgeOne deploy hook configuration*

### Step 4: Configure Secret in GitHub Content Repository
In your content repository under **Settings** -> **Secrets and variables** -> **Actions**, add:
- **Name**: `EDGEONE_DEPLOY_HOOK`
- **Secret**: Paste the EdgeOne Deploy Hook URL.

---

## 4. Netlify Configuration

### Step 1: Import Project and Build Settings
1. Sign in to [Netlify](https://app.netlify.com/) and click **Add new site** -> **Import an existing project**;
2. Authorize GitHub and select your theme code repository;
3. Configure build command as `pnpm run build` and output directory as `dist`.

### Step 2: Set Environment Variables
Under **Site configuration** -> **Environment variables**, add `NODE_VERSION=26`, `GIT_TERMINAL_PROMPT=0`, and `CONTENT_REPO_URL`.

### Step 3: Create Build Hook
1. Open **Site configuration** -> **Build & deploy** -> **Continuous deployment**;
2. Locate **Build hooks** and click **Add build hook**;
3. Name the hook, specify branch `main`, click **Save**, and copy the URL.

### Step 4: Configure Secret in GitHub Content Repository
In your content repository under **Settings** -> **Secrets and variables** -> **Actions**, add:
- **Name**: `NETLIFY_DEPLOY_HOOK`
- **Secret**: Paste the Netlify Webhook URL.

---

## Deployment Workflow Secrets Quick Reference

Secrets supported by the content repository workflow [`.github/workflows/trigger-build.yml.example`](../../../.github/workflows/trigger-build.yml.example):

| Platform / Method | GitHub Secret Variable Name (Strict Match) | Trigger Mechanism |
| :--- | :--- | :--- |
| **Cross-Repo Build Trigger** | `DISPATCH_TOKEN` | Dispatches `content-updated` event to theme repository for automated GitHub Actions build (Recommended) |
| **Cloudflare Pages** | `CLOUDFLARE_DEPLOY_HOOK` | Sends HTTP POST request to Cloudflare Deploy Hook on push |
| **Vercel** | `VERCEL_DEPLOY_HOOK` | Sends HTTP POST request to Vercel Deploy Hook on push |
| **Tencent Cloud EdgeOne** | `EDGEONE_DEPLOY_HOOK` | Sends HTTP POST request to EdgeOne Deploy Hook on push |
| **Netlify** | `NETLIFY_DEPLOY_HOOK` | Sends HTTP POST request to Netlify Build Hook on push |
