<template>
  <div class="panel-container">
     <!-- Components will go here -->
     <div class="chart-box">
        <div class="box-title">12盟市重点监控企业传输率、有效率、有效传输率</div>
        <div class="legend-custom">
            <span class="item"><i class="dot red"></i> 传输率</span>
            <span class="item"><i class="dot blue"></i> 有效率</span>
            <span class="item"><i class="dot purple"></i> 有效传输率</span>
        </div>
        <!-- Replaced with Unified Component -->
        <ECharts :option="chart1Option" class="chart-content" />
     </div>
     
     <div class="section-title">涉税数据推送情况</div>
     <div class="stats-grid">
         <div class="stat-card">
             <div class="icon-side"><el-icon><Monitor /></el-icon></div>
             <div class="info">
                 <div class="label">在线监控数据</div>
                 <div class="val text-blue">3326 <span class="unit">条</span></div>
             </div>
         </div>
         <div class="stat-card">
             <div class="icon-side"><el-icon><Document /></el-icon></div>
             <div class="info">
                 <div class="label">行政处罚数据</div>
                 <div class="val text-green">1475 <span class="unit">条</span></div>
             </div>
         </div>
         <div class="stat-card">
             <div class="icon-side"><el-icon><FirstAidKit /></el-icon></div>
             <div class="info">
                 <div class="label">监督性监测数据</div>
                 <div class="val text-white">926</div>
             </div>
         </div>
     </div>

     <div class="chart-box">
        <div class="box-title">环保电价、超低改造概况</div>
        <div class="elec-stats">
            <div class="elec-item">
                <div class="icon-circle text-blue"><el-icon><Lightning /></el-icon></div>
                <div class="item-info">
                    <div class="label">环保电价机组数量</div>
                    <div class="val text-blue">420 <span class="unit">台</span></div>
                </div>
            </div>
             <div class="elec-item">
                <div class="icon-circle text-cyan"><el-icon><Coin /></el-icon></div>
                <div class="item-info">
                    <div class="label">环保电价总装机容量</div>
                    <div class="val text-cyan">420 <span class="unit">兆瓦</span></div>
                </div>
            </div>
             <div class="elec-item">
                <div class="icon-circle text-purple"><el-icon><OfficeBuilding /></el-icon></div>
                <div class="item-info">
                    <div class="label">超低改造企业数量</div>
                    <div class="val text-purple">150 <span class="unit">家</span></div>
                </div>
            </div>
             <div class="elec-item">
                <div class="icon-circle text-orange"><el-icon><Setting /></el-icon></div>
                <div class="item-info">
                    <div class="label">超低改造机组数量</div>
                    <div class="val text-white">101 <span class="unit">台</span></div>
                </div>
            </div>
        </div>
     </div>
     
     <div class="chart-box flex-grow">
        <div class="box-title">环保电价问题小时数及机组数量</div>
        <div class="legend-custom-right">
             <span class="item"><i class="rect blue"></i> 机组数量</span>
             <span class="item"><i class="line purple"></i> 二氧化硫</span>
             <span class="item"><i class="line red"></i> 氮氧化物</span>
             <span class="item"><i class="rect cyan"></i> 烟尘</span>
        </div>
        <div ref="chart2Ref" class="chart-content"></div>
     </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { Monitor, Document, FirstAidKit, Lightning, Coin, OfficeBuilding, Setting } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import ECharts from '@/components/ECharts/index.vue';

const chart2Ref = ref();

// Chart 1 Option
const chart1Option = reactive({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '30px', containLabel: true },
    xAxis: { 
        type: 'category', 
        data: ['呼和浩特', '包头', '呼伦贝尔', '兴安盟', '通辽', '赤峰', '锡林郭勒', '乌兰察布', '鄂尔多斯', '巴彦淖尔', '乌海', '阿拉善'],
        axisLabel: { color: '#8aaafb', interval: 0, fontSize: 10, rotate: 30 },
        axisLine: { lineStyle: { color: '#0d2d6d' } },
        axisTick: { show: false }
    },
    yAxis: { 
        type: 'value', 
        min: 90, 
        splitLine: { lineStyle: { color: 'rgba(13, 45, 109, 0.5)', type: 'dashed' } },
        axisLabel: { color: '#8aaafb' }
    },
    series: [
        { name: '传输率', type: 'line', symbol: 'circle', symbolSize: 6, data: [95, 93, 94, 98, 97, 96, 94, 95, 93, 94, 92, 98], itemStyle: { color: '#f56c6c' }, lineStyle: { width: 1 } },
        { name: '有效率', type: 'line', symbol: 'diamond', symbolSize: 6, data: [96, 95, 97, 99, 98, 97, 95, 96, 94, 95, 93, 97], itemStyle: { color: '#409eff' }, lineStyle: { width: 1 } },
        { name: '有效传输率', type: 'line', symbol: 'rect', symbolSize: 6, data: [97, 96, 98, 99.5, 99, 98, 96, 97, 95, 96, 94, 98], itemStyle: { color: '#a540ff' }, lineStyle: { width: 1 } }
    ]
});

onMounted(() => {
    // initChart1(); // Removed manual init
    initChart2();
});


