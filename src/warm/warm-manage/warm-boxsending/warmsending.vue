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
                            短信类型:
                            <Select v-model="form.dxlx" @on-change="TYPEsearch" style="width:120px;margin-left: 5px;margin-right: 20px;" clearable>
                                <Option v-for="item in dxlxlist" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                        </Col>

                        <Col>
                            发送结果:
                            <Select v-model="form.fsjg" @on-change="REASULTsearch" style="width:120px;margin-left: 5px;margin-right: 20px;" clearable>
                                <Option v-for="item in fsjglist" :value="item.value" :key="item.label">{{ item.label }}</Option>
                            </Select>
                        </Col>

                        <Col> 
                            <Button type="primary" style="width: auto;" @click="exportData">导出</Button>
                        </Col>

                    </Row>
                    <Row class="fgline"></Row>
                    <el-table
                        :data="data"
                        border
                        :height="theight"
                        v-loading="loading"
                        style="width: 100%"
                        @cell-click="cellclick"
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
                          prop="APPID"
                          label="短信类型"
                          align="center"
                          fixed="left"
                          sortable="custom"
                          min-width="240">
                        </el-table-column>
                        <el-table-column
                          prop="RESULT"
                          label="发送结果"
                          align="center"
                          sortable="custom"
                          min-width="180">
                        </el-table-column>
                        <el-table-column
                          prop="SENDTIME"
                          label="发送时间"
                          align="center"
                          sortable="custom"
                          min-width="180">
                        </el-table-column>
                        <el-table-column
                          prop="RECEIVER"
                          label="接收号码"
                          align="center"
                          sortable="custom"
                          min-width="180">
                        </el-table-column>
                        <el-table-column
                          prop="CONTENT"
                          label="发送内容"
                          align="center"
                          sortable="custom"
                          show-overflow-tooltip="true" 
                          min-width="420"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADDTION1"
                          label="对象姓名"
                          align="center"
                          sortable="custom"
                          min-width="180"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADDTION2"
                          label="单位"
                          align="center"
                          sortable="custom"
                          min-width="180"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADDTION3"
                          label="职务"
                          align="center"
                          sortable="custom"
                          min-width="180"
                          >
                        </el-table-column>
                      </el-table>
                    <div style="margin:10px 10px 0px 10px;overflow: hidden">
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
                dxlxlist:[],
                fsjglist:[
                    {value:'2',label:'正在发送'},
                    {value:'3',label:'发送成功'},
                    {value:'4',label:'发送失败'},
                ],
                form:{
                    fsjg:'1',
                    dxlx:'',
                    date:[],   
                    orderby:'SENDTIME',
                    sequence:'desc',
                },
                date:'',
                data:[],
                theight:window.innerWidth>=980?window.innerHeight-316:window.innerHeight-280,
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
            }
        },
                // 引入过滤方法到此组件
        mixins: [WarmDataConfig],
        components: {
        },
        mounted(){
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.form.date=[start,end];
            //短信类型
            this.Get_SysFieldinfo('YJDXFB20190927',3,data => {
                this.dxlxlist = data;
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
                var _currentPage = this.list_input.current;
                var _pageSizes = this.list_input.pagesize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;  
                
                var timecon=this.datetimeFilter(this.form.date);
                if(this.form.fsjg==null || this.form.fsjg==''){this.form.fsjg='1';}
                this.axios.get('/alarm/boxsending',{params:{begintime:timecon[0],endtime:timecon[1],begincount:_bgincount,endcount:_endcount,appid:this.form.dxlx,sign:this.form.fsjg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
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
            TYPEsearch(){
              this.list_input.current=1;
              this.Reload();
            },
            REASULTsearch(){
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
              var stnm=row.APPID; 
              if(stnm==''){
                stnm=' ';
              }
              // evt.graphic.attributes.STNM=stnm;
              // evt.graphic.attributes.STCD=row.ID+row.TABLENAME;
              // evt.graphic.attributes.itype = "fasongduanxin";
              // evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row));
              // var v = new Object;
              // v.itype = "fasongduanxin";
              // console.log("evt",evt);
              // this.$App.showDrawer(evt, v);
              var detailobj=new Object();
              detailobj.info=row;
              detailobj.info.STCD=row.ID+row.TABLENAME;
              detailobj.info.rowinfo=JSON.parse(JSON.stringify(row));
              detailobj.info.itype="fasongduanxin";
              this.$emit('showdailog', detailobj);
              
            },
            exportData(){  
                var timecon=this.datetimeFilter(this.form.date);
                if(this.form.fsjg==null || this.form.fsjg==''){this.form.fsjg='1';}
                var params="begintime="+timecon[0]+"&endtime="+timecon[1]+"&begincount=0&endcount=99999&orderBy="+this.form.orderby+"&sequence="+this.form.sequence+"&sign="+this.form.fsjg;
                if(typeof(this.form.dxlx)!="undefined" && this.form.dxlx!=''){
                  params+="&appid="+this.form.dxlx;
                }
                window.location.href='/excel/exportsending?'+params;
            },
        },
    }
</script>