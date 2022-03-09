<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start">

                        <Col>
                            坝型:
                            <Select v-model="bl.Field" style="width:120px;">
                                <Option v-for="item in bl.Dam_Type" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            工程等级:
                            <Select v-model="gcdj.Field" style="width:120px;">
                                <Option v-for="item in gcdj.Dam_Grade" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            建筑物类别:
                            <Select v-model="jzwlb.Field" style="width:120px;">
                                <Option v-for="item in jzwlb.Structure_Type" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入坝名称" style="width: auto;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;" @click="err">导出</Button>
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
                          prop="Dam_Name"
                          label="坝名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="Dam_Type"
                          label="坝型"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="Dam_Grade"
                          label="工程等级"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Structure_Type"
                          label="建筑物类别"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Dam_Height"
                          label="坝高(m)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Standard_FC"
                          label="防洪标准"
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
                bl: {
                    Dam_Type: [],
                    Field: '',
                },
                gcdj: {
                    Dam_Grade: [],
                    Field: '',
                },
                jzwlb: {
                    Structure_Type: [],
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
                this.searchs = '&Dam_Name=like,'+this.form.searchmsg;
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
                this.axios.get('/guanqu/admin/WRP_IrrBFStructure_Dam?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{Dam_Type: this.bx.Dam_Type, Dam_Grade: this.gcdj.Dam_Grade, Structure_Type: this.jzwlb.Structure_Type}}).then((res)=>{
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
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Dam_Type').then((res)=>{
                  this.bx.Dam_Type = res.data.rows;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Dam_Grade').then((res)=>{
                  this.gcdj.Dam_Grade = res.data.rows;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Structure_Type').then((res)=>{
                  this.jzwlb.Structure_Type = res.data.rows;
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
