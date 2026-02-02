<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
        <el-icon v-if="onlyOneChild.meta?.icon || item.meta?.icon">
          <component :is="onlyOneChild.meta?.icon || item.meta?.icon" />
        </el-icon>
        <template #title>{{ onlyOneChild.meta?.title }}</template>
      </el-menu-item>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta?.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref<any>(null);

const hasOneShowingChild = (children: any[] = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  
  // 简单拼接路径作为示例
  // 实际项目建议使用 path-browserify 等库
  const basePath = props.basePath.endsWith('/') ? props.basePath : props.basePath + '/';
  const cleanRoutePath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
  
  // 如果基础路径为空或只是根路径，特殊处理
  if (props.basePath === '') return routePath;
  
  // 清理可能出现的双斜杠
  const joined = (basePath + cleanRoutePath).replace(/\/\//g, '/');
  return joined;
}

const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>
