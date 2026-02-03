<template>
  <el-row :gutter="20" class="stat-row">
    <el-col :span="4" v-for="(item, index) in data" :key="index">
      <el-card shadow="hover" class="stat-card" :body-style="{ padding: '15px' }" @click="handleCardClick(item)">
        <el-skeleton :loading="loading" animated :rows="1">
           <template #default>
              <div class="stat-content">
                <div class="stat-icon" :style="{ backgroundColor: item.color + '20', color: item.color }">
                  <el-icon><component :is="item.icon" /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-label">{{ item.label }}</div>
                  <div class="stat-value">{{ item.value }}</div>
                </div>
              </div>
           </template>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { TaskStat } from '@/api/task';

const props = defineProps<{
  data: TaskStat[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'card-click', item: TaskStat): void;
}>();

const handleCardClick = (item: TaskStat) => {
  emit('card-click', item);
};
</script>

<style scoped lang="scss">
.stat-row {
  margin-bottom: 10px;
}

.stat-card {
  border: none;
  cursor: pointer;
  .stat-content {
    display: flex;
    align-items: center;
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      margin-right: 15px;
    }
    .stat-info {
      .stat-label {
        font-size: 14px;
        color: #909399;
        margin-bottom: 5px;
      }
      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
      }
    }
  }
}
</style>
