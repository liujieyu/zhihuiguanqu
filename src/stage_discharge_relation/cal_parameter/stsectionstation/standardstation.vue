<template>
  <div>
    <Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col>
         年份:
         <Select v-model="form.year" @on-change="YEARsearch" style="width:100px;">
            <Option v-for="item in yearlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
         </Select>
        </Col>
        <Col>
          <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;" @on-search="search" v-model="form.searchmsg" />
        </Col>
        <Col> 
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportData">导出</Button>
        </Col>
      </Row>
      <Row class="fgline"></Row>
      <el-table
        ref="refTable"
        :data="tabledata"
        border
        :height="theight"
        v-loading="loading"
        style="width: 100%"
        @cell-click="cellclick"
        @sort-change="sort_change">
        <el-table-column
          label=" "
          prop="ROWID"
          align="center"
          width="60"
          fixed="left">
        </el-table-column>
        <el-table-column
          label="站名"
          prop="STNM"
          align="center"
          min-width="120"
          fixed="left"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="所在渠道"
          prop="CANAL_NAME"
          align="center"
          min-width="120"
          fixed="left"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="断面类型"
          prop="TYPENAME"
          align="center"
          min-width="120"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="渠底宽度"
          prop="B"
          align="center"
          min-width="100"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="边坡系数"
          prop="M"
          align="center"
          min-width="100"
          sortable="custom">          
        </el-table-column>
        <el-table-column
          label="糙率"
          prop="N"
          align="center"
          min-width="80"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="底坡"
          prop="I"
          align="center"
          min-width="80"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="最大水深(m)"
          prop="MAX_Z"
          align="center"
          min-width="120"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="最大流量(m³/s)"
          prop="MAX_Q"
          align="center"
          min-width="120"
          sortable="custom">
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
  export default 
  {
    data()
    {
      return{
        loading:false,
        theight:window.innerHeight-316,
        tabledata:[],
        yearlist:[],
        form:{
          searchmsg:'',
          year:'',
          orderby:'stcd',
          sequence:'asc',
        },
        list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
      }
    }, 
    mounted(){
      var now=new Date();
      var nowyear=now.getFullYear();
      for(var i=0;i<10;i++){
        var obj=new Object();
        obj.label=(nowyear-i)+"年";
        obj.value=nowyear-i;
        this.yearlist.push(obj);
      }
      this.form.year=2019;
      this.Reload();
    },
    methods:{
      YEARsearch(){
              this.list_input.current=1;
              this.Reload();
            },
      Reload(){
        this.loading = true;
        var _currentPage = this.list_input.current;
        var _pageSizes = this.list_input.pagesize;
        var _bgincount=(_currentPage - 1) * _pageSizes+1;
        var _endcount=_currentPage * _pageSizes;
        this.axios.get('/ldparamter/bzdmlist',{params:{begincount:_bgincount,endcount:_endcount,year:this.form.year,stnm:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.loading = false;
                    this.tabledata = res.data.rows;
                    this.list_input.total = res.data.total;
                    setTimeout(()=> {
                            this.$refs.refTable.doLayout();
                        },100);
                });
      },
      search(){
              this.list_input.current=1;
                this.Reload(); 
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
      var params='year='+this.form.year+'&stnm='+this.form.searchmsg+'&begincount=1&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence;
      window.location.href='/excel/exportstsection?'+params;
    },
   },
  }
</script>

<style type="text/css">
  .ivu-divider-horizontal, .ivu-row 
  {
    margin-bottom: 12px;
  }
  .el-table th {  background-color: #f8f8f9;color:#515a6e;} 
  .el-table td, .el-table th { padding: 3px 0;}
  .el-table .el-table__row td {padding: 6px 0;}
  .searchcon {padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:24px;background: #fff;}
  .rowtocol .ivu-col {margin-top:12px;}
</style>