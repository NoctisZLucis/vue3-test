<template>
  <div class="component-container">
    <div class="header">
      <div class="title-bar"></div>
      <span class="title">网络安全防护</span>
    </div>
    <div class="content">
       <!-- Carousel Component -->
       <!-- Added style height 100% to ensure it fills the flex container -->
       <el-carousel trigger="click" height="100%" style="height: 100%" :interval="5000" indicator-position="outside" arrow="never">
          <el-carousel-item v-for="(page, index) in chunkedDevices" :key="index">
             <div class="device-grid">
               <div class="device-item" v-for="item in page" :key="item.name">
                  <div class="icon-wrapper">
                    <!-- Dynamic color based on type, using larger icon -->
                    <el-icon :size="24" :color="item.color"><component :is="item.icon" /></el-icon>
                  </div>
                  <div class="info">
                    <div class="main-row">
                      <span class="name">{{ item.name }}</span>
                      <span class="count">{{ item.count }}</span>
                    </div>
                    <div class="progress-row">
                      <el-progress :percentage="item.rate" :show-text="false" :stroke-width="6" :color="item.color" />
                    </div>
                    <div class="sub-row">
                      <span class="label">在线率{{ item.rate }}%</span>
                    </div>
                  </div>
               </div>
             </div>
          </el-carousel-item>
       </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Monitor, Connection, Odometer, Aim, Lock, Key } from '@element-plus/icons-vue';

// Extended data to 12 items
const devices = ref([
  { name: '防火墙', count: 24, rate: 4.2, icon: Monitor, type: 'blue', color: '#409eff' },
  { name: 'IPS', count: 15, rate: 0, icon: Connection, type: 'cyan', color: '#36cfc9' },
  { name: '检测器', count: 15, rate: 0, icon: Odometer, type: 'blue', color: '#409eff' },
  { name: 'APT', count: 15, rate: 0, icon: Aim, type: 'cyan', color: '#36cfc9' },
  { name: '数据审计', count: 15, rate: 0, icon: Lock, type: 'blue', color: '#409eff' },
  { name: '安全审计', count: 15, rate: 0, icon: Key, type: 'blue', color: '#409eff' },
  // Page 2 Data
  { name: 'WAF', count: 12, rate: 98, icon: Monitor, type: 'blue', color: '#409eff' },
  { name: '堡垒机', count: 8, rate: 95, icon: Connection, type: 'cyan', color: '#36cfc9' },
  { name: '漏洞扫描', count: 4, rate: 100, icon: Odometer, type: 'blue', color: '#409eff' },
  { name: '态势感知', count: 6, rate: 100, icon: Aim, type: 'cyan', color: '#36cfc9' },
  { name: 'EDR', count: 30, rate: 92, icon: Lock, type: 'blue', color: '#409eff' },
  { name: '数据库审计', count: 10, rate: 96, icon: Key, type: 'blue', color: '#409eff' },
]);

// Chunk data into groups of 6
const chunkedDevices = computed(() => {
    const size = 6;
    const result = [];
    for (let i = 0; i < devices.value.length; i += size) {
        result.push(devices.value.slice(i, i + size));
    }
    return result;
});
</script>

<style scoped lang="scss">
.component-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .header {
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-bottom: 1px solid #f0f0f0;

    .title-bar {
      width: 4px;
      height: 16px;
      background-color: #409eff;
      margin-right: 8px;
    }
    
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }

  .content {
    flex: 1;
    padding: 0; 
    overflow: hidden;
    position: relative; 
    
    :deep(.el-carousel__indicators--outside) {
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        text-align: center;
        button { background-color: #dcdfe6; opacity: 0.5; height: 4px; width: 15px; border-radius: 2px; }
        .is-active button { background-color: #999; opacity: 1; }
    }

    .device-grid {
      display: grid;
      grid-template-columns: 1fr 1fr; // 2 columns
      grid-template-rows: 1fr 1fr 1fr; // 3 rows
      gap: 15px; // Increased gap
      height: 100%;
      padding: 15px 15px 30px 15px; 
    }

    .device-item {
      display: flex;
      align-items: center;
      background: #fff; // Changed to white background as per image usually, or keep very light gray if preferred. Image looks like white cards on light bg or light cards on white bg. Let's stick to very light gray for contrast or white if card is on grey. Outer bg is grey, so cards are white.
      // Actually previous impl had .card in index.vue with white bg. So this item should likely be transparent or light gray to stand out? 
      // Image shows cards have white background and shadow or border? 
      // Let's use a very light background for the item itself to differentiate from the container if container is white.
      // But index.vue sets .card { background: #fff }. So strict white on white is invisible.
      background: #f8f9fb; 
      padding: 8px; // Further reduced padding
      border-radius: 4px;
      min-width: 0;

      .icon-wrapper {
        width: 36px; // Reduced from 40px
        height: 36px; // Reduced from 40px
        // The image shows icons, not just colored boxes.
        // We will keep the colored box for now as placeholder for "rich icons"
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px; // Reduced margin
        flex-shrink: 0;
        
        // Remove background color from wrapper if we want "image-like" icons, 
        // but for now stick to colored icons or use colors from data.
        // Let's use large icons with specific colors.
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
        height: 100%;
        
        .main-row {
           display: flex;
           justify-content: space-between;
           align-items: flex-end; // Align bottom for text baseline feel
           margin-bottom: 4px; // Reduced margin
           
           .name { 
               font-size: 13px; // Reduced font size
               color: #666; 
               font-weight: 400;
           }
           .count { 
               font-size: 16px; // Reduced font size
               font-weight: bold; 
               color: #333; 
               line-height: 1;
           }
        }

        .progress-row {
            margin-bottom: 4px; // Reduced margin
            :deep(.el-progress-bar__outer) {
                background-color: #e6ebf5 !important;
                border-radius: 4px;
                height: 6px !important; // Ensure progress bar is not too tall
            }
            :deep(.el-progress-bar__inner) {
                border-radius: 4px;
            }
            :deep(.el-progress-bar__innerText) {
                display: none; // Ensure no text inside bar affects height
            }
        }

        .sub-row {
           .label { 
               font-size: 12px; 
               color: #999; 
               transform: scale(0.9); transform-origin: left;
            }
        }
      }
    }
  }
}
</style>
