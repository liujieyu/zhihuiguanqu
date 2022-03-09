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
                            <!-- 发送号码模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入发送号码" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
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
                          prop="INSERTTIME"
                          label="接收时间"
                          align="center"
                          fixed="left"
                          sortable="custom"
                          min-width="180">
                        </el-table-column>
                        <el-table-column
                          prop="SENDER"
                          label="发送号码"
                          align="center"
                          sortable="custom"
                          min-width="240">
                        </el-table-column>
                        <el-table-column
                          prop="CONTENT"
                          label="短信内容"
                          align="center"
                          sortable="custom"
                          show-overflow-tooltip="true" 
                          min-width="450"
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
                form:{
                    searchmsg:'',
                    date:[],   
                    orderby:'INSERTTIME',
                    sequence:'desc',
                },
                date:'',
                data:[],
                theight:window.innerWidth>=850?window.innerHeight-316:window.innerHeight-280,
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
        mounted(){
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.form.date=[start,end];
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
                
                this.axios.get('/alarm/boxreceived',{params:{begintime:timecon[0],endtime:timecon[1],begincount:_bgincount,endcount:_endcount,phone:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
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
            exportData(){
                var timecon=this.datetimeFilter(this.form.date);
                var params='begintime='+timecon[0]+'&endtime='+timecon[1]+'&begincount=0&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence;
                if(typeof(this.form.searchmsg)!='undefined' && this.form.searchmsg!=null){
                  params+='&phone='+this.form.searchmsg;
                }
                window.location.href='/excel/exportreceived?'+params;
            },
        },
    }
</script>