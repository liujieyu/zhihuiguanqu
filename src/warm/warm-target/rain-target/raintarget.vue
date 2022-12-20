<template>
  <div>
	<Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col align="left" fixed="left">
          预警等级：
          <Select v-model="form.type" placeholder="请选择" clearable style="width:150px;" @on-change="Typesearch">
            <Option
              v-for="item in types"  :key="item.value"  :value="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col>
          <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="Typesearch" v-model="form.searchmsg" />
        </Col>
        <Col>
        <!-- 地址级联选择器 -->
          <el-cascader
            :props="{ multiple: true }"
            clearable
            filterable
            collapse-tags
            style="width:270px;"
            size="mini"
            placeholder="所属行政区划"
            :options="form.adressList"
            v-model="form.model_adress"
            @change="Typesearch"
            change-on-select
          ></el-cascader>
        </Col>
        <!--
        <Col>
        
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportToExcel">导出</Button>
          
        </Col>
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
          width="65"
          fixed>
        </el-table-column>
        <el-table-column
           prop="STLC"
           label="所属行政区划"
           align="center"
           fixed
           sortable="custom"
           min-width="150">
        </el-table-column>
        <el-table-column
           prop="STNM"
           label="站名"
           align="center"
           fixed
           sortable="custom"
           min-width="120">
        </el-table-column>
        <el-table-column 
           prop="EWLNAME"
           label="预警等级" 
           sortable="custom"
           min-width="120"
           align="center">  
        </el-table-column>
          <el-table-column
            prop="OH_P"
            label="1H降雨"
            align="center"
            sortable="custom"
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="TH_P"
            label="3H降雨"
            align="center"
            sortable="custom"
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="SH_P"
            label="6H降雨"
            align="center"
            sortable="custom"
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="TWH_P"
            label="12H降雨"
            align="center"
            sortable="custom"
            min-width="90">
          </el-table-column>
          <el-table-column
            prop="OD_P"
            label="24H降雨"
            align="center"
            sortable="custom"
            min-width="90">
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
        theight:window.innerHeight-306,
        tabledata:[],
        types:[],
        form:{
          searchmsg:'',
          type:'',
          orderby:'STCD',
          sequence:'asc',
          adressList:[],
          model_adress:'',
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
      //预警等级
      this.Get_WrpFieldinfo('ST_PP_Alarm','EWL',data => {
          this.types = data;
      });
      // 获取行政区划数据,然后设置地址选择框选项
      this.getTableData_WRP_AD_B(data => {
          this.form.adressList = data[0].children;
          this.form.model_adress=true;
      });
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
      var ADDVCD='';
      // 如果地址选择框有内容，添加行政区划过滤字段
                if (this.form.model_adress !=null && typeof(this.form.model_adress.length) != "undefined" && this.form.model_adress.length>0) {
                    var addvdds=[];
                    for(var i=0;i<this.form.model_adress.length;i++){
                        addvdds.push(`${this.$App.SUB_ADDVCD_Array_Filter(
                          this.form.model_adress[i]
                      )}`);
                    }
                    ADDVCD = addvdds.toString();                   
                }
      //调用后台函数，传递参数
      this.axios.get('/alarm/getppalarm',{params:{begincount:_bgincount,endcount:_endcount,types:this.form.type,stnm:this.form.searchmsg,orderBy:this.form.orderby,sequence:this.form.sequence,canalname:ADDVCD}}).then((res)=>{
                    this.loading = false;
                    this.tabledata = res.data.rows;
                    this.list_input.total = res.data.total;
                });
    },
      exportToExcel() {
              var params='types='+this.form.type+'&stnm='+this.form.searchmsg+'&begincount=1&endcount=99999&orderBy='+this.form.orderby+'&sequence='+this.form.sequence;
              window.location.href='/excel/exportrainalarm?'+params;
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
    Typesearch(){
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
