<template>
    <div v-loading="boxLoading">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="">
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
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">
                                        {{
                                        siteInfo.STNM || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">国家定类：</td>
                                    <td align="center" class="dt_vale">
                                        {{ this.STTP_Filter(siteInfo.STTP) || "&nbsp;"
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">等级：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">
                                        {{
                                        this.$FilterData.STGR_Filter(siteInfo.STGR) || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">行政区划：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.AD_NM || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">经度：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">
                                        {{
                                        siteInfo.LGTD || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">纬度：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.LTTD || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">站址：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">
                                        {{
                                        siteInfo.STLC || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">水系：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.HNNM || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">流域：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">
                                        {{
                                        siteInfo.CTCD || "&nbsp;" }}
                                    </td>
                                    <td align="right" class="dt_name">河流：</td>
                                    <td align="center" class="dt_vale">{{ siteInfo.RVCD || "&nbsp;" }}</td>
                                </tr>
                                <tr>
                                    <td align="right" class="dt_name">建站日期：</td>
                                    <td align="center" class="dt_vale" style="border-right: 1px solid #EBEEF5">
                                        {{
                                        siteInfo.ESSTDT || "&nbsp;" }}
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
                                                    >{{ this.$FilterData.STGR_Filter(siteInfo.STGR) ||                                                                                                                                                   "&nbsp;" }}</Col>
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
            <!-- 状态数据 -->
            <el-tab-pane name="zhuangtaishuju">
        <span slot="label">
          <Icon type="ios-cog-outline" style="font-size:20px"/>状态数据
        </span>
                <div class="drawer-profile">
                    <div>
                        <!-- 选项卡 -->
                        <Tabs type="card">
                            <!-- 表格 -->
                            <TabPane label="闸阀门开度历史">
                                <!-- 查询，导出行 -->
                                <Row :gutter="16" type="flex" justify="end" align="middle">
                                    <Col span="2">
                                        <span style="letter-spacing:2px">查询</span>
                                    </Col>
                                    <!-- 开始到结束时间选择 -->
                                    <Col span="19">
                                        <el-date-picker
                                                v-model="table.kaidulishi.date"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                @change="handleDatePickerChange_kaidulishi"
                                                :picker-options="table.kaidulishi.datePickerOptions"
                                                unlink-panels
                                                :type="table.kaidulishi.datePickerType"
                                                size="mini"
                                        ></el-date-picker>
                                    </Col>
                                </Row>
                                <!-- 分割线 -->
                                <div class="divider"></div>
                                <!-- 表格用于展示数据 -->
                                <div>
                                    <Table
                                            :columns="table.kaidulishi.activeColumns"
                                            :data="table.kaidulishi.Rows_filter"
                                            :loading="table.kaidulishi.loading"
                                            border
                                            size="small"
                                            :height="table.kaidulishi.height"
                                            @on-sort-change="sort_change_kaidulishi"
                                    ></Table>
                                    <!-- 分割线 -->
                                    <div class="divider"></div>
                                    <!-- 分页器 -->
                                    <el-pagination
                                            background
                                            :page-size="table.kaidulishi.pageSizes"
                                            layout="sizes, total, prev, pager, next, jumper "
                                            :page-sizes="[20, 50, 100, 200]"
                                            :total="table.kaidulishi.total"
                                            :current-page="table.kaidulishi.currentPage"
                                            :pager-count="5"
                                            @current-change="handleCurrentChange_kaidulishi"
                                            @size-change="handleSizeChange_kaidulishi"
                                            class="pageController"
                                            small
                                    ></el-pagination>
                                    <!-- 分割线 -->
                                    <div class="divider"></div>
                                </div>
                            </TabPane>
<!--                            <TabPane label="动态模拟图">-->
<!--                                &lt;!&ndash; 绘图 &ndash;&gt;-->
<!--                                <div class="waterLever">-->
<!--                                    <Row type="flex" justify="center">-->
<!--                                        <span style="line-height:3rem;font-size:20px">阀门已开高度：{{OD}}m</span>-->
<!--                                    </Row>-->
<!--                                    &lt;!&ndash; 分割线 &ndash;&gt;-->
<!--                                    <div class="divider"></div>-->
<!--                                    <div id="echartOD" width="300" height="400"></div>-->
<!--                                </div>-->
<!--                            </TabPane>-->
                            <TabPane label="图形">
                                <!-- 绘图 -->
                                <div
                                        v-show="table.kaidulishi.Rows_filter.length > 0"
                                        id="ztChart"
                                        :style="{width: '500px', height: '350px',margin: 'auto'}"
                                ></div>
                                <div
                                        v-show="table.kaidulishi.Rows_filter.length == 0"
                                        :style="{width: '500px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                                >暂无数据
                                </div>
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
    const oEcarts = document.getElementById("echartOD");
    import FilterMethods from "../../assets/commonJS/FilterMethods"; // 过滤方法
    export default {
        props: {
            info: {}
        },
        data() {
            return {
                OD: '',
                // 激活标签栏
                activeName: "zhuangtaishuju",
                // 站点
                siteInfo: {},
                //   多选框对象
                checkBox: {},
                //   选择框对象
                select: {},
                // 表格
                table: {
                    // 状态数据
                    kaidulishi: {
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
                                title: "闸门开度(m)",
                                width: 125,
                                key: "OD",
                                align: "center",
                                sortable: "custom"
                            },
                            {
                                width: 135,
                                title: "闸前水位(m)",
                                key: "UPZ",
                                align: "center",
                                sortable: "custom"
                            },
                            {
                                width: 135,
                                title: "闸后水位(m)",
                                key: "DWZ",
                                align: "center",
                                sortable: "custom"
                            },
                            {
                                width: 150,
                                title: "流量(m³/s)",
                                key: "Q",
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
                        // 表格高度
                        height: 430,
                        // 表格是否加载中
                        loading: false,
                        // 总条数
                        total: 0,
                        // 当前页
                        currentPage: 1,
                        // 每页显示数量
                        pageSizes: 20
                    }
                },
                // 图形
                chart: {
                    zhuangtai: null
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
                boxLoading: false
            };
        },
        mixins: [FilterMethods],
        methods: {
            // 绘制开度动态模拟图
            // createEchartsOD(el) {
            //     console.log('-------------', el)
            //     let myChart = this.$echarts.init(el)
            //     app.title = '柱状图框选';
            //
            //     var xAxisData = [];
            //     var data1 = [];
            //
            //     xAxisData.push('已开度');
            //     data1.push((Math.random() * 2).toFixed(2));
            //     var itemStyle = {
            //         normal: {},
            //         emphasis: {
            //             barBorderWidth: 1,
            //             shadowBlur: 10,
            //             shadowOffsetX: 0,
            //             shadowOffsetY: 0,
            //             shadowColor: 'rgba(0,0,0,0.5)'
            //         }
            //     };
            //
            //     let option = {
            //         backgroundColor: '#eee',
            //         legend: {
            //             data: ['bar'],
            //             align: 'left',
            //             left: 10
            //         },
            //         brush: {
            //             toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            //             xAxisIndex: 0
            //         },
            //         toolbox: {
            //             feature: {
            //                 magicType: {
            //                     type: ['stack', 'tiled']
            //                 },
            //                 dataView: {}
            //             }
            //         },
            //         tooltip: {},
            //         xAxis: {
            //             show: false,
            //             data: xAxisData,
            //             name: 'X Axis',
            //             silent: false,
            //             axisLine: {onZero: true},
            //             splitLine: {show: false},
            //             splitArea: {show: false}
            //         },
            //         yAxis: [
            //             {
            //                 show: false,
            //                 inverse: true,
            //                 splitArea: {show: false}
            //             },
            //             {
            //                 inverse: true,
            //                 splitArea: {show: false}
            //             },
            //         ],
            //         grid: {
            //             left: 100
            //         },
            //
            //         series: [
            //             {
            //                 name: 'bar',
            //                 type: 'bar',
            //                 stack: 'one',
            //                 itemStyle: itemStyle,
            //                 data: data1
            //             }
            //         ]
            //     };
            //
            //     myChart.setOption(option);
            // },


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
            search_kaidulishi() {
                // 表格加载中
                this.table.kaidulishi.loading = true;

                // 传递参数
                var body = {
                    STCD: this.siteInfo.STCD,
                    _page: this.table.kaidulishi.currentPage || 1,
                    _page_size: this.table.kaidulishi.pageSizes || 20
                };

                // 如果有选择排序，则传递排序参数
                if (this.table.kaidulishi.sort) {
                    var _sort = this.$FilterData.sort_Filter(this.table.kaidulishi.sort);
                    if (_sort) {
                        body._orderby = _sort;
                    }
                } else {
                    body._orderby = `TM desc`;
                }

                // 如果有选择日期进行查询，根据表格类型传递参数
                if (this.table.kaidulishi.date) {
                    var DTT = this.$FilterData
                        .elDatePicker_Filter(this.table.kaidulishi.date)
                        .split(",");
                    body.Time_min = DTT[1];
                    body.Time_max = DTT[2];
                }
                this.$GetData.Survey_History_ZFZT(
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
                        this.setTableTotal("kaidulishi", data.total);
                        this.setTableData("kaidulishi", data.data);
                        this.table.kaidulishi.loading = false;
                        // this.createChart_historyTable("ztChart", "historyTable", data.data)
                        body._page_size = 999999999;
                        body._page = 1;
                        this.$GetData.Survey_History_ZFZT(
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
                                this.createChart_historyTable(
                                    "ztChart",
                                    "historyTable",
                                    chartData.data
                                ); // 水情表格
                            }
                        );
                    }
                );

                // this.getTableData_kaidulishi(body, (data) => {

                // })
            },
            // 设置水情数据表格的总页数
            setTableTotal(tableName, total) {
                this.table[tableName].total = total;
            },
            // 绘图
            createChart_historyTable(id, tableType, data) {
                var ele = document.getElementById(id);

                if (data.length > 0) {
                    var echartData = this.$App.transform_ZFZT_data_into_ehart_data(
                        data,
                        tableType
                    ); // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象

                    if (!this.chart.zhuangtai) {
                        this.chart.zhuangtai = this.$echarts.init(ele);
                    }
                    this.chart.zhuangtai.setOption({
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
                                scale: true
                            },
                            {
                                name: `闸阀上/下水位m`,
                                type: "value",
                                axisLabel: {
                                    formatter: "{value} "
                                },
                                scale: true
                            },
                            // {
                            //     name: ` `,
                            //     type: "value",
                            //     axisLabel: {
                            //         formatter: "{value} "
                            //     },
                            //     scale: true
                            // }
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
                                yAxisIndex: 1
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
            handleCurrentChange_kaidulishi(index) {
                this.table["kaidulishi"].currentPage = index;
                this.search_kaidulishi();
            },
            // 处理每页显示条数切换
            handleSizeChange_kaidulishi(pageSizes) {
                this.table["kaidulishi"].pageSizes = pageSizes;
                this.table["kaidulishi"].currentPage = 1;
                this.search_kaidulishi();
            },

            // 设置开度历史表默认查询日期
            setTableDefaultDate_kaidulishi() {
                const end = new Date();
                const start = zeroPointOfTheDay();

                var timeSlot = [start, end];

                this.setTableDate("kaidulishi", timeSlot);

                function zeroPointOfTheDay() {
                    var date = new Date();
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    return date;
                }
            },
            // 获取对应水情历史数据表的数据
            getTableData_kaidulishi(body, callback) {
                console.log("getTableData_kaidulishi")
                this.axios
                    .get(`/guanqu/zhafakongzhi/kaidulishi`, {
                        // params: {
                        //   STCD: this.info.STCD
                        // }
                        params: body
                    })
                    .then(res => {
                        var data = res.data.list;
                        console.log("========================")
                        console.log(data);
                        var total = res.data.total;
                        this.OD = data[0].OD;
                        data = data.map(val => {
                            val.currentPage = this.table.kaidulishi.currentPage;
                            val.pageSizes = this.table.kaidulishi.pageSizes;
                            val.TM = this.dateFilter(val.TM);
                            val.OD = this.Z_Filter(val.OD);
                            val.UPZ = this.Z_Filter(val.UPZ);
                            val.DWZ = this.Z_Filter(val.DWZ);
                            val.Q = this.Z_Filter(val.Q, 3);
                            return val;
                        });

                        if (typeof callback == "function") {
                            callback({
                                data: data,
                                total: total
                            });
                        }
                    });
            },
            // 更新 XX 表格的数据
            setTableData(tableName, data) {
                this.table[tableName].Rows_filter = data;
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
            // 处理日期时间选择器确定事件_开度历史
            handleDatePickerChange_kaidulishi(item) {
                this.table.kaidulishi.currentPage = 1;
                this.search_kaidulishi();
            },
            // 设置 xx表格 时间选择器值
            setTableDate(tableName, val) {
                this.table[tableName].date = val;
            },
            // 排序
            sort_change_kaidulishi(item) {
                this.table.kaidulishi.sort = item;

                this.search_kaidulishi();
            }
        }
        ,
        mounted() {
            // this.createEchartsOD(document.getElementById('echartOD'))
            // 组件加载中
            this.componentLoading();
            // 获取详情数据
            this.axios
                .get(`/guanqu/table/details?ID=${this.info.rowinfo.STCD}&pk=STCD`)
                .then(res => {
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
                    // 组件加载取消
                    this.cancelComponentLoading();
                    // 设置开度历史数据表默认查询日期
                    this.setTableDefaultDate_kaidulishi();
                    // 查询开度历史数据表的数据
                    this.search_kaidulishi();
                });
            this.getTableData_kaidulishi();
        }
    }
    ;
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
