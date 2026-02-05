<template>
  <div class="component-container">
    <div class="header">
      <div class="left">
        <div class="title-bar"></div>
        <span class="title">安全事件分析</span>
      </div>
      <div class="actions">
         <el-radio-group v-model="radio" size="small">
            <el-radio-button label="近一周" />
         </el-radio-group>
         <div class="date-range">
             <span>2024-02-20</span>
             <span class="sep">至</span>
             <span>2024-02-27</span>
             <el-icon class="icon"><Calendar /></el-icon>
         </div>
      </div>
    </div>
    <div class="content">
      <div class="top-section">
          <!-- Left Stats -->
          <div class="stats-panel">
              <div class="total-box">
                  <div class="icon-box">
                      <!-- Use SVG/Icon or simple blue block with icon -->
                      <el-icon :size="24" color="#fff"><TrendCharts /></el-icon>
                  </div>
                  <div class="info">
                      <div class="label">事件总数</div>
                      <div class="count">3万</div>
                  </div>
              </div>
              
              <div class="status-bar">
                  <div class="status-item"><span class="dot success"></span>已处置 2</div>
                  <div class="status-item"><span class="dot primary"></span>处置中 1</div>
                  <div class="status-item"><span class="dot warning"></span>未处置 3万</div>
              </div>
              <div class="progress-bar">
                  <div class="segment success" style="width: 1%"></div>
                  <div class="segment primary" style="width: 1%"></div>
                  <div class="segment warning" style="width: 98%"></div>
              </div>

              <div class="severity-grid">
                  <div class="sev-item">
                      <div class="label">特别重大</div>
                      <div class="val">1</div>
                  </div>
                  <div class="sev-item">
                      <div class="label">重大</div>
                      <div class="val">5</div>
                  </div>
                  <div class="sev-item">
                      <div class="label">较大</div>
                      <div class="val">1.6万</div>
                  </div>
                  <div class="sev-item active">
                      <div class="tag">14088</div>
                      <div class="label">一般</div>
                      <div class="val">1.4万</div>
                  </div>
              </div>
          </div>

          <!-- Right Pie Chart -->
          <div class="pie-chart-panel">
              <div class="chart-title">事件分类</div>
              <ECharts :option="pieOption" class="echarts-box" />
          </div>
      </div>

      <div class="bottom-section">
          <div class="chart-title">发生趋势</div>
          <ECharts :option="lineOption" class="echarts-box" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Calendar, TrendCharts } from '@element-plus/icons-vue';
import ECharts from '@/components/ECharts/index.vue';
import * as echarts from 'echarts'; // For types and graphic

const radio = ref('近一周');

const colors = ['#f56c6c', '#409eff', '#e6a23c', '#d9d9d9', '#fa8c16']; 

const pieData = [
  { value: 16, name: '用户违规' },
  { value: 23, name: '运维异常' },
  { value: 1, name: '网络攻击' },
  { value: 30000, name: '设备设施故障' },
  { value: 1, name: '威胁情报' }
];

const pieOption = reactive({
    color: colors,
    tooltip: { trigger: 'item' },
    legend: {
        orient: 'vertical',
        right: '0%',
        top: 'center',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 15,
        textStyle: { fontSize: 12, color: '#666' },
        formatter: (name: string) => {
            const item = pieData.find(p => p.name === name);
            // Align visually with spaces
            return `${name}       ${item?.value}`;
        }
    },
    series: [
        {
            name: '事件分类',
            type: 'pie',
            radius: ['55%', '75%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                formatter: `{total|3万}\n{text|事件总数}`,
                rich: {
                    total: {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#E6A23C', // Match warning color from image
                        padding: [0, 0, 4, 0]
                    },
                    text: {
                        fontSize: 12,
                        color: '#999'
                    }
                }
            },
            emphasis: { scale: true, scaleSize: 5 },
            labelLine: { show: false },
            data: pieData,
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 2
            }
        }
    ]
});

