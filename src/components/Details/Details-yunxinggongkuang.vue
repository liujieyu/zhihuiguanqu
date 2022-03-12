<template>
  <div v-loading="boxLoading">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <!-- 站点信息 -->
      <el-tab-pane name="zhandianxinxi">
        <span slot="label">
          <i class="el-icon-tickets"></i> 站点信息
        </span>
        <div class="drawer-profile">
          <!-- 导出按钮 
          <Button size="small" class="outPutButton" type="success" @click="$App.developing_tip">
            <div>导出</div>
          </Button>
          -->
          <!-- 信息表 -->
          <div>
            <!-- 信息内容 -->
            <div>
              <!-- table start -->
              <table style="border: 1px solid #EBEEF5" border cellspacing="0" width="100%" class="table_detail">
                <tr>
                  <td align="right" class="dt_name">站名：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.STNM || "&nbsp;" }}</td>
                  <td align="right" class="dt_name" >国家定类：</td>
                  <td align="center" class="dt_vale">{{ this.STTP_Filter(siteInfo.STTP) || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">等级：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ this.$FilterData.STGR_Filter(siteInfo.STGR) || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">行政区划：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.AD_NM || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">经度：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.LGTD || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">纬度：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.LTTD || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">站址：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.STLC || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">水系：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.HNNM || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">流域：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.CTCD || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">河流：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.RVCD || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">建站日期：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{ siteInfo.ESSTDT || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">建设单位：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.DLOG || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name" style="border-bottom: none">录入时间：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5;border-bottom: none"></td>
                  <td align="right" class="dt_name" style="border-bottom: none">实时视频：</td>
                  <td align="center" class="dt_vale" style="border-bottom: none"><Button type="info" @click="$App.developing_tip(info)" size="small">视频监控</Button></td>
                </tr>
              </table>
              <!-- table end -->




              <!-- <Row class="row">
                <Col span="5" align="right">站名：</Col>
                <Col span="7" align="center">{{ siteInfo.STNM || "&nbsp;" }}</Col>
                <Col span="5" align="right">国家定类：</Col>
                <Col span="7" align="center">{{ this.STTP_Filter(siteInfo.STTP) || "&nbsp;" }}</Col>
              </Row>
              <Row class="row">
                <Col span="5" align="right">等级：</Col>
                <Col
                  span="7"
                  align="center"
                >{{ this.$FilterData.STGR_Filter(siteInfo.STGR) || "&nbsp;" }}</Col>
                <Col span="5" align="right">行政区划：</Col>
                <Col span="7" align="center">{{ siteInfo.AD_NM || "&nbsp;" }}</Col>
              </Row>
              <Row class="row">
                <Col span="5" align="right">经度：</Col>
                <Col span="7" align="center">{{ siteInfo.LGTD || "&nbsp;" }}</Col>
                <Col span="5" align="right">纬度：</Col>
                <Col span="7" align="center">{{ siteInfo.LTTD || "&nbsp;" }}</Col>
              </Row>
              <Row class="row">
                <Col span="5" align="right">站址：</Col>
                <Col span="7" align="center">{{ siteInfo.STLC || "&nbsp;" }}</Col>
                <Col span="5" align="right">水系：</Col>
                <Col span="7" align="center">{{ siteInfo.HNNM || "&nbsp;" }}</Col>
              </Row>
              <Row class="row">
                <Col span="5" align="right">流域：</Col>
                <Col span="7" align="center">{{ siteInfo.CTCD || "&nbsp;" }}</Col>
                <Col span="5" align="right">河流：</Col>
                <Col span="7" align="center">{{ siteInfo.RVCD || "&nbsp;" }}</Col>
              </Row>
              <Row class="row">
                <Col span="5" align="right">建站日期：</Col>
                <Col span="7" align="center">{{ siteInfo.ESSTDT || "&nbsp;" }}</Col>
                <Col span="5" align="right">建设单位：</Col>
                <Col span="7" align="center">{{ siteInfo.DLOG || "&nbsp;" }}</Col>
              </Row>
              <Row class="row">
                <Col span="5" align="right">隶属单位：</Col>
                <Col span="7" align="center">{{ siteInfo.ATCUNIT || "&nbsp;" }}</Col>
                <Col span="5" align="right">管理单位：</Col>
                <Col span="7" align="center">{{ siteInfo.DLOG || "&nbsp;" }}</Col>
              </Row>-->
              <!--              <Row class="row">-->
              <!--                <Col span="5" align="right">录入时间：</Col>-->
              <!--                <Col-->
              <!--                  span="7"-->
              <!--                  align="center"-->
              <!--                >{{ this.$FilterData.dateFilter(siteInfo.MODITIME,8) || "&nbsp;" }}</Col>-->
              <!--                <Col span="5" align="right">图像按钮：</Col>-->
              <!--                <Col span="12" align="center" style="border-right: 1px solid rgb(200, 200, 200); ">-->
              <!--                  <Button type="info" @click="$App.developing_tip" size="small">查看图片</Button>-->
              <!--                </Col>-->
              <!--              </Row>-->

            </div>
            <!-- 分割线 -->
            <div class="divider"></div>
            <Row>
              <el-col class="dt_remark">
                <Col span="24">备注：{{ siteInfo.COMMENTS || "&nbsp;" }}</Col>
              </el-col>
            </Row>
          </div>
          <!-- 分割线 -->
          <div class="divider"></div>

          <!-- 分割线 -->
          <div class="divider"></div>
          <!-- 关联渠道和闸门 -->
          <div>
            <!-- <Row class="relationRow">
              <Col span="4">关联要素</Col>
              <Col span="20">
                <Button
                  @click="$App.developing_tip"
                  v-for="item in siteInfo.GUANLIAN"
                >{{ item.SLNM }}</Button>
                <div v-if="siteInfo.GUANLIAN && siteInfo.GUANLIAN.length == 0">暂无此站点的关联要素</div>
              </Col>
            </Row> -->
            <el-col style="border: 1px #EBEEF5 solid;border-radius: 2px;padding-left: 10px;padding-bottom: 20px">
              <Row class="relationRow">
                <Col span="4">同时监测：</Col>
                <Col span="20">
                  <!-- <Button
                    @click="$App.developing_tip"
                    v-for="item in siteInfo.GUANLIAN"
                  >{{ item.SLNM }}</Button> -->
                  <div ></div>
                </Col>
              </Row>
              <Row class="relationRow">
                <Col span="4">关联站点：</Col>
                <Col span="20">
                  <!-- <Button
                    @click="$App.developing_tip"
                    v-for="item in siteInfo.GUANLIAN"
                  >{{ item.SLNM }}</Button> -->
                  <div ></div>
                </Col>
              </Row>
              <Row class="relationRow">
                <Col span="4">关联要素：</Col>
                <Col span="20">
                  <!-- <Button
                    @click="$App.developing_tip"
                    v-for="item in siteInfo.GUANLIAN"
                  >{{ item.SLNM }}</Button> -->
                  <div ></div>
                </Col>
              </Row>
            </el-col>

          </div>
        </div>
      </el-tab-pane>
      <!-- 电压数据 -->
      <el-tab-pane name="zhuangtaishuju">
        <span slot="label">
          <Icon type="ios-flash" style="font-size:20px"/>运行工况
        </span>
        <div class="drawer-profile">
          <!-- 导出按钮 
          <Button size="small" class="outPutButton" type="success" @click="developing_tip">
            <div>导出</div>
          </Button>
          -->
          <div>
            <!-- 查询，导出行 -->
               <Row :gutter="16" type="flex" justify="end" align="middle">
                  <Col span="2">
                      <span style="letter-spacing:2px">查询</span>
                  </Col>
                  <!-- 开始到结束时间选择 -->
                  <Col span="19">
                    <el-date-picker
                      v-model="table.zhuangtaishuju.date"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="handleDatePickerChange"
                      :picker-options="table.zhuangtaishuju.datePickerOptions"
                      unlink-panels
                      :type="table.zhuangtaishuju.datePickerType"
                      size="mini"
                      style="min-width: 360px"
                    ></el-date-picker>
                  </Col>
                </Row>
                <!-- 分割线 -->
                <div class="divider"></div>
                <Row :gutter="16" type="flex" justify="center" align="middle">
                  正常电压范围：{{ZCDY.VOLMIN}}v - {{ZCDY.VOLMAX}}v
                </Row>
                <!-- 分割线 -->
                <div class="divider"></div>
            <!-- 选项卡 -->
            <Tabs type="card">
              <!-- 表格 -->
              <TabPane label="电压数据">
                <!-- 表格用于展示数据 -->
                <div>
                  <Table
                    :columns="table.zhuangtaishuju.activeColumns"
                    :data="table.zhuangtaishuju.Rows_filter"
                    :loading="table.zhuangtaishuju.loading"
                    border
                    size="small"
                    :height="table.zhuangtaishuju.height"
                  ></Table>
                  <!-- 分割线 -->
                  <div class="divider"></div>
                  <!-- 分页器 -->
                  <el-pagination
                    background
                    :page-size="table.zhuangtaishuju.pageSizes"
                    layout="sizes, total, prev, pager, next, jumper "
                    :page-sizes="[20, 50, 100, 200]"
                    :total="table.zhuangtaishuju.total"
                    :pager-count="5"
                    :current-page="table.zhuangtaishuju.currentPage"
                    @current-change="handleCurrentChange_zhuangtaishuju"
                    @size-change="handleSizeChange_zhuangtaishuju"
                    class="pageController"
                    small
                  ></el-pagination>
                  <!-- 分割线 -->
                  <div class="divider"></div>
                </div>
              </TabPane>
              <TabPane label="电压线性图">
                <!-- 绘图 -->
                <div
                  id="zhuangtaishujuChart"
                  :style="{width: '540px', height: '400px',margin: 'auto'}"
                ></div>
              </TabPane>
            </Tabs>

            <!-- 分割线 -->
            <!-- <div class="divider"></div> -->
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 导出提示对话框 -->
    <Modal
      v-model="outPutModal"
      v-loading="loading"
      title="关于导出"
      @on-ok="outPutSure"
      @on-cancel="cancel"
    >
      <p>您确认导出该站点的信息表吗？</p>
    </Modal>
  </div>
</template>



<script>
import FilterMethods from "../../assets/commonJS/FilterMethods"; // 过滤方法
import GetDataMethods from "../../assets/commonJS/GetDataMethods"; // 获取数据方法
import { timingSafeEqual } from "crypto";
export default {
  props: {
    info: {}
  },
  data() {
    return {
      // 激活标签栏
      activeName: "zhuangtaishuju",
      // 站点
      siteInfo: {},
      // 表格
      table: {
        // 状态数据
        zhuangtaishuju: {
          // 表头设置
          columns: {},
          // 正在激活的表头
          activeColumns: [
            {
              type: "index",
              title: " ",
              width: 60,
              align: "center",
              // 自定义序号
              indexMethod(item) {

                var index = item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                return index;
              },
              ellipsis: true
            },
            {
              title: "时间",
              key: "tm",
              // width: 150,
              align: "center"
            },
            {
              title: "电压(v)",
              width: 110,
              key: "VOL",
              align: "center",
              render: (h, params) => {
                console.log("params", params);
                console.log("VOL", params.row.VOL < this.ZCDY.VOLMIN || params.row.VOL > this.ZCDY.VOLMAX ? "red" : "black");
                return h(
                  "div",
                  {
                    style: {
                      color: params.row.VOL < this.ZCDY.VOLMIN || params.row.VOL > this.ZCDY.VOLMAX ? "red" : "black"
                    }
                  },
                  params.row.VOL
                );
              }
            },
            {
              width: 120,
              title: "通讯状态",
              key: "cs",
              align: "center",
              render: (h, params) => {
                // console.log("params", params);
                // console.log("CS", params.row.CS == "正常" ? "black" : "red");
                return h(
                  "div",
                  {
                    style: {
                      color: params.row.cs == "正常" ? "black" : "red"
                    }
                  },
                  params.row.cs
                );
              }
            }
          ],
          // 表体内容
          Rows: [],
          // 过滤后的表体内容
          Rows_filter: [],
          // 日期时间选择器的选项配置
          datePickerOptions: {
            shortcuts: [
              {
                text: "最近6小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 6);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近12小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 12);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近24小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近36小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 36);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近72小时",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 72);
                  picker.$emit("pick", [start, end]);
                }
              }
            ]
          },
          // 日期时间选择器类型
          datePickerType: "datetimerange",
          // 日期时间选择器值
          date: null,
          // 表格是否加载中
          loading: false,
          // 当前页
          currentPage: 1,
          // 每页显示数量
          pageSizes: 20,
          // 总条数
          total: 0,
          // 表格高度
          height: 430
        }
      },
      // 图形
      chart: {
        zhuangtaishuju: null
      },
      //   日期数据
      date: {
        shuiqing: ""
      },
      // 输入框对象
      input: {
        // 关系曲线换算的
        huansuan: {
          waterLever: "",
          flowLever: ""
        }
      },
      //   导出按钮加载控制
      outPutLoading: false,
      //   导出确认对话框控制
      outPutModal: false,
      // 整块区域的加载控制
      boxLoading: false,
      //正常电压范围
      ZCDY:{},
    };
  },
  mixins: [FilterMethods,GetDataMethods],
  methods: {
    //   导出站点信息
    outPutSiteInfo() {
      //   关闭导出确认对话框
      this.outPutModal = false;
      //   按钮加载
      this.outPutLoading = true;
      setTimeout(() => {
        this.outPutLoading = false;
        this.$Modal.success({
          title: "关于导出",
          content: "站点信息表导出成功"
        });
      }, 500);
    },
    //   确认导出
    outPutSure() {
      this.outPutSiteInfo();
    },
    // 搜索
    search() {
      // 表格加载中
      this.table.loading = true;
      setTimeout(() => {
        // var newList = this.featrue.Rows.map((val, index) => {
        //   return val.attributes;
        // });

        // this.table.Rows = newList;
        // 取消表格加载
        this.table.loading = false;

      }, 1000);
    },
    // 绘图
    createChart(idName) {
      let myChart = this.$echarts.init(document.getElementById(idName));

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
        animation: false,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "00:00-02:00",
              "02:00-04:00",
              "04:00-06:00",
              "06:00-08:00",
              "08:00-10:00"
            ]
          }
        ],
        yAxis: [
          {
            name: "电压 v",
            type: "value",
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            name: "电压范围 ",
            type: "value",
            axisLabel: {
              formatter: "{value} "
            }
          }
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
            yAxisIndex: 1,
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    // 制图——电压线型图
    createChart_zhuangtaishuju(id, tableType, data) {
      var ele = document.getElementById(id);

      if (data.length > 0) {
        var echartData = this.$App.transform_YXGK_data_into_ehart_data(
          data,
          tableType
        ); // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        var mintime=echartData.x.list[0].slice(0, 10),maxtime=echartData.x.list[echartData.x.list.length-1].slice(0, 10);
        var now=new Date();
        if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==now.getFullYear()){
          for(var i=0;i<echartData.x.list.length;i++){
              var time=echartData.x.list[i].substr(5);
              echartData.x.list[i]=time;
            }
        }
        if (!this.chart.zhuangtaishuju) {
          this.chart.zhuangtaishuju = this.$echarts.init(ele);
        }
        this.chart.zhuangtaishuju.setOption({
          title: {
            text: echartData.chartName
          },
          tooltip: {
            trigger: "axis"
          },
          // legend: {
          //   data: [echartData.y1.name],
          //   y: "bottom"
          // },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              magicType: { show: true, type: ["line", "bar"] },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          animation: true,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: echartData.x.list
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
          series: [
            {
              name: echartData.y1.name,
              type: "line",
              data: echartData.y1.list
            }
          ]
        });
      }
    },
    // 加载站点数据
    loadSiteData(data) {
      this.siteInfo = data;
    },
    // 组件加载中
    componentLoading() {
      this.boxLoading = true;
    },
    // 取消组件加载
    cancelComponentLoading() {
      this.boxLoading = false;
    },
    // 处理页码切换
    handleCurrentChange_zhuangtaishuju(index) {
      this.table["zhuangtaishuju"].currentPage = index;
      this.search_StationStatus();
    },
    // 处理每页显示条数切换
    handleSizeChange_zhuangtaishuju(pageSizes) {
      this.table["zhuangtaishuju"].pageSizes = pageSizes;
      this.table["zhuangtaishuju"].currentPasge = 1;
      this.search_StationStatus();
    },
    // 获取对应水情历史数据表的数据
    getTableData_zhuangtaishuju(callback) {
      this.axios
        .get(`/guanqu/admin/ST_StationStatus_H`, {
          params: {
            STCD: this.info.STCD
          }
        })
        .then(res => {
          var data = res.data.rows;
          if (typeof callback == "function") {
            callback(data);
          }
        });
    },
    // 更新水情历史数据表的数据
    setTableData_zhuangtaishuju(data) {
      this.table.zhuangtaishuju.Rows_filter = data;
      console.log(685,data);
    },
    // 过滤水情历史数据表的数据
    filterTableData_zhuangtaishuju(data, callback) {
      var data = data.map(val => {
        // val.TM = this.dateFilter(val.TM); // 过滤日期
        val.VOL = this.Float_Filter(val.VOL,1);
        return val;
      });
      if (typeof callback == "function") {
        callback(data);
      }
    },
    // 根据行政区划编码获取行政区划
    getCompartmentByADDVCD(callback) {
      var ADDVCD = this.info.rowinfo.ADDVCD;
      if (ADDVCD && ADDVCD != "") {
        this.axios
          .get(`/guanqu/admin/WRP_AD_B`, {
            params: {
              AD_CD: ADDVCD
            }
          })
          .then(res => {
            var data = res.data.rows;
            if (typeof callback == "function") {
              callback(data);
            }
          });
      }
    },
    // 处理日期时间选择器确定事件_状态数据
    handleDatePickerChange(item) {
      this.table.zhuangtaishuju.currentPage = 1;
      this.search_StationStatus();
    },
    // 查询运行工况状态数据历史表
    search_StationStatus() {
      this.table.zhuangtaishuju.loading = true; // 加载中

      var body = {
        _page: this.table["zhuangtaishuju"].currentPage || 1,
        _page_size: this.table["zhuangtaishuju"].pageSizes || 20,
        STCD: this.info.STCD
      };

      // 如果有选择日期进行查询，根据表格类型传递参数
      if (this.table.zhuangtaishuju.date) {
        let time = this.$FilterData.elDatePicker_Filter(
          this.table.zhuangtaishuju.date
        );
        time = time.split(',')
        body.Time_min = time[1]
        body.Time_max = time[2]
        // console.log(body.TM.split());
      }
      // debugger;
      this.$GetData.Survey_History_YXGK(
        "historyTable",
        body,
        {
          default: true,
          myFilter: data => {
            data.map(val => {
              val.currentPage = body._page;
              val.pageSizes = body._page_size;
              return val;
            });
            return data;
          }
        },
        data => {
          this.setTableTotal_zhuangtaishuju(data.total); // 设置状态数据表格总条数
          this.setTableData_zhuangtaishuju(data.data); // 更新状态数据表的数据
          body._page_size = 999999999;
          body._page = 1;
          this.$GetData.Survey_History_YXGK(
            "historyTable",
            body,
            {
              default: true,
              myFilter: data => {
                data.map(val => {
                  val.currentPage = body._page;
                  val.pageSizes = body._page_size;
                  return val;
                });
                return data;
              }
            },
            chartData => {
              this.createChart_zhuangtaishuju(
                "zhuangtaishujuChart",
                "zhuangtaishuju",
                chartData.data
              ); // 电压线型图
            }
          );





          this.table.zhuangtaishuju.loading = false; // 加载取消
        }
      );
    },
    setTableTotal_zhuangtaishuju(total) {
      this.table.zhuangtaishuju.total = total;
    },
    // 设置状态数据表默认查询日期
    setTableDefaultDate_zhuangtaishuju() {
      var timeSlot = this.$App.zeroPointToNowOfTheDay();

      this.setTableDate("zhuangtaishuju", timeSlot);
    },
    // 设置 xx表格 时间选择器值
    setTableDate(tableName, val) {
      this.table[tableName].date = val;
    }
  },
  mounted() {

    // 请求正常电压范围
    // this.$GetData.Survey_Around_YXGK(null,body,false,data => {
    //
    // })
    // 组件加载中
    this.componentLoading();
    // 获取详情数据
    this.axios
      // .get(`/guanqu/table/details?ID=${this.info.rowinfo.STCD}&pk=STCD`)
      .get(`/guanqu/gongkuang/details?STCD=${this.info.rowinfo.STCD}`)
      .then(res => {
        this.getCompartmentByADDVCD(data => {
          this.siteInfo.AD_NM = data[0].AD_NM;
        });

        //获取预警数据
        this.axios.get('/guanqu/table/ST_StationStatusType').then(res =>{
          // debugger;
          console.log(res)
          let dataVol = res.data.list[0],
                  volMin = dataVol.VOLMIN,
                  volMax = dataVol.VOLMAX
          this.ZCDY.VOLMIN = volMin
          this.ZCDY.VOLMAX = volMax
        });

        // 根据河流编码获取河流名
        this.$GetData.Base_R_I(
          {
            RVCD: this.info.rowinfo.RVCD
          },
          true,
          data => {
            this.siteInfo.RVCD = data.data[0].RVNM;
          }
        );

        // 根据流域编码获取流域名
        this.$GetData.Base_B_I(
          {
            CTCD: this.info.rowinfo.CTCD
          },
          true,
          data => {
            this.siteInfo.CTCD = data.data[0].CTNM;
          }
        );
        // 加载站点数据
        this.loadSiteData(res.data);
        // 组件加载取消
        this.cancelComponentLoading();

        // 设置状态数据表默认查询日期
        this.setTableDefaultDate_zhuangtaishuju();
        // 查询状态数据表的数据
        this.search_StationStatus();
      });
  }
};
</script>


<style lang="less" scope>
@import "./common/common.less";
.drawer-profile {
  font-size: @siteInfoFontSize;
  .row_header {
    text-align: center;
    font-size: 1.5625rem;
    font-weight: 700;
  }

  .relationRow {
    margin-top: 1.25rem;
    button {
      margin-right: 1.25rem;
    }
  }

  .checkBoxItem {
    margin: 0 0.9375rem;
  }
  // 闸阀状态动态模拟图
  .waterLever {
    text-align: center;
    .box {
      width: 14.375rem;
      margin: 0 auto;
      border-left: rgb(139, 139, 139) 0.9375rem solid;
      border-right: rgb(139, 139, 139) 0.9375rem solid;
      background-color: rgb(191, 191, 191);
      height: 14.375rem;
      display: flex;
      flex-direction: column-reverse;
    }
    .water {
      width: 100%;
      background: white;
      padding: 0.625rem 0;
    }
    .waterImg {
      width: 6.25rem;
    }
  }
}
</style>
