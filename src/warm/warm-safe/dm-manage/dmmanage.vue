<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol"> 
                        <Col>
                            <!-- 名称查询 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名或者断面编号" style="width:auto;margin-right: 20px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col>
                            <Select v-model="form.walltype" @on-change="search" style="width:130px;margin-right: 20px;margin-top:2px;" placeholder="防渗墙类型" clearable >
                                <Option v-for="item in form.typelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
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
                        <Col> 
                        
                            <Button type="primary" icon="md-add" style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
                            <Button type="primary" icon="ios-trash" style="width: auto;" @click="delClick">删除</Button>
                        
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
                        <el-table-column fixed="right" align="center" prop="damcd" label="操作" :width="200">
                        <template slot-scope="scope">
                            <el-button @click="editClick(scope.row)" type="primary" plain size="mini">修改</el-button>
                            <el-button @click="handleClick(scope.row)" type="primary" plain size="mini">断面特征编辑</el-button>
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
    :title="dmedit"
    :visible.sync="editVisible"
    :width="editwidth"
    @close="closeEditDialog()"
    append-to-body center
   >
  <DMEDIT v-if="editVisible" :info="dminfo" @closewindows="editVisible=false;Reload()"></DMEDIT>
  </el-dialog>
    <el-dialog
    :title="dmtzdetail"
    :visible.sync="detailVisible"
    :width="dialogwidth"
    @close="closeYjDialog()"
    append-to-body center
   >
  <DMTZEDIT v-if="detailitem.itemshow" :info="detailitem" @closewindows="detailVisible=false;detailitem.itemshow=false;"></DMTZEDIT>
  </el-dialog>
	</div>
</template>

<script type="text/javascript">
        import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
        import FilterMethods from "@/assets/commonJS/FilterMethods";
        import GetDataMethods from "@/assets/commonJS/GetDataMethods";
        import DMEDIT from "@/warm/warm-safe/dm-manage/dmedit.vue"
        import DMTZEDIT from "@/warm/warm-safe/dm-manage/dmtzedit.vue";
        import App from "@/App.vue";
	export default {
        data(){
            return{
                loading:false,
                form:{
                    searchmsg:'',
                    orderby:'stnm',
                    sequence:'',
                    adressList:[],
                    walltype:'',
                    model_adress:null,
                    typelist:[],
                },
                dmtzdetail:'',//断面特征弹框标题
                detailVisible:false,//是否显示弹框
                detailitem:{itemshow:false},//弹框对象
                dmedit:'',//断面编辑界面标题
                editVisible:false,//是否显示弹框
                dminfo:{},//断面对象
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
                key: "stnm",
                width: 120,
                align: "center",
                sortable: "custom"
              },
              {
                title: "所属行政区划",
                key: "adnm",
                width: 140,
                align: "center",
                sortable: "custom"
              },
              {
                title: "断面编号",
                width: 115,
                key: "damcd",
                align: "center",
                sortable: "custom",
              },
              {
                title: "防渗墙类型",
                width: 130,
                key: "wallType",
                align: "center",
                sortable: "custom",
              },
              {
                title: "断面长度(m)",
                width: 120,
                key: "damlen",
                align: "center",
                sortable: "custom",
              },
              {
                title: "断面宽度(m)",
                width: 120,
                key: "damwd",
                align: "center",
                sortable: "custom",
              },
              {
                title: "更新时间",
                width: 160,
                key: "dtuptim",
                align: "center",
                sortable: "custom",
              },
            ], 
             multipleSelection: [],               
                data:[],
                theight:window.innerWidth>=850?window.innerHeight-306:window.innerHeight-271,
                dialogwidth:(670/window.innerWidth*100)+"%",
                editwidth:(640/window.innerWidth*100)+"%",
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
          DMEDIT,
          DMTZEDIT
        },
        mounted(){
            // 获取行政区划数据,然后设置地址选择框选项
            this.getTableData_WRP_AD_B(data => {
                this.form.adressList = data[0].children;
                this.form.model_adress=true;
            });
            //防渗墙类型
            this.Get_WrpFieldinfo('WRP_SECTION_B','WALL_TYPE',data => {
                this.form.typelist = data;
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
                //如何下拉框已选择，添加防渗墙类型
                if(this.form.walltype && this.form.walltype!=''){
                  body["WALLTYPE"] = `${this.form.walltype}`;
                }
                this.axios.get('/guanqu/page/dminfo',{params:body}).then((res)=>{
                    this.loading = false;
                    this.list_input.total = res.data.total;
                    var datalist=res.data.list;
                    this.data=datalist.map((val, index) => {
                      val.index=index+1+(this.list_input.pagesize*(this.list_input.current-1));
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
                if(key=="wallType"){
                  key="WALL_TYPE";
                }
                if(key=="adnm"){
                  key="STLC";
                }
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
              this.dmtzdetail=item.stnm+"断面"+item.damcd+"特征信息编辑";
              this.detailitem={damcd:item.damcd,itemshow:true,stcd:item.stcd};
              this.detailVisible=true;
            },
            editClick(item){
              this.dmedit="修改断面信息";
              this.dminfo=item;
              this.dminfo.editsign="update";
              this.dminfo.walltypelist=this.form.typelist;
              this.editVisible=true;
            },
            addClick(){
              this.dmedit="新增断面信息";
              this.dminfo.editsign="add";
              this.dminfo.walltypelist=this.form.typelist;
              this.editVisible=true;
            },
            delClick(){
              if(this.multipleSelection==null || this.multipleSelection.length==0){
                this.$message({
                  message: '请选择要删除的断面信息',
                  type: 'warning'
                });
              }else{
                var dmids="";
                for(var i=0;i<this.multipleSelection.length;i++){
                  dmids+=this.multipleSelection[i].id;
                  if(i<this.multipleSelection.length-1){
                    dmids+=",";
                  }
                }
                this.$confirm('确定删除这'+this.multipleSelection.length+'条断面信息以及其下断面特征信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.get('/guanqu/manage/deldminfo',{params:{ids:dmids}}).then((res)=>{
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
            closeEditDialog(){
              this.editVisible=false;
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