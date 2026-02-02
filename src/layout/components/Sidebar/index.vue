<template>
  <el-aside :width="sidebar.opened ? '200px' : '64px'" class="sidebar-container">
    <el-menu
      :collapse="!sidebar.opened"
      default-active="1"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/dashboard">
        <el-icon><Menu /></el-icon>
        <template #title>Dashboard</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { Menu } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { sidebar } = storeToRefs(appStore);
</script>

<style scoped lang="scss">
.sidebar-container {
  height: 100vh;
  transition: width 0.3s;
  background-color: #545c64;
  overflow-x: hidden;
  
  .el-menu {
    border-right: none;
  }
}
</style>
