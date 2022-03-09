<template>
  <div>
    <Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col align="left" fixed="left">
          水闸类型：
          <Select v-model="form.sltp" placeholder="请选择" style="width:100px;" clearable @on-change="search">
            <Option v-for="item in metype" :key="item.value" :value="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col>
          <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;" @on-search="search" v-model="form.searchmsg" />
        </col>
        <Col> 
          <Button type="primary" style="width: auto;" @click="exportData">导出</Button>
        </Col>
        <!--
        <Col>
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">详细信息</Button>
        </col>
        -->
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
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="水闸类型"
          prop="SLTPNAME"
          align="center"
          min-width="100"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="水闸宽度"
          prop="GTHLNTWD"
          align="center"
          min-width="80"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="最大开度"
          prop="GATE_HI"
          align="center"
          min-width="100"
          sortable="custom">
        </el-table-column>
        <el-table-column label="闸前" align="center">
          <el-table-column
            label="最大水深"
            prop="Z_MAX_F"
            align="center"
            min-width="100"
            sortable="custom">
          </el-table-column>
          <el-table-column
            label="最大流量"
            prop="Q_MAX_F"
            align="center"
            min-width="100"
            sortable="custom">
          </el-table-column>
        </el-table-column>
        <el-table-column label="闸后" align="center">
          <el-table-column
            label="最大水深"
            prop="Z_MAX_B"
            align="center"
            min-width="100"
            sortable="custom">
          </el-table-column>
          <el-table-column
            label="最大流量"
            prop="Q_MAX_B"
            align="center"
            min-width="100"
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
  import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
  export default 
  {
    data()
    {
      return{
        loading:false,
        theight:window.innerHeight-316,
        metype:[],
        tabledata:[],
        form:{
          searchmsg:'',
          sltp:'',
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
    // 引入过滤方法到此组件
    mixins: [FilterMethods,GetDataMethods,WarmDataConfig],
    components: {
    },
    mounted(){
      //水闸类型
      this.Get_WrpFieldinfo('ST_Gate_Station','SLTP',data => {
          this.metype = data;
      });
      this.Reload();
    },
    methods:{
      Reload(){
        this.loading = true;
        var _currentPage = this.list_input.current;
        var _pageSizes = this.list_input.pagesize;
        var _bgincount=(_currentPage - 1) * _pageSizes+1;
        var _endcount=_currentPage * _pageSizes;
        this.axios.get('/ldparamter/gatelist',{params:{begincount:_bgincount,endcount:_endcount,sltp:this.form.sltp,stnm:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.loading = false;
                    this.tabledata = res.data.rows;
                    this.list_input.total = res.data.total;
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
      var params='sltp='+this.form.sltp+'&stnm='+this.form.searchmsg+'&begincount=1&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence;
      window.location.href='/excel/exportlock?'+params;
    },
    },
  }
</script>