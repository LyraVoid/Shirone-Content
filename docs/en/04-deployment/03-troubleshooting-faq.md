# Troubleshooting and FAQ

This document provides solutions to common questions and issues encountered during content authoring, local synchronization, and automated deployment.

---

## 1. Pushed content to repository, but the website did not update?

Follow these diagnostic steps in order:

### Step A: Check GitHub Actions Run Logs and Token Permissions
1. Open your **content repository** and switch to the **Actions** tab;
2. Verify whether the latest `Trigger Theme Build` run succeeded (green checkmark);
3. If it failed with a red indicator, inspect the logs:
   - If the log reports `Resource not accessible by personal access token`, your `DISPATCH_TOKEN` lacks **Contents: Read and write** permissions on the theme repository. Edit or regenerate the token in your GitHub Personal Settings and grant Read and write permissions;
   - If preflight validation failed, review indicated YAML or Frontmatter formatting errors.

### Step B: Check Whether the Post is Marked as a Draft
Check the frontmatter header of the article for:
```yaml
draft: true
```
Articles marked with `draft: true` are drafts and are automatically omitted from production builds. Change this to `draft: false` to publish.

### Step C: Verify Article Publication Date Format
The `published` date must follow strict ISO formatting:
- Valid: `published: 2026-08-27` or `published: 2026-08-27 15:30:00`
- Invalid: `published: 2026/8/27` or `published: 2026.08.27`

---

## 2. Cloudflare build fails with `__dirname is not defined`?

### Symptom
During Cloudflare deployment, static prerendering halts with an error:
```text
Caught error rendering /about: Error: Failed to prerender ...: __dirname is not defined
```

### Cause
The project was created under Worker mode or configured with `npx wrangler deploy`, causing the platform to install `@astrojs/cloudflare` and switch static rendering to edge Worker runtimes instead of pure static HTML.

### Solution
1. Shirone is a static site architecture that does not require server-side Worker adapters;
2. Sign in to the Cloudflare Dashboard, go to **Compute (Workers & Pages)** -> **Create**, and select **Pages** mode;
3. Set the build command to `pnpm run build` and output directory to `dist` without extra deploy scripts.

---

## 3. Platform build warns of outdated Node version or syntax errors?

### Symptom
Build logs indicate unsupported ES module syntax, parsing errors, or warnings about Node.js version.

### Solution
Many hosting platform build runners default to Node.js 18 or earlier. Specify Node.js 22 in your platform's **Environment Variables**:
- Variable Name: `NODE_VERSION`
- Value: `22`

---

## 4. Platform build hangs or fails when cloning private content repository?

### Symptom
Build output freezes during content cloning or exits with authentication errors.

### Solution
1. Check whether the personal access token in `CONTENT_REPO_URL` has expired or lacks read permissions;
2. Verify the clone URL format:
   ```text
   https://x-access-token:YOUR_PERSONAL_ACCESS_TOKEN@github.com/username/content-repo.git
   ```
3. Add `GIT_TERMINAL_PROMPT` with value `0` in your hosting platform's environment variables to prevent Git from waiting for interactive prompts.

---

## 5. Deploy hook configured, but pushing does not trigger builds?

### Solution
1. Open your **content repository** Actions tab and check whether the platform step in `Trigger Theme Build` was skipped;
2. Verify Secret variable names in **Settings** -> **Secrets and variables** -> **Actions** match exactly:
   - GitHub Actions Cross-Repo Trigger: `DISPATCH_TOKEN`
   - Cloudflare Pages: `CLOUDFLARE_DEPLOY_HOOK`
   - Vercel: `VERCEL_DEPLOY_HOOK`
   - Tencent Cloud EdgeOne: `EDGEONE_DEPLOY_HOOK`
   - Netlify: `NETLIFY_DEPLOY_HOOK`
3. Ensure the copied Webhook URL is complete without missing parameters.

---

## 6. Type check error after editing YAML files?

Shirone provides strict configuration type checking. If the terminal or Actions log displays:
```text
Type '{ titel: string }' is not assignable to type 'DeepPartial<SiteConfig>'
Did you mean "title"?
```
- An unrecognized property key was defined in your YAML file;
- Refer to the relevant configuration documentation and correct the spelling.

---

## 7. Remote images fail to load or return 403 Forbidden?

Third-party image hosts (such as Bilibili) often enforce HTTP Referer anti-hotlinking.

### Solution
Add the image host domain to the whitelist in `config/site.yaml`:
```yaml
imageOptimization:
  noReferrerDomains:
    - "*.hdslb.com"
    - "*.bilibili.com"
```
The theme automatically appends anti-hotlinking bypass attributes to images from these domains.

---

## 8. Does editing documentation under `docs/` consume build quota?

**No, absolutely not.**
The `docs/` directory and root `README.md` files are excluded in both the GitHub Actions workflow path filters and local synchronization scripts. Committing changes to `docs/` never triggers remote builds or consumes hosting quotas.
