<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start">
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
                            渠道:
                            <!-- 渠道级联选择器 -->
                            <el-cascader
                              clearable
                              size="mini"
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col>
                            井径类型:
                            <Select v-model="jjlx.Field" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in jjlx.Diameter_Type" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            井深类型:
                            <Select v-model="jslx.Field" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in jslx.Depth_Type" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            动力类型:
                            <Select v-model="dllx.Field" style="width:120px;margin-left: 5px;margin-right: 20px;">
                                <Option v-for="item in dllx.Motivity_Type" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col class="btn_j">
                            管材类型:
                            <Select v-model="gclx.Field" style="width:120px;margin-right: 0px;">
                                <Option v-for="item in gclx.Material_Type" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col class="btn_j" style="display: flex;justify-content: flex-start;">
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入井名称" style="width: 160px;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                            <Button type="primary" style="width: auto;" @click="err">导出</Button>
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
                          prop="Well_Name"
                          label="井名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="Diameter"
                          label="井直径(m)"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="Diameter_Type"
                          label="井径类型"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Depth"
                          label="井深(m)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Depth_Type"
                          label="井深类型"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Motivity_Type"
                          label="动力类型"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Material_Type"
                          label="管材类型"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADDVCD"
                          label="所在行政区划"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="GS"
                          label="所在灌区渠道"
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
                jjlx: {
                    Diameter_Type: [],
                    Field: '',
                },
                jslx: {
                    Depth_Type: [],
                    Field: '',
                },
                dllx: {
                    Motivity_Type: [],
                    Field: '',
                },
                gclx: {
                    Material_Type: [],
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
                this.searchs = '&Well_Name=like,'+this.form.searchmsg;
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
                this.axios.get('/guanqu/admin/WRP_IrrBFSource_Well?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{Diameter_Type: this.jjlx.Diameter_Type, Depth_Type: this.jslx.Depth_Type, Motivity_Type: this.dllx.Motivity_Type, Material_Type: this.gclx.Material_Type}}).then((res)=>{
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
                // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                    this.form.qudaoList = data;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Diameter_Type').then((res)=>{
                  this.jjlx.Diameter_Type = res.data.rows;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Depth_Type').then((res)=>{
                  this.jslx.Depth_Type = res.data.rows;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Motivity_Type').then((res)=>{
                  this.dllx.Motivity_Type = res.data.rows;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Material_Type').then((res)=>{
                  this.gclx.Material_Type = res.data.rows;
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
    @media (max-width: 1800px) {
        .btn_j{
            margin-top: 10px;
        }
    }
</style>
