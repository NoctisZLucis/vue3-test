# Vue 3 + Vite + ElementPlus 脚手架规范

## 1. 核心技术栈 (Tech Stack)
- **Framework**: Vue 3 (Composition API + <script setup>)
- **Build Tool**: Vite
- **UI Library**: Element Plus (Auto Import)
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Network**: Axios (Encapsulated)
- **Styling**: SCSS
- **Language**: TypeScript

## 2. 项目目录结构 (Directory Structure)
```text
src/
├── api/            # 接口请求模块
├── assets/         # 静态资源 (images, styles, icons)
├── components/     # 公用组件 (Base/Global)
├── hooks/          # 组合式函数 (Composables)
├── layout/         # 页面布局容器
├── router/         # 路由配置
├── store/          # Pinia 状态管理
├── utils/          # 工具函数封装
└── views/          # 业务页面组件
```

## 3. 编程规范 (Coding Standards)
- **命名规范**: 
  - 组件名：大驼峰 (PascalCase)，如 `UserTable.vue`。
  - 方法名：小驼峰 (camelCase)，如 `fetchDataList`。
  - 变量名：语义化。
- **注释要求**: 
  - 所有方法必须包含 JSDoc 中文注释。
  - 所有注释必须使用中文。
- **内容要求**: 
  - 所有文字内容必须翻译成中文。

## 4. 核心实现模板

### 4.1 Axios 封装 (src/utils/request.ts)
```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

/**
 * 创建 Axios 实例
 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg, data } = response.data;
    if (code === 200) return data;
    ElMessage.error(msg || '系统出错');
    return Promise.reject(new Error(msg || 'Error'));
  },
  (error) => {
    ElMessage.error(error.message || '网络异常');
    return Promise.reject(error);
  }
);

export default service;
```

### 4.2 路由配置 (src/router/index.ts)
```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

## 5. AI 指令集
- 请严格遵循上述目录结构生成代码。
- 生成 Vue 组件时必须使用 TypeScript 和 <script setup> 语法。
- 所有的 API 调用必须封装在 api/ 目录下，通过 request.ts 调用。

## 6. 组件页面书写规范 (Professional SFC Standards)

### 6.1 页面结构顺序 (SFC Order)
所有 `.vue` 文件必须遵循以下块顺序：
1. `<template>`：视图层
2. `<script setup lang="ts">`：逻辑层
3. `<style scoped lang="scss">`：样式层

### 6.2 代码逻辑组织顺序 (Setup Logic Order)
在 `<script setup>` 中，代码应按以下顺序排列，以增强可读性：
1. **Imports**: 插件、组件、工具函数、API。
2. **DefineProps & DefineEmits**: 组件输入输出定义。
3. **State**: 所有的 `ref` 和 `reactive` 变量。
4. **Computed**: 计算属性。
5. **Watchers**: 监听器。
6. **Methods**: 业务逻辑方法。
7. **Lifecycle Hooks**: `onMounted` 等生命周期钩子。
8. **Expose**: 使用 `defineExpose` 暴露给父组件的方法或属性。


## 7. 组件封装规范 (Component Encapsulation)

### 7.1 封装原则
- **单一职责**: 一个组件只做一件事。
- **Props 强类型**: 必须为每个 Prop 定义类型和默认值。
- **样式隔离**: 必须使用 `scoped`，禁止在组件内书写全局样式。
- **Slots 扩展**: 关键节点预留 `slot`，增加组件灵活性。

### 7.2 标准组件示例 (src/components/BaseDialog.vue)

```vue
<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :before-close="handleClose"
    class="custom-dialog"
  >
    <slot />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * 1. 属性定义 (Props)
 */
interface Props {
  modelValue: boolean;    // 控制显示隐藏
  title?: string;         // 弹窗标题
  width?: string | number; // 弹窗宽度
  loading?: boolean;      // 确认按钮 loading 状态
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '提示',
  width: '50%',
  loading: false
});

/**
 * 2. 事件定义 (Emits)
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'close'): void;
}>();

/**
 * 3. 响应式计算 (Computed)
 */
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

/**
 * 4. 业务方法 (Methods)
 */

/**
 * 处理关闭弹窗
 */
const handleClose = () => {
  emit('close');
  visible.value = false;
};

/**
 * 处理点击确认
 */
const handleConfirm = () => {
  emit('confirm');
};

/**
 * 5. 暴露给父组件 (Expose)
 */
defineExpose({
  handleClose,
  handleConfirm
});
</script>

