# 组件封装规范

本规范用于指导 Vue 3 + TypeScript 项目中组件的提取与组织，确保组件划分合理、职责清晰、复用高效。

---

## 一、组件分类

项目中的组件分为三类，存放在不同目录：

| 类型 | 目录 | 说明 |
|------|------|------|
| **公共组件** | `src/components/` | 与业务无关，跨模块复用 |
| **业务组件** | `src/views/<模块>/components/` | 仅服务于特定业务模块 |
| **布局组件** | `src/layout/` | 控制页面整体布局框架 |

---

## 二、公共组件（`src/components/`）

### 提取条件（满足任一即可提取）

1. **被 2 个及以上模块使用**的 UI 功能
2. 对第三方库的**二次封装**（如 ECharts、富文本编辑器等）
3. 项目级**通用交互模式**（如全局弹窗、搜索面板、数据表格等）

### 编码规范

- 目录结构：`src/components/<组件名>/index.vue`，PascalCase 命名
- **必须**通过 `defineProps` 定义完整的 TypeScript 接口，在 `interface` 中声明所有 Props
- **必须**通过 `defineEmits` 声明所有对外事件
- **必须**通过 `defineExpose` 暴露必要的方法和属性
- **禁止**包含任何业务逻辑或直接调用业务 API
- **禁止**硬编码业务数据（如固定 URL、特定业务文案等）
- 所有配置通过 Props 或 Slots 传入，保持组件的纯 UI 特性
- 提供合理的默认值（通过 `withDefaults`）

### 示例：已有公共组件

```
src/components/
  └── ECharts/
      └── index.vue   ← 封装 echarts，通过 option prop 驱动
```

---

## 三、业务组件（`src/views/<模块>/components/`）

### 提取条件（满足任一即可提取）

1. 页面中**逻辑独立的功能区块**（如统计卡片区、筛选面板、图表区、表单弹窗等）
2. 页面文件**超过 300 行**时，应按功能区块拆分
3. 模块内**多处重复**的 UI 模式

### 编码规范

- 存放在 `src/views/<模块>/components/<组件名>.vue`
- **允许**直接调用本模块的业务 API 和使用本模块的类型定义
- **允许**包含业务逻辑和业务数据
- Props/Emits 定义可以使用业务类型（从 `@/api/<模块>` 导入）
- 如果后续被其他模块引用，应**晋升**为公共组件

### 组件拆分原则

以页面 `index.vue` 为聚合入口，按功能区块提取子组件：

```
src/views/task/
  ├── index.vue                  ← 页面入口，组装子组件
  └── components/
      ├── TaskStats.vue          ← 统计卡片区
      ├── TaskForm.vue           ← 表单弹窗
      └── TaskSidebar.vue        ← 侧边筛选面板
```

### 晋升为公共组件的信号

当业务组件出现以下情况时，应考虑将其提取为公共组件：

- 被其他模块复制粘贴使用
- 抽象出来后只需通过 Props 传入不同数据即可复用
- 功能与具体业务解耦，属于通用 UI 模式

---

## 四、可复用逻辑（`src/hooks/`）

当多个组件共享**相同的响应式逻辑**时，提取为 Composable 函数：

- 文件命名：`use<功能>.ts`，如 `useTable.ts`、`useChart.ts`
- 每个 Hook 单一职责，只处理一类逻辑

### 提取条件

1. 相同的**数据获取 + 状态管理**逻辑出现在 2 个以上组件中
2. 相同的 **DOM 操作 / 事件监听**模式重复出现
3. 复杂的**响应式计算逻辑**需要独立维护

---

## 五、命名规范

| 场景 | 规范 | 示例 |
|------|------|------|
| 公共组件目录 | PascalCase | `ECharts/`、`SearchPanel/` |
| 业务组件文件 | PascalCase | `TaskForm.vue`、`TaskStats.vue` |
| 模板中引用 | PascalCase | `<TaskForm />`、`<ECharts />` |
| Hooks 文件 | camelCase + use 前缀 | `useTable.ts`、`useChart.ts` |
| Props 接口 | PascalCase + Props 后缀 | `interface TaskFormProps` |

---

## 六、Props 设计原则

1. **单向数据流**：子组件不直接修改 Props，通过 `emit` 通知父组件
2. **最小化 Props**：只传组件真正需要的数据，避免传递整个大对象
3. **TypeScript 类型**：所有 Props 必须有明确的 TypeScript 类型定义
4. **合理默认值**：通过 `withDefaults` 提供默认值，降低使用成本
5. **Slot 优先**：当内容结构不固定时，优先使用 Slot 而非复杂 Props

---

## 七、决策流程

遇到新功能开发时，按以下流程判断组件归属：

```
新功能 → 是否已有可复用的公共组件？
  ├─ 是 → 直接使用，通过 Props/Slots 定制
  └─ 否 → 是否仅在当前模块使用？
      ├─ 是 → 创建为业务组件（views/<模块>/components/）
      └─ 否 → 创建为公共组件（src/components/）
```

页面开发完成后的审查：

```
页面 index.vue 超过 300 行？
  ├─ 是 → 按功能区块拆分为业务子组件
  └─ 否 → 保持现状

业务组件被其他模块引用？
  ├─ 是 → 抽象后晋升为公共组件
  └─ 否 → 保持为业务组件
```
