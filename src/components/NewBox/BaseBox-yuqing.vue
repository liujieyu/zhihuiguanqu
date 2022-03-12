<template>
    <div class="baseBoxContent">
        <!-- 折叠面板 -->
        <!-- 表单, 用于搜索查询 -->
        <Collapse active-key="1" style="display:none;">
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

                            <!-- <Col span="8">
                              <el-select
                                @change="search"
                                clearable
                                filterable
                                class="select-item"
                                size="mini"
                                v-model="form.model_guishu"
                                popper-append-to-body
                                placeholder="归属单位"
                              >
                                <el-option
                                  v-for="item in form.guishuList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                ></el-option>
                              </el-select>
                            </Col> -->
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <Row>
                            <Col span="12">
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
                            <Col>
                                开始时间
                                <el-date-picker
                                        class="date_zw"
                                        v-model="form.model_date[0]"
                                        type="datetime"
                                        size="mini"
                                        @change="search"
                                        format="yyyy-MM-dd HH"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                                预警预设值
                                <Input
                                        style="width: 140px;"
                                        @on-enter="search"
                                        placeholder="预警预设值mm"
                                        size="small"
                                        v-model="form.singular"
                                >
                                </Input>
                                <br>结束时间
                                <el-date-picker
                                        class="date_zw time_zw"
                                        v-model="form.model_date[1]"
                                        type="datetime"
                                        size="mini"
                                        @change="search"
                                        format="yyyy-MM-dd HH"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                                异常界限值
                                <Input
                                        style="width: 140px;"
                                        @on-enter="search"
                                        placeholder="异常界限值mm"
                                        size="small"
                                        v-model="form.YCJXZ"
                                >
                                </Input>
                            </Col>
                        </Row>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <Row :gutter="16" style="margin-top: -6px">
                            <Col span="22">
                                <Input
                                        search
                                        enter-button
                                        @on-search="search"
                                        placeholder="请输入要搜索的站名"
                                        size="small"
                                        v-model="form.search_str"
                                >
                                </Input>
                            </Col>
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
                        <!-- 分割线 -->
                        <!-- <div class="divider"></div> -->
                        <Row :gutter="16" type="flex" justify="left" align="middle">
                            <span style="letter-spacing:5px;margin-left: 15px;">雨量:</span>
                        </Row>
                        <!-- 分割线 -->
                        <!-- <div class="divider"></div> -->
                        <Row>
                            <el-radio-group
                                    v-model="form.yuliang"
                                    border
                                    size="mini">
                                <el-radio label="全部" style="color:rgb(207,204,207);">全部</el-radio>
                                <el-radio :label="0" style="color:rgb(41,196,1);">0</el-radio>
                                <el-radio :label="10" style="color:rgb(16,135,56);">10</el-radio>
                                <el-radio :label="25" style="color:rgb(90,179,255);">25</el-radio>
                                <el-radio :label="50" style="color:rgb(1,113,223);">50</el-radio>
                                <el-radio :label="100" style="color:rgb(255,132,1);">100</el-radio>
                                <el-radio :label="250" style="color:rgb(255,2,2);">250</el-radio>
                            </el-radio-group>
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
                <!-- <el-table-column align="center" label="水势" :width="80">
                  <template slot-scope="scope">
                    <div>
                      <strong
                        :style="{
                      color: scope.row.WPTN.status == 4? 'red' : scope.row.WPTN.status == 5?'blue' : 'black',
                      fontSize: scope.row.WPTN.status == 6?'12px' : '17px'
                    }"
                      >{{ scope.row.WPTN.symbol }}</strong>
                    </div>
                  </template>
                </el-table-column>-->
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
    import {setTimeout} from "timers";

    export default {
        props: {
            featrue: {
                type: Object
            }
        },
        components: {
            TipsQUDAO
        },
        data() {
            return {
                //雨量颜色参考图
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
                    yuliang: '',
                    YCJXZ: '50',
                    singular: '50',
                    search_str: "",
                    adressList: [],
                    qudaoList: [],
                    guishuList: [],
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
                            value: "p",
                            size: "small",
                            // iconType: "logo-facebook",
                            title: "雨量值"
                        }
                    ],
                    checkBoxList2: [
                        {
                            value: [],
                            size: 'small',
                            title: '全部',
                            color: 'rgb(207,204,207)'
                        },
                        {
                            value: [0, 0],
                            size: 'small',
                            title: '0',
                            color: 'rgb(41,196,1)'
                        },
                        {
                            value: [0, 10],
                            size: 'small',
                            title: '10',
                            color: 'rgb(16,135,56)'
                        },
                        {
                            value: [10, 25],
                            size: 'small',
                            title: '25',
                            color: 'rgb(90,179,255)'
                        },
                        {
                            value: [25, 50],
                            size: 'small',
                            title: '50',
                            color: 'rgb(1,113,223)'
                        },
                        {
                            value: [50, 100],
                            size: 'small',
                            title: '100',
                            color: 'rgb(255,132,1)'
                        },
                        {
                            value: [100, 250],
                            size: 'small',
                            title: '250',
                            color: 'rgb(255,2,2)'
                        },
                    ],
                    model_adress: null,
                    model_qudao: null,
                    model_guishu: ['1', '2', '3', '4', '5', '6', '7', '8'],
                    model_date: [],
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
                            title: "降雨(mm)",
                            key: "p",
                            width: 140,
                            align: "center",
                            sortable: "custom"
                        },
                        {
                            title: "行政区划",
                            key: "adnm",
                            width: 180,
                            align: "center"
                        },
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
            //获取默认时间
            getinittime() {
                var date = new Date();
                var YR = date.getFullYear();
                var MON = date.getMonth() + 1
                var datearray = new Array();
                if (parseInt(MON) < 10) {
                    MON = `0${MON}`;
                }
                var Day = date.getDate();
                if (parseInt(Day) < 10) {
                    Day = `0${Day}`;
                }
                var Hour = date.getHours();
                if (parseInt(Hour) < 10) {
                    Hour = `0${Hour}`;
                }
                if (date.getHours() < 8) {
                    //昨天的时间
                    var day1 = new Date();
                    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
                    day1.setHours(8);
                    day1.setMinutes(0);
                    day1.setSeconds(0);
                    var Hour2 = day1.getHours();
                    var MON2 = day1.getMonth() + 1;
                    var DAY2 = day1.getDate();
                    if (parseInt(Hour2) < 10) {
                        Hour2 = `0${Hour2}`;
                    }
                    if (parseInt(MON2) < 10) {
                        MON2 = `0${MON2}`;
                    }
                    if (parseInt(DAY2) < 10) {
                        DAY2 = `0${DAY2}`;
                    }
                    var s1 = `${day1.getFullYear()}-${MON2}-${DAY2} ${Hour2}:00:00`
                    datearray[0] = s1;
                    datearray[1] = `${YR}-${MON}-${Day} ${date.getHours()}:00:00`;
                    console.log('time1', s1, 'time2', datearray[1]);
                } else {
                    datearray[0] = `${YR}-${MON}-${Day} 08:00:00`;
                    datearray[1] = `${YR}-${MON}-${Day} ${Hour}:00:00`;
                }
                this.form.model_date = datearray;
            },
            //前一时段、后一时段
            fronttime() {
                if (this.form.model_date.length == 0) {
                    this.$message({
                        message: '请先选择时间',
                        type: 'warning'
                    });
                } else {
                    var date1 = this.form.model_date[0].substr(0, 19);
                    date1 = date1.replace(/-/g, '/');
                    var timestamp1 = new Date(date1).getTime() - 60 * 60 * 1000;
                    timestamp1 = new Date(timestamp1);
                    var YR1 = timestamp1.getFullYear();
                    var MON1 = timestamp1.getMonth() + 1;
                    var DAY1 = timestamp1.getDate();
                    var Hour1 = timestamp1.getHours();
                    if (parseInt(Hour1) < 10) {
                        Hour1 = `0${Hour1}`;
                    }
                    if (parseInt(MON1) < 10) {
                        MON1 = `0${MON1}`;
                    }
                    if (parseInt(DAY1) < 10) {
                        DAY1 = `0${DAY1}`;
                    }
                    this.form.model_date[0] = `${YR1}-${MON1}-${DAY1} ${Hour1}:00:00`;
                    // console.log(this.form.model_date[0]);

                    var date2 = this.form.model_date[1].substr(0, 19);
                    date2 = date2.replace(/-/g, '/');
                    var timestamp2 = new Date(date2).getTime() - 60 * 60 * 1000;
                    timestamp2 = new Date(timestamp2);
                    var YR2 = timestamp2.getFullYear();
                    var MON2 = timestamp2.getMonth() + 1;
                    var DAY2 = timestamp2.getDate();
                    var Hour2 = timestamp2.getHours();
                    if (parseInt(Hour2) < 10) {
                        Hour2 = `0${Hour2}`;
                    }
                    if (parseInt(MON2) < 10) {
                        MON2 = `0${MON2}`;
                    }
                    if (parseInt(DAY2) < 10) {
                        DAY2 = `0${DAY2}`;
                    }
                    this.form.model_date[1] = `${YR2}-${MON2}-${DAY2} ${Hour2}:00:00`;
                    console.log(this.form.model_date[1]);
                }
            },
            aftertime() {
                if (this.form.model_date.length == 0) {
                    this.$message({
                        message: '请先选择时间',
                        type: 'warning'
                    });
                } else {
                    var date1 = this.form.model_date[0].substring(0, 19);
                    date1 = date1.replace(/-/g, '/');
                    var timestamp1 = new Date(date1).getTime() + 60 * 60 * 1000;
                    timestamp1 = new Date(timestamp1);
                    var YR1 = timestamp1.getFullYear();
                    var MON1 = timestamp1.getMonth() + 1;
                    var DAY1 = timestamp1.getDate();
                    var Hour1 = timestamp1.getHours();
                    if (parseInt(Hour1) < 10) {
                        Hour1 = `0${Hour1}`;
                    }
                    if (parseInt(MON1) < 10) {
                        MON1 = `0${MON1}`;
                    }
                    if (parseInt(DAY1) < 10) {
                        DAY1 = `0${DAY1}`;
                    }
                    this.form.model_date[0] = `${YR1}-${MON1}-${DAY1} ${Hour1}:00:00`;
                    console.log(this.form.model_date[0]);

                    var date2 = this.form.model_date[1].substring(0, 19);
                    date2 = date2.replace(/-/g, '/');
                    var timestamp2 = new Date(date2).getTime() + 60 * 60 * 1000;
                    timestamp2 = new Date(timestamp2);
                    var YR2 = timestamp2.getFullYear();
                    var MON2 = timestamp2.getMonth() + 1;
                    var DAY2 = timestamp2.getDate();
                    var Hour2 = timestamp2.getHours();
                    if (parseInt(Hour2) < 10) {
                        Hour2 = `0${Hour2}`;
                    }
                    if (parseInt(MON2) < 10) {
                        MON2 = `0${MON2}`;
                    }
                    if (parseInt(DAY2) < 10) {
                        DAY2 = `0${DAY2}`;
                    }
                    this.form.model_date[1] = `${YR2}-${MON2}-${DAY2} ${Hour2}:00:00`;
                    console.log(this.form.model_date[1]);
                }
            },
            // 表格每一行点击事件
            cellClick(item) {
                var evt = new Object();
                evt.graphic = new Object();
                evt.graphic.attributes = item;
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(item));
                evt.graphic.attributes.rowinfo.tableType = {
                    yq: "hourTable",
                    clicktype:"yq",
                };
                var v = new Object();
                v.itype = "siteinfo";

                // 设置中心缩放
                this.setMapCenterandZoom(item.LGTD, item.LTTD);
                // 取消所有站点的闪烁
                this.$App.GraphicsLayer_Selection_clear();
                // 对应站点闪烁
                this.$App.add_Graphic_To_GraphicsLayer_Selection(item);
                // 展示抽屉详情框
                this.$App.showDrawer(evt, v);
            },
            // 设置中心和缩放 (接受经纬度，和缩放比例)
            setMapCenterandZoom(LGTD, LTTD, Zoom) {
                //koen 20190929
                //暂时不允许点击，防止缩到全球地图的bug
                //this.map.centerAndZoom([Number(LGTD), Number(LTTD)], Zoom || 1);
            },
            // 制图
            createChart(id, data) {
                if (data.length > 0) {
                    // data = data.slice(0, 3);


                    console.log(data);
                    // 雨情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
                    var echartData = this.$App.transform_YQ_data_into_ehart_data(data, "hourTable", false);

                    var x_List = echartData.x.list.map((val, index, array) => {
                        // 时间过滤

                        var time = val.split(" ");
                        return `${time[1].substring(0, 5)}:00`;
                    });


                    myChart = this.$echarts.init(document.getElementById(id));

                    myChart.setOption({
                        title: {
                            text: "今日雨量图"
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        // tooltip: {
                        //   trigger: "axis"
                        // },
                        legend: {
                            data: [echartData.y1.name],
                            y: "bottom"
                        },

                        // calculable: true,
                        animation: false,
                        xAxis: [
                            {
                                type: "category",
                                // boundaryGap: false,
                                data: x_List
                            }
                        ],
                        yAxis: [
                            {
                                name: `${echartData.y1.name} mm`,
                                type: "value",
                                axisLabel: {
                                    formatter: "{value} "
                                },
                                scale: true
                                // max: echartData.y1.max,
                                // min: echartData.y1.min
                            },

                        ],
                        series: [
                            {
                                name: echartData.y1.name,
                                type: "bar",
                                data: echartData.y1.list,
                                // data: [10,20,30,40,50,60,70,80,90,100]
                                itemStyle: {
                                    normal: {
                                        color: (params) => {
                                            if (params.data >= 25 && params.data < 50) return 'orange';
                                            if (params.data > 50) return 'red';
                                            return 'blue'
                                        }
                                    }
                                }
                            },

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
            // 获取 子组件传过来 的绘图方法
            // chart(item) {
            //   this.getChart = item.chart;
            // },
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
                    val_clone.TM = this.$FilterData.dateFilter(val_clone.TM);
                    // 时段降水量过滤
                    val_clone.DRP = this.Float_Filter(val_clone.DRP, 1);
                    // 流量过滤
                    // val_clone.Q = this.Z_Filter(val_clone.Q, 3);
                    // // 水势过滤
                    // val_clone.WPTN = this.WPTN_Filter(val_clone.WPTN);
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
            // 多选框标记勾选触发事件
            checkboxGroup_onChange(onCheck_Array) {
            },
            // 初始化baseBox
            baseBox_init() {
                this.table.currentPage = 1;
                // 获取地图对象,从父组件中
                this.getMapFormParent();
                // 获取图层对象,从父组件中
                this.getJsonFlayerFormParent();
                // 选取一部分从父组件传来的数据,将其加载为表格数据
                this.loadTableData(
                    this.getTableDataFormParent()
                );
                // 过滤table数据
                this.filterTableData();

                // 获取归属单位数据,然后设置归属单位选择框选项
                this.getTableData_WPR_FieldInfo({
                    FieldID: "STGR"
                }, data => {
                    this.form.guishuList = data.reverse();
                });
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
            this.getinittime();
            this.baseBox_Interval = setInterval(() => {
                this.baseBox_init();
            }, 1000 * 60 * 5)
        },
        destroyed() {
            clearInterval(this.baseBox_Interval)
        }
    };
</script>

<style lang="less" scope>
    /* 引入baseBox公共样式 */
    .date_zw {
        margin-bottom: 10px;
        width: 140px !important;
        margin-right: 10px;
    }
    .time_zw{
        margin-bottom: 0;
    }

    @import "../../assets/commonLess/baseBox";
</style>
