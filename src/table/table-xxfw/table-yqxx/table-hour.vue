<template>
    <div>
        <Content :style="{padding: '12px 24px 24px 24px', background: '#fff'}">
            <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
                <Col>
                   时段:
                        <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        @change="timechange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                        size="small"
                        >
                        </el-date-picker>
                </Col>
                <Col>
                    <!-- 地址级联选择器 -->
                    <el-cascader
                            :props="{ multiple: true }"
                            clearable
                            filterable
                            collapse-tags
                            style="width:270px;"  
                            size="mini"
                            placeholder="所属行政区划"
                            :options="form.adressList"
                            v-model="form.model_adress"
                            @change="XZQHsearch"
                            change-on-select
                    ></el-cascader>
                </Col>
                <!-- 渠道级联选择器
                <Col>
                    渠道:                   
                    <el-cascader
                            clearable
                            style="width: 160px"
                            size="small"
                            placeholder="请选择渠道"
                            :options="form.qudaoList"
                            v-model="form.model_qudao"
                            @change="QDsearch"
                            change-on-select
                    ></el-cascader>
                </Col>
                 -->
                <Col>
                    <Select v-model="form.gsdw" style="width:120px;" @on-change="STGRsearch" clearable placeholder="等级">
                        <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="form.zdlx" style="width:120px;" @on-change="TYPEsearch" clearable placeholder="降雨量">
                        <Option v-for="item in zdlxlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <!-- 站名模糊搜索 -->
                    <Input search enter-button suffix="ios-search" placeholder="请输入站名"
                           style="width: 160px;" @on-search="search" v-model="form.searchmsg"/>
                    <!--
                    <Button type="primary" style="width: auto;margin-left: 10px;" @click="err">导出</Button>
                    -->
                </Col>
            </Row>
            <Row type="flex" style="margin:15px 10px 15px 10px;" :gutter="16" justify="end">
                <el-table
                        :cell-class-name="rowClass"
                        :data="tableData3"
                        border
                        style="width: 100%;color:#000000;"
                >
                    <el-table-column
                            prop="rain1"
                            label="0~10"
                            width="180"
                            height='25'
                            style="background-color: antiquewhite;"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="rain2"
                            label="10~25"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="rain3"
                            label="25~50">
                    </el-table-column>
                    <el-table-column
                            prop="rain4"
                            label="50~100">
                    </el-table-column>
                    <el-table-column
                            prop="rain5"
                            label="100~250">
                    </el-table-column>
                    <el-table-column
                            prop="rain6"
                            label=">250">
                    </el-table-column>
                </el-table>
            </Row>
            <Divider style="margin-top:0px;"/>




            <!--  -->
            <Row style="font-size: 16px;">
                <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                   共{{Tables.total}}个站点
                </Col> -->
                <Col style='font-size: 14px;' class="borsLine">总站数：{{Tables.ZongZhanShu}}&nbsp;
                    降雨站数：{{Tables.JiangYuZhanShu}}，最大降雨：{{Tables.ZuiDaJiangYu}}，平均降雨：{{Tables.PingJunJiangYu}}，单位: 雨量 mm
                </Col>
            </Row>
            <el-table
                    :data="Tables.data"
                    :span-method="objectSpanMethod"
                    border
                    :height="theight"
                    v-loading="loading"
                    style="width: 100%;"                   
                    @sort-change="sort_change"
            >
                <!-- @cell-click="cellclick"
                    <el-table-column
                        prop="SHI"
                        label="市"
                        align="center"
                        sortable
                        width="">
                </el-table-column> -->
                <!-- <el-table-column
                        prop="XIAN"
                        label="县"
                        align="center"

                        width="350">
                </el-table-column> -->               
                <el-table-column
                        prop="STNM"
                        label="站名"
                        align="center"

                >
                </el-table-column>
                <el-table-column
                        prop="P"
                        label="雨量"
                        align="center"
                        sortable
                >
                <template slot-scope="scope">
                        <div>
                        <span
                            :style="{
                        color: scope.row.P <= 10?'green' :scope.row.P <= 25 ?'#227700' : scope.row.P <= 50?'#00BBFF' :scope.row.P <= 100?'#003377':scope.row.P <= 250?'#CC6600':'#CC0000',
                        }"
                        >{{ scope.row.P }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="STGR"
                        label="等级"
                        align="center"

                >
                </el-table-column>
                <el-table-column
                        prop="ZHEN"
                        label="所属乡镇"
                        align="center"

                >
                </el-table-column>
                <el-table-column
                        prop="CUN"
                        label="所属村"
                        align="center"

                >
                </el-table-column>
            </el-table>







            <!-- <Table border :columns="columns1" :data="data" :loading="loading" height="600" :index="indexMethod"></Table> -->
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <!-- <Page
                    :total="list_input.total"
                    :current="list_input.current" show-sizer
                    :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                    @on-change="CurrentChange"
                    @on-page-size-change="PagesizeChange"
                    size="small"
                    show-total
                    show-elevator
                    ></Page> -->
                </div>
            </div>
        </Content>
        <el-dialog title="综合报表" :visible.sync="dialog_detail_showing" width="1200px" append-to-body>
            <Row>
                <Col style="text-align: center;font-size: 20px;">
                    {{this.form.date}} 渠道水情日表
                </Col>
            </Row>
            <Row>
                <Col>
                    站点总数(个):{{Tables.total}}
                </Col>
                <Col>平均水位：m，平均流量：m³/s，日累计水量：m³</Col>

                <Col style="position: absolute;right: 0;bottom: 0px;">
                    <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                </Col>
            </Row>
            <Divider/>
            <el-table
                    :data="Tables.data"
                    border
                    height="500"
                    v-loading="loading"
                    style="width: 100%"
                    @sort-change="sort_change"
            >
                <el-table-column
                        prop="canal_name"
                        label="渠道"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="stnm"
                        label="站名"
                        align="center"
                        sortable
                        width="">
                </el-table-column>
                <el-table-column
                        prop="da_z"
                        label="平均水位"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="da_q"
                        label="平均流量"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="dwq"
                        label="日累计水量"
                        sortable
                        align="center"
                >
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import FilterMethods from "@/assets/commonJS/FilterMethods";
    import GetDataMethods from "@/assets/commonJS/GetDataMethods";
    import App from "@/App.vue";
    import {constants} from 'crypto';

    export default {
        data() {
            return {
                 gsdwlist:[
                    {
                        value:'1',
                        label:'国家重要站'
                    },
                    {
                        value:'2',
                        label:'省级重要站'
                    },
                    {
                        value:'3',
                        label:'一般站'
                    },
                    {
                        value:'4',
                        label:'实验或专用站'
                    },
                    {
                        value:'5',
                        label:'山洪站'
                    },
                    {
                        value:'6',
                        label:'临时站'
                    },
                    {
                        value:'7',
                        label:'其他站'
                    },
                    {
                        value:'8',
                        label:'灌区站'
                    },
                ],
                theight:window.screen.height-480,
                cols1:[],
                loading: false,
                dialog_detail_showing: false,
                tableData1:
                    [

                       ],
                zdlxlist: [
                //    {
                //         value: '1',
                //         label: '全部'
                //     },
                    {
                        value: '0',
                        label: '0'
                    },
                    {
                        value: '10',
                        label: '10'
                    }, {
                        value: '25',
                        label: '25'
                    }, {
                        value: '50',
                        label: '50'
                    }, {
                        value: '100',
                        label: '100'
                    },
                    {
                        value: '250',
                        label: '250'
                    }
                ],
                jiangyu: [
                    {
                        value: '1',
                        label: '全部'
                    },
                    {
                        value: '2',
                        label: '>0'
                    },
                    {
                        value: '3',
                        label: '>=10'
                    }, {
                        value: '4',
                        label: '>=25'
                    }, {
                        value: '5',
                        label: '>=50'
                    }, {
                        value: '6',
                        label: '>=100'
                    },
                    {
                        value: '7',
                        label: '>=250'
                    }
                ],
                value: '',
                tableData3: [{
                    rain1: '',
                    rain2: '',
                    rain3: '',
                    rain4: '',
                    rain5: '',
                    rain6: '',
                },],
                tableDatanull: [{
                    rain1: '0',
                    rain2: '0',
                    rain3: '0',
                    rain4: '0',
                    rain5: '0',
                    rain6: '0',
                },],
                form: {
                    adressList: [],
                    qudaoList: [],
                    model_adress: '',
                    zdlx: '',
                    model_qudao: '',
                    date: '',
                    searchmsg: '',
                    xzqh: '',
                    qd: '',
                    field: '',
                    gsdw:'',
                    startTime: '',
                    overTime: ''
                },
                date: '',
                data: [],
                xzqhdata: [],
                xzqh: '',
                list_input: {
                    total: 100,
                    pagesize: 50,
                    pagesizeopts: [10, 20, 50, 75, 100, 200],
                    current: 1,
                },
                Tables: {
                    title: '',
                    total: '',
                    data: [],
                    JiangYuZhanShu:'',
                    PingJunJiangYu:'',
                    ZongZhanShu:'',
                    ZuiDaJiangYu:''
                },
                searchs: '',
                search1: '',
                search2: '',
                search3: '',
                search4: '',
                search5: '',
                timesearch: '',
                nodata: [],
                column_row_offset: {
                    SHI: [4, 4, 4, 4],
                    XIAN: [3, 1, 3, 1, 3, 1, 3, 1],
                    ZHEN: [2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1],
                    STNM: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    rainfall: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    stnm1: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    rainfall1: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    stnm2: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    rainfall2: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                },
                now_col_row_num: {},
                now_col_offset: {},
                STinfo: {
                    STCD: '',
                    P:''
                }

            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods, GetDataMethods],
        mounted() {
            //行政区划
            this.getTableData_WRP_AD_B(data => {
                //this.form.adressList = data;
                this.form.adressList = data[0].children;
                this.form.model_adress=true;
            });
            // 获取输排水渠道数据,然后设置渠道选择框选项
            //this.getTableData_WRP_IrrBTCanalSystem(data => {
            //    this.form.qudaoList = data;
            //});
            this.Reload();
            this.handleTime();
        },
        methods: {
            //对时间选择器进行时间处理
            handleTime(){
            var date = new Date();
            var date2 = new Date();
            var datelist = new Array();
            var Hours = date.getHours();

            if(Hours<8){
                date2=date2.setTime(date2.getTime()-24*60*60*1000);
                date2 = new Date(date2);
                var Year = date2.getFullYear();
                var Month = date2.getMonth()+1;
                var Day = date2.getDate();
                var Hours = date2.getHours();
                var Minutes = date2.getMinutes();
                var Seconds = date2.getSeconds();

                var Year2 = date.getFullYear();
                var Month2 = date.getMonth()+1;
                var Day2 = date.getDate();
                var Hours2 = date.getHours();
                var Minutes2 = date.getMinutes();
                var Seconds2 = date.getSeconds();
                if(Day<10){
                    Day = `0${Day}`
                }
                if(Month<10){
                    Month = `0${Month}`
                }
                if(Day2<10){
                    Day2 = `0${Day2}`
                }
                if(Month2<10){
                    Month2 = `0${Month2}`
                }
                this.form.startTime=`${Year}-${Month}-${Day} 08:00:00`
                this.form.overTime=`${Year2}-${Month2}-${Day2} ${Hours2}:${Minutes2}:${Seconds2}`
                // this.form.date = `${Year2}-${Month2}-${Day2}`
                datelist[0] = this.form.startTime;
                datelist[1] = this.form.overTime;
                this.form.date = datelist;
            }else{
                var Year2 = date.getFullYear();
                var Month2 = date.getMonth()+1;
                var Day2 = date.getDate();
                var Hours2 = date.getHours();
                var Minutes2 = date.getMinutes();
                var Seconds2 = date.getSeconds();
                if(Day<10){
                    Day = `0${Day}`
                }
                if(Month<10){
                    Month = `0${Month}`
                }
                if(Day2<10){
                    Day2 = `0${Day2}`
                }
                if(Month2<10){
                    Month2 = `0${Month2}`
                }
                this.form.startTime=`${Year2}-${Month2}-${Day2} 08:00:00`
                this.form.overTime=`${Year2}-${Month2}-${Day2} ${Hours2}:${Minutes2}:${Seconds2}`
                //  this.form.date = `${Year2}-${Month2}-${Day2} `
                datelist[0] = this.form.startTime;
                datelist[1] = this.form.overTime;
                this.form.date = datelist;
            }

            },
            rowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0 && columnIndex === 0) {
                    return 'green'

                } else if (rowIndex === 0 && columnIndex === 1) {
                    return 'bacColor227700'
                } else if (rowIndex === 0 && columnIndex === 2) {
                    return 'bacColor00BBFF'
                } else if (rowIndex === 0 && columnIndex === 3) {
                    return 'bacColor003377'
                } else if (rowIndex === 0 && columnIndex === 4) {
                    return 'bacColorCC6600'
                } else if (rowIndex === 0 && columnIndex === 5) {
                    return 'bacColorCC0000'
                }
            },


            //表格合并方法
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
            },


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
            optable() {
                this.dialog_detail_showing = true;
            },
            cellclick(row, column, cell, event) {
                console.log('---------------------');
                console.log(row); //return;
                var evt = new Object();
                evt.graphic = new Object();
                evt.graphic.attributes = row;
                evt.graphic.attributes.itype = "yuqing";
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
                evt.graphic.attributes.STNM = row.STNM;
                evt.graphic.attributes.STCD = row.STCD;
                evt.graphic.attributes.rowinfo.STNM = row.STNM;
                evt.graphic.attributes.rowinfo.STCD = row.STCD;
                evt.graphic.attributes.rowinfo.tableType = {
                    yq: "hourTable"
                };
                var v = new Object;
                v.itype = "yuqing";
                console.log("evt", evt);
                this.$App.showDrawer(evt, v);
            },
            err() {
                // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            indexMethod(index) {
                return index + 1 + (this.list_input.pagesize * (this.list_input.current - 1));
            },
            search() {
                if (this.form.searchmsg != '') {
                    this.searchs = '&STNM=' + this.form.searchmsg;
                } else {
                    this.searchs = '';
                }
                this.Reload();
            },
            timechange(date) {
                console.log(date);
                console.log(this.form.date);
                this.form.date = date;
                this.Reload();
            },
            XZQHsearch() {
                console.log(this.form.model_adress);
                this.Reload();
            },
            QDsearch() {
                console.log(this.form.model_qudao);
                this.Reload();
            },
            STGRsearch(){
                console.log(this.form.gsdw);
                this.Reload(this.STinfo.STCD);
            },
            TYPEsearch() {
                console.log(this.form.zdlx);
                this.Reload(this.STinfo.P);
            },
            Reload() {
                this.loading = true;
                // 如果地址选择框有内容，添加行政区划过滤字段
                if (this.form.model_adress !=null && typeof(this.form.model_adress.length) != "undefined" && this.form.model_adress.length>0) {
                    var addvdds=[];
                    for(var i=0;i<this.form.model_adress.length;i++){
                        addvdds.push(`${this.$App.SUB_ADDVCD_Array_Filter(
                          this.form.model_adress[i]
                      )}`);
                    }
                    this.form.xzqh = addvdds.toString();                   
                }else{
                    this.form.xzqh = '';
                }
                if (this.form.model_qudao.length == 0) {
                    this.form.qd = '';
                }
                if (this.form.model_qudao.length == 1) {
                    // var str4 = this.form.model_qudao[0];
                    // str4 = str4.substring(0, 5);
                    this.form.qd = this.form.model_qudao[0];
                }
                if (this.form.model_qudao.length == 2) {
                    // var str5 = this.form.model_qudao[1];
                    // str5 = str5.substring(0, 9);
                    this.form.qd = this.form.model_qudao[1];
                }

                let obj = {
                    // TM: this.form.date,
                    Time_min:this.form.date[0],
                    Time_max:this.form.date[1],
                    ADDVCD: this.form.xzqh,
                    Canal_Code: this.form.qd,
                    P: this.form.zdlx,
                    STGR:this.form.gsdw,
                }

                this.axios.get('/guanqu/yuqing/lishi_xiaoshitongji?_page_size=' + this.list_input.pagesize + '&' + '_page=' + this.list_input.current + '&' + this.searchs, {params: obj}).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.Tables.total = res.data.total;
                    this.Tables.ZongZhanShu = res.data.list[0].ZongZhanShu;
                    this.Tables.JiangYuZhanShu = res.data.list[0].JiangYuZhanShu;
                    this.Tables.PingJunJiangYu = res.data.list[0].PingJunJiangYu == null?'0.0':res.data.list[0].PingJunJiangYu;
                    this.Tables.ZuiDaJiangYu = res.data.list[0].ZuiDaJiangYu == null?'0.0':res.data.list[0].ZuiDaJiangYu;
                    this.list_input.total = res.data.total;
                    this.Tables.title = this.data[0].TM;
                    for (var i = 0; i < this.data.length; i++) {
                        // this.data[i].DA_Q = '0'+this.data[i].DA_Q;
                        this.data[i].da_z = this.Z_Filter(this.data[i].da_z);
                        this.data[i].da_q = this.Z_Filter(this.data[i].da_q, 3);
                        this.data[i].dwq = this.Z_Filter(this.data[i].dwq, 3);
                    }
                });



                ///小时列表获取数据接口
                this.axios.get('/guanqu/yuqing/lishi_xiaoshiliebiao?_page_size=99999' + this.searchs, {
                    params: {
                        // TM: this.form.date,
                        Time_min:this.form.date[0],
                        Time_max:this.form.date[1],
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        P: this.form.zdlx,
                        STGR:this.form.gsdw,
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.Tables.data = res.data;

                    console.log('+++++');
                    console.log(this.Tables.data);
                    //123
                    for (var i = 0; i < this.Tables.data.length; i++) {
                        this.Tables.data[i].da_z = this.Z_Filter(this.Tables.data[i].da_z);
                        this.Tables.data[i].da_q = this.Z_Filter(this.Tables.data[i].da_q, 3);
                        this.Tables.data[i].dwq = this.Z_Filter(this.Tables.data[i].dwq, 3);
                    }
                });

                this.axios.get('/guanqu/yuqing/lishi_xiaoshitezheng?'+this.searchs,{params:{Time_min:this.form.date[0],Time_max:this.form.date[1],ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,STYPE:this.form.zdlx}}).then((res)=>{
                    this.loading = false;
                    console.log(res);
                    this.cols1 = res.data[0].zhandian;
                    this.data  = res.data[0].tongji;

                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {
                        this.data[i].A_Z = this.Z_Filter(this.data[i].A_Z);
                        this.data[i].A_Q = this.Z_Filter(this.data[i].A_Q, 3);
                        this.data[i].WQ = this.Z_Filter(this.data[i].WQ, 3);
                    }                   
                });


                this.axios.get('/guanqu/yuqing/lishi_xiaoshizhanshutongji?_page_size=99999' + this.searchs, {
                    params: {
                        // TM: this.form.date,
                        Time_min:this.form.date[0],
                        Time_max:this.form.date[1],
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        P: this.form.zdlx,
                        STGR:this.form.gsdw,
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                     //this.tableData3 = res.data.list;
                      if(res.data.list[0]!==null){
                        // this.tableData3=this.tableDatanull
                        this.tableData3 = res.data.list;

                    }else{
                        //  this.tableData3 = res.data.list;
                        this.tableData3=this.tableDatanull
                    }
                    //123
                    for (var i = 0; i < this.tableData3.length; i++) {
                        this.tableData3[i].da_z = this.Z_Filter(this.tableData3[i].da_z);
                        this.tableData3[i].da_q = this.Z_Filter(this.tableData3[i].da_q, 3);
                        this.tableData3[i].dwq = this.Z_Filter(this.tableData3[i].dwq, 3);
                    }

                });
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
                this.list_input.current = index;
                this.data[0].ID = index * this.list_input.pagesize;
                this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
                this.list_input.pagesize = pagesize;
                this.Reload();
            },
        },
        components: {},
        created() {
            console.dir("showDrawer", this.$showDrawer)
        }
    }
</script>

<style type="text/css">
    .rgb196 {
        background: rgb(196, 196, 196);
    }

    .bacColor317eb0 {
        background: #317eb0;
    }

    .bacColorf4984e {
        background: #f4984e;
    }

    .green {
        background: #00FF00;
    }

    .bacColor227700 {
        background: #227700;
    }

    .bacColor00BBFF {
        background: #00BBFF;
    }

    .bacColor003377 {
        background: #003377;
    }

    .bacColorCC6600 {
        background: #CC6600;
    }

    .bacColorCC0000 {
        background: #CC0000;
    }


    .el-table__header tr,
    .el-table__header th {
        padding: 0;
        height: 25px;
    }


</style>
