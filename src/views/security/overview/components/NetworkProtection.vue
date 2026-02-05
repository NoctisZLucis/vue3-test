<template>
  <div class="component-container">
    <div class="header">
      <div class="title-bar"></div>
      <span class="title">网络安全防护</span>
    </div>
    <div class="content">
       <div class="device-grid">
         <div class="device-item" v-for="item in devices" :key="item.name">
            <div class="icon-wrapper" :class="item.type">
              <el-icon :size="24" color="#fff"><component :is="item.icon" /></el-icon>
            </div>
            <div class="info">
              <div class="main-row">
                <span class="name">{{ item.name }}</span>
                <span class="count">{{ item.count }}</span>
              </div>
              <div class="sub-row">
                <span class="label">在线率{{ item.rate }}%</span>
                <el-progress :percentage="item.rate" :show-text="false" :stroke-width="4" :color="item.color" />
              </div>
            </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Monitor, Connection, Odometer, Aim, Lock, Key } from '@element-plus/icons-vue';

const devices = ref([
  { name: '防火墙', count: 24, rate: 4.2, icon: 'Monitor', type: 'blue', color: '#409eff' },
  { name: 'IPS', count: 15, rate: 0, icon: 'Connection', type: 'cyan', color: '#36cfc9' },
  { name: '检测器', count: 15, rate: 0, icon: 'Odometer', type: 'blue', color: '#409eff' },
  { name: 'APT', count: 15, rate: 0, icon: 'Aim', type: 'cyan', color: '#36cfc9' },
  { name: '数据审计', count: 15, rate: 0, icon: 'Lock', type: 'blue', color: '#409eff' },
  { name: '安全审计', count: 15, rate: 0, icon: 'Key', type: 'blue', color: '#409eff' },
]);
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
    padding: 15px;
    
    .device-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      height: 100%;
    }

    .device-item {
      display: flex;
      align-items: center;
      background: #f9f9f9;
      padding: 15px;
      border-radius: 4px;

      .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        
        &.blue { background: linear-gradient(135deg, #69c0ff 0%, #1890ff 100%); }
        &.cyan { background: linear-gradient(135deg, #5cdbd3 0%, #13c2c2 100%); }
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        .main-row {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 8px;
           
           .name { font-size: 14px; color: #666; }
           .count { font-size: 20px; font-weight: bold; color: #333; }
        }

        .sub-row {
           display: flex;
           flex-direction: column;
           gap: 4px;
           .label { font-size: 12px; color: #999; }
        }
      }
    }
  }
}
</style>
