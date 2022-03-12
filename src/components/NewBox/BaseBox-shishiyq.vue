<template>
    <div class="baseBoxContent">
        <!-- 折叠面板 -->
       <div style="float:right;font-size:12px;">单位：mm</div>
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
                    @header-click="headerClick"
                    :header-cell-style="{'cursor':'pointer','padding':'6px 0px'}"
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
                <el-table-column align="center" label="站名" :width="110" fixed="left">
                    <template slot-scope="scope">
                        <div>
                        <span
                            :style="{
                        color: scope.row.level == 3?'red' :scope.row.level == 2?'orange' : scope.row.level == 1?'yellow' :'#606266',
                        }"
                        >{{ scope.row.STNM }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="1小时降雨" :width="80">
                    <template slot-scope="scope">
                        <div>
                        <span
                            :style="{
                        color: scope.row.SIGN1 == 3?'red' :scope.row.SIGN1 == 2?'orange' : scope.row.SIGN1 == 1?'yellow' :'#606266',
                        }"
                        >{{ scope.row.RAIN1 }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="3小时降雨" :width="80">
                    <template slot-scope="scope">
                        <div>
                        <span
                            :style="{
                        color: scope.row.SIGN3 == 3?'red' :scope.row.SIGN3 == 2?'orange' : scope.row.SIGN3 == 1?'yellow' :'#606266',
                        }"
                        >{{ scope.row.RAIN3 }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="6小时降雨" :width="80">
                    <template slot-scope="scope">
                        <div>
                        <span
                            :style="{
                        color: scope.row.SIGN6 == 3?'red' :scope.row.SIGN6 == 2?'orange' : scope.row.SIGN6 == 1?'yellow' :'#606266',
                        }"
                        >{{ scope.row.RAIN6 }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="12小时降雨" :width="90">
                    <template slot-scope="scope">
                        <div>
                        <span
                            :style="{
                        color: scope.row.SIGN12 == 3?'red' :scope.row.SIGN12 == 2?'orange' : scope.row.SIGN12 == 1?'yellow' :'#606266',
                        }"
                        >{{ scope.row.RAIN12 }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="24小时降雨" :width="90">
                    <template slot-scope="scope">
                        <div>
                        <span
                            :style="{
                        color: scope.row.SIGN24 == 3?'red' :scope.row.SIGN24 == 2?'orange' : scope.row.SIGN24 == 1?'yellow' :'#606266',
                        }"
                        >{{ scope.row.RAIN24 }}</span>
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
    </div>
</template>


<script>
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
        },
        data() {
            return {
                // 提示 展示
                tip: {
                    info_tip: null,
                    show_tip: false
                },
                // 表单数据
                form: {
                    yuliang: '',
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
                        // {
                        //     title: "站名",
                        //     key: "STNM",
                        //     width: 110,
                        //     align: "center",
                        //     fixed: "left",
                        //     sortable: "custom"
                        // },
                        // {
                        //     title: "1小时降雨",
                        //     key: "RAIN1",
                        //     width: 80,
                        //     align: "center",
                        // },
                        // {
                        //     title: "3小时降雨",
                        //     key: "RAIN3",
                        //     width: 80,
                        //     align: "center",
                        // },
                        // {
                        //     title: "6小时降雨",
                        //     key: "RAIN6",
                        //     width: 80,
                        //     align: "center",
                        // },
                        // {
                        //     title: "12小时降雨",
                        //     key: "RAIN12",
                        //     width: 90,
                        //     align: "center",
                        // },
                        // {
                        //     title: "24小时降雨",
                        //     key: "RAIN24",
                        //     width: 90,
                        //     align: "center",
                        // },
                        
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
                //this.setMapCenterandZoom(item.LGTD, item.LTTD);
                // 取消所有站点的闪烁
                this.$App.GraphicsLayer_Selection_clear();
                // 对应站点闪烁
                this.$App.add_Graphic_To_GraphicsLayer_Selection(item);
                // 展示抽屉详情框
                this.$App.showDrawer(evt, v);
            },
            headerClick(item){
                console.log(item);
                var sign=0,rainattr='RAIN1';
                if(item.label=="站名" || item.label==" "){
                    return;
                }
                switch(item.label){
                    case '1小时降雨':sign=1;rainattr='RAIN1';
                    break;
                    case '3小时降雨':sign=3;rainattr='RAIN3';
                    break;
                    case '6小时降雨':sign=6;rainattr='RAIN6';
                    break;
                    case '12小时降雨':sign=12;rainattr='RAIN12';
                    break;
                    case '24小时降雨':sign=24;rainattr='RAIN24';
                    break;
                }
                var num=0;
                FilterMethods.methods.newArrayByObjArray(this.table.Rows, rainattr, val => { // 过滤
                    if(val>0){
                      num+=1;
                    }             
                });
                if(num>0){
                    this.$App.shouDialog(sign,true); 
                }else{
                    this.$App.shouDialog(sign,false); 
                }
                              
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
                    val_clone.RAIN1=val_clone.RAIN1;
                    val_clone.RAIN3=val_clone.RAIN3;
                    val_clone.RAIN6=val_clone.RAIN6;
                    val_clone.RAIN12=val_clone.RAIN12;
                    val_clone.RAIN24=val_clone.RAIN24;
                    val_clone.level=0;
                    if(val_clone.level<val_clone.SIGN1){
                        val_clone.level=val_clone.SIGN1;
                    }
                    if(val_clone.level<val_clone.SIGN3){
                        val_clone.level=val_clone.SIGN3;
                    }
                    if(val_clone.level<val_clone.SIGN6){
                        val_clone.level=val_clone.SIGN6;
                    }
                    if(val_clone.level<val_clone.SIGN12){
                        val_clone.level=val_clone.SIGN12;
                    }
                    if(val_clone.level<val_clone.SIGN24){
                        val_clone.level=val_clone.SIGN24;
                    }
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
            // 多选框标记勾选触发事件
            checkboxGroup_onChange(onCheck_Array) {
            },
            // 初始化baseBox
            baseBox_init() {
                this.table.currentPage = 1;
                // 选取一部分从父组件传来的数据,将其加载为表格数据
                this.loadTableData(
                    this.getTableDataFormParent()
                );
                // 过滤table数据
                this.filterTableData();

            },
        },
        created() {
            // 初始化baseBox
            this.baseBox_init();
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
