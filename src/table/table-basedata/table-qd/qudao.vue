<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start" style="margin-bottom: 20px">
                        <Col>
                            渠道:
                            <!-- 渠道级联选择器 -->
                            <el-cascader
                              clearable
                              size="mini"
                              style="width: 160px"
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col>
                            作用类型:
                            <Select v-model="zylx.Field" clearable  @on-change="User_TypeUpdate" style="width:120px">
                                <Option v-for="item in zylx.User_Type" :value="item.value" :key="item.Field">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            渠道等级:
                            <Select v-model="qddj.Field" clearable  @on-change="Canal_LevelUpdate" style="width:120px;">
                                <Option v-for="item in qddj.Canal_Level" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入渠道名称" style="width: auto;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col>
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
                          prop="Canal_Name"
                          label="渠道名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="User_Type"
                          label="作用类型"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="Canal_Level"
                          label="渠道等级"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Length"
                          label="渠道长度(m)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Normal_Flux"
                          label="设计流量(m³/s)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Max_Flux"
                          label="加大流量(m³/s)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Min_Flux"
                          label="最小流量(m³/s)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Upper_Canal_Name"
                          label="上级渠道"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Upper_Canal_Coordinate"
                          label="上级渠道桩号"
                          align="center"
                          >
                        </el-table-column>
                      </el-table>
                    <!-- <Table border :columns="columns1" :data="data" :loading="loading" height="550"></Table> -->
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
                zylx:{
                    User_Type: [
                        {
                            value: '1',
                            label: '输水渠道'
                        },
                        {
                            value: '2',
                            label: '排水渠道'
                        }
                    ],
                    Field: '',
                },
                qddj:{
                    Canal_Level: [],
                    Field: '',
                },
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
                searchs: '',
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            this.Reload();
        },
        methods:{
            // 渠道选择器
            QDsearch(){
                console.log(this.form.model_qudao);
                this.Reload();
            },
            // 作用选择器
            User_TypeUpdate(){
                this.Reload();
            },
            // 渠道等级选择器
            Canal_LevelUpdate(){
                this.Reload();
            },
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&Canal_Name='+this.form.searchmsg;
                // this.searchs = '&Canal_Code=like,'+this.form.searchmsg;
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

                // if (this.form.model_adress.length == 0) {
                //     this.form.xzqh = '';
                // }
                // if (this.form.model_adress.length == 1) {
                //     var str1 = this.form.model_adress[0];
                //     str1 = str1.substring(0,6);
                //     this.form.xzqh = str1;
                // }
                // if (this.form.model_adress.length == 2) {
                //     var str2 = this.form.model_adress[1];
                //     str2 = str2.substring(0,9);
                //     this.form.xzqh = str2;
                // }
                // if (this.form.model_adress.length == 3) {
                //     var str3 = this.form.model_adress[2];
                //     str3 = str3.substring(0,12);
                //     this.form.xzqh = str3;
                // }
                if (this.form.model_qudao.length == 0) {
                    this.form.qd = '';
                }
                if (this.form.model_qudao.length == 1) {
                    var str4 = this.form.model_qudao[0];
                    str4 = str4.substring(0,5);
                    this.form.qd = str4;
                }
                if (this.form.model_qudao.length == 2) {
                    var str5 = this.form.model_qudao[1];
                    str5 = str5.substring(0,9);
                    this.form.qd = str5;
                }
                let obj = {
                    // _orderby: '',
                    User_Type: this.zylx.Field,
                    Canal_Level: this.qddj.Field,
                    Canal_Code: this.form.qd
                }
                this.axios.get('/guanqu/jichushuju/qudao?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params: obj}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list.map((item,index) => {
                        // debugger;
                        for(let i in item){
                            if(/_Flux$/.test(i)){
                                item[i] = this.Float_Filter(item[i],3)
                            }else {
                                item[i] = item[i]
                            }
                        }
                        return item;
                    });
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {


                    }
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=Canal_Level').then((res)=>{
                  this.qddj.Canal_Level = res.data.list;
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
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                    this.form.qudaoList = data;
                });
        },
    }
</script>

<style type="text/css">

</style>
