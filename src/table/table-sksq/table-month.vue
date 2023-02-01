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
                            <Select v-model="form.gsdw" style="width:120px;margin-left: 5px;" @on-change="STGRsearch" clearable placeholder="等级">
                                <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Select v-model="form.skdj" style="width:120px;margin-left: 5px;" @on-change="LEVELsearch" clearable placeholder="水库类型">
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
                        v-for="(item,index) in tablecolumns"
                        :prop="item.key"
                        :align="item.align"
                        :label="item.title"
                        :min-width="item.width"
                        :fixed="item.fixed"
                        :sortable="item.sortable"
                        ></el-table-column>
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
                    value:'2',
                    label:'小(1)型'
                },
                {
                    value:'1',
                    label:'小(2)型'
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
                // 表头设置
                tablecolumns: [
                  {
                title: "序号",
                key: "index",
                width: 55,
                align: "center",
                fixed: "left"
              },
              {
                title: "站点名称",
                key: "STNM",
                width: 110,
                align: "center",
                sortable: "custom",
                fixed: "left"
              },
              {
                title: "库水位",
                key: "RZ",
                width: 90,
                align: "center",
                sortable: "custom"
              },
              {
                title: "入库流量",
                key: "INQ",
                width: 110,
                align: "center",
                sortable: "custom"
              },
              {
                title: "出库流量",
                key: "OTQ",
                width: 110,
                align: "center",
                sortable: "custom"
              },
              {
                title: "蓄水量",
                key: "MW",
                width: 90,
                align: "center",
                sortable: "custom"
              },
              {
                title: "汛限水位4-6月",
                key: "FWL",
                width: 140,
                align: "center",
                sortable: "custom"
              },
              {
                title: "汛限水位7-9月",
                key: "FWL79",
                width: 140,
                align: "center",
                sortable: "custom"
              },
              {
                title: "最高水位",
                key: "Max_RZ",
                width: 110,
                align: "center",
                sortable: "custom"
              },
              {
                title: "最高水位时间",
                key: "Max_TM",
                width: 130,
                align: "center",
                sortable: "custom"
              },
              {
                title: "最低水位",
                key: "Min_RZ",
                width: 110,
                align: "center",
                sortable: "custom"
              },
              {
                title: "最低水位时间",
                key: "Min_TM",
                width: 130,
                align: "center",
                sortable: "custom"
              },
              {
                title: "水库类型",
                key: "LEVEL",
                width: 110,
                align: "center",
                sortable: "custom"
              },
              {
                title: "等级",
                key: "STGR",
                width: 110,
                align: "center",
                sortable: "custom"
              },
              {
                title: "所属行政区划",
                key: "AD_NM",
                width: 150,
                align: "center",
                sortable: "custom"
              },
                ],
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
              this.list_input.current = 1;
                this.Reload();
            },
            timechange() {
                console.log(this.form.date);
                let time = this.form.date.split('-');
                this.form.YE = time[0];
                this.form.MON = time[1];
                this.list_input.current = 1;
                this.Reload();
            },
            XZQHsearch(){
              this.list_input.current = 1;
              this.Reload();
            },
            QDsearch(){
              this.list_input.current = 1;
              this.Reload();
            },
            STGRsearch(){
              this.list_input.current = 1;
              this.Reload();
            },
            LEVELsearch(){
              this.list_input.current = 1;
              this.Reload();
            },
            Reload(){
                this.loading = true;
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
                this.axios.get('/guanqu/shuikushuiqing/lishi_yuebiao',{params:{STNM:this.form.searchmsg,YR:this.form.YE,MON:this.form.MON,ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,STGR:this.form.gsdw,LEVEL:this.form.skdj,_page_size:this.list_input.pagesize,_page:this.list_input.current,_orderby:this.form.field}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.list_input.total = res.data.total;
                    this.Tables.title = this.data[0].YE+'-'+this.data[0].MON;
                    for (var i = 0;i<this.data.length ; i++) {
                        this.data[i].index=i + 1 + (this.list_input.pagesize*(this.list_input.current-1));
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
              this.list_input.current = 1;
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
