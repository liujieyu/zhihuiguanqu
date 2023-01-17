<template>
  <div>
	<Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col>
          <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: 190px;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
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
              @change="XZQHsearch"
              change-on-select
            ></el-cascader>
        </Col>         
        <Col>
        <Button type="primary" icon="md-add" style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
        <Button type="primary" icon="ios-trash" style="width: auto;" @click="delClick">删除</Button>
        </Col>       
      </Row>
      <Row class="fgline"></Row>
      <el-table
        :data="tabledata"
        border
        :height="theight"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sort_change">
        <el-table-column
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          label=" "
          type="index"
          align="center"
          width="55"
          fixed="left"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
           prop="stnm"
           label="站名"
           align="center"
           fixed="left"
           sortable="custom"
           min-width="100">
        </el-table-column>
        <el-table-column
           prop="rsvrtp"
           label="水库类型"
           fixed="left"
           align="center"
           sortable="custom"
           min-width="120">
        </el-table-column>
        <el-table-column
           prop="FWL"
           label="4-6月汛限水位(m)"
           align="center"
           sortable="custom"
           min-width="160">
        </el-table-column>
        <el-table-column
           prop="FWL79"
           label="7-9月汛限水位(m)"
           align="center"
           sortable="custom"
           min-width="160">
        </el-table-column>  
        <el-table-column
           prop="chfl"
           label="校核洪水位(m)"
           align="center"
           sortable="custom"
           min-width="140">
        </el-table-column>     
        <el-table-column
           prop="fldcp"
           label="防洪库容(万m³)"
           align="center"
           sortable="custom"
           min-width="145">
        </el-table-column>
        <el-table-column
           prop="stlc"
           label="所属行政区划"
           align="center"
           sortable="custom"
           min-width="150">
        </el-table-column>
        <el-table-column fixed="right" align="center" prop="oper" label="操作" width="110">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" plain size="mini">修改</el-button>
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
    </Content>
    <el-dialog
    :title="alarmdetail"
    :visible="detailVisible"
    :width="dialogwidth"
    @close="closeYjDialog()"
    append-to-body center
   >
  <RSVEDIT v-if="detailitem.itemshow" :info="detailitem" @closewindows="detailVisible=false;Reload()"></RSVEDIT>
  </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import RSVEDIT from "@/warm/warm-target/rsv-manage/rsvedit.vue";
  import FilterMethods from "@/assets/commonJS/FilterMethods";
  import GetDataMethods from "@/assets/commonJS/GetDataMethods";
  export default 
  {
    data()
    {
      return{
        loading:false,
        theight:window.innerHeight-306,
        dialogwidth:(680/window.innerWidth*100)+"%",
        tabledata:[],
        alarmdetail:'',//断面特征弹框标题
        detailVisible:false,//是否显示弹框
        detailitem:{itemshow:false},//弹框对象
        form:{
          searchmsg:'',
          orderby:'',
          sequence:'',
          adressList:[],
          model_adress:'',
        },
        multipleSelection:[], 
        list_input:{
        total:100,
        pagesize:50,
        pagesizeopts:[10,20,50,75,100,200],
        current:1,
      },
      }
    }, 
        // 引入过滤方法到此组件
    mixins: [FilterMethods,GetDataMethods],
    components: {
          RSVEDIT
    },
    mounted(){
      //行政区划
      this.getTableData_WRP_AD_B(data => {
          //this.form.adressList = data;
            this.form.adressList = data[0].children;
      });
      this.Reload();
    },
    methods:{
      Reload(){
      //调用后台函数，传递参数   原水库水位预警指标：/alarm/getrsvalarm
                this.loading = true;
                var _currentPage = this.list_input.current;
                var _pageSizes = this.list_input.pagesize;
                var body={
                   _page: _currentPage || 1,
                   _page_size: _pageSizes || 20
                } 
                if(this.form.orderby){
                  body._orderby=this.form.orderby;
                }
                // 如果输入框有内容，添加站名过滤字段
                if (this.form.searchmsg) {
                    body["STNM"] = `${this.form.searchmsg}`;
                }
                // 如果地址选择框有内容，添加行政区划过滤字段
                if (this.form.model_adress !=null && typeof(this.form.model_adress.length) != "undefined" && this.form.model_adress.length>0) {
                    var addvdds=[];
                    for(var i=0;i<this.form.model_adress.length;i++){
                        addvdds.push(`${this.$App.SUB_ADDVCD_Array_Filter(
                          this.form.model_adress[i]
                      )}`);
                    }
                    body["ADDlist"] = addvdds.toString();                   
                }
                this.axios.get('/guanqu/base/fhczpage',{params:body}).then((res)=>{
                    this.loading = false;
                    this.list_input.total = res.data.total;
                    var datalist=res.data.list;
                    this.tabledata=datalist;
                });  
    },
    indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
      //选中功能
        handleSelectionChange(val){
            this.multipleSelection=val;
        },
        closeYjDialog(){
              this.detailVisible=false;
              this.detailitem.itemshow=false;
            },
        handleClick(item){
              this.alarmdetail=item.stnm+"防洪信息编辑";
              this.detailitem={id:item.id,stcd:item.stcd,itemshow:true,editsign:"update"};
              this.detailVisible=true;
            },
            addClick(){
              this.alarmdetail="新增防洪信息";
              this.detailitem.editsign="add";
              this.detailitem.itemshow=true;
              this.detailVisible=true;
            },
            delClick(){
              if(this.multipleSelection==null || this.multipleSelection.length==0){
                this.$message({
                  message: '请选择要删除的防洪信息',
                  type: 'warning'
                });
              }else{
                var ids="";
                var alarmids="";
                for(var i=0;i<this.multipleSelection.length;i++){
                  ids+=this.multipleSelection[i].id;
                  alarmids+=this.multipleSelection[i].alarmid;
                  if(i<this.multipleSelection.length-1){
                    ids+=",";
                    alarmids+=",";
                  }
                }
                this.$confirm('确定删除这'+this.multipleSelection.length+'条防洪信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.get('/guanqu/rsvalarm/delinfo',{params:{ids:ids,alarmids:alarmids}}).then((res)=>{
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    this.Reload();
                  });                 
                }).catch(() => {         
                });
              }
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
    // 行政区划选择器
    XZQHsearch(){
        this.list_input.current=1;
        console.log(this.form.model_adress);
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
