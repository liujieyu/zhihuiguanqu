<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
            <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
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
                            value-format="yyyy-MM-dd HH:mm:ss"
                            size="small"
                            :clearable="false"
                            width="200"
                            style=";width: 340px"
                    >
                    </el-date-picker>
                </Col>
                <Col>
                    行政区划:
                    <!-- 地址级联选择器 -->
                    <el-cascader
                            clearable
                            size="small"
                            style="width: 160px"
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
                            style="width: 160px"
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
                <Col style="display: flex;justify-content: flex-start;margin-top: 10px;">
                    <!-- 站名模糊搜索 -->
                    <Input search enter-button suffix="ios-search" placeholder="请输入站名"
                           style="width: 160px;margin-right: 10px" @on-search="search" v-model="form.searchmsg"/>
                           <Button type="primary" style="width: auto;" @click="err">导出</Button>
                </Col>
            </Row>
            <Divider/>
            <Row style="font-size: 16px;">
                <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                   共{{data.length}}个站点
                </Col> -->
                <Col style='font-size: 14px;' class="borsLine">总站数：{{cols1.length}}&nbsp;
                    单位：水深 m，流量 m³/s，水量 m³
                </Col>
            </Row>

            <div :style="'width:'+wwww">
                <el-table
                        class="tableW"
                        id="zfsq_xsb_table"
                        :data="data"
                        border
                        height="700"
                        v-loading="loading"
                        style="width: 100%"
                        @cell-click="cellclick"
                >
                    <el-table-column
                            prop="dt"
                            label="时间"
                            align="center"
                            fixed="left">
                    </el-table-column>
                    <el-table-column
                            v-for="(item,index) in cols1" :key="index"
                            :label="item.stnm"
                            align="center">
                        <el-table-column
                                :prop="item.stnm+'闸阀上水深'"
                                label="闸阀上水深"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                :prop="item.stnm+'闸阀下水深'"
                                label="闸阀下水深"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                :prop="item.stnm+'平均流量'"
                                label="平均流量"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                :prop="item.stnm+'小时累计水量'"
                                label="小时累计流量"
                                align="center"
                        >
                        </el-table-column>
                    </el-table-column>
                </el-table>

            </div>


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
    </div>
</template>

<script type="text/javascript">
    let oTable = document.getElementById('mmmmy');
    import FilterMethods from "@/assets/commonJS/FilterMethods";
    import GetDataMethods from "@/assets/commonJS/GetDataMethods";
    import App from "@/App.vue";

    export default {
        data() {
            return {
                yujingdata: [],
                wwww: '1900px',
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
                    date: [],
                    searchmsg: '',
                    xzqh: '',
                    qd: '',
                    field: '',
                },
                date: '',
                cols1: [],
                xzqhdata: [],
                xzqh: '',
                loading: false,
                list_input: {
                    total: 100,
                    pagesize: 50,
                    pagesizeopts: [10, 20, 50, 75, 100, 200],
                    current: 1,
                },
                data: [],
                searchs: '',
                timesearch: '',
                STinfo: {},
                CZMC: '',
                allCode: null,
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods, GetDataMethods],
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
            this.Reload();
        },
        methods: {
            bukadun() {
                console.log('********', this.wwww);
                this.wwww = '100%';
                return;
            },
            // 传送滑框信息
            cellclick(row, column, cell, event) {
                // console.log(column.property);
                var value = column.property.replace('闸阀上水深', '').replace('闸阀下水深', '').replace('平均流量', '').replace('小时累计水量', '');
                console.log(this.cols1);
                this.cols1.forEach((val, index, array) => {
                    if (val.stnm == value) {
                        console.log('$$$$$$$$$', val);
                        this.yujingdata.forEach(item => {
                            if(item.rowinfo.STCD === val.stcd){
                                row.YUJING_EZ = item.rowinfo.YUJING_EZ;
                                row.YUJING_JYEZ = item.rowinfo.YUJING_JYEZ;
                                row.YUJING_JYQ = item.rowinfo.YUJING_JYQ
                                row.YUJING_JYSZ = item.rowinfo.YUJING_JYSZ
                                row.YUJING_Q = item.rowinfo.YUJING_Q
                                row.YUJING_SZ = item.rowinfo.YUJING_SZ
                            }
                        })
                        var STCD = val.stcd;
                        var evt = new Object();
                        evt.graphic = new Object();
                        evt.graphic.attributes = new Object();
                        evt.graphic.attributes.itype = "zhafashuiqing";
                        evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
                        evt.graphic.attributes.STNM = value;
                        evt.graphic.attributes.STCD = STCD;
                        evt.graphic.attributes.rowinfo.STNM = value;
                        evt.graphic.attributes.rowinfo.STCD = STCD;
                        evt.graphic.attributes.rowinfo.tableType = {
                            zfsq: "hourTable"
                        };
                        var v = new Object;
                        console.log(row);
                        v.itype = "zhafashuiqing";
                        console.log("evt", evt);
                        this.$App.showDrawer(evt, v);
                    }
                });
            },
            timechange() {
                console.log(this.form.date);
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
                // console.log(oTable.style.height);

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
                    Time_min: this.form.date[0],
                    Time_max: this.form.date[1],
                    ADDVCD: this.form.xzqh,
                    Canal_Code: this.form.qd,
                    CTYPE: this.form.zdlx,

                }
                this.axios.get('/guanqu/zhafashuiqing/lishi_xiaoshibiao?' + this.searchs, {params: obj}).then((res) => {
                    this.loading = false;
                    console.log(res);
                    this.allCode = res
                    this.cols1 = res.data[0].zhandian;
                    this.list_input.total = res.data[0].tongji.length;
                    this.data = res.data[0].tongji.map((val, index) => {
                        for (let key in val) {

                            var item = val[key]
                            if (item == 0) {
                                val[key] = ""
                            } else if (/水深$/.test(key)) {
                                val[key] = this.Float_Filter(val[key], 2)
                            } else if (/流量$/.test(key)) {
                                val[key] = this.Float_Filter(val[key], 3)
                            } else if (key.indexOf('小时累计水量') !== -1) {
                                val[key] = `${val[key]}00`
                            }
                        }
                        return val
                    });
                    console.log(this.data);
                    //行政区划
                    this.getTableData_WRP_AD_B(data => {
                        this.form.adressList = data;
                    });
                    // 获取输排水渠道数据,然后设置渠道选择框选项
                    this.getTableData_WRP_IrrBTCanalSystem(data => {
                        this.form.qudaoList = data;
                    });
                    this.wwww = '1900px';
                    setTimeout(() => {
                        this.bukadun();
                    }, 500);
                });

                // 取预警信息
                this.axios.get('/guanqu/zhafashuiqing/gis').then(res => {
                    console.log('++++++++++++', res);
                    this.yujingdata = res.data.features;
                });
            },

            search() {
                if (this.form.searchmsg != '') {
                    this.searchs = '&STNM=' + this.form.searchmsg;
                } else {
                    this.searchs = '';
                }
                this.Reload();
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
            err() {
                // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
        },
        components: {},
        created() {

        }
    }
</script>

<style type="text/css">
    /*.el-table__body-wrapper {*/
    /*    height: 90% !important;*/
    /*}*/

    /*.tableH {*/
    /*    height: 500px !important;*/
    /*}*/
</style>
