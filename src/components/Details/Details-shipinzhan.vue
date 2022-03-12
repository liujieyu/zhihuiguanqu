<template>
  <div v-loading="boxLoading">
    <el-tabs v-model="activeName" type="border-card">
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
                <tr>
                  <td align="right" class="dt_name" style="border-bottom: none">录入时间：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5;border-bottom: none"
                  ></td>
                  <td align="right" class="dt_name" style="border-bottom: none"></td>
                  <td align="center" class="dt_vale" style="border-bottom: none">
                  </td>
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
                  <el-tag  type="info" effect="dark" size="small">实时预警雨量</el-tag>
                </td>
                  </tr>
                <tr>
                  <td align="right" class="dt_name">预警等级：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ jiangyu_warm.LEVEL || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">1小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                  >{{ jiangyu_warm.RAIN1 || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">3小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ jiangyu_warm.RAIN3 || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">6小时降雨：</td>
                  <td align="center" class="dt_vale">{{ jiangyu_warm.RAIN6 || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">12小时降雨：</td>
                  <td
                    align="center"
                    class="dt_vale"
                    style="border-right: 1px solid #EBEEF5"
                  >{{ jiangyu_warm.RAIN12 || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">24小时降雨：</td>
                  <td align="center" class="dt_vale">{{ jiangyu_warm.RAIN24 || "&nbsp;" }}</td>
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
        </div>
      </el-tab-pane>
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
              <!-- 操作区this.siteInfo -->
              <!-- <Col span="7">
                <div class="flexBox">
                  <div class="direction">
                    <Icon type="md-arrow-back"/>
                    <Icon type="md-arrow-down"/>
                    <Icon type="md-arrow-forward"/>
                    <Icon type="md-arrow-up"/>
                  </div>
                </div>
              </Col> -->
            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>
            <!-- <div>
              <Row class="relationRow">
                <Col span="8">关联的监测要素</Col>
                <Col span="16">
                  <span>流量 10m³/s</span>
                  <span>水位 1.5m</span>
                  <span>闸门开度 1m</span>
                </Col>
              </Row>
              <Row class="relationRow">
                <Col span="8">关联的站点</Col>
                <Col span="16">
                无
                </Col>
              </Row>
            </div> -->
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
      //   多选框对象
      checkBox: {
        shuiqingList: [
          {
            value: "historyTable",
            size: "large",
            // iconType: "logo-facebook",
            title: "历史表"
          },
          {
            value: "hourTable",
            size: "large",
            // iconType: "logo-facebook",
            title: "小时表"
          },
          {
            value: "dayTable",
            size: "large",
            // iconType: "logo-facebook",
            title: "日表"
          },
          {
            value: "nightTable",
            size: "large",
            // iconType: "logo-facebook",
            title: "月表"
          }
        ],
        // 水情多选框绑定值
        shuiqing_social: ["historyTable", "hourTable", "dayTable", "nightTable"]
      },
      //   选择框对象
      select: {
        searchList: [
          {
            value: "quick",
            label: "快速查询"
          },
          {
            value: "vague",
            label: "模糊查询"
          }
        ]
      },
      // 表格数据
      table: {
        // 水情
        shuiqing: {
          // 表头设置
          columns: [
            {
              title: "序号",
              type: "index",
              width: 80,
              align: "center"
            },
            {
              title: "时间",
              key: "date",
              // width: 100,
              align: "center"
            },
            {
              title: "水位(m)",
              width: 110,
              key: "waterLever",
              align: "center"
            },
            {
              width: 120,
              title: "流量(m³/s)",
              key: "flowLever",
              align: "center"
            }
          ],
          // 表体内容
          Rows: [
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            },
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            },
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            }
          ],
          // 表格是否加载中
          loading: false
        },
        // 关系曲线
        guanxiquxian: {
          // 表头设置
          columns: [
            {
              title: "序号",
              key: "index",
              width: 100,
              align: "center"
            },
            {
              title: "测站编码",
              key: "date",
              // width: 100,
              align: "center"
            },
            {
              title: "水位",
              width: 100,
              key: "waterLever",
              align: "center"
            },
            {
              title: "流量(m³/s)",
              key: "flowLever",
              align: "center"
            },
            {
              width: 100,
              title: "启用标志",
              key: "flowLever",
              align: "center"
            },
            {
              width: 100,
              title: "备注",
              key: "flowLever",
              align: "center"
            }
          ],
          // 表体内容
          Rows: [
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            },
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            },
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            }
          ],
          // 表格是否加载中
          loading: false
        },
        // 特征水位
        tezhengshuiqing: {
          // 表头设置
          columns: [
            {
              title: "序号",
              key: "index",
              width: 100,
              align: "center"
            },
            {
              title: "测站编码",
              key: "date",
              // width: 100,
              align: "center"
            },
            {
              title: "最大流量时间",
              width: 130,
              key: "waterLever",
              align: "center"
            },
            {
              title: "年最大流量(m³/s)",
              key: "flowLever",
              align: "center"
            },
            {
              width: 100,
              title: "水位",
              key: "flowLever",
              align: "center"
            }
          ],
          // 表体内容
          Rows: [
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            },
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            },
            {
              index: 1,
              date: "2019-4-18",
              waterLever: "10",
              flowLever: "11"
            }
          ],
          // 表格是否加载中
          loading: false
        }
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
    // 绘图
    createChart(idName) {
      let myChart = this.$echarts.init(document.getElementById(idName));

      myChart.setOption({
        title: { text: "水位" },
        tooltip: {},
        xAxis: {
          data: ["闸阀前", "闸阀后"]
        },
        yAxis: {
          name: "单位：米"
        },
        series: [
          {
            name: "水位",
            type: "bar",
            data: [5, 10]
          }
        ]
      });
    },
    // 加载表格数据
    loadTableData(list, data) {
      this.table[list].Rows = data;
      console.log('表格',this.table[list].Rows);
    },
    // 加载站点数据
    loadSiteData(data) {
      this.siteInfo = data;
      console.log('站点',this.siteInfo);
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
     var level=0;
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
    }
    if(level==1){
      this.jiangyu_warm.LEVEL="黄色预警";
    }
    if(level==2){
      this.jiangyu_warm.LEVEL="橙色预警";
    }
    if(level==3){
      this.jiangyu_warm.LEVEL="红色预警";
    }
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
        })
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
        // 取数据的条数
        // var count = 0
        // for (let key in res.data) {
        //   count++
        // }
        // alert(count)
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
