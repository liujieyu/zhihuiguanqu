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
                                    >{{ siteInfo.STNM || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">国家定类：</td>
                                    <td
                                            align="center"
                                            class="dt_vale"
                                    >{{ this.STTP_Filter(siteInfo.STTP) || "&nbsp;" }}
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">等级：</td>
                                    <td
                                            align="center"
                                            class="dt_vale"
                                            style="border-right: 1px solid #EBEEF5"
                                    >{{ this.$FilterData.STGR_Filter(siteInfo.STGR) || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">行政区划：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.AD_NM || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">经度：</td>
                                    <td
                                            align="center"
                                            class="dt_vale"
                                            style="border-right: 1px solid #EBEEF5"
                                    >{{ siteInfo.LGTD || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">纬度：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.LTTD || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">站址：</td>
                                    <td
                                            align="center"
                                            class="dt_vale"
                                            style="border-right: 1px solid #EBEEF5"
                                    >{{ siteInfo.STLC || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">水系：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.HNNM || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">流域：</td>
                                    <td
                                            align="center"
                                            class="dt_vale"
                                            style="border-right: 1px solid #EBEEF5"
                                    >{{ siteInfo.CTCD || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">河流：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.RVCD || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">建站日期：</td>
                                    <td
                                            align="center"
                                            class="dt_vale"
                                            style="border-right: 1px solid #EBEEF5"
                                    >{{ siteInfo.ESSTDT || "&nbsp;" }}
                                    </td>
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
            <!-- 降雨数据 -->
            <el-tab-pane name="shuiqingshuju">
        <span slot="label">
          <Icon type="ios-water-outline" style="font-size:20px"/>降雨数据
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
                                                :picker-options="table.shuiqing.datePickerOptions[select.yuqing_select]"
                                                unlink-panels
                                                :type="table.shuiqing.datePickerType"
                                                size="mini"
                                                style="min-width: 360px"
                                                v-show="table.shuiqing.datePickerType != 'yearrange'"
                                        ></el-date-picker>

<!--                                        旬表-->
<!--                                        <div class="div_tenDay" v-show="table.shuiqing.datePickerType == 'tenDaysrange'">-->
<!--                                            <el-date-picker-->
<!--                                                    class="wAh"-->
<!--                                                    size="mini"-->
<!--                                                    v-model="table.shuiqing.tenDays_m"-->
<!--                                                    value-format="yyyy-mm"-->
<!--                                                    type="month"-->
<!--                                                    placeholder="选择月">-->
<!--                                            </el-date-picker>-->
<!--                                            <el-select size="mini" @change="search_yuqing('tenDaysrange')" v-model="select.xun_select" placeholder="选择旬">-->
<!--                                                <el-option-->
<!--                                                        v-for="item in select.xunList"-->
<!--                                                        :key="item.value"-->
<!--                                                        :label="item.label"-->
<!--                                                        :value="item.value">-->
<!--                                                </el-option>-->
<!--                                            </el-select>-->
<!--                                        </div>-->


<!--                                        年表-->
                                        <div class="div_year" v-show="table.shuiqing.datePickerType == 'yearrange'">
                                            <el-date-picker
                                                    class="wAh"
                                                    size="mini"
                                                    v-model="table.shuiqing.start_year"
                                                    value-format="yyyy"
                                                    type="year"
                                                    placeholder="选择年">
                                            </el-date-picker>
                                             &nbsp;&nbsp;至&nbsp;&nbsp;
                                            <el-date-picker
                                                    class="wAh"
                                                    size="mini"
                                                    v-model="table.shuiqing.end_year"
                                                    type="year"
                                                    value-format="yyyy"
                                                    placeholder="选择年">
                                            </el-date-picker>

                                            <el-button style="margin-left: 20px"
                                                       type="primary" @click="search_yuqing('yearTable')" size="mini" plain>查询</el-button>
                                        </div>
                                    </Col>
                                </Row>
                                <!-- 分割线 -->
                                <div class="divider"></div>
                                <Row :gutter="16" type="flex" justify="end" align="middle">
                                    <Col span="8">
                                        累计降雨:{{jiangyu_tongji.rainSum}}mm
                                    </Col>
                                    <Col span="8">
                                        平均{{biao_yuqing}}降雨:{{jiangyu_tongji.rainVag}}mm
                                    </Col>
                                    <Col span="8">
                                        最大{{biao_yuqing}}降雨:{{jiangyu_tongji.rainMax}}mm
                                    </Col>
                                </Row>
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
                                <div v-show="table.shuiqing.Rows_filter.length > 0" id="shuiqingChart" :style="{width: '500px', height: '350px',margin: 'auto'}"></div>
                                <div
                                        v-show="table.shuiqing.Rows_filter.length == 0"
                                        :style="{width: '500px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                                >暂无数据
                                </div>
                            </TabPane>
                            <!-- 历史表选择框 -->
                            <Select
                                    @on-change="tableTypeOnChange_shuiqing"
                                    prefix="ios-calendar-outline"
                                    v-model="select.yuqing_select"
                                    slot="extra"
                            >
                                <Option
                                        v-for="item in select.yuqingList"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                ></Option>
                            </Select>
                        </Tabs>

                        <!-- 分割线 -->
                        <!-- <div class="divider"></div> -->
                    </div>
                </div>
            </el-tab-pane>
            <!-- 特征雨量 -->
            <el-tab-pane label="特征雨量" name="tezhengyuliang">
        <span slot="label">
          <Icon type="ios-speedometer-outline" style="font-size:20px"/>特征雨量
        </span>

                <div class="drawer-profile">
                    <!-- 指标信息 -->
                    <div>
                        <Row class="row">
                            <Col span="5" align="right">预警等级：</Col>
                            <Col span="7" align="center">
                                &nbsp;
                                <!-- {{ table.tezhengyuliang.alarmData.EWL}} -->
                            </Col>
                            <Col span="5" align="right">24小时降雨：</Col>
                            <Col span="7" align="center">
                                &nbsp;
                                <!-- {{ table.tezhengyuliang.alarmData.OD_P + "mm"|| "&nbsp;" }} -->
                            </Col>
                        </Row>
                        <Row class="row last_row">
                            <Col span="5" align="right">12小时降雨：</Col>
                            <Col span="7" align="center">
                                &nbsp;
                                <!-- {{ table.tezhengyuliang.alarmData.TWH_P + "mm" || "&nbsp;" }} -->
                            </Col>
                            <Col span="5" align="right">6小时降雨：</Col>
                            <Col span="7" align="center">
                                &nbsp;
                                <!-- {{ table.tezhengyuliang.alarmData.SH_P + "mm" || "&nbsp;" }} -->
                            </Col>
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
                                    v-model="table.tezhengyuliang.date"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="handleDatePickerChange_tezhengyuliang"
                                    :picker-options="table.tezhengyuliang.datePickerOptions"
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
                                :columns="table.tezhengyuliang.columns"
                                :data="table.tezhengyuliang.Rows_filter"
                                :loading="table.tezhengyuliang.loading"
                                border
                                size="small"
                                :height="table.tezhengyuliang.height"
                        ></Table>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <!-- 分页器 -->
                        <el-pagination
                                background
                                :page-size="table.tezhengyuliang.pageSizes"
                                layout="sizes, total, prev, pager, next, jumper "
                                :page-sizes="[20, 50, 100, 200]"
                                :total="table.tezhengyuliang.total"
                                :pager-count="5"
                                :current-page="table.tezhengyuliang.currentPage"
                                @current-change="handleCurrentChange_tezhengyuliang"
                                @size-change="handleSizeChange_tezhengyuliang"
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
    import {timingSafeEqual} from "crypto";
    import {type} from "os";
    import {types} from "util";
    import {stat} from "fs";
    import {filter} from "minimatch";

    export default {
        props: {
            info: {}
        },
        data() {
            return {
                // 统计数据的表名
                biao_yuqing: '',
                // 激活标签栏
                activeName: "shuiqingshuju",
                // 站点
                siteInfo: {},
                //   多选框对象
                checkBox: {},
                // 降雨统计
                jiangyu_tongji: {
                    rainSum: '',
                    rainVag: '',
                    rainMax: ''
                },
                //   选择框对象
                select: {
                    // 当前激活的降雨数据快速查询选项
                    activeQuickSearchList: [],
                    // 查询绑定值
                    select: "rec6",
                    // 日期选择器绑定值
                    yuqing_datePicker: null,
                    // 降雨数据历史表
                    yuqingList: [
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
                            value: "tenDaysTable",
                            size: "small",
                            // iconType: "logo-facebook",
                            label: "旬表"
                        },
                        {
                            value: "monthTable",
                            size: "small",
                            // iconType: "logo-facebook",
                            label: "月表"
                        },
                        {
                            value: "yearTable",
                            size: "small",
                            // iconType: "logo-facebook",
                            label: "年表"
                        }
                    ],
                    // 降雨数据历史表绑定值
                    yuqing_select: "hourTable",
                    // 旬选择器列表
                    xunList: [
                        {
                            label: "上旬",
                            value: 0
                        },
                        {
                            label: "中旬",
                            value: 1
                        },
                        {
                            label: "下旬",
                            value: 2
                        },
                    ],
                    // 旬选择器绑定值
                    xun_select: null
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
                                    title: "时间",
                                    key: "DT",
                                    width: 180,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "降雨(mm)",
                                    // width: 130,
                                    key: "P",
                                    align: "center",
                                    sortable: "custom"
                                }
                            ],
                            // 小时表
                            hourTable: [
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
                                    title: "时间",
                                    key: "DT",
                                    width: 180,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "降雨(mm)",
                                    // width: 130,
                                    key: "P",
                                    align: "center",
                                    sortable: "custom"
                                }
                            ],
                            // 日表
                            dayTable: [
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
                                    title: "日期",
                                    key: "TM",
                                    width: 150,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "降雨(mm)",
                                    // width: 130,
                                    key: "p",
                                    align: "center",
                                    sortable: "custom"
                                }
                            ],
                            // 旬表
                            tenDaysTable: [
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
                                    title: "时间",
                                    key: "DT",
                                    width: 130,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "降雨(mm)",
                                    // width: 130,
                                    key: "P",
                                    align: "center",
                                    sortable: "custom"
                                }
                            ],
                            // 月表
                            monthTable: [
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
                                    title: "时间",
                                    key: "DT",
                                    width: 130,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "降雨(mm)",
                                    // width: 130,
                                    key: "P",
                                    align: "center",
                                    sortable: "custom"
                                }
                            ],
                            // 年表
                            yearTable: [
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
                                    title: "时间",
                                    key: "YR",
                                    width: 130,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "降雨(mm)",
                                    // width: 130,
                                    key: "P",
                                    align: "center",
                                    sortable: "custom"
                                }
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
                        // 开始年
                        start_year: null,
                        //结束年
                        end_year: null,

                        tenDays_value: null,

                        tenDays_lable: null,
                        btn_tenday: null,
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
                    // 特征雨量
                    tezhengyuliang: {
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
                                title: "年份",
                                // width: 130,
                                key: "Years",
                                width: 150,
                                align: "center",
                                sortable: true
                            },
                            {
                                title: "最大时段降雨(mm)",
                                key: "Max_DP",

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
                            EWL: "", // 预警等级
                            OD_P: "", // 24小时降雨
                            TWH_P: "", // 12小时降雨
                            SH_P: "" // 6小时降雨
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
            //   this.select.yuqing_datePicker = timeInterval;
            // },
            datePicke_on_ok(tableType) {
                this.table["shuiqing"].currentPage = 1; // 重置当前页
                this.table.shuiqing.loading = true; // 表格加载中
                var body = {
                    STCD: this.siteInfo.STCD,
                    TM: `bt,${this.select.yuqing_datePicker}`
                };
                var pageSizes = this.table.shuiqing.pageSizes;
                var currentPage = 1;
                this.getTableData_shuiqing(
                    tableType,
                    pageSizes,
                    currentPage,
                    body,
                    data => {
                        console.log(data);
                        this.setTableTotal("shuiqing", data.total); // 根据返回的total数量, 设置表格总条数
                        this.setTableData("shuiqing", data.data); // 更新水情历史数据表的数据
                        this.table.shuiqing.loading = false; // 取消表格加载
                    }
                );
            },
            // 查询
            search_yuqing(tableType) {
                var tableType = tableType || this.select.yuqing_select;
                this.letTableLoading("shuiqing"); // 表格加载中

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
                } else {
                    switch (tableType) {
                        case "hourTable":
                            body._orderby = `DT `;
                            break;

                        case "dayTable":
                            body._orderby = `dt `;
                            break;

                        case "tenDaysTable":
                            body._orderby = `dt1 `;
                            break;

                        case "monthTable":
                            body._orderby = `dt `;
                            break;

                        case "yearTable":
                            body._orderby = `YR `;
                            break;
                    }
                }

                // 如果有选择日期进行查询，根据表格类型传递参数
                if (this.table.shuiqing.date && tableType !== "yearTable") {
                    switch (tableType) {
                        case "dayTable":
                            // body.DTT = this.$FilterData.elDatePicker_Filter(
                            //   this.table.shuiqing.date
                            // );
                            var DTT = this.$FilterData
                                .elDatePicker_Filter(this.table.shuiqing.date)
                                .split(",");
                            console.log(DTT[1].substr(0,10),DTT[2].substr(0,10))
                            body.Time_min = DTT[1].substr(0,10);
                            body.Time_max = DTT[2].substr(0,10);
                            break;
                        case "hourTable":
                            // body.DTT = this.$FilterData.elDatePicker_Filter(
                            //   this.table.shuiqing.date
                            // );
                            var DTT = this.$FilterData
                                .elDatePicker_Filter(this.table.shuiqing.date)
                                .split(",");
                            body.Time_min = DTT[1];
                            body.Time_max = DTT[2];
                            break;
                        case "tenDaysTable":
                            // body.DTT = this.$FilterData.elDatePicker_Filter(
                            //   this.table.shuiqing.date
                            // );
                            var DTT = this.$FilterData
                                .elDatePicker_Filter(this.table.shuiqing.date)
                                .split(",");
                            body.Time_min = `${DTT[1].substr(0,7)}-01`;
                            body.Time_max = `${DTT[2].substr(0,7)}-01`;
                            break;
                        case "monthTable":
                            // body.DT = this.$FilterData.elDatePicker_Filter(
                            //   this.table.shuiqing.date,
                            //   "monthTable"
                            // );
                            var DTT = this.$FilterData
                                .elDatePicker_Filter(this.table.shuiqing.date, "monthTable")
                                .split(",");
                            body.Time_min = `${DTT[1].substr(0,7)}-01`;
                            body.Time_max = `${DTT[2].substr(0,7)}-01`;
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

                if (tableType === "yearTable") {
                    var start_year = this.table.shuiqing.start_year;
                    var end_year = this.table.shuiqing.end_year;
                    if (start_year) {
                        var start = new Date(start_year),
                            end = end_year ? new Date(end_year) : new Date();
                        body.Time_min = start.getFullYear()
                        body.Time_max = end.getFullYear()
                    }
                    // console.log(body.yr_min,body.yr_max)

                }

                // if (tableType === "tenDaysrange") {
                //     var start = new Date(this.table.shuiqing.start_year),
                //         end = new Date(this.table.shuiqing.end_year);
                //     body.yr_min = start.getFullYear()
                //     body.yr_max = end.getFullYear()
                //     console.log(body.yr_min,body.yr_max)
                //
                // }

                // 获取雨情历史数据
                this.$GetData.Survey_History_YQ(
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
                            console.log(data);
                            return data;
                        }
                    },
                    data => {

                        this.setTableTotal("shuiqing", data.total); // 根据返回的total数量, 设置表格总条数
                        this.setTableData("shuiqing", data.data); // 更新水情历史数据表的数据

                        body._page_size = 999999999;
                        body._page = 1;
                        this.$GetData.Survey_History_YQ(
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
                                console.log("chartData", chartData)
                                this.createChart_shuiqingshuju(
                                    "shuiqingChart",
                                    tableType,
                                    chartData.data
                                ); // 水情表格
                            }
                        );


                        let obj = {};
                        obj.Time_max = body.Time_max;
                        obj.Time_min = body.Time_min;
                        obj.STCD = body.STCD;


                        this.$GetData.statistics_rain_YQ(tableType, obj, false, (data) => {
                            console.log("data",data.data)
                            var d = data.data

                            // console.log(this);

                            this.jiangyu_tongji.rainSum = d.LeiJiYuLiang;
                            this.jiangyu_tongji.rainVag = d.PingJunJiangYu
                            this.jiangyu_tongji.rainMax = d.ZuiDaJiangYu

                        })
                        this.cancelTableLoading("shuiqing"); // 取消表格加载
                    }
                );
            },
            // 查询关系曲线表格
            search_guanxiquxian() {
                this.letTableLoading("guanxiquxian");

                // 传递参数
                var body = {
                    STCD: this.siteInfo.STCD,
                    _page: this.table["guanxiquxian"].currentPage || 1,
                    _page_size: this.table["guanxiquxian"].pageSizes || 20
                };

                // 如果有选择日期进行查询，根据表格类型传递参数
                if (this.table.guanxiquxian.date) {
                    body.YR = this.$FilterData.elDatePicker_Filter(
                        this.table.guanxiquxian.date,
                        "onlyYear"
                    );
                }

                this.$GetData.Base_MonitoringSites(
                    "Z_Q_relation",
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
                        this.setTableTotal("guanxiquxian", data.total);
                        this.setTableData("guanxiquxian", data.data);
                        this.cancelTableLoading("guanxiquxian");
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
                    grid: {
                        x: '50%'
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
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ["line", "bar"]},
                            restore: {show: true},
                            saveAsImage: {show: true}
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
                                data: [{type: "average", name: "平均值"}]
                            }
                        },
                        {
                            name: "水位",
                            type: "line",
                            data: [1, 4, 2, 5, 3, 2, 0],
                            yAxisIndex: 1,
                            markLine: {
                                data: [{type: "average", name: "平均值"}],
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
                    // 雨情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
                    var echartData = this.$App.transform_YQ_data_into_ehart_data(data, tableType);


                    // x轴
                    // echartData.x.list = data.map((val, index, array) => {
                    //   // var time = `${index}:00 ~ ${index + 1}:00`;
                    //   var time = val.DT;
                    //   return time;
                    // });
                    echartData.x.list = echartData.x.list
                    if (!this.chart.shuiqing) {
                        this.chart.shuiqing = this.$echarts.init(ele);
                    }
                    this.chart.shuiqing.setOption({
                        title: {
                            text: echartData.chartName
                        },
                        grid: {
                            x: '20%'
                        },
                        tooltip: {
                            trigger: "axis"
                        },
                        legend: {
                            data: [echartData.y1.name],
                            y: "bottom"
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                magicType: {show: true, type: ["line", "bar"]},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        calculable: true,
                        animation: true,
                        xAxis: [
                            {
                                type: "category",
                                // boundaryGap: false,
                                data: echartData.x.list,
                                axisTick: {
                                    interval: parseInt(echartData.x.list.length / 4)
                                    //     function (index, val) {
                                    //     var listLength = echartData.x.list.length
                                    //     if (listLength >= 4) {
                                    //
                                    //         var tick = Math.round(listLength / 4);
                                    //         // console.log((index + 1) % tick === 0);
                                    //         // console.log('1575listLength',listLength);
                                    //         // console.log('1576tick',tick);
                                    //         if ((index + 1) % tick === 0) {
                                    //             return true;
                                    //         } else {
                                    //             return false;
                                    //         }
                                    //     } else {
                                    //         return true
                                    //     }
                                    // },
                                    ,
                                    length: 10
                                },
                                axisLabel: {
                                    interval: parseInt(echartData.x.list.length / 4)
                                    //     function (index, val) {
                                    //     var listLength = echartData.x.list.length
                                    //     if (listLength >= 4) {
                                    //         console.log(index);
                                    //         var tick = Math.round(listLength / 4);
                                    //         // console.log('1575listLength',listLength);
                                    //         // console.log('1576tick',tick);
                                    //         let a = (index + 1) % tick
                                    //         console.log(a);
                                    //         console.log((index + 1) % tick === 0);
                                    //         if ((index + 1) % tick === 0) {
                                    //             return true;
                                    //         } else {
                                    //             return false;
                                    //         }
                                    //     } else {
                                    //         return true
                                    //     }
                                    // },
                                    ,
                                    rotate: 10,
                                    margin: 16
                                }
                            }
                        ],
                        yAxis: [
                            {
                                name: `${echartData.y1.name} mm`,
                                type: "value",
                                axisLabel: {
                                    formatter: "{value} "
                                },
                                // scale: true
                                // max: echartData.y1.max,
                                // min: echartData.y1.min
                            },
                            // {
                            //   name: `${echartData.y2.name}m`,
                            //   type: "value",
                            //   axisLabel: {
                            //     formatter: "{value} "
                            //   },
                            //   scale: true
                            //   // max: echartData.y2.max,
                            //   // min: echartData.y2.min
                            // }
                        ],
                        series: [
                            {
                                name: echartData.y1.name,
                                type: "bar",
                                data: echartData.y1.list,

                                itemStyle: {
                                    //通常情况下：
                                    normal: {
                                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                        color: function (params) {

                                            switch (echartData.chartName) {
                                                case "小时表":
                                                    if (params.data >= 25 && params.data < 50) return 'orange';
                                                    if (params.data > 50) return 'red';
                                                    return 'blue'
                                                    break
                                                case "日表":
                                                    if (params.data >= 25 && params.data < 50) return 'orange';
                                                    if (params.data > 50) return 'red';
                                                    return 'blue'
                                                    break
                                                case "月表":
                                                    if (params.data >= 100 && params.data < 250) return 'orange';
                                                    if (params.data > 250) return 'red';
                                                    return 'blue'
                                                    break
                                                case "旬表":
                                                    if (params.data >= 100 && params.data < 250) return 'orange';
                                                    if (params.data > 250) return 'red';
                                                    return 'blue'
                                                    break
                                                case "年表":
                                                    if (params.data >= 1400 && params.data < 1650) return 'orange';
                                                    if (params.data > 1650) return 'red';
                                                    return 'blue'
                                                    break

                                            }

                                            //     var colorList = [
                                            //         (() => {
                                            //             if ( === '小时表') {
                                            //                 if (params.data >= 25 && params.data < 50) return 'orange';
                                            //                 if (params.data > 50) return 'red';
                                            //                 return 'blue'
                                            //             }
                                            //         })(),
                                            //         (() => {
                                            //             if (echartData.chartName === '月表') {
                                            //                 if (params.data >= 100 && params.data < 250) return 'orange';
                                            //                 if (params.data > 250) return 'red';
                                            //                 return 'blue'
                                            //             }
                                            //         })(),
                                            //         (() => {
                                            //             if (echartData.chartName === '年表') {
                                            //                 if (params.data >= 1400 && params.data < 1650) return 'orange';
                                            //                 if (params.data > 1650) return 'red';
                                            //                 return 'blue'
                                            //             }
                                            //         })()
                                            // ]
                                            //     return colorList[params.dataIndex];
                                        }
                                    },
                                }
                            },
                            // {
                            //   name: echartData.y2.name,
                            //   type: "line",
                            //   data: echartData.y2.list,
                            //   yAxisIndex: 1
                            // },
                            // {
                            //   name: echartData.y3.name,
                            //   type: "bar",
                            //   data: echartData.y3.list,
                            //   yAxisIndex: 1,
                            //   barMaxWidth: 10
                            // }
                        ]
                    });
                    console.log("this.chart.shuiqing.setOption",tableType)
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
            // 处理页码切换_降雨数据
            handleCurrentChange_shuiqing(index) {
                this.table["shuiqing"].currentPage = index;
                this.search_yuqing(this.tableType);
            },
            // 处理页码切换_关系曲线
            handleCurrentChange_guanxiquxian(index) {
                this.table["guanxiquxian"].currentPage = index;
                this.search_guanxiquxian();
            },
            // 处理页码切换_特征雨量
            handleCurrentChange_tezhengyuliang(index) {
                this.table["tezhengyuliang"].currentPage = index;
                this.search_tezhengyuliang();
            },
            // 处理每页显示条数切换_降雨数据
            handleSizeChange_shuiqing(pageSizes) {
                this.table["shuiqing"].pageSizes = pageSizes;
                this.table["shuiqing"].currentPage = 1;
                this.search_yuqing(this.tableType);
            },
            // 处理每页显示条数切换_关系曲线
            handleSizeChange_guanxiquxian(pageSizes) {
                this.table["guanxiquxian"].pageSizes = pageSizes;
                this.table["guanxiquxian"].currentPage = 1;
                this.search_guanxiquxian();
            },
            // 处理每页显示条数切换_特征雨量
            handleSizeChange_tezhengyuliang(pageSizes) {
                this.table["tezhengyuliang"].pageSizes = pageSizes;
                this.table["tezhengyuliang"].currentPage = 1;
                this.search_tezhengyuliang();
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
                console.log('********',tableType);
                this.table.shuiqing.activeColumns = this.table.shuiqing.columns[tableType];
                this.select.yuqing_select = tableType;
            },
            // 切换 水情历史数据表类型
            tableTypeOnChange_shuiqing(tableType) {
                console.log(tableType)
                let tabName = ''
                switch (tableType) {
                    case 'hourTable':
                        tabName = '小时';
                        break
                    case 'dayTable':
                        tabName = '日';
                        break
                    case  'tenDaysTable':
                        tabName = '旬';
                        break
                    case  'monthTable':
                        tabName = '月';
                        break
                    case  'yearTable':
                        tabName = '年'
                }
                this.biao_yuqing = tabName;
                this.table["shuiqing"].currentPage = 1;
                this.table["shuiqing"].date = null;
                this.table["shuiqing"].sort = null;
                this.tableType = tableType;
                this.setDatePickerType_shuiqing(tableType); // 设置日期时间选择器的类型
                // this.select["yuqing_select"] = tableType; // 设置选中的表
                // this.setSelectOption_quickSearch(tableType); // 设置数据表快速查询选择框内容
                this.setActiveColumns_shuiqing(tableType); // 设置水情历史数据表 当前激活的表头
                this.table.shuiqing.loading = true; // 表格加载中
                if (this[`setTableDefaultDate_yuqing_${tableType}`]) {
                    this[`setTableDefaultDate_yuqing_${tableType}`]();
                }
                // 获取对应水情历史数据表的数据
                this.search_yuqing(tableType);
            },
            // 设置降雨数据历史表默认查询日期
            setTableDefaultDate_yuqing_historyTable() {
                const end = new Date();
                const start = eightPointOfTheDay();

                var timeSlot = [start, end];

                this.setTableDate("shuiqing", timeSlot);

                function eightPointOfTheDay() {
                    var date = new Date();
                    date.setHours(8);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 设置降雨数据小时表默认查询日期
            setTableDefaultDate_yuqing_hourTable() {
                const end = new Date();
                const start = eightPointOfTheDay();
                // console.log(end.getHours());


                var timeSlot = [start, end];

                this.setTableDate("shuiqing", timeSlot);


                function eightPointOfTheDay() {
                    var date = new Date();
                    date.setHours(8);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 设置降雨数据日表默认查询日期
            setTableDefaultDate_yuqing_dayTable() {
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
            // 设置降雨数据旬表默认查询日期
            setTableDefaultDate_yuqing_tenDaysTable() {
                const end = new Date();
                const start = new Date();
                console.log(start.getTime());
                if(start.getHours() < 8){
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6);
                }
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
            // 设置降雨数据月表默认查询日期
            setTableDefaultDate_yuqing_monthTable() {
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
            // 设置降雨数据旬表默认查询日期
            setTableDefaultDate_yuqing_tenDaysTable() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);

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
            // 设置降雨数据旬表默认查询日期
            setTableDefaultDate_yuqing_yearTable() {
                const end = new Date();
                const start = new Date();
                console.log(start.getHours(),start.getTime());
                if(start.getHours() < 8){
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12 * 5);
                }

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
                    case "tenDaysTable":
                        datePickerType = "monthrange";
                        break;
                    case "monthTable":
                        datePickerType = "monthrange";
                        break;
                    case "yearTable":
                        datePickerType = "yearrange";
                        this.table.shuiqing.start_year = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 365 * 5);
                        this.table.shuiqing.end_year = new Date();
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
            // 获取特征雨量表格的数据
            getTableData_tezhengyuliang(
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
                        console.log("tezhengyuliang", res);
                        // 降雨数据过滤
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
            // 获取特征雨量预警信息表的数据
            getTableData_tezhengyuqing_Alarm(body, callback, callback_beforeFilter) {
                this.axios
                    .get(`/guanqu/admin/ST_Canal_Alarm`, {
                        params: body
                    })
                    .then(res => {
                        var data = res.data.rows;
                        if (typeof callback_beforeFilter == "function") {
                            callback_beforeFilter(res);
                        }
                        // 降雨数据过滤
                        var data = res.data.list.map(val => {
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
            // 特征雨量表格查询
            search_tezhengyuliang() {
                this.letTableLoading("tezhengyuliang"); // 表格加载中
                // 传递站码参数
                var body = {
                    STCD: this.siteInfo.STCD,
                    _page: this.table.tezhengyuliang.currentPage,
                    _page_size: this.table.tezhengyuliang.pageSizes
                };

                if (this.table.tezhengyuliang.date) {
                    body.YR = this.$FilterData.elDatePicker_Filter(
                        this.table.tezhengyuliang.date,
                        "maxQTable"
                    );
                }

                this.$GetData.Survey_History_QDSQ(
                    "maxQTable",
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
                        this.setTableTotal("tezhengyuliang", data.total); // 根据返回的total数量, 设置表格总条数
                        this.setTableData("tezhengyuliang", data.data); // 更新特征降雨数据表的数据
                        this.cancelTableLoading("tezhengyuliang"); // 取消表格加载
                    }
                );

                // // 获取特征雨量表格数据
                // this.getTableData_tezhengyuliang(pageSizes, currentPage, body, data => {

                // });
            },
            // 设置特征雨量预警信息数据
            setAlarmData_tezhengyuliang(data) {
                this.table.tezhengyuliang.alarmData = data;
            },
            // 处理日期时间选择器确定事件_降雨数据
            handleDatePickerChange(item) {
                this.table.shuiqing.currentPage = 1;
                this.search_yuqing(this.tableType);
            },
            handleDatePickerChange_tezhengyuliang() {
                this.table.tezhengyuliang.currentPage = 1;
                this.search_tezhengyuliang();
            },
            handleDatePickerChange_guanxiquxian(item) {
                console.log("item", item);
                this.search_guanxiquxian();
            },
            // 设置 xx表格 时间选择器值
            setTableDate(tableName, val) {
                // 判断当前时间是否小于8时
                if(val[1].getHours() < 8){
                    val[0].setTime(val[0] - 3600 * 1000 * 24);
                }
                // val[0].setTime(val[0] - 3600 * 1000 * 24);
                console.log('++++++++++++',val[0].getHours());

                this.table[tableName].date = val;
            },
            // 特征水情表默认查询时间
            setTableDefaultDate_tezhengyuliang() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5);

                var timeSlot = [start, end];

                this.setTableDate("tezhengyuliang", timeSlot);
            },
            // 排序
            sort_change_shuiqing(item) {
                this.table.shuiqing.sort = item;

                this.search_yuqing(this.tableType);
            }
        },
        mounted() {
            // 组件加载中
            this.componentLoading();
            // 获取详情数据
            this.axios
                .get(`/guanqu/table/details?ID=${this.info.rowinfo.STCD}&pk=STCD`)
                .then(res => {
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

                    // 加载站点数据
                    this.loadSiteData(res.data);
                    // 加载取消
                    this.cancelComponentLoading();
                    // 降雨数据
                    console.log('+++++++', this.info);
                    this.tableTypeOnChange_shuiqing(this.info.rowinfo.tableType.yq); // 设置 默认的水情历史数据表
                    // 特征雨量最大流量表数据
                    if (this.setTableDefaultDate_tezhengyuliang) {
                        this.setTableDefaultDate_tezhengyuliang(); // 默认查询日期
                    }
                    this.search_tezhengyuliang();
                    // 特征雨量预警信息表数据
                    this.getTableData_tezhengyuqing_Alarm(
                        {
                            STCD: this.siteInfo.STCD
                        },
                        data => {
                            this.setAlarmData_tezhengyuliang(data[0]);
                        }
                    );
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
