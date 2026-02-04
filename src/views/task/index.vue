<template>
  <div class="task-container">
    <!-- 1. 统计卡片区域 -->

    <TaskStats 
      :data="stats" 
      :loading="stateLoading.stats" 
      :active-type="currentStatType"
      @card-click="handleCardClick" 
    />

    <!-- 2. 搜索区域 -->
    <div class="search-section">
      <div class="search-item">
        <span class="label">关键字:</span>
        <el-input v-model="searchForm.keyword" placeholder="编号/任务名称/发起人" style="width: 200px" />
      </div>
      <div class="search-item">
        <span class="label">发起时间:</span>
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          range-separator="→"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          style="width: 240px"
        />
      </div>
      <div class="search-item">
        <span class="label">任务类型:</span>
        <el-select v-model="searchForm.type" placeholder="请选择" style="width: 150px">
          <el-option v-for="item in taskTypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="search-action">
        <el-button type="primary" icon="Search" @click="handleSearch" :loading="stateLoading.list">查询</el-button>
        <el-button icon="Refresh" @click="handleReset">重置</el-button>
      </div>
    </div>

    <!-- 3. 主体区域 -->
    <div class="main-content">
      <!-- 左侧筛选 -->
      <TaskSidebar 
        v-model:filters="filters" 
        class="filter-sidebar"
        :class="{ 'collapsed': sidebarCollapsed }"
        :options="filterOptions" 
        :loading="stateLoading.sidebar"
        :collapsed="sidebarCollapsed"
        @change="handleSearch" 
        @reset="handleSidebarReset"
        @toggle="handleSidebarToggle"
      />

      <!-- 右侧表格 -->
      <div class="table-content">
        <div class="table-toolbar">
          <el-button type="primary" icon="Plus" @click="handleAdd">新增任务</el-button>
          <el-button type="success" icon="Download" @click="handleExport" :loading="stateLoading.list">导出Excel</el-button>
        </div>

        <el-table 
          v-loading="stateLoading.list"
          :data="tableData" 
          style="width: 100%; flex: 1" 
          height="100%" 
          border 
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" width="60" align="center">
            <template #default="{ $index }">
               {{ (currentPage - 1) * pageSize + $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="no" label="编号" width="120" show-overflow-tooltip />
          <el-table-column prop="name" label="任务名称" min-width="150" show-overflow-tooltip>
            <template #default="{ row }">
              <span class="link-type" style="color: #409eff; cursor: pointer" @click="handleDetail(row)">{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="任务类型" width="120" show-overflow-tooltip />
          <el-table-column prop="priority" label="优先级" width="80" show-overflow-tooltip>
             <template #default="{ row }">
               {{ row.priority }}
             </template>
          </el-table-column>
          <el-table-column prop="createTime" label="发起时间" width="180" sortable show-overflow-tooltip />
          <el-table-column prop="dueTime" label="期望完成时间" width="180" sortable show-overflow-tooltip>
             <template #default="{ row }">
               <span :class="{ overdue: row.isOverdue }">{{ row.dueTime }}</span>
             </template>
          </el-table-column>
          <el-table-column prop="initiator" label="发起人" width="100" fixed="right" show-overflow-tooltip />

          <el-table-column prop="status" label="状态" width="100" fixed="right" show-overflow-tooltip>
             <template #default="{ row }">
                <el-tag :type="row.statusType" effect="plain" round size="small">
                   <div style="display: flex; align-items: center;">
                      <el-icon v-if="row.statusType === 'success'" style="margin-right: 4px"><Check /></el-icon>
                      <el-icon v-else-if="row.statusType === 'primary'" style="margin-right: 4px"><MoreFilled /></el-icon>
                      <el-icon v-else-if="row.statusType === 'warning'" style="margin-right: 4px"><VideoPause /></el-icon>
                      {{ row.statusText }}
                   </div>
                </el-tag>
             </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center" fixed="right">
             <template #default="{ row }">
                 <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
                 <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
           <span class="total-text">共 {{ total }} 条记录</span>
           <el-pagination
            background
            layout="sizes, prev, pager, next, jumper"
            :total="total"
            :page-sizes="[10, 20, 50]"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            @size-change="handleSearch"
            @current-change="handleSearch"
          />
        </div>
      </div>
    </div>

    <TaskForm 
      v-model:visible="formVisible" 
      :data="currentTask" 
      :mode="formMode"
      @submit="handleFormSubmit" 
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { Check, MoreFilled, VideoPause } from '@element-plus/icons-vue';
import TaskStats from './components/TaskStats.vue';
import TaskSidebar from './components/TaskSidebar.vue';
import TaskForm from './components/TaskForm.vue';
import { ElMessageBox } from 'element-plus'; // Import ElMessageBox
import Message from '@/utils/message';
import { 
  getTaskStats, 
  getTaskFilters, 
  getTaskTypes, 
  getTaskList,
  deleteTask,
  type TaskStat,
  type TaskFilters,
  type TaskType,
  type TaskItem
} from '@/api/task';

// 统计数据

const stats = ref<TaskStat[]>([]);

// 筛选配置
const filterOptions = ref<TaskFilters>({
  priority: [],
  status: [],
  category: []
});

// 事项类型枚举
const taskTypes = ref<TaskType[]>([]);

// Loading 状态
const stateLoading = reactive({
  stats: false,
  sidebar: false,
  list: false
});

// 搜索表单
const searchForm = reactive({
  keyword: '',
  dateRange: [],
  type: ''
});

// 左侧折叠状态
const sidebarCollapsed = ref(false);

const handleSidebarToggle = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
};

const handleSidebarReset = () => {
    filters.priority = [];
    filters.status = [];
    filters.category = [];
    handleSearch();
};

const handleReset = () => {
    searchForm.keyword = '';
    searchForm.dateRange = [];
    searchForm.type = '';
    handleSearch();
};

// 筛选状态
interface FiltersState {
  priority: string[];
  status: string[];
  category: string[];
}
const filters = reactive<FiltersState>({
  priority: [],
  status: [],
  category: []
});

// 表格数据
const tableData = ref<TaskItem[]>([]);
const total = ref(0);

// 获取数据方法
const fetchData = async () => {
  stateLoading.stats = true;
  stateLoading.sidebar = true;
  try {
    const statsRes = await getTaskStats();
    stats.value = statsRes;

    const filtersRes = await getTaskFilters();
    filterOptions.value = filtersRes;

    const typesRes = await getTaskTypes();
    taskTypes.value = typesRes;

    // 初始加载列表
    handleSearch();
  } catch (error) {
    console.error('Fetch data failed:', error);
  } finally {
    stateLoading.stats = false;
    stateLoading.sidebar = false;
  }
};

import { debounce } from '@/utils'; // 引入防抖

// ... (imports)

// ...

// ...

const executeSearch = async () => {
    stateLoading.list = true;
    try {
        const listRes = await getTaskList({
            page: currentPage.value,
            pageSize: pageSize.value,
            ...searchForm,
            ...filters // 简单合并筛选条件，实际可能需要更复杂的参数处理
        });
        tableData.value = listRes.list;
        total.value = listRes.total;
    } catch (error) {
        console.error('Fetch list failed:', error);
    } finally {
      stateLoading.list = false;
    }
};

const handleSearch = debounce(executeSearch, 300); // 300ms 防抖

// 当前选中的统计类型
const currentStatType = ref('all');

// 统计卡片点击
const handleCardClick = (item: TaskStat) => {
  // 更新选中状态
  if (item.type) {
    currentStatType.value = item.type;
  }

  if (item.type === 'todo') {
     filters.status = ['1']; // 假设 1 是处理中
  } else if (item.type === 'done') {
     filters.status = ['2']; // 假设 2 是已关闭
  } else if (item.type === 'upcoming') {
     // 待发
  } else if (item.type === 'all') {
     // 重置或者其他逻辑
     filters.status = [];
  }
  // 触发查询
  handleSearch();
};


onMounted(() => {
  fetchData();
});

const currentPage = ref(1);
const pageSize = ref(10);

// 弹窗相关
const formVisible = ref(false);
const currentTask = ref<TaskItem | null>(null);
const formMode = ref<'add' | 'edit' | 'detail'>('add');

const handleAdd = () => {
    currentTask.value = null;
    formMode.value = 'add';
    formVisible.value = true;
};

const handleEdit = (row: TaskItem) => {
    currentTask.value = row;
    formMode.value = 'edit';
    formVisible.value = true;
};

const handleDetail = (row: TaskItem) => {
    currentTask.value = row;
    formMode.value = 'detail';
    formVisible.value = true;
};

const handleDelete = (row: TaskItem) => {
    ElMessageBox.confirm(
        '确认删除该任务吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
    ).then(async () => {
        try {
            await deleteTask(row.no); // assuming 'no' is the ID
            Message.success('删除成功');
            handleSearch(); // Refresh list
        } catch (error) {
            console.error(error);
        }
    }).catch(() => {
        // Cancelled
    });
};

// 导出相关
import * as XLSX from 'xlsx';

const selectedRows = ref<TaskItem[]>([]);

const handleSelectionChange = (val: TaskItem[]) => {
    selectedRows.value = val;
};

const handleExport = () => {
    stateLoading.list = true;
    try {
        const dataToExport = selectedRows.value.length > 0 ? selectedRows.value : tableData.value;
        const exportData = dataToExport.map(item => ({
            '编号': item.no,
            '任务名称': item.name,
            '任务类型': item.type,
            '优先级': item.priority,
            '发起时间': item.createTime,
            '期望完成时间': item.dueTime,
            '发起人': item.initiator,
            '状态': item.statusText
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Tasks");
        XLSX.writeFile(wb, "任务列表.xlsx");
        Message.success('导出成功');
    } catch (e) {
        console.error(e);
        Message.error('导出失败');
    } finally {
        stateLoading.list = false;
    }
};

const handleFormSubmit = (data: any) => {
    console.log('Submit:', data);
    // 这里可以调用 saveTask API
    // 模拟成功并刷新
    formVisible.value = false;
    handleSearch();
};


</script>

<style scoped lang="scss">
.task-container {
  padding: 10px;
  background-color: #f0f2f5;
  height: 100%;
  display: flex;
  flex-direction: column;

  .stat-row {
    margin-bottom: 10px;
  }

  .search-section {
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;

    .search-item {
      display: flex;
      align-items: center;
      .label {
        margin-right: 10px;
        font-size: 14px;
        color: #606266;
        white-space: nowrap;
      }
    }
  }

  .main-content {
    display: flex;
    gap: 10px;
    flex: 1;
    overflow: hidden;
    
    .filter-sidebar {
      width: 220px;
      flex-shrink: 0;
      transition: width 0.3s;

      &.collapsed {
        width: 60px;
      }
    }

    .table-content {
      flex: 1;
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .table-toolbar {
        margin-bottom: 15px;
      }

      .link-type {
        color: #409eff;
        cursor: pointer;
      }

      .overdue {
        color: #f56c6c;
      }

      .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .total-text {
          margin-right: 15px;
          color: #606266;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
