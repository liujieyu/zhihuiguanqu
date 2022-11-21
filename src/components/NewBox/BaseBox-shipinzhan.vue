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
        <el-table-column fixed type="index" label=" " width="40" align="center"></el-table-column>
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
    <div ref="tip" style="display:none;">
      <!-- 视频站 -->
      <TipsSHIPINZHAN :info="tip.info_tip" v-if="tip.show_tip"></TipsSHIPINZHAN>
    </div>
  </div>
</template>



<script>
import TipsSHIPINZHAN from "@/components/BaseBox/Tips/Tips-shipinzhan.vue";
import FilterMethods from "@/assets/commonJS/FilterMethods"; // 过滤方法
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
export default {
  props: {
    featrue: {
      type: Object
    },
    search_FeatrueLayer: {
      type: Function
    }
  },
  components: {
    TipsSHIPINZHAN
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
      // 文字标注图层
      TextGraphicsLayers: [],
      // 提示 展示
      tip: {
        info_tip: null,
        show_tip: false
      },
      // 表单数据
      form: {
        search_str: "",
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
          }
        ],
        model_adress: [],
        model_qudao: []
      },
      // 表格数据
      table: {
        // 表头设置
        columns: [
          {
            title: "站名",
            key: "STNM",
            width: 140,
            fixed: "left",
            sortable: "custom",
            align: "center",
          },
          {
            title: "地址",
            key: "adnm",
            sortable: "custom",
            align: "center"
          }
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
  mixins: [FilterMethods,GetDataMethods],
  methods: {
    // 表格每一行点击事件
    cellClick(item) {
      var evt = new Object();
      evt.graphic = new Object();
      evt.graphic.attributes = item;
      evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(item));
      var v = new Object();
      v.itype = "shipin";

      // 设置中心缩放
      this.setMapCenterandZoom(item.LGTD, item.LTTD);
      // 取消所有站点的闪烁
      this.$App.GraphicsLayer_Selection_clear();
      // 对应站点闪烁
      this.$App.add_Graphic_To_GraphicsLayer_Selection(item);
      // 展示抽屉详情框
      this.$App.showDrawer(evt, v);
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
    // 查询
    search() {
      var body = new Object();
      // 如果输入框有内容，添加站名过滤字段
      if (this.form.search_str.length > 0) {
        body['STNM'] = `${this.form.search_str}`
      }
      // 如果地址选择框有内容，添加行政区划过滤字段
      if (this.form.model_adress && this.form.model_adress.length != 0) {
        body["ADDVCD"] = `${this.$App.ADDVCD_Array_Filter(this.form.model_adress)}`;
      }
      // 如果渠道选择框有内容，添加渠道过滤字段
      if (this.form.model_qudao && this.form.model_qudao.length != 0) {
        body["Canal_Code"] = `${this.$App.Canal_Code_Array_Filter(this.form.model_qudao)}`;;
      }

      this.tableLoading(); // 表格加载中
      this.search_FeatrueLayer(
        "shipin",
        body,
        this.featrue, (newFeatureLayerOBJ) => {
          this.table.currentPage = 1;
          this.baseBox_init();
          this.cancelTableLoading(); //取消表格加载
          this.hideTips();
        }
      );
    },
    // 给图层对象添加方法
    addEventToJsonFlayer(JsonFlayer) {
      //当鼠标悬停在元素上
      JsonFlayer.on("mouse-over", evt => {
        var attributes = evt.graphic.attributes;
        attributes.eventType = "mouse-over";
        this.showTips(attributes);
        // 给地图对象添加方法
        this.addEventToMap();
      });

      // 当鼠标离开元素
      JsonFlayer.on("mouse-out", evt => {
        setTimeout(() => {
          this.hideTips(); // 隐藏悬浮框
        }, 100);
      });
    },
    // 给地图对象添加方法
    addEventToMap() {
      this.map.on("click", () => {
        // 隐藏提示
        this.hideTips();
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
      // 截取数组
      var newList = this.table.Rows_filter.slice(
        (_currentPage - 1) * _pageSizes,
        _currentPage * _pageSizes
      );

      return newList;
    },
    // 设置中心和缩放 (接受经纬度，和缩放比例)
    setMapCenterandZoom(LGTD, LTTD, Zoom) {
      //koen 20190929
      //暂时不允许点击，防止缩到全球地图的bug
      //this.map.centerAndZoom([Number(LGTD), Number(LTTD)], Zoom || 1);
    },
    // 过滤table数据
    filterTableData() {
      this.table.Rows_filter = this.table.Rows.map(val => {
        var val_clone = JSON.parse(JSON.stringify(val));
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
    // 往featrue对象里添加操作TextGraphicsLayer的对象，里面有移除所有TextGraphicsLayer的方法，和根据多选框添加文字标注图层的方法
    addTextGraphicsLayerControllerToFeatrue() {
      this.featrue.TextGraphicsLayerController = new Object();
      this.featrue.TextGraphicsLayerController.removeAllTextGraphicsLayer = this.removeAllTextGraphicsLayer;
      this.featrue.TextGraphicsLayerController.addTextGraphicsLayerByCheckGroup = this.addTextGraphicsLayerByCheckGroup;
    },
    // 多选框标记勾选触发事件
    checkboxGroup_onChange(onCheck_Array) {
      this.removeAllTextGraphicsLayer(); // 清除所有文本标注图层
      this.addTextGraphicsLayerByCheckGroup(); // 根据多选框添加文字标注图层
    },
    // 添加文字标注图层
    addTextGraphicsLayer(options) {
      var textGraphicsLayer = new esri.layers.GraphicsLayer(); // 新增一个标注文本图层
      textGraphicsLayer.textType = options.textType;
      this.featrue.map.addLayer(textGraphicsLayer); // 给地图添加新增的标注文本图层
      var Rows = this.featrue.Rows;
      //创建textsymbol文本标注
      if (Rows.length > 0) {
        //动态读取json数据源结果集
        for (var i = 0; i < Rows.length; i++) {
          var Row = Rows[i];
          var point = new esri.geometry.Point(
            Row.geometry.x,
            Row.geometry.y,
            this.featrue.map.spatialReference
          );
          //定义文本symbol
          var textsymbol = new esri.symbol.TextSymbol(
            Row.rowinfo[options.textType]
          ) //动态设置文本值
            .setColor(new dojo.Color(options.color || [55, 55, 55])) //setColor设置文本颜色
            .setFont(
              new esri.symbol.Font(options.fontSize || "10pt") //setFont设置文本大小
                .setWeight(esri.symbol.Font.WEIGHT_BOLD)
            ) //setWeight设置文本粗体
            .setOffset(options.offset_x || 0, options.offset_y || -25); //设置偏移方向
          var graphic = new esri.Graphic(point, textsymbol);
          textGraphicsLayer.add(graphic);
        }
      }
      this.TextGraphicsLayers.push(textGraphicsLayer);
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
                var vnum=0;
                    var sign=b[key]<a[key];
                    if(sign==true){
                        vnum=1;
                    }else{
                    vnum=-1;
                    }
                    return vnum;
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
                var vnum=0;
                  var sign=a[key]<b[key];
                  if(sign==true){
                      vnum=1;
                  }else{
                      vnum=-1;
                  }
                  return vnum;
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
    //this.search();
    // this.baseBox_Interval = setInterval(() => {
    //   this.baseBox_init();
    // },1000 * 60 * 5)
  },
  // destroyed() {
  //   clearInterval(this.baseBox_Interval)
  // }
};
</script>


<style lang="less" scoped>
/* 引入baseBox公共样式 */
@import "../../assets/commonLess/baseBox";
</style>
