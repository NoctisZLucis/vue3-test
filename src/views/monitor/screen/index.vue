<template>
  <div class="monitor-screen">
    <Header />
    <div class="main-content">
      <div class="left-col">
          <LeftPanel />
      </div>
      <div class="center-col">
          <CenterPanel />
      </div>
      <div class="right-col">
          <RightPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import LeftPanel from './components/LeftPanel.vue';
import CenterPanel from './components/CenterPanel.vue';
import RightPanel from './components/RightPanel.vue';
</script>

<style scoped lang="scss">
.monitor-screen {
  width: 100%;
  min-height: 100vh;
  background-color: #030b20; // Deep space blue
  color: #fff;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-image: radial-gradient(circle at 50% 50%, #061539 0%, #030b20 100%);

  .main-content {
    flex: 1;
    display: grid;
    grid-template-columns: 28% 44% 28%; // Ratio based on visual estimation
    gap: 15px;
    padding: 15px 20px 20px 20px;
    height: calc(100vh - 80px); // Subtract header height
  }
  
  .left-col, .center-col, .right-col {
      height: 100%;
      display: flex;
      flex-direction: column;
  }
}
</style>
