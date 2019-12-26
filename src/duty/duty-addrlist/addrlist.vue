<template>
  <div>
    <Content :style="{padding: '24px', background: '#fff'}">
      <Row type="flex" :gutter="16" align="left">
        <Col align="left" fixed="left">
          人员类型：
          <el-select v-model="value" size="small" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </Col>
        <Col align="left" fixed="left">
          年份：
          <el-select v-model="NF" size="small" placeholder="请选择">
            <el-option
              v-for="item in years"
              :key="item.NF"
              :label="item.XS"
              :value="item.NF">
            </el-option>
          </el-select>
        </Col>
        <Col>
        <!--姓名模糊查询 -->
          <Input search enter-button suffix="ios-search" placeholder="请输入姓名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
        </Col>
        <Col> 
           <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportToExcel">导出</Button>
        </Col>  
      </Row> 
      <Row class="fgline"></Row>
      <el-table
        :data="tabledata"
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
          fixed="left">
        </el-table-column>
        <el-table-column
          prop="NM"
          label="姓名"
          align="center"
          fixed="left"
          sortable="custom"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="UNIT"
          label="部门"
          align="center"
          sortable="custom"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="POSITION"
          label="职务"
          align="center"
          sortable="custom"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="OPHONE"
          label="办公电话"
          align="center"
          sortable="custom"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="MOBILE"
          label="手机号码"
          align="center"
          sortable="custom"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="YR"
          label="年份"
          align="center"
          sortable="custom"
          min-width="80">
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
export default {
  data()
  {
    return{
      loading:false,
      options:[{
        value:'1',
        label:'主管领导',
      },
      {
        value:'2',
        label:'值班领导', 
      },
      {
        value:'3',
        label:'值班人员', 
      }],
      value:'',
      
      years:[ 
      {
        XS:'2017',
        NF:'2017',
      },{
        XS:'2018',
        NF:'2018',
      },{
        XS:'2019',
        NF:'2019',
      },],
      
     
      tabledata:[{
        ROWID:'1',
        NM:'张晓',
        UNIT:'乌恰县水利局',
        POSITION:'党组书记、副局长',
        OPHONE:'',
        MOBILE:'18997696458',
        YR:'2019',
      },
      {
        ROWID:'2',
        NM:'马国成',
        UNIT:'乌恰县水利局',
        POSITION:'副局长',
        OPHONE:'',
        MOBILE:'15700991168',
        YR:'2019',
      },
      {
        ROWID:'3',
        NM:'沈飞',
        UNIT:'康苏水库工程管理处',
        POSITION:'法人代表',
        OPHONE:'',
        MOBILE:'18709083988',
        YR:'2019',
      },
      ],
      searchmsg:'',
      theight:window.innerWidth>=970?window.innerHeight-236:window.innerHeight-280,
      list_input:{
        total:100,
        pagesize:50,
        pagesizeopts:[20,50,75,100,200],
        current:1,
      },
    }
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods,GetDataMethods],

  methods:{
    Reload()
    {
      var _currentPage = this.list_input.current;
      var _pageSizes = this.list_input.pagesize;
      var _bgincount=(_currentPage - 1) * _pageSizes+1;
      var _endcount=_currentPage * _pageSizes;
      //调用后台函数，传递参数
      //this.axios.get('',{params:{options,searchmsg,years}}).then((res)=>{
        //this.loading=false;
       // this.tabledata=res.tabledata.rows;
       // this.list_input.total=res.tabledata.total;
     // });
      //this.axios.get('/table_war_exploded/alarm/sitealarm',{params:{begintime:timecon[0],endtime:timecon[1],begincount:_bgincount,endcount:_endcount,adcd:this.form.xzqh,alarmlevel:this.form.yjdj,sitename:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                     // this.loading = false;
                     // this.data = res.data.rows;
                     // this.list_input.total = res.data.total;
                   // });
      
      
    },
    err()
    {
      this.$Message.warning('页面功能错误，请检查查询条件...');
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
    
    search()
    {
      this.Reload(); 
    },
    exportToExcel() {
                window.location.href='/'+this.$WarmTable+'/excel/exportaddr';
      },
  }
}
</script>