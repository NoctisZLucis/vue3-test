---
description: 提交代码更改并推送到指定分支
---

此工作流将指导你如何将代码更改提交到 Git 并推送到远程仓库。

1. **检查状态**
   查看当前更改的文件。
   ```bash
   git status
   ```

2. **添加更改**
   将更改添加到暂存区。
   - 添加所有更改：
     ```bash
     git add .
     ```
   - 添加特定文件：
     ```bash
     git add <file_path>
     ```

3. **提交更改**
   提交暂存区的更改。请将 `<COMMIT_MESSAGE>` 替换为有意义的提交信息。
   ```bash
   git commit -m "<COMMIT_MESSAGE>"
   ```

4. **推送到远程**
   将提交推送到远程分支。请将 `<BRANCH_NAME>` 替换为目标分支名称（通常为 `main` 或 `master`）。
   ```bash
   git push origin <BRANCH_NAME>
   ```

   > [!TIP]
   > 如果你是首次推送到新分支，可能需要设置上游分支：
   > `git push -u origin <BRANCH_NAME>`
