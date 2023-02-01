<template>
    <div>
        <Content :style="{padding: '12px 24px 24px 24px', background: '#fff'}">
                    <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
                        <Col>
                        日期:
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
                            <Button type="primary" style="width: auto; margin-right: 10px" @click="err">导出</Button>
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
                        单位：库水位 m，流量m³/s，蓄水量 万m³</Col>
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
                    <!-- <Table border :columns="columns1" :data="data" :loading="loading" height="600"></Table> -->
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
                    gsdw:'',
                    skdj:'',
                    model_qudao:'',
                    date:[],
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                    orderby:'stnm',
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
                title: "水势",
                key: "CV",
                width: 80,
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
                key: "DW",
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
            this.getTableData_WRP_AD_B(data => {
                  //this.form.adressList = data;
              this.form.adressList = data[0].children;
            });
                // 获取输排水渠道数据,然后设置渠道选择框选项
                // this.getTableData_WRP_IrrBTCanalSystem(data => {
                //   this.form.qudaoList = data;
                // });
            this.Reload();
        },
         // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        methods:{
            sort_change(item){
              var order=item.order;
                if(order==null){
                    return;
                }
                var key= item.prop;
                switch (order) {
                    case "normal":
                        this.form.orderby = null;
                        brak;
                    case "ascending": // 升序
                        this.form.orderby = `${key}`;
                        break;
                    case "descending": // 降序
                        this.form.orderby = `${key} desc`;
                        break;
                }
                this.list_input.current=1;
                this.Reload();
            },
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
            search(){
                this.list_input.current=1;
                this.Reload();
            },
            timechange(){
              this.list_input.current=1;
              this.Reload();
            },
            XZQHsearch(){
              this.list_input.current=1;
              this.Reload();
            },
            QDsearch(){
              this.list_input.current=1;
              this.Reload();
            },
            STGRsearch(){
              this.list_input.current=1;
              this.Reload();
            },
            LEVELsearch(){
              this.list_input.current=1;
              this.Reload();
            },
            Reload(){
                console.log(this.form.gsdw);
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
                var body={
                  STNM:this.form.searchmsg,
                  TM:this.form.date,
                  ADDVCD:this.form.xzqh,
                  Canal_Code:this.form.qd,
                  STGR:this.form.gsdw,
                  LEVEL:this.form.skdj,
                  _page_size:this.list_input.pagesize,
                  _page:this.list_input.current,
                  _orderby:this.form.orderby
                }
                this.axios.get('/guanqu/shuikushuiqing/lishi_ribiao',{params:body}).then((res)=>{
                   this.loading = false;                   
                      this.list_input.total = res.data.total;
                      this.Tables.total = res.data.total;
                    var aList = res.data.list;
                    for (var i = 0;i< aList.length ; i++) {
                        aList[i].index=i + 1 + (this.list_input.pagesize*(this.list_input.current-1));
                        aList[i].RZ = this.Z_Filter(aList[i].RZ);
                        aList[i].BLRZ = this.Z_Filter(aList[i].BLRZ);
                        aList[i].INQ = this.Z_Filter(aList[i].INQ,3);
                        aList[i].MW = this.Z_Filter(aList[i].MW,3);
                        aList[i].OTQ = this.Z_Filter(aList[i].OTQ, 3);
                        aList[i].Max_RZ = this.Z_Filter(aList[i].Max_RZ);
                        aList[i].Min_RZ = this.Z_Filter(aList[i].Min_RZ);
                        aList[i].FWL = this.Z_Filter(aList[i].FWL);
                        aList[i].FWL79 = this.Z_Filter(aList[i].FWL79);
                        aList[i].Max_TM = this.dateFilter(aList[i].Max_TM);
                        aList[i].Min_TM = this.dateFilter(aList[i].Min_TM);
                    }
                    this.data = aList;
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
              this.list_input.current=1;
              this.Reload();
            },
        },
    }
</script>

<style type="text/css">

</style>
