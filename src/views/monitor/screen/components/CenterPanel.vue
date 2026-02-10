<template>
  <div class="panel-container">
      <!-- Timeline mock -->
      <div class="timeline-bar">
          <div class="year-steps">
              <span class="step">2016</span>
              <span class="step">2017</span>
              <span class="step active">2018</span>
              <span class="step">2019</span>
              <span class="step">2020</span>
          </div>
          <div class="timeline-line"></div>
      </div>

      <!-- Top Stats -->
      <div class="center-stats">
          <div class="stat-group">
               <div class="label">在线监控企业数量</div>
               <div class="num text-white">411 <span class="unit">家</span></div>
          </div>
          <div class="stat-group">
               <div class="label">重点监控企业数量</div>
               <div class="num text-white">201 <span class="unit">家</span></div>
          </div>
          <div class="stat-group">
               <div class="label">废气企业数量</div>
               <div class="num text-white">265 <span class="unit">家</span></div>
          </div>
          <div class="stat-group">
               <div class="label">废水企业数量</div>
               <div class="num text-white">155 <span class="unit">家</span></div>
          </div>
      </div>

      <!-- Map Area -->
      <div class="map-area">
          <div ref="mapChartRef" class="map-chart"></div>
      </div>

      <!-- Bottom Split Section -->
      <div class="bottom-split">
          <!-- Left: Alerts -->
          <div class="chart-box">
              <div class="box-title">微信超标告警推送监察部门概况</div>
              <div class="alert-stats">
                 <div class="alert-row">
                     <div class="icon-box blue"><el-icon><Bell /></el-icon></div>
                     <div class="info">
                         <span class="l">微信告警推送总条数</span>
                         <span class="r">411 条</span>
                     </div>
                 </div>
                 <div class="alert-row">
                     <div class="icon-box purple"><el-icon><DataAnalysis /></el-icon></div>
                     <div class="info">
                         <span class="l">微信告警推送涉及企业数量</span>
                         <span class="r">355 家</span>
                     </div>
                 </div>
                 <div class="alert-row">
                     <div class="icon-box cyan"><el-icon><Position /></el-icon></div>
                     <div class="info">
                         <span class="l">微信告警推送涉及的监控点数量</span>
                         <span class="r">501 个</span>
                     </div>
                 </div>
              </div>
          </div>

          <!-- Right: Proportion Pie -->
          <div class="chart-box">
              <div class="box-title">微信超标告警推送污染物条数占比情况</div>
              <div ref="pieChartRef" class="chart-content"></div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Bell, DataAnalysis, Position } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import innerMongoliaJson from '@/assets/map/inner_mongolia.json';

const mapChartRef = ref();
const pieChartRef = ref();

onMounted(() => {
    initMapChart();
    initPieChart();
});

const initMapChart = () => {
    echarts.registerMap('innerMongolia', innerMongoliaJson as any);
    const chart = echarts.init(mapChartRef.value);
    
    const points = [
        {name: '呼和浩特市', value: [111.412408, 40.485296, 100]},
        {name: '包头市', value: [109.873215, 41.229497, 80]}, // Approx coords
        {name: '鄂尔多斯市', value: [108.790933, 39.467368, 120]}, // Adjusted coords for visual
        {name: '赤峰市', value: [118.675756, 42.607599, 60]},
        {name: '通辽市', value: [121.233527, 43.619022, 50]},
        {name: '呼伦贝尔市', value: [119.765812, 49.21209, 40]},
        {name: '巴彦淖尔市', value: [107.416568, 40.757398, 70]},
        {name: '乌兰察布市', value: [113.132585, 41.028628, 55]},
        {name: '兴安盟', value: [122.062061, 46.079237, 30]},
        {name: '锡林郭勒盟', value: [116.033621, 43.943187, 45]},
        {name: '阿拉善盟', value: [101.599923, 39.799753, 20]}, // Much further west
        {name: '乌海市', value: [106.825563, 39.673734, 90]},
    ];

    chart.setOption({
        tooltip: { trigger: 'item' },
        geo: {
            map: 'innerMongolia',
            roam: true,
            zoom: 1.2,
            itemStyle: {
                areaColor: '#0d2d6d',
                borderColor: '#2ab8ff',
                borderWidth: 1,
                shadowColor: 'rgba(0, 247, 255, 0.5)',
                shadowBlur: 10
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#174ea6'
                },
                label: { color: '#fff' }
            },
            label: { show: false } // Hide default labels to keep it clean
        },
        series: [
           {
               type: 'effectScatter',
               coordinateSystem: 'geo',
               data: points.map(item => ({name: item.name, value: [item.value[0], item.value[1], item.value[2]]})),
               symbolSize: function (val: any) { return val[2] / 6; },
               rippleEffect: { brushType: 'stroke', scale: 3 },
               label: { show: true, formatter: '{b}', position: 'right', color: '#fff', fontSize: 10 },
               itemStyle: { color: '#f56c6c', shadowBlur: 10, shadowColor: '#f56c6c' },
               zlevel: 1
           },
           // Simulate the blue bars on map
           {
               type: 'custom',
               coordinateSystem: 'geo',
               renderItem: (_params: any, api: any) => {
                   const coords = api.coord([api.value(0), api.value(1)]);
                   const value = api.value(2);
                   return {
                       type: 'rect',
                       shape: { x: coords[0] - 2, y: coords[1] - value/2, width: 4, height: value/2 },
                       style: { fill: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0, color:'#00f6ff'}, {offset:1, color:'rgba(0,246,255,0)'}]) }
                   };
               },
               data: points.map(item => ({name: item.name, value: [item.value[0], item.value[1], item.value[2]]})),
               zlevel: 2
           }
        ]
    });
};

