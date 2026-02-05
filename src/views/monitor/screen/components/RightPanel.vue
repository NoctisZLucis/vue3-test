<template>
  <div class="panel-container">
     <div class="stats-row">
         <div class="stat-bubble">
             <div class="icon"><el-icon><OfficeBuilding /></el-icon></div>
             <div class="content">
                 <div class="label">乌海及周边地区废气重点排污单位企业数量</div>
                 <div class="val-row">
                    <span class="prefix">企业数量</span>
                    <span class="val text-cyan">215 <span class="unit">家</span></span>
                 </div>
             </div>
         </div>
          <div class="stat-bubble">
             <div class="icon"><el-icon><VideoCamera /></el-icon></div>
             <div class="content">
                 <div class="label">乌海及周边地区监控点数量</div>
                 <div class="val-row">
                     <span class="prefix">监控点数量</span>
                     <span class="val text-red">269 <span class="unit">个</span></span>
                 </div>
             </div>
         </div>
     </div>

     <div class="chart-box">
         <div class="box-title">乌海及周边地区废气污染物排放量、平均浓度及达标率</div>
         <div class="legend-custom">
             <span class="item"><i class="rect blue"></i> 排放量</span>
             <span class="item"><i class="dot purple"></i> 平均浓度</span>
             <span class="item"><i class="dot red"></i> 达标率</span>
         </div>
         <div ref="chart3Ref" class="chart-content"></div>
     </div>

     <div class="chart-box">
         <div class="box-title">不同异常类型污染源点数量</div>
         <div class="gauge-grid">
             <div ref="gauge1Ref" class="gauge-item"></div>
             <div ref="gauge2Ref" class="gauge-item"></div>
             <div ref="gauge3Ref" class="gauge-item"></div>
             <div ref="gauge4Ref" class="gauge-item"></div>
         </div>
     </div>

     <div class="chart-box flex-grow">
         <div class="box-title">12盟市异常数据情况</div>
         <div class="legend-custom-right">
             <span class="item"><i class="rect blue"></i> 占监控企业总数比例</span>
             <span class="item"><i class="rect pink"></i> 占监控点总数比例</span>
         </div>
         <div ref="chart4Ref" class="chart-content"></div>
     </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { OfficeBuilding, VideoCamera } from '@element-plus/icons-vue';
import * as echarts from 'echarts';

const chart3Ref = ref();
const chart4Ref = ref();
const gauge1Ref = ref();
const gauge2Ref = ref();
const gauge3Ref = ref();
const gauge4Ref = ref();

onMounted(() => {
    initChart3();
    initChart4();
    initGauge(gauge1Ref.value, '监测值为0', 152, '#00f6ff');
    initGauge(gauge2Ref.value, '监测值极大', 87, '#a540ff');
    initGauge(gauge3Ref.value, '联网传输异常', 95, '#00ffaa');
    initGauge(gauge4Ref.value, '监控超负荷', 114, '#f56c6c');
});

const initChart3 = () => {
    const chart = echarts.init(chart3Ref.value);
    chart.setOption({
         tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '35px', containLabel: true },
        xAxis: { 
            type: 'category', 
            data: ['阿公地经济开发区', '蒙西高新技术工业园', '千里山工业园区', '乌达工业园区', '乌海市其他企业', '海勃湾区'],
            axisLabel: { color: '#8aaafb', interval: 0, fontSize: 10, rotate: 20 },
            axisLine: { lineStyle: { color: '#0d2d6d' } },
            axisTick: { show: false }
        },
        yAxis: [
            { type: 'value', name: '(吨)', nameTextStyle: {color: '#8aaafb'}, splitLine: { show: false }, axisLabel: { color: '#8aaafb' } },
            { type: 'value', name: '(mg/L)', nameTextStyle: {color: '#8aaafb'}, splitLine: { lineStyle: { color: 'rgba(13, 45, 109, 0.5)', type: 'dashed' } }, axisLabel: { color: '#8aaafb' } }
        ],
        series: [
            { name: '排放量', type: 'bar', barWidth: 15, data: [320, 200, 150, 250, 400, 180], itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: '#00f6ff'}, {offset: 1, color: 'rgba(0,246,255,0)'}]) } },
            { name: '平均浓度', type: 'line', yAxisIndex: 1, symbol: 'circle', symbolSize: 6, data: [60, 50, 40, 55, 80, 50], itemStyle: { color: '#a540ff' }, lineStyle: { width: 1 } },
            { name: '达标率', type: 'line', yAxisIndex: 1, symbol: 'circle', symbolSize: 6, data: [98, 97, 99, 95, 90, 96], itemStyle: { color: '#f56c6c' }, lineStyle: { width: 1, type: 'dashed' } }
        ]
    });
};

