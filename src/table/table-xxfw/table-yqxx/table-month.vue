<template>
    <div>
        <Content :style="{padding: '12px 24px 24px 24px', background: '#fff'}">

            <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
                <Col>
                    时间:
                    <el-date-picker
                            v-model="form.date"
                            type="month"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月"
                            value-format="yyyy-MM"
                            size="small"
                            :clearable="true"
                            style="width: 180px"
                            @change="timechange">
                    </el-date-picker>
                </Col>
                <Col>
                    <!-- 地址级联选择器 -->
                    <el-cascader

                            clearable
                            size="small"
                            style="width: 200px"
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
                    <Select v-model="form.gsdw" style="width:120px" @on-change="STGRsearch" clearable placeholder="归属单位">
                        <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <Select v-model="form.jiangyu" style="width:120px;" @on-change="JIANGYUsearch" clearable placeholder="降雨量">
                        <Option v-for="item in jiangyulist" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </Col>

                <Col>
                    <!-- 站名模糊搜索 -->
                    <Input search enter-button suffix="ios-search" placeholder="请输入站名"
                           style="width: 160px;" @on-search="search" v-model="form.searchmsg"/>
                </Col>
                <!--
                <Col class="btn_baobiao">
                    <Button type="primary" style="width: auto; margin-right: 10px; " @click="err">导出</Button>
                    <Button type="primary" @click="optable" style="width: auto;">综合报表</Button>
                </Col>
                -->
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
                            label="0~50"
                            width="180"
                            height='25'
                            style="background-color: antiquewhite;"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="rain2"
                            label="50~100"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="rain3"
                            label="100~150">
                    </el-table-column>
                    <el-table-column
                            prop="rain4"
                            label="150~250">
                    </el-table-column>
                    <el-table-column
                            prop="rain5"
                            label="250~400">
                    </el-table-column>
                    <el-table-column
                            prop="rain6"
                            label=">400">
                    </el-table-column>
                </el-table>
            </Row>
            <Divider style="margin-top:0px;"/>
            <Row style="font-size: 16px;">
                <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                   共{{Tables.total}}个站点
                </Col> -->
                <Col style='font-size: 14px;' class="borsLine">总站数：{{Tables.ZongZhanShu}},&nbsp;
                    降雨站数：{{Tables.JiangYuZhanShu}}，最大降雨：{{Tables.ZuiDaJiangYu}}，平均降雨：{{Tables.PingJunJiangYu}}，单位: 雨量 mm
                </Col>
            </Row>
            <el-table
                    :data="tableData1"
                    :span-method="objectSpanMethod"
                    border
                    :height="theight"
                    v-loading="loading"
                    style="width: 100%"                    
                    @sort-change="sort_change"
            >
                <!--@cell-click="cellclick" 
                    <el-table-column
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
                        prop="STNM"
                        label="站名"
                        align="center"
                        sortable
                        fixed="left"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="p"
                        fixed="left"
                        label="月雨量"
                        align="center"
                        sortable
                        width="110">
                <template slot-scope="scope">
                        <div>
                        <span
                            :style="{
                        color: scope.row.p <= 50?'green' :scope.row.p <= 100 ?'#227700' : scope.row.p <= 150?'#00BBFF' :scope.row.p <= 250?'#003377':scope.row.p <= 400?'#CC6600':'#CC0000',
                        }"
                        >{{ scope.row.p }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="a1"
                        label="1"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a2"
                        label="2"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a3"
                        label="3"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a4"
                        label="4"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a5"
                        label="5"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a6"
                        label="6"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a7"
                        label="7"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a8"
                        label="8"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a9"
                        label="9"
                        align="center"
                        width="80"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a10"
                        label="10"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a11"
                        label="11"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a12"
                        label="12"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a13"
                        label="13"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a14"
                        label="14"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a15"
                        label="15"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a16"
                        label="16"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a17"
                        label="17"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a18"
                        label="18"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a19"
                        label="19"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a20"
                        label="20"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a21"
                        label="21"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a22"
                        label="22"
                        align="center"
                        width="90"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a23"
                        label="23"
                        align="center"
                        width="90"
                        sortable>
                </el-table-column>
                    <el-table-column
                            prop="a24"
                            label="24"
                            align="center"
                            width="90"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="a25"
                            label="25"
                            align="center"
                            width="90"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="a26"
                            label="26"
                            align="center"
                            width="90"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="a27"
                            label="27"
                            align="center"
                            width="90"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="a28"
                            label="28"
                            align="center"
                            width="90"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            v-if="runyue1"
                            prop="a29"
                            label="29"
                            align="center"
                            width="90"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            v-if="runyue2"
                            prop="a30"
                            label="30"
                            align="center"
                            width="90"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            v-if="isBiggerMonth"
                            prop="a31"
                            label="31"
                            align="center"
                            width="90"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="STGR"
                            label="归属单位"
                            align="center"
                            width="120"
                            sortable
                    >
                    </el-table-column>
                <!--
                    <el-table-column
                            prop="canal_name"
                            label="渠道"
                            align="center"
                            width="175"
                            sortable
                    >
                    </el-table-column>
                    -->
                    <el-table-column
                            prop="AD_NM"
                            label="所属行政区划"
                            align="center"
                            width="175"
                            sortable>
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
                    {{yqYear}}年{{yqMon}}月 雨情月表
                </Col>
            </Row>
            <Row>
                <!-- <Col>
                    站点总数(个):{{Tables.total}}
                </Col>
                <Col>平均水位：m，平均流量：m³/s，日累计水量：m³</Col> -->
                <Col style='font-size: 14px;text-align: left;'>共{{Tables.ZongZhanShu}}个站点,&nbsp;
                    降雨站数：{{Tables.JiangYuZhanShu}}，最大降雨：{{Tables.ZuiDaJiangYu}}，平均降雨：{{Tables.PingJunJiangYu}}，单位: 雨量 mm
                </Col>
            </Row>
            <Row>
                <Col style='font-size: 14px;text-align: left;'>
                    <pre style='font-size: 14px;'>0-10站数：{{one}}     10-25站数：{{tow}}     50-100站数：{{three}}    100-250站数：{{forth}}     >=250站数：{{fives}}</pre>
                </Col>
            </Row>
            <Row>
                <Col style='font-size: 14px;text-align: left;'>
                    单位：站数：个，雨量：mm
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
                        prop="STNM"
                        label="站名"
                        align="center"
                        sortable
                        fixed="left"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="p"
                        fixed="left"
                        label="月雨量"
                        align="center"
                        sortable
                        width="110">
                </el-table-column>
                <el-table-column
                        prop="a1"
                        label="1"
                        align="center"
                        width="120"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a2"
                        label="2"
                        align="center"
                        width="120"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a3"
                        label="3"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a4"
                        label="4"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a5"
                        label="5"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a6"
                        label="6"
                        align="center"
                        width="140"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a7"
                        label="7"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a8"
                        label="8"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a9"
                        label="9"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a10"
                        label="10"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a11"
                        label="11"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a12"
                        label="12"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a13"
                        label="13"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a14"
                        label="14"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a15"
                        label="15"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a16"
                        label="16"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a17"
                        label="17"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a18"
                        label="18"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a19"
                        label="19"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a20"
                        label="20"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a21"
                        label="21"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a22"
                        label="22"
                        align="center"
                        width="175"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="a23"
                        label="23"
                        align="center"
                        width="175"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="a24"
                        label="24"
                        align="center"
                        width="175"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="a25"
                        label="25"
                        align="center"
                        width="175"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="a26"
                        label="26"
                        align="center"
                        width="175"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="a27"
                        label="27"
                        align="center"
                        width="175"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="a28"
                        label="28"
                        align="center"
                        width="175"
                        sortable>
                </el-table-column>
                <el-table-column
                        v-if="runyue1"
                        prop="a29"
                        label="29"
                        align="center"
                        width="175"
                        sortable>
                </el-table-column>
                <el-table-column
                        v-if="runyue2"
                        prop="a30"
                        label="30"
                        align="center"
                        width="175"
                        sortable>
                </el-table-column>
                <el-table-column
                        v-if="isBiggerMonth"
                        prop="a31"
                        label="31"
                        align="center"
                        width="175"
                        sortable>
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
                        sortable>
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
                theight:window.screen.height-480,
                gsdwlist: [
                    {
                        value: '1',
                        label: '国家重要站'
                    },
                    {
                        value: '2',
                        label: '省级重要站'
                    },
                    {
                        value: '3',
                        label: '一般站'
                    },
                    {
                        value: '4',
                        label: '实验或专用站'
                    },
                    {
                        value: '5',
                        label: '山洪站'
                    },
                    {
                        value: '6',
                        label: '临时站'
                    },
                    {
                        value: '7',
                        label: '其他站'
                    },
                    {
                        value: '8',
                        label: '灌区站'
                    },
                ],
                loading: false,
                dialog_detail_showing: false,
                yqYear: '',
                yuMon: '',

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
                YqMonth:'',
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
                    gsdw: '',
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
                    JiangYuZhanShu: '',
                    PingJunJiangYu: '',
                    ZongZhanShu: '',
                    ZuiDaJiangYu: ''
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
                    P: ''
                },
                value1: '',
                one: '',
                tow: '',
                three: '',
                forth: '',
                fives: '',
                isBiggerMonth: true,
                runyue1: true,
                runyue2: true

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
            let date = new Date()
            this.yqYear = date.getFullYear();
            this.yqMon = date.getMonth()+1 < 10? `0${date.getMonth()+1} ` : date.getMonth()+1;
            this.setBiggerMonth(this.yqYear, this.yqMon);
            this.form.date = `${this.yqYear}-${this.yqMon}`;
            //行政区划
            this.getTableData_WRP_AD_B(data => {
                this.form.adressList = data[0].children;
            });
            // 获取输排水渠道数据,然后设置渠道选择框选项
            //this.getTableData_WRP_IrrBTCanalSystem(data => {
            //    this.form.qudaoList = data;
            //});
            this.Reload();

        },
        methods: {

            //对时间选择器进行时间处理
            handleTime() {
                var date = new Date();
                var date2 = new Date();
                var Hours = date.getHours();

                if (Hours < 8) {
                    date2 = date2.setTime(date2.getTime() - 24 * 60 * 60 * 1000);
                    date2 = new Date(date2);
                    var Year = date2.getFullYear();
                    var Month = date2.getMonth() + 1;
                    var Day = date2.getDate();
                    var Year2 = date.getFullYear();
                    var Month2 = date.getMonth() + 1;
                    var Day2 = date.getDate();
                    if (Day < 10) {
                        Day = `0${Day}`
                    }
                    if (Month < 10) {
                        Month = `0${Month}`
                    }
                    if (Day2 < 10) {
                        Day2 = `0${Day2}`
                    }
                    if (Month2 < 10) {
                        Month2 = `0${Month2}`
                    }
                    this.form.startTime = `${Year}-${Month}-${Day} 08:00:00`
                    this.form.overTime = `${Year2}-${Month2}-${Day2} 08:00:00`
                    this.form.date = `${Year}-${Month}-${Day}`
                } else {
                    date2 = date2.setTime(date2.getTime() + 24 * 60 * 60 * 1000);
                    date2 = new Date(date2);
                    var Year = date2.getFullYear();
                    var Month = date2.getMonth() + 1;
                    var Day = date2.getDate();
                    var Year2 = date.getFullYear();
                    var Month2 = date.getMonth() + 1;
                    var Day2 = date.getDate();
                    if (Day < 10) {
                        Day = `0${Day}`
                    }
                    if (Month < 10) {
                        Month = `0${Month}`
                    }
                    if (Day2 < 10) {
                        Day2 = `0${Day2}`
                    }
                    if (Month2 < 10) {
                        Month2 = `0${Month2}`
                    }
                    this.form.startTime = `${Year2}-${Month2}-${Day2} 08:00:00`
                    this.form.overTime = `${Year}-${Month}-${Day} 08:00:00`
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
            // 获取当前年份当前月份中有多少天数
            days(year,month){
                var dayCount;
                let now = new Date(year,month, 0);
                dayCount = now.getDate();
                return dayCount;
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
                console.log('row', row);
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
                    yq: "monthTable"
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
                let dateArr = date.split('-');
                this.yqYear = dateArr[0];
                this.yqMon = dateArr[1];
                this.setBiggerMonth(dateArr[0],dateArr[1]);
                this.Reload();
                // date = new Date(date);
                // var settime = date.setTime(date.getTime());
                // var settime2 = date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
                // //选中当天日期
                // settime = new Date(settime);
                // //选中当天的明天日期
                // settime2 = new Date(settime2);
                // var Year = settime.getFullYear();
                // var Month = settime.getMonth() + 1;
                // var Day = settime.getDate();
                // var Hours = settime.getHours();
                // //
                // var Year2 = settime2.getFullYear();
                // var Month2 = settime2.getMonth() + 1;
                // var Day2 = settime2.getDate();
                // var Hours2 = settime2.getHours();
                // if (Day < 10) {
                //     Day = `0${Day}`
                // }
                // if (Hours < 10) {
                //     Hours = `0${Hours}`
                // }
                // if (Month < 10) {
                //     Month = `0${Month}`
                // }
                // this.form.startTime = `${Year}-${Month}-${Day} 08:00:00`
                // //  this.form.overTime=`${Year2}-${Month2}-${settime2} 08:00:00`
                // if (Day2 < 10) {
                //     Day2 = `0${Day2}`
                // }
                // if (Hours2 < 10) {
                //     Hours2 = `0${Hours2}`
                // }
                // if (Month2 < 10) {
                //     Month2 = `0${Month2}`
                // }
                // this.form.overTime = `${Year2}-${Month2}-${Day2} 08:00:00`
                // //   this.form.startTime=`${Year}-${Month}-${settime} 08:00:00`
                // //  if(Hours<8){
                // //     settime=settime-1;
                // //     if(settime<10){
                // //         settime = `0${settime}`
                // //     }
                // //     this.form.startTime=`${Year}-${Month}-${settime} 08:00:00`
                // //       this.form.overTime=`${Year2}-${Month2}-${settime2} 08:00:00`
                //
                // // }else{
                // //      settime=settime+1;
                // //     if(settime<10){
                // //         settime = `0${settime}`
                // //     }
                // //     this.form.overTime=`${Year2}-${Month2}-${settime2} 08:00:00`
                // //      this.form.startTime=`${Year}-${Month}-${settime} 08:00:00`
                // // }
                //
                //
                // console.log(date.setTime(date.getTime() + 24 * 60 * 60 * 1000));
                // // console.log("this.form.date"+this.form.date);-24*60*60*1000
                // // this.form.date = date;

            },
            // 判断大小月
            setBiggerMonth(yr,mon){
                if(mon === '02') {
                    this.setRUNyue(yr,mon)
                }else{
                    this.runyue1 = true;
                    this.runyue2 = true;
                    let isBiggerMonth = this.days(yr, mon);
                    console.log(isBiggerMonth);
                    if(isBiggerMonth === 30){
                        this.isBiggerMonth = false
                    }else {
                        this.isBiggerMonth = true
                    }
                }


                console.log(this.runyue1,this.runyue2,this.isBiggerMonth);
            },
            // 判断闰年
            setRUNyue(yr,mon){
                console.log(this.days(yr, mon));
                if(this.days(yr, mon) === 29){
                    this.runyue1 = true;
                    this.runyue2 = false;
                    this.isBiggerMonth = false;
                }else if(this.days(yr, mon) === 28){
                    this.runyue1 = false;
                    this.runyue2 = false;
                    this.isBiggerMonth = false;
                }else {
                    this.runyue1 = true;
                    this.runyue2 = true;
                    this.isBiggerMonth = true;
                }
            },
            XZQHsearch() {
                console.log(this.form.model_adress);
                this.Reload();
            },
            QDsearch() {
                console.log(this.form.model_qudao);
                this.Reload();
            },
            STGRsearch() {
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
                // if (this.form.model_adress.length == 1) {
                //     var str1 = this.form.model_adress[0];
                //     str1 = str1.substring(0, 6);
                //     this.form.xzqh = str1;
                // }
                if (this.form.model_adress.length == 1) {
                    var str2 = this.form.model_adress[0];
                    str2 = str2.substring(0, 9);
                    this.form.xzqh = str2;
                }
                if (this.form.model_adress.length == 2) {
                    var str3 = this.form.model_adress[1];
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
                    STGR: this.form.gsdw,
                    YR: this.yqYear,
                    MON: this.yqMon
                }

                this.axios.get(' /guanqu/yuqing/lishi_yuetongji?_page_size=' + this.list_input.pagesize + '&' + '_page=' + this.list_input.current + '&' + this.searchs, {params: obj}).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.Tables.total = res.data.total;
                    this.Tables.ZongZhanShu = res.data.list[0].ZongZhanShu;
                    this.Tables.JiangYuZhanShu = res.data.list[0].JiangYuZhanShu;
                    this.Tables.PingJunJiangYu = res.data.list[0].PingJunJiangYu == null ? '0.0' : res.data.list[0].PingJunJiangYu;
                    this.Tables.ZuiDaJiangYu = res.data.list[0].ZuiDaJiangYu == null ? '0.0' : res.data.list[0].ZuiDaJiangYu;
                    ;
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

                this.axios.get('/guanqu/yuqing/lishi_yuezhanshutongji?_page_size=99999' + this.searchs, {
                    params: {
                        TM: this.form.date,
                        //  Time_min:this.form.date[0],
                        //  Time_max:this.form.date[1],
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        P: this.form.jiangyu,
                        STGR: this.form.gsdw,
                        YR: this.yqYear,
                        MON: this.yqMon
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                    //  this.tableData3 = res.data.list;
                    if (res.data.list[0] !== null) {
                        // this.tableData3=this.tableDatanull
                        this.tableData3 = res.data.list;

                    } else {
                        //  this.tableData3 = res.data.list;
                        this.tableData3 = this.tableDatanull
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

                    this.one = res.data.list[0].rain1;
                    this.tow = res.data.list[0].rain2;
                    this.three = res.data.list[0].rain3;
                    this.forth = res.data.list[0].rain4;
                    this.fives = res.data.list[0].rain5;
                });

                this.axios.get('/guanqu/yuqing/lishi_yueliebiao?_page_size=99999' + this.searchs, {
                    params: {
                        TM: this.form.date,
                        YR: this.yqYear,
                        MON: this.yqMon,
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        P: this.form.jiangyu,
                        STGR: this.form.gsdw,
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.tableData1 = res.data;
                    console.log(this.tableData1);
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
