<template>
  <div v-loading="boxLoading">
    <el-tabs v-model="activeName" type="border-card">
      <!-- 视频 -->
      <el-tab-pane name="shipin">
        <span slot="label">
          <Icon type="md-videocam" style="font-size:20px"/>视频
        </span>
        <div class="drawer-profile">
          <div>
            <!-- 视频监控区域 -->
            <Row :gutter="16">
              <!-- 视频 -->
              <Col span="24">
                <!-- <img src="img/shuizha.9d256eb4.jpg" alt> -->
                <iframe style="width: 100%;height:600px;border: 0;overflow:scroll hidden;" id="video" scrolling='auto'></iframe>
              </Col>
            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>
          </div>
        </div>
      </el-tab-pane>
      <!--图像-->
      <el-tab-pane name="tuxiang">
        <span slot="label">
          <i class="el-icon-picture"></i> 图像
        </span>
        <div class="drawer-profile">
          <!-- 导出按钮
          <Button size="small" class="outPutButton" type="success" @click="developing_tip">
            <div>导出</div>
          </Button>
           -->
          <div>
            <!-- 查询，导出行 -->
            <Row :gutter="32" type="flex" align="center">
              <!-- 开始到结束时间选择 -->
              <Col span="32">
                <el-date-picker
                  v-model="table.tuxiang.date"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleDatePickerChange_tuxiang"
                  :picker-options="table.tuxiang.datePickerOptions"
                  unlink-panels
                  :type="table.tuxiang.datePickerType"
                  size="mini"
                  style="min-width: 360px"
                ></el-date-picker>
              </Col>
            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>

            <!-- 图片列表 -->
            <div>
              <Row
                :gutter="32"
                type="flex"
                align="center"
                style="height:495px; overflow:auto"
                v-loading="table.tuxiang.loading"
              >
                <Col v-if="table.tuxiang.Rows.length > 0" span="5" v-for="(item, index) in table.tuxiang.Rows" style="position: relative;">
                  <img
                    class="Img"
                    :src="item.url"
                    @click="$App.enlarge_img(table.tuxiang.Rows, index)"
                    width="210"
                    height="160"
                  />
                </Col>
                <Col span="19" v-show="table.tuxiang.Rows.length == 0">
                <div style="height:100%;display:flex;align-items:center;width:100%;margin:auto 0;">
                  暂无数据
                </div>
                </Col>
              </Row>
              <!-- 分割线 -->
              <div class="divider"></div>
              <Row :gutter="32" type="flex" align="center">
              <!-- 开始到结束时间选择 -->
              <Col span="32">
              <!-- 分页器 -->
              <el-pagination
                background
                :page-size="table.tuxiang.pageSizes"
                layout="sizes, total, prev, pager, next, jumper "
                :page-sizes="[20, 50, 100, 200]"
                :total="table.tuxiang.total"
                :pager-count="5"
                :current-page="table.tuxiang.currentPage"
                @current-change="handleCurrentChange_tuxiang"
                @size-change="handleSizeChange_tuxiang"
                class="pageController"
                small
              ></el-pagination>
              </Col>
              </Row>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- 站点信息 -->
      <el-tab-pane name="zhandianxinxi">
        <span slot="label">
          <i class="el-icon-tickets"></i> 站点信息
        </span>
        <div class="drawer-profile">
          <!-- 信息表 -->
          <div>
            <!-- 信息内容 -->
            <div>
              <!-- table start  table_detail-->
              <table
                style="border: 1px solid #EBEEF5"
                border
                cellspacing="0"
                width="100%"
                class="site_detail"
              >
              <tr>
                <td colspan="4" style="background-color:#DEDFE0;padding:2px;">
                  <el-tag type="info" effect="dark" size="small">基本信息</el-tag>
                </td>
              </tr>
                <tr>
                  <td align="right" class="dt_name">站名：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.STNM || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">国家定类：</td>
                  <td
                    align="center"
                    class="dt_vale"
                  >{{ this.STTP_Filter(siteInfo.STTP) || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">等级：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ this.$FilterData.STGR_Filter(siteInfo.STGR) || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">行政区划：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.AD_NM || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">经度：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.LGTD || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">纬度：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.LTTD || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">站址：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.STLC || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">水系：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.HNNM || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">流域：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.CTCD || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">河流：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.RVCD || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">建站日期：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ siteInfo.ESSTDT || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">建设单位：</td>
                  <td align="center" class="dt_vale">{{ siteInfo.DLOG || "&nbsp;" }}</td>
                </tr>
              </table>
               <table
                style="border: 1px solid #EBEEF5"
                border
                cellspacing="0"
                width="100%"
                class="site_detail"
              >              
                  <tr>
                <td colspan="4" style="background-color:#DEDFE0;padding:2px;">
                  <el-tag type="info" effect="dark" size="small">特征水位</el-tag>
                </td>
                  </tr>
                  <tr>
                  <td align="right" class="dt_name">4-6月汛限水位：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ `${$FilterData.Float_Filter(yujingdata.FWL)} m`  || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">7-9月汛限水位：</td>
                  <td
                    align="center"
                    class="dt_vale"
                  >{{ `${$FilterData.Float_Filter(yujingdata.FWL79)} m` || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">死水位：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ `2514.00m` || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">校核水位：</td>
                  <td align="center" class="dt_vale">{{ `2524.12m` || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">正常蓄水位：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ `2520.20m` || "&nbsp;" }}</td>
                  <td align="right" class="dt_name"></td>
                  <td align="center" class="dt_vale"></td>
                </tr>
               </table>
                <table
                style="border: 1px solid #EBEEF5"
                border
                cellspacing="0"
                width="100%"
                class="site_detail"
              >
              <tr>
                <td colspan="4" style="background-color:#DEDFE0;padding:2px;">
                  <el-tag  type="info" effect="dark" size="small">实时降雨</el-tag>
                </td>
                  </tr>
                <tr>
                  <td align="right" class="dt_name">预警等级：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  ><span :style="{'color':jiangyu_warm.COLOR}">{{ jiangyu_warm.LEVEL || "&nbsp;" }}</span></td>
                  <td align="right" class="dt_name">1小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                  ><span :style="{
                        color: jiangyu_warm.SIGN1 == 3?'red' :jiangyu_warm.SIGN1 == 2?'orange' : jiangyu_warm.SIGN1 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN1 || "&nbsp;" }}</span></td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">3小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  ><span :style="{
                        color: jiangyu_warm.SIGN3 == 3?'red' :jiangyu_warm.SIGN3 == 2?'orange' : jiangyu_warm.SIGN3 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN3 || "&nbsp;" }}</span></td>
                  <td align="right" class="dt_name">6小时降雨：</td>
                  <td align="center" class="dt_vale"><span :style="{
                        color: jiangyu_warm.SIGN6 == 3?'red' :jiangyu_warm.SIGN6 == 2?'orange' : jiangyu_warm.SIGN6 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN6 || "&nbsp;" }}</span></td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">12小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  ><span :style="{
                        color: jiangyu_warm.SIGN12 == 3?'red' :jiangyu_warm.SIGN12 == 2?'orange' : jiangyu_warm.SIGN12 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN12 || "&nbsp;" }}</span></td>
                  <td align="right" class="dt_name">24小时降雨：</td>
                  <td align="center" class="dt_vale"><span :style="{
                        color: jiangyu_warm.SIGN24 == 3?'red' :jiangyu_warm.SIGN24 == 2?'orange' : jiangyu_warm.SIGN24 == 1?'yellow' :'#606266',
                        }">{{ jiangyu_warm.RAIN24 || "&nbsp;" }}</span></td>
                </tr>
               </table>
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
      activeName: "shipin",
      // 站点信息
      siteInfo: {},
      //预警数据
      yujingdata: {
        FWL: null, // 4-6月汛限水位
        FWL79: null, // 7-9月汛限水位
        SJWL: null, // 设计洪水位
        JYWL: null // 经验水位
      },
      //降雨预警
      jiangyu_warm:{
        LEVEL:null,//降雨预警等级
        RAIN1:null,
        RAIN3:null,
        RAIN6:null,
        RAIN12:null,
        RAIN24:null,
      },
      // 表格数据
      table: {
        tuxiang: {
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
          total: true,
          Rows: [
          ]
        }
      },
      //   列表对象
      list: {
        imageList: []
      },
      //   导出按钮加载控制
      outPutLoading: false,
      //   导出确认对话框控制
      outPutModal: false,
      //   整块区域加载控制
      boxLoading: false
    };
  },
  mixins: [FilterMethods, GetDataMethods],
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
    developing_tip() {
      this.$Message.warning("从功能正在开发中...");
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
    // 设置水库水情预警信息
    set_SKSQ_alarmInfo(STCD) {
      console.warn("set_SKSQ_alarmInfo",STCD)
      this.$GetData.Survey_History_SKSQ(
        "alarmTable",
        {
          STCD: STCD,
        },
        true,
        data => {
          var yujingdata = data.data[0];

          this.yujingdata.FWL = yujingdata.FWL;
          this.yujingdata.FWL79 = yujingdata.FWL79;
          this.yujingdata.SJWL = yujingdata.SJWL;
          this.yujingdata.JYWL = yujingdata.JYWL;
        }
      );
    },
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
    // 加载表格数据
    loadTableData(list, data) {
      this.table[list].Rows = data;
    },
    // 加载站点数据
    loadSiteData(data) {
      this.siteInfo = data;
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
    // 查询历史图像数据
    search_tuxiang() {
      this.$TableMethods.tableLoading(this.table.tuxiang);

      // 传递站码参数
      var body = {
        STCD: this.siteInfo.STCD,
        _page: this.table.tuxiang.currentPage,
        _page_size: this.table.tuxiang.pageSizes,
        _orderby: `TM desc`
      };

      // 如果有选择日期进行查询，根据表格类型传递参数
      if (this.table.tuxiang.date) {
        var DTT = this.$FilterData
              .elDatePicker_Filter(this.table.tuxiang.date, "include_seconds")
              .split(",");
            body.Time_min = DTT[1];
            body.Time_max = DTT[2];
      }

      this.$GetData.Survey_History_TX(body, true, data => {
        this.$TableMethods.setTableTotal(this.table.tuxiang, data.total);
        this.$TableMethods.setTableData(this.table.tuxiang, data.data);
        this.$TableMethods.cancelTableLoading(this.table.tuxiang);
      });
    },
    // 处理页码切换_图像
    handleCurrentChange_tuxiang(index) {
      this.table["tuxiang"].currentPage = index;
      this.search_tuxiang();
    },
    // 处理每页显示条数切换_水情数据
    handleSizeChange_tuxiang(pageSizes) {
      this.table["tuxiang"].pageSizes = pageSizes;
      this.table["tuxiang"].currentPage = 1;
      this.search_tuxiang();
    },
    // 设置图像历史表默认查询日期
    setTableDefaultDate_tuxiang() {
      const end = new Date();
      const start = zeroPointOfTheDay();
      var timeSlot = [start, end];
      this.table.tuxiang.date = timeSlot;
      // this.setTableDate("tuxiang", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 处理日期时间选择器确定事件_图像
    handleDatePickerChange_tuxiang(item) {
      this.table.tuxiang.currentPage = 1;
      this.search_tuxiang();
    },
    // 设置 xx表格 时间选择器值
    setTableDate(tableName, val) {
      this.table[tableName].date = val;
    },
    // 根据行政区划编码获取行政区划
    getCompartmentByADDVCD(callback) {
      var ADDVCD = this.info.ADDVCD;
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
  },
  mounted() {
    //判断浏览器是否为ie
    var u = navigator.userAgent;
    if (u.indexOf('Trident') > -1) {
      
    }else{
      this.$message({
          message: '提示：请确保在IE浏览器下使用视频监控功能！',
          type: 'warning'
      });
    }
     var level=0,color="#606266";
    if(level<this.info.rowinfo.SIGN1){
        level=this.info.rowinfo.SIGN1;
    }
    if(level<this.info.rowinfo.SIGN3){
        level=this.info.rowinfo.SIGN3;
    }
    if(level<this.info.rowinfo.SIGN6){
        level=this.info.rowinfo.SIGN6;
    }
    if(level<this.info.rowinfo.SIGN12){
        level=this.info.rowinfo.SIGN12;
    }
    if(level<this.info.rowinfo.SIGN24){
        level=this.info.rowinfo.SIGN24;
    }
    if(level==0){
      this.jiangyu_warm.LEVEL="无";
      this.jiangyu_warm.COLOR="#606266";
    }
    if(level==1){
      this.jiangyu_warm.LEVEL="黄色预警";
      this.jiangyu_warm.COLOR="yellow";
    }
    if(level==2){
      this.jiangyu_warm.LEVEL="橙色预警";
      this.jiangyu_warm.COLOR="orange";
    }
    if(level==3){
      this.jiangyu_warm.LEVEL="红色预警";
      this.jiangyu_warm.COLOR="red";
    }
    this.jiangyu_warm.SIGN1=this.info.rowinfo.SIGN1;
    this.jiangyu_warm.SIGN3=this.info.rowinfo.SIGN3;
    this.jiangyu_warm.SIGN6=this.info.rowinfo.SIGN6;
    this.jiangyu_warm.SIGN12=this.info.rowinfo.SIGN12;
    this.jiangyu_warm.SIGN24=this.info.rowinfo.SIGN24;
    this.jiangyu_warm.RAIN1=this.info.rowinfo.RAIN1+"mm";
    this.jiangyu_warm.RAIN3=this.info.rowinfo.RAIN3+"mm";
    this.jiangyu_warm.RAIN6=this.info.rowinfo.RAIN6+"mm";
    this.jiangyu_warm.RAIN12=this.info.rowinfo.RAIN12+"mm";
    this.jiangyu_warm.RAIN24=this.info.rowinfo.RAIN24+"mm";
    // 区域加载中
    this.boxLoading = true;
    // 获取详情数据
    this.axios
      .get(`/guanqu/gis/details?ID=${this.info.STCD}&pk=STCD`)
      .then(res => {


        this.getCompartmentByADDVCD(data => {
          this.siteInfo.AD_NM = data[0].AD_NM;
        });
        // 根据河流编码获取河流名
        this.$GetData.Base_R_I({
          RVCD: this.info.RVCD
        },true,(data) => {
          this.siteInfo.RVCD = data.data[0].RVNM;
        })

        // 根据流域编码获取流域名
        this.$GetData.Base_B_I({
          CTCD: this.info.CTCD
        },true,(data) => {
          this.siteInfo.CTCD = data.data[0].CTNM;
        });
        
        // 加载站点数据
        this.loadSiteData(res.data);

        var details_data = res.data;
        // console.log(details_data);
        if (details_data.CSTYPE==3) {
          var video_iframe = document.getElementById("video");
          video_iframe.src = 'em-playvideo.html?61.187.248.226:8866'+','+details_data.PUID+','+details_data.IDX+','+details_data.STNM
        }
        if (details_data.CSTYPE==1) {
          var video_iframe = document.getElementById("video");
          // details_data.WWWPath
          video_iframe.src = 'webdemo/index.html?'+details_data.PUID;
        }
        // 设置水库水情预警信息
        this.set_SKSQ_alarmInfo(this.siteInfo.STCD);
        // 设置图像历史表默认查询日期
        this.setTableDefaultDate_tuxiang();
        // 查询图像历史表数据
        this.search_tuxiang();
        // 加载取消
        this.boxLoading = false;
      });
  }
};
</script>


<style lang="less" scope>
@import "./common/common.less";
.site_detail {
  td {
    height: 32px;
    border-top: none;
    border-color: #EBEEF5;
  }

  .dt_name {
    width: 20%;
    border-left: none;
  }

  .dt_vale {
    width: 30%;
    border-right: none;
    border-left: none;
  }
}
.drawer-profile {
  font-size: @siteInfoFontSize;
  position: relative;

  .relationRow {
    margin-top: 1.25rem;
    button,
    span {
      margin-right: 1.25rem;
    }
  }
  .checkBoxItem {
    margin: 0 0.9375rem;
  }
  .huansuanInput {
    width: 60%;
  }
  .video {
    width: 100%;
  }
  .flexBox {
    display: flex;
    flex-direction: column-reverse;
    height: 13.125rem;
  }
}
</style>
