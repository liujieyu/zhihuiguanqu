<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
            <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
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
                    <Select v-model="form.gsdw" style="width:120px;margin-left: 5px;" @on-change="STGRsearch" clearable>
                        <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    水库类型:
                    <Select v-model="form.sklx" style="width:120px;margin-left: 5px;" @on-change="LEVELsearch" clearable>
                        <Option v-for="item in sklxlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>
                <Col>
                    <!-- 站名模糊搜索 -->
                    <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;" @on-search="search" v-model="form.searchmsg" />
                </Col>
                <Col>
                    <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                </Col>
            </Row>
            <Divider />
            <Row style="font-size: 16px;">
                <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                   共{{data.length}}个站点
                </Col> -->
                <Col style='font-size: 14px;' class="borsLine">共{{cols1.length}}个站点&nbsp;
                    水位：m，库容：m³</Col>
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
                        prop="TM"
                        label="时间"
                        sortable
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="RZ"
                        label="水位"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="STCP"
                        label="库容"
                        sortable
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="LEVEL"
                        label="水库类型"
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
    import FilterMethods from "@/assets/commonJS/FilterMethods";
    import GetDataMethods from "@/assets/commonJS/GetDataMethods";
    import App from "@/App.vue";
    export default {
        data(){
            return{
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
                sklxlist:[
                    {
                        value:'1',
                        label:'大型'
                    },
                    {
                        value:'2',
                        label:'中型'
                    },
                    {
                        value:'3',
                        label:'小I型'
                    },
                    {
                        value:'4',
                        label:'小II型'
                    },
                    {
                        value:'5',
                        label:'山塘'
                    },
                ],
                cols1:[],
                form:{
                    adressList:[],
                    qudaoList:[],
                    model_adress:'',
                    gsdw:'',
                    sklx:'',
                    model_qudao:'',
                    date:[],
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                    field:'',
                },
                date:'',
                xzqhdata:[],
                xzqh:'',
                loading:false,
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
                data: [],
                searchs:'',
                timesearch:'',
                STinfo: {
                    STCD: ''
                }
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            this.axios.get("/guanqu/table/xingzhen_tree?type=5").then(res => {
                this.Treedata2 = this.XingZheng_Tree_Filter('650000000000',res.data).data;
                this.AD_CD = this.XingZheng_Tree_Filter('650000000000',res.data).stcd;
                this.CZMC = this.XingZheng_Tree_Filter('650000000000',res.data).stnm.replace('【站点】','');
                this.STinfo.STCD = this.XingZheng_Tree_Filter('650000000000',res.data).stcd;
                this.STinfo.STNM = this.XingZheng_Tree_Filter('650000000000',res.data).stnm.replace('【站点】','');
                console.log(this.STinfo.STCD);
                this.Reload();
            });
            var date = new Date();
            var Month = date.getMonth()+1;
            var datelist = new Array();
            datelist[0] = date.getFullYear()+'-'+Month+'-'+date.getDate()+' 00:00:00';
            datelist[1] = date.getFullYear()+'-'+Month+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            this.form.date = datelist;
            console.log(this.form.date1,this.form.date2);
            this.Reload();
        },
        methods:{
            cellclick(row, column, cell, event){
                var evt = new Object();
                evt.graphic = new Object();
                evt.graphic.attributes = row;
                evt.graphic.attributes.itype = "shuiweikurong";
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
                evt.graphic.attributes.rowinfo.tableType = {
                    swkr: "historyTable"
                };
                var v = new Object;
                v.itype = "shuiweikurong";
                console.log("evt",evt);
                this.$App.showDrawer(evt, v);
            },
            timechange(){
                console.log(this.form.date);
                this.Reload();
            },
            XZQHsearch(){
                console.log(this.form.model_adress);
                this.Reload(this.STinfo.STCD);
            },
            QDsearch(){
                console.log(this.form.model_qudao);
                this.Reload(this.STinfo.STCD);
            },
            STGRsearch(){
                console.log(this.form.gsdw);
                if(!this.form.gsdw) this.form.gsdw = ''
                this.Reload(this.STinfo.STCD);
            },
            LEVELsearch(){
                console.log(this.form.sklx);
                if(!this.form.sklx) this.form.sklx = ''
                this.Reload(this.STinfo.STCD);
            },
            Reload(agmt){
                this.loading = true;
                if (this.form.model_adress.length == 0) {
                    this.form.xzqh = '';
                }
                if (this.form.model_adress.length == 1) {
                    var str1 = this.form.model_adress[0];
                    str1 = str1.substring(0,6);
                    this.form.xzqh = str1;
                }
                if (this.form.model_adress.length == 2) {
                    var str2 = this.form.model_adress[1];
                    str2 = str2.substring(0,9);
                    this.form.xzqh = str2;
                }
                if (this.form.model_adress.length == 3) {
                    var str3 = this.form.model_adress[2];
                    str3 = str3.substring(0,12);
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
                    ADDVCD:this.form.xzqh,
                    Canal_Code:this.form.qd,
                    STGR:this.form.gsdw,
                    LEVEL:this.form.sklx,
                    STNM: this.searchs
                }
                this.axios.get('/guanqu/shuiweikurong/lishi_liebiao',{params: obj}).then((res)=>{
                    this.loading = false;
                    console.log(res);

                    this.data = res.data.list.map((item,index) => {
                        for(let i in item){
                            switch (i) {
                                case 'TM':
                                    if(item[i] !== null){
                                        item[i] = item[i].substring(0,item[i].length - 2)
                                    }else {
                                        item[i] = ''
                                    }
                                    break;
                                case 'RZ':
                                    item[i] = this.Z_Filter(item[i],2)
                                    break;
                                case 'STCP':
                                    item[i] = this.Z_Filter(item[i],2)
                                    break;
                                default:
                                    item[i] = item[i]
                            }
                        }
                        console.log(item);
                        return item
                    });

                    this.cols1 = res.data.list;
                    this.list_input.total = res.data.total;
                    //行政区划
                    this.getTableData_WRP_AD_B(data => {
                        this.form.adressList = data;
                    });
                    // 获取输排水渠道数据,然后设置渠道选择框选项
                    this.getTableData_WRP_IrrBTCanalSystem(data => {
                        this.form.qudaoList = data;
                    });
                });


            },

            search(){
                if (this.form.searchmsg != '') {
                    this.searchs = this.form.searchmsg;
                    this.Reload()
                }else{
                    this.searchs = '';
                    this.Reload()
                }
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
                this.list_input.current = index;
                this.data[0].ID = index*this.list_input.pagesize;
                this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
                this.list_input.pagesize = pagesize;
                this.Reload();
            },
            err(){
                // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
        },
        components: {

        },
        created(){
            console.dir("showDrawer",this.$showDrawer)
        }
    }
</script>

<style type="text/css">

</style>