const initPieChart = () => {
    const chart = echarts.init(pieChartRef.value);
    chart.setOption({
        color: ['#00f6ff', '#a540ff', '#f56c6c', '#e6a23c'],
        legend: { bottom: '0', textStyle: { color: '#8aaafb', fontSize: 10 }, itemWidth: 8, itemHeight: 8 },
        series: [
            {
                name: '污染物占比',
                type: 'pie',
                radius: ['45%', '65%'],
                center: ['50%', '45%'],
                avoidLabelOverlap: false,
                itemStyle: { borderRadius: 5, borderColor: '#030b20', borderWidth: 2 },
                label: { show: true, position: 'inside', formatter: '{d}%', color: '#fff', fontSize: 10 },
                labelLine: { show: false },
                data: [
                    { value: 1048, name: '二氧化硫' },
                    { value: 735, name: '氮氧化物' },
                    { value: 580, name: '烟尘' },
                    { value: 484, name: '化学需氧量' }
                ]
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
    position: relative;
    
    .timeline-bar {
        position: absolute;
        top: 0; left: 20px; right: 20px;
        height: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
        
        .year-steps {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 10px;
            .step { 
                font-size: 12px; color: #8aaafb; position: relative; 
                &.active { color: #fff; text-shadow: 0 0 5px #00f6ff; font-weight: bold; }
                &::after {
                    content: ''; position: absolute; bottom: -8px; left: 50%; width: 4px; height: 4px; border-radius: 50%; background: currentColor; transform: translateX(-50%);
                }
            }
        }
        .timeline-line {
            width: 100%; height: 2px; background: rgba(255,255,255,0.1); margin-top: 5px;
        }
    }

    .center-stats {
        display: flex;
        justify-content: space-around;
        padding: 40px 0 20px 0;
        
        .stat-group {
            text-align: center;
            .label { font-size: 12px; color: #8aaafb; margin-bottom: 5px; }
            .num { 
                font-family: 'Impact', sans-serif; 
                font-size: 48px; 
                line-height: 1;
                &.text-white { color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.5); }
                .unit { font-size: 14px; margin-left: 5px; color: #8aaafb; font-family: 'Microsoft YaHei'; }
            }
        }
    }

    .map-area {
        flex: 1;
        position: relative;
        background: url('https://lib.baomitu.com/echarts/4.9.0-rc.1/map/img/world.jpg'); 
        background-size: cover;
        // Tech grid overlay
        &::before {
            content: ''; position: absolute; top:0; left:0; width:100%; height:100%;
            background: 
                linear-gradient(rgba(0,246,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,246,255,0.1) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
        }

        .map-chart {
            width: 100%;
            height: 100%;
        }
    }

    .bottom-split {
        height: 200px;
        display: flex;
        gap: 15px;
        margin-top: 15px;
        
        .chart-box {
            flex: 1;
            background: rgba(13, 30, 68, 0.4);
            // Removed heavy borders, styling handles borders in children
            position: relative;
            display: flex;
            flex-direction: column;

            .box-title { 
                color: #fff; font-size: 13px; margin-bottom: 10px; 
                display: flex; align-items: center;
                &::before { content: ''; width: 4px; height: 4px; background: #f56c6c; border-radius: 50%; margin-right: 6px; }
            }

            .alert-stats {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .alert-row {
                    display: flex;
                    align-items: center;
                    background: rgba(0, 0, 0, 0.2);
                    padding: 8px;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 4px;
                    
                    .icon-box {
                         width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-right: 10px; border-radius: 4px;
                         &.blue { background: rgba(0,246,255,0.2); color: #00f6ff; }
                         &.purple { background: rgba(165,64,255,0.2); color: #a540ff; }
                         &.cyan { background: rgba(0,255,170,0.2); color: #00ffaa; }
                    }
                    
                    .info {
                        flex: 1;
                        display: flex; justify-content: space-between; align-items: center;
                        .l { font-size: 12px; color: #8aaafb; }
                        .r { font-size: 16px; color: #fff; font-weight: bold; }
                    }
                }
            }

            .chart-content {
                flex: 1;
                width: 100%;
            }
        }
    }
}
</style>
