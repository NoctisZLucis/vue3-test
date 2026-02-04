<template>
  <el-row :gutter="20" class="stat-row">
    <el-col :span="4" v-for="(item, index) in data" :key="index">
      <el-card 
        shadow="hover" 
        class="stat-card" 
        :class="{ 'is-active': activeType === item.type }" 
        :style="{ borderTopColor: activeType === item.type ? item.color : 'transparent' }"
        :body-style="{ padding: '15px' }" 
        @click="handleCardClick(item)"
      >
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
  activeType?: string;
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
  border-top: 2px solid transparent; // 预留边框位置
  cursor: pointer;
  transition: all 0.3s; // 添加过渡效果

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

  &.is-active {
    // border-top color 由行内样式控制
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
