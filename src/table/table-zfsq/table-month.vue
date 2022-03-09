<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
            <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
                <Col>
                    时间:
                    <el-date-picker
                            style="width: 180px"
                            v-model="form.date"
                            type="month"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月"
                            value-format="yyyy-MM"
                            size="small"
                            :clearable="false"
                            @change="timechange">
                    </el-date-picker>
                </Col>
                <Col>
                    行政区划:
                    <!-- 地址级联选择器 -->
                    <el-cascader
                            clearable
                            size="small"
                            style="width: 180px"
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
                            style="width: 180px"
                            size="small"
                            placeholder="请选择渠道"
                            :options="form.qudaoList"
                            v-model="form.model_qudao"
                            @change="QDsearch"
                            change-on-select
                    ></el-cascader>
                </Col>
                <Col>
                    站点类型:
                    <Select v-model="form.zdlx" style="width:120px;margin-left: 5px;" @on-change="TYPEsearch" clearable>
                        <Option v-for="item in zdlxlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col class="btn_baobiao" style="display: flex;justify-content: flex-start;">
                    <!-- 站名模糊搜索 -->
                    <Input search enter-button suffix="ios-search" placeholder="请输入站名"
                           style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg"/>
                    <Button type="primary" style="width: auto;margin-right: 10px;" @click="err">导出</Button>
                    <Button type="primary" @click="optable" style="width: auto;margin-right: 0px;">综合报表</Button>
                </Col>
            </Row>
            <!--  {{form.model_adress}},{{form.zdlx}},{{form.model_qudao}},{{form.date}},{{form.searchmsg}} -->
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
                    height="480"
                    v-loading="loading"
                    @cell-click="cellclick"
                    @sort-change="sort_change"
                    style="width: 100%">
                <el-table-column
                        label=" "
                        type="index"
                        align="center"
                        width="65"
                        :index="indexMethod">
                </el-table-column>
                <el-table-column
                        prop="STNM"
                        label="站名"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="MA_UPZ"
                        label="闸阀上水深"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="MA_DWZ"
                        label="闸阀下水深"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="MA_Q"
                        label="平均流量"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="MWQ"
                        label="月累计流量"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="CTYPE"
                        label="站点类型"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="Canal_Name"
                        label="渠道"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="AD_NM"
                        label="地址"
                        sortable
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
                    show-total
                    show-elevator
                    ></Page> -->
                </div>
            </div>
        </Content>
        <el-dialog title="综合报表" :visible.sync="dialog_detail_showing" width="1200px" append-to-body>
            <Row>
                <Col style="text-align: center;font-size: 20px;">
                    {{this.form.date}} 闸阀水情月表
                </Col>
            </Row>
            <Row>
                <Col>总站数:{{Tables.total}}，单位：水深 m，流量 m³/s，水量 m³</Col>
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
                    @sort-change="sort_change"
                    style="width: 100%">
                <el-table-column
                        prop="Canal_Name"
                        label="渠道"
                        sortable
                        align="center"
                        width="130"
                >
                </el-table-column>
                <el-table-column
                        prop="STNM"
                        label="站名"
                        sortable
                        align="center"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="MA_UPZ"
                        label="闸阀上水深"
                        sortable
                        align="center"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="MA_DWZ"
                        label="闸阀下水深"
                        sortable
                        align="center"
                        width="140"
                >
                </el-table-column>
                <el-table-column
                        prop="MA_Q"
                        label="平均流量"
                        sortable
                        align="center"
                        width="140"
                >
                </el-table-column>
                <el-table-column
                        prop="MWQ"
                        label="月累计流量"
                        sortable
                        align="center"
                        width="150"
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

    export default {
        data() {
            return {
                yujingdata: [],
                loading: false,
                dialog_detail_showing: false,
                zdlxlist: [
                    {
                        value: '1',
                        label: '闸门'
                    },
                    {
                        value: '2',
                        label: '阀门'
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
                search1: '&STNM=like,',
                search2: '&TM=',
                search3: '&',
                search4: '&',
                search5: '&',
                timesearch: '',
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods, GetDataMethods],
        mounted() {
            var date = new Date();
            var Month = date.getMonth() + 1;
            this.form.date = date.getFullYear() + '-' + Month;
            this.form.YE = date.getFullYear();
            this.form.MON = Month;
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
                // 给row对象添加预警信息
                this.yujingdata.forEach(item => {
                    // 判断是否点击那一行的预警信息
                    if (item.rowinfo.STCD === row.STCD) {
                        row.YUJING_EZ = item.rowinfo.YUJING_EZ;
                        row.YUJING_JYEZ = item.rowinfo.YUJING_JYEZ;
                        row.YUJING_JYQ = item.rowinfo.YUJING_JYQ;
                        row.YUJING_JYSZ = item.rowinfo.YUJING_JYSZ;
                        row.YUJING_Q = item.rowinfo.YUJING_Q;
                        row.YUJING_SZ = item.rowinfo.YUJING_SZ;
                    }
                });
                evt.graphic.attributes = row;
                evt.graphic.attributes.itype = "zhafashuiqing";
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
                evt.graphic.attributes.STNM = evt.graphic.attributes.STNM;
                evt.graphic.attributes.STCD = evt.graphic.attributes.STCD;
                evt.graphic.attributes.rowinfo.STNM = evt.graphic.attributes.rowinfo.STNM;
                evt.graphic.attributes.rowinfo.STCD = evt.graphic.attributes.rowinfo.STCD;
                evt.graphic.attributes.rowinfo.tableType = {
                    zfsq: "monthTable"
                };
                var v = new Object;
                v.itype = "zhafashuiqing";
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
            timechange() {
                console.log(this.form.date);
                this.form.YE = this.form.date.substring(0, 4);
                this.form.MON = this.form.date.substring(6, 7);
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
                if (this.form.zdlx === undefined) {
                    this.form.zdlx = ''
                } else {
                    this.form.zdlx = this.form.zdlx
                }
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
                this.axios.get('/guanqu/zhafashuiqing/lishi_yuebiao?' + this.searchs, {
                    params: {
                        YR: this.form.YE,
                        MON: this.form.MON,
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        CTYPE: this.form.zdlx
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    // this.Tables.total = res.data.total;
                    this.list_input.total = res.data.total;
                    this.Tables.title = this.data[0].YE + '-' + this.data[0].MON;
                    for (var i = 0; i < this.data.length; i++) {
                        this.data[i].MA_UPZ = this.Z_Filter(this.data[i].MA_UPZ);
                        this.data[i].MA_DWZ = this.Z_Filter(this.data[i].MA_DWZ);
                        this.data[i].MWQ = this.Z_Filter(this.data[i].MWQ, 3);
                        this.data[i].MA_Q = this.Z_Filter(this.data[i].MA_Q, 3);
                        if (this.data[i].ctype == '1') {
                            this.data[i].ctype = '闸门';
                        }
                        if (this.data[i].ctype == '2') {
                            this.data[i].ctype = '阀门';
                        }
                    }
                });
                this.axios.get('/guanqu/zhafashuiqing/lishi_yuebiao?' + this.searchs, {
                    params: {
                        YR: this.form.YE,
                        MON: this.form.MON,
                        ADDVCD: this.form.xzqh,
                        Canal_Code: this.form.qd,
                        CTYPE: this.form.zdlx
                    }
                }).then((res) => {
                    console.log(res);
                    this.loading = false;
                    this.Tables.data = res.data.list;
                    this.Tables.total = res.data.total;
                    for (var i = 0; i < this.Tables.data.length; i++) {
                        this.Tables.data[i].MA_UPZ = this.Z_Filter(this.Tables.data[i].MA_UPZ);
                        this.Tables.data[i].MA_DWZ = this.Z_Filter(this.Tables.data[i].MA_DWZ);
                        this.Tables.data[i].MWQ = this.Z_Filter(this.Tables.data[i].MWQ, 3);
                        this.Tables.data[i].MA_Q = this.Z_Filter(this.Tables.data[i].MA_Q, 3);
                    }

                    console.log(this.Tables.data);
                });
                // this.axios.get('/guanqu/zhafashuiqing/lishi_yuebiao?'+this.searchs,{params:{YE:this.form.YE,MON:this.form.MON,ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,CTYPE:this.form.zdlx}}).then((res)=>{
                //   this.Tables.total = res.data.total;
                // });
                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
                });
                // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                    this.form.qudaoList = data;
                });

                // 取预警信息
                this.axios.get('/guanqu/zhafashuiqing/gis').then(res => {
                    console.log('++++++++++++', res);
                    this.yujingdata = res.data.features;
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
