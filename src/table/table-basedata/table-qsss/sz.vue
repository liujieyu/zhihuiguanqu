<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start" style="margin-bottom: 20px">
                        <Col>
                            行政区划:
                            <!-- 地址级联选择器 -->
                            <el-cascader
                              clearable
                              size="mini"
                              placeholder="请选择地址"
                              :options="form.adressList"
                              v-model="form.model_adress"
                              @change="XZQHsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col>
                            水闸类别:
                            <Select v-model="szlb.Field" clearable @on-change="SLTPUpdate" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in szlb.SLTP" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入水闸名称" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
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
                          prop="SLNM"
                          label="水闸名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="SLTP"
                          label="水闸类别"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="GTHLAM"
                          label="闸门孔数"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="GTHLNTHG"
                          label="闸孔净高(m)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="GTHLNTWD"
                          label="闸孔净宽(m)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="GTTTWD"
                          label="闸身总宽(m)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="GTTTLEN"
                          label="闸身总长(m)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADDVCD"
                          label="所在行政区划"
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
                szlb: {
                    SLTP: [],
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
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },

            // 行政区划选择器
            XZQHsearch(){
                console.log(this.form.model_adress);
                this.Reload();
            },

            // 水闸类别选择器
            SLTPUpdate(){
                console.log(this.szlb.Field);
                this.Reload();
            },
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = this.form.searchmsg;
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
                if (this.form.model_adress.length == 0) {
                    this.form.xzqh = '';
                }
                if (this.form.model_adress.length == 1) {
                    var str1 = this.form.model_adress[0];
                    str1 = str1.substring(0,6);
                    this.form.xzqh = str1;
                }
                if (this.form.model_adress.length == 2) {
                    var str2 = this.form.model_adress[1];
                    str2 = str2.substring(0,9);
                    this.form.xzqh = str2;
                }
                if (this.form.model_adress.length == 3) {
                    var str3 = this.form.model_adress[2];
                    str3 = str3.substring(0,12);
                    this.form.xzqh = str3;
                }
                // 参数对象
                let obj = {
                    _orderby: '',
                    SLNM: this.searchs,
                    SLTP: this.szlb.Field,
                    ADDVCD: this.form.xzqh,
                    GS: ''
                }
                this.axios.get('/guanqu/jichuqushuisheshi/shuizha?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current,{params:obj}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {


                    }
                });
                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=SLTP').then((res)=>{
                  this.szlb.SLTP = res.data.list;
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
