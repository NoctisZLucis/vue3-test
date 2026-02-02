<template>
  <div class="navbar">
    <div class="hamburger-container" @click="toggleSidebar">
      <el-icon :size="20">
        <Expand v-if="!sidebar.opened" />
        <Fold v-else />
      </el-icon>
    </div>
    <div class="right-menu">
      <el-dropdown>
        <span class="el-dropdown-link" style="color: #fff;">
          管理员
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { Expand, Fold, ArrowDown } from '@element-plus/icons-vue';

const appStore = useAppStore();
const { sidebar } = storeToRefs(appStore);
const { toggleSidebar } = appStore;
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: $navbar-bg;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08); // 移除阴影以获得无缝效果
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #fff; // 深色导航栏使用白色文字

  .hamburger-container {
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;
    color: #fff; // 汉堡菜单图标颜色

    &:hover {
      background: rgba(255, 255, 255, .1) // 轻微悬浮效果
    }
  }

  .right-menu {
    cursor: pointer;
  }
}
</style>
