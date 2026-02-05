<template>
  <div class="security-overview">
    <div class="top-row">
      <NetworkProtection class="card network-protection" />
      <TerminalProtection class="card terminal-protection" />
      <RiskAssessment class="card risk-assessment" />
    </div>
    <div class="bottom-row">
      <IncidentAnalysis class="card incident-analysis" />
      <SecurityReport class="card security-report" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NetworkProtection from './components/NetworkProtection.vue';
import TerminalProtection from './components/TerminalProtection.vue';
import RiskAssessment from './components/RiskAssessment.vue';
import IncidentAnalysis from './components/IncidentAnalysis.vue';
import SecurityReport from './components/SecurityReport.vue';
</script>

<style scoped lang="scss">
.security-overview {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 20px;

  .top-row {
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr;
    gap: 20px;
    height: 380px;
  }

  .bottom-row {
     display: grid;
     grid-template-columns: 2.2fr 1fr;
     gap: 20px;
     flex: 1;
     min-height: 400px;
  }

  .card {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    overflow: hidden;
  }
}
</style>
