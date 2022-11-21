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
                        @sort-change="sort_change"
                        >
                        <el-table-column
                        v-for="(item,index) in tablecolumns"
                        :prop="item.key"
                        :align="item.align"
                        :label="item.title"
                        :width="item.width"
                        :fixed="item.fixed"
                        :sortable="item.sortable"
                        ></el-table-column>
                        <el-table-column fixed="right" align="center" prop="damcd" label="断面特征" :width="120">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="primary" plain size="mini">断面特征</el-button>
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
    :title="dmtzdetail"
    :visible.sync="detailVisible"
    :width="dialogwidth"
    @close="closeYjDialog()"
    append-to-body center
   >
  <DMTZINFO v-show="detailVisible" :info="detailitem"></DMTZINFO>
  </el-dialog>
	</div>
</template>

<script type="text/javascript">
        import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
        import FilterMethods from "@/assets/commonJS/FilterMethods";
        import GetDataMethods from "@/assets/commonJS/GetDataMethods";
        import DMTZINFO from "@/warm/warm-safe/dm-base/dmtzinfo.vue";
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
                detailitem:{},//弹框对象
                // 表头设置
          tablecolumns: [
              {
                title: "序号",
                key: "index",
                width: 60,
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
                align: "center",
                sortable: "custom"
              },
              {
                title: "断面编号",
                width: 120,
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
                title: "断面长度",
                width: 120,
                key: "damlen",
                align: "center",
                sortable: "custom",
              },
              {
                title: "断面宽度",
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
                data:[],
                theight:window.innerWidth>=850?window.innerHeight-318:window.innerHeight-280,
                dialogwidth:(573/window.innerWidth*100)+"%",
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
          DMTZINFO
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
                      val.index=index+1;
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
            handleClick(item){
              this.dmtzdetail=item.stnm+"断面"+item.damcd+"断面特征信息";
              this.detailitem={damcd:item.damcd};
              this.detailVisible=true;
            },
            closeYjDialog(){
              this.detailVisible=false;
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