<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol">
                        <Col>
                        时间：
                        <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        format="yyyy-MM-dd HH"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"
                        :clearable="false"
                        @change="timechange"
                        style="width:380px;"
                        >
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
                            预警等级:
                            <Select v-model="form.yjdj" @on-change="TYPEsearch" style="width:120px;margin-left: 5px;margin-right: 20px;" clearable>
                                <Option v-for="item in yjdjlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>

                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>

                        <Col> 
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportData">导出</Button>
                        </Col>

                    </Row>
                    <Row class="fgline"></Row>
                    <el-table
                        :data="data"
                        border
                        :height="theight"
                        v-loading="loading"
                        style="width: 100%"
                        @sort-change="sort_change"
                        >
                        <el-table-column
                          label=" "
                          prop="ROWID"
                          align="center"
                          width="65"
                          fixed="left"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="STNM"
                          label="站名"
                          align="center"
                          fixed="left"
                          sortable="custom"
                          min-width="120">
                        </el-table-column>
                        <el-table-column
                          prop="TYPENAME"
                          label="监测类型"
                          align="center"
                          sortable="custom"
                          min-width="120">
                        </el-table-column>
                        <el-table-column
                          prop="TMSTR"
                          label="预警时间"
                          align="center"
                          sortable="custom"
                          min-width="160"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ALARMNAME"
                          label="预警等级"
                          align="center"
                          sortable="custom"
                          min-width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="CONTENTS"
                          label="预警内容"
                          align="center"
                          show-overflow-tooltip="true" 
                          sortable="custom"
                          min-width="300"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="MV"
                          label="测量值"
                          align="center"
                          sortable="custom"
                          min-width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="AlARMV"
                          label="预警指标"
                          sortable="custom"
                          align="center"
                          min-width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADNM"
                          label="站址"
                          align="center"
                          sortable="custom"
                          min-width="240"
                          >
                        </el-table-column>
                      </el-table>
                    <div style="margin: 10px 0px 0px 10px;overflow: hidden">
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
        import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
        import App from "@/App.vue";
	export default {
        data(){
            return{
                loading:false,
                pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
                yjdjlist:[],
                form:{
                    adressList:[], 
                    model_adress:'',
                    yjdj:'',
                    model_qudao:'',
                    date:[],   
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                    orderby:'TMSTR',
                    sequence:'desc',
                },
                date:'',
                data:[],
                theight:window.innerWidth>=1340?window.innerHeight-304:window.innerHeight-358,
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
            }
        },
                // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods,WarmDataConfig],
        components: {
        },
        mounted(){
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.form.date=[start,end];
            //行政区划
            this.getTableData_WRP_AD_B(data => {
                this.form.adressList = data[0].children;
            });
            //预警等级
            this.Get_WrpFieldinfo('ST_AlarmInfo','Alarm',data => {
                this.yjdjlist = data;
            });
            this.Reload();        
        },
        methods:{
            timechange(date){
                this.form.date = date;
                this.list_input.current=1;
                this.Reload();
            },
            Reload(){
                this.loading = true;
                if (this.form.model_adress.length == 0) {
                  this.form.xzqh = null; 
                }
                if (this.form.model_adress.length == 1) {
                  var str1 = this.form.model_adress[0];
                  str1 = str1.substring(0,9);
                  this.form.xzqh = str1; 
                }
                if (this.form.model_adress.length == 2) {
                  var str2 = this.form.model_adress[1];
                  str2 = str2.substring(0,12);
                  this.form.xzqh = str2; 
                }
                // if (this.form.model_adress.length == 3) {
                //   var str3 = this.form.model_adress[2];
                //   str3 = str3.substring(0,12);
                //   this.form.xzqh = str3; 
                // }
                var _currentPage = this.list_input.current;
                var _pageSizes = this.list_input.pagesize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;  
                
                var timecon=this.datetimeFilter(this.form.date);
                this.axios.get('/alarm/sitealarm',{params:{begintime:timecon[0],endtime:timecon[1],begincount:_bgincount,endcount:_endcount,adcd:this.form.xzqh,alarmlevel:this.form.yjdj,sitename:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.loading = false;
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                });
            },
            // 处理页码切换
            CurrentChange(index) {
              this.list_input.current = index;
              this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
              this.list_input.pagesize = pagesize;
              this.list_input.current=1;
              this.Reload();
            },
            //行政区划
            XZQHsearch(){
              this.list_input.current=1;
              this.Reload();
            },
            TYPEsearch(){
              this.list_input.current=1;
              this.Reload();
            },
            search(){
              this.list_input.current=1;
                this.Reload(); 
            },
            sort_change(item){
                if(item.order==null){
                    return;
                }
                if(item.order=="ascending"){
                    this.form.sequence="asc";
                }else{
                    this.form.sequence="desc";
                }
                this.form.orderby=item.prop;
                this.list_input.current=1;
                this.Reload();
            },
            cellclick(row, column, cell, event){
              var evt = new Object();
              evt.graphic = new Object();
              evt.graphic.attributes = row;
              evt.graphic.attributes.itype = "yujingxiangqing";
              evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row));
              var v = new Object;
              v.itype = "yujingxiangqing";
              console.log("evt",evt);
              this.$App.showDrawer(evt, v);
              // var detailobj=new Object();
              // detailobj.info=row;
              // detailobj.info.rowinfo=JSON.parse(JSON.stringify(row));
              // detailobj.info.itype="yujingxiangqing";
              // this.$emit('showdailog', detailobj);
              
            },
            exportData(){
              if (this.form.model_adress.length == 0) {
                  this.form.xzqh = null; 
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
                var timecon=this.datetimeFilter(this.form.date);
                var params='begintime='+timecon[0]+'&endtime='+timecon[1]+'&begincount=0&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence;
                if(typeof(this.form.yjdj)!='undefined' && this.form.yjdj!=null){
                  params+='&alarmlevel='+this.form.yjdj;
                }
                if(typeof(this.form.xzqh)!='undefined' && this.form.xzqh!=null){
                  params+='&adcd='+this.form.xzqh;
                }
                if(typeof(this.form.searchmsg)!='undefined' && this.form.searchmsg!=null && this.form.searchmsg!=''){
                  params+='&sitename='+this.form.searchmsg;
                } 
                window.location.href='/excel/exportsite?'+params;
            },
        },
    }
</script>