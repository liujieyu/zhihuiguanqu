<template>
  <div>
    <Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
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
          <Input search enter-button suffix="ios-search" placeholder="姓名：" style="width: auto;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
        </Col>
        <Col> 
           <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
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
          prop="POSTION"
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

      <div style="margin-top: 10px;margin-right: 10px;overflow: hidden">
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
      theight:window.innerHeight-236,
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
      
     
      tabledata:[
      {
        ROWID:'1',
        NM:'周  辉',
        UNIT:'宁乡市经开区',
        POSITION:'党工委书记、市委书记',
        OPHONE:'',
        MOBILE:'13973110178',
        YR:'2019',
      },
      {
        ROWID:'2',
        NM:'戴中亚',
        UNIT:'宁乡市经开区',
        POSITION:'管委会主任',
        OPHONE:'',
        MOBILE:'13973109999',
        YR:'2019',
      },
      {
        ROWID:'3',
        NM:'付旭明',
        UNIT:'宁乡市经开区',
        POSITION:'市长',
        OPHONE:'',
        MOBILE:'13607318218',
        YR:'2019',
      },
      {
        ROWID:'4',
        NM:'刘  亮',
        UNIT:'宁乡市委',
        POSITION:'副书记',
        OPHONE:'',
        MOBILE:'13517499889',
        YR:'2019',
      },
      {
        ROWID:'5',
        NM:'田  剑',
        UNIT:'武装部',
        POSITION:'市委常委、武装部长',
        OPHONE:'',
        MOBILE:'13017290341',
        YR:'2019',
      },
      {
        ROWID:'6',
        NM:'陈德奇',
        UNIT:'宁乡市政府',
        POSITION:'副市长',
        OPHONE:'',
        MOBILE:'13574195555',
        YR:'2019',
      },
      {
        ROWID:'7',
        NM:'陶文良',
        UNIT:'水务局',
        POSITION:'局长、副指挥长',
        OPHONE:'87859001',
        MOBILE:'13647312345',
        YR:'2019',
      },
      {
        ROWID:'8',
        NM:'谢建新',
        UNIT:'市防汛办',
        POSITION:'防办主任',
        OPHONE:'',
        MOBILE:'13469055288',
        YR:'2019',
      },
      {
        ROWID:'9',
        NM:'欧凯红',
        UNIT:'市防汛办',
        POSITION:'防办副主任',
        OPHONE:'',
        MOBILE:'13507436371',
        YR:'2019',
      },
      {
        ROWID:'10',
        NM:'廖金鹏',
        UNIT:'黄材水库管理局',
        POSITION:'局长',
        OPHONE:'',
        MOBILE:'13787110908',
        YR:'2019',
      },
      {
        ROWID:'11',
        NM:'袁德强',
        UNIT:'黄材水库管理局',
        POSITION:'党委书记',
        OPHONE:'',
        MOBILE:'13974891678',
        YR:'2019',
      },
      {
        ROWID:'12',
        NM:'王赛楠',
        UNIT:'黄材水库管理局',
        POSITION:'纪委书记',
        OPHONE:'',
        MOBILE:'13874846878',
        YR:'2019',
      },
      {
        ROWID:'13',
        NM:'姜念东',
        UNIT:'黄材水库管理局',
        POSITION:'副局长',
        OPHONE:'',
        MOBILE:'13974980917',
        YR:'2019',
      },
      {
        ROWID:'14',
        NM:'易福乔',
        UNIT:'黄材水库管理局',
        POSITION:'副局长',
        OPHONE:'',
        MOBILE:'13517409979',
        YR:'2019',
      },
      {
        ROWID:'15',
        NM:'黎 明',
        UNIT:'黄材水库管理局',
        POSITION:'副局长',
        OPHONE:'',
        MOBILE:'15873100101',
        YR:'2019',
      },
      {
        ROWID:'16',
        NM:'邹庆林',
        UNIT:'黄材水库管理局',
        POSITION:'副局长',
        OPHONE:'',
        MOBILE:'18273196277',
        YR:'2019',
      },
      {
        ROWID:'17',
        NM:'李尚彪',
        UNIT:'大坝管理所',
        POSITION:'所长',
        OPHONE:'',
        MOBILE:'13469077308',
        YR:'2019',
      },
      {
        ROWID:'18',
        NM:'邓学文',
        UNIT:'煤炭坝灌区管理所',
        POSITION:'所长',
        OPHONE:'',
        MOBILE:'15973174718',
        YR:'2019',
      },
      {
        ROWID:'19',
        NM:'郭伟军',
        UNIT:'电站',
        POSITION:'站长',
        OPHONE:'',
        MOBILE:'13874824041',
        YR:'2019',
      },
      {
        ROWID:'20',
        NM:'喻振军',
        UNIT:'横双灌区管理所',
        POSITION:'所长',
        OPHONE:'',
        MOBILE:'13787075259',
        YR:'2019',
      },
      {
        ROWID:'21',
        NM:'陈逸民',
        UNIT:'沙河灌区管理所',
        POSITION:'所长',
        OPHONE:'',
        MOBILE:'15973174918',
        YR:'2019',
      },
      {
        ROWID:'22',
        NM:'谭  爽',
        UNIT:'田坪水库管理所',
        POSITION:'所长',
        OPHONE:'',
        MOBILE:'13875886110',
        YR:'2019',
      },
      {
        ROWID:'23',
        NM:'胡志强',
        UNIT:'田坪水库管理所',
        POSITION:'支部书记',
        OPHONE:'',
        MOBILE:'15802628029',
        YR:'2019',
      },
      {
        ROWID:'24',
        NM:'曾文彬',
        UNIT:'田坪水库管理所',
        POSITION:'副所长',
        OPHONE:'',
        MOBILE:'18075185131',
        YR:'2019',
      },
      {
        ROWID:'25',
        NM:'肖美莲',
        UNIT:'田坪水库管理所',
        POSITION:'工会主席',
        OPHONE:'',
        MOBILE:'15116184800',
        YR:'2019',
      },
      {
        ROWID:'26',
        NM:'戴  兵',
        UNIT:'田坪水库管理所',
        POSITION:'办公室主任',
        OPHONE:'',
        MOBILE:'13787790803',
        YR:'2019',
      },
      ],
      searchmsg:'',
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
  }
}
</script>