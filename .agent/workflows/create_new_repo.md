---
description: 初始化一个新的 Git 存储库并推送到 GitHub
---

此工作流将指导你在当前目录初始化一个新的 Git 存储库，并将其推送到 GitHub。

1. **初始化并提交**
   在当前目录运行以下命令以初始化 Git，创建 README，并进行首次提交。
   请确保将 `<REPO_NAME>` 替换为你的仓库名称（例如 `vue3-test`）。

   ```bash
   echo "# <REPO_NAME>" >> README.md
   git init
   git add README.md
   git commit -m "first commit"
   git branch -M main
   ```

2. **关联远程仓库并推送**
   将本地仓库关联到 GitHub 远程仓库并推送代码。
   请确保将 `<REMOTE_URL>` 替换为你的 GitHub 仓库 URL（例如 `https://github.com/NoctisZLucis/vue3-test.git`）。

   ```bash
   git remote add origin <REMOTE_URL>
   git push -u origin main
   ```

   > [!TIP]
   > 如果你是第一次使用 GitHub，可能需要先在浏览器中创建一个空的仓库。
