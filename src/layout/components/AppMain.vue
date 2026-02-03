<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.app-main {
  /* 50= 导航栏高度  50  */
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: auto;
  padding: 0;
  flex: 1;
  background-color: $main-bg; // 使用新变量
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
