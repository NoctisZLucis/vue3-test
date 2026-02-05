<template>
  <div class="app-container">
    <div class="search-section">
       <el-button type="primary" icon="Plus" @click="handleAdd">新增模板</el-button>
    </div>

    <div class="table-content">
      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="模板名称" min-width="200" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right" align="center">
           <template #default="{ row }">
              <el-button link type="primary" @click="handleEdit(row)">设计</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getTemplateList, deleteTemplate, type ReportTemplateItem } from '@/api/report';
import { ElMessageBox } from 'element-plus';
import Message from '@/utils/message';

const router = useRouter();
const loading = ref(false);
const tableData = ref<ReportTemplateItem[]>([]);

const fetchData = async () => {
    loading.value = true;
    try {
        const res = await getTemplateList();
        console.log('Template List Res:', res);
        tableData.value = res;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

const handleAdd = () => {
    router.push('/report/template/editor');
};

const handleEdit = (row: ReportTemplateItem) => {
    router.push(`/report/template/editor?id=${row.id}`);
};

const handleDelete = (row: ReportTemplateItem) => {
    ElMessageBox.confirm('确认删除该模板吗？', '提示', {
        type: 'warning'
    }).then(async () => {
        try {
            await deleteTemplate(row.id);
            Message.success('删除成功');
            fetchData();
        } catch (e) {
            console.error(e);
        }
    });
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped lang="scss">
.app-container {
    padding: 20px;
    background-color: #f0f2f5;
    height: 100%;
    display: flex;
    flex-direction: column;

    .search-section {
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
    }

    .table-content {
        flex: 1;
        background: #fff;
        padding: 20px;
        border-radius: 4px;
        overflow: hidden;
    }
}
</style>
