<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">

            <Row :gutter="16">
                <Col :span="span1" style="padding: 0">
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
                                    @change="timechange"
                                    :clearable="false"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    size="small"
                                    style="width: 340px"
                                    width="200"
                            >
                            </el-date-picker>
                        </Col>
                        <Col class="" style="display: flex;justify-content: flex-start">
                            <Button type="primary" style="width: auto;margin-right: 10px;margin-left: 10px"
                                    @click="cellclick">站点详情
                            </Button>
                            <Button type="primary" style="width:auto;" @click="err">导出</Button>
                        </Col>
                        <Col>

                            <!-- <Button type="primary" style="width: auto;margin-right: 0px;margin-left: 10px;" @click="test1">显示/隐藏树形</Button> -->
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                    <div class="switch" @click="Menu_toggle">
                        <i class="el-icon-d-arrow-left" v-if="Menu.show_Controller"></i>
                        <i class="el-icon-d-arrow-right" v-if="!Menu.show_Controller"></i>
                    </div>
                    <Divider/>
                    <Row>
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                            监测站名：{{SiteiNFO.CZMC}}
                        </Col> -->
                        <Col style='font-size: 14px;' class="borsLine">监测站名：{{SiteiNFO.CZMC}}&nbsp;
                            正常电压范围：{{ZCDY.VOLMIN}}-{{ZCDY.VOLMAX}}V；单位:电压：V
                        </Col>
                    </Row>
                    <Row :gutter="16" style="display: flex">
                        <Col style="width: 500px;">
                            <el-table
                                    :data="data1"
                                    border
                                    height="500"
                                    v-loading="loading"
                                    @sort-change="sort_change"
                                    style="width: 500px">
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
                                        prop="VOL"
                                        label="电压"
                                        sortable="custom"
                                        align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="CS"
                                        label="通讯状态"
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
                        <Col span="13">
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


            <!-- <Row type="flex" :gutter="16">
              <Col span="10">
                <div ref="achart" style="width: 100%;height: 300px;margin-top: 1%;margin-bottom: 50px;"></div>
              </Col>
          </Row> -->
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
                STinfo: {},
                Treedata: [],
                Treedata2: [],
                GD: '',
                data1: [],
                data2: [],
                date: '',
                searchs: '&STNM= P2支渠站',
                timesearch: '',
                CZMC: '',
                echarts: {
                    TM: [],
                    VOL: [],
                },
                form: {
                    searchmsg: '',
                    date: '',
                    field: '',
                },
                searchmsg: '',
                MaxY: 0,
                MinY: 0,
                ZCDY: {},
                list_input: {
                    total: 100,
                    pagesize: 50,
                    pagesizeopts: [10, 20, 50, 75, 100, 200],
                    current: 1
                },
                SiteiNFO: {
                    CZMC: '',
                    STCD: ''
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
            this.form.field = 'TM'
            var date = new Date();
            var Month = date.getMonth() + 1;
            var datelist = new Array();
            datelist[0] = date.getFullYear() + '-' + Month + '-' + date.getDate() + ' 00:00:00.000';
            datelist[1] = date.getFullYear() + '-' + Month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.000';
            this.form.date = datelist;
            console.log(this.form.date);
            this.axios.get("/guanqu/table/xingzhen_gongkuang_tree").then(res => {
                console.log(res);
                this.Treedata2 = this.XingZheng_Tree_Filter('650000000000', res.data).data;
            });
            // 获取输排水渠道数据,然后设置渠道选择框选项
            this.axios.get("/guanqu/table/qudao_gongkuang_tree").then(res => {
                // console.log(res);
                this.Treedata = this.QuDao_Tree_Filter(res.data).data;
                this.SiteiNFO.CZMC = this.QuDao_Tree_Filter(res.data).siteinfo.canal_name;
                this.SiteiNFO.STCD = this.QuDao_Tree_Filter(res.data).siteinfo.canal_code;
                console.log(this.QuDao_Tree_Filter(res.data));
                // this.searchs = `&STCD=${this.QuDao_Tree_Filter(res.data).siteinfo.canal_code}`;
                this.Reload();
                console.log('渠道', this.QuDao_Tree_Filter(res.data));
            });

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
                    this.searchs = '&STCD=' + data.canal_code;
                    this.SiteiNFO.STCD = data.canal_code;
                    this.SiteiNFO.CZMC = data.label;
                    this.Reload();
                }
            },
            xingzheng_tree(data) {
                console.log(data);
                if (data.bj == 0) {
                    this.searchs = '&STCD=' + data.ad_cd;
                    this.SiteiNFO.STCD = data.ad_cd;
                    this.SiteiNFO.CZMC = data.title;
                    this.Reload();
                }
            },
            filterNode(value, Treedata, node) {
                this.filterTreeData.push(node);
                if (!value) return true;
                return Treedata.label.indexOf(value) !== -1;
            },
            search() {
                this.filterTreeData = [];
                this.$refs.tree.filter(this.searchmsg);

                if (this.searchmsg != '') {
                    this.filterTreeData.some((val, index) => {
                        // console.log(val.expanded,val.data.bj)
                        if (val.visible && val.data.bj == 0 && val.data.canal_code) {
                            console.log(val);
                            val.isCurrent = true;
                            this.SiteiNFO.STCD = `${val.data.canal_code}`;
                            this.SiteiNFO.CZMC = val.label;
                            console.log("this.searchmsg", this.searchmsg)
                            return true;
                        } else if (val.visible && val.data.bj == 0 && val.data.ad_cd) {
                            val.isCurrent = true;
                            this.SiteiNFO.STCD = `${val.data.ad_cd}`;
                            this.SiteiNFO.CZMC = val.label;
                            return true;
                        }
                    })
                    this.Reload();
                } else {
                    // this.SiteiNFO.STCD = '';
                    this.Reload();
                }
            },
            timechange(date) {
                console.log(this.form.date);
                this.Reload();
            },
            cellclick() {
                var evt = new Object();
                evt.graphic = new Object();
                evt.graphic.attributes = this.SiteiNFO;

                evt.graphic.attributes.STNM = this.SiteiNFO.CZMC;
                evt.graphic.attributes.itype = "yunxinggongkuang";
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(this.SiteiNFO))
                evt.graphic.attributes.rowinfo.tableType = {
                    yxgk: "historyTable"
                };
                var v = new Object;
                v.itype = "yunxinggongkuang";
                console.log("evt", evt);
                this.$App.showDrawer(evt, v);
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
                        data: ["电压"]
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: "category",
                            boundaryGap: false,
                            data: this.data2.x.list,
                            axisLabel: {interval: parseInt(this.data2.x.list.length / 3.35), rotate: 50},
                        }
                    ],
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        x: 70,
                        x2: 40,
                        y2: 100// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    yAxis: [
                        {
                            name: "电压",
                            type: "value",
                            min: this.data2.y1.min,
                            max: this.data2.y1.max
                        },
                    ],
                    series: [
                        {
                            name: "电压",
                            type: "line",
                            yAxisIndex: 0,
                            data: this.data2.y1.list
                            // data: [0.36, 0.28, 0.36, 0.02, 0.12]
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
                console.log(this.SiteiNFO.STCD);
                let body = {}
                body.STCD = this.SiteiNFO.STCD
                this.$GetData.Survey_Around_YXGK(null, body, false, data => {

                    // const around = document.getElementById(`${item.STCD}_VOLMAX_VOLMIN`)
                    let dataVol = data.data[0]
                    this.ZCDY.VOLMIN = dataVol.VOLMIN,
                        this.ZCDY.VOLMAX = dataVol.VOLMAX

                })

                this.loading = true;
                this.axios.get("/guanqu/lishigongkuang/lishibiao?_page_size=" + this.list_input.pagesize + "&_page=" + this.list_input.current, {
                    params: {
                        // TM: 'bt,' +  + ',' + this.form.date[1],
                        _orderby: this.form.field,
                        STCD: this.SiteiNFO.STCD,
                        Time_min: this.form.date[0],
                        Time_max: this.form.date[1],
                    }
                }).then(res => {
                    console.log(res);
                    this.data1 = res.data.list.reverse();
                    if (res.data.total != 0) {
                        // this.SiteiNFO.CZMC = res.data.list[0].STNM;
                        console.log(this.SiteiNFO.CZMC);
                        // this.STinfo = res.data.list;
                    }
                    this.list_input.total = res.data.total;
                    for (var i = 0; i < this.data1.length; i++) {
                        this.data1[i].tm = this.dateFilter(this.data1[i].tm);
                        this.data1[i].VOL = this.Float_Filter(this.data1[i].VOL, 1)
                    }
                    this.loading = false;
                });
                this.axios.get("/guanqu/lishigongkuang/lishibiao?_page=1&_page_size=99999", {
                    params: {
                        // TM: 'bt,' + this.form.date[0] + ',' + this.form.date[1],
                        STCD: this.SiteiNFO.STCD,
                        Time_min: this.form.date[0],
                        Time_max: this.form.date[1],
                    }
                }).then(res => {
                    this.data2 = res.data.list.reverse();
                    for (var i = 0; i < this.data2.length; i++) {
                        this.data2[i].tm = this.dateFilter(this.data2[i].tm);
                    }
                    this.data2 = this.transform_YXGK_data_into_ehart_data(this.data2, 'zhuangtaishuju');
                    console.log(this.transform_YXGK_data_into_ehart_data(res.data.list, 'zhuangtaishuju'));
                    this.drawchart();
                    this.data2 = {};
                });
                this.axios.get("/guanqu/admin/ST_StationStatusType").then(res => {
                    this.ZCDY = res.data.rows[0];
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
        computed:{
          balabala(){
            //console.log(this.$store.state.anniu);
            return this.$store.state.anniu
          }
        },
        watch:{
            // 'this.$store.state.anniu': function(){
            //     console.log(this.$store.state.anniu);
            // }
            balabala(curVal,oldVal){
              console.log(curVal);
              this.test1(curVal)
            }
        }
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
</style>
