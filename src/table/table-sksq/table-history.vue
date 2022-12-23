<template>
    <div>
        <Content :style="{padding: '12px 24px 24px 24px', background: '#fff'}">
            <Row :gutter="16">
                <Col :span="span1">
                    <Row :gutter="16" type="flex" justify="start" z style="margin: 10px;line-height: 32px;">
                        <Col>时间:</Col>
                        <Col>
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
                        </Col>
                        <Col>
                        时段类别：
                        <Select v-model="select.shuiqing_select" @on-change="tableTypeOnChange_shuiqing" style="width:130px;margin-right: 20px;" >
                            <Option v-for="item in select.shuiqingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        </Col>
                        <!-- 
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 10px;;"
                                    @click="cellclick">站点详情
                            </Button>

                            <Button type="primary" style="width: auto;margin-right: 0px;margin-left: 10px;" @click="test1">显示/隐藏树形</Button>
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 20px;margin-left: 10px;"
                                    @click="err">导出
                            </Button>
                        </Col>
                         -->
                    </Row>
                    <div class="switch" @click="Menu_toggle">
                        <i class="el-icon-d-arrow-left" v-if="Menu.show_Controller"></i>
                        <i class="el-icon-d-arrow-right" v-if="!Menu.show_Controller"></i>
                    </div>
                    <Divider/>
                    <Row>
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                            监测站名：{{CZMC}}
                        </Col> -->
                        <Col style='font-size: 14px;' class="borsLine">站名：{{siteno}}&nbsp;
                        单位：水位 m，流量 10m³/s，库容 万m³&nbsp;&nbsp;4-6月汛限水位：{{yujingdata.FWL}}m&nbsp;7-9月汛限水位：{{yujingdata.FWL79}}m&nbsp;校核洪水位：{{yujingdata.XHWL}}m</Col>
                    </Row>
                    <Row :gutter="24" style="display: flex">
                        <Col style="width: 520px;">
                            <el-table
                                    :data="table.shuiqing.Rows_filter"
                                    border
                                    :height="theight"
                                    :loading="table.shuiqing.loading"
                                    @sort-change="sort_change"
                                    style="width: 520px">
                                <el-table-column
                                        label=" "
                                        type="index"
                                        align="center"
                                        width="55"
                                        :index="indexMethod">
                                </el-table-column>
                                <el-table-column
                                        v-for="(item,index) in table.shuiqing.activeColumns"
                                        :prop="item.key"
                                        :align="item.align"
                                        :label="item.title"
                                        :min-width="item.width"
                                        :sortable="item.sortable"
                                        :show-overflow-tooltip="true"
                                ></el-table-column>
                            </el-table>
                            <div style="margin: 10px;overflow: hidden">
                                <div style="float: right;">
                                    <Page
                                            :total="list_input.total"
                                            :current="list_input.current"
                                            show-sizer
                                            :page-size="list_input.pagesize"
                                            :page-size-opts="list_input.pagesizeopts"
                                            @on-change="CurrentChange"
                                            @on-page-size-change="PagesizeChange"
                                            size="small"
                                            show-total
                                            show-elevator
                                    ></Page>
                                </div>
                            </div>
                        </Col>
                        <Col span="13">
                            <div ref="achart" v-show="table.shuiqing.Rows_filter.length>0"  :style="{'width': '100%','height': chartheight+'px','margin-top': '1%'}"></div>
                            <div ref="noachart" v-show="table.shuiqing.Rows_filter.length==0"  :style="{'width': '100%','height': chartheight+'px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center','margin-top': '1%'}">暂无水情图数据</div>
                        </Col>
                    </Row>
                </Col>
                <transition name="el-fade-in-linear">
                    <Col :span="span2" v-show="show1">
                        <Row style="margin-top: 10px;line-height: 32px;">
                            <Col>
                                <Input search enter-button suffix="ios-search" placeholder="请输入行政区划或者站点名称" style="width: 250px;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
                            </Col>
                        </Row>
                        <Row style="margin-top: 30px;margin-left: 20px;">
                            <Col :style="{'overflow-y': 'auto', height: (theight+30)+'px'}">
                            <el-tree
                            
                                class="filter-tree"
                                :data="Treedata"
                                highlight-current="true"
                                node-key="id"
                                :default-expanded-keys="expandedarray"
                                :filter-node-method="filterNode"
                                @node-click="xzqh_tree"
                                ref="tree">
                            </el-tree>
                            </Col>
                        </Row>
                    </Col>
                </transition>
            </Row>
        </Content>
    </div>
</template>

<script type="text/javascript">
    import FilterMethods from "@/assets/commonJS/FilterMethods";
    import GetDataMethods from "@/assets/commonJS/GetDataMethods";
    import App from "@/App.vue";

    export default {
        data() {
            return {
                loading: false,
                theight:window.innerHeight-330,
                chartheight:(window.innerHeight-310)>600?600:(window.innerHeight-310),
                qudao: true,
                xingzhengquhua: false,
                show1: true,
                Menu: {show_Controller: false},
                span1: '19',
                span2: '5',
                select:{
                    // 日期选择器绑定值
                    shuiqing_datePicker: null,
                    // 水位数据历史表
                    shuiqingList: [
                    {
                        value: "historyTable",
                        size: "small",
                        label: "历史水情"
                    },
                    {
                        value: "hourTable",
                        size: "small",
                        label: "小时水情"
                    },
                    {
                        value: "dayTable",
                        size: "small",
                        label: "日水情"
                    },
                    {
                        value: "monthTable",
                        size: "small",
                        label: "月水情"
                    }
                    ],
                    // 水位数据历史表绑定值
                    shuiqing_select: "historyTable",
                },
                table:{
                    // 水情
                    shuiqing: {
                    // 表头设置
                    columns: {
                        // 历史表
                    historyTable: [
                    {
                        title: "时间",
                        key: "tm",
                        width: 135,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "库水位",
                        width: 90,
                        key: "RZ",
                        align: "center",
                        sortable: "custom"
                    },                   
                    {
                        width: 90,
                        title: "库容",
                        key: "W",
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        width: 105,
                        title: "入库流量",
                        key: "INQ",
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        width: 105,
                        title: "出库流量",
                        key: "OTQ",
                        align: "center",
                        sortable: "custom"
                    },
                    ],
                    // 小时表
                    hourTable: [
                    {
                        title: "时间",
                        key: "dt",
                        width: 135,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "库水位",
                        width: 90,
                        key: "RZ",
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        width: 90,
                        title: "库容",
                        key: "HW",
                        align: "center",
                        sortable: "custom"
                    },
                    // {
                    //   title: "库下水位(m)",
                    //   width: 150,
                    //   key: "BLRZ",
                    //   align: "center",
                    //   sortable: "custom"
                    // },
                    {
                        width: 105,
                        title: "入库流量",
                        key: "INQ",
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        width: 110,
                        title: "出库流量",
                        key: "OTQ",
                        align: "center",
                        sortable: "custom"
                    }
                    ],
                    // 日表
                    dayTable: [
                    {
                        title: "时间",
                        key: "tm",
                        width: 120,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "库水位",
                        width: 90,
                        key: "RZ",
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        width: 90,
                        title: "库容",
                        key: "DW",
                        align: "center",
                        sortable: "custom"
                    },
                    // {
                    //   title: "库下水位(m)",
                    //   width: 150,
                    //   key: "BLRZ",
                    //   align: "center",
                    //   sortable: "custom"
                    // },
                    {
                        width: 105,
                        title: "入库流量",
                        key: "INQ",
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        width: 105,
                        title: "出库流量",
                        key: "OTQ",
                        align: "center",
                        sortable: "custom"
                    }
                    ],
                    // 月表
                    monthTable: [
                    {
                        title: "时间",
                        key: "dt",
                        width: 100,
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        title: "库水位",
                        width: 90,
                        key: "RZ",
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        width: 90,
                        title: "库容",
                        key: "MW",
                        align: "center",
                        sortable: "custom"
                    },
                    // {
                    //   title: "库下水位(m)",
                    //   width: 150,
                    //   key: "BLRZ",
                    //   align: "center",
                    //   sortable: "custom"
                    // },
                    {
                        width: 105,
                        title: "入库流量",
                        key: "INQ",
                        align: "center",
                        sortable: "custom"
                    },
                    {
                        width: 105,
                        title: "出库流量",
                        key: "OTQ",
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
                },
                Treedata: [],
                expandedarray:[],
                filterTreeData:[],
                GD: '',
                data1: [],
                data2: [],
                date: '',
                STinfo: {},
                searchs:"",
                siteno:'',
                timesearch: '',
                CZMC: '',
                echarts: {
                    TM: [],
                    Q: [],
                    UPZ: [],
                    DWZ: [],
                },
                form: {
                    searchmsg: '',
                    date: '',
                    field: '',
                },
                searchmsg: '',
                MaxY1: 0,
                MaxY2: 0,
                MinY1: 0,
                MinY2: 0,
                list_input: {
                    total: 100,
                    pagesize: 50,
                    pagesizeopts: [10, 20, 50, 75, 100, 200],
                    current: 1
                },
                yujingdata: {
                    A_ZCFWL: '',
                    A_XXFWL: '',
                }
            };
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods, GetDataMethods],
        // watch: {
        //   searchmsg(val) {
        //     this.$refs.tree.filter(val);
        //   }
        // },
        mounted() {
            //获取行政区划树
            this.axios.get("/guanqu/info/xzqhtree?TYPE=6").then(res => {
                this.Treedata = res.data;
                this.expandedarray.push(this.Treedata[0].id);
                this.expandedarray.push(this.Treedata[0].children[0].id);
                var stcd=this.Treedata[0].children[0].children[0].value;
                this.searchs = stcd;    
                this.siteno = this.Treedata[0].children[0].children[0].label;
                this.table["shuiqing"].currentPage = 1;
                this.table["shuiqing"].date = null;
                this.table["shuiqing"].sort = null;
                this.setDatePickerType_shuiqing(this.select.shuiqing_select); // 设置日期时间选择器的类型
                this.setActiveColumns_shuiqing(this.select.shuiqing_select); // 设置水情历史数据表 当前激活的表头
                this.table.shuiqing.loading = true; // 表格加载中
                if (this[`setTableDefaultDate_shuiqing_${this.select.shuiqing_select}`]) {
                    this[`setTableDefaultDate_shuiqing_${this.select.shuiqing_select}`]();
                }
                this.set_SKSQ_alarmInfo(this.searchs,data=>{
                    this.Reload();
                });           
            });
        },
        methods: {
            // 设置 xx表格 时间选择器值
            setTableDate(tableName, val) {
            this.table[tableName].date = val;
            },
            sort_change(column) {
                console.log(column);
                if (column.order == 'ascending') {
                    this.form.field = column.prop;
                    this.ReloadBysort();
                }
                if (column.order == 'descending') {
                    this.form.field = column.prop + ' desc';
                    this.ReloadBysort();
                }
                if (column.order == null) {
                    this.form.field = '';
                    this.ReloadBysort();
                }
            },
            Menu_toggle() {
                this.Menu.show_Controller = !this.Menu.show_Controller;
                this.show1 = !this.show1;
                if (this.show1 == true) {
                    this.span1 = '19';
                    this.span2 = '5';
                    this.data2 = {};
                    this.Reload();
                } else {
                    this.span1 = '24';
                    this.span2 = '0';
                    this.data2 = {};
                    this.Reload();
                }
            },

            // 监听动态参数事件处理函数
            test1(agmt) {
                this.Menu.show_Controller = !agmt;
                // this.show1 = agmt;
                if (agmt) {
                    if(this.span1 == '24'){
                        this.span2 = '0';
                        this.asyncExecute();
                        return
                    }
                    this.span1 = '19';
                    this.span2 = '5';
                    this.data2 = {};
                    this.asyncExecute()
                } else {
                    if(this.span1 == '24'){
                        this.span2 = '0';
                        this.asyncExecute();
                        return;
                    }
                    this.span1 = '19';
                    this.span2 = '5';
                    this.data2 = {};
                    this.asyncExecute()
                }
            },
            // 异步刷新，重新绘图
            asyncExecute(){
                setTimeout(this.Reload, 100)
            },
            filterNode(value, Treedata, node) {  
                if (!value){
                    this.filterTreeData.push(Treedata);
                    return true;
                } 
                if(Treedata.label.indexOf(value) !== -1){
                    this.filterTreeData.push(Treedata);
                    return true;
                }else{
                    if(this.filterTreeData.length==0){
                    return false;
                    }else{
                    var nodedata=this.filterTreeData[this.filterTreeData.length-1];
                    if(nodedata.level==3){
                        return false;
                    }else{
                        if(nodedata.level>=Treedata.level){
                        return false;
                        }else{
                        var parent=Treedata.parent;
                            if(parent.indexOf(nodedata.value)>-1){
                            return true;
                            }else{
                            return false;
                            }     
                        }
                    }
                    
                    }
                    
                }                
                },
            xzqh_tree(data){
                console.log(data);
                if (data.level==3) {
                    debugger;
                    this.searchs = data.value;
                    this.siteno=data.label;
                    this.set_SKSQ_alarmInfo(this.searchs,data=>{
                        this.Reload();
                    });
                }
                },
            search() {
                this.filterTreeData = [];
                this.$refs.tree.filter(this.searchmsg);
                if (this.searchmsg != '') {
                    this.filterTreeData.some((val, index) => {
                    if(index==0 && val.level==1){
                    this.expandedarray=[val.id,val.children[0].id];
                    this.searchs=val.children[0].children[0].value;
                    this.siteno=val.children[0].children[0].label;
                    return true;
                    }else if(index==0 && val.level==2){
                    this.expandedarray=[val.id];
                    this.searchs=val.children[0].value;
                    this.siteno=val.children[0].label;
                    return true;
                    }else if(index==0 && val.level==3){
                    this.searchs = val.value;
                    this.siteno=val.label;
                    return true;
                    }
                });
                    this.set_SKSQ_alarmInfo(this.searchs,data=>{
                        this.Reload();
                    });
                }else{
                    this.$refs.tree.root.childNodes.forEach((e)=>{
                        e.expanded=false;
                    }); 
                    this.expandedarray=[this.Treedata[0].id,this.Treedata[0].children[0].id];
                    this.searchs = this.Treedata[0].children[0].children[0].value;   
                    this.siteno= this.Treedata[0].children[0].children[0].label;    
                    this.set_SKSQ_alarmInfo(this.searchs,data=>{
                        this.Reload();
                    });
                }
            },
            handleDatePickerChange(){
                this.table.shuiqing.currentPage = 1;
                this.Reload();
            },
            timechange() {
                console.log(this.form.date);
                this.Reload();
            },
            cellclick() {
                console.log(JSON.stringify(this.STinfo));
                if (JSON.stringify(this.STinfo) == "{}") {
                    this.$Message.warning('请先选择站点');
                } else {
                    if(this.STinfo.bj) this.STinfo.STCD = this.STinfo.canal_code;
                    var evt = new Object();
                    evt.graphic = new Object();
                    evt.graphic.attributes = this.STinfo;
                    evt.graphic.attributes.STNM = this.CZMC;
                    evt.graphic.attributes.itype = "shuikushuiqing";
                    evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(this.STinfo));
                    evt.graphic.attributes.rowinfo.tableType = {
                        sksq: "historyTable"
                    };
                    var v = new Object;
                    v.itype = "shuikushuiqing";
                    console.log("evt", evt);
                    this.$App.showDrawer(evt, v);
                }
                // var evt = new Object();
                // evt.graphic = new Object();
                // evt.graphic.attributes = this.data1[0];
                // evt.graphic.attributes.itype = "zhafashuiqing";
                // evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(this.data1[0]))
                // evt.graphic.attributes.rowinfo.tableType = {
                //   qdsq: "historyTable"
                // };
                // var v = new Object;
                // v.itype = "zhafashuiqing";
                // console.log("evt",evt);
                // this.$App.showDrawer(evt, v);
            },
            drawchart() {
                var achart = this.$echarts.init(this.$refs.achart);
                console.log(achart);
                achart.resize();
                achart.setOption({
                    title: {text: this.data2.chartName},
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["库水位","库容"],
                        bottom:-5
                    },
                    toolbox: {
                        show: true,
                        feature: {
                        mark: { show: true },
                        magicType: { show: true, type: ["line", "bar"] },
                        saveAsImage: { show: true }
                        }
                    },
                    axisPointer: {
                        link: {xAxisIndex: 'all'}
                    },
                    grid: [{
                        left: 38,
                        right: this.data2.right,
                        height: '34%'
                        }, {
                        left: 38,
                        right: this.data2.right,
                        top: '59%',
                        height: '34%'
                    }],
                    xAxis: [
                        {
                            boundaryGap: false,
                            data: this.data2.x.list,
                        },
                        {
                            gridIndex: 1,
                            boundaryGap: false,
                            data: this.data2.x.list,
                            position: 'bottom'
                        }
                    ],
                    yAxis: [
                        {
                            name: '库水位(m)',
                            type: "value",
                            minInterval:1, 
                            min:this.data2.y1.min,
                            max:this.data2.y1.max
                        },
                        {
                            gridIndex: 1,
                            name: this.data2.y4.name+'(万m³)',
                            type: "value",
                            minInterval:1, 
                            min:200,
                            max:1000
                        }
                    ],
                    series: [
                        {
                            name: "库水位",
                            type: "line",
                            yAxisIndex: 0,
                            data:this.data2.y1.list,
                            showSymbol: false,
                            smooth: true,
                            itemStyle : {  
                                normal : {  
                                    color:'#6C84CE'  
                                }  
                            },  
                            areaStyle: {},
                            markLine : {
                                symbol:'none',
                                itemStyle : {  
                                                normal : {  
                                                    lineStyle:{  
                                                    type:'solid',
                                                        color:'red',
                                                    }  
                                                }  
                                            },
                                data : this.data2.markdata,
                            },
                        },
                        {
                            name: this.data2.y4.name,
                            type: "line",
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data:this.data2.y4.list,
                            showSymbol: false,
                            smooth: true,
                            itemStyle : {  
                                normal : {  
                                    color:'#91CC75'  
                                }  
                            },  
                            areaStyle: {},
                            markLine: {
                            symbol:'none',
                                itemStyle : {  
                                                normal : {  
                                                    lineStyle:{ 
                                                        type:'solid', 
                                                        color:'red',
                                                    }  
                                                }  
                                            },
                            data: [{name:"防洪库容820.50",
                                    yAxis: 820.5,
                                    label: {
                                    formatter: '{b}',
                                    position: 'middle'
                                    }}],
                        }
                        }
                    ]
                });
            },
            err() {
                this.$Message.warning('该功能还在开发中...');
            },
            // 设置水库水情预警信息
            set_SKSQ_alarmInfo(STCD,callback) {
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
                this.yujingdata.XHWL=yujingdata.XHWL;
                this.yujingdata.ZCWL=yujingdata.ZCWL;
                callback(yujingdata);
                }
            );
            },
            // 切换 水情历史数据表类型
            tableTypeOnChange_shuiqing(tableType) {
            this.table["shuiqing"].currentPage = 1;
            this.table["shuiqing"].sort = null;
            this.table["shuiqing"].date = null;
            this.setDatePickerType_shuiqing(tableType); // 设置日期时间选择器的类型
            this.setActiveColumns_shuiqing(tableType); // 设置水情历史数据表 当前激活的表头
            if (this[`setTableDefaultDate_shuiqing_${tableType}`]) {
                    this[`setTableDefaultDate_shuiqing_${tableType}`]();
                }
            // 获取对应水情历史数据表的数据
            this.Reload();
            },
            // 水情历史数据表 当前正在激活的表头
            setActiveColumns_shuiqing(tableType) {
            this.table.shuiqing.activeColumns = this.table.shuiqing.columns[tableType];
            this.select.shuiqing_select = tableType;
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
            // 表格加载中
            letTableLoading(tableName) {
                this.table[tableName].loading = true;
            },
            // 取消表格加载
            cancelTableLoading(tableName) {
                this.table[tableName].loading = false;
            },
            ReloadBysort(){
                var tableType = this.select.shuiqing_select;
                this.letTableLoading("shuiqing"); // 表格加载中
                console.log('+++++++++++++'+tableType);
                // 传递参数
                var body = {
                    STCD: this.searchs,
                    _page: this.list_input.current,
                    _page_size: this.list_input.pagesize
                };

                // 如果有选择排序，则传递排序参数
                if (this.form.field!=null && this.form.field!='') {
                    body._orderby = this.form.field;
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
                        break;
                    }
                }

                // 获取水库水情历史数据
                this.$GetData.Survey_History_SKSQ(
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
                    this.table.shuiqing.Rows_filter = data.data;
                    this.list_input.total = data.total;
                    }
                );
            },
            Reload() {
                var tableType = this.select.shuiqing_select;
                this.letTableLoading("shuiqing"); // 表格加载中
                console.log('+++++++++++++'+tableType);
                // 传递参数
                var body = {
                    STCD: this.searchs,
                    _page: this.list_input.current,
                    _page_size: this.list_input.pagesize
                };

                // 如果有选择排序，则传递排序参数
                if (this.form.field!=null && this.form.field!='') {
                    body._orderby = _this.form.field;
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
                        break;
                    }
                }

                // 获取水库水情历史数据
                this.$GetData.Survey_History_SKSQ(
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
                    this.table.shuiqing.Rows_filter = data.data;
                    this.list_input.total = data.total;
                    body._page_size = 999999999;
                    body._page = 1;
                    this.$GetData.Survey_History_SKSQ(
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
                          this.data2=chartData.data;
                            if(this.data2==null || this.data2.length==0){
                             return;
                            }
                            this.data2 = this.$App.transform_SKSQ_data_into_ehart_data(this.data2,tableType,true); // 水库水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        console.log(this.data2);
        this.data2.markdata=[];
        var y1max = Math.ceil(parseFloat(this.yujingdata.XHWL)),
            y1min = Math.floor(FilterMethods.methods.get_echart_min(this.data2.y1.list));
        this.data2.y1.max=y1max;
        this.data2.y1.min=y1min;
        var mintime=this.data2.x.list[0].slice(0, 10),maxtime=this.data2.x.list[this.data2.x.list.length-1].slice(0, 10);
        var minmonth=mintime.split("-")[1],maxmonth=maxtime.split("-")[1];
          this.data2.y1.markval2=this.yujingdata.XHWL;
        if((parseInt(minmonth)>=7 && parseInt(minmonth)<=9) || (parseInt(maxmonth)>=7 && parseInt(maxmonth)<=9)){
          this.data2.y1.markval=this.yujingdata.FWL79;
        }else{
          this.data2.y1.markval=this.yujingdata.FWL;
        }
        //设置markLine
                    var jhsw=new Object();
                    jhsw.name='校核水位 '+this.data2.y1.markval2;
                    jhsw.yAxis=parseFloat(this.yujingdata.XHWL);
                    jhsw.label={
                           formatter: '{b}',
                           position: 'middle',
                    }
                    this.data2.markdata.push(jhsw);
                    var zcsw=new Object();
                    zcsw.name='汛限水位 '+this.data2.y1.markval;
                    zcsw.yAxis=parseFloat(this.data2.y1.markval);
                    zcsw.label={
                           formatter: '{b}',
                           position: 'middle',
                    }
                    this.data2.markdata.push(zcsw);
        if(this.data2.y1.min>parseFloat(this.yujingdata.SWL)){
          this.data2.y1.min=parseFloat(this.yujingdata.SWL);
        }else{
          var ssw=new Object();
                      ssw.name='死水位 '+this.yujingdata.SWL;
                      ssw.yAxis=parseFloat(this.yujingdata.SWL);
                      ssw.label={
                           formatter: '{b}',
                           position: 'middle',
                    }
                      this.data2.markdata.push(ssw);
        }
        var nowDate=new Date();
        var now=this.getNowDayString(nowDate);
        console.log(now);
        this.data2.right=24;
        if(mintime==now && maxtime==now && tableType=='historyTable'){
            this.data2.chartName = "今日水情图";
            //this.data2.right=10;
            for(var i=0;i<this.data2.x.list.length;i++){
              var time = this.data2.x.list[i].split(" ");
              this.data2.x.list[i]=time[1];
            }
        }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==nowDate.getFullYear()){
            for(var i=0;i<this.data2.x.list.length;i++){
              var time = this.data2.x.list[i].substr(5);
              this.data2.x.list[i]=time;
            }
        }
        // y4轴
                    this.data2.y4.name = "库容"; // Y2轴名字
                    var y4max = Math.ceil(FilterMethods.methods.get_echart_max(this.data2.y4.list)),
                        y4min = Math.floor(FilterMethods.methods.get_echart_min(this.data2.y4.list));
                    this.data2.y4.max = y4max; // y4最大值
                    this.data2.y4.min = y4min < 0 ? 0 : y4min; // y4最小值                    
                    var datalist1=[];
                    var datalist2=[];
                    for(var i=0;i<this.data2.x.list.length;i++){
                      var obj_data1=[this.data2.x.list[i],this.data2.y1.list[i]];
                      datalist1.push(obj_data1);
                      var obj_data2=[this.data2.x.list[i],this.data2.y4.list[i]];
                      datalist2.push(obj_data2);
                    }
                    this.data2.y1.list=datalist1;
                    this.data2.y4.list=datalist2;
        switch (this.data2.chartName) {
                case "历史表":
                    this.data2.chartName="历史水情图";
                    break;
                case "小时表":
                    this.data2.chartName="小时水情图";
                    break;
                case "日表":
                    this.data2.chartName="日水情图";
                    break;
                case "月表":
                    this.data2.chartName="月水情图";
                    break;
                case "年表":
                    this.data2.chartName="年水情图";
                    break;
                }
                this.drawchart();
                         }                        
                    );

                    this.cancelTableLoading("shuiqing"); // 取消表格加载
                    }
                );
            },
            //返回日期
    getNowDayString(now){
      return now.getFullYear()+"-"+((now.getMonth()+1)<10?"0"+(now.getMonth()+1):(now.getMonth()+1))+"-"+(now.getDate()<10?"0"+now.getDate():now.getDate());
    },
            indexMethod(index) {
                return index + 1 + (this.list_input.pagesize * (this.list_input.current - 1));
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
                this.list_input.current = index;
                this.ReloadBysort();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
                this.list_input.pagesize = pagesize;
                this.ReloadBysort();
            }
        },
        created() {
        },
        computed: {
            balabala() {
                //console.log(this.$store.state.anniu);
                return this.$store.state.anniu
            }
        },
        watch: {
            // 'this.$store.state.anniu': function(){
            //   console.log(this.$store.state.anniu);
            // }
            balabala(curVal, oldVal) {
                console.log(curVal);
                this.test1(curVal)
            }
        },
    };
</script>

<style type="text/css" lang="less">
    .switch {
        position: absolute;
        right: 0;
        top: 0;
        height: 55px;
        display: flex;
        align-items: center;
        background: white;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: #7eb7f0 2px solid;
        border-right: 0;
    }

    .el-table th {
        padding: 0 !important;
    }
</style>
