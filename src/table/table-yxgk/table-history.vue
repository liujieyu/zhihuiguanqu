<template>
    <div>
        <Content :style="{padding: '12px 24px 16px 24px', background: '#fff'}">
            <Row :gutter="16">
                <Col :span="span1">
                    <Row :gutter="16" type="flex" justify="start" z style="margin: 10px;">
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
                        <!--
                        <Col class="" style="display: flex;justify-content: flex-start">
                            <Button type="primary" style="width: auto;margin-right: 10px;margin-left: 10px"
                                    @click="cellclick">站点详情
                            </Button>
                            <Button type="primary" style="width:auto;" @click="err">导出</Button>
                        </Col>
                        -->
                        <Col>

                            <!-- <Button type="primary" style="width: auto;margin-right: 0px;margin-left: 10px;" @click="test1">显示/隐藏树形</Button> -->
                        </Col>
                    </Row>
                    <div class="switch" @click="Menu_toggle">
                        <i class="el-icon-d-arrow-left" v-if="Menu.show_Controller"></i>
                        <i class="el-icon-d-arrow-right" v-if="!Menu.show_Controller"></i>
                    </div>
                    <Divider style="margin-top:20px;"/>
                    <Row>
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                            监测站名：{{SiteiNFO.CZMC}}
                        </Col> -->
                        <Col style='font-size: 14px;' class="borsLine">监测站名：{{siteno}}&nbsp;
                            正常电压范围：{{ZCDY.VOLMIN}}-{{ZCDY.VOLMAX}}V&nbsp;单位：电压：V
                        </Col>
                    </Row>
                    <Row :gutter="16" style="display: flex">
                        <Col style="width: 480px;">
                            <el-table
                                    :data="data1"
                                    border
                                    :height="theight"
                                    v-loading="loading"
                                    @sort-change="sort_change"
                                    style="width: 480px">
                                <el-table-column
                                        label=" "
                                        type="index"
                                        align="center"
                                        width="55"
                                        :index="indexMethod">
                                </el-table-column>
                                <el-table-column
                                        prop="tm"
                                        label="时间"
                                        sortable="custom"
                                        width="160"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="VOL"
                                        label="电压"
                                        width="120"
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
                            <div style="margin: 10px 0px 0px 10px;overflow: hidden">
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
                        <Col span="14">
                            <div ref="achart" v-show="data1.length>0" :style="{'width': '100%','height': chartheight+'px','margin-top': '1%'}"></div>
                            <div ref="noachart" v-show="data1.length==0"  :style="{'width': '100%','height': chartheight+'px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center','margin-top': '1%'}">暂无电压图数据</div>
                        </Col>
                    </Row>
                </Col>
                <transition name="el-fade-in-linear">
                    <Col :span="span2" v-show="show1">
                        <Row style="margin-top: 10px;line-height: 32px;">
                            <Col>
                                <Input search enter-button suffix="ios-search" placeholder="请输入行政区划或者站点名称" style="width:250px;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
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
                chartheight:(window.innerHeight-330)>430?430:(window.innerHeight-330),
                qudao: true,
                xingzhengquhua: false,
                show1: true,
                Menu: {show_Controller: false},
                span1: '19',
                span2: '5',
                STinfo: {},
                Treedata: [],
                expandedarray:[],
                filterTreeData:[],
                Treedata2: [],
                GD: '',
                data1: [],
                data2: [],
                date: '',
                searchs: '',
                siteno:'',
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
            this.form.field = 'TM desc';
            var date = new Date();
            var Month = date.getMonth() + 1;
            var datelist = new Array();
            datelist[0] = date.getFullYear() + '-' + Month + '-' + date.getDate() + ' 00:00:00.000';
            datelist[1] = date.getFullYear() + '-' + Month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.000';
            this.form.date = datelist;
            console.log(this.form.date);
            //获取行政区划树
            this.axios.get("/guanqu/info/xzqhtree?TYPE=7").then(res => {
            this.Treedata = res.data;
            this.expandedarray.push(this.Treedata[0].id);
            this.expandedarray.push(this.Treedata[0].children[0].id);
            var stcd=this.Treedata[0].children[0].children[0].value;
            this.searchs = stcd;    
            this.siteno = this.Treedata[0].children[0].children[0].label;
            let body = {};
                body.STCD = this.searchs;
                this.$GetData.Survey_Around_YXGK(null, body, false, data => {
                    let dataVol = data.data[0]
                    this.ZCDY.VOLMIN = dataVol.VOLMIN,
                    this.ZCDY.VOLMAX = dataVol.VOLMAX
                    this.Reload();
                });            
            });
            // // 获取输排水渠道数据,然后设置渠道选择框选项
            // this.axios.get("/guanqu/table/qudao_gongkuang_tree").then(res => {
            //     // console.log(res);
            //     this.Treedata = this.QuDao_Tree_Filter(res.data).data;
            //     this.SiteiNFO.CZMC = this.QuDao_Tree_Filter(res.data).siteinfo.canal_name;
            //     this.SiteiNFO.STCD = this.QuDao_Tree_Filter(res.data).siteinfo.canal_code;
            //     // this.searchs = `&STCD=${this.QuDao_Tree_Filter(res.data).siteinfo.canal_code}`;
            //     this.Reload();
            // });

        },
        methods: {
            sort_change(column) {
                console.log(column);
                if (column.order == 'ascending') {
                    this.form.field = column.prop;
                    this.ReloadSort();
                }
                if (column.order == 'descending') {
                    this.form.field = column.prop + ' desc';
                    this.ReloadSort();
                }
                if (column.order == null) {
                    this.form.field = '';
                    this.ReloadSort();
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
            xzqh_tree(data){
            console.log(data);
            if (data.level==3) {
                this.searchs = data.value;
                this.siteno=data.label;
                this.list_input.current = 1;
                this.form.field = ''; 
                let body = {};
                body.STCD = this.searchs;
                this.$GetData.Survey_Around_YXGK(null, body, false, data => {
                    let dataVol = data.data[0]
                    this.ZCDY.VOLMIN = dataVol.VOLMIN,
                    this.ZCDY.VOLMAX = dataVol.VOLMAX
                    this.Reload();
                });
            }
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
                    this.list_input.current = 1;
                    this.form.field = ''; 
                    let body = {};
                    body.STCD = this.searchs;
                    this.$GetData.Survey_Around_YXGK(null, body, false, data => {
                        let dataVol = data.data[0]
                        this.ZCDY.VOLMIN = dataVol.VOLMIN,
                        this.ZCDY.VOLMAX = dataVol.VOLMAX
                        this.Reload();
                    });
                }else{
                    this.$refs.tree.root.childNodes.forEach((e)=>{
                        e.expanded=false;
                    }); 
                    this.expandedarray=[this.Treedata[0].id,this.Treedata[0].children[0].id];
                    this.searchs = this.Treedata[0].children[0].children[0].value;   
                    this.siteno= this.Treedata[0].children[0].children[0].label; 
                    this.list_input.current = 1;
                    this.form.field = '';    
                    let body = {};
                    body.STCD = this.searchs;
                    this.$GetData.Survey_Around_YXGK(null, body, false, data => {
                        let dataVol = data.data[0]
                        this.ZCDY.VOLMIN = dataVol.VOLMIN,
                        this.ZCDY.VOLMAX = dataVol.VOLMAX
                        this.Reload();
                    });
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
                    title: {text: this.data2.chartName},
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["电压"],
                        y: "bottom"
                    },
                    toolbox: {
                        show: true,
                        feature: {
                        mark: { show: true },
                        magicType: { show: true, type: ["line", "bar"] },
                        saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                    animation: true,
                    xAxis: [
                        {
                            type: "category",
                            boundaryGap: false,
                            data: this.data2.x.list,
                        }
                    ],
                    yAxis: [
                        {
                            name: "电压V",
                            type: "value",
                            min: this.data2.y1.min,
                            max: this.data2.y1.max,
                            scale: true
                        },
                    ],
                    series: [
                        {
                            name: "电压",
                            type: "line",
                            data: this.data2.y1.list,
                            showSymbol: false,
                            itemStyle : {  
                                normal : {  
                                    color:'#6C84CE'  
                                }  
                            },  
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
                            data: [{name:"下界阈值"+this.data2.y1.markval1,
                                    yAxis: this.data2.y1.markval1,
                                    label: {
                                    formatter: '{b}',
                                    position: 'middle'
                                    }},{name:"上界阈值"+this.data2.y1.markval2,
                                    yAxis: this.data2.y1.markval2,
                                    label: {
                                    formatter: '{b}',
                                    position: 'middle'
                                    }}],
                        }
                        },
                    ]
                });
            },
            err() {
                this.$Message.warning('该功能还在开发中...');
            },
            ReloadSort(){
                this.loading = true;
                this.axios.get("/guanqu/lishigongkuang/lishibiao?_page_size=" + this.list_input.pagesize + "&_page=" + this.list_input.current, {
                    params: {
                        _orderby: this.form.field,
                        STCD: this.searchs,
                        Time_min: this.form.date[0],
                        Time_max: this.form.date[1],
                    }
                }).then(res => {
                    this.data1=res.data.list;
                    this.list_input.total = res.data.total;
                    // for (var i = 0; i < this.data1.length; i++) {
                    //     this.data1[i].tm = this.dateFilter(this.data1[i].tm);
                    //     this.data1[i].VOL = this.Float_Filter(this.data1[i].VOL, 1)
                    // }
                    this.loading = false;
                });
            },
            Reload() {
                this.loading = true;
                this.axios.get("/guanqu/lishigongkuang/lishibiao?_page_size=" + this.list_input.pagesize + "&_page=" + this.list_input.current, {
                    params: {
                        _orderby: this.form.field,
                        STCD: this.searchs,
                        Time_min: this.form.date[0],
                        Time_max: this.form.date[1],
                    }
                }).then(res => {
                    this.data1=res.data.list;
                    this.list_input.total = res.data.total;
                    // for (var i = 0; i < this.data1.length; i++) {
                    //     this.data1[i].tm = this.dateFilter(this.data1[i].tm);
                    //     this.data1[i].VOL = this.Float_Filter(this.data1[i].VOL, 1)
                    // }
                    this.loading = false;
                });
                this.axios.get("/guanqu/lishigongkuang/lishibiao?_page=1&_page_size=99999", {
                    params: {
                        STCD: this.searchs,
                        Time_min: this.form.date[0],
                        Time_max: this.form.date[1],
                    }
                }).then(res => {
                    this.data2 = res.data.list.reverse();
                    if(this.data2==null || this.data2.length==0){            
                        return;
                    }
                    for (var i = 0; i < this.data2.length; i++) {
                        this.data2[i].tm = this.dateFilter(this.data2[i].tm);
                    }
                    this.data2 = this.transform_YXGK_data_into_ehart_data(this.data2, 'zhuangtaishuju');
                    var mintime=this.data2.x.list[0].slice(0, 10),maxtime=this.data2.x.list[this.data2.x.list.length-1].slice(0, 10);
                    var now=new Date();
                    var nowday=this.getNowDayString(now);
                    this.data2.chartName="电压图";
                    this.data2.y1.markval1=this.ZCDY.VOLMIN;
                    this.data2.y1.markval2=this.ZCDY.VOLMAX;
                    if(this.data2.y1.min>=parseInt(this.ZCDY.VOLMIN)){
                    this.data2.y1.min=parseInt(this.ZCDY.VOLMIN)-0.5;
                    }
                    if(this.data2.y1.max<=parseInt(this.ZCDY.VOLMAX)){
                    this.data2.y1.max=parseInt(this.ZCDY.VOLMAX)+0.5;
                    }
                    if(mintime==nowday && maxtime==nowday){
                        this.data2.chartName = "今日电压图";
                        for(var i=0;i<this.data2.x.list.length;i++){
                        var time=this.data2.x.list[i].split(" ");
                        this.data2.x.list[i]=time[1];
                        }
                    }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==now.getFullYear()){
                    for(var i=0;i<this.data2.x.list.length;i++){
                        var time=this.data2.x.list[i].substr(5);
                        this.data2.x.list[i]=time;
                        }
                    }
                    this.drawchart();
                    this.data2 = {};
                });
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
                this.ReloadSort();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
                this.list_input.pagesize = pagesize;
                this.ReloadSort();
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
