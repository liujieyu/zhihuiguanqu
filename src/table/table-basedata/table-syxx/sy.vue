<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start" style="margin-bottom: 20px">
                        <!-- <Col>
                            渠道: -->
                            <!-- 渠道级联选择器 -->
                            <!-- <el-cascader
                              clearable
                              size="mini"
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col> -->
                        <Col>
                            工程类型:
                            <Select v-model="gclx.Field" @change="sourceEUpdate" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in gclx.SourceE_Type" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            水源类型:
                            <Select v-model="sylx.Field" @change="sourceUpdate" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in sylx.Source_Type" :value="item.Field" :key="item.value">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入水源名称" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                        </Col>
                    </Row>
                    <!-- <Divider /> -->
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
                          prop="SourceE_Code"
                          label="水源工程名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="SourceE_Type"
                          label="工程类型"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="Source_Type"
                          label="水源类型"
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
                gclx: {
                    SourceE_Type: [],
                    Field: '',
                },
                sylx: {
                    Source_Type: [],
                    Field: '',
                },
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
            this.Reload();
        },
        methods:{
            // 工程类型选择器的方法
            sourceEUpdate(){},
            // 水源类型选择器的方法
            sourceUpdate(){},
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&SourceE_Code=like,'+this.form.searchmsg;
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
                this.loading = true;

                let obj ={
                    Source_Type: this.sylx.Source_Type,
                    _orderby: '',
                    SourceE_Type: '',
                    RSNM: ''
                }
                this.axios.get('/guanqu/jichushuiyuanxinxi/shuiyuan?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params: obj}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {


                    }
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=SourceE_Type').then((res)=>{
                  this.gclx.SourceE_Type = res.data.list;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Source_Type').then((res)=>{
                  this.sylx.Source_Type = res.data.list;
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
        created() {
            // 获取输排水渠道数据,然后设置渠道选择框选项
                // this.getTableData_WRP_IrrBTCanalSystem(data => {
                //     this.form.qudaoList = data;
                // });
        },
    }
</script>

<style type="text/css">

</style>
