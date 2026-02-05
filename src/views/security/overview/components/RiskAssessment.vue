<template>
  <div class="component-container">
    <div class="header">
      <div class="title-bar"></div>
      <span class="title">安全风险评估</span>
    </div>
    <div class="content">
       <div class="risk-summary">
          <div class="icon-wrapper orange">
             <el-icon :size="24" color="#fff"><DataLine /></el-icon>
          </div>
          <div class="info">
             <div class="label">风险资产</div>
          </div>
          <div class="total-box">
             <div class="label">总数</div>
             <div class="count">6</div>
          </div>
       </div>

       <div class="risk-levels">
          <div class="level-item">
             <div class="level-label red">高风险</div>
             <div class="level-count">0</div>
             <div class="bg-icon"><WarningFilled /></div>
          </div>
          <div class="level-item">
             <div class="level-label orange">中风险</div>
             <div class="level-count">0</div>
             <div class="bg-icon"><WarningFilled /></div>
          </div>
          <div class="level-item">
             <div class="level-label blue">低风险</div>
             <div class="level-count">6</div>
             <div class="bg-icon"><WarningFilled /></div>
          </div>
       </div>

       <div class="key-targets">
          <div class="icon-wrapper blue">
             <el-icon :size="24" color="#fff"><OfficeBuilding /></el-icon>
          </div>
          <div class="info">
             <div class="label">重点保障对象</div>
          </div>
          <div class="stats">
             <div class="stat-item">
                <span class="label">总数</span>
                <span class="count">4</span>
             </div>
             <div class="stat-item">
                <span class="label">风险数</span>
                <span class="count">0</span>
             </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataLine, WarningFilled, OfficeBuilding } from '@element-plus/icons-vue';
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        &.orange { background: linear-gradient(135deg, #ffc069 0%, #fa8c16 100%); }
        &.blue { background: linear-gradient(135deg, #69c0ff 0%, #1890ff 100%); }
    }

    .risk-summary, .key-targets {
        background: #fcfcfc;
        border-radius: 4px;
        padding: 15px;
        display: flex;
        align-items: center;

        .info {
            flex: 1;
            font-size: 14px;
            font-weight: bold;
            color: #333;
        }

        .total-box {
            text-align: center;
            .label { font-size: 12px; color: #999; margin-bottom: 2px; }
            .count { font-size: 20px; font-weight: bold; color: #333; }
        }

        .stats {
            display: flex;
            gap: 20px;
            .stat-item {
                text-align: center;
                 .label { font-size: 12px; color: #999; display: block; margin-bottom: 2px; }
                 .count { font-size: 18px; font-weight: bold; color: #333; }
            }
        }
    }

    .risk-levels {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;

        .level-item {
            flex: 1;
            background: #fff;
            margin-right: 10px;
            &:last-child { margin-right: 0; }
            border-radius: 4px;
            padding: 10px;
            position: relative;
            overflow: hidden;
            border: 1px solid #f0f0f0;
            
            .level-label {
                font-size: 12px;
                margin-bottom: 5px;
                display: inline-block;
                padding: 2px 6px;
                border-radius: 10px;
                
                &.red { background: #fff1f0; color: #f5222d; }
                &.orange { background: #fff7e6; color: #fa8c16; }
                &.blue { background: #e6f7ff; color: #1890ff; }
            }

            .level-count {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                margin-top: 5px;
            }

            .bg-icon {
                position: absolute;
                right: -5px;
                bottom: -5px;
                opacity: 0.1;
                font-size: 40px;
                color: #999;
            }
        }
    }
  }
}
</style>
