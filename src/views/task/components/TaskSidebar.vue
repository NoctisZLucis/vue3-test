<template>
  <div class="filter-sidebar" :class="{ 'is-collapsed': collapsed }">
    <el-skeleton :loading="loading" animated :rows="5">
      <template #default>
        <div class="filter-group">
          <div class="filter-title">
            <span v-show="!collapsed">筛选器</span>
            <div class="actions">
               <el-icon class="action-icon" @click="handleReset" title="重置筛选"><RefreshRight /></el-icon>
               <el-icon class="action-icon" @click="handleToggle" :title="collapsed ? '展开' : '收起'">
                  <Expand v-if="collapsed" />
                  <Fold v-else />
               </el-icon>
            </div>
          </div>
          
          <div v-show="!collapsed">
            <div class="filter-section" v-if="options.priority?.length">
              <div class="section-header">优先级</div>
              <el-checkbox-group v-model="localFilters.priority" class="vertical-checkbox" @change="handleChange">
                <el-checkbox v-for="item in options.priority" :key="item.value" :label="item.value">
                  {{ item.label }} <span class="count">{{ item.count }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="filter-section" v-if="options.status?.length">
              <div class="section-header">状态</div>
              <el-checkbox-group v-model="localFilters.status" class="vertical-checkbox" @change="handleChange">
                <el-checkbox v-for="item in options.status" :key="item.value" :label="item.value">
                   {{ item.label }} <span class="count">{{ item.count }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>

             <div class="filter-section" v-if="options.category?.length">
              <div class="section-header">业务类别</div>
              <el-checkbox-group v-model="localFilters.category" class="vertical-checkbox" @change="handleChange">
                <el-checkbox v-for="item in options.category" :key="item.value" :label="item.value">
                   {{ item.label }} <span class="count">{{ item.count }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { RefreshRight, Fold, Expand } from '@element-plus/icons-vue';
import type { TaskFilters } from '@/api/task';
import { computed } from 'vue';

interface Filters {
  priority: string[];
  status: string[];
  category: string[];
}

const props = defineProps<{
  filters: Filters;
  options: TaskFilters;
  loading?: boolean;
  collapsed?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:filters', value: Filters): void;
  (e: 'change'): void;
  (e: 'reset'): void;
  (e: 'toggle'): void;
}>();

const localFilters = computed({
  get: () => props.filters,
  set: (val) => emit('update:filters', val)
});

const handleChange = () => {
  emit('change');
};

const handleReset = () => {
  emit('reset');
};

const handleToggle = () => {
  emit('toggle');
};
</script>

<style scoped lang="scss">
.filter-sidebar {
  /* width: 220px;  Managed by parent */
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  flex-shrink: 0;
  /* transition: width 0.3s; Managed by parent */
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;

  &.is-collapsed {
     /* width: 48px; Managed by parent */
     padding: 15px 5px;
     
     .filter-title {
        justify-content: center;
        .actions {
           flex-direction: column;
           gap: 10px;
        }
     }
  }

  .filter-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    
    .actions {
       display: flex;
       align-items: center;
       gap: 8px;
       
       .action-icon {
          cursor: pointer;
          color: #409eff;
          font-size: 18px;
          &:hover {
             opacity: 0.8;
          }
       }
    }
  }

  .filter-section {
    margin-bottom: 20px;
    .section-header {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .vertical-checkbox {
      display: flex;
      flex-direction: column;
      
      .el-checkbox {
        margin-right: 0;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        
        :deep(.el-checkbox__label) {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .count {
            color: #909399;
          }
        }
      }
    }
  }
}
</style>
