# GitHub Actions 派发模式

这是官方**最强烈推荐**的自动化部署方案。

在这种模式下，内容仓库每次推送更新，会自动通知主题代码仓库。代码仓库的 GitHub Actions 会执行完整的字体切片压缩、全量静态构建，并自动发布上线。

---

## 第一步：创建 GitHub 个人访问令牌

我们需要生成一个专用的小令牌，用来让内容仓库有权限通知代码仓库启动构建。

1. 打开 [GitHub 个人设置页面](https://github.com/settings/profile)；
2. 点击页面左侧菜单栏最下方的 **Developer Settings**；
3. 在左侧菜单中展开 **Personal access tokens**，点击 **Fine-grained tokens**；
4. 点击右上角的 **Generate new token** 按钮；
5. 按以下步骤填写配置：
   - **Token name**：填写 `Shirone Content Dispatch`；
   - **Expiration**：选择过期时间（建议选择 90 天或自定义更长时间）；
   - **Repository access**：**务必选择 Only select repositories**，然后在下拉列表中选中你的**主题代码仓库**（例如 `yourname/Shirone`）；
   - **Permissions**：展开 **Repository permissions**，找到 **Contents**，将其权限由 No access 改为 **Access: Read and write**（其他所有权限保持默认不选）；
6. 滑动到页面最底部，点击绿色按钮 **Generate token**；
7. **立即复制生成的令牌字符串**（以 `github_pat_` 开头）。请妥善保管，离开页面后将无法再次查看。

> 配图说明：
> - 建议截图内容：GitHub 创建 Fine-grained token 表单，重点框选选中的目标代码仓库与 Contents: Read and write 权限行
> - 对应保存路径：`docs/images/04-deploy/01-generate-pat-token.png`

![创建 GitHub 个人访问令牌](../images/04-deploy/01-generate-pat-token.png)

---

## 第二步：在内容仓库中配置密钥

1. 打开你的**个人内容仓库**（例如 `my-blog-content`）；
2. 点击顶部导航栏的 **Settings**（设置）；
3. 在左侧菜单中找到 **Secrets and variables**，点击展开并选择 **Actions**；
4. 点击页面右侧的绿色按钮 **New repository secret**；
5. 填写密钥信息：
   - **Name**：必须填入 `DISPATCH_TOKEN`（注意全大写）；
   - **Secret**：粘贴第一步中复制的个人访问令牌字符串；
6. 点击底部的 **Add secret** 保存。

> 配图说明：
> - 建议截图内容：内容仓库 Settings -> Secrets and variables -> Actions 中成功添加 DISPATCH_TOKEN 后的密钥列表界面
> - 对应保存路径：`docs/images/04-deploy/02-add-dispatch-token-secret.png`

![内容仓库添加 DISPATCH_TOKEN 密钥界面](../images/04-deploy/02-add-dispatch-token-secret.png)

---

## 第三步：验证全自动触发

现在，只需在内容仓库中修改任意一篇文章并执行推送：

```bash
git add .
git commit -m "feat: 发布一篇新文章"
git push origin main
```

1. 打开内容仓库的 **Actions** 页面，你将看到 `Trigger Theme Build` 工作流被自动触发；
2. 随后打开代码仓库的 **Actions** 页面，你将看到主题代码仓正在全自动拉取内容并完成编译部署；
3. 构建完成后，刷新你的博客网站，新文章即可瞬间呈现在全网。

> 配图说明：
> - 建议截图内容：GitHub Actions 页面中显示 Trigger Theme Build 与 Deploy 工作流全部绿色打勾成功的运行记录
> - 对应保存路径：`docs/images/04-deploy/03-actions-success-run.png`

![GitHub Actions 自动化流水线运行成功记录](../images/04-deploy/03-actions-success-run.png)
