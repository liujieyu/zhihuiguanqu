<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol">
                        <Col>
                        日期：
                        <el-date-picker
                        v-model="form.date"
                        type="daterange"
                        format="yyyy年MM月dd日"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        size="small"
                        :clearable="false"
                        @change="timechange"
                        style="width:350px;"
                        >
                        </el-date-picker>
                        </Col>    
                        <Col>
                            审核状态:
                            <Select v-model="form.shzt" @on-change="TYPEsearch" style="width:120px;margin-left: 5px;margin-right: 20px;" clearable>
                                <Option v-for="item in shztlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>

                        <Col>
                        <!-- 测量人员模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入测量人员姓名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>

                        <Col> 
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportData">导出</Button>
                        </Col>
                        <Col> 
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="importData">上传</Button>
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
                          prop="TMSTR"
                          label="上传日期"
                          align="center"
                          fixed="left"
                          sortable="custom"
                          min-width="100">
                        </el-table-column>
                        <el-table-column
                          prop="UP_MAN"
                          label="上传人"
                          align="center"
                          sortable="custom"
                          min-width="100">
                        </el-table-column>
                        <el-table-column
                          prop="FILE_NAME"
                          label="文件名称"
                          align="center"
                          sortable="custom"
                          min-width="180"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ME_TMSTR"
                          label="测量日期"
                          align="center"
                          sortable="custom"
                          min-width="100"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ME_MAN"
                          label="测量人"
                          align="center"
                          show-overflow-tooltip="true" 
                          sortable="custom"
                          min-width="100"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="RESULT"
                          label="审核状态"
                          align="center"
                          sortable="custom"
                          min-width="100"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="AUDI_MAN"
                          label="审核人"
                          sortable="custom"
                          align="center"
                          min-width="100"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADNM"
                          label="操作"
                          align="center"
                          min-width="90"
                          >
                        <template slot-scope="scope">
                                <el-button @click="updateClick(scope.row)" type="primary" size="small" v-if="scope.row.AUDINTING==1">审核</el-button>
                        </template>
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
                theight:window.innerWidth>=1340?window.innerHeight-316:window.innerHeight-280,
                shztlist:[{value:1,label:'未审核'},{value:2,label:'审核通过'},{value:3,label:'作废'}],
                form:{
                    shzt:'',
                    date:[],   
                    searchmsg:'',
                    orderby:'TMSTR',
                    sequence:'desc',
                },
                date:'',
                data:[],
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
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
            this.form.date=[start,end];
            this.Reload();        
        },
        methods:{
            timechange(date){
                this.form.date = date;
                this.Reload();
            },
            Reload(){
                this.loading = true;
                var _currentPage = this.list_input.current;
                var _pageSizes = this.list_input.pagesize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;  
                
                var timecon=this.datearrayFilter(this.form.date);
                
                this.axios.get('/strealmanage/getmefile',{params:{begintime:timecon[0],endtime:timecon[1],begincount:_bgincount,endcount:_endcount,audinting:this.form.shzt,meMan:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
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
              if(column.label=="操作"){
                return;
              }
              var detailobj=new Object();
              detailobj=row;
              detailobj.title="测量数据详细信息";
              detailobj.itype="medatadetail";
              detailobj.audin=false;
              this.$emit('showdailog', detailobj);
              
            },
            updateClick(row){
              var detailobj=new Object();
              detailobj=row;
              detailobj.title="测量数据信息审核";
              detailobj.itype="medatadetail";
              detailobj.audin=true;
              this.$emit('showdailog', detailobj);
            },
            exportData(){
                var timecon=this.datearrayFilter(this.form.date);
                var params='begintime='+timecon[0]+'&endtime='+timecon[1]+'&begincount=0&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence+'&meMan='+this.form.searchmsg+'&audinting='+this.form.shzt;
                window.location.href='/excel/exportmefile?'+params;
            },
            importData(){
              this.$emit('showupload');
            },
        },
    }
</script>