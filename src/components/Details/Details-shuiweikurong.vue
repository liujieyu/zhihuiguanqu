<template>
  <div v-loading="boxLoading">
    <el-tabs type="border-card" v-model="activeName" @tab-click>
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
              <table
                style="border: 1px solid #EBEEF5"
                border
                cellspacing="0"
                width="100%"
                class="table_detail"
              >
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
                  <td align="right" class="dt_name" style="border-bottom: none">图像按钮：</td>
                  <td align="center" class="dt_vale" style="border-bottom: none">
                    <Button type="info" @click="$App.developing_tip" size="small">查看图片</Button>
                  </td>
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
            </Row>-->
            <el-col
              style="border: 1px #EBEEF5 solid;border-radius: 2px;padding-left: 10px;padding-bottom: 20px"
            >
              <Row class="relationRow">
                <Col span="4">同时监测：</Col>
                <Col span="20">
                  <!-- <Button
                    @click="$App.developing_tip"
                    v-for="item in siteInfo.GUANLIAN"
                  >{{ item.SLNM }}</Button>-->
                  <div></div>
                </Col>
              </Row>
              <Row class="relationRow">
                <Col span="4">关联站点：</Col>
                <Col span="20">
                  <!-- <Button
                    @click="$App.developing_tip"
                    v-for="item in siteInfo.GUANLIAN"
                  >{{ item.SLNM }}</Button>-->
                  <div></div>
                </Col>
              </Row>
              <Row class="relationRow">
                <Col span="4">关联要素：</Col>
                <Col span="20">
                  <!-- <Button
                    @click="$App.developing_tip"
                    v-for="item in siteInfo.GUANLIAN"
                  >{{ item.SLNM }}</Button>-->
                  <div></div>
                </Col>
              </Row>
            </el-col>
          </div>
        </div>
      </el-tab-pane>
      <!-- 水位数据 -->
      <el-tab-pane name="shuiqingshuju">
        <span slot="label">
          <Icon type="ios-water-outline" style="font-size:20px" />水位库容
        </span>
        <div class="drawer-profile">
          <!-- 导出按钮 -->
          <Button size="small" class="outPutButton" type="success" @click="$App.developing_tip">
            <div>导出</div>
          </Button>
          <div>
            <!-- 分割线 -->
            <div class="divider"></div>
            <!-- 选项卡 -->
            <Tabs type="card">
              <!-- 表格 -->
              <TabPane label="表格">
                <!-- 查询，导出行 -->
                <Row :gutter="16" type="flex" justify="end" align="middle">
                  <Col span="2">
                    <span style="letter-spacing:2px">查询</span>
                  </Col>
                  <!-- 开始到结束时间选择 -->
                  <Col span="19">
                    <el-date-picker
                      v-model="table.shuiqing.date"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="handleDatePickerChange"
                      :picker-options="table.shuiqing.datePickerOptions[select.shuiqing_select]"
                      unlink-panels
                      :type="table.shuiqing.datePickerType"
                      size="mini"
                      style="min-width: 360px"
                    ></el-date-picker>
                  </Col>
                </Row>
                <!-- 分割线 -->
                 <div class="divider"></div>
<!--                  <Row :gutter="16" type="flex" justify="center" align="middle">-->
<!--                    <Col>-->
<!--                      4-6月汛限水位: {{yujingdata.FWL}} m &nbsp;7-9月汛限水位：{{yujingdata.FWL79}} m-->
<!--                    </Col>-->
<!--                  </Row>-->
                <!-- 分割线 -->
                <div class="divider"></div>
                <!-- 表格用于展示数据 -->
                <div>
                  <Table
                    :columns="table.shuiqing.activeColumns"
                    :data="table.shuiqing.Rows_filter"
                    :loading="table.shuiqing.loading"
                    border
                    size="small"
                    :height="table.shuiqing.height"
                    @on-sort-change="sort_change_shuiqing"
                  ></Table>
                  <!-- 分割线 -->
                  <div class="divider"></div>
                  <!-- 分页器 -->
                  <el-pagination
                    background
                    :page-size="table.shuiqing.pageSizes"
                    layout="sizes, total, prev, pager, next, jumper "
                    :page-sizes="[20, 50, 100, 200]"
                    :total="table.shuiqing.total"
                    :pager-count="5"
                    :current-page="table.shuiqing.currentPage"
                    @current-change="handleCurrentChange_shuiqing"
                    @size-change="handleSizeChange_shuiqing"
                    class="pageController"
                    small
                  ></el-pagination>
                  <!-- 分割线 -->
                  <div class="divider"></div>
                </div>
              </TabPane>
              <TabPane label="图形">
                <!-- 绘图 -->
                <div
                  id="shuiqingChart"
                  v-show="table.shuiqing.Rows_filter.length > 0"
                  :style="{width: '500px', height: '350px',margin: 'auto'}"
                ></div>
                <div
                  v-show="table.shuiqing.Rows_filter.length == 0"
                  :style="{width: '500px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                >暂无数据</div>
              </TabPane>
              <!-- 历史表选择框 -->
<!--              <Select-->
<!--                @on-change="tableTypeOnChange_shuiqing"-->
<!--                prefix="ios-calendar-outline"-->
<!--                v-model="select.shuiqing_select"-->
<!--                slot="extra"-->
<!--              >-->
<!--                <Option-->
<!--                  v-for="item in select.shuiqingList"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value"-->
<!--                  :key="item.value"-->
<!--                ></Option>-->
<!--              </Select>-->
            </Tabs>

            <!-- 分割线 -->
            <!-- <div class="divider"></div> -->
          </div>
        </div>
      </el-tab-pane>
      <!-- 预测分析 -->
      <el-tab-pane label="预测分析" name="tezhengshuiqing">
        <span slot="label">
          <Icon type="ios-speedometer-outline" style="font-size:20px" />预测分析
        </span>

        <div class="drawer-profile">
          <!-- 指标信息 -->
          <div>
            <Row class="row">
              <Col span="5" align="right">4-6月汛限水位：</Col>
              <Col span="7" align="center">{{ `${$FilterData.Float_Filter(yujingdata.FWL)} m`  || "&nbsp;" }}</Col>
              <Col span="5" align="right">7-9月汛限水位：</Col>
              <Col span="7" align="center">{{ `${$FilterData.Float_Filter(yujingdata.FWL79)} m` || "&nbsp;" }}</Col>
            </Row>
            <Row class="row last_row">
              <Col span="5" align="right">设计洪水位：</Col>
              <Col span="7" align="center">{{ `${$FilterData.Float_Filter(yujingdata.SJWL)} m` || "&nbsp;" }}</Col>
              <Col span="5" align="right">经验水位：</Col>
              <Col span="7" align="center">{{ `${$FilterData.Float_Filter(yujingdata.JYWL)} m` || "&nbsp;" }}</Col>
            </Row>
            <!-- 分割线 -->
            <div class="divider"></div>
          </div>
          <!-- 导出按钮 -->
          <Button size="small" class="outPutButton" type="success" @click="$App.developing_tip">
            <div>导出</div>
          </Button>
          <!-- 查询，导出行 -->
          <Row :gutter="16" type="flex" justify="center" align="middle">
            <Col span="2">
              <span style="letter-spacing:2px">查询</span>
            </Col>
            <!-- 开始到结束时间选择 -->
            <Col span="15">
              <el-date-picker
                v-model="table.tezhengshuiqing.date"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleDatePickerChange_tezhengshuiqing"
                :picker-options="table.tezhengshuiqing.datePickerOptions"
                unlink-panels
                type="monthrange"
                size="mini"
                style="min-width: 360px"
              ></el-date-picker>
            </Col>
            <Col span="3"></Col>
          </Row>
          <!-- 分割线 -->
          <div class="divider"></div>

          <!-- 表格用于展示数据 -->
          <div>
            <Table
              :columns="table.tezhengshuiqing.columns"
              :data="table.tezhengshuiqing.Rows_filter"
              :loading="table.tezhengshuiqing.loading"
              border
              size="small"
              :height="table.tezhengshuiqing.height"
            ></Table>
            <!-- 分割线 -->
            <div class="divider"></div>
            <!-- 分页器 -->
            <el-pagination
              background
              :page-size="table.tezhengshuiqing.pageSizes"
              layout="sizes, total, prev, pager, next, jumper "
              :page-sizes="[20, 50, 100, 200]"
              :total="table.tezhengshuiqing.total"
              :pager-count="5"
              :current-page="table.tezhengshuiqing.currentPage"
              @current-change="handleCurrentChange_tezhengshuiqing"
              @size-change="handleSizeChange_tezhengshuiqing"
              class="pageController"
              small
            ></el-pagination>
          </div>
          <!-- 分割线 -->
          <div class="divider"></div>
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
import { type } from "os";
import { types } from "util";
import { stat } from "fs";
import { filter } from "minimatch";
export default {
  props: {
    info: {}
  },
  data() {
    return {
      shuiqing_select: '',
      // 激活标签栏
      activeName: "shuiqingshuju",
      // 站点
      siteInfo: {},
      //   多选框对象
      checkBox: {},
      //   选择框对象
      select: {
        // 当前激活的水位数据快速查询选项
        activeQuickSearchList: [],
        // 查询绑定值
        select: "rec6",
        // 日期选择器绑定值
        shuiqing_datePicker: null,
        // 水位数据历史表
        shuiqingList: [
          {
            value: "historyTable",
            size: "small",
            // iconType: "logo-facebook",
            label: "历史表"
          },
          {
            value: "hourTable",
            size: "small",
            // iconType: "logo-facebook",
            label: "小时表"
          },
          {
            value: "dayTable",
            size: "small",
            // iconType: "logo-facebook",
            label: "日表"
          },
          {
            value: "monthTable",
            size: "small",
            // iconType: "logo-facebook",
            label: "月表"
          }
        ],
        // 水位数据历史表绑定值
        shuiqing_select: "historyTable"
      },
      // 表格
      table: {
        // 水情
        shuiqing: {
          // 表头设置
          columns: {
            // 历史表
            historyTable: [
              {
                type: "index",
                title: " ",
                width: 60,
                align: "center",
                // 自定义序号
                indexMethod(item) {
                  var index =
                    item._index + 1 + (item.currentPage - 1) * item.pageSizes;
                  return index;
                },
                ellipsis: true
              },
              {
                title: "时间",
                key: "TM",
                width: 175,
                align: "center",
                sortable: "custom"
              },
              {
                title: "水位(m)",
                width: 150,
                key: "RZ",
                align: "center",
                sortable: "custom"
              },
              {
                title: "库容(m3)",
                width: 150,
                key: "STCP",
                align: "center",
                sortable: "custom"
              },
            ]
          },
          // 正在激活的表头
          activeColumns: [],
          // 表体内容
          Rows: [],
          // 过滤后的表体内容
          Rows_filter: [],
          // 日期时间选择器的选项配置
          datePickerOptions: {
            historyTable: {
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
            hourTable: {
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
            dayTable: {
              shortcuts: [
                {
                  text: "最近10天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 10);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近15天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近30天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近60天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                    picker.$emit("pick", [start, end]);
                  }
                },
                {
                  text: "最近90天",
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [start, end]);
                  }
                }
              ]
            },
            monthTable: {
              shortcuts: []
            }
          },
          // 日期时间选择器类型
          datePickerType: "date",
          // 日期时间选择器值
          date: null,
          // 排序
          sort: null,
          // 表格是否加载中
          loading: false,
          // 总条数
          total: 0,
          // 当前页
          currentPage: 1,
          // 每页显示数量
          pageSizes: 20,
          // 表格高度
          height: 430
        },
        // 特征水位
        tezhengshuiqing: {
          // 表头设置
          columns: [
            {
              title: " ",
              type: "index",
              width: 50,
              align: "center",
              // 自定义序号
              indexMethod(item) {
                var index =
                  item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                return index;
              },
              ellipsis: true
            },
            {
              // width: 100,
              title: "最高水位时间",
              key: "TMHZ",
              align: "center",
              sortable: true
            },
            {
              // width: 100,
              title: "年最高水位(m)",
              key: "THZ",
              align: "center",
              sortable: true
            }
          ],
          // 表体内容
          Rows: [],
          // 过滤后的表体内容
          Rows_filter: [],
          // 总条数
          total: 0,
          // 表格是否加载中
          loading: false,
          // 当前页
          currentPage: 1,
          // 日期时间选择器值
          date: null,
          // 日期时间选择器的选项配置
          datePickerOptions: {
            shortcuts: [
              {
                text: "最近5年",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近3年",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近2年",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 2);
                  picker.$emit("pick", [start, end]);
                }
              },
              {
                text: "最近1年",
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 1);
                  picker.$emit("pick", [start, end]);
                }
              }
            ]
          },
          // 表格高度
          height: 410,
          // 每页显示数量
          pageSizes: 20,
          alarmData: {
            FWL: "", // 4-6月汛限水位
            FWL79: "", // 7-9月汛限水位
            SJWL: "", // 设计洪水位
            JYWL: "" // 经验水位
          }
        }
      },
      // 图形
      chart: {
        shuiqing: null
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
      //预警数据
      yujingdata: {
        FWL: null, // 4-6月汛限水位
        FWL79: null, // 7-9月汛限水位
        SJWL: null, // 设计洪水位
        JYWL: null // 经验水位
      },
      tableType: ''
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
    //   确认导出
    outPutSure() {
      this.outPutSiteInfo();
    },
    // 日期时间选择器变化触发事件
    // handleDatePickerChange(val, valType) {
    //   var timeInterval = `${val[0].replace(/\//g, "-")},${val[1].replace(
    //     /\//g,
    //     "-"
    //   )}`;
    //   this.select.shuiqing_datePicker = timeInterval;
    // },
    datePicke_on_ok(tableType) {
      this.table["shuiqing"].currentPage = 1; // 重置当前页
      this.table.shuiqing.loading = true; // 表格加载中
      var body = {
        STCD: this.siteInfo.STCD,
        TM: `bt,${this.select.shuiqing_datePicker}`
      };
      var pageSizes = this.table.shuiqing.pageSizes;
      var currentPage = 1;
      this.getTableData_shuiqing(
        tableType,
        pageSizes,
        currentPage,
        body,
        data => {
          this.setTableTotal("shuiqing", data.total); // 根据返回的total数量, 设置表格总条数
          this.setTableData("shuiqing", data.data); // 更新水情历史数据表的数据
          this.table.shuiqing.loading = false; // 取消表格加载
        }
      );
    },
    // 查询
    search_shuiqing(tableType) {
      var tableType = tableType || this.select.shuiqing_select;
      this.letTableLoading("shuiqing"); // 表格加载中
      console.log('+++++++++++++'+tableType);



      // 传递参数
      var body = {
        STCD: this.siteInfo.STCD,
        _page: this.table.shuiqing.currentPage || 1,
        _page_size: this.table.shuiqing.pageSizes || 20
      };

      // 如果有选择排序，则传递排序参数
      if (this.table.shuiqing.sort) {
        var _sort = this.$FilterData.sort_Filter(this.table.shuiqing.sort);
        if (_sort) {
          body._orderby = _sort;
        }
      }

      // 如果有选择日期进行查询，根据表格类型传递参数
      if (this.table.shuiqing.date) {
        switch (tableType) {
          case "historyTable":
            var DTT = this.$FilterData
              .elDatePicker_Filter(this.table.shuiqing.date)
              .split(",");
            body.Time_min = DTT[1];
            body.Time_max = DTT[2];
            break;
          case "dayTable":
            var DTT = this.$FilterData
              .elDatePicker_Filter(this.table.shuiqing.date)
              .split(",");
            body.Time_min = DTT[1].substr(0,10);
            body.Time_max = DTT[2].substr(0,10);
            break;
          case "hourTable":
            console.log('~~~~~~~~~~~~~~~~~~~~~~~'+tableType);
            var DTT = this.$FilterData
              .elDatePicker_Filter(this.table.shuiqing.date)
              .split(",");
            body.Time_min = DTT[1];
            body.Time_max = DTT[2];
            break;
          case "monthTable":
            var DTT = this.$FilterData.elDatePicker_Filter(this.table.shuiqing.date,"monthTable").split(",");
            body.Time_min = DTT[1].substring(0,7);
            body.Time_max = DTT[2].substring(0,7);
            // body.YE = this.$FilterData.elDatePicker_Filter(
            //   this.table.shuiqing.date,
            //   "monthTable"
            // ).YE;
            // body.MON = this.$FilterData.elDatePicker_Filter(
            //   this.table.shuiqing.date,
            //   "monthTable"
            // ).MON;
            break;
        }
      }

      // 获取水位库容历史数据
      this.$GetData.Survey_History_SWKR(
        tableType,
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
          this.setTableTotal("shuiqing", data.total); // 根据返回的total数量, 设置表格总条数
          this.setTableData("shuiqing", data.data); // 更新水情历史数据表的数据
          body._page_size = 999999999;
          body._page = 1;
          this.$GetData.Survey_History_SWKR(
            tableType,
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
              this.createChart_shuiqingshuju(
                "shuiqingChart",
                tableType,
                chartData.data
              ); // 水情表格
            }
          );

          this.cancelTableLoading("shuiqing"); // 取消表格加载
        }
      );
    },
    // 设置表格总条数
    setTableTotal(tableName, total) {
      this.table[tableName].total = total;
    },
    // 表格加载中
    letTableLoading(tableName) {
      this.table[tableName].loading = true;
    },
    // 取消表格加载
    cancelTableLoading(tableName) {
      this.table[tableName].loading = false;
    },
    // 绘图
    createChart_guanxiquxian(idName) {
      let myChart = this.$echarts.init(document.getElementById(idName));

      myChart.setOption({
        title: {
          // text: this.info.STNM
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["流量", "水位"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
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
            name: "流量 m³/s",
            type: "value",
            axisLabel: {
              formatter: "{value}"
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
            data: [11, 11, 15, 13, 12, 13, 10],
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "水位",
            type: "line",
            data: [1, 4, 2, 5, 3, 2, 0],
            yAxisIndex: 1,
            markLine: {
              data: [{ type: "average", name: "平均值" }],
              effect: {
                show: false,
                loop: true,
                period: 15,
                scaleSize: 10,
                color: null,
                shadowColor: null,
                shadowBlur: null
              }
            }
          }
        ]
      });
    },

    // 制图
    createChart_shuiqingshuju(id, tableType, data) {
      var ele = document.getElementById(id);

      if (data.length > 0) {
        var echartData = this.$App.transform_SWKR_data_into_ehart_data(
          data,
          tableType,
          true
        ); // 水位库容历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        console.log(echartData);
        console.log(echartData.x.list);
        if (!this.chart.shuiqing) {
          this.chart.shuiqing = this.$echarts.init(ele);
        }
        this.chart.shuiqing.setOption({
          title: {
            text: echartData.chartName
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: [echartData.y1.name, echartData.y2.name],
            y: "bottom"
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          animation: true,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: echartData.x.list,
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
                    console.log(index);
                    var tick = Math.round(listLength / 4);
                    // console.log('1575listLength',listLength);
                    // console.log('1576tick',tick);
                    let a = (index + 1) % tick;
                    console.log(a);
                    console.log((index + 1) % tick === 0);
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
              name: `水位 m`,
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
            },
            {
              name: echartData.y2.name,
              type: "line",
              data: echartData.y2.list
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
    // 处理页码切换_水位数据
    handleCurrentChange_shuiqing(index) {
      this.table["shuiqing"].currentPage = index;
      this.search_shuiqing(this.shuiqing_select);
    },
    // 处理页码切换_关系曲线
    handleCurrentChange_guanxiquxian(index) {
      this.table["guanxiquxian"].currentPage = index;
      this.search_guanxiquxian();
    },
    // 处理页码切换_特征水位
    handleCurrentChange_tezhengshuiqing() {
      this.table["tezhengshuiqing"].currentPage = index;
      this.search_tezhengshuiqing();
    },
    // 处理每页显示条数切换_水位数据
    handleSizeChange_shuiqing(pageSizes) {
      this.table["shuiqing"].pageSizes = pageSizes;
      this.table["shuiqing"].currentPage = 1;
      this.search_shuiqing(this.shuiqing_select);
    },
    // 处理每页显示条数切换_关系曲线
    handleSizeChange_guanxiquxian(pageSizes) {
      this.table["guanxiquxian"].pageSizes = pageSizes;
      this.table["guanxiquxian"].currentPage = 1;
      this.search_guanxiquxian();
    },
    // 处理每页显示条数切换_特征水位
    handleSizeChange_tezhengshuiqing(pageSizes) {
      this.table["tezhengshuiqing"].pageSizes = pageSizes;
      this.table["tezhengshuiqing"].currentPage = 1;
      this.search_tezhengshuiqing();
    },
    // 分页过滤
    pageFilter(currentPage, pageSizes, tableName) {
      // 截取数组
      var newList = this.table[tableName].Rows_filter.slice(
        (currentPage - 1) * pageSizes,
        currentPage * pageSizes
      );

      return newList;
    },
    // 水情历史数据表 当前正在激活的表头
    setActiveColumns_shuiqing(tableType) {
        console.log(this.info);
        console.log(tableType);
        console.log(this.table.shuiqing.columns);
      this.table.shuiqing.activeColumns = this.table.shuiqing.columns[tableType];
      this.select.shuiqing_select = tableType
      console.log(this.table.shuiqing.activeColumns);
    },
    // 切换 水情历史数据表类型
    tableTypeOnChange_shuiqing(tableType) {
      console.log(this.table);
      console.log('............................'+tableType);
      this.tableType = tableType
      this.table["shuiqing"].currentPage = 1;
      this.table["shuiqing"].date = null;
      this.table["shuiqing"].sort = null;
        console.log(this.table);
      this.setDatePickerType_shuiqing(tableType); // 设置日期时间选择器的类型
      // this.select["shuiqing_select"] = tableType; // 设置选中的表
      // this.setSelectOption_quickSearch(tableType); // 设置数据表快速查询选择框内容
      this.setActiveColumns_shuiqing(tableType); // 设置水情历史数据表 当前激活的表头
      this.table.shuiqing.loading = true; // 表格加载中
      if (this[`setTableDefaultDate_shuiqing_${tableType}`]) {
        this[`setTableDefaultDate_shuiqing_${tableType}`]();
      }
      // 获取对应水情历史数据表的数据
      this.search_shuiqing(tableType);
    },
    // 设置水位数据历史表默认查询日期
    setTableDefaultDate_shuiqing_historyTable() {
      const end = new Date();
      const start = zeroPointOfTheDay();

      var timeSlot = [start, end];

      this.setTableDate("shuiqing", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 设置水位数据小时表默认查询日期
    setTableDefaultDate_shuiqing_hourTable() {
      const end = new Date();
      const start = zeroPointOfTheDay();

      var timeSlot = [start, end];

      this.setTableDate("shuiqing", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 设置水位数据日表默认查询日期
    setTableDefaultDate_shuiqing_dayTable() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);

      var timeSlot = [start, end];

      this.setTableDate("shuiqing", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 设置水位数据月表默认查询日期
    setTableDefaultDate_shuiqing_monthTable() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 160);

      var timeSlot = [start, end];

      this.setTableDate("shuiqing", timeSlot);

      function zeroPointOfTheDay() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
    },
    // 设置日期时间选择器的类型
    setDatePickerType_shuiqing(tableType) {
      var datePickerType;
      switch (tableType) {
        case "historyTable":
          datePickerType = "datetimerange";
          break;
        case "hourTable":
          datePickerType = "datetimerange";
          break;
        case "dayTable":
          datePickerType = "daterange";
          break;
        case "monthTable":
          datePickerType = "monthrange";
          break;
      }
      this.table["shuiqing"].datePickerType = datePickerType;
    },
    // 设置数据表快速查询选择框内容
    setSelectOption_quickSearch(tableType) {
      this.select.activeQuickSearchList = this.select.quickSearch[tableType];
      this.select.select = this.select.activeQuickSearchList[0]
        ? this.select.activeQuickSearchList[0].value
        : null; // 设置默认值为第一项
    },
    // 获取特征水位表格的数据
    getTableData_tezhengshuiqing(
      pageSizes,
      currentPage,
      body,
      callback,
      callback_beforeFilter
    ) {
      this.axios
        .get(
          `/guanqu/admin/ST_G_CQORD?_page_size=${pageSizes ||
            20}&_page=${currentPage || 1}`,
          {
            params: body
          }
        )
        .then(res => {
          if (typeof callback_beforeFilter == "function") {
            callback_beforeFilter({
              data: res.data.rows || [],
              total: res.data.total || 0
            });
          }
          console.log("tezhengshuiqing", res);
          // 水位数据过滤
          var data = res.data.rows.map(val => {
            val.currentPage = this.table.shuiqing.currentPage; // 添加数据当前页码
            val.pageSizes = this.table.shuiqing.pageSizes; // 添加当前每页条数到数据
            val.TMMXQ = this.dateFilter(val.TMMXQ); // 日期过滤
            val.TMXQ = this.Z_Filter(val.TMXQ, 3); // 平均流量过滤
            val.YMXQZ = this.Z_Filter(val.YMXQZ); // 平均水位过滤
            val.WQ = this.Z_Filter(val.WQ, 3); // 小时累计水量过滤

            return val;
          });
          if (typeof callback == "function") {
            callback({
              data: data,
              total: res.data.total
            });
          }
        });
    },
    // 获取特征水位预警信息表的数据
    getTableData_tezhengshuiqing_Alarm(body, callback, callback_beforeFilter) {
      this.axios
        .get(`/guanqu/admin/ST_Canal_Alarm`, {
          params: body
        })
        .then(res => {
          var data = res.data.rows;
          if (typeof callback_beforeFilter == "function") {
            callback_beforeFilter(res);
          }
          // 水位数据过滤
          var data = res.data.rows.map(val => {
            val.Q = this.Z_Filter(val.Q, 3); // 流量过滤
            val.Z = this.Z_Filter(val.Z); // 水位过滤
            val.JYQ = this.Z_Filter(val.JYQ, 3); // 预警流量过滤
            val.JYZ = this.Z_Filter(val.JYZ); // 预警水位过滤

            return val;
          });
          if (typeof callback == "function") {
            callback(data);
          }
        });
    },
    // 更新 XX 表格的数据
    setTableData(tableName, data) {
      this.table[tableName].Rows_filter = data;
    },
    // 获取对应关系曲线数据表的数据
    getTableData_guanxiquxian(callback) {
      this.axios
        .get(`/guanqu/admin/ST_ZQRL_B`, {
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
    setTableData_guanxiquxian(data) {
      this.table.guanxiquxian.Rows_filter = data;
    },
    // 根据关联编号获取关联站点
    getRelateSiteByRelateCode(callback) {
      var RELATECODE = this.info.RELATECODE;
      if (RELATECODE && RELATECODE != 0) {
        this.axios
          .get(`/guanqu/admin/ST_STBPRP_B`, {
            params: {
              RELATECODE: RELATECODE
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
    // 特征水位表格查询
    search_tezhengshuiqing() {
      // this.letTableLoading("tezhengshuiqing"); // 表格加载中
      // 传递站码参数
      var body = {
        STCD: this.siteInfo.STCD,
        _page: this.table.tezhengshuiqing.currentPage,
        _page_size: this.table.tezhengshuiqing.pageSizes
      };

      if (this.table.tezhengshuiqing.date) {
        body.YR = this.$FilterData.elDatePicker_Filter(
          this.table.tezhengshuiqing.date,
          "maxQTable"
        );
      }

      // this.$GetData.Survey_History_SWKR(
      //   "maxZ",
      //   body,
      //   {
      //     default: true,
      //     myFilter: data => {
      //       data.map(val => {
      //         val.currentPage = body._page;
      //         val.pageSizes = body._page_size;
      //         return val;
      //       });
      //       return data;
      //     }
      //   },
      //   data => {
      //     this.setTableTotal("tezhengshuiqing", data.total); // 根据返回的total数量, 设置表格总条数
      //     this.setTableData("tezhengshuiqing", data.data); // 更新特征水位数据表的数据
      //     this.cancelTableLoading("tezhengshuiqing"); // 取消表格加载
      //   }
      // );

      // // 获取特征水位表格数据
      // this.getTableData_tezhengshuiqing(pageSizes, currentPage, body, data => {

      // });
    },
    // 设置特征水位预警信息数据
    setAlarmData_tezhengshuiqing(data) {
      this.table.tezhengshuiqing.alarmData = data;
    },
    // 处理日期时间选择器确定事件_水位数据
    handleDatePickerChange(item) {
      this.table.shuiqing.currentPage = 1;
      this.shuiqing_select = this.tableType
      console.log(this.shuiqing_select);
      this.search_shuiqing(this.shuiqing_select);
    },
    // 设置水位库容预警信息
    // set_SKSQ_alarmInfo(STCD) {
    //   console.warn("set_SKSQ_alarmInfo",STCD)
    //   this.$GetData.Survey_History_SWKR(
    //     "alarmTable",
    //     {
    //       STCD: STCD,
    //     },
    //     true,
    //     data => {
    //       var yujingdata = data.data[0];
    //
    //       this.yujingdata.FWL = yujingdata.FWL;
    //       this.yujingdata.FWL79 = yujingdata.FWL79;
    //       this.yujingdata.SJWL = yujingdata.SJWL;
    //       this.yujingdata.JYWL = yujingdata.JYWL;
    //       // 如果查询日期是 4-6 月，如果是 7-9 月
    //       // if (is_Between_4_and_6(date)) {
    //       //   this.yujingdata.FWL = yujingdata.FWL
    //       // } else if (is_Between_7_and_9(date)) {
    //       //   this.yujingdata.FWL = yujingdata.FWL79
    //       // }
    //       // console.log("Survey_History_SWKR", data.data)
    //     }
    //   );
    //
    //   // function is_Between_4_and_6 (date) {
    //   //   var start, start_Year, start_Month, start_Day, start_Hours, start_Minutes;
    //   //           start = date[0];
    //   //           start_Year = start.getFullYear();
    //   //           start_Month = addZero((start.getMonth() + 1));
    //   //           start_Day = addZero(start.getDate());
    //   //           start_Hours = addZero(start.getHours());
    //   //           start_Minutes = addZero(start.getMinutes());
    //
    //   //           start = `${start_Year}-${start_Month}-${start_Day} ${start_Hours}:${start_Minutes}`;
    //
    //   //           var end, end_Year, end_Month, end_Day, end_Hours, end_Minutes;
    //   //           end = date[1];
    //   //           end_Year = end.getFullYear();
    //   //           end_Month = addZero(end.getMonth() + 1);
    //   //           end_Day = addZero(end.getDate());
    //   //           end_Hours = addZero(end.getHours());
    //   //           end_Minutes = addZero(end.getMinutes());
    //   //   console.log("date", date)
    //   // }
    //
    //   // function is_Between_7_and_9 (date) {
    //
    //   // }
    // },

    handleDatePickerChange_tezhengshuiqing() {
      this.table.tezhengshuiqing.currentPage = 1;
      this.search_tezhengshuiqing();
    },
    handleDatePickerChange_guanxiquxian(item) {
      console.log("item", item);
      this.search_guanxiquxian();
    },
    // 设置 xx表格 时间选择器值
    setTableDate(tableName, val) {
      this.table[tableName].date = val;
    },
    // 特征水情表默认查询时间
    setTableDefaultDate_tezhengshuiqing() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5);

      var timeSlot = [start, end];

      this.setTableDate("tezhengshuiqing", timeSlot);
    },
    // 排序
    sort_change_shuiqing(item) {
      this.table.shuiqing.sort = item;

      this.search_shuiqing(this.shuiqing_select);
    }
  },
  mounted() {
    // 组件加载中
    console.log(this.info);
      this.componentLoading();

    console.log('1834',this.info.rowinfo.tableType.swkr);
    this.shuiqing_select = this.info.rowinfo.tableType.swkr;

    // 获取详情数据
    this.axios
      .get(`/guanqu/table/details?ID=${this.info.rowinfo.STCD}&pk=STCD`)
      .then(res => {
        //获取预警数据
        this.axios.get('/guanqu/table/ST_RSV_Alarm?STCD='+res.data.STCD).then(res =>{
            console.log(res);
            this.yujingdata = res.data.list[0];
          this.yujingdata.FWL = this.Z_Filter(this.yujingdata.FWL);
          this.yujingdata.FWL79 = this.Z_Filter(this.yujingdata.FWL79);
        });

        // 站点信息
        // 根据关联编号获取关联站点
        this.getRelateSiteByRelateCode(data => {
          console.log("RelateSite", data);
        });
        // 根据行政区划码获取行政区划名
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
        console.log(res.data);
        // 加载站点数据
        this.loadSiteData(res.data);
        // 加载取消
        this.cancelComponentLoading();
        // 水位数据
          this.tableTypeOnChange_shuiqing(this.info.rowinfo.tableType.swkr); // 设置 默认的水情历史数据表
        // 关系曲线
        // this.search_guanxiquxian();
        // 特征水位最大流量表数据
        // if (this.setTableDefaultDate_tezhengshuiqing) {
        //   this.setTableDefaultDate_tezhengshuiqing(); // 默认查询日期
        // }
        this.search_tezhengshuiqing();

        // this.getTableData_tezhengshuiqing_Alarm(
        //   {
        //     STCD: this.siteInfo.STCD
        //   },
        //   data => {
        //     this.setAlarmData_tezhengshuiqing(data[0]);
        //   }
        // );
      });
  }
};
</script>


<style lang="less" scope>
@import "./common/common.less";
.drawer-profile {
  font-size: @siteInfoFontSize;
  position: relative;
  .outPutButton {
    position: absolute;
    right: -10px;
    top: -45px;
    z-index: 2;
  }
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
}
</style>
