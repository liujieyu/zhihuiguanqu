<template>
  <div>
	<Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col>
          <Input search enter-button suffix="ios-search" placeholder="请输入站名：" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
        </Col>
        <Col>
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportToExcel">导出</Button>
        </col>
      </Row>
      <Row class="fgline"></Row>
      <el-table
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
          width="65"
          fixed="left">
        </el-table-column>
        <el-table-column
           prop="STNM"
           label="站名"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="150">
        </el-table-column>
        <el-table-column
           prop="XHWL"
           label="校核洪水位"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="120">
        </el-table-column>
        <el-table-column
           prop="BZWL"
           label="保证水位"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="120">
        </el-table-column>
        <el-table-column
           prop="AWL"
           label="警戒水位"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="120">
        </el-table-column>
        <el-table-column
           prop="SJWL"
           label="设计洪水位"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="120">
        </el-table-column>
        <el-table-column
           prop="JYWL"
           label="经验水位"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="120">
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
            show-elevator>
          </Page>
        </div>
      </div>
    </Content>
  </div>
</template>

<script type="text/javascript">
  import FilterMethods from "@/assets/commonJS/FilterMethods";
  import GetDataMethods from "@/assets/commonJS/GetDataMethods";
  import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
  export default 
  {
    data()
    {
      return{
        loading:false,
        theight:window.innerHeight-316,
        tabledata:[], 
        form:
        {
          searchmsg:'',
          orderby:'STCD',
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
    mounted()
    {
      this.Reload();
    },
    methods:{
      Reload()
    {
      this.loading = true;
      var _currentPage = this.list_input.current;
      var _pageSizes = this.list_input.pagesize;
      var _bgincount=(_currentPage - 1) * _pageSizes+1;
      var _endcount=_currentPage * _pageSizes;
      //调用后台函数，传递参数
      this.axios.get('/alarm/getriveralarm',{params:{begincount:_bgincount,endcount:_endcount,stnm:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.loading = false;
                    this.tabledata = res.data.rows;
                    this.list_input.total = res.data.total;
                });
    },
      exportToExcel() {
                var params='&stnm='+this.form.searchmsg+'&begincount=1&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence;
              window.location.href='/excel/exportriveralarm?'+params;
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
    search(){
      this.list_input.current=1;
      this.Reload();
    },
    // 处理页码切换
    CurrentChange(index) 
    {
      this.list_input.current = index;
      this.Reload();
    },
    // 处理每页显示条数切换
    PagesizeChange(pagesize) 
    {
      this.list_input.pagesize = pagesize;
      this.list_input.current=1;
      this.Reload();
    },
    }
  }
</script>