<template>
  <el-aside :width="sidebar.opened ? '200px' : '64px'" class="sidebar-container">
    <el-menu
      :collapse="!sidebar.opened"
      default-active="1"
      background-color="$menu-bg"
      text-color="#ffffff"
      active-text-color="#ffffff"
      router
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import SidebarItem from './SidebarItem.vue';

const appStore = useAppStore();
const { sidebar } = storeToRefs(appStore);
const router = useRouter();
const routes = router.options.routes;
</script>

<style scoped lang="scss">
.sidebar-container {
  height: 100vh;
  transition: width 0.3s;
  background-color: $menu-bg;
  overflow-x: hidden;
  border-right: none; // Remove default border
  
  .el-menu {
    border-right: none;
    background-color: $menu-bg;
  }
}
</style>
