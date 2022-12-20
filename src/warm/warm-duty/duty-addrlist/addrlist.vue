<template>
  <div>
    <Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col align="left" fixed="left">
          年份：
          <Select v-model="form.year" @on-change="search" style="width:120px;margin-left: 5px;">
           <Option v-for="item in years" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col align="left" fixed="left">
          值班类型：
          <Select v-model="form.dutytype" @on-change="search" style="width:120px;margin-left: 5px;" clearable>
           <Option v-for="item in dutytypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col>
        <!--姓名模糊查询-->
          <Input search enter-button suffix="ios-search" placeholder="请输入姓名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
        </Col>
        <Col> 
           <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportData">导出</Button>
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
          min-width="120">
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
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="OPHONE"
          label="办公电话"
          align="center"
          sortable="custom"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="MOBILE"
          label="手机号码"
          align="center"
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
export default {
  data()
  {
    return{
      loading:false,
      theight:window.innerHeight-305,
      years:[],
      dutytypes:[],
      tabledata:[],
      form:{
        year:'',
        searchmsg:'',
        dutytype:0,
        orderby:'WZPX',
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
  mounted(){
           //人员类型
            this.Get_WrpFieldinfo('HHPDI_Duty_Plan','TYPE',data => {
                this.dutytypes = data;
            });
            //年份条件
            this.axios.get('/alarm/getdutyyears')
                    .then(res => {
                        this.years = res.data;
                        this.form.year=this.years[0].value;
                        this.Reload();
                    });                 
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
      this.axios.get('/alarm/getdutyinfo',{params:{begincount:_bgincount,endcount:_endcount,year:this.form.year,sign:this.form.dutytype,addtion1:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.loading = false;
                    this.tabledata = res.data.rows;
                    this.list_input.total = res.data.total;
                });
    },
    exportData(){
      var params='begincount=0&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence+'&year='+this.form.year+'&sign='+this.form.dutytype+'&addtion1='+this.form.searchmsg;
      window.location.href='/excel/exportdutyinfo?'+params;
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
    search()
    {
      this.list_input.current=1;
      this.Reload(); 
    },
  }
}
</script>