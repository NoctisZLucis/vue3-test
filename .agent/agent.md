# Vue3 企业级管理系统 - AI 助手配置

本文件用于配置 AI 助手在当前项目中的行为准则和上下文信息。

---

## 📋 项目概述

**项目名称**: Vue3 企业级管理系统
**技术栈**: Vue 3 + Vite + TypeScript + Element Plus + Pinia + ECharts
**项目类型**: 企业级后台管理系统

### 核心功能模块

| 模块 | 路由 | 描述 |
|------|------|------|
| 任务管理 | `/task` | 任务列表、筛选、状态管理 |
| 报表管理 | `/report` | 报表模板、模板编辑器 |
| 安全总览 | `/security` | 网络安全概览仪表盘 |
| 监控大屏 | `/monitor` | 污染源监控系统大屏 |

---

## 📁 项目结构

```text
src/
├── api/              # API 接口封装
│   ├── report.ts     # 报表相关接口
│   └── task.ts       # 任务相关接口
├── assets/           # 静态资源
├── components/       # 全局公用组件
│   └── ECharts/      # ECharts 图表封装组件
├── hooks/            # 组合式函数
├── layout/           # 布局组件
│   ├── index.vue     # 主布局入口
│   └── components/   # 布局子组件 (Sidebar, Navbar, TagsView, AppMain)
├── router/           # 路由配置
├── store/            # Pinia 状态管理
├── styles/           # 全局样式
├── utils/            # 工具函数
│   ├── request.ts    # Axios 封装
│   ├── message.ts    # 消息提示封装
│   └── index.ts      # 通用工具函数
├── views/            # 业务页面
│   ├── dashboard/    # 仪表盘
│   ├── monitor/      # 监控大屏
│   ├── report/       # 报表管理
│   ├── security/     # 安全总览
│   └── task/         # 任务管理
└── mock/             # Mock 数据
    ├── report.ts     # 报表 Mock
    └── task.ts       # 任务 Mock
```

---

## 🎯 开发规范

### 强制规则

> [!CAUTION]
> 以下规则必须严格遵守，不得违反。

1. **语言要求**
   - 所有代码注释必须使用**中文**
   - 所有 UI 文字内容必须使用**中文**
   - 与用户对话必须使用**中文**

2. **代码规范**
   - 使用 `<script setup lang="ts">` 语法
   - 组件名使用大驼峰 (PascalCase)
   - 方法名使用小驼峰 (camelCase)
   - 所有方法必须包含 JSDoc 中文注释

3. **样式规范**
   - 使用 SCSS 预处理器
   - 组件样式必须添加 `scoped`
   - 使用 BEM 命名规范

4. **API 规范**
   - 所有接口封装在 `src/api/` 目录
   - 禁止在组件中直接使用 axios
   - 使用 TypeScript 强类型定义

### 参考规范文件

详细开发规范请参考:
- **项目规范**: `e:\code\skills\vue3-vite-ts-project-standard\SKILL.md`
- **需求实现流程**: `e:\code\skills\requirement-design-implementation\SKILL.md`

---

## 🔧 常用命令

```bash
# 启动开发服务器
npm run dev

# 启动 Mock 模式
npm run mock

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 📦 主要依赖

### 生产依赖
- `vue` ^3.5.24 - 核心框架
- `vue-router` ^5.0.0 - 路由管理
- `pinia` ^3.0.4 - 状态管理
- `element-plus` ^2.13.1 - UI 组件库
- `echarts` ^6.0.0 - 图表库
- `axios` ^1.13.4 - HTTP 客户端

### 开发依赖
- `vite` ^7.2.4 - 构建工具
- `typescript` ~5.9.3 - 类型支持
- `sass` ^1.97.3 - CSS 预处理器
- `vite-plugin-mock` ^3.0.2 - Mock 插件
- `unplugin-auto-import` - 自动导入
- `unplugin-vue-components` - 组件自动注册

---

## 🔄 工作流集成

本项目集成了以下 Workflow:

### `/git_commit_and_push`
提交代码更改并推送到远程仓库。
- 支持指定文件或全部提交
- 自动检查 `.gitignore` 配置
- 自动获取当前分支并推送

### `/create_new_repo`
初始化新的 Git 仓库并推送到 GitHub。
- 初始化 Git 仓库
- 创建首次提交
- 关联远程仓库

---

## 🎨 UI/UX 指南

### 主题配色
- **主色调**: Element Plus 默认蓝色主题
- **背景色**: `#f0f2f5` (内容区)
- **侧边栏**: 深色主题 `#151e2b`

### 布局结构
```
┌─────────────────────────────────────────┐
│              Navbar (顶部导航)           │
├─────────┬───────────────────────────────┤
│         │         TagsView              │
│ Sidebar ├───────────────────────────────┤
│ (侧边栏) │                               │
│         │         AppMain               │
│         │       (主内容区)               │
│         │                               │
└─────────┴───────────────────────────────┘
```

### 响应式适配
- **基准分辨率**: 1920px × 1080px
- **最低支持**: 1440px × 900px
- **适配策略**: Flex/Grid 优先，禁止使用 float

---

## 📝 开发注意事项

> [!IMPORTANT]
> 开发前务必阅读以下内容。

1. **新增页面流程**
   - 在 `src/views/` 下创建页面组件
   - 在 `src/router/index.ts` 添加路由配置
   - 如需接口，在 `src/api/` 创建 API 文件
   - 如需 Mock，在 `mock/` 创建 Mock 文件

2. **组件开发流程**
   - 公用组件放在 `src/components/`
   - 页面专用组件放在对应 `views/[module]/components/`
   - 必须定义 Props 类型和默认值

3. **状态管理**
   - 全局状态使用 Pinia Store
   - Store 文件放在 `src/store/`
   - 遵循单一职责原则

---

## 🔗 相关资源

- **项目仓库**: https://github.com/NoctisZLucis/vue3-test
- **Element Plus 文档**: https://element-plus.org/zh-CN/
- **Vue 3 文档**: https://cn.vuejs.org/
- **ECharts 文档**: https://echarts.apache.org/zh/index.html

---

*最后更新: 2026-02-09*
