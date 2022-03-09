<template>
  <div>
    <Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
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
          label=""
          prop="ROWID"
          align="center"
          width="55"
          fixed="left">
        </el-table-column>
        <el-table-column
          label="型号"
          prop="MODEL"
          align="center"
          min-width="75"
          fixed="left"
          sortable="custom">
        </el-table-column>
        <el-table-column label="水深范围(m)" align="center"> 
          <el-table-column
            label="最小"
            prop="Z_MIN"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="最大"
            prop="Z_MAX"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
        </el-table-column>
        <el-table-column label="测流范围(m³/s)" align="center">
          <el-table-column
            label="最小"
            prop="Q_MIN"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="最大"
            prop="Q_MAX"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
        </el-table-column>
        <el-table-column
          label="规格尺寸(m)"
          prop="SIZE"
          align="center"
          min-width="120"
          sortable="custom">
        </el-table-column>
        <el-table-column label="收缩部" align="center">
          <el-table-column
            label="宽度"
            prop="B1"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="长度"
            prop="L1"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="高度"
            prop="LA"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column>
        </el-table-column>
        <el-table-column label="喉部" align="center">
          <el-table-column
            label="宽度"
            prop="B"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="长度"
            prop="L"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="高度"
            prop="N"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column>
        </el-table-column>
        <el-table-column label="扩散段" align="center">
          <el-table-column
            label="宽度"
            prop="B2"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="长度"
            prop="L2"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="高度"
            prop="K"
            align="center"
            min-width="75"
            sortable="custom">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="淹没度(%)"
          prop="YMD"
          align="center"
          min-width="110"
          sortable="custom">
        </el-table-column>
        <el-table-column label="流量系数" align="center">
          <el-table-column
            label="系数1"
            prop="C"
            align="center"
            min-width="80"
            sortable="custom">
          </el-table-column> 
          <el-table-column
            label="系数2"
            prop="N1"
            align="center"
            min-width="80"
            sortable="custom">
          </el-table-column> 
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
        form:{
          searchmsg:'',
          orderby:'model',
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
      this.Reload();
    },
    methods:{
      Reload(){
        this.loading = true;
        var _currentPage = this.list_input.current;
        var _pageSizes = this.list_input.pagesize;
        var _bgincount=(_currentPage - 1) * _pageSizes+1;
        var _endcount=_currentPage * _pageSizes;
        this.axios.get('/ldparamter/Parshalllist',{params:{begincount:_bgincount,endcount:_endcount,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.loading = false;
                    this.tabledata = res.data.rows;
                    this.list_input.total = res.data.total;
                    setTimeout(()=> {
                            this.$refs.refTable.doLayout();
                        },100);
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
      var params='begincount=1&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence;
      window.location.href='/excel/exportparshall?'+params;
    },
    },
  }
</script>

