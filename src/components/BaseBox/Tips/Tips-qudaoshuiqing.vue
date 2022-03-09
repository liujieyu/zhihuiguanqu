<template>
  <div id="myChart" :style="{width: '340px', height: '250px', margin: 'auto'}"></div>
</template>



<script>
import BaseBox_qudaoshuiqing from "@/components/BaseBox/BaseBox-qudaoshuiqing"; // 过滤方法
import FilterMethods from "@/assets/commonJS/FilterMethods"; // 过滤方法
import GetDataMethods from "@/assets/commonJS/GetDataMethods"; // 获取数据方法
// import App from "@/assets/commonJS/GetDataMethods"; // 获取数据方法
export default {
  props: {
    info: {}
  },
  data() {
    return {
      historyTableData: []
    };
  },
  mixins: [GetDataMethods, FilterMethods],
  methods: {
    chart(data) {
      if (data.length > 0) {
        var TM_List = new Array(); // 时间
        var Q_List = new Array(); // 流量列表
        var Z_List = new Array(); // 水位列表

        data = data.slice(0, 3);
        TM_List = data.map((val, index) => {
          return this.dateFilter(val.TM);
        });

        Q_List = data.map((val, index) => {
          return val.Q;
        });

        Z_List = data.map((val, index) => {
          return val.Z;
        });
        console.log("TM_List", TM_List);
        console.log("Q_List", Q_List);
        console.log("Z_List", Z_List);
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
            data: ["流量", "水位"],
            y: "bottom"
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
          animation: false,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: TM_List
            }
          ],
          yAxis: [
            {
              name: "流量 m³/s",
              type: "value",
              axisLabel: {
                formatter: "{value} "
              }
            },
            {
              name: "水位 m",
              type: "value",
              axisLabel: {
                formatter: "{value} "
              }
            }
          ],
          series: [
            {
              name: "流量",
              type: "line",
              data: Q_List,
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
              name: "水位",
              type: "line",
              data: Z_List,
              yAxisIndex: 1,
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            }
          ]
        });
      } else {
        var myChart = document.getElementById("myChart");
        myChart.innerHTML = "暂无数据";
      }
    },
    // getHistoryTableData(callback) {
    //   var body = new Object();
    //   body.STCD = this.info.STCD;

    //   body.TM = `gt,${this.getTodayDate()}`;
    //   this.axios
    //     .get(`/guanqu/admin/ST_Canal_R`, {
    //       // params: body
    //     })
    //     .then(res => {
    //       var data = res.data.rows;
    //       if (typeof callback == "function") {
    //         callback(data);
    //       }
    //     });
    // }
  },
  created() {
    // this.getHistoryTableData(data => {
    //   this.historyTableData = data;
    //   // this.$emit("chart", {
    //   //   chart: this.chart
    //   // });
    //   BaseBox_qudaoshuiqing.getChart = this.chart
    // });
    this.$emit("chart", {
      chart: this.chart
    });
  }
};
</script>


<style scoped>
</style>
