<template>
    <div>
        <Content :style="{padding: '12px 24px 24px 24px', background: '#fff'}">
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
                            <!-- 地址级联选择器 -->
                            <el-cascader
                              clearable
                              size="small"
                              placeholder="所属行政区划"
                              style="width: 150px"
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
                              style="width: 150px"
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
                            <Select v-model="form.gsdw" style="width:120px;margin-left: 5px;" @on-change="STGRsearch" clearable placeholder="归属单位">
                                <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select v-model="form.skdj" style="width:120px;margin-left: 5px;" @on-change="LEVELsearch" clearable placeholder="水库等级">
                                <Option v-for="item in skdjlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: 160px;" @on-search="search" v-model="form.searchmsg" />
                            <!--
                            <Button type="primary" style="width: auto;margin-right: 10px;" @click="err">导出</Button>
                            <Button type="primary" @click="optable" style="width: auto;margin-right: 0px;">综合报表</Button>
                            -->
                        </Col>
                    </Row>
                    <Divider style="margin-top:0px;"/>
                    <Row style="font-size: 16px;">
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                           共{{Tables.total}}个站点
                        </Col> -->
                        <Col style='font-size: 14px;' class="borsLine">总站数：{{data.length}}&nbsp;
                        单位：水位 m，流量m³/s，蓄水量 万m³</Col>
                    </Row>
                    <!--@cell-click="cellclick"-->
                    <el-table
                        :data="data"
                        border
                        :height="theight"
                        v-loading="loading"
                        @sort-change="sort_change"
                        style="width: 100%">
                        <el-table-column
                          label=" "
                          type="index"
                          align="center"
                          fixed="left"
                          width="55"
                          :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                          prop="STNM"
                          label="站名"
                          min-width="110"
                          fixed="left"
                          sortable
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="RZ"
                          label="库水位"
                          min-width="90"
                          fixed="left"
                          sortable
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="INQ"
                          label="入库流量"
                          min-width="110"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="OTQ"
                          label="出库流量"
                          min-width="110"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="MW"
                          label="蓄水量"
                          min-width="90"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="FWL"
                          label="汛限水位4-6月"
                          min-width="140"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="FWL79"
                          label="汛限水位7-9月"
                          min-width="140"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Max_RZ"
                          label="最高水位"
                          min-width="110"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Max_TM"
                          label="最高水位时间"
                          min-width="130"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Min_RZ"
                          label="最低水位"
                          min-width="110"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Min_TM"
                          label="最低水位时间"
                          min-width="130"
                          sortable
                          align="center"
                          >
                        </el-table-column>                       
                        <el-table-column
                          prop="LEVEL"
                          label="水库等级"
                          min-width="110"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="STGR"
                          label="归属单位"
                          min-width="110"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <!--
                        <el-table-column
                          prop="Canal_Name"
                          label="渠道"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        -->
                        <el-table-column
                          prop="AD_NM"
                          label="所属行政区划"
                          min-width="140"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                      </el-table>
                    <!-- <Table border :columns="columns1" :data="data" :loading="loading" height="600" :index="indexMethod"></Table> -->
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page
                            :total="list_input.total"
                            :current="list_input.current" show-sizer
                            :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                            @on-change="CurrentChange"
                            @on-page-size-change="PagesizeChange"
                            size="small"
                            show-total
                            show-elevator
                            ></Page>
                        </div>
                    </div>
                </Content>
                <el-dialog title="综合报表" :visible.sync="dialog_detail_showing" width="1200px" append-to-body>
                    <Row>
                      <Col style="text-align: center;font-size: 20px;">
                        {{this.form.date}} 水库水情月表
                      </Col>
                    </Row>
                    <Row>
                      <Col style="text-align: left">
                        总站数：{{Tables.total}}，单位：水位 m，流量m³/s，水量 10⁶m³
                      </Col>
                      <Col style="position: absolute;right: 0;bottom: 0px;">
                        <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                      </Col>
                    </Row>
                    <Divider />
                    <el-table
                        :data="Tables.data"
                        border
                        height="500"
                        v-loading="loading"
                        @sort-change="sort_change"
                        style="width: 100%">
                        <el-table-column
                          prop="canal_name"
                          label="渠道"
                          sortable
                          align="center"
                          width="100"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="stnm"
                          label="站名"
                          sortable
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="RZ"
                          label="平均水位"
                          sortable
                          align="center"
                          width="140">
                        </el-table-column>
                        <el-table-column
                          prop="INQ"
                          label="平均入库流量"
                          sortable
                          align="center"
                          width="140"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="OTQ"
                          label="平均出库流量"
                          sortable
                          align="center"
                          width="140"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="MW"
                          label="月蓄水位"
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
        data(){
            return{
                loading:false,
                theight:window.screen.height-435,
                dialog_detail_showing:false,
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
                skdjlist:[
                {
                    value:'3',
                    label:'小I型'
                },
                {
                    value:'4',
                    label:'小II型'
                },
                ],
                form:{
                    adressList:[],
                    qudaoList:[],
                    model_adress:'',
                    zdlx:'',
                    model_qudao:'',
                    date:'',
                    searchmsg:'',
                    field:'',
                },
                date:'',
                data:[],
                xzqhdata:[],
                xzqh:'',
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
                Tables:{
                  title:'',
                  total:'',
                  data:[],
                },
                searchs:'',
                search1:'&STNM=',
                search2:'&TM=',
                search3:'&',
                search4:'&',
                search5:'&',
                timesearch:'',
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            var date = new Date();
            var Month = date.getMonth()+1;
            this.form.date = date.getFullYear()+'-'+Month;
            this.form.YE = date.getFullYear();
            this.form.MON = Month;
            //行政区划
                this.getTableData_WRP_AD_B(data => {
                    //this.form.adressList = data;
                    this.form.adressList = data[0].children;
                });
                // 获取输排水渠道数据,然后设置渠道选择框选项
                // this.getTableData_WRP_IrrBTCanalSystem(data => {
                //     this.form.qudaoList = data;
                // });
            this.Reload();
            // this.Tables.title = date.getFullYear()+'-'+date.getMonth();
        },
        methods:{
            sort_change(column){
              console.log(column);
              if (column.order == 'ascending') {
                this.form.field = column.prop;
                this.Reload();
              }
              if (column.order == 'descending') {
                this.form.field = column.prop+' desc';
                this.Reload();
              }
              if (column.order == null) {
                this.form.field = '';
                this.Reload();
              }
            },
            optable(){
              this.dialog_detail_showing = true;
            },
            cellclick(row, column, cell, event){
              var evt = new Object();
              evt.graphic = new Object();
              evt.graphic.attributes = row;
              evt.graphic.attributes.itype = "shuikushuiqing";
              evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
              evt.graphic.attributes.rowinfo.tableType = {
                sksq: "monthTable"
              };
              var v = new Object;
              v.itype = "shuikushuiqing";
              console.log("evt",evt);
              this.$App.showDrawer(evt, v);
            },
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&STNM='+this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload();
            },
            timechange() {
                console.log(this.form.date);
                let time = this.form.date.split('-');
                this.form.YE = time[0];
                this.form.MON = time[1];
                this.Reload();
            },
            XZQHsearch(){
              console.log(this.form.model_adress);
              this.Reload();
            },
            QDsearch(){
              console.log(this.form.model_qudao);
              this.Reload();
            },
            STGRsearch(){
              console.log(this.form.gsdw);
              this.Reload();
            },
            LEVELsearch(){
              console.log(this.form.skdj);
              this.Reload();
            },
            Reload(){
                this.loading = true;
                if (this.form.model_adress.length == 0) {
                  this.form.xzqh = '';
                }
                // if (this.form.model_adress.length == 1) {
                //   var str1 = this.form.model_adress[0];
                //   str1 = str1.substring(0,6);
                //   this.form.xzqh = str1;
                // }
                if (this.form.model_adress.length == 1) {
                  var str2 = this.form.model_adress[0];
                  str2 = str2.substring(0,9);
                  this.form.xzqh =  +str2;
                }
                if (this.form.model_adress.length == 2) {
                  var str3 = this.form.model_adress[1];
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
                this.axios.get('/guanqu/shuikushuiqing/lishi_yuebiao?'+this.searchs,{params:{YR:this.form.YE,MON:this.form.MON,ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,STGR:this.form.gsdw,LEVEL:this.form.skdj}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.list_input.total = res.data.total;
                    this.Tables.title = this.data[0].YE+'-'+this.data[0].MON;
                    for (var i = 0;i<this.data.length ; i++) {
                        this.data[i].RZ = this.Z_Filter(this.data[i].RZ);
                        this.data[i].BLRZ = this.Z_Filter(this.data[i].BLRZ);
                        this.data[i].INQ = this.Z_Filter(this.data[i].INQ,3);
                        this.data[i].MW = this.Z_Filter(this.data[i].MW,3);
                        this.data[i].OTQ = this.Z_Filter(this.data[i].OTQ, 3);
                        this.data[i].Max_RZ = this.Z_Filter(this.data[i].Max_RZ);
                        this.data[i].Min_RZ = this.Z_Filter(this.data[i].Min_RZ);
                        this.data[i].FWL = this.Z_Filter(this.data[i].FWL);
                        this.data[i].FWL79 = this.Z_Filter(this.data[i].FWL79);
                        this.data[i].Max_TM = this.dateFilter(this.data[i].Max_TM);
                        this.data[i].Min_TM = this.dateFilter(this.data[i].Min_TM);
                    }
                });
                this.axios.get('/guanqu/shuikushuiqing/lishi_yuebiao?_page_size=99999'+this.searchs,{params:{YR:this.form.YE,MON:this.form.MON,ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,STGR:this.form.gsdw,LEVEL:this.form.skdj}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.Tables.data = res.data.list;
                    for (var i = 0;i<this.Tables.data.length ; i++) {
                        this.Tables.data[i].RZ = this.Z_Filter(this.Tables.data[i].RZ);
                        this.Tables.data[i].BLRZ = this.Z_Filter(this.Tables.data[i].BLRZ);
                        this.Tables.data[i].INQ = this.Z_Filter(this.Tables.data[i].INQ,3);
                        this.Tables.data[i].MW = this.Z_Filter(this.Tables.data[i].MW,3);
                        this.Tables.data[i].OTQ = this.Z_Filter(this.Tables.data[i].OTQ, 3);
                    }
                });
                this.axios.get('/guanqu/table/ST_RSVR_R1').then((res)=>{
                  this.Tables.total = res.data.total;
                });           
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
