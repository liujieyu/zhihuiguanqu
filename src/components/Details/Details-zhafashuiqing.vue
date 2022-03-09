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
                            <table style="border: 1px solid #EBEEF5" border cellspacing="0" width="100%"
                                   class="table_detail">
                                <tr>
                                    <td align="right" class="dt_name">站名：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{
                                        siteInfo.STNM || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">国家定类：</td>
                                    <td align="center" class="dt_vale">{{ this.STTP_Filter(siteInfo.STTP) || "&nbsp;"
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">等级：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{
                                        this.$FilterData.STGR_Filter(siteInfo.STGR) || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">行政区划：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.AD_NM || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">经度：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{
                                        siteInfo.LGTD || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">纬度：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.LTTD || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">站址：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{
                                        siteInfo.STLC || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">水系：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.HNNM || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">流域：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{
                                        siteInfo.CTCD || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">河流：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.RVCD || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">建站日期：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">{{
                                        siteInfo.ESSTDT || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">建设单位：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.DLOG || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name" style="border-bottom: none">录入时间：</td>
                                    <td align="center" class="dt_vale"
                                        style="border-right: 1px solid #EBEEF5;border-bottom: none"></td>
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
                        </Row> -->
                        <el-col style="border: 1px #EBEEF5 solid;border-radius: 2px;padding-left: 10px;padding-bottom: 20px">
                            <Row class="relationRow">
                                <Col span="4">同时监测：</Col>
                                <Col span="20">
                                    <!-- <Button
                                      @click="$App.developing_tip"
                                      v-for="item in siteInfo.GUANLIAN"
                                    >{{ item.SLNM }}</Button> -->
                                    <div></div>
                                </Col>
                            </Row>
                            <Row class="relationRow">
                                <Col span="4">关联站点：</Col>
                                <Col span="20">
                                    <!-- <Button
                                      @click="$App.developing_tip"
                                      v-for="item in siteInfo.GUANLIAN"
                                    >{{ item.SLNM }}</Button> -->
                                    <div></div>
                                </Col>
                            </Row>
                            <Row class="relationRow">
                                <Col span="4">关联要素：</Col>
                                <Col span="20">
                                    <!-- <Button
                                      @click="$App.developing_tip"
                                      v-for="item in siteInfo.GUANLIAN"
                                    >{{ item.SLNM }}</Button> -->
                                    <div></div>
                                </Col>
                            </Row>
                        </el-col>

                    </div>
                </div>
            </el-tab-pane>
            <!-- 水情数据 -->
            <el-tab-pane name="shuiqingshuju">
        <span slot="label">
          <Icon type="ios-water-outline" style="font-size:20px"/>水情数据
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
                                <Row :gutter="16" type="flex" justify="end" align="middle">
                                    <Col span="8">
                                        预警闸阀前水深:{{$FilterData.Float_Filter(info.rowinfo.YUJING_SZ)}} m
                                    </Col>
                                    <Col span="8">
                                        预警闸阀后水深:{{$FilterData.Float_Filter(info.rowinfo.YUJING_EZ)}} m
                                    </Col>
                                    <Col span="8">
                                        预警流量:{{$FilterData.Float_Filter(info.rowinfo.YUJING_Q, 3)}} m³/s
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
                                <div
                                        v-show="table.shuiqing.Rows_filter.length > 0"
                                        id="shuiqingChart"
                                        :style="{width: '500px', height: '350px',margin: 'auto'}"
                                ></div>
                                <div
                                        v-if="table.shuiqing.Rows_filter.length == 0"
                                        :style="{width: '500px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                                >暂无数据
                                </div>
                            </TabPane>
                            <!-- 历史表选择框 -->
                            <Select
                                    @on-change="tableTypeOnChange_shuiqing"
                                    prefix="ios-calendar-outline"
                                    v-model="select.shuiqing_select"
                                    slot="extra"
                            >
                                <Option
                                        v-for="item in select.shuiqingList"
                                        :label="item.label"
                                        :value="item.value"
                                        :key="item.value"
                                ></Option>
                            </Select>
                        </Tabs>
                    </div>
                </div>
            </el-tab-pane>
            <!-- 关系曲线 -->
            <el-tab-pane name="guanxiquxian">
        <span slot="label">
          <Icon type="md-trending-up" style="font-size:20px"/>关系曲线
        </span>
                <div class="drawer-profile">
                    <!-- 导出按钮 -->
                    <Button size="small" class="outPutButton" type="success" @click="$App.developing_tip">
                        <div>导出</div>
                    </Button>
                    <Tabs type="card">
                        <TabPane label="表格">
                            <!-- 查询&换算 -->
                            <Row class="row" :gutter="16" type="flex" align="end">
                                <Col span="24">
                                    <Row :gutter="8">
                                        <Col span="6">
                                            <span>水深：</span>
                                            <Input
                                                    v-model="input.huansuan.waterLever"
                                                    placeholder="水深 m"
                                                    class="huansuanInput"
                                                    size="small"
                                            />
                                        </Col>
                                        <Col span="6">
                                            <span>流量：</span>
                                            <Input
                                                    v-model="input.huansuan.flowLever"
                                                    placeholder="流量m³/s"
                                                    class="huansuanInput"
                                                    size="small"
                                            />
                                        </Col>
                                        <Col span="8">
                                            <span>闸门开度：</span>
                                            <Input
                                                    v-model="input.huansuan.ODLever"
                                                    placeholder="闸门 m"
                                                    class="huansuanInput"
                                                    size="small"
                                            />
                                        </Col>
                                        <Col span="4">
                                            <Button type="success" size="small" @click="$App.developing_tip">换算</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <!-- 分割线 -->
                            <!-- <div class="divider"></div> -->
                            <div class="divider"></div>
                            <!-- 表格用于展示数据 -->
                            <div>
                                <Table
                                        :columns="table.guanxiquxian.columns"
                                        :data="table.guanxiquxian.Rows_filter"
                                        :loading="table.guanxiquxian.loading"
                                        border
                                        size="small"
                                        :height="table.guanxiquxian.height"
                                ></Table>
                                <!-- 分割线 -->
                                <div class="divider"></div>
                                <!-- 分页器 -->
                                <el-pagination
                                        background
                                        :page-size="20"
                                        layout="total, prev, pager, next, jumper"
                                        :total="table.guanxiquxian.total"
                                        :pager-count="5"
                                        :current-page="table.guanxiquxian.currentPage"
                                        @current-change="handleCurrentChange_guanxiquxian"
                                        @size-change="handleSizeChange_guanxiquxian"
                                        class="pageController"
                                        small
                                ></el-pagination>
                            </div>
                            <!-- 分割线 -->
                            <div class="divider"></div>
                        </TabPane>
                        <TabPane label="图形">
                            <!-- 查询&换算 -->
                            <Row class="row" :gutter="16" type="flex" align="end">
                                <Col span="24">
                                    <Row :gutter="8">
                                        <Col span="6">
                                            <span>水深：</span>
                                            <Input
                                                    v-model="input.huansuan.waterLever"
                                                    placeholder="水深 m"
                                                    class="huansuanInput"
                                                    size="small"
                                            />
                                        </Col>
                                        <Col span="6">
                                            <span>流量：</span>
                                            <Input
                                                    v-model="input.huansuan.flowLever"
                                                    placeholder="流量m³/s"
                                                    class="huansuanInput"
                                                    size="small"
                                            />
                                        </Col>
                                        <Col span="8">
                                            <span>闸门开度：</span>
                                            <Input
                                                    v-model="input.huansuan.ODLever"
                                                    placeholder="闸门 m"
                                                    class="huansuanInput"
                                                    size="small"
                                            />
                                        </Col>
                                        <Col span="4">
                                            <Button type="success" size="small" @click="$App.developing_tip">换算</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <!-- 绘图 -->
                            <div id="guanxiChart" :style="{width: '500px', height: '350px',margin: 'auto'}"></div>
                        </TabPane>
                    </Tabs>
                </div>
            </el-tab-pane>
            <!-- 特征水深 -->
            <el-tab-pane label="特征水深" name="tezhengshuiqing">
        <span slot="label">
          <Icon type="ios-speedometer-outline" style="font-size:20px"/>特征水深
        </span>
                <div class="drawer-profile">
                    <!-- 指标信息 -->
                    <div>
                        <Row class="row">
                            <Col span="6" align="right">预警闸前水深：</Col>
                            <Col span="6" align="center">{{ `${$FilterData.Float_Filter(info.rowinfo.YUJING_SZ)}m` || "&nbsp;"
                                }}
                            </Col>
                            <Col span="6" align="right">预警闸后水深：</Col>
                            <Col span="6" align="center">{{ `${$FilterData.Float_Filter(info.rowinfo.YUJING_EZ)}m` || "&nbsp;"
                                }}
                            </Col>
                        </Row>
                        <Row class="row last_row">
                            <Col span="6" align="right">经验预警闸前水深：</Col>
                            <Col span="6" align="center">{{ `${$FilterData.Float_Filter(info.rowinfo.YUJING_JYSZ)}m` ||
                                "&nbsp;" }}
                            </Col>
                            <Col span="6" align="right">经验预警闸后水深：</Col>
                            <Col span="6" align="center">{{ `${$FilterData.Float_Filter(info.rowinfo.YUJING_JYEZ)}m` ||
                                "&nbsp;" }}
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
                    <Row :gutter="16" type="flex" align="center">
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
                                    type="daterange"
                                    size="mini"
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
                v-loading="outPutLoading"
                title="关于导出"
                @on-ok="outPutSure"
                @on-cancel
        >
            <p>您确认导出该站点的信息表吗？</p>
        </Modal>
    </div>
</template>


<script>
    import FilterMethods from "../../assets/commonJS/FilterMethods"; // 过滤方法
    import GetDataMethods from "../../assets/commonJS/GetDataMethods"; // 获取数据方法
    import {timingSafeEqual} from "crypto";

    export default {
        props: {
            info: {}
        },
        data() {
            return {
                // 激活标签栏
                activeName: "shuiqingshuju",
                // 站点
                siteInfo: {},
                //   多选框对象
                checkBox: {},
                //   选择框对象
                select: {
                    // 水情数据快速查询
                    quickSearch: {
                        historyTable: [
                            {
                                value: 0,
                                label: "全部"
                            },
                            {
                                value: 6,
                                label: "最近6小时"
                            },
                            {
                                value: 12,
                                label: "最近12小时"
                            },
                            {
                                value: 24,
                                label: "最近24小时"
                            },
                            {
                                value: 36,
                                label: "最近36小时"
                            },
                            {
                                value: 72,
                                label: "最近72小时"
                            }
                        ],
                        hourTable: [
                            {
                                value: 0,
                                label: "全部"
                            },
                            {
                                value: 6,
                                label: "最近6小时"
                            },
                            {
                                value: 12,
                                label: "最近12小时"
                            },
                            {
                                value: 24,
                                label: "最近24小时"
                            },
                            {
                                value: 36,
                                label: "最近36小时"
                            },
                            {
                                value: 72,
                                label: "最近72小时"
                            }
                        ],
                        dayTable: [
                            {
                                value: 0,
                                label: "全部"
                            },
                            {
                                value: 10,
                                label: "最近10天"
                            },
                            {
                                value: 15,
                                label: "最近15天"
                            },
                            {
                                value: 30,
                                label: "最近30天"
                            },
                            {
                                value: 60,
                                label: "最近60天"
                            },
                            {
                                value: 90,
                                label: "最近90天"
                            }
                        ],
                        monthTable: []
                    },
                    // 当前激活的水情数据快速查询选项
                    activeQuickSearchList: [],
                    // 查询绑定值
                    select: "rec6",
                    // 水情数据历史表
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
                    // 水情数据历史表绑定值
                    shuiqing_select: "historyTable"
                },
                // 表格数据
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
                                    width: 60,
                                    align: "center",
                                    // 自定义序号
                                    indexMethod(item) {
                                        var index =
                                            item._index + 1 + (item.currentPage - 1) * item.pageSizes;
                                        return index;
                                    }
                                },
                                {
                                    title: "时间",
                                    key: "TM",
                                    width: 150,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "闸前水深(m)",
                                    width: 140,
                                    key: "UPZ",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "闸后水深(m)",
                                    width: 140,
                                    key: "DWZ",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    width: 120,
                                    title: "流量(m³/s)",
                                    key: "Q",
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
                                    key: "dt",
                                    width: 150,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "平均闸前水深(m)",
                                    width: 150,
                                    key: "A_UPZ",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "平均阀后水深(m)",
                                    width: 150,
                                    key: "A_DWZ",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    width: 160,
                                    title: "平均过闸流量(m³/s)",
                                    key: "A_Q",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    width: 180,
                                    title: "小时累计过闸水量(m³)",
                                    key: "WQ",
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
                                    title: "时间",
                                    key: "tm",
                                    width: 150,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "平均闸前水深(m)",
                                    width: 150,
                                    key: "DA_UPZ",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "平均闸后水深(m)",
                                    width: 150,
                                    key: "DA_DWZ",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    width: 160,
                                    title: "平均过闸流量(m³/s)",
                                    key: "DA_Q",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    width: 170,
                                    title: "日累计过闸水量(m³)",
                                    key: "DWQ",
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
                                    title: "年份",
                                    key: "dt",
                                    width: 110,
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    title: "平均闸前水深(m)",
                                    width: 150,
                                    key: "MA_UPZ",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    width: 150,
                                    title: "平均闸后水深(m)",
                                    key: "MA_DWZ",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    width: 160,
                                    title: "平均过闸流量(m³/s)",
                                    key: "MA_Q",
                                    align: "center",
                                    sortable: "custom"
                                },
                                {
                                    width: 180,
                                    title: "月累计过闸水量(m³/s)",
                                    key: "MWQ",
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
                        datePickerType: "datetimerange",
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
                    // 关系曲线
                    guanxiquxian: {
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
                                title: "流量(m³/s)",
                                key: "Q",
                                align: "center",
                                width: 100
                            },
                            {
                                title: "闸门开度",
                                // width: 100,
                                key: "OD",
                                align: "center"
                            },

                            {
                                width: 100,
                                title: "闸前水深",
                                key: "UPZ",
                                align: "center"
                            },
                            {
                                width: 100,
                                title: "闸后水深",
                                key: "DWZ",
                                align: "center"
                            }
                        ],
                        // 表体内容
                        Rows: [],
                        // 过滤后的表体内容
                        Rows_filter: [],
                        // 表格是否加载中
                        loading: false,
                        // 日期时间选择器值
                        date: null,
                        // 总条数
                        total: 0,
                        // 当前页
                        currentPage: 1,
                        // 每页显示数量
                        pageSizes: 20,
                        // 表格高度
                        height: 440,
                    },
                    // 特征水深
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
                                title: "最大流量时间",
                                width: 130,
                                key: "TMMXQ",
                                align: "center",
                                sortable: "custom"
                            },
                            {
                                title: "年最大流量(m³/s)",
                                key: "TMXQ",
                                align: "center",
                                width: 150,
                                sortable: "custom"
                            },
                            {
                                width: 150,
                                title: "对应闸前水深(m)",
                                key: "YMXUPQZ",
                                align: "center",
                                sortable: "custom"
                            },
                            {
                                width: 150,
                                title: "对应闸后水深(m)",
                                key: "YMXDNQZ",
                                align: "center",
                                sortable: "custom"
                            }
                        ],
                        // 表体内容
                        Rows: [],
                        // 过滤后的表体内容
                        Rows_filter: [],
                        // 表格是否加载中
                        loading: false,
                        // 当前页
                        currentPage: 1,
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
                        height: 400,
                        // 每页显示数量
                        pageSizes: 20,
                        alarmData: {
                            SQ: "", // 预警闸前水深
                            EQ: "", // 预警闸后水深
                            JYSQ: "", // 经验预警闸前水深
                            JYEQ: "" // 经验预警闸后水深
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
                boxLoading: true,
                //预警数据
                yujingdata: {},
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
            handleDatePickerChange(val, valType) {
                var timeInterval = `${val[0].replace(/\//g, "-")},${val[1].replace(
                    /\//g,
                    "-"
                )}`;
                this.select.shuiqing_datePicker = timeInterval;
            },
            // datePicke_on_ok(tableType) {
            //   this.table["shuiqing"].currentPage = 1; // 重置当前页
            //   this.table.shuiqing.loading = true; // 表格加载中
            //   var body = {
            //     STCD: this.siteInfo.STCD,
            //     TM: `bt,${this.select.shuiqing_datePicker}`
            //   };
            //   var pageSizes = this.table.shuiqing.pageSizes;
            //   var currentPage = 1;
            //   this.getTableData_shuiqing(
            //     tableType,
            //     pageSizes,
            //     currentPage,
            //     body,
            //     data => {
            //       this.setTableTotal("shuiqing", data.total); // 根据返回的total数量, 设置表格总条数
            //       this.setTableData("shuiqing", data.data); // 更新水情历史数据表的数据
            //       this.cancelTableLoading("shuiqing"); // 取消表格加载
            //     }
            //   );
            // },
            // 查询
            search_shuiqing(tableType) {
                console.log('************', tableType);
                var tableType = tableType || this.select.shuiqing_select;
                this.letTableLoading("shuiqing"); // 表格加载中

                // 传递参数
                var body = {
                    STCD: this.siteInfo.STCD,
                    _page: this.table.shuiqing.currentPage || 1,
                    _page_size: this.table.shuiqing.pageSizes || 20
                };

                // 如果有选择排序，则传递排序参数
                if (this.table.shuiqing.sort) {
                    var _sort = this.$FilterData.sort_Filter(
                        this.table.shuiqing.sort
                    );
                    if (_sort) {
                        body._orderby = _sort;
                    }
                } else {
                    switch (tableType) {
                        case 'historyTable':
                            body._orderby = `TM desc`
                            break;

                        case 'hourTable':
                            body._orderby = `DT desc`
                            break;

                        case 'dayTable':
                            body._orderby = `TM desc`
                            break;

                        case 'monthTable':
                            body._orderby = `DT desc`
                            break;
                    }
                }

                console.log("body._orderby", body._orderby)
                // 如果有选择日期进行查询，根据表格类型传递参数
                if (this.table.shuiqing.date) {
                    switch (tableType) {
                        case "historyTable":
                            var DTT = this.$FilterData.elDatePicker_Filter(
                                this.table.shuiqing.date
                            ).split(",");
                            body.Time_min = DTT[1];
                            body.Time_max = DTT[2];
                            break;
                        case "dayTable":
                            var DTT = this.$FilterData.elDatePicker_Filter(
                                this.table.shuiqing.date, "dayTable"
                            ).split(",");
                            body.Time_min = DTT[1];
                            body.Time_max = DTT[2];
                            break;
                        case "hourTable":
                            var DTT = this.$FilterData.elDatePicker_Filter(
                                this.table.shuiqing.date
                            ).split(",");
                            body.Time_min = DTT[1];
                            body.Time_max = DTT[2];
                            break;
                        case "monthTable":
                            var DTT = this.$FilterData.elDatePicker_Filter(
                                this.table.shuiqing.date, "monthTable"
                            ).split(",");
                            body.Time_min = DTT[1];
                            body.Time_max = DTT[2];
                            break;
                    }
                }

                // 传表类型，参数，回调函数
                this.$GetData.Survey_History_ZFSQ(
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
                        this.$GetData.Survey_History_ZFSQ(
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
                // if (this.table.guanxiquxian.date) {
                //   body.YR = this.$FilterData.elDatePicker_Filter(
                //     this.table.guanxiquxian.date,
                //     "onlyYear"
                //   );
                // }
                this.$GetData.Base_MonitoringSites(
                    "Gate_Z_Q_relation",
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
            createChart(idName) {
                let myChart = this.$echarts.init(document.getElementById(idName));

                myChart.setOption({
                    title: {
                        text: this.info.STNM,
                        subtext: "纯属虚构"
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["流量", "水深"]
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
                            // boundaryGap: false,
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
                            type: "value",
                            axisLabel: {
                                formatter: "{value} m³/s"
                            },
                            min: 10
                        },
                        {
                            type: "value",
                            axisLabel: {
                                formatter: "{value} m"
                            },
                            min: 5
                        }
                    ],
                    series: [
                        {
                            name: "流量",
                            type: "line",
                            data: [20, 20, 28, 35, 24, 13, 25],
                            markLine: {
                                data: [{type: "average", name: "平均值"}]
                            }
                        },
                        {
                            name: "水深",
                            type: "line",
                            data: [7, 18, 15, 12, 13, 18, 12],
                            markPoint: {
                                data: [{name: "周最低", value: -2, xAxis: 1, yAxis: -1.5}]
                            },
                            yAxisIndex: 1,
                            markLine: {
                                data: [{type: "average", name: "平均值"}]
                            }
                        }
                    ]
                });
            },
            // 制图
            createChart_shuiqingshuju(id, tableType, data) {
                var ele = document.getElementById(id);
                console.log('1575',tableType);
                if (data.length > 0) {
                    var echartData = this.$App.transform_ZFSQ_data_into_ehart_data(
                        data,
                        tableType, true
                    ); // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
                    console.log("echartData.x.list", echartData.x.list)
                    var y2_y3_max =
                        echartData.y2.max > echartData.y3.max
                            ? echartData.y2.max
                            : echartData.y3.max;
                    var y2_y3_min =
                        echartData.y2.min < echartData.y3.min
                            ? echartData.y2.min
                            : echartData.y3.min;
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
                            data: [echartData.y1.name, echartData.y2.name, echartData.y3.name],
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
                                data: echartData.x.list
                            }
                        ],
                        yAxis: [
                            {
                                name: `${echartData.y1.name} m³/s`,
                                type: "value",
                                axisLabel: {
                                    formatter: "{value} "
                                },
                                max: echartData.y1.max,
                                min: echartData.y1.min
                            },
                            {
                                name: `闸阀上/下水深m`,
                                type: "value",
                                axisLabel: {
                                    formatter: "{value} "
                                },
                                max: y2_y3_max,
                                min: y2_y3_min
                            },
                            {
                                name: ` `,
                                type: "value",
                                axisLabel: {
                                    formatter: "{value} "
                                },
                                max: y2_y3_max,
                                min: y2_y3_min
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
                                data: echartData.y2.list,
                                yAxisIndex: 1
                            },
                            {
                                name: echartData.y3.name,
                                type: "line",
                                data: echartData.y3.list,
                                yAxisIndex: 2
                            }
                        ]
                    });
                }
            },
            // 加载站点数据
            loadSiteData(data) {
                this.siteInfo = data;
            }, // 组件加载中
            componentLoading() {
                this.boxLoading = true;
            },
            // 取消组件加载
            cancelComponentLoading() {
                this.boxLoading = false;
            },
            // 处理页码切换_水情数据
            handleCurrentChange_shuiqing(index) {
                this.table["shuiqing"].currentPage = index;
                this.search_shuiqing();
            },
            // 处理页码切换_关系曲线
            handleCurrentChange_guanxiquxian(index) {
                this.table["guanxiquxian"].currentPage = index;
                this.search_guanxiquxian();
            },
            // 处理页码切换_特征水深
            handleCurrentChange_tezhengshuiqing() {
                this.table["tezhengshuiqing"].currentPage = index;
                this.search_tezhengshuiqing();
            },
            // 处理每页显示条数切换_水情数据
            handleSizeChange_shuiqing(pageSizes) {
                this.table["shuiqing"].pageSizes = pageSizes;
                this.table["shuiqing"].currentPage = 1;
                this.search();
            },
            // 处理每页显示条数切换_关系曲线
            handleSizeChange_guanxiquxian(pageSizes) {
                this.table["guanxiquxian"].pageSizes = pageSizes;
                this.table["guanxiquxian"].currentPage = 1;
                this.search_guanxiquxian();
            },
            // 处理每页显示条数切换_特征水深
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
                this.table.shuiqing.activeColumns = this.table.shuiqing.columns[tableType];
                this.select.shuiqing_select = tableType;
                console.log('+++++++++', tableType);
                console.log('----------', this.table.shuiqing.activeColumns);
            },
            // 切换 水情历史数据表类型
            tableTypeOnChange_shuiqing(tableType) {
                this.table["shuiqing"].currentPage = 1;
                this.table["shuiqing"].date = null;
                this.table["shuiqing"].sort = null;
                this.setDatePickerType_shuiqing(tableType); // 设置日期时间选择器的类型
                // 设置水情历史数据表 当前激活的表头
                this.setActiveColumns_shuiqing(tableType);
                this.table.shuiqing.loading = true; // 表格加载中
                // 设置表默认查询日期
                if (this[`setTableDefaultDate_shuiqing_${tableType}`]) {
                    this[`setTableDefaultDate_shuiqing_${tableType}`]();
                }
                // 查询对应水情历史数据表的数据
                this.search_shuiqing(tableType);
            },
            // 设置数据表快速查询选择框内容
            setSelectOption_quickSearch(tableType) {
                this.select.activeQuickSearchList = this.select.quickSearch[tableType];
                this.select.select = this.select.activeQuickSearchList[0]
                    ? this.select.activeQuickSearchList[0].value
                    : null; // 设置默认值为第一项
            },
            // 设置水情数据历史表默认查询日期
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
            // 设置水情数据小时表默认查询日期
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
            // 设置水情数据日表默认查询日期
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
            // 设置水情数据月表默认查询日期
            setTableDefaultDate_shuiqing_monthTable() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 160);

                var timeSlot = [start, end]

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
            // 获取对应水情历史数据表的数据
            getTableData_shuiqing(
                tableType,
                pageSizes,
                currentPage,
                body,
                callback,
                callback_beforeFilter
            ) {
                var tableName = null;
                // 根据不同类型的表，选择数据库中对应的表名
                switch (tableType) {
                    case "historyTable":
                        tableName = "ST_WAS_R";
                        break;
                    case "hourTable":
                        tableName = "ST_HWAS_C";
                        break;
                    case "dayTable":
                        tableName = "ST_DWAS_C";
                        break;
                    case "monthTable":
                        tableName = "ST_MWAS_C";
                        break;
                    default:
                        tableName = "ST_WAS_R";
                        break;
                }
                this.axios
                    .get(
                        `/guanqu/admin/${tableName ||
                        "historyTable"}?_page_size=${pageSizes || 20}&_page=${currentPage ||
                        1}`,
                        {
                            params: body
                        }
                    )
                    .then(res => {
                        if (typeof callback_beforeFilter == "function") {
                            callback_beforeFilter({
                                data: res.data.rows,
                                total: res.data.total
                            });
                        }
                        // 数据过滤
                        var data = res.data.rows.map(val => {
                            if (tableType == "historyTable") {
                                val.currentPage = this.table.shuiqing.currentPage; // 添加当前页码到数据
                                val.pageSizes = this.table.shuiqing.pageSizes; // 添加当前每页条数到数据
                                val.TM = this.dateFilter(val.TM); // 日期过滤
                                val.UPZ = this.Z_Filter(val.UPZ); // 闸阀前水深过滤
                                val.DWZ = this.Z_Filter(val.DWZ); // 闸阀后水深过滤
                                val.Q = this.Z_Filter(val.Q); // 流量过滤
                            }
                            if (tableType == "hourTable") {
                                val.currentPage = this.table.shuiqing.currentPage; // 添加当前页码到数据
                                val.pageSizes = this.table.shuiqing.pageSizes; // 添加当前每页条数到数据
                                val.DT = this.dateFilter(val.DT); // 日期过滤
                                val.A_UPZ = this.Z_Filter(val.A_UPZ); // 平均闸阀前水深过滤
                                val.A_DWZ = this.Z_Filter(val.A_DWZ); // 平均闸阀后水深过滤
                                val.A_Q = this.Z_Filter(val.A_Q); // 过闸平均流量过滤
                                val.WQ = this.Z_Filter(val.WQ); // 小时累计过闸水量过滤
                            }
                            if (tableType == "dayTable") {
                                val.currentPage = this.table.shuiqing.currentPage; // 添加当前页码到数据
                                val.pageSizes = this.table.shuiqing.pageSizes; // 添加当前每页条数到数据
                                val.TM = this.dateFilter(val.TM); // 日期过滤
                                val.DA_UPZ = this.Z_Filter(val.DA_UPZ); // 平均闸阀前水深过滤
                                val.DA_DWZ = this.Z_Filter(val.DA_DWZ); // 平均闸阀后水深过滤
                                val.DA_Q = this.Z_Filter(val.DA_Q); // 平均过闸流量过滤
                                val.DWQ = this.Z_Filter(val.DWQ); // 日累计过闸水量过滤
                            }
                            if (tableType == "monthTable") {
                                val.currentPage = this.table.shuiqing.currentPage; // 添加当前页码到数据
                                val.pageSizes = this.table.shuiqing.pageSizes; // 添加当前每页条数到数据
                                val.MA_UPZ = this.Z_Filter(val.MA_UPZ); // 平均闸阀前水深过滤
                                val.MA_DWZ = this.Z_Filter(val.MA_DWZ); // 平均闸阀后水深过滤
                                val.MA_Q = this.Z_Filter(val.MA_Q); // 平均过闸流量过滤
                                val.MWQ = this.Z_Filter(val.MWQ); // 月累计过闸水量过滤
                            }

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
            // 获取特征水深表格的数据
            getTableData_tezhengshuiqing(
                pageSizes,
                currentPage,
                body,
                callback,
                callback_beforeFilter
            ) {
                this.axios
                    .get(
                        `/guanqu/admin/ST_G_WASQORD?_page_size=${pageSizes ||
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
                        // 水情数据过滤
                        var data = res.data.rows.map(val => {
                            val.currentPage = this.table.shuiqing.currentPage; // 添加数据当前页码
                            val.pageSizes = this.table.shuiqing.pageSizes; // 添加当前每页条数到数据
                            val.TMMXQ = this.dateFilter(val.TMMXQ); // 日期过滤
                            val.TMXQ = this.Z_Filter(val.TMXQ, 3); // 年最大流量
                            val.YMXUPQZ = this.Z_Filter(val.YMXUPQZ); // 对应闸前水深过滤
                            val.YMXDNQZ = this.Z_Filter(val.YMXDNQZ); // 对应闸后水深过滤

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

            getAlarm(agmt){
                let obj = {
                    STCD: agmt
                }
                this.axios.get(`/guanqu/table/ST_Gate_Alarm`, {params: obj}).then(res => {
                    console.log('这是我写的',res);
                })
            },

            // 获取特征水深预警信息表的数据
            getTableData_tezhengshuiqing_Alarm(body, callback, callback_beforeFilter) {
                this.axios.get(`/guanqu/table/ST_Gate_Alarm`, {params: body}).then(res => {
                        var data = res.data.list;
                        if (typeof callback_beforeFilter == "function") {
                            callback_beforeFilter(res);
                        }
                        // 水情数据过滤
                        console.log('888888888888888888888',data);
                        var data = res.data.list.map(val => {
                            console.log("val", val)
                            // val.SZ = this.Z_Filter(val.SZ); // 预警闸前水深过滤
                            // val.EZ = this.Z_Filter(val.EZ); // 预警闸后水深
                            // val.JYSQ = this.Z_Filter(val.JYSQ); // 预警流量过滤
                            // val.JYEQ = this.Z_Filter(val.JYEZ); // 预警水深过滤

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
            // 根据返回的total数量, 设置表格总条数 (特征水深)
            setTableTotal_tezhengshuiqing(total) {
                this.table.tezhengshuiqing.total = total;
            },
            // 更新特征水深数据表的数据
            setTableData_tezhengshuiqing(data) {
                this.table.tezhengshuiqing.Rows_filter = data;
            },
            // 特征水深表格查询
            search_tezhengshuiqing() {
                this.letTableLoading("tezhengshuiqing"); // 表格加载中
                // 传递站码参数
                var body = {
                    STCD: this.siteInfo.STCD,
                    _page: this.table.tezhengshuiqing.currentPage,
                    _page_size: this.table.tezhengshuiqing.pageSizes
                };

                if (this.table.tezhengshuiqing.date) {
                    var YR = this.$FilterData.elDatePicker_Filter(
                        this.table.tezhengshuiqing.date,
                        "maxQTable"
                    ).split(",");
                    body.YR_min = YR[1];
                    body.YR_max = YR[2];
                }

                // 获取特征水深表格数据
                this.$GetData.Survey_History_ZFSQ(
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
                        this.setTableTotal("tezhengshuiqing", data.total); // 根据返回的total数量, 设置表格总条数
                        this.setTableData("tezhengshuiqing", data.data); // 更新特征水深数据表的数据
                        this.cancelTableLoading("tezhengshuiqing"); // 取消表格加载
                    }
                );
            },
            // 设置特征水深预警信息数据
            setAlarmData_tezhengshuiqing(data) {
                this.table.tezhengshuiqing.alarmData = data;
                this.info.rowinfo.YUJING_Q = data.JYQ
                this.info.rowinfo.YUJING_Z = data.JYZ
            },
            // 处理日期时间选择器确定事件_水情数据
            handleDatePickerChange(item) {
                this.table.shuiqing.currentPage = 1;
                this.search_shuiqing();
            },
            handleDatePickerChange_tezhengshuiqing() {
                this.table.tezhengshuiqing.currentPage = 1;
                this.search_tezhengshuiqing();
            },
            handleDatePickerChange_guanxiquxian(item) {
                this.search_guanxiquxian();
            },
            // 设置 xx表格 时间选择器值
            setTableDate(tableName, val) {
                this.table[tableName].date = val;
            },
            // 排序_水情
            sort_change_shuiqing(item) {

                this.table.shuiqing.sort = item

                this.search_shuiqing();
            }
        },

        mounted() {
            // 组件加载中
            this.componentLoading();
            // 获取详情数据
            console.log(this.info.rowinfo.STCD);
            this.axios
                .get(`/guanqu/table/details?ID=${this.info.rowinfo.STCD}&pk=STCD`)
                .then(res => {
                    //获取预警数据
                    // this.axios.get('/guanqu/table/ST_Gate_Alarm?STCD='+res.data.STCD).then(res =>{
                    //   this.yujingdata = res.data.rows[0];
                    //   this.yujingdata.SZ = this.Z_Filter(this.yujingdata.SZ);
                    //   this.yujingdata.EZ = this.Z_Filter(this.yujingdata.EZ);
                    //   this.yujingdata.Q = this.Z_Filter(this.yujingdata.Q,3);
                    // });

                    // 根据行政区划码获取行政区划名
                    this.getCompartmentByADDVCD(data => {
                        this.siteInfo.AD_NM = data[0].AD_NM;
                    });

                    // 根据河流编码获取河流名
                    this.$GetData.Base_R_I({
                        RVCD: this.info.rowinfo.RVCD
                    }, true, (data) => {
                        this.siteInfo.RVCD = data.data[0].RVNM;
                    })

                    // 根据流域编码获取流域名
                    this.$GetData.Base_B_I({
                        CTCD: this.info.rowinfo.CTCD
                    }, true, (data) => {
                        this.siteInfo.CTCD = data.data[0].CTNM;
                    })

                    //获取近5年时间
                    var newdate = new Array();
                    var end = new Date();
                    var start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5);
                    newdate[0] = start;
                    newdate[1] = end;
                    this.table.tezhengshuiqing.date = newdate;

                    // 加载站点数据
                    this.loadSiteData(res.data);
                    // 加载取消
                    this.cancelComponentLoading();
                    // 水情数据
                    this.tableTypeOnChange_shuiqing(this.info.rowinfo.tableType.zfsq); // 设置 默认的水情历史数据表
                    // 关系曲线
                    this.search_guanxiquxian();
                    // 特征水深最大流量表数据
                    this.search_tezhengshuiqing();
                    this.getAlarm(this.info.rowinfo.STCD)
                    // 特征水深预警信息表数据
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
