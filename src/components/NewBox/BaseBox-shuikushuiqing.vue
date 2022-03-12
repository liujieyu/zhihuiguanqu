<template>
  <div class="baseBoxContent">
    <!-- 表格, 用于展示数据 -->
    <div>
      <el-table
        @cell-click="cellClick"
        :data="pageFilter()"
        border
        style="width: 100%"
        size="small"
        :height="table.height"
        v-loading="table.loading"
        empty-text="暂无站点数据"
        @sort-change="sort_change"
      >
        <el-table-column
          v-for="(item,index) in table.columns"
          :prop="item.key"
          :align="item.align"
          :label="item.title"
          :width="item.width"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column align="center" label="库容(万m³)" :width="80">
          <template slot-scope="scope">
            {{ scope.row.w }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="水位(m)" :width="80">
          <template slot-scope="scope">
            <div>
              <span
                :style="{
              color: scope.row.jxx > 0?'red' : 'black',
            }"
              >{{ scope.row.RZ }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="水面面积(㎡)" :width="90">
          <template slot-scope="scope">
            {{ scope.row.smj }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="距汛限(m)" :width="80">
          <template slot-scope="scope">
              {{scope.row.jxx}}
          </template>
        </el-table-column>

        <!-- 自定义 -->
        <el-table-column align="center" label="水势" :width="60">
          <template slot-scope="scope">
            <div>
              <strong
                :style="{
              color: scope.row.RWPTN.status == 4? 'blue' : scope.row.RWPTN.status == 5?'red' : 'black',
              fontSize: scope.row.RWPTN.status == 6?'12px' : '17px'
            }"
              >{{ scope.row.RWPTN.symbol }}</strong>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分割线 -->
      <!-- <Divider/> -->
      <div class="divider"></div>
      <!-- 分页器 -->
      <el-pagination
        background
        :page-size="table.pageSizes"
        layout="total, prev, pager, next, jumper, sizes"
        :page-sizes="[20, 50, 100, 200]"
        :total="table.Rows.length"
        :pager-count="5"
        :current-page="table.currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        class="pageController"
        small
      ></el-pagination>
    </div>
    <!-- 提示框 -->
    <div ref="tip" style="display:none;">
      <!-- 渠道水情 -->
      <TipsQUDAO @chart="chart" :info="tip.info_tip" v-if="tip.show_tip"></TipsQUDAO>
    </div>
  </div>
</template>



<script>
import TipsQUDAO from "@/components/BaseBox/Tips/Tips-qudaoshuiqing.vue";
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import { setTimeout } from "timers";

export default {
  props: {
    featrue: {
      type: Object
    }
  },
  components: {
    TipsQUDAO
  },
  data() {
    return {
      // 折叠面板对象
      collapse: {
        activeName: "",
        list: []
      },
      // 地图对象
      map: null,
      // 该图层对象
      JsonFlayer: null,
      // 提示 展示
      tip: {
        info_tip: null,
        show_tip: false
      },
      // 表单数据
      form: {
        YCJXZ: "0.5",
        search_str: "",
        adressList: [],
        qudaoList: [],
        dengjiList: [],
        guishuList: [
          {
            value: "danwei1",
            label: "单位一"
          },
          {
            value: "danwei2",
            label: "单位二"
          }
        ],
        social: ["site"],
        checkBoxList: [
          {
            value: "site",
            size: "small",
            // iconType: "logo-facebook",
            title: "站点"
          },
          {
            value: "STNM",
            size: "small",
            // iconType: "logo-facebook",
            title: "站名"
          },
          {
            value: "RZ",
            size: "small",
            // iconType: "logo-facebook",
            title: "水位"
          }
        ],
        model_adress: null,
        model_qudao: null,
        model_guishu: ["1", "2", "3", "4", "5", "6", "7", "8"],
        model_dengji: ["1", "2", "3", "4", "5"]
      },
      // 表格数据
      table: {
        // 表头设置
        columns: [
          {
            title: " ",
            key: "index",
            width: 45,
            align: "center",
            fixed: "left"
          },
          {
            title: "站名",
            key: "STNM",
            width: 110,
            align: "center",
            fixed: "left",
            sortable: "custom"
          },
          {
            title: "时间",
            key: "tm",
            width: 110,
            align: "center",
            sortable: "custom"
          },
        ],
        // 表体内容
        Rows: [],
        // 过滤后的表体内容
        Rows_filter: [],
        // 表格是否加载中
        loading: false,
        // 当前页
        currentPage: 1,
        // 每页显示数量
        pageSizes: 20,
        // 表体高度
        height: 300
      }
    };
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods, GetDataMethods],
  methods: {
    // 表格每一行点击事件
    cellClick(item) {
      var evt = new Object();
      evt.graphic = new Object();
      evt.graphic.attributes = item;
      evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(item));
      evt.graphic.attributes.rowinfo.tableType = {
        sksq: "historyTable",
        clicktype:"sksq",
      };
      var v = new Object();
      v.itype = "siteinfo";

      // 设置中心缩放
      this.setMapCenterandZoom(item.LGTD, item.LTTD);
      // 取消所有站点的闪烁
      this.$App.GraphicsLayer_Selection_clear();
      // 对应站点闪烁
      this.$App.add_Graphic_To_GraphicsLayer_Selection(item);
      // 展示抽屉详情框
      this.$App.showDrawer(evt, v);
    },
    setWPTN_HTML(id, WPTN) {
      var div = document.getElementById(id);
      var html;
      switch (WPTN) {
        case "4":
          html = `<span style="color:blue">↓</span>`;
          break;

        case "5":
          html = `<span style="color:red">↑</span>`;
          break;

        case "6":
          html = `<span style="color:black">一</span>`;
          break;
        default:
          html = `<span style="color:black">一</span>`;
          break;
      }
      if (div) {
        div.innerHTML = html;
      }
    },
    // 设置中心和缩放 (接受经纬度，和缩放比例)
    setMapCenterandZoom(LGTD, LTTD, Zoom) {
      //koen 20190929
      //暂时不允许点击，防止缩到全球地图的bug
      //this.map.centerAndZoom([Number(LGTD), Number(LTTD)], Zoom || 1);
    },
    // 制图
    createChart(id, data) {
      if (data.length > 0) {
        // data = data.slice(0, 3);

        console.log(data.TM);
        var echartData = this.$App.transform_SKSQ_data_into_ehart_data(
          data,
          "historyTable",
          true
        ); // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象

        var x_List = echartData.x.list.map((val, index, array) => {
          // 时间过滤
          var time = val.split(" ");
          return time[1];
        });

        myChart = this.$echarts.init(document.getElementById(id));

        myChart.setOption({
          title: {
            text: "今日水情图"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: [echartData.y1.name, echartData.y2.name],
            y: "bottom"
          },

          // calculable: true,
          animation: false,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: x_List,
              axisTick: {
                interval: function(index, val) {
                  var listLength = echartData.x.list.length;
                  if (listLength >= 4) {
                    var tick = Math.round(listLength / 4);
                    // console.log((index + 1) % tick === 0);
                    // console.log('1575listLength',listLength);
                    // console.log('1576tick',tick);
                    if ((index + 1) % tick === 0) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return true;
                  }
                },
                length: 10
              },
              axisLabel: {
                interval: function(index, val) {
                  var listLength = echartData.x.list.length;
                  if (listLength >= 4) {
                    var tick = Math.round(listLength / 4);
                    // console.log('1575listLength',listLength);
                    // console.log('1576tick',tick);
                    let a = (index + 1) % tick;
                    if ((index + 1) % tick === 0) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return true;
                  }
                },
                rotate: 10,
                margin: 16
              }
            }
          ],
          yAxis: [
            {
              name: `${echartData.y1.name} m`,
              type: "value",
              axisLabel: {
                formatter: "{value} "
              },
              scale: true
              // max: echartData.y1.max,
              // min: echartData.y1.min
            },
            {
              name: `${echartData.y2.name}m`,
              type: "value",
              axisLabel: {
                formatter: "{value} "
              },
              scale: true
              // max: echartData.y2.max,
              // min: echartData.y2.min
            }
          ],
          series: [
            {
              name: echartData.y1.name,
              type: "line",
              data: echartData.y1.list
            },
            {
              name: echartData.y2.name,
              type: "line",
              data: echartData.y2.list,
              yAxisIndex: 1
            }
          ]
        });
      } else {
        var myChart = document.getElementById(id);
        myChart.style.display = "flex";
        myChart.style.alignItems = "center";
        myChart.style.justifyContent = "center";
        myChart.innerHTML = "暂无今天数据";
      }
    },
    // 表格加载
    tableLoading() {
      this.table.loading = true;
    },
    // 表格加载取消
    cancelTableLoading() {
      this.table.loading = false;
    },
    // 加载表格数据
    loadTableData(data) {
      // 加载站点数据
      this.table.Rows = data;
    },
    getDataFromEnd(url, callback) {
      // 获取表格数据 `/guanqu/gis/details?ID=${this.info.ID}`
      this.axios.get(url).then(res => {
        if (typeof callback == "function") {
          callback(res);
        }
      });
    },

    // 处理页码切换
    handleCurrentChange(index) {
      this.table.currentPage = index;
    },
    // 处理每页显示条数切换
    handleSizeChange(pageSizes) {
      this.table.pageSizes = pageSizes;
      this.table.currentPage = 1;
    },
    // 分页过滤
    pageFilter(currentPage, pageSizes) {
      var _currentPage = currentPage || this.table.currentPage;
      var _pageSizes = pageSizes || this.table.pageSizes;
      if (this.table.Rows_filter.length != 0) {
        // 截取数组
        var newList = this.table.Rows_filter.slice(
          (_currentPage - 1) * _pageSizes,
          _currentPage * _pageSizes
        );

        return newList;
      } else {
        return [];
      }
    },
    // 过滤table数据
    filterTableData() {
      this.table.Rows_filter = this.table.Rows.map((val, index) => {
        var val_clone = JSON.parse(JSON.stringify(val));
        // 序号
        val_clone.index = index + 1;
        // 时间过滤
        val_clone.tm = this.$FilterData.dateFilter(val_clone.tm);
        // 水位过滤
        val_clone.RZ = this.$FilterData.Float_Filter(val_clone.RZ);
        val_clone.jxx = this.Z_Filter(val_clone.jxx);
        // 水势过滤
        val_clone.RWPTN = this.WPTN_Filter(val_clone.RWPTN);
        return val_clone;
      });
    },
    // 选取一部分从父组件传来的数据作为表格的数据
    getTableDataFormParent() {
      var tableData = this.featrue.Rows.map(val => {
        return val.rowinfo;
      });

      return tableData;
    },
    // 获取图层对象,从父组件中
    getJsonFlayerFormParent() {
      this.JsonFlayer = this.featrue.LayerObject;
    },
    // 获取地图对象,从父组件中
    getMapFormParent() {
      this.map = this.featrue.map;
    },

    // 初始化baseBox
    baseBox_init() {
      this.table.currentPage = 1;
      // 获取地图对象,从父组件中
      this.getMapFormParent();
      // 获取图层对象,从父组件中
      this.getJsonFlayerFormParent();
      // 选取一部分从父组件传来的数据,将其加载为表格数据
      this.loadTableData(
        this.getTableDataFormParent()
      );
      // 过滤table数据
      this.filterTableData();
    },
    // 排序
    sort_change(item) {
      var order = item.order,
        key = item.prop;

      this.filterTableData();
      var newList;
      if (order) {
        switch (order) {
          case "descending":
            if (key != "TM") {
              newList = this.table.Rows_filter.sort((a, b) => {
                return Number(b[key]) - Number(a[key]);
              });
            } else {
              newList = this.table.Rows_filter.sort((a, b) => {
                var aTime = new Date(`20${a.TM}`).getTime(),
                  bTime = new Date(`20${b.TM}`).getTime();
                aTime = isNaN(aTime) ? 0 : aTime;
                bTime = isNaN(bTime) ? 0 : bTime;
                return bTime - aTime;
              });
            }
            break;

          case "ascending":
            if (key != "TM") {
              newList = this.table.Rows_filter.sort((a, b) => {
                return Number(a[key]) - Number(b[key]);
              });
            } else {
              newList = this.table.Rows_filter.sort((a, b) => {
                var aTime = new Date(`20${a.TM}`).getTime(),
                  bTime = new Date(`20${b.TM}`).getTime();
                aTime = isNaN(aTime) ? 0 : aTime;
                bTime = isNaN(bTime) ? 0 : bTime;
                return aTime - bTime;
              });
            }
        }
        this.table.Rows_filter = newList;
      }
      this.$TableMethods.refreshCurrentChange(this.table, 1);
    }
  },
  created() {
    // 初始化baseBox
    this.baseBox_init();
    this.baseBox_Interval = setInterval(() => {
      this.baseBox_init();
    }, 1000 * 60 * 5);
  },
  destroyed() {
    clearInterval(this.baseBox_Interval);
  }
};
</script>


<style lang="less" scope>
/* 引入baseBox公共样式 */
@import "../../assets/commonLess/baseBox";
</style>
