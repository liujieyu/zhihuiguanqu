<template>
  <div class="baseBoxContent">

    <!-- 表格, 用于展示数据 -->
    <div>
      <el-table
        size="small"
        @cell-click="cellClick"
        :data="pageFilter()"
        border
        style="width: 100%"
        :height="table.height"
        v-loading="table.loading"
        empty-text="暂无站点数据"
        @sort-change="sort_change"
      >
        <el-table-column
          v-for="item in table.columns"
          :prop="item.key"
          :align="item.align"
          :label="item.title"
          :width="item.width"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- 自定义 -->
        <el-table-column align="center" label="电压(V)" prop="vol" :width="90" sortable="custom">
          <template slot-scope="scope">
            <div>
              <span
                :style="{
              color: scope.row.vol < 12 || scope.row.vol > 16 ? 'red' : 'black'
            }"
              >{{ scope.row.vol}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="通讯状态" prop="CS" :width="95" sortable="custom">
          <template slot-scope="scope">
            <div>
              <span
                :style="{
              color: scope.row.CS == '异常'? 'red' : 'black'
            }"
              >{{ scope.row.CS }}</span>
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
    <!-- <div ref="tip" style="display:none;"> -->
    <!-- 闸阀状态 -->
    <!-- <TipsYUNXINGGONGKUANG @chart="chart" :info="tip.info_tip" v-if="tip.show_tip"></TipsYUNXINGGONGKUANG> -->
    <!-- </div> -->
  </div>
</template>



