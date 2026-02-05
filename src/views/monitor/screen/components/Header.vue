<template>
  <div class="screen-header">
    <div class="header-decor-left"></div>
    <div class="title-container">
       <div class="main-title">内蒙古自治区全污染源物联网+监控系统</div>
    </div>
    <div class="header-decor-right">
       <div class="time">{{ currentTime }}</div>
       <div class="user-info">
          <el-icon><SwitchButton /></el-icon> 安全退出
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { SwitchButton } from '@element-plus/icons-vue';
import dayjs from 'dayjs';

const currentTime = ref('');
let timer: any;

const updateTime = () => {
    currentTime.value = dayjs().format('YYYY-MM-DD dddd HH:mm:ss');
};

onMounted(() => {
    updateTime();
    timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});
</script>

<style scoped lang="scss">
.screen-header {
  height: 80px;
  width: 100%;
  background: url('https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/img/weather/weather_bg.jpg') no-repeat center top; // Placeholder BG or just style it
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: transparent;
  border-bottom: 2px solid #004ea2;
  box-shadow: 0 0 15px rgba(0, 78, 162, 0.5);
  
  // Simulated tech border
  &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #00f6ff 50%, transparent 100%);
  }

  .title-container {
      flex: 1;
      text-align: center;
      background-image: linear-gradient(0deg, #0055ff, #00dcff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      
      .main-title {
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 4px;
          text-shadow: 0 0 10px rgba(0, 85, 255, 0.5);
          font-family: 'Microsoft YaHei', sans-serif;
      }
  }

  .header-decor-left, .header-decor-right {
      width: 300px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      color: #6facfc;
      font-size: 14px;
  }
  
  .header-decor-right {
      justify-content: flex-end;
      gap: 20px;
      
      .time {
          font-family: 'Courier New', Courier, monospace;
          font-weight: bold;
          font-size: 16px;
          color: #00f6ff;
      }

      .user-info {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          &:hover { color: #fff; }
      }
  }
}
</style>
