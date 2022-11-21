<template>
  <div class="baseBoxContent">
    <!-- 折叠面板 -->
    <Collapse active-key="1">
      <Panel key="1">
        查询
        <div slot="content">
          <div class="form">

          <!-- 选择器, 按钮 -->
          <Row class="select-group" :gutter="24">
           <Col span="24">
              <!-- 地址级联选择器 -->
                <el-cascader
                  clearable
                  filterable
                  size="mini"
                  :options="form.adressList"
                  v-model="form.model_adress"
                  placeholder="请选择地址"
                  @change="search"
                  change-on-select
                ></el-cascader>
           </Col>
           <!--  <Col span="11">
                <el-cascader
                  clearable
                  filterable
                  size="mini"
                  placeholder="请选择渠道"
                  :options="form.qudaoList"
                  v-model="form.model_qudao"
                  @change="search"
                  change-on-select
                ></el-cascader> 
            </Col>-->
            <!-- <Col span="6">
              查询按钮
            <Button type="info" size="small" @click="search">查询</Button>
            </Col> -->
          </Row>
          <!-- 分割线 -->
          <div class="divider"></div>
          <Row :gutter="16">
              <Col span="22">
                <Input  search enter-button @on-search="search" placeholder="请输入要搜索的站名" size="small" v-model.trim="form.search_str">
                  <!-- <Icon type="ios-search" slot="suffix"/> -->
                </Input>
              </Col>
              <!-- <Col span="5">
                查询按钮
                <Button type="info" size="small" @click="search">查询</Button>
              </Col> -->
            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>

          <!-- 多选框 -->
          <Row :gutter="16" type="flex" justify="center" align="middle">
              <Col span="4" style="text-align:center;">
                <span style="letter-spacing:5px">标记:</span>
              </Col>
              <Col span="20">
                <CheckboxGroup
                  @on-change="checkboxGroup_onChange"
                  v-model="form.social"
                  class="checkBox-group"
                  style="height:22px"
                >
                  <Checkbox
                    v-for="item in form.checkBoxList"
                    :label="item.value"
                    :size="item.size"
                    class="checkBoxItem"
                  >
                    <span>{{ item.title }}</span>
                  </Checkbox>
                </CheckboxGroup>
              </Col>
            </Row>
        </div>
        </div>
      </Panel>
    </Collapse>
    <!-- 表单, 用于搜索查询 -->

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
        adressList: [],
        qudaoList: [],
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
            key: "STLC",

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
    // 展示提示框
    showTips(item) {
      // 隐藏之前提示框
      this.hideTips();
      // <div class="pd_algin">
      //       <span class="tip_col_5">监测要素：</span>
      //        <span class="tip_col_7">
      //        </span>
      //   </div>

      //   <div class="pd_algin mg_tp">
      //       <span class="tip_col_5">关联站点：</span>
      //       <span class="tip_col_7">
      //       </span>
      //   </div>
      // this.tip.show_tip = true; // 获取提示框组件
      // this.tip.info_tip = item; // 传递数据给 提示框组件

      console.log('悬浮框');
      console.log(item);
      
      let imgSrc = '';
      if(item.rowinfo.picPath !== null){
        imgSrc = item.rowinfo.picPath.replace('r','')
      }
      console.log(`/guanqu/pic${imgSrc}`);
      let content = `<div>
        <div style="height: 20px"></div>
        <div class="video">
          <img src="http://222.240.238.58:7001/pic${imgSrc}"   width="210" height="160"/>
        </div>
      </div>`
      // 延时200毫秒
      setTimeout(() => {
        this.map.infoWindow.resize(250, 650); // 提示框大小
        this.map.infoWindow.setTitle(item.STNM); // 提示题目
        this.map.infoWindow.setContent(content); // 提示内容


                //获取坐标
                var x=Number(item.LGTD);
                var y=Number(item.LTTD);


                //如果basemap使用ArcGIS的就需要
                //转换坐标系
                x = (x / 180.0) * 20037508.34
                if (y > 85.05112) y = 85.05112;
                if (y < -85.05112) y = -85.05112;
                y = (Math.PI / 180.0) * y;
                var tmp = Math.PI / 4.0 + y / 2.0;
                y = 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;

                //位置点对象
                var zoompoint = {
                    //spatialReference: {wkid: 4326},
                    spatialReference: this.map.spatialReference,
                    x: x,
                    y: y
                };


        this.map.infoWindow.show(zoompoint); // 提示位置
        // 如果事件类型不是鼠标经过，则
        if (item.eventType != "mouse-over") {
          // 设置中心和缩放 (接受经纬度，和缩放比例)
          this.setMapCenterandZoom(Number(item.LGTD) + 0.1, item.LTTD);
        }

        // this.$GetData.Survey_History_TX(
        //   {
        //     _page: 1,
        //     _page_size: 20,
        //     _orderby: "TM desc",
        //     STCD: item.rowinfo.STCD
        //   },
        //   true,
        //   data => {
        //     var imgSrc = data.data[0].Save_Path;
        //
        //     var img = document.getElementById(`${item.rowinfo.STCD}_img`);
        //     img.src = imgSrc;
        //   }
        // );

      }, 200);
    },
    // 设置中心和缩放 (接受经纬度，和缩放比例)
    setMapCenterandZoom(LGTD, LTTD, Zoom) {
      //koen 20190929
      //暂时不允许点击，防止缩到全球地图的bug
      //this.map.centerAndZoom([Number(LGTD), Number(LTTD)], Zoom || 1);
    },
    // 隐藏提示
    hideTips() {
      this.map.infoWindow.hide();
      this.tip.show_tip = false; // 关闭提示框组件
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
    // 过滤table数据
    filterTableData() {
      this.table.Rows_filter = this.table.Rows.map(val => {
        var val_clone = JSON.parse(JSON.stringify(val));

        // // 时间过滤
        // val_clone.TM = this.dateFilter(val_clone.TM, 2);
        // // 水位过滤
        // val_clone.Z = this.Z_Filter(val_clone.Z);
        // // 流量过滤
        // val_clone.Q = this.Z_Filter(val_clone.Q);
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
      debugger;
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
            new esri.SpatialReference({ wkid: 4326 })
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
    // 根据多选框添加文字标注图层
    addTextGraphicsLayerByCheckGroup() {
      var textTypeList;
      var indexOfSocial = this.form.social.indexOf("site");
      // 如果多选框里存在 site站点类型
      if (indexOfSocial !== -1) {
        this.featrue.LayerObject.show();
        this.featrue.LayerObject_yujing.show();
        textTypeList = this.form.social.filter(val => {
          if (val != "site") {
            return true;
          }
        });
      } else {
        this.featrue.LayerObject.hide();
        this.featrue.LayerObject_yujing.hide();
        textTypeList = this.form.social;
      }

      textTypeList.forEach((textType, index) => {
        var textGraphicsLayer = new esri.layers.GraphicsLayer(); // 新增一个图形图层
        textGraphicsLayer.textType = textType;
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
            var value = Row.rowinfo[textType];
            // 过滤
            switch (textType) {
              case "VOL":
                var value = `${this.Z_Filter(Row.rowinfo[textType])}`;
                if (value == "") {
                  value = "";
                } else {
                  value += "V";
                }
                break;
              case "CS":
                var value = `${this.CS_Filter(Row.rowinfo[textType])}`;
                if (value == "") {
                  value = "";
                } else {
                  value += "";
                }
                break;
            }

            //定义文本symbol
            var textsymbol = new esri.symbol.TextSymbol(value) //动态设置文本值
              .setColor(new dojo.Color(value == "不正常"? [255, 0 , 0] : [55, 55, 55])) //setColor设置文本颜色
              .setFont(
                new esri.symbol.Font("10pt") //setFont设置文本大小
                  .setWeight(esri.symbol.Font.WEIGHT_BOLD)
              ) //setWeight设置文本粗体
              .setOffset(0, -(25 + index * 15)); //设置偏移方向
            var graphic = new esri.Graphic(point, textsymbol);
            textGraphicsLayer.add(graphic);
          }
        }
        this.TextGraphicsLayers.push(textGraphicsLayer);
      });
    },
    // 移除文字标注图层
    removeTextGraphicsLayer(textType) {
      // 找到对应的文字标注图层
      for (let i = 0; i < this.TextGraphicsLayers.length; i++) {
        var val = this.TextGraphicsLayers[i];
        if (val.textType == textType) {
          this.featrue.map.removeLayer(val); // 移除对应的文字标注图层
          // val.hide();
          this.TextGraphicsLayers.splice(i, 1); // 从文字标注图层数组里去除对应的文字图层对象
        }
      }
    },
    // 移除所有文字标注图层
    removeAllTextGraphicsLayer() {
      for (let i = 0; i < this.TextGraphicsLayers.length; i++) {
        var val = this.TextGraphicsLayers[i];
        this.featrue.map.removeLayer(val); // 移除对应的文字标注图层
      }
      this.TextGraphicsLayers = [];
    },
    // 初始化baseBox
    baseBox_init() {
      // 获取地图对象,从父组件中
      this.getMapFormParent();
      // 获取图层对象,从父组件中
      this.getJsonFlayerFormParent();
      // 选取一部分从父组件传来的数据,将其加载为表格数据
      this.loadTableData(this.getTableDataFormParent());
      // 过滤table数据
      this.filterTableData();
      // 给图层对象添加方法
      this.addEventToJsonFlayer(this.JsonFlayer);

      // 获取行政区划数据,然后设置地址选择框选项
      this.getTableData_WRP_AD_B((data) => {
        this.form.adressList = data;
        // data.map(val => {
        //   var newVal = new Object();
        //   newVal.value = val.AD_CD;
        //   newVal.label = val.AD_NM;
        //   return newVal;
        // })
      });

      // 获取输排水渠道数据,然后设置渠道选择框选项
      this.getTableData_WRP_IrrBTCanalSystem(data => {
        this.form.qudaoList = data;
        // data.map(val => {
        //   var newVal = new Object();
        //   newVal.value = val.Canal_Code;
        //   newVal.label = val.Canal_Name;
        //   return newVal;
        // });
      });
      // 多选框标记勾选触发事件
      // 1.清除所有文本标注图层
      // 2.根据多选框添加文字标注图层
      this.checkboxGroup_onChange();
      // 往featrue对象里添加操作TextGraphicsLayer的对象，里面有移除所有TextGraphicsLayer的方法，和根据多选框添加文字标注图层的方法
      this.addTextGraphicsLayerControllerToFeatrue();
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
    this.search();
    // this.baseBox_Interval = setInterval(() => {
    //   this.search();
    // },1000 * 60 * 5)
  },
  destroyed() {
    clearInterval(this.baseBox_Interval)
  }
};
</script>


<style lang="less" scoped>
/* 引入baseBox公共样式 */
@import "../../assets/commonLess/baseBox";
</style>