<script>
import TipsYUNXINGGONGKUANG from "@/components/BaseBox/Tips/Tips-yunxinggongkuang.vue";
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
export default {
  props: {
    featrue: {
      type: Object
    }
  },
  components: {
    TipsYUNXINGGONGKUANG
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
        // 搜索框
        search_str: "",
        // 地址选择列表
        adressList: [],
        // 渠道选择列表
        qudaoList: [],
        social: ["site"],
        // 状态选择列表
        statusList: [
          {
            value: 1,
            label: "正常"
          },
          {
            value: 2,
            label: "异常"
          },
          {
            value: 3,
            label: "电压异常"
          },
          {
            value: 4,
            label: "通讯异常"
          }
        ],
        // 多选框列表
        checkBoxList: [
          {
            value: "site",
            size: "small",
            span: 5,
            // iconType: "logo-facebook",
            title: "站点"
          },
          {
            value: "STNM",
            size: "small",
            span: 6,
            // iconType: "logo-facebook",
            title: "站名"
          },
          {
            value: "vol",
            size: "small",
            span: 6,
            // iconType: "logo-facebook",
            title: "电压值"
          },
          {
            value: "CS",
            size: "small",
            span: 7,
            // iconType: "logo-facebook",
            title: "通讯状态"
          }
        ],
        // 地址选择
        model_adress: "",
        // 渠道
        model_qudao: "",
        // 状态
        model_status: ""
      },
      // 表格数据
      table: {
        // 表头设置
        columns: [
          {
            title: "",
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
            width: 120,
            align: "center",
            sortable: "custom"
          },
          // {
          //   title: "电压",
          //   key: "vol",
          //   width: 100,
          //   align: "center",
          //   sortable: "custom"
          // }
        ],
        // 表体内容
        Rows: [],
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
      evt.graphic.attributes.rowinfo = item;
      evt.graphic.attributes.rowinfo.tableType = {
        clicktype:"yxgk",
      };
      var v = new Object();
      v.itype = "siteinfo";

        console.log(item);

        // 设置中心缩放
      this.setMapCenterandZoom(item.LGTD, item.LTTD);
      // 取消所有站点的闪烁
      this.$App.GraphicsLayer_Selection_clear();
      // 对应站点闪烁
      this.$App.add_Graphic_To_GraphicsLayer_Selection(item);
      // 展示抽屉详情框
      this.$App.showDrawer(evt, v);
    },

    // 制图
    createChart_zhuangtaishuju(id, tableType, data) {
      var ele = document.getElementById(id);

      if (data.length > 0) {
        var echartData = this.$App.transform_YXGK_data_into_ehart_data(
          data,
          tableType
        ); // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象

        var myChart = this.$echarts.init(ele);

        myChart.setOption({
          title: {
            text: echartData.chartName
          },
          grid: {
            x: '20%'
          },
          tooltip: {
            trigger: "axis"
          },
          // legend: {
          //   data: [echartData.y1.name],
          //   y: "bottom"
          // },
          calculable: true,
          animation: false,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: echartData.x.list,
              axisLabel: {
                rotate: 15,
              },
            }
          ],
          yAxis: [
            {
              name: `${echartData.y1.name} V`,
              type: "value",
              axisLabel: {
                formatter: "{value} "
              },
              max: echartData.y1.max,
              min: echartData.y1.min
            }
          ],
            axis: {
                axisLabel: {
                    interval: 'auto'
                },
                axisTick: {
                    interval: 'auto'
                }
            },
          series: [
            {
              name: echartData.y1.name,
              type: "line",
              data: echartData.y1.list
            }
          ]
        });
      } else {
        ele.style.display = "flex";
        ele.style.alignItems = "center";
        ele.style.justifyContent = "center";
        ele.innerHTML = "暂无今天数据";
      }
    },


    // 设置中心和缩放 (接受经纬度，和缩放比例)
    setMapCenterandZoom(LGTD, LTTD, Zoom) {
      //koen 20190929
      //暂时不允许点击，防止缩到全球地图的bug
      //this.map.centerAndZoom([Number(LGTD), Number(LTTD)], Zoom || 1);
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
        val_clone.TM = this.dateFilter(val_clone.TM);
        // 测报电压过滤
        val_clone.vol = this.$FilterData.Float_Filter(val_clone.vol,1 );
        // 测报通讯状态过滤
        // val_clone.CS = this.CS_Filter(val_clone.CS);
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
      this.loadTableData(this.getTableDataFormParent());
      // 过滤table数据
      this.filterTableData();

      // 获取行政区划数据,然后设置地址选择框选项
      this.getTableData_WRP_AD_B(data => {
        this.form.adressList = data;
      });
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
            if(key=="STNM"){
                newList = this.table.Rows_filter.sort((a, b) => {
                    var vnum=0;
                    var sign=b[key]<a[key];
                    if(sign==true){
                        vnum=1;
                    }else{
                    vnum=-1;
                    }
                    return vnum;
                });
                }else if (key == "TM") {
              newList = this.table.Rows_filter.sort((a, b) => {
                var aTime = new Date(`20${a.TM}`).getTime(),
                  bTime = new Date(`20${b.TM}`).getTime();
                aTime = isNaN(aTime) ? 0 : aTime;
                bTime = isNaN(bTime) ? 0 : bTime;
                return bTime - aTime;
              });
            } else if (key == "CS") {
              newList = this.table.Rows_filter.sort((a, b) => {
                var a_cs = a["CS"] == "正常" ? 1 : 0,
                  b_cs = b["CS"] == "正常" ? 1 : 0;
                return b_cs - a_cs;
              });
            } else {
              newList = this.table.Rows_filter.sort((a, b) => {
                return Number(b[key]) - Number(a[key]);
              });
            }
            break;

          case "ascending":
            if(key=="STNM"){
              newList = this.table.Rows_filter.sort((a, b) => {
                  var vnum=0;
                  var sign=a[key]<b[key];
                  if(sign==true){
                      vnum=1;
                  }else{
                      vnum=-1;
                  }
                  return vnum;
              });
              }else if (key == "TM") {
              newList = this.table.Rows_filter.sort((a, b) => {
                var aTime = new Date(`20${a.TM}`).getTime(),
                  bTime = new Date(`20${b.TM}`).getTime();
                aTime = isNaN(aTime) ? 0 : aTime;
                bTime = isNaN(bTime) ? 0 : bTime;
                return aTime - bTime;
              });
            } else if (key == "CS") {
              newList = this.table.Rows_filter.sort((a, b) => {
                var a_cs = a["CS"] == "正常" ? 1 : 0,
                  b_cs = b["CS"] == "正常" ? 1 : 0;
                return a_cs - b_cs;
              });
            } else {
              newList = this.table.Rows_filter.sort((a, b) => {
                return Number(a[key]) - Number(b[key]);
              });
            }
        }

        this.table.Rows_filter = newList.map((val, index) => {                   
                            // 序号
                            val.index = index + 1;
                            return val;                 
                    });
      }
      this.$TableMethods.refreshCurrentChange(this.table, 1);
    }
  },
  created() {
    // 初始化baseBox
    this.baseBox_init();
    // this.baseBox_Interval = setInterval(() => {
    //   this.baseBox_init();
    // },1000 * 60 * 5)
  },
  // destroyed() {
  //   clearInterval(this.baseBox_Interval)
  // }
};
</script>


<style lang="less" scope>
/* 引入baseBox公共样式 */
@import "../../assets/commonLess/baseBox";
</style>
