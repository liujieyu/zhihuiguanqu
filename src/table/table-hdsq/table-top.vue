<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="end">
                        <Col>
                            归属单位:
                            <Select v-model="form.zdlx" style="width:120px;margin-left: 5px;" @on-change="TYPEsearch" clearable>
                                <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 10px;" @click="err">导出</Button>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                    </Row>
                    <Row type="flex" style="margin: 10px;" :gutter="16" justify="end">
                        <Col>
                        时间:
                            <el-date-picker
                              v-model="form.date"
                              type="year"
                              size="small"
                              placeholder="选择年">
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
                    </Row>
                    <Divider style="margin: 20px 0;"/>
                    <Row style="font-size: 16px;">
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                           共{{Tables.total}}个站点
                        </Col> -->
                        <Col style='font-size: 14px;' class="borsLine">共{{Tables.total}}个站点<br>
                        年最高水位：m，对应流量：m³/s</Col>
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
                          sortable="custom"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="TMHZ"
                          label="最高水位时间"
                          sortable="custom"
                          align="center"
                          width="130">
                        </el-table-column>
                        <el-table-column
                          prop="THZ"
                          label="年最高水位"
                          sortable="custom"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="YHZQ"
                          label="对应流量"
                          sortable="custom"
                          align="center"
                          width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="OTQ"
                          label="归属单位"
                          sortable="custom"
                          align="center"
                          width="130"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DW"
                          label="渠道"
                          sortable="custom"
                          align="center"
                          width="110"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="FWL"
                          label="地址"
                          sortable="custom"
                          align="center"
                          width="140"
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
                Tables:{
                  title:'',
                  total:'',
                  data:[],
                },
                form:{
                    adressList:[],
                    qudaoList:[],
                    model_adress:'',
                    zdlx:'',
                    model_qudao:'',
                    date:'',
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
            // this.form.date = date.getFullYear()+'-'+Month+'-'+date.getDate();
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
              var evt = new Object();
              evt.graphic = new Object();
              evt.graphic.attributes = row;
              evt.graphic.attributes.itype = "zhafashuiqing";
              evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
              evt.graphic.attributes.rowinfo.tableType = {
                zfsq: "dayTable"
              };
              var v = new Object;
              v.itype = "zhafashuiqing";
              console.log("evt",evt);
              this.$App.showDrawer(evt, v);
            },
            err(){
                this.$Message.warning('该功能还在开发中...');
            },
            timechange(date){
                console.log(date);
                this.form.date = date;
                this.Reload();
            },
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&STNM=like,'+this.form.searchmsg;
              }else{
                this.searchs = '';
              }
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
            TYPEsearch(){
              console.log(this.form.zdlx);
              this.Reload();
            },
            Reload(){
                this.loading = true;
                if (this.form.model_adress.length == 0) {
                  this.form.xzqh = '';
                }
                if (this.form.model_adress.length == 1) {
                  var str1 = this.form.model_adress[0];
                  str1 = str1.substring(0,6);
                  this.form.xzqh = 'like,'+str1;
                }
                if (this.form.model_adress.length == 2) {
                  var str2 = this.form.model_adress[1];
                  str2 = str2.substring(0,9);
                  this.form.xzqh = 'like,'+str2;
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
                this.axios.get('/guanqu/table/ST_G_RIVER?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{TM:this.form.date,ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,CTYPE:this.form.zdlx,_orderby:this.form.field}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    if(res.data.total == 0){
                      // this.axios.get('/guanqu/table/ST_RSVR_R1?_page=1&_page_size=99999').then((res)=>{
                      //   this.nodata = res.data.rows;
                      //   this.list_input.total = res.data.total;
                      //   for (var i = 0; i < this.nodata.length; i++) {
                      //     this.nodata[i].CTYPE = '';
                      //   }
                      //   this.Tables.data = this.nodata;
                      //   this.data = this.nodata;
                      // });
                    }else{
                      this.data = res.data.rows;
                      this.list_input.total = res.data.total;
                      this.Tables.title = this.data[0].TM;
                      for (var i = 0;i<this.data.length ; i++) {
                          this.data[i].DA_UPZ = this.Z_Filter(this.data[i].DA_UPZ);
                          this.data[i].DA_DWZ = this.Z_Filter(this.data[i].DA_DWZ);
                          this.data[i].DA_Q = this.Z_Filter(this.data[i].DA_Q, 3);
                          this.data[i].DWQ = this.Z_Filter(this.data[i].DWQ, 3);
                          if (this.data[i].CTYPE == '1') {
                            this.data[i].CTYPE = '闸门';
                          }
                          if (this.data[i].CTYPE == '2') {
                            this.data[i].CTYPE = '阀门';
                          }

                      }
                    }
                });
                this.axios.get('/guanqu/table/ST_G_RIVER').then((res)=>{

                    });
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
