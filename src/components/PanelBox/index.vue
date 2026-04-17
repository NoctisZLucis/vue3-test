<template>
  <div class="panel-box">
    <!-- 四角科技边框 -->
    <div class="corner top-left"></div>
    <div class="corner top-right"></div>
    <div class="corner bottom-left"></div>
    <div class="corner bottom-right"></div>

    <div v-if="title" class="box-title">
      <i class="dot" :style="{ backgroundColor: dotColor }"></i>
      <span class="text">{{ title }}</span>
      <slot name="title-extra"></slot>
    </div>
    
    <div class="box-content" :class="{ 'no-title': !title }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

interface PanelBoxProps {
  title?: string;
  dotColor?: string;
}

withDefaults(defineProps<PanelBoxProps>(), {
  title: '',
  dotColor: '#f56c6c' // 默认红色点
});
</script>

<style scoped lang="scss">
.panel-box {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(13, 30, 68, 0.4);
  border: 1px solid rgba(0, 246, 255, 0.2);
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;

  // 角落修饰
  .corner {
    position: absolute;
    width: 15px;
    height: 15px;
    border: 2px solid transparent;
    pointer-events: none;
    z-index: 1;
    
    &.top-left {
      top: -1px; left: -1px;
      border-top-color: #00f6ff;
      border-left-color: #00f6ff;
    }
    &.top-right {
      top: -1px; right: -1px;
      border-top-color: #00f6ff;
      border-right-color: #00f6ff;
    }
    &.bottom-left {
      bottom: -1px; left: -1px;
      border-bottom-color: #00f6ff;
      border-left-color: #00f6ff;
    }
    &.bottom-right {
      bottom: -1px; right: -1px;
      border-bottom-color: #00f6ff;
      border-right-color: #00f6ff;
    }
  }

  .box-title {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
    padding-bottom: 8px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, rgba(0,246,255,0.8), transparent);
    }

    .dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .text {
      flex: 1;
    }
  }

  .box-content {
    flex: 1;
    position: relative;
    overflow: hidden;

    &.no-title {
      height: 100%;
    }
  }
}
</style>
