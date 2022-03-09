<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
            <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
                <Col>
                    时间:
                    <el-date-picker
                            style="width: 180px"
                            v-model="form.date"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            size="small"
                            :clearable="false"
                            @change="timechange">
                    </el-date-picker>
                </Col>
                <Col>
                    行政区划:
                    <!-- 地址级联选择器 -->
                    <el-cascader
                            style="width: 150px"
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
                            style="width: 150px"
                            clearable
                            size="small"
                            placeholder="请选择渠道"
                            :options="form.qudaoList"
                            v-model="form.model_qudao"
                            @change="QDsearch"
                            change-on-select
                    ></el-cascader>
                </Col>
                <Col style="display: flex;justify-content: flex-start;align-items: center;margin-top: 10px;">
                    站点类型:
                    <Select v-model="form.zdlx" style="width:120px;margin-left: 5px;margin-right: 10px;" @on-change="TYPEsearch" clearable>
                        <Option v-for="item in zdlxlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Input search enter-button suffix="ios-search" placeholder="请输入站名"
                           style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg"/>
                    <Button type="primary" style="width: auto;margin-right: 10px;" @click="err">导出</Button>
                    <Button type="primary" @click="optable" style="width: auto;margin-right: 0px;">综合报表</Button>
                </Col>
            </Row>
            <Divider/>
            <Row style="font-size: 16px;">
                <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                   共{{Tables.total}}个站点
                </Col> -->
                <Col style='font-size: 14px;' class="borsLine">总站数：{{Tables.total}}&nbsp;
                    单位：水深 m，流量 m³/s，水量 m³
                </Col>
            </Row>
            <el-table
                    :data="data"
                    border
                    height="450"
                    v-loading="loading"
                    style="width: 100%"
                    @cell-click="cellclick"
                    @sort-change="sort_change"
            >
                <el-table-column
                        label=" "
                        type="index"
                        align="center"
                        width="65"
                        :index="indexMethod">
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
                        label="平均水深"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="da_q"
                        label="平均流量"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="dwq"
                        label="日累计水量"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="stype"
                        label="站点类型"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="canal_name"
                        label="渠道"
                        align="center"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="adnm"
                        label="地址"
                        align="center"
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
                    {{this.form.date}} 渠道水情日表
                </Col>
            </Row>
            <Row>
                <Col>
                    总站数：{{Tables.total}}，单位：水深 m，流量 m³/s，水量 m³
                </Col>
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
                        sortable
                        width="200">
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
                        label="平均水深"
                        sortable
                        align="center"
                        width="240">
                </el-table-column>
                <el-table-column
                        prop="da_q"
                        label="平均流量"
                        sortable
                        align="center"
                        width="240"
                >
                </el-table-column>
                <el-table-column
                        prop="dwq"
                        label="日累计水量"
                        sortable
                        align="center"
                        width="240"
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
                loading: false,
                dialog_detail_showing: false,
                zdlxlist: [
                    {
                        value: '1',
                        label: '明渠'
                    },
                    {
                        value: '2',
                        label: '堰槽'
                    },
                    {
                        value: '3',
                        label: '渡槽'
                    },
                    {
                        value: '4',
                        label: '管道'
                    },
                ],
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
                },
                searchs: '',
                search1: '',
                search2: '',
                search3: '',
                search4: '',
                search5: '',
                timesearch: '',
                nodata: [],
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods, GetDataMethods],
        mounted() {
            var date = new Date();
            var Month = date.getMonth() + 1;
            this.form.date = date.getFullYear() + '-' + Month + '-' + date.getDate();
            this.Reload();
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
            optable() {
                this.dialog_detail_showing = true;
            },
            cellclick(row, column, cell, event) {
                var evt = new Object();
                evt.graphic = new Object();
                evt.graphic.attributes = row;
                evt.graphic.attributes.itype = "qudaoshuiqing";
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
                evt.graphic.attributes.STNM = evt.graphic.attributes.stnm;
                evt.graphic.attributes.STCD = evt.graphic.attributes.stcd;
                evt.graphic.attributes.rowinfo.STNM = evt.graphic.attributes.rowinfo.stnm;
                evt.graphic.attributes.rowinfo.STCD = evt.graphic.attributes.rowinfo.stcd;
                evt.graphic.attributes.rowinfo.tableType = {
                    qdsq: "dayTable"
                };
                var v = new Object;
                v.itype = "qudaoshuiqing";
                console.log("evt", evt);
                console.log(this.$App)
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
            TYPEsearch() {
                console.log(this.form.zdlx);
                this.Reload();
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
                    ADDVCD: this.form.xzqh,
                    Canal_Code: this.form.qd,
                    STYPE: this.form.zdlx
                }
                this.axios.get('/guanqu/qudaoshuiqing/lishi_ribiao?_page_size=' + this.list_input.pagesize + '&' + '_page=' + this.list_input.current + '&' + this.searchs, {params: obj}).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.Tables.total = res.data.total;
                    this.list_input.total = res.data.total;
                    this.Tables.title = this.data[0].TM;
                    for (var i = 0; i < this.data.length; i++) {
                        // this.data[i].DA_Q = '0'+this.data[i].DA_Q;
                        this.data[i].da_z = this.Z_Filter(this.data[i].da_z);
                        this.data[i].da_q = this.Z_Filter(this.data[i].da_q, 3);
                        this.data[i].dwq = this.Z_Filter(this.data[i].dwq, 3);
                    }
                });
                // this.axios.get('/guanqu/table/ST_DCanal_C?_page_size='+this.list_input.pagesize+'&'+'_page='+this.list_input.current+'&'+this.searchs,{params:{TM:this.form.date,ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,STYPE:this.form.zdlx}}).then((res)=>{
                //     console.log(res);
                //     this.loading = false;
                //       this.data = res.data.rows;
                //       this.Tables.total = res.data.total;
                //       this.list_input.total = res.data.total;
                //       this.Tables.title = this.data[0].TM;
                //       for (var i = 0;i<this.data.length ; i++) {
                //           // this.data[i].DA_Q = '0'+this.data[i].DA_Q;
                //           this.data[i].DA_Z = this.Z_Filter(this.data[i].DA_Z);
                //           this.data[i].DA_Q = this.Z_Filter(this.data[i].DA_Q, 3);
                //           this.data[i].DWQ = this.Z_Filter(this.data[i].DWQ, 3);
                //           if (this.data[i].STYPE == '1') {
                //             this.data[i].STYPE = '明渠';
                //           }
                //           if (this.data[i].STYPE == '2') {
                //             this.data[i].STYPE = '堰槽';
                //           }
                //           if (this.data[i].STYPE == '3') {
                //             this.data[i].STYPE = '渡槽';
                //           }
                //           if (this.data[i].STYPE == '4') {
                //             this.data[i].STYPE = '管道';
                //           }
                //       }
                // });
                this.axios.get('/guanqu/qudaoshuiqing/lishi_ribiao?_page_size=99999' + this.searchs, {
                    params: {
                        TM: this.form.date,
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        STYPE: this.form.zdlx
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.Tables.data = res.data.list;
                    //123
                    for (var i = 0; i < this.Tables.data.length; i++) {
                        this.Tables.data[i].da_z = this.Z_Filter(this.Tables.data[i].da_z);
                        this.Tables.data[i].da_q = this.Z_Filter(this.Tables.data[i].da_q, 3);
                        this.Tables.data[i].dwq = this.Z_Filter(this.Tables.data[i].dwq, 3);
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

</style>
