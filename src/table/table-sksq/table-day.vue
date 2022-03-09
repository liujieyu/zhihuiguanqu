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
                              clearable
                              size="small"
                              placeholder="请选择地址"
                              style="width: 150px"
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
                              style="width: 150px"
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
                            水库等级:
                            <Select v-model="form.skdj" style="width:120px;margin-left: 5px;" @on-change="LEVELsearch" clearable>
                                <Option v-for="item in skdjlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col class="btn_baobiao" style="display: flex;justify-content: flex-start;">
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                            <Button type="primary" style="width: auto; margin-right: 10px" @click="err">导出</Button>
                            <Button type="primary" @click="optable" style="width: auto;margin-right: 0px;">综合报表</Button>
                        </Col>
                    </Row>
                    <Divider style="margin: 20px 0;"/>
                    <Row style="font-size: 16px;">
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                           共{{Tables.total}}个站点
                        </Col> -->
                        <Col style='font-size: 14px;' class="borsLine">总站数：{{data.length}}&nbsp;
                        单位：水位 m，流量m³/s，水量 10⁶m³</Col>
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
                          prop="RZ"
                          label="平均水位"
                          sortable
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="RWPTN"
                          label="水势"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="INQ"
                          label="平均入库流量"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="OTQ"
                          label="平均出库流量"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DW"
                          label="日蓄水量"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Max_RZ"
                          label="日最高水位"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Max_TM"
                          label="日最高水位时刻"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Min_RZ"
                          label="日最低水位"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Min_TM"
                          label="日最低水位时刻"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="FWL"
                          label="汛限水位4-6月"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="FWL79"
                          label="汛限水位7-9月"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="LEVEL"
                          label="水库等级"
                          sortable
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="STGR"
                          label="归属单位"
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
                    <!-- <Table border :columns="columns1" :data="data" :loading="loading" height="600"></Table> -->
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page
                            :total="list_input.total"
                            :current="list_input.current" show-sizer
                            :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                            @on-change="CurrentChange"
                            @on-page-size-change="PagesizeChange"
                            show-total
                            show-elevator
                            ></Page>
                        </div>
                    </div>
                </Content>

              <el-dialog title="综合报表" :visible.sync="dialog_detail_showing" width="1200px" append-to-body>
                    <Row>
                      <Col style="text-align: center;font-size: 20px;">
                        {{this.form.date}} 水库水情日表
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
                          prop="Canal_Name"
                          label="渠道"
                          sortable
                          align="center"
                          width="100"
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
                          prop="DW"
                          label="日蓄水位"
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
                Tables:{
                  title:'',
                  total:'',
                  data:[],
                },
                form:{
                    adressList:[],
                    qudaoList:[],
                    model_adress:'',
                    gsdw:'',
                    skdj:'',
                    model_qudao:'',
                    date:[],
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                    field:'',
                },
                Tables:{
                  title:'',
                  total:'',
                  data:[],
                },
                searchs:'',
                search1:'&STNM=like,',
                search2:'&TM=',
                search3:'&',
                search4:'&',
                search5:'&',
                timesearch:'',
                data:[],
                nodata:[],
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
            }
        },
        mounted(){
            var date = new Date();
            var Month = date.getMonth()+1;
            this.form.date = date.getFullYear()+'-'+Month+'-'+date.getDate();
            this.Reload();
        },
         // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
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
                console.log('%%%%%%%%%%',row);
                var evt = new Object();
              evt.graphic = new Object();
              evt.graphic.attributes = row;
              evt.graphic.attributes.itype = "shuikushuiqing";
              evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
              evt.graphic.attributes.STNM = evt.graphic.attributes.STNM;
              evt.graphic.attributes.STCD = evt.graphic.attributes.STCD;
              evt.graphic.attributes.rowinfo.STNM = evt.graphic.attributes.rowinfo.STNM;
              evt.graphic.attributes.rowinfo.STCD = evt.graphic.attributes.rowinfo.STCD;
              evt.graphic.attributes.rowinfo.tableType = {
                sksq: "dayTable"
              };
              var v = new Object;
              v.itype = "shuikushuiqing";
              console.log("evt",evt);
              this.$App.showDrawer(evt, v);
            },
            err(){
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
            timechange(){
              console.log(this.form.date);
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

              if(this.form.skdj === undefined){
                  this.form.skdj = ''
              }else {
                  this.form.skdj = this.form.skdj
              }
              this.Reload();
            },
            Reload(){
                console.log(this.form.gsdw);
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
                let timeMax = this.form.date[0];
                let timeMin = this.form.date[1];
                this.axios.get('/guanqu/shuikushuiqing/lishi_ribiao?'+this.searchs,{params:{TM:this.form.date,ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,STGR:this.form.gsdw,LEVEL:this.form.skdj}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                      this.list_input.total = res.data.total;
                      this.Tables.total = res.data.total;
                    let aList = res.data.list;

                    for (var i = 0;i< aList.length ; i++) {
                        aList[i].RZ = this.Z_Filter(aList[i].RZ);
                        aList[i].BLRZ = this.Z_Filter(aList[i].BLRZ);
                        aList[i].INQ = this.Z_Filter(aList[i].INQ,3);
                        aList[i].MW = this.Z_Filter(aList[i].MW,3);
                        aList[i].OTQ = this.Z_Filter(aList[i].OTQ, 3);
                        aList[i].Max_RZ = this.Z_Filter(aList[i].Max_RZ);
                        aList[i].Min_RZ = this.Z_Filter(aList[i].Min_RZ);
                        aList[i].FWL = this.Z_Filter2(aList[i].FWL);
                        aList[i].FWL79 = this.Z_Filter2(aList[i].FWL79);
                        console.log(aList[i].FWL79);
                        aList[i].Max_TM = this.dateFilter(aList[i].Max_TM);
                        aList[i].Min_TM = this.dateFilter(aList[i].Min_TM);
                    }
                    this.data = aList
                    this.Tables.title = this.data[0].TM;
                });
                this.getTableData_WRP_AD_B(data => {
                  this.form.adressList = data;
                });
                // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                  this.form.qudaoList = data;
                });
                this.axios.get('/guanqu/shuikushuiqing/lishi_ribiao?_page_size=99999'+this.searchs,{params:{TM:this.form.date,ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,STGR:this.form.gsdw,LEVEL:this.form.skdj}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    let aList = res.data.list;

                    for (var i = 0;i<this.aList.length ; i++) {
                        aList[i].RZ = this.Z_Filter(aList[i].RZ);
                        aList[i].BLRZ = this.Z_Filter(aList[i].BLRZ);
                        aList[i].INQ = this.Z_Filter(aList[i].INQ,3);
                        aList[i].MW = this.Z_Filter(aList[i].MW,3);
                        aList[i].OTQ = this.Z_Filter(aList[i].OTQ, 3);
                        aList[i].Max_RZ = this.Z_Filter(aList[i].Max_RZ);
                        aList[i].Min_RZ = this.Z_Filter(aList[i].Min_RZ);
                        aList[i].FWL = this.Z_Filter2(aList[i].FWL);
                        aList[i].FWL79 = this.Z_Filter2(aList[i].FWL79);
                        console.log(aList[i].FWL79);
                        aList[i].Max_TM = this.dateFilter(aList[i].Max_TM);
                        aList[i].Min_TM = this.dateFilter(aList[i].Min_TM);
                    }
                    this.Tables.data = aList
                });
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
            },
        },
    }
</script>

<style type="text/css">

</style>