const initChart2 = () => {
    const chart = echarts.init(chart2Ref.value);
    // Double Y axis chart: Bars for "Machine Set Count", Line for "SO2", "NOx", "Dust"
    chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '30px', containLabel: true },
        xAxis: { 
            type: 'category', 
            data: ['呼和浩特', '包头', '呼伦贝尔', '兴安盟', '通辽', '赤峰', '锡林郭勒', '乌兰察布', '鄂尔多斯', '巴彦淖尔', '乌海', '阿拉善'],
            axisLabel: { color: '#8aaafb', interval: 0, fontSize: 10, rotate: 30 },
             axisLine: { lineStyle: { color: '#0d2d6d' } },
             axisTick: { show: false }
        },
        yAxis: [
            { type: 'value', name: 'h', nameTextStyle: {color: '#8aaafb'}, splitLine: { show: false }, axisLabel: { color: '#8aaafb' } },
            { type: 'value', name: '个', nameTextStyle: {color: '#8aaafb'}, splitLine: { lineStyle: { color: 'rgba(13, 45, 109, 0.5)', type: 'dashed' } }, axisLabel: { color: '#8aaafb' } }
        ],
        series: [
            { name: '机组数量', type: 'bar', barWidth: 8, yAxisIndex: 1, data: [15, 20, 10, 5, 12, 16, 22, 18, 25, 10, 8, 4], itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#00f6ff'}, {offset: 1, color: 'rgba(0,246,255,0)'}]) } },
            { name: '二氧化硫', type: 'line', smooth: true, showSymbol: false, data: [120, 150, 80, 40, 90, 110, 180, 130, 200, 70, 60, 30], itemStyle: { color: '#a540ff' }, lineStyle: { type: 'dashed' } },
            { name: '氮氧化物', type: 'line', smooth: true, showSymbol: false, data: [100, 130, 70, 35, 80, 100, 160, 120, 180, 60, 50, 25], itemStyle: { color: '#f56c6c' }, lineStyle: { type: 'dashed' } },
            { name: '烟尘', type: 'bar', barWidth: 8, yAxisIndex: 1, data: [5, 8, 3, 2, 4, 6, 8, 5, 10, 3, 2, 1], itemStyle: { color: '#0055ff' } } // Added dummy data for 4th legend
        ]
    });
};
</script>

<style scoped lang="scss">
.panel-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .chart-box {
        background: transparent;
        border: none;
        padding: 0;
        position: relative;
        
        .box-title {
            color: #fff;
            font-size: 14px;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            &::before {
                content: '';
                display: inline-block;
                width: 6px; height: 6px;
                background: #f56c6c;
                border-radius: 50%;
                margin-right: 8px;
            }
        }

        .legend-custom, .legend-custom-right {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 12px;
            color: #8aaafb;
            display: flex;
            gap: 10px;
            
            .item {
                display: flex; align-items: center;
                .dot { width: 6px; height: 6px; border-radius: 50%; margin-right: 4px; }
                .rect { width: 8px; height: 8px; margin-right: 4px; }
                .line { width: 10px; height: 2px; margin-right: 4px; }
                
                .red { background: #f56c6c; }
                .blue { background: #409eff; }
                .purple { background: #a540ff; }
                .cyan { background: #00f6ff; }
            }
        }
        
        .legend-custom-right {
             position: absolute;
             top: 0;
             right: 0;
        }

        .chart-content {
            height: 180px;
            width: 100%;
        }

        &.flex-grow .chart-content {
            height: 200px;
        }
    }

    .section-title {
        color: #fff;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        &::before {
            content: '';
            display: inline-block;
            width: 6px; height: 6px;
            background: #f56c6c;
            border-radius: 50%;
            margin-right: 8px;
        }
    }

    .stats-grid {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        
        .stat-card {
            flex: 1;
            background: transparent; 
            display: flex;
            align-items: center;
            padding: 0;
            
            .icon-side {
                font-size: 36px;
                margin-right: 10px;
                color: #00f6ff;
            }
            
            .info {
                .label { font-size: 12px; color: #8aaafb; margin-bottom: 2px; }
                .val { 
                    font-size: 24px; font-weight: bold; line-height: 1;
                    &.text-blue { color: #00f6ff; }
                    &.text-green { color: #00ffaa; }
                    &.text-cyan { color: #00ccff; }
                    &.text-white { color: #fff; }
                    .unit { font-size: 12px; color: #8aaafb; font-weight: normal; margin-left: 2px; }
                }
            }
        }
    }

    .elec-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px 10px;
        
        .elec-item {
            display: flex;
            align-items: center;
            
            .icon-circle {
                width: 32px; height: 32px;
                border-radius: 50%;
                border: 1px solid;
                display: flex; align-items: center; justify-content: center;
                font-size: 16px;
                margin-right: 10px;
                
                &.text-blue { color: #00f6ff; border-color: #00f6ff; box-shadow: 0 0 5px #00f6ff; }
                &.text-cyan { color: #00ccff; border-color: #00ccff; box-shadow: 0 0 5px #00ccff; }
                &.text-purple { color: #a540ff; border-color: #a540ff; box-shadow: 0 0 5px #a540ff; }
                &.text-orange { color: #ffaa00; border-color: #ffaa00; box-shadow: 0 0 5px #ffaa00; }
            }
            
            .item-info {
                .label { font-size: 12px; color: #8aaafb; }
                .val { 
                    font-size: 20px; font-weight: bold; color: #fff; 
                    &.text-blue { color: #00f6ff; }
                    &.text-cyan { color: #00ccff; }
                    &.text-purple { color: #a540ff; }
                    .unit { font-size: 12px; font-weight: normal; color: #8aaafb; } 
                }
            }
        }
    }
}
</style>
