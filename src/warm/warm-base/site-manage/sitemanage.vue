<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol"> 
                        <Col>
                            <!-- 名称查询 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站点名称" style="width:200px;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
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
                                  @change="search"
                                  change-on-select
                                ></el-cascader>
                        </Col> 
                        <!--
                        <Col>
                            <Select v-model="gjdl.Field" clearable @on-change="search" style="width:120px;" placeholder="国家定类">
                                <Option v-for="item in gjdl.STTP" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        -->
                        <Col>
                            <Select v-model="zddj.Field" clearable @on-change="search" style="width:120px;" placeholder="站点等级">
                                <Option v-for="item in zddj.STGR" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>                      
                        <Col> 
                        <Button type="primary" icon="md-add" style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
                            <Button type="primary" icon="ios-trash" style="width: auto;" @click="delClick">删除</Button>
                        <!--
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportData">导出</Button>
                            -->
                        </Col>

                    </Row>
                    <Row class="fgline"></Row>
                    <el-table
                        :data="data"
                        border
                        :height="theight"
                        v-loading="loading"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        @sort-change="sort_change"
                        >
                        <el-table-column
                        type="selection"
                        width="45">
                        </el-table-column>
                        <el-table-column
                        v-for="(item,index) in tablecolumns"
                        :prop="item.key"
                        :align="item.align"
                        :label="item.title"
                        :min-width="item.width"
                        :fixed="item.fixed"
                        :sortable="item.sortable"
                        ></el-table-column>
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
                            show-elevator
                            ></Page>
                        </div>
                    </div>
                </Content>
    <el-dialog
    :title="cjwydetail"
    :visible="detailVisible"
    :width="dialogwidth"
    @close="closeYjDialog()"
    append-to-body center
   >
  <SITEEDIT v-if="detailitem.itemshow" :info="detailitem" @closewindows="detailVisible=false;Reload()"></SITEEDIT>
  </el-dialog>
	</div>
</template>

<script type="text/javascript">
        import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
        import FilterMethods from "@/assets/commonJS/FilterMethods";
        import GetDataMethods from "@/assets/commonJS/GetDataMethods";
        import SITEEDIT from "@/warm/warm-base/site-manage/siteedit.vue";
        import App from "@/App.vue";
	export default {
        data(){
            return{
                loading:false,
                form:{
                    searchmsg:'',
                    orderby:'rtunm',
                    sequence:'',
                    adressList:[],
                    cybwtype:'',
                    model_adress:null,
                    typelist:[],
                },
                cjwydetail:'',//断面特征弹框标题
                detailVisible:false,//是否显示弹框
                detailitem:{itemshow:false},//弹框对象
                multipleSelection: [], 
                // 表头设置
          tablecolumns: [
              {
                title: "序号",
                key: "index",
                width: 55,
                align: "center",
                fixed: "left"
              },
              {
                title: "站点名称",
                key: "rtunm",
                width: 120,
                align: "center",
                sortable: "custom"
              },
              {
                title: "所属行政区划",
                key: "stlc",
                width: 140,
                align: "center",
                sortable: "custom"
              },
              {
                title: "基面名称",
                width: 120,
                key: "dtmnm",
                align: "center",
                sortable: "custom",
              },
              {
                title: "基面高程(m)",
                width: 135,
                key: "dtmel",
                align: "center",
                sortable: "custom",
              },
              {
                title: "基面修正值(m)",
                width: 140,
                key: "dtpr",
                align: "center",
                sortable: "custom",
              },
              {
                title: "等级",
                width: 90,
                key: "stgr",
                align: "center",
                sortable: "custom",
              },
              {
                title: "监测要素",
                width: 130,
                key: "types",
                align: "center",
                sortable: "custom",
              },
              {
                title: "建站日期",
                width: 130,
                key: "addtime",
                align: "center",
                sortable: "custom",
              }
            ],   
            gjdl: {
                    STTP: [],
                    Field: '',
                },
                zddj: {
                    STGR: [],
                    Field: '',
                },             
                data:[],
                theight:window.innerWidth>=850?window.innerHeight-306:window.innerHeight-271,
                dialogwidth:(640/window.innerWidth*100)+"%",
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
            }
        },
                // 引入过滤方法到此组件
        mixins: [WarmDataConfig,GetDataMethods,FilterMethods],
        components: {
          SITEEDIT
        },
        mounted(){
            // 获取行政区划数据,然后设置地址选择框选项
            this.getTableData_WRP_AD_B(data => {
                this.form.adressList = data[0].children;
                this.form.model_adress=true;
            });
            this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=STTP').then((res)=>{
                this.gjdl.STTP = res.data.list;
            });
            this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=STGR').then((res)=>{
                this.zddj.STGR = res.data.list;
            });
            this.Reload();
        },
        methods:{
            Reload(){
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
                if(this.gjdl.Field){
                    body["STTP"] = `${this.gjdl.Field}`;
                }
                if(this.zddj.Field){
                    body["STGR"] = `${this.zddj.Field}`;
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
                this.axios.get('/guanqu/manage/siteinfo',{params:body}).then((res)=>{
                    this.loading = false;
                    this.list_input.total = res.data.total;
                    var datalist=res.data.list;
                    this.data=datalist.map((val, index) => {
                      val.index=index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
                      return val;
                    });
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
            search(){
                this.list_input.current=1;
                this.Reload(); 
            },
            sort_change(item){
              var order=item.order;
                if(order==null){
                    return;
                }
                var key= item.prop;
                switch (order) {
                    case "normal":
                        this.form.orderby = null;
                        brak;
                    case "ascending": // 升序
                        this.form.orderby = `${key}`;
                        break;
                    case "descending": // 降序
                        this.form.orderby = `${key} desc`;
                        break;
                }
                this.list_input.current=1;
                this.Reload();
            }, 
            //选中功能
            handleSelectionChange(val){
                this.multipleSelection=val;
            },
            handleClick(item){
                debugger;
              this.cjwydetail=item.rtunm+"站点编辑";
              this.detailitem={id:item.id,stcd:item.stcd,itemshow:true,editsign:"update"};
              this.detailVisible=true;
            },
            addClick(){
              this.spwydetail="新增监测站点";
              this.detailitem.editsign="add";
              this.detailitem.itemshow=true;
              this.detailVisible=true;
            },
            delClick(){
              if(this.multipleSelection==null || this.multipleSelection.length==0){
                this.$message({
                  message: '请选择要删除的监测站点',
                  type: 'warning'
                });
              }else{
                var ids="";
                var stcds=""
                for(var i=0;i<this.multipleSelection.length;i++){
                  ids+=this.multipleSelection[i].id;
                  stcds+=this.multipleSelection[i].stcd;
                  if(i<this.multipleSelection.length-1){
                    ids+=",";
                    stcds+=",";
                  }
                }
                this.$confirm('确定删除这'+this.multipleSelection.length+'条监测站点?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.get('/guanqu/manage/delsiteinfo',{params:{ids:ids,stcds:stcds}}).then((res)=>{
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
            closeYjDialog(){
              this.detailVisible=false;
              this.detailitem.itemshow=false;
            },
            exportData(){
                var params='orderBy='+this.form.orderby+'&sequence='+this.form.sequence;
                if(typeof(this.form.searchmsg)!='undefined' && this.form.searchmsg!=null){
                  params+='&phone='+this.form.searchmsg;
                }
                window.location.href='/excel/exportreceived?'+params;
            },
        },
    }
</script>