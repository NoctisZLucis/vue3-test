---
description: 执行 npm run build 构建项目，并将构建产物压缩为 zip 包（项目名/web/构建文件）
---

# 打包压缩工作流

## 前置条件

- 确保项目依赖已安装（`node_modules` 存在）
- 确保当前在项目根目录下操作

## 步骤

// turbo-all

1. 从 `package.json` 中读取项目名称：

```powershell
node -e "console.log(require('./package.json').name)"
```

记录输出的项目名称，后续步骤中用 `<项目名>` 代替。

1. 执行构建命令：

```powershell
npm run build
```

等待构建完成，确认无报错且 `dist/` 目录已生成。

1. 清理旧的临时目录和压缩包（如果存在）：

```powershell
if (Test-Path "./<项目名>") { Remove-Item -Recurse -Force "./<项目名>" }
if (Test-Path "./<项目名>.zip") { Remove-Item -Force "./<项目名>.zip" }
```

1. 创建目标目录结构 `<项目名>/web/`：

```powershell
New-Item -ItemType Directory -Path "./<项目名>/web" -Force
```

1. 将构建产物复制到目标目录：

```powershell
Copy-Item -Path "./dist/*" -Destination "./<项目名>/web/" -Recurse
```

1. 压缩为 zip 文件：

```powershell
Compress-Archive -Path "./<项目名>" -DestinationPath "./<项目名>.zip"
```

1. 清理临时目录：

```powershell
Remove-Item -Recurse -Force "./<项目名>"
```

1. 验证压缩包已生成：

```powershell
Get-Item "./<项目名>.zip" | Select-Object Name, Length, LastWriteTime
```

## 输出

- 压缩包路径：`<项目根目录>/<项目名>.zip`
- 压缩包内部结构：`<项目名>/web/`（包含所有构建后的静态文件）
