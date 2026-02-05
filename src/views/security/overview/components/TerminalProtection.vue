<template>
  <div class="component-container">
    <div class="header">
      <div class="left">
          <div class="title-bar"></div>
          <span class="title">终端安全防护情况</span>
      </div>
      <div class="right-tabs">
          <span class="tab active">非国产</span>
          <span class="divider">|</span>
          <span class="tab">国产通用</span>
          <span class="divider">|</span>
          <span class="tab">涉密专用</span>
      </div>
    </div>
    <div class="content">
      <div class="section-title">终端未部署情况（台）</div>
      <div class="deploy-grid">
         <div class="deploy-item" v-for="item in notDeployed" :key="item.name">
            <el-icon :size="18" :color="item.color"><component :is="item.icon" /></el-icon>
            <span class="name">{{ item.name }}</span>
            <span class="count">{{ item.count }}</span>
         </div>
      </div>

      <div class="section-title" style="margin-top: 20px;">关键信息不一致情况（台）</div>
      <div class="mismatch-grid">
          <div class="mismatch-item" v-for="item in mismatch" :key="item.name">
             <div class="icon-box">
                <el-icon :size="20" color="#fff"><component :is="item.icon" /></el-icon>
             </div>
             <span class="name">{{ item.name }}</span>
             <span class="count">{{ item.count }}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Reading, Files, Printer, HelpFilled, Avatar, Platform, Coin, User, Operation } from '@element-plus/icons-vue';

const notDeployed = ref([
    { name: '三合一', count: 34, icon: 'Reading', color: '#f56c6c' },
    { name: '主机审计', count: 11, icon: 'Platform', color: '#409eff' },
    { name: '刻录审计', count: 26, icon: 'Files', color: '#409eff' },
    { name: '打印审计', count: 15, icon: 'Printer', color: '#fcbd71' },
    { name: '防病毒', count: 18, icon: 'HelpFilled', color: '#409eff' },
    { name: '安全登录', count: 19, icon: 'Avatar', color: '#409eff' },
]);

const mismatch = ref([
    { name: 'IP地址', count: 21, icon: 'Coin' }, // Using Coin as rough approximation for server/IP
    { name: '责任人', count: 32, icon: 'User' },
    { name: '归属部门', count: 46, icon: 'Operation' },
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
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 1px solid #f0f0f0;

    .left {
       display: flex;
       align-items: center;
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

    .right-tabs {
        font-size: 12px;
        color: #999;
        .tab {
            cursor: pointer;
            &.active { color: #409eff; font-weight: bold; }
        }
        .divider { margin: 0 5px; color: #ddd; }
    }
  }

  .content {
    flex: 1;
    padding: 15px;
    font-size: 13px;

    .section-title {
        color: #666;
        margin-bottom: 10px;
    }

    .deploy-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;

        .deploy-item {
            display: flex;
            align-items: center;
            background: #fcfcfc;
            padding: 10px;
            
            .name { flex: 1; margin-left: 8px; color: #333; }
            .count { font-weight: bold; color: #333; }
        }
    }

    .mismatch-grid {
        display: flex;
        justify-content: space-between;
        
        .mismatch-item {
            display: flex;
            align-items: center;
            background: #f9f9f9;
            padding: 10px 20px;
            border-radius: 4px;
            flex: 1;
            margin-right: 10px;
            &:last-child { margin-right: 0; }

            .icon-box {
                width: 32px;
                height: 32px;
                background: #409eff;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
            }
            .name { color: #666; margin-right: auto; }
            .count { font-size: 16px; font-weight: bold; }
        }
    }
  }
}
</style>