<style scoped lang="scss">
.custom-dialog {
  :deep(.el-dialog__body) {
    padding: 20px;
    color: var(--el-text-color-primary);
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
```

## 8. Layout 组件规范

### 8.1 整体布局 (Layout Structure)
- **入口文件**: `src/layout/index.vue`，采用 Flex 布局管理整体结构。
- **DOM 结构**:
  ```html
  <div class="app-wrapper">
    <Sidebar />             <!-- 左侧侧边栏 (Fixed) -->
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />          <!-- 顶部导航 -->
        <TagsView />        <!-- 历史标签页 -->
      </div>
      <AppMain />           <!-- 业务页面出口 -->
    </div>
  </div>
  ```
- **交互逻辑**: 通过 Pinia (`appStore.sidebar.opened`) 控制 `.app-wrapper` 的类名 (`openSidebar`/`hideSidebar`)，从而通过 CSS Transition 实现侧边栏的平滑展开与折叠。

### 8.2 核心组件构成 (Core Components)

#### 1. Sidebar (侧边栏)
- **路径**: `src/layout/components/Sidebar`
- **数据源**: 直接读取 `vue-router` 的 `routes` 配置 (`useRouter().options.routes`)，实现了 **路由即菜单**。
- **递归渲染**: 核心组件 `SidebarItem.vue` 支持无限级菜单嵌套。
  - **单节点**: 无子路由或只有一个有效子路由时，渲染为 `<el-menu-item>`。
  - **嵌套节点**: 有多个子路由时，渲染为 `<el-sub-menu>` 并递归调用自身。
- **路径解析**: 组件内建 `resolvePath` 方法，自动处理父子路由路径的拼接（例如 `/nested` + `/menu1` -> `/nested/menu1`）。

#### 2. Navbar (顶部导航)
- **路径**: `src/layout/components/Navbar.vue`
- **样式**: 深色主题设计，与侧边栏背景色保持一致 (`#151e2b`)，移除底部阴影以实现视觉一体化。
- **功能**: 集成 `Hamburger` (折叠控制器) 和右侧用户信息/操作区。

#### 3. TagsView (标签页导航)
- **路径**: `src/layout/components/TagsView`
- **样式**: 采用 **Tab 选项卡** 风格。
  - **激活态**: 白色背景 + 主色文字 + 底部连接线，强调当前上下文。
  - **交互**: 支持点击切换、右键菜单（关闭当前/其他/全部）。

#### 4. AppMain (主内容区)
- **路径**: `src/layout/components/AppMain.vue`
- **架构**: 封装 `<router-view>` 并通过 `v-slot` 集成 `<transition>` 动画 (`fade-transform`) 和 `<keep-alive>` 缓存机制。
- **样式**: 设定全局背景色 (`$main-bg: #f0f2f5`)，提供视觉层级区分。

### 8.3 最佳实践 (Best Practices)
- **Layout 常量化**: 在 `src/router/index.ts` 中，应提取 `Layout` 为常量 (`const Layout = () => import('@/layout/index.vue')`)，避免重复编写 `import` 语句，便于统一维护。
- **组件统一导出**: 所有 Layout 子组件应在 `src/layout/components/index.ts` 中统一导出，保持引用路径简洁。
  ```typescript
  export { default as Navbar } from './Navbar.vue'
  export { default as Sidebar } from './Sidebar/index.vue'
  export { default as AppMain } from './AppMain.vue'
  ```
  
## 9. 样式开发规范 (Style Guidelines)

### 9.1 架构设计 (Architecture)
- **入口文件**: 样式虽最终作用于 `index.html`，但必须通过 `src/main.ts` 引入 `src/styles/index.scss` 进行统一注入，严禁在 `index.html` 中编写 `<style>`。
- **根节点**: `#app` (定义在 `index.html`) 是应用挂载点，必须设置 `width: 100%` 和 `height: 100%` 以继承 `html, body` 的高度。

### 9.2 技术方案
- **预处理器**: SCSS (开启全局变量自动注入)。
- **命名规范**: BEM (Block Element Modifier) 规范。
- **作用域**: 组件内样式必须添加 `scoped` 属性。

### 9.3 响应式适配策略
- **基准分辨率**: 1920px * 1080px (设计稿基准)。
- **最低支持**: 1440px * 900px (布局不破碎，无横向滚动条)。
- **适配工具**: 使用 SCSS Mixins 处理断点，避免在业务代码中散落 `@media`。

### 9.4 滚动条规范
- **全局禁止滚动**: `html`, `body`, `#app` 必须设置 `overflow: hidden`。
- **内容区滚动**: 滚动条只允许出现在 `AppMain` 组件的内部视图容器中。
