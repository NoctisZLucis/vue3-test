<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        :class="{ active: isActive(tag) }"
      >
        {{ tag.meta.title || 'no-name' }}
        <el-icon v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)">
          <Close />
        </el-icon>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Close } from '@element-plus/icons-vue';

// 简单模拟 TagsView 状态，实际项目应放入 Pinia
const visitedViews = ref<any[]>([
  { path: '/dashboard', meta: { title: 'Dashboard', affix: true } }
]);

const route = useRoute();
const router = useRouter();

const addTags = () => {
  const { name } = route;
  if (name) {
    if (!visitedViews.value.some(v => v.path === route.path)) {
      visitedViews.value.push(Object.assign({}, route, { title: route.meta.title || 'no-name' }));
    }
  }
  return false;
}

const isActive = (tag: any) => {
  return tag.path === route.path
}

const closeSelectedTag = (view: any) => {
  const index = visitedViews.value.indexOf(view);
  if (index > -1) {
    visitedViews.value.splice(index, 1);
    if (isActive(view)) {
      toLastView(visitedViews.value);
    }
  }
}

const toLastView = (visitedViews: any[]) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView.path);
  } else {
    router.push('/');
  }
}

watch(route, () => {
  addTags();
});

onMounted(() => {
  addTags();
});
</script>

<style scoped lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      text-decoration: none;
      
      &:first-of-type {
        margin-left: 15px;
      }
      
      &:last-of-type {
        margin-left: 15px;
      }
      
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
