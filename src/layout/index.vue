<template>
  <div class="app-wrapper" :class="classObj">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Sidebar, Navbar, TagsView, AppMain } from './components';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
  withoutAnimation: appStore.sidebar.withoutAnimation
}));
</script>

<style scoped lang="scss">

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.sidebar-container {
  transition: width 0.28s;
  height: 100%;
  overflow: hidden;
}

.main-container {
  min-height: 100%;
  transition: margin-left .28s;
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
