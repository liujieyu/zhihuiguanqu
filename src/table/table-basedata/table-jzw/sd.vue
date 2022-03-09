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
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入隧洞名称" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;margin-right: 20px;" @click="err">导出</Button>
                            <!-- <Button type="primary" @click="err" style="width: auto;margin-right: 20px;">打印</Button> -->
                        </Col>
                    </Row>
                    <!-- <Row type="flex" style="margin: 10px;" :gutter="16" justify="end">
                        <Col>
                        时间:
                            <el-date-picker
                              v-model="form.date"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              size="mini"
                              :clearable="false"
                              @change="timechange">
                            </el-date-picker>
                        </Col>
                    </Row> -->
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
                          prop="Tunnel_Name"
                          label="隧洞名称"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="Tunnel_Diameter"
                          label="洞径(m)"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="Tunnel_Length"
                          label="隧洞长度(m)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Design_Flux"
                          label="设计流量(m³/s)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Add_Flux"
                          label="加大流量(m³/s)"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="所在渠道"
                          align="center"
                          >
                        </el-table-column>
                        <!-- <el-table-column
                          prop="ACIRAR"
                          label="出口水位"
                          align="center"
                          width="160"
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
                this.searchs = '&Tunnel_Name=like,'+this.form.searchmsg;
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
                this.axios.get('/guanqu/admin/WRP_IrrBTTunnel?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs, {params:{}}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {
                      this.data[i].Design_Flux = this.Z_Filter(this.data[i].Design_Flux,3);
                      this.data[i].Add_Flux = this.Z_Filter(this.data[i].Add_Flux,3);
                      this.data[i].IN_Z = this.Z_Filter(this.data[i].IN_Z);
                      this.data[i].OUT_Z = this.Z_Filter(this.data[i].OUT_Z);
                    }
                });
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                  this.form.qudaoList = data;
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
