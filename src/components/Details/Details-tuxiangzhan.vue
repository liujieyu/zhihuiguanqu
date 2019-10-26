<template>
  <div v-loading="boxLoading">
    <el-tabs v-model="activeName" type="border-card">
      <!-- 站点信息 -->
      <el-tab-pane name="zhandianxinxi">
        <span slot="label">
          <i class="el-icon-tickets"></i> 站点信息
        </span>
        <div class="drawer-profile">
          <!-- 导出按钮 -->
          <Button size="small" class="outPutButton" type="success" @click="$App.developing_tip">
            <div>导出</div>
          </Button>
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
                  <td align="right" class="dt_name" style="border-bottom: none">图像按钮：</td>
                  <td align="center" class="dt_vale" style="border-bottom: none"><Button type="info" @click="$App.developing_tip" size="small">查看图片</Button></td>
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
      <!-- 图像 -->
      <el-tab-pane name="tuxiang">
        <span slot="label">
          <i class="el-icon-picture"></i> 图像
        </span>
        <div class="drawer-profile">
          <!-- 导出按钮 -->
          <Button size="small" class="outPutButton" type="success" @click="developing_tip">
            <div>导出</div>
          </Button>
          <div>
            <!-- 查询，导出行 -->
            <Row :gutter="16" type="flex" align="center">
              <!-- 开始到结束时间选择 -->
              <Col span="19">
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
                :gutter="16"
                type="flex"
                
                style="height:495px; overflow:auto"
                v-loading="table.tuxiang.loading"
              >
              <!-- justify="center" -->
                <!-- <Col span="10" v-for="item in list.imageList">
                  <img :src="item.imgUrl" alt>
                </Col>-->
                <Col v-if="table.tuxiang.Rows.length > 0" span="10" v-for="(item, index) in table.tuxiang.Rows" style="position: relative;">
                  <img
                    class="Img"
                    :src="item.url"
                    @click="$App.enlarge_img(table.tuxiang.Rows, index)"
                    width="210"
                    height="160"
                  />
                </Col>
                <Col v-show="table.tuxiang.Rows.length == 0">
                <div style="height:100%;display:flex;align-items:center;">
                  暂无数据
                </div>
                </col>
                <!-- <Col span="10">
                  <img class="Img" :src="`/guanqu/gis/pic_content?id=${info.STCD}`" @click="$App.enlarge_img(`https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2459854756,3883213966&fm=26&gp=0.jpg`)"  width="210" height="160"></img>
                </Col>
                <Col span="10">
                  <img class="Img" :src="`/guanqu/gis/pic_content?id=${info.STCD}`" @click="$App.enlarge_img(`/guanqu/gis/pic_content?id=${info.STCD}`)"  width="210" height="160"></img>
                </Col>
                <Col span="10">
                  <img class="Img" :src="`/guanqu/gis/pic_content?id=${info.STCD}`" @click="$App.enlarge_img(`/guanqu/gis/pic_content?id=${info.STCD}`)"  width="210" height="160"></img>
                </Col>-->
              </Row>
              <!-- 分割线 -->
              <div class="divider"></div>
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
            </div>
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
import { setTimeout } from "timers";
import FilterMethods from "../../assets/commonJS/FilterMethods"; // 过滤方法
import GetDataMethods from "../../assets/commonJS/GetDataMethods"; // 获取数据方法
import { timingSafeEqual } from "crypto";
export default {
  props: {
    info: {}
  },
  data() {
    return {
      //
      activeName: "tuxiang",
      siteInfo: {},
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
        // 图像
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
            // {
            //   url: `/guanqu/gis/pic_content?id=${info.STCD}`
            // },
            // {
            //   url: `/guanqu/gis/pic_content?id=${info.STCD}`
            // },
            // {
            //   url: `/guanqu/gis/pic_content?id=${info.STCD}`
            // },
            // {
            //   url: `/guanqu/gis/pic_content?id=${info.STCD}`
            // },
          ]
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
        imageList: [
          {
            imgUrl: "img/shuizha.9d256eb4.jpg"
          }
        ]
      },
      //   导出按钮加载控制
      outPutLoading: false,
      //   导出确认对话框控制
      outPutModal: false,
      // 区域加载控制
      boxLoading: false
    };
  },
  mixins: [FilterMethods, GetDataMethods],
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
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
  },

  mounted() {
    // //设置默认时间
    // var newdate = new Array();
    // var end = new Date();
    // var start = new Date();
    // var Month = start.getMonth()+1;
    // newdate[0] = start.getFullYear()+'-'+Month+'-'+start.getDate()+' 00:00:00.000';
    // newdate[1] = end;
    // this.table.tuxiang.date = newdate;

    // 区域加载中
    this.boxLoading = true;
    // console.log("图像",this.info)
    this.getCompartmentByADDVCD(data => {
      this.siteInfo.AD_NM = data[0].AD_NM;
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


    // 获取详情数据
    this.loadSiteData(this.info);

    setTimeout(() => {
      this.boxLoading = false;
    }, 500);

    // 设置图像历史表默认查询日期
    this.setTableDefaultDate_tuxiang();
    // 查询图像历史表数据
    this.search_tuxiang();
    // this.axios.get(`/guanqu/gis/details?ID=${this.info.ID}`).then(res => {
    //   // 加载站点数据
    //   // this.loadSiteData(res.data);

    //   // 加载取消
    //   this.boxLoading = false;
    // });
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
  .huansuanInput {
    width: 60%;
  }
}
</style>
