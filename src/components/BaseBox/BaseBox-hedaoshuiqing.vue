<template>
  <div class="baseBoxContent">
    <!-- 折叠面板 -->
    <!-- 表单, 用于搜索查询 -->
    <Collapse active-key="1">
      <Panel key="1">
        查询
        <div slot="content">
          <div class="form">
            <!-- 选择器, 按钮 -->
            <Row class="select-group" :gutter="16">
              <!-- <Col span="2">
                <span style="line-height:25px">市:</span>
              </Col>-->
              <Col span="12">
                <!-- 地址级联选择器 -->
                <el-cascader
                  clearable
                  filterable
                  size="mini"
                  placeholder="地址"
                  :options="form.adressList"
                  v-model="form.model_adress"
                  @change="search"
                  change-on-select
                ></el-cascader>
              </Col>

              <Col span="12">
                <!-- 渠道级联选择器 -->
                <el-cascader
                  filterable
                  clearable
                  size="mini"
                  placeholder="渠道"
                  :options="form.qudaoList"
                  v-model="form.model_qudao"
                  @change="search"
                  change-on-select
                ></el-cascader>
              </Col>

            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>
            <Row>
              <Col>
              <!-- 归属单位选择器 -->
                <el-select
                  v-model="form.model_guishu"
                  multiple
                  collapse-tags
                  clearable
                  size="mini"
                  @change="search"
                  placeholder="归属单位">
                  <el-option
                    v-for="item in form.guishuList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </Col>
            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>
            <Row>
              <Col span="4" style="line-height: 24px;">
                异常界限值:
              </Col>
              <Col span="7">
                <Input
                  @on-enter="search"
                  placeholder="异常界限值m"
                  size="small"
                   v-model.trim="form.YCJXZ"
                  >
                </Input>
              </Col>
            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>
            <Row :gutter="16">
              <Col span="22">
                <Input
                  search
                  enter-button
                  @on-search="search"
                  placeholder="请输入要搜索的站名"
                  size="small"
                  v-model.trim="form.search_str"
                >
                  <!-- <Icon type="ios-search" slot="suffix"/> -->
                </Input>
              </Col>
              <!-- <Col span="5">
                查询按钮
                <Button type="info" size="small" @click="search">查询</Button>
              </Col>-->
            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>
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
            <!-- 多选框 -->
          </div>
        </div>
      </Panel>
    </Collapse>

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
        <!-- 自定义 -->
        <el-table-column align="center" label="水位(m)" :width="80">
          <template slot-scope="scope">
            <div>
              <span
                      :style="{
              color:  scope.row.jjj > 0?'red' : 'black',
            }"
              >{{ scope.row.z }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="距警戒" :width="80">
          <template slot-scope="scope">
              {{scope.row.jjj}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="水势" :width="80">
          <template slot-scope="scope">
            <div>
              <strong
                :style="{
              color: scope.row.WPTN.status == 4? 'blue' : scope.row.WPTN.status == 5?'red' : 'black',
              fontSize: scope.row.WPTN.status == 6?'12px' : '17px'
            }"
              >{{ scope.row.WPTN.symbol }}</strong>
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
import { truncateSync } from "fs";
import { setTimeout } from "timers";

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
      // 文字标注图层
      TextGraphicsLayers: [],
      // 提示 展示
      tip: {
        info_tip: null,
        show_tip: false
      },
      // 表单数据
      form: {
        YCJXZ:'0.5',
        search_str: "",
        adressList: [],
        qudaoList: [],
        guishuList:[
          {
            value: 'danwei1',
            label:"单位一"
          },
          {
            value: 'danwei2',
            label:"单位二"
          },
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
            value: "z",
            size: "small",
            // iconType: "logo-facebook",
            title: "水位"
          },
        ],
        model_adress: null,
        model_qudao: null,
        model_guishu: ['1','2','3','4','5','6','7','8'],
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
            width: 120,
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
          //   title: "水位(m)",
          //   key: "z",
          //   width: 120,
          //   align: "center",
          //   sortable: "custom"
          // },
          // {
          //   title: "距警戒",
          //   key: "jjj",
          //   width: 120,
          //   align: "center",
          // }
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
      console.log('dianji',item);
      var evt = new Object();
      evt.graphic = new Object();
      evt.graphic.attributes = item;
      evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(item));
      evt.graphic.attributes.rowinfo.tableType = {
        hdsq: "historyTable"
      };
      var v = new Object();
      v.itype = "hedaoshuiqing";

      // 设置中心缩放
      this.setMapCenterandZoom(item.LGTD, item.LTTD);
      // 取消所有站点的闪烁
      this.$App.GraphicsLayer_Selection_clear();
      // 对应站点闪烁
      this.$App.add_Graphic_To_GraphicsLayer_Selection(item);
      // 展示抽屉详情框
      this.$App.showDrawer(evt, v);
    },
    // 悬浮框提示
    showTips(item) {
      // 隐藏之前提示框
      this.hideTips();
      console.log('悬浮框');
      console.log(item);
      var div = `<div>
        <div class="tip_row">
                <span class="tip_col_5">时间：</span>
                <span class="tip_col_7">20${
                  item.rowinfo.tm
                }</span>
                <span class="tip_col_5">水位：</span>
                <span class="tip_col_7">${
                  this.$FilterData.Float_Filter(item.rowinfo.z) == ""
                    ? ""
                    : this.$FilterData.Float_Filter(item.rowinfo.z) + "m"
                }</span>
              </div>
              <div class="divider"></div>
              <div class="tip_row">
                <span class="tip_col_5">水势：</span>
                <span class="tip_col_7" id="${item.STCD}_shuishi">

                </span>
                <span class="tip_col_5" >警戒水位：</span>
                <span class="tip_col_7" id="${item.STCD}_YJZ">${this.$FilterData.Float_Filter(item.rowinfo.YUJING_AWL,2)}m</span>
                <span class="tip_col_5" >距警戒：</span>
                <span class="tip_col_7" id="${item.STCD}_YJQ">${this.$FilterData.Float_Filter(item.rowinfo.jjj,2)} m</span>
              </div>
              <div class="divider"></div>
        <div id="${
          item.STCD
        }" style="width: 500px;height:320px;margin:auto"></div>
      </div>`;
      // var content = `<div id="myChart" :style="{width: '340px', height: '250px', margin: 'auto'}"></div>`; // 获取内容
      this.map.infoWindow.resize(570, 650); // 提示框大小
      this.map.infoWindow.setTitle(item.STNM); // 提示题目
      this.map.infoWindow.setContent(div); // 提示内容


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

      var body = {
        STCD: item.STCD,
        // TM: this.$FilterData.elDatePicker_Filter(
        //   this.$App.zeroPointToNowOfTheDay()
        // ),
        _page_size: 999999
      };

      // 时间参数
      // var DTT = this.$FilterData
      //         .elDatePicker_Filter(this.$App.zeroPointToNowOfTheDay())
      //         .split(",");

      function setDate(agmt) {
        let date = new Date();
        let YY = date.getFullYear(),
                MM = date.getMonth() < 10? `0${date.getMonth()+1}` : date.getMonth()+1,
                DD = date.getDate() < 10? `0${date.getDate()}` : date.getDate(),
                HH = date.getHours() < 10? `0${date.getHours()}` : date.getHours(),
                mm = date.getMinutes() < 10? `0${date.getMinutes()}` : date.getMinutes(),
                SS = date.getSeconds() < 10? `0${date.getSeconds()}` : date.getSeconds();
        if(agmt === 'now'){
            return `${YY}-${MM}-${DD} ${HH}:${mm}:${SS}`
        }else {
            return `${YY}-${MM}-${DD} 00:00:00`
        }

      }
      body.Time_min = setDate(null);
      body.Time_max = setDate('now');
      console.log(body.Time_min,body.Time_max);

      console.log(body.Time_min,body.Time_max);

      this.$GetData.Survey_History_HDSQ(
        "historyTable",
        body,
        {
          default: true
        },
        data => {
          this.setWPTN_HTML(`${item.STCD}_shuishi`, item.rowinfo.WPTN);
          this.createChart(item.STCD, data.data);
        }
      );

      this.$GetData.Survey_History_HDSQ(
        "alarmTable",
        {
          STCD: item.STCD
        },
        {
          default: true
        },
        data => {
          var data = data.data[0];
          console.log(data);
        }
      );

      // 延时200毫秒
      // setTimeout(() => {

      // }, 200);

      // 延时200毫秒
      // setTimeout(() => {

      // }, 200);
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
    // 隐藏提示
    hideTips() {
      this.map.infoWindow.hide();
      // this.tip.show_tip = false; // 关闭提示框组件
    },
    // 制图
    createChart(id, data) {
      if (data.length > 0) {
        // data = data.slice(0, 3);

        var echartData = this.$App.transform_HDSQ_data_into_ehart_data(data, "historyTable", true);
        // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象

        var x_List = echartData.x.list
        .map((val, index, array) => {
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
            data: [echartData.y1.name],
            y: "bottom"
          },

          grid: {
            x: '15%'
          },

          // calculable: true,
          animation: false,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: x_List,
              axisTick: {
                interval: parseInt(echartData.x.list.length / 4)
              },
              axisLabel: {
                interval: parseInt(echartData.x.list.length / 4)
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
            }
          ],
          series: [
            {
              name: echartData.y1.name,
              type: "line",
              data: echartData.y1.list
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
    // 查询
    search() {
      // console.log(value);
      var body = new Object();
      // 如果输入框有内容，添加站名过滤字段
      if (this.form.search_str) {
        // body["ST_STBPRP_B.STNM"] = `like,${this.form.search_str}`;
        body["STNM"] = `${this.form.search_str}`;
      }
      // 如果地址选择框有内容，添加行政区划过滤字段
      if (this.form.model_adress && this.form.model_adress.length != 0) {
        body["ADDVCD"] = `${this.$App.ADDVCD_Array_Filter(
          this.form.model_adress
        )}`;
      }
      // 如果渠道选择框有内容，添加渠道过滤字段
      if (this.form.model_qudao && this.form.model_qudao.length != 0) {
        body[
          "Canal_Code"
        ] = `${this.$App.Canal_Code_Array_Filter(this.form.model_qudao)}`;
      }
      // 如果归属单位选择框有内容，添加归属单位过滤字段
      if (this.form.model_guishu && this.form.model_guishu.length != 0) {
        body[
          "STGR"
        ] = this.form.model_guishu.join(',');
      }
      //异常界限值
      if (this.form.YCJXZ != "") {
          body["max_yichang"] = this.form.YCJXZ;
      }

      this.tableLoading(); // 表格加载中
      this.search_FeatrueLayer("hedaoshuiqing", body, this.featrue, newFeatureLayerOBJ => {
        this.table.currentPage = 1;
        this.baseBox_init();
        this.cancelTableLoading(); //取消表格加载
        this.hideTips();
      });
      // setTimeout(() => {
      //   this.cancelTableLoading(); //取消表格加载
      // }, 800);
    },
    // 获取 子组件传过来 的绘图方法
    // chart(item) {
    //   this.getChart = item.chart;
    // },
    // 给图层对象添加事件
    addEventToJsonFlayer(JsonFlayer) {
      //当鼠标悬停在元素上
      JsonFlayer.on("mouse-over", evt => {
        setTimeout(() => {
          var attributes = evt.graphic.attributes;
          attributes.eventType = "mouse-over";
          this.showTips(attributes); // 展示悬浮框
        }, 100);
        // 给地图对象添加方法
        // this.addEventToMap();
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
        // val_clone.TM = this.$FilterData.dateFilter(val_clone.TM);
        // 水位过滤
        val_clone.z = this.Z_Filter(val_clone.z);
        val_clone.jjj = this.Z_Filter(val_clone.jjj);
        // 流量过滤
        // val_clone.Q = this.Z_Filter(val_clone.Q, 3);
        // 水势过滤
        val_clone.WPTN = this.WPTN_Filter(val_clone.WPTN);
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


      console.log(textTypeList)
      textTypeList.forEach((textType, index) => {
        console.log(textType)
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
              case "z":
                var value = `${this.Z_Filter(Row.rowinfo[textType])}`;
                if (value == "") {
                  value = "";
                } else {
                  value += "m";
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
      this.getTableData_WRP_AD_B(data => {
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

      // 获取归属单位数据,然后设置归属单位选择框选项
      this.getTableData_WPR_FieldInfo({FieldID: "STGR"},data => {

        this.form.guishuList = data.reverse();
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
    this.baseBox_Interval = setInterval(() => {
      this.search();
    },1000 * 60 * 5)
  },
  destroyed() {
    clearInterval(this.baseBox_Interval)
  }
};
</script>


<style lang="less" scope>
/* 引入baseBox公共样式 */
@import "../../assets/commonLess/baseBox";
</style>
