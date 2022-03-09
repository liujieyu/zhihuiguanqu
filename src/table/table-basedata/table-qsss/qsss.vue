<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start">

                        <Col>
                            类型:
                            <Select v-model="lx.Field" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in lx.FStructure_Type" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            取水方式:
                            <Select v-model="qsfs.Field" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in qsfs.Fetch_Mode" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入取水设施名称" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                        </Col>
                    </Row>
                    <Divider />
                    <el-table
                        :data="data"
                        border
                        height="450"
                        v-loading="loading"
                        style="width: 100%"
                        >
                        <el-table-column
                          label=" "
                          type="index"
                          align="center"
                          width="65"
                          fixed="left"
                          :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                          prop="FStructure_Name"
                          label="取水设施名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="FStructure_Type"
                          label="类别"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="Fetch_Mode"
                          label="取水方式"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="SourceE_Code"
                          label="对应水源工程名称"
                          align="center"
                          >
                        </el-table-column>
                        <!-- <el-table-column
                          prop="Canal_Length"
                          label="归属灌区"
                          align="center"
                          width="120"
                          >
                        </el-table-column> -->
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
                date:'',
                data:[],
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
                lx: {
                    FStructure_Type: [],
                    Field: '',
                },
                qsfs: {
                    Fetch_Mode: [],
                    Field: '',
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
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            this.Reload();
        },
        methods:{
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&STNM='+this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload();
            },
            indexMethod(index){
                return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
            },
            timechange(date){
                console.log(date);
                this.date = date;
            },
            Reload(){
                // this.loading = true;
                this.axios.get('/guanqu/admin/WRP_IrrBFStructure?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current,{params:{FStructure_Type: this.lx.FStructure_Type, Fetch_Mode: this.qsfs.Fetch_Mode}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {


                    }
                });
                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=FStructure_Type').then((res)=>{
                  this.lx.FStructure_Type = res.data.rows;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Fetch_Mode').then((res)=>{
                  this.qsfs.Fetch_Mode = res.data.rows;
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