const dates = ['02-20', '02-21', '02-22', '02-23', '02-24', '02-25', '02-26', '02-27'];
const lineOption = reactive({
    color: colors,
    tooltip: { trigger: 'axis' },
    legend: {
        top: 0,
        right: 0, // Align right
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { fontSize: 10, color: '#666' },
        itemGap: 15
    },
    grid: {
        left: '2%',
        right: '3%',
        bottom: '3%',
        top: '30px',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLine: { lineStyle: { color: '#f0f0f0' } }, // Light line
        axisLabel: { color: '#909399', fontSize: 11 },
        axisTick: { show: false }
    },
    yAxis: {
        type: 'value',
        splitLine: { lineStyle: { type: 'dashed', color: '#f0f0f0' } },
        axisLabel: { color: '#909399', fontSize: 11 }
    },
    series: [
        {
            name: '用户违规', type: 'line', data: [0, 0, 0, 0, 0, 0, 2, 5], symbol: 'none', itemStyle: {color: '#f56c6c'}
        },
        {
            name: '运维异常', type: 'line', data: [0, 0, 0, 0, 0, 0, 5, 10], symbol: 'none', itemStyle: {color: '#409eff'}
        },
        {
            name: '网络攻击', type: 'line', data: [0, 0, 0, 0, 0, 0, 0, 1], symbol: 'none', itemStyle: {color: '#e6a23c'}
        },
        {
            name: '设备设施故障',
            type: 'line',
            data: [100, 100, 100, 100, 100, 1500, 28000, 100], 
            smooth: true,
            symbol: 'none',
            itemStyle: {color: '#eac54f'}, // Yellow
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(234, 197, 79, 0.3)' },
                    { offset: 1, color: 'rgba(234, 197, 79, 0)' }
                ])
            }
        },
        {
            name: '威胁情报', type: 'line', data: [0, 0, 0, 0, 0, 0, 0, 0], symbol: 'none', itemStyle: {color: '#fa8c16'}
        }
    ]
});
</script>

<style scoped lang="scss">
.component-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  overflow: hidden; // Contain children
  
  .header {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid #ebeef5;

    .left {
      display: flex;
      align-items: center;
      .title-bar { width: 4px; height: 16px; background-color: #409eff; margin-right: 8px; border-radius: 2px; }
      .title { font-size: 15px; font-weight: bold; color: #303133; }
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 12px;
        .date-range { 
            display: flex; align-items: center;
            background: #fff; 
            border: 1px solid #dcdfe6; 
            border-radius: 4px; 
            padding: 4px 10px;
            font-size: 12px; color: #606266;
            .sep { margin: 0 8px; color: #909399; }
            .icon { margin-left: 8px; color: #909399; }
        }
        :deep(.el-radio-button__inner) {
            padding: 5px 12px;
            font-size: 12px;
        }
    }
  }

  .content {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px; 
    overflow-y: auto; // Allow scroll if compressed

    .chart-title {
        font-size: 13px;
        font-weight: 500;
        color: #303133;
        margin-bottom: 10px;
    }

    .top-section {
        display: flex;
        height: 170px; // Fixed height for top part
        
        .stats-panel {
            flex: 1;
            padding-right: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between; 

            .total-box {
                display: flex;
                align-items: center;
                .icon-box { 
                    width: 48px; height: 48px; 
                    background: linear-gradient(135deg, #66b1ff 0%, #409eff 100%);
                    border-radius: 8px; 
                    display: flex; align-items: center; justify-content: center; 
                    margin-right: 12px; 
                    box-shadow: 0 4px 10px rgba(64, 158, 255, 0.3);
                }
                .info {
                    .label { font-size: 13px; color: #909399; margin-bottom: 4px; }
                    .count { font-size: 24px; font-weight: bold; color: #303133; line-height: 1; }
                }
            }
            
            .status-bar {
                display: flex;
                gap: 15px;
                font-size: 12px;
                color: #606266;
                margin-top: 10px;
                .status-item { 
                    display: flex; align-items: center; 
                    .dot { width: 8px; height: 8px; border-radius: 2px; margin-right: 6px; }
                    .success { background: #67c23a; }
                    .primary { background: #409eff; }
                    .warning { background: #e6a23c; }
                }
            }

            .progress-bar {
                display: flex;
                height: 8px;
                background: #f5f7fa;
                border-radius: 4px;
                overflow: hidden;
                margin-top: 8px;
                margin-bottom: 16px;
                .segment { height: 100%; transition: width 0.3s; }
                .success { background: #67c23a; }
                .primary { background: #409eff; }
                .warning { background: #e6a23c; }
            }

            .severity-grid {
                display: flex;
                justify-content: space-between;
                .sev-item {
                    text-align: center;
                    position: relative;
                    flex: 1;
                    
                    .label { font-size: 12px; color: #909399; margin-bottom: 6px; }
                    .val { font-size: 16px; font-weight: bold; color: #303133; }

                    &.active {
                        .tag {
                            position: absolute;
                            top: -24px;
                            left: 50%;
                            transform: translateX(-50%);
                            background: #303133;
                            color: #fff;
                            font-size: 12px;
                            padding: 2px 6px;
                            border-radius: 4px;
                            white-space: nowrap;
                            &:after {
                                content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
                                border: 4px solid transparent; border-top-color: #303133;
                            }
                        }
                    }
                }
            }
        }

        .pie-chart-panel {
            flex: 1.2; 
            border-left: 1px solid #ebeef5;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            .echarts-box { flex: 1; width: 100%; }
        }
    }

    .bottom-section {
        flex: 1; // Take remaining height
        display: flex;
        flex-direction: column;
        border-top: 1px solid #ebeef5;
        padding-top: 16px;
        .echarts-box { flex: 1; width: 100%; min-height: 150px; }
    }
  }
}
</style>

