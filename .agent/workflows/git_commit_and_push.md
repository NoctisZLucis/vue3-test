---
description: 提交代码更改并推送到指定分支
---

// turbo-all
此工作流用于将代码更改提交到 Git 并推送到远程仓库。

**参数说明**:
- `Files`: (可选) 要提交的文件路径列表。如果不提供，默认为 `.` (即提交所有更改)。
- `Message`: (可选) 提交信息。如果不提供，默认为有意义的提交信息 。

1. **检查状态**
   查看当前更改的文件和其他 Git 信息。
   ```bash
   git status
   ```

2. **添加更改**
   根据 `Files` 参数执行添加操作。
   - **默认情况** (添加所有更改):
     ```bash
     git add .
     ```
   - **指定文件** (仅添加特定文件):
     ```bash
     git add <file1> <file2> ...
     ```

3. **提交更改**
   使用指定的 `Message` 进行提交。
   ```bash
   git commit -m "<Message>"
   ```

4. **推送到远程**
   获取当前分支并推送到远程仓库。
   ```bash
   # 获取当前分支名称
   git branch --show-current
   
   # 推送到 origin (将 <branch_name> 替换为实际分支名)
   git push origin <branch_name>
   ```