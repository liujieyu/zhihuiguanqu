<template>
  <div id="myChart" :style="{width: '340px', height: '250px', margin: 'auto'}"></div>
</template>



<script>
export default {
  props: {
    info: {}
  },
  methods: {
    chart() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        // title: {
        //   text: this.info.STNM,
        //   backgroundColor:"rgb(200,200,200)"
        // },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["电压", "电压范围"]
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ["line", "bar"] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        // calculable: true,
        animation:false,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["00:00-02:00", "02:00-04:00", "04:00-06:00", "06:00-08:00", "08:00-10:00"]
          }
        ],
        yAxis: [
          {
            name:'电压 v',
            type: "value",
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            name:'电压范围 ',
            type: "value",
            axisLabel: {
              formatter: "{value} "
            }
          },
        ],
        series: [
          {
            name: "电压",
            type: "line",
            data: [11, 11, 15, 13, 12],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" }
            //   ]
            // },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "电压范围",
            type: "line",
            data: [1, 4, 2, 5, 3],
            yAxisIndex:1,
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    }
  },
  created() {
    this.$emit("chart", {
      chart: this.chart
    });
  }
};
</script>


<style scoped>
</style>
