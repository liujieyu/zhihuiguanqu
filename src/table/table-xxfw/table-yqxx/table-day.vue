<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">

            <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
                <Col>
                   时间:
                          <el-date-picker
                            v-model="form.date"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            size="small"
                            :clearable="true"
                            style="width: 180px"
                            @change="timechange">
                    </el-date-picker>
                </Col>
                <Col>
                    行政区划:
                    <!-- 地址级联选择器 -->
                    <el-cascader

                            clearable
                            size="small"
                            placeholder="请选择地址"
                            :options="form.adressList"
                            v-model="form.model_adress"
                            @change="XZQHsearch"
                            change-on-select
                    ></el-cascader>
                </Col>
                <Col>
                    渠道:
                    <!-- 渠道级联选择器 -->
                    <el-cascader
                            clearable
                            size="small"
                            placeholder="请选择渠道"
                            :options="form.qudaoList"
                            v-model="form.model_qudao"
                            @change="QDsearch"
                            change-on-select
                    ></el-cascader>
                </Col>
                <Col>
                    归属单位:
                    <Select v-model="form.gsdw" style="width:120px" @on-change="STGRsearch" clearable>
                        <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col style="margin-top: 10px;">
                    降雨:
                    <Select v-model="form.jiangyu" style="width:120px;" @on-change="JIANGYUsearch" clearable>
                        <Option v-for="item in jiangyulist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>

                <Col class="btn_baobiao">
                    <!-- 站名模糊搜索 -->
                    <Input search enter-button suffix="ios-search" placeholder="请输入站名"
                           style="width: 160px;" @on-search="search" v-model="form.searchmsg"/>
                </Col>
                <Col class="btn_baobiao">
                    <Button type="primary" style="width: auto; margin-right: 10px; " @click="err">导出</Button>
                    <Button type="primary" @click="optable" style="width: auto;">综合报表</Button>
                </Col>
            </Row>
            <Row type="flex" :gutter="16" justify="end">
            </Row>
            <Row type="flex" style="margin: 10px;" :gutter="16" justify="end">
                <el-table
                        :cell-class-name="rowClass"
                        :data="tableData3"
                        border
                        style="width: 100%"
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

            <Divider/>
            <Row style="font-size: 16px;">
                <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                   共{{Tables.total}}个站点
                </Col> -->
                <Col style='font-size: 14px;' class="borsLine">总站数：{{Tables.ZongZhanShu}}&nbsp;
                    降雨站数：{{Tables.JiangYuZhanShu}}，最大降雨：{{Tables.ZuiDaJiangYu}}，平均降雨：{{Tables.PingJunJiangYu}}，单位: 雨量 mm
                </Col>
            </Row>
            <el-table
                    :data="tableData1"
                    :span-method="objectSpanMethod"
                    border
                    height="450"
                    v-loading="loading"
                    style="width: 100%"
                    @cell-click="cellclick"
                    @sort-change="sort_change"
            >
                <!-- <el-table-column
                        label=" "
                        type="index"
                        align="center"
                        width="65"
                        :index="indexMethod">
                </el-table-column> -->
                <!-- <el-table-column
                        prop="SHI"
                        label="市"
                        align="center"
                        sortable
                        width="">
                </el-table-column> -->
                <el-table-column
                        prop="stnm"
                        label="站名"
                        align="center"
                        sortable
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="p"
                        label="日雨量"
                        align="center"
                        sortable
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="8:00-9:00"
                        label="8:00-9:00"
                        align="center"
                        width="120"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="9:00-10:00"
                        label="9:00-10:00"
                        align="center"
                        width="120"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="10:00-11:00"
                        label="10:00-11:00"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="11:00-12:00"
                        label="11:00-12:00"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="12:00-13:00"
                        label="12:00-13:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="13:00-14:00"
                        label="13:00-14:00"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="14:00-15:00"
                        label="14:00-15:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="15:00-16:00"
                        label="15:00-16:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="16:00-17:00"
                        label="16:00-17:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="17:00-18:00"
                        label="17:00-18:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="19:00-20:00"
                        label="19:00-20:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="20:00-21:00"
                        label="20:00-21:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="21:00-22:00"
                        label="21:00-22:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="22:00-23:00"
                        label="22:00-23:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="23:00-0:00"
                        label="23:00-00:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="00:00-1:00"
                        label="00:00-1:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="1:00-2:00"
                        label="1:00-2:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="2:00-3:00"
                        label="2:00-3:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="3:00-4:00"
                        label="3:00-4:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="4:00-5:00"
                        label="4:00-5:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="5:00-6:00"
                        label="5:00-6:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="6:00-7:00"
                        label="6:00-7:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="7:00-8:00"
                        label="7:00-8:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                 <el-table-column
                        prop="STGR"
                        label="归属单位"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                 <el-table-column
                        prop="canal_name"
                        label="渠道"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                 <el-table-column
                        prop="AD_NM"
                        label="地址"
                        align="center"
                        width="175"
                        sortable
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
                    {{this.form.date}} 雨情信息日表
                </Col>
            </Row>
            <Row>
                <!-- <Col>
                    站点总数(个):{{Tables.total}}
                </Col>
                <Col>平均水位：m，平均流量：m³/s，日累计水量：m³</Col> -->
                 <Col style='font-size: 14px;text-align: left;'>共{{Tables.ZongZhanShu}}个站点&nbsp;
                    降雨站数：{{Tables.JiangYuZhanShu}}，最大降雨：{{Tables.ZuiDaJiangYu}}，平均降雨：{{Tables.PingJunJiangYu}}，单位: 雨量 mm
                </Col>

                <Col style="position: absolute;right: 0;bottom: 0px;">
                    <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                </Col>
            </Row>
            <Divider/>
            <el-table
                    :data="tableData1"
                    :span-method="objectSpanMethod"
                    border
                    height="508"
                    v-loading="loading"
                    style="width: 100%"
                    @cell-click="cellclick"
                    @sort-change="sort_change"
            >
                <!-- <el-table-column
                        label=" "
                        type="index"
                        align="center"
                        width="65"
                        :index="indexMethod">
                </el-table-column> -->
                <!-- <el-table-column
                        prop="SHI"
                        label="市"
                        align="center"
                        sortable
                        width="">
                </el-table-column> -->
                <el-table-column
                        prop="stnm"
                        label="站名"
                        align="center"
                        sortable
                        width="">
                </el-table-column>
                <el-table-column
                        prop="p"
                        label="日雨量"
                        align="center"
                        sortable
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="8:00-9:00"
                        label="8:00-9:00"
                        align="center"
                        width="120"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="STNM"
                        label="9:00-10:00"
                        align="center"
                        width="120"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall"
                        label="10:00-11:00"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="STNM1"
                        label="11:00-12:00"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall1"
                        label="12:00-13:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="stnm2"
                        label="13:00-14:00"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="14:00-15:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="15:00-16:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="16:00-17:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="17:00-18:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="19:00-20:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="20:00-21:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="21:00-22:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="22:00-23:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="23:00-00:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="00:00-1:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="1:00-2:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="2:00-3:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="3:00-4:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="4:00-5:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="5:00-6:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="6:00-7:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="rainfall2"
                        label="7:00-8:00"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                 <el-table-column
                        prop="STGR"
                        label="归属单位"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                 <el-table-column
                        prop="canal_name"
                        label="渠道"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                 <el-table-column
                        prop="AD_NM"
                        label="地址"
                        align="center"
                        width="175"
                        sortable
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
                loading: false,
                dialog_detail_showing: false,

                jiangyulist: [
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
                    jiangyu: '',
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
                tableData1: [],
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
                },
                value1: '',

            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods, GetDataMethods],
        mounted() {
           this.handleTime();
            // // var Month = date.getMonth() + 1;
            // // this.form.date = date.getFullYear() + '-' + Month + '-' + date.getDate();
            // datelist[0] = `${date.getFullYear()}-${Month}-${date.getDate()} 00:00:00`;
            // datelist[1] = `${date.getFullYear()}-${Month}-${date.getDate()} ${Hours}:${Minutes}:${Seconds}`;
            // this.form.date = datelist;

            this.Reload();

        },
        methods: {
            //对时间选择器进行时间处理
            handleTime(){
            var date = new Date();
            var date2 = new Date();
            var Hours = date.getHours();

            if(Hours<8){
                date2=date2.setTime(date2.getTime()-24*60*60*1000);
                date2 = new Date(date2);
                var Year = date2.getFullYear();
                var Month = date2.getMonth()+1;
                var Day = date2.getDate();
                var Year2 = date.getFullYear();
                var Month2 = date.getMonth()+1;
                var Day2 = date.getDate();
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
                this.form.overTime=`${Year2}-${Month2}-${Day2} 08:00:00`
                this.form.date = `${Year}-${Month}-${Day}`
            }else{
                date2=date2.setTime(date2.getTime()+24*60*60*1000);
                date2 = new Date(date2);
                var Year = date2.getFullYear();
                var Month = date2.getMonth()+1;
                var Day = date2.getDate();
                var Year2 = date.getFullYear();
                var Month2 = date.getMonth()+1;
                var Day2 = date.getDate();
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
                this.form.overTime=`${Year}-${Month}-${Day} 08:00:00`
                this.form.date = `${Year2}-${Month2}-${Day2}`
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
            cell({row, column, rowIndex, columnIndex}) {
                //第八列添加 red 类
                if (columnIndex == 4) {
                    return 'red'
                }
                //某一行其中的一个变量applies值如果大于0，并且在第六列，即确定一个具体的单元格需要确定行和列
                if (parseFloat(row.applies) > 0 && columnIndex == 5) {
                    return 'red'
                }
            },


            //表格合并方法
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                /*
                if (!this.now_col_row_num[column.property]) {
                    this.now_col_row_num[column.property] = Object.assign([], this.column_row_offset[column.property]);
                    let a = this.now_col_row_num[column.property].shift();
                    this.now_col_offset[column.property] = a;
                    return {
                        rowspan: a,
                        colspan: 1
                    };
                } else if (rowIndex >= this.now_col_offset[column.property]) {
                    let a = this.now_col_row_num[column.property].shift();
                    this.now_col_offset[column.property] += a;
                    return {
                        rowspan: a,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
                */
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
                console.log('row',row);
                var evt = new Object();
                evt.graphic = new Object();
                evt.graphic.attributes = row;
                evt.graphic.attributes.itype = "yuqing";
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
                evt.graphic.attributes.STNM = row.stnm;
                evt.graphic.attributes.STCD = row.STCD;
                evt.graphic.attributes.rowinfo.STNM = row.stnm;
                evt.graphic.attributes.rowinfo.STCD = row.STCD;
                evt.graphic.attributes.rowinfo.tableType = {
                    yq: "dayTable"
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
                date = new Date(date);
                var settime = date.setTime(date.getTime());
                var settime2 = date.setTime(date.getTime()+24*60*60*1000);
                //选中当天日期
                settime = new Date(settime);
                //选中当天的明天日期
                settime2 = new Date(settime2);
                var Year = settime.getFullYear();
                var Month = settime.getMonth()+1;
                var Day = settime.getDate();
                var Hours = settime.getHours();
                //
                var Year2 = settime2.getFullYear();
                var Month2 = settime2.getMonth()+1;
                var Day2 = settime2.getDate();
                var Hours2 = settime2.getHours();
                if(Day<10){
                    Day = `0${Day}`
            }
                if (Hours<10) {
                     Hours = `0${Hours}`
            }
                if (Month<10) {
                     Month = `0${Month}`
            }
                 this.form.startTime=`${Year}-${Month}-${Day} 08:00:00`
                //  this.form.overTime=`${Year2}-${Month2}-${settime2} 08:00:00`
            if(Day2<10){
                    Day2 = `0${Day2}`
            }
                if (Hours2<10) {
                     Hours2 = `0${Hours2}`
            }
                if (Month2<10) {
                     Month2 = `0${Month2}`
            }
                  this.form.overTime=`${Year2}-${Month2}-${Day2} 08:00:00`
                //   this.form.startTime=`${Year}-${Month}-${settime} 08:00:00`
            //  if(Hours<8){
            //     settime=settime-1;
            //     if(settime<10){
            //         settime = `0${settime}`
            //     }
            //     this.form.startTime=`${Year}-${Month}-${settime} 08:00:00`
            //       this.form.overTime=`${Year2}-${Month2}-${settime2} 08:00:00`

            // }else{
            //      settime=settime+1;
            //     if(settime<10){
            //         settime = `0${settime}`
            //     }
            //     this.form.overTime=`${Year2}-${Month2}-${settime2} 08:00:00`
            //      this.form.startTime=`${Year}-${Month}-${settime} 08:00:00`
            // }



                console.log(date.setTime(date.getTime()+24*60*60*1000));
                // console.log("this.form.date"+this.form.date);-24*60*60*1000
                // this.form.date = date;
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
            JIANGYUsearch() {
                console.log(this.form.jiangyu);
                this.Reload(this.STinfo.P);
            },
            Reload() {
                this.loading = true;
                if (this.form.model_adress.length == 0) {
                    this.form.xzqh = '';
                }
                if (this.form.model_adress.length == 1) {
                    var str1 = this.form.model_adress[0];
                    str1 = str1.substring(0, 6);
                    this.form.xzqh = str1;
                }
                if (this.form.model_adress.length == 2) {
                    var str2 = this.form.model_adress[1];
                    str2 = str2.substring(0, 9);
                    this.form.xzqh = str2;
                }
                if (this.form.model_adress.length == 3) {
                    var str3 = this.form.model_adress[2];
                    str3 = str3.substring(0, 12);
                    this.form.xzqh = str3;
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
                      TM: this.form.date,
                    //  Time_min:this.form.date[0],
                    //  Time_max:this.form.date[1],
                    ADDVCD: this.form.xzqh,
                    Canal_Code: this.form.qd,
                    P: this.form.jiangyu,
                    STGR:this.form.gsdw,
                }

                this.axios.get('/guanqu/yuqing/lishi_ritongji?_page_size=' + this.list_input.pagesize + '&' + '_page=' + this.list_input.current + '&' + this.searchs, {params: obj}).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.Tables.total = res.data.total;
                    this.Tables.ZongZhanShu = res.data.list[0].ZongZhanShu;
                    this.Tables.JiangYuZhanShu = res.data.list[0].JiangYuZhanShu;
                    this.Tables.PingJunJiangYu = res.data.list[0].PingJunJiangYu == null?'0.0':res.data.list[0].PingJunJiangYu;
                    this.Tables.ZuiDaJiangYu = res.data.list[0].ZuiDaJiangYu == null?'0.0':res.data.list[0].ZuiDaJiangYu; ;
                    this.list_input.total = res.data.total;
                    this.Tables.title = this.data[0].TM;
                    for (var i = 0; i < this.data.length; i++) {
                        // this.data[i].DA_Q = '0'+this.data[i].DA_Q;
                        this.data[i].da_z = this.Z_Filter(this.data[i].da_z);
                        this.data[i].da_q = this.Z_Filter(this.data[i].da_q, 3);
                        this.data[i].dwq = this.Z_Filter(this.data[i].dwq, 3);
                    }
                });

                // this.axios.get('/guanqu/yuqing/lishi_riliebiao?_page_size=99999' + this.searchs, {
                //     params: {
                //         // TM: this.form.date,
                //         Time_min:this.form.date[0],
                //         Time_max:this.form.date[1],
                //         ADDVCD: this.form.xzqh,
                //         Canal_Code: this.form.qd,
                //         P: this.form.zdlx,
                //         STGR:this.form.gsdw,
                //     }
                // }).then((res) => {
                //     console.log(res);
                //     this.loading = false;
                //     this.tableData1 = res.data.list;
                //     //123
                //     for (var i = 0; i < this.Tables.data.length; i++) {
                //         this.Tables.data[i].da_z = this.Z_Filter(this.Tables.data[i].da_z);
                //         this.Tables.data[i].da_q = this.Z_Filter(this.Tables.data[i].da_q, 3);
                //         this.Tables.data[i].dwq = this.Z_Filter(this.Tables.data[i].dwq, 3);
                //     }
                // });

                this.axios.get('/guanqu/yuqing/lishi_rizhanshutongji?_page_size=99999' + this.searchs, {
                    params: {
                          TM: this.form.date,
                        //  Time_min:this.form.date[0],
                        //  Time_max:this.form.date[1],
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        P: this.form.jiangyu,
                        STGR:this.form.gsdw,
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                    //  this.tableData3 = res.data.list;
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
                    // if(res.data.list.length==0){
                    //     this.tableData3=this.tableDatanull

                    // }
                });

                 this.axios.get('/guanqu/yuqing/lishi_riliebiao?_page_size=99999' + this.searchs, {
                    params: {
                        TM: this.form.date,
                        Time_min:this.form.startTime,
                        Time_max:this.form.overTime,
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        P: this.form.jiangyu,
                        STGR:this.form.gsdw,
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                     this.tableData1 = res.data
                     console.log(this.tableData1)
                    //  this.tableData1.stnm=res.data.list.stnm
                    //123
                    for (var i = 0; i < this.tableData1.length; i++) {
                        this.tableData1[i].da_z = this.Z_Filter(this.tableData1[i].da_z);
                        this.tableData1[i].da_q = this.Z_Filter(this.tableData1[i].da_q, 3);
                        this.tableData1[i].dwq = this.Z_Filter(this.tableData1[i].dwq, 3);
                        this.tableData1[i].p = this.Z_Filter(this.tableData1[i].p);
                        this.tableData1[i]['8:00-9:00'] = this.Z_Filter(this.tableData1[i]['8:00-9:00']);
                    }
                });

                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
                });
                // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                    this.form.qudaoList = data;
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
