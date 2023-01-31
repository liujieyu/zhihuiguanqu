<template>
	<div>
		<Content :style="{padding: '22px 24px 4px 24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start" style="margin-bottom: 20px">
                       <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: 190px;" @on-search="search" v-model.trim="form.searchmsg" />
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
                    </Row>
                    <!-- <Divider /> -->
                    <el-table
                        :data="data"
                        border
                        :height="theight"
                        v-loading="loading"
                        style="width: 100%"
                        @sort-change="sort_change"
                        >
                        <el-table-column
                          label=" "
                          type="index"
                          align="center"
                          width="55"
                          fixed="left"
                          :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                        v-for="(item,index) in table.columns"
                        :prop="item.key"
                        :align="item.align"
                        :label="item.title"
                        :width="item.width"
                        :fixed="item.fixed"
                        :sortable="item.sortable"
                        :show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column align="center" prop="usfl" sortable="custom" label="启用标志" :width="115">
                        <template slot-scope="scope">
                            {{ scope.row.usfl=='Y'?'启用':'停用' }}
                        </template>
                        </el-table-column>
                        <el-table-column align="center" prop="stlc" sortable="custom" label="所属行政区划" :width="150">
                        <template slot-scope="scope">
                            {{ scope.row.stlc }}
                        </template>
                        </el-table-column>
                      </el-table>
                    <div style="margin: 10px;overflow: hidden">
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
	export default {
        data(){
            return{
                loading:false,
                theight:window.screen.height-404,
                table:{
                    columns:[
                        {
                            title: "站名",
                            key: "rtunm",
                            width: 100,
                            align: "center",
                            fixed: "left",
                            sortable: "custom"
                        },                       
                        {
                            title: "河流",
                            key: "rvcd",
                            width: 100,
                            align: "center",
                            sortable: "custom"
                        },
                        {
                            title: "水系",
                            key: "hnnm",
                            width: 100,
                            align: "center",
                            sortable: "custom"
                        },
                        {
                            title: "流域",
                            key: "ctcd",
                            width: 100,
                            align: "center",
                            sortable: "custom"
                        },
                        {
                            title: "基面名称",
                            key: "dtmnm",
                            width: 120,
                            align: "center",
                            sortable: "custom"
                        },
                        {
                            title: "基面高程(m)",
                            key: "dtmel",
                            width: 125,
                            align: "center",
                            sortable: "custom"
                        },
                        {
                            title: "基面修正值(m)",
                            key: "dtpr",
                            width: 140,
                            align: "center",
                            sortable: "custom"
                        },
                        {
                            title: "报讯等级",
                            key: "frgrd",
                            width: 120,
                            align: "center",
                            sortable: "custom"
                        },
                        {
                            title: "集水面积(m²)",
                            key: "drna",
                            width: 130,
                            align: "center",
                            sortable: "custom"
                        },
                    ],
                },
                form:{
                    adressList:[],
                    qudaoList:[],
                    model_adress:'',
                    zdlx:'',
                    model_qudao:'',
                    date:'',
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                },
                gjdl: {
                    STTP: [],
                    Field: '',
                },
                zddj: {
                    STGR: [],
                    Field: '',
                },
                jcys: {
                    TYPE: [],
                    Field: '',
                },
                date:'',
                data:[],
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
                searchs: ''
            }
        },
                // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            //行政区划
                this.getTableData_WRP_AD_B(data => {
                    //this.form.adressList = data;
                     this.form.adressList = data[0].children;
                });
            this.Reload();
        },
        methods:{
            timechange(date){
                console.log(date);
                this.date = date;
            },
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
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
            // 行政区划选择器
            XZQHsearch(){
                this.list_input.current=1;
                console.log(this.form.model_adress);
                this.Reload();
            },
            //搜索框方法
            search(){
              this.list_input.current=1;
              if (this.form.searchmsg != '') {
                this.searchs = this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload();
            },
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
                this.axios.get('/guanqu/base/skczpage',{params:body}).then((res)=>{
                    this.loading = false;
                    this.list_input.total = res.data.total;
                    var datalist=res.data.list;
                    this.data=datalist;
                });               
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
              this.list_input.current = index;
              this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
              this.list_input.pagesize = pagesize;
              this.Reload();
            },
        },
    }
</script>

<style type="text/css">

</style>
