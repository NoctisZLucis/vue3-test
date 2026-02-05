<template>
  <div class="component-container">
    <div class="header">
      <div class="title-bar"></div>
      <span class="title">安全报告</span>
    </div>
    <div class="content">
      <div class="empty-state">
         <el-icon :size="50" color="#ddd"><Box /></el-icon>
         <span class="text">暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Box } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.component-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .header {
    height: 40px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        .text {
            margin-top: 10px;
            color: #999;
            font-size: 14px;
        }
    }
  }
}
</style>