const initGauge = (dom: HTMLElement, title: string, val: number, color: string) => {
    const chart = echarts.init(dom);
    chart.setOption({
        series: [{
            type: 'gauge',
            startAngle: 180, endAngle: 0,
            radius: '90%',
            center: ['50%', '60%'],
            min: 0, max: 200,
            splitNumber: 5,
            axisLine: { lineStyle: { width: 4, color: [[1, '#1e3052']] } },
            splitLine: { length: 6, lineStyle: { color: 'auto' } },
            axisTick: { length: 3, lineStyle: { color: 'auto' } },
            axisLabel: { color: '#8aaafb', fontSize: 10, distance: 8 },
            pointer: { width: 3 },
            detail: { fontSize: 18, offsetCenter: [0, '20%'], valueAnimation: true, color: color },
            data: [{ value: val, name: title, title: { offsetCenter: [0, '60%'], color: '#fff', fontSize: 12 } }]
        }, { // Background arc
             type: 'gauge',
             startAngle: 180, endAngle: 0,
             radius: '100%',
             center: ['50%', '60%'],
             axisLine: { lineStyle: { width: 1, color: [[1, color]] } },
             axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false }, pointer: { show: false }, detail: { show: false }
        }]
    });
};

const initChart4 = () => {
    const chart = echarts.init(chart4Ref.value);
    const yData = ['呼和浩特', '包头', '呼伦贝尔', '兴安盟', '通辽', '赤峰', '锡林郭勒', '乌兰察布', '鄂尔多斯', '巴彦淖尔', '乌海', '阿拉善'];
    chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '10%', bottom: '3%', top: '25px', containLabel: true },
        xAxis: { type: 'value', show: false, splitLine: { show: false } },
        yAxis: { type: 'category', data: yData, axisLabel: { color: '#8aaafb', fontSize: 10 }, axisLine: { show: false }, axisTick: { show: false } },
        series: [
            { 
                name: '占监控企业总数比例', type: 'bar', stack: 'total', barWidth: 8, 
                data: [32, 28, 60, 36, 45, 20, 25, 40, 35, 66, 88, 20], 
                itemStyle: { color: '#00f6ff', borderRadius: [2, 0, 0, 2] },
                label: { show: false }
            },
            { 
                name: '占监控点总数比例', type: 'bar', stack: 'total', barWidth: 8,
                data: [67, 72, 40, 64, 55, 80, 75, 60, 65, 34, 12, 80], 
                itemStyle: { color: '#f56c6c', borderRadius: [0, 2, 2, 0] },
                label: { show: true, position: 'right', formatter: '{c}%', color: '#fff' }
            }
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

    .stats-row {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        .stat-bubble {
            flex: 1;
            display: flex;
            align-items: center;
            background: transparent;
            padding: 5px;
            
            .icon {
                width: 48px; height: 48px;
                background: rgba(0,246,255,0.1);
                border: 1px solid rgba(0,246,255,0.3);
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 24px; color: #00f6ff;
                margin-right: 12px;
                box-shadow: 0 0 10px rgba(0,246,255,0.2);
            }
            .content {
                .label { font-size: 12px; color: #8aaafb; margin-bottom: 5px; transform: scale(0.9); transform-origin: left; }
                .val-row {
                    display: flex; align-items: baseline;
                    .prefix { color: #fff; font-size: 13px; margin-right: 5px; }
                    .val { 
                        font-size: 24px; font-weight: bold; 
                        &.text-cyan { color: #00f6ff; }
                        &.text-red { color: #f56c6c; }
                        .unit { font-size: 12px; color: #fff; font-weight: normal; margin-left: 2px; }
                    }
                }
            }
        }
    }

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
                
                .red { background: #f56c6c; }
                .blue { background: #00f6ff; }
                .purple { background: #a540ff; }
                .pink { background: #f56c6c; }
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

        .gauge-grid {
            display: flex;
            justify-content: space-between;
            background: rgba(13, 30, 68, 0.2);
            border: 1px solid rgba(13, 30, 68, 0.5);
            border-radius: 4px;
            padding: 10px;
            .gauge-item { height: 120px; width: 25%; }
        }
    }
}
</style>
