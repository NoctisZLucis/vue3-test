<template>
  <div ref="chartRef" :class="className" :style="{ height: height, width: width }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, shallowRef } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption, ECharts } from 'echarts';

// 定义 Props
interface Props {
  option: EChartsOption;
  width?: string;
  height?: string;
  className?: string;
  theme?: string | object;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  className: '',
  theme: '',
  loading: false
});

// 定义 Emits
const emit = defineEmits<{
  (e: 'chart-click', params: any): void;
  (e: 'chart-dblclick', params: any): void;
}>();

const chartRef = ref<HTMLElement | null>(null);
const chartInstance = shallowRef<ECharts | null>(null); // 使用 shallowRef 避免被 Vue 深度代理导致性能问题
let resizeObserver: ResizeObserver | null = null;

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;
  
  // 销毁旧实例
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }

  // 初始化
  chartInstance.value = echarts.init(chartRef.value, props.theme);
  
  // 设置配置项
  if (props.option) {
      chartInstance.value.setOption(props.option);
  }

  // 绑定事件
  chartInstance.value.on('click', (params) => {
    emit('chart-click', params);
  });
  chartInstance.value.on('dblclick', (params) => {
    emit('chart-dblclick', params);
  });

  // 初始 Loading 状态
  if (props.loading) {
      chartInstance.value.showLoading();
  }
};

// 监听 Option 变化
watch(() => props.option, (newVal) => {
  if (chartInstance.value && newVal) {
    chartInstance.value.setOption(newVal, { notMerge: false }); // 默认 merge
  }
}, { deep: true });

// 监听 Loading
watch(() => props.loading, (val) => {
    if (!chartInstance.value) return;
    if (val) {
        chartInstance.value.showLoading();
    } else {
        chartInstance.value.hideLoading();
    }
});

// 监听 Theme 变化 (由于 echarts init 后不能动态改 theme，只能销毁重建，或者不改 theme)
// 这里简单实现：如果 theme 变了，可能需要重新 init，但通常 theme 不会动态变。暂不处理动态 theme。

// 监听 Resize
const handleResize = () => {
  chartInstance.value?.resize();
};

onMounted(() => {
  nextTick(() => {
    initChart();
    
    // ResizeObserver 监听容器大小
    if (chartRef.value) {
        resizeObserver = new ResizeObserver(() => {
            handleResize();
        });
        resizeObserver.observe(chartRef.value);
    }
  });
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;
  }
  if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
  }
});

// 暴露实例
defineExpose({
  getInstance: () => chartInstance.value,
  resize: handleResize
});

</script>

<style scoped>
/* 默认无样式，由父组件控制或 height/width props */
</style>
