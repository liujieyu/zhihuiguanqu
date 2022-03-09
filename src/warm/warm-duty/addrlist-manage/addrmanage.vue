
<template>
  <div>
    <Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col align="left" fixed="left">
          年份：
          <Select v-model="form.year" @on-change="search" style="width:120px;margin-left: 5px;" clearable>
           <Option v-for="item in years" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col align="left" fixed="left">
          人员类型：
          <Select v-model="form.dutytype" @on-change="search" style="width:120px;margin-left: 5px;" clearable>
           <Option v-for="item in dutytypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col>
        <!--姓名模糊查询-->
          <Input search enter-button suffix="ios-search" placeholder="请输入姓名/部门/职务/电话号码" style="width: 260px;margin-left: 5px;" @on-search="search" v-model="form.searchmsg" />
        </Col>
        <Col> 
           <Button type="primary" style="width: auto;margin-left: 5px;" @click="insertAddrlist">新增</Button>
        </Col>
        <Col> 
           <Button type="primary" style="width: auto;" @click="showaddrlist">通讯录导入</Button>
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
          label="年份"
          align="center"
          width="80"
          sortable="custom"
          fixed="left">
        <template slot-scope="scope">
        {{ scope.row.YR }}年
      </template>
        </el-table-column>
        <el-table-column
          prop="NM"
          label="姓名"
          align="center"
          fixed="left"
          sortable="custom"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="TYPENAME"
          label="人员类型"
          align="center"
          sortable="custom"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="UNIT"
          label="部门"
          align="center"
          sortable="custom"
          min-width="150">
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
        <el-table-column
          prop="WZPX"
          label="排序"
          align="center"
          sortable="custom"
          min-width="80">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="150" :key="Math.random()">
            <template slot-scope="scope">
            <el-button @click="updateClick(scope.row)" type="primary" size="small">修改</el-button>
            <el-button @click="deleteClick(scope.row)" type="primary" size="small">删除</el-button>
            </template>
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
      <el-dialog
        title="通讯录导入"
        :visible.sync="modal1"
        :modal="false"
        width="400px">
        <div>
          将
          <Select v-model="form.yr" style="width:90px;">
           <Option v-for="item in years" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          通讯录导入到
          <el-date-picker
          style="width: 90px;"
          v-model="form.toyr"
          format="yyyy年"
          value-format="yyyy"
          type="year"
          size="small"
          :clearable="false"></el-date-picker>
          年通讯录
        </div>
        <span slot="footer" class="dialog-footer">
          <Button @click="modal1 = false" style="margin-right:5px;">取消</Button>
          <Button type="primary" @click="exportAddrlist">确定</Button>
        </span>
      </el-dialog>
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
      theight:window.innerHeight-316,
      years:[],
      dutytypes:[],
      tabledata:[],
      modal1:false,
      form:{
        year:0,
        yr:'',
        toyr:'',
        searchmsg:'',
        dutytype:0,
        orderby:'YR desc,WZPX',
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
            this.getyears();              
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
        if(this.form.orderby=="TYPENAME"){
          this.form.orderby="DUTYTYPE";
        }
        this.list_input.current=1;
        this.Reload();
    },
    search()
    {
      this.list_input.current=1;
      this.Reload(); 
    },
    //新增
    insertAddrlist(){
      var formobj=new Object();
      formobj.sign="add";
      formobj.itype="dutyform";
      formobj.title="新增值班通讯录";
      this.$emit('showdailog', formobj);
    },
    //修改
    updateClick(row){
      var formobj=new Object();
      formobj=row;
      formobj.sign="update";
      formobj.itype="dutyform";
      formobj.title="修改值班通讯录";
      this.$emit('showdailog', formobj);
    },
    //删除
    deleteClick(row){
      this.$confirm('是否删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get('/alarm/deldutyinfo',{params: {id:row.ID}}).then(res => {
          if(res.data=="ok"){
           this.$message({message:'删除值班通讯录成功！',type:'success'});
           this.getyears();
         }      
        });
        });
    },
    //年份条件
    getyears(){
      let currentyear=this.form.year;
      this.axios.get('/alarm/getdutyyears')
                    .then(res => {
                        this.years = res.data;
                        this.form.year=currentyear;
                        this.Reload();
                    });
    },
    showaddrlist(){
      this.modal1 = true;
      if(this.years.length>0){
        this.form.yr=this.years[0].value;
      }     
      this.form.toyr=new Date().getFullYear().toString();
    },
    //通讯录导入
    exportAddrlist(){
      if(this.years.length==0){
        return;
      }
      if(this.form.yr==this.form.toyr){
        this.$message({message:this.form.toyr+'年通讯录无须导入,请输入其他年份！',type:'info'});
      }else{
        this.axios.get('/alarm/existdata',{params: {yr:this.form.toyr}}).then(res => {
          if(parseInt(res.data)>0){
              this.$confirm(this.form.toyr+'年通讯录已存在，是否继续导入?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.addAddrlist(1);
            });
         }else{
           this.addAddrlist(0);
         }      
        });
      }
    },
    //导入通讯录
    addAddrlist(sign){
      this.axios.get('/alarm/addbyyear',{params: {yr:this.form.yr,toyr:this.form.toyr}}).then(res => {
          if(res.data=="ok"){
           this.$message({message:this.form.toyr+'年通讯录导入成功！',type:'success'});
           this.modal1=false;
           if(sign==0){
             this.getyears();
           }else{
             this.Reload();
           }
         }      
        });
    },
  },
}
</script>