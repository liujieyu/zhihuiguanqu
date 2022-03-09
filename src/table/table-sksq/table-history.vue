<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
            <Row :gutter="16">
                <Col :span="span1">
                    <Row :gutter="16" type="flex" justify="start" z style="margin: 10px;line-height: 32px;">
                        <Col>
                            时间:
                            <el-date-picker
                                    v-model="form.date"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right"
                                    style="width: 340px"
                                    @change="timechange"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :clearable="false"
                                    size="small"
                                    width="200"
                            >
                            </el-date-picker>
                        </Col>

                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 10px;;"
                                    @click="cellclick">站点详情
                            </Button>

                            <!-- <Button type="primary" style="width: auto;margin-right: 0px;margin-left: 10px;" @click="test1">显示/隐藏树形</Button> -->
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 20px;margin-left: 10px;"
                                    @click="err">导出
                            </Button>
                        </Col>
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
                        <Col style='font-size: 14px;' class="borsLine">站名：{{CZMC}}&nbsp;
                        单位：水位 m，流量 10m³/s</Col>
                    </Row>
                    <Row :gutter="24" style="display: flex">
                        <Col style="width: 600px;">
                            <el-table
                                    :data="data1"
                                    border
                                    height="500"
                                    v-loading="loading"
                                    @sort-change="sort_change"
                                    style="width: 600px">
                                <el-table-column
                                        label=" "
                                        type="index"
                                        align="center"
                                        width="60"
                                        :index="indexMethod">
                                </el-table-column>
                                <el-table-column
                                        prop="tm"
                                        label="时间"
                                        sortable="custom"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="RZ"
                                        label="水位"
                                        sortable="custom"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="INQ"
                                        label="入库流量"
                                        sortable="custom"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="OTQ"
                                        label="出库流量"
                                        sortable="custom"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="W"
                                        label="库容"
                                        sortable="custom"
                                        align="center"
                                >
                                </el-table-column>
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
                        <Col span="12">
                            <div ref="achart"
                                 style="width: 100%;height: 400px;margin-top: 1%;margin-bottom: 50px;"></div>
                        </Col>
                    </Row>
                </Col>
                <transition name="el-fade-in-linear">
                    <Col :span="span2" v-show="show1">
                        <Row style="margin-top: 10px;line-height: 32px;">
                            <Col>
                                <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
                            </Col>
                        </Row>
                        <Row style="margin-top: 30px;margin-left: 20px;">
                            <Col style="max-height: 600px;overflow-y: auto;">
                                <Button shape="circle" @click="changeTree">切换树形图</Button>
                                <el-tree
                                        class="filter-tree"
                                        :data="Treedata2"

                                        :filter-node-method="filterNode"
                                        v-if="xingzhengquhua"
                                        @node-click="xingzheng_tree"
                                        ref="tree">
                                </el-tree>
                                <el-tree
                                        class="filter-tree"
                                        :data="Treedata"

                                        :filter-node-method="filterNode"
                                        v-if="qudao"
                                        @node-click="qudao_tree"
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
                qudao: true,
                xingzhengquhua: false,
                show1: true,
                Menu: {show_Controller: false},
                span1: '19',
                span2: '5',
                Treedata: [
                    {
                        title: "xxx灌区",
                        expand: true,
                        children: [
                            {
                                title: "xxx渠道",
                                expand: true,
                                children: [
                                    {
                                        title: "站点A"
                                    },
                                    {
                                        title: "站点B"
                                    }
                                ]
                            },
                            {
                                title: "xxx渠道",

                                children: [
                                    {
                                        title: "站点C"
                                    }
                                ]
                            },
                            {
                                title: "xxx渠道",

                                children: [
                                    {
                                        title: "站点D"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                Treedata2: [],
                GD: '',
                data1: [],
                data2: [],
                changebtn: '切换线形图',
                date: '',
                STinfo: {},
                searchs: "",
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
            var date = new Date();
            var Month = date.getMonth() + 1;
            var datelist = new Array();
            var Hours = date.getHours();
            var Minutes = date.getMinutes();
            var Seconds = date.getSeconds();
            if (Hours < 10) {
                Hours = `0${Hours}`
            }
            if (Minutes < 10) {
                Minutes = `0${Minutes}`
            }
            if (Seconds < 10) {
                Seconds = `0${Seconds}`
            }
            if (Month < 10) {
                Month = `0${Month}`
            }
            datelist[0] = `${date.getFullYear()}-${Month}-${date.getDate()} 00:00:00`;
            datelist[1] = `${date.getFullYear()}-${Month}-${date.getDate()} ${Hours}:${Minutes}:${Seconds}`;
            this.form.date = datelist;
            console.log(this.form.date);
            this.axios.get("/guanqu/table/xingzhen_tree?type=2").then(res => {
                console.log(res);
                this.Treedata2 = this.XingZheng_Tree_Filter('650000000000', res.data).data;
            });
            //获取输排水渠道数据,然后设置渠道选择框选项
            this.axios.get("/guanqu/table/qudao_tree?type=2").then(res => {
                this.Treedata = this.QuDao_Tree_Filter(res.data).data;
                this.CZMC = this.QuDao_Tree_Filter(res.data).siteinfo.canal_name;
                // this.searchs = `&STCD=${this.QuDao_Tree_Filter(res.data).siteinfo.
                //   canal_code}`;
                this.STinfo.STNM = this.QuDao_Tree_Filter(res.data).siteinfo.canal_name;
                this.STinfo.STCD = this.QuDao_Tree_Filter(res.data).siteinfo.canal_code;
                this.searchs = this.QuDao_Tree_Filter(res.data).siteinfo.canal_code;
                this.Reload();
                console.log('渠道', this.QuDao_Tree_Filter(res.data));
            });
            // this.Reload();
        },
        methods: {
            sort_change(column) {
                console.log(column);
                if (column.order == 'ascending') {
                    this.form.field = column.prop;
                    this.Reload();
                }
                if (column.order == 'descending') {
                    this.form.field = column.prop + ' desc';
                    this.Reload();
                }
                if (column.order == null) {
                    this.form.field = '';
                    this.Reload();
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
            qudao_tree(data) {
                console.log(data);
                if (data.bj == 0) {
                    console.log('++++++++++++++++',data.canal_code);
                    this.searchs = data.canal_code;
                    this.STinfo = data;
                    this.CZMC = data.label.replace('【站点】', '');
                    this.Reload();
                }
            },
            xingzheng_tree(data) {
                console.log(data);
                if (data.bj == 0) {
                    this.searchs = data.ad_cd;
                    this.STinfo = data;
                    this.CZMC = data.label.replace('【站点】', '');
                    this.Reload();
                }
            },
            filterNode(value, Treedata, node) {
                this.filterTreeData.push(node);
                if (!value) return true;
                return Treedata.label.indexOf(value) !== -1;
            },
            search() {
                // console.log(this.searchmsg);
                this.filterTreeData = [];
                this.$refs.tree.filter(this.searchmsg);

                // console.log("filterTreeData",this.filterTreeData)

                if (this.searchmsg != '') {
                    this.filterTreeData.some((val, index) => {
                        if (val.visible && val.data.bj == 0 && val.data.canal_code) {
                            console.log(val.label);
                            val.isCurrent = true;
                            this.searchs = val.data.canal_code;
                            this.STinfo.STCD = val.data.canal_code
                            this.CZMC = val.label.replace('【站点】', '');
                            console.log("this.searchmsg", this.searchmsg)
                            return true;
                        } else if (val.visible && val.data.bj == 0 && val.data.ad_cd) {
                            val.isCurrent = true;
                            this.searchs = val.data.ad_cd;
                            this.STinfo.STCD = val.data.canal_code
                            this.CZMC = val.label.replace('【站点】', '');
                            return true;
                        }
                    })
                    this.Reload();
                } else {
                    // this.searchs = '';
                    this.Reload();
                }
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
                    title: {text: ""},
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["水位", "入库流量", "出库流量", "库容"]
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: "category",
                            boundaryGap: false,
                            data: this.data2.x.list.reverse(),
                            axisLabel: {interval: parseInt(this.data2.x.list.length / 3.2), rotate: 50},
                        }
                    ],
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        x: 70,
                        x2: 40,
                        y2: 100// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            name: "流量",
                            type: "value",
                            min: this.data2.y1.min,
                            max: this.data2.y1.max
                        },
                        {
                            name: "水位",
                            type: "value",
                            min: this.data2.y2.min,
                            max: this.data2.y2.max
                        }
                    ],
                    series: [
                        {
                            name: "水位",
                            type: "line",
                            yAxisIndex: 1,
                            data: this.data2.y1.list.reverse(),
                        },
                        {
                            name: "入库流量",
                            type: "line",
                            yAxisIndex: 0,
                            data: this.data2.y2.list.reverse(),
                            itemStyle: {
                                normal: {
                                    color: "#006400",//折线点的颜色
                                    lineStyle: {
                                        color: "#006400"//折线的颜色
                                    }
                                }
                            },
                            // data: [0.36, 0.28, 0.36, 0.02, 0.12]
                        },
                        {
                            name: "出库流量",
                            type: "line",
                            yAxisIndex: 0,
                            data: this.data2.y3.list.reverse(),
                            itemStyle: {
                                normal: {
                                    color: "#8B0000",//折线点的颜色
                                    lineStyle: {
                                        color: "#8B0000"//折线的颜色
                                    }
                                }
                            },
                            // data: [5.0, 10.0, 20.0, 25.0, 22.0]
                        },
                        {
                            name: "库容",
                            type: "line",
                            yAxisIndex: 1,
                            data: this.data2.y4.list.reverse(),
                            itemStyle: {
                                normal: {
                                    color: "#9400D3",//折线点的颜色
                                    lineStyle: {
                                        color: "#9400D3"//折线的颜色
                                    }
                                }
                            },
                            // data: [5.0, 10.0, 20.0, 25.0, 22.0]
                        },
                    ]
                });
            },
            err() {
                this.$Message.warning('该功能还在开发中...');
            },
            changeTree() {
                this.qudao = !this.qudao;
                this.xingzhengquhua = !this.xingzhengquhua;
            },
            Reload() {
                this.loading = true;
                let obj = {
                    Time_min: this.form.date[0].substr(0, 19),
                    Time_max: this.form.date[1].substr(0, 19),
                    STCD: this.searchs
                    // _orderby:this.form.field
                }
                this.axios.get("/guanqu/shuikushuiqing/lishi_lishibiao?_page_size=" + this.list_input.pagesize + "&_page=" + this.list_input.current, {params: obj}).then(res => {
                    console.log(res);
                    this.data1 = res.data.list;

                    if (res.data.total != 0) {
                        // this.CZMC = res.data.rows[0].STNM;
                        // this.STinfo = res.data[0].list[0];
                    }
                    this.list_input.total = res.data.list.length;
                    this.loading = false;
                    for (var i = 0; i < this.data1.length; i++) {
                        this.data1[i].tm = this.data1[i].tm.substring(0, this.data1[i].tm.length - 3);
                        this.data1[i].INQ = this.Z_Filter(this.data1[i].INQ, 3);
                        this.data1[i].BLRZ = this.Z_Filter(this.data1[i].BLRZ);
                        this.data1[i].OTQ = this.Z_Filter(this.data1[i].OTQ, 3);
                        this.data1[i].W = this.dateFilter(this.data1[i].W, 3);
                        this.data1[i].RZ = this.Z_Filter(this.data1[i].RZ);
                    }
                });
                this.axios.get("/guanqu/shuikushuiqing/lishi_lishibiao?_page=1&_page_size=99999", {params: obj}).then(res => {
                    this.data2 = res.data.list;
                    // for (var i = 0;i<this.data2.length ; i++) {
                    //   this.data2[i].TM = this.dateFilter(this.data2[i].TM);
                    // }
                    this.data2 = this.transform_SKSQ_data_into_ehart_data(this.data2, 'historyTable');
                    console.log(this.data2);
                    this.drawchart();
                });

                // 预警信息
                this.axios.get('/guanqu/shuikushuiqing/single_yujing?STCD=' + this.searchs).then(res => {
                    console.log(res);
                    let fwl = res.data.list[0]
                    // 正常水位
                    this.yujingdata.A_ZCFWL = this.Z_Filter(fwl.ZCWL)

                    // 汛限水位
                    let month = new Date().getMonth()+1
                    if(month>=7 && month <=9){
                        this.yujingdata.A_XXFWL =  this.Z_Filter(fwl.FWL79)
                    }else {
                        this.yujingdata.A_XXFWL =  this.Z_Filter(fwl.FWL)
                    }
                });
            },
            indexMethod(index) {
                return index + 1 + (this.list_input.pagesize * (this.list_input.current - 1));
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
                this.list_input.current = index;
                this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
                this.list_input.pagesize = pagesize;
                this.Reload();
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
