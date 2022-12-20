<template>
	<div>
		<Content :style="{padding: '24px 24px 4px 24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start" style="margin-bottom: 20px">
                        <Col>
                            行政区划:
                            <!-- 地址级联选择器 -->
                            <el-cascader
                              clearable
                              size="small"
                              style="width: 200px"
                              placeholder="所属行政区划"
                              :options="form.adressList"
                              v-model="form.model_adress"
                              @change="XZQHsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <!--渠道级联选择器
                        <Col>
                            渠道:                             
                            <el-cascader
                              clearable
                              size="mini"
                              style="width: 150px"
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        -->
                        <Col>
                            国家定类:
                            <Select v-model="gjdl.Field" clearable @on-change="STTPUpdate" style="width:120px;">
                                <Option v-for="item in gjdl.STTP" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <Col>
                            站点等级:
                            <Select v-model="zddj.Field" clearable @on-change="STGRUpdate" style="width:120px;">
                                <Option v-for="item in zddj.STGR" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        <!--监测要素:
                        <Col>                           
                            <Select v-model="jcys.Field" clearable @on-change="jcysUpdate" style="width:120px;">
                                <Option v-for="item in jcys.TYPE" :value="item.Field" :key="item.Field">{{ item.FieldName }}</Option>
                            </Select>
                        </Col>
                        -->
                        <Col>
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: 150px;" @on-search="search" v-model.trim="form.searchmsg" />
                        </Col>
                        <Col>
                            <Button type="primary" style="width: auto;" @click="err">导出</Button>
                        </Col>
                    </Row>
                    <!-- <Divider /> -->
                    <el-table
                        :data="data"
                        border
                        :height="theight"
                        v-loading="loading"
                        style="width: 100%"
                        @cell-click="cellclick"
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
                          prop="STNM"
                          label="站名"
                          align="center"
                          fixed="left">
                        </el-table-column>
                        <el-table-column
                          prop="STTP"
                          label="国家定类"
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop="STGR"
                          label="等级"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="THYPE"
                          label="监测要素"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ESSTDT"
                          label="建站日期"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DLOG"
                          label="建设单位"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="ADMAUTH"
                          label="管理单位"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="AD_NM"
                          label="所在行政区划"
                          align="center"
                          >
                        </el-table-column>
                        <!--
                        <el-table-column
                          prop="CANAL_NAME"
                          label="所在灌区渠道"
                          align="center"
                          >
                        </el-table-column>
                        -->
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
                zdlxlist:[
                {
                    value:'1',
                    label:'明渠'
                },
                {
                    value:'2',
                    label:'堰槽'
                },
                {
                    value:'3',
                    label:'渡槽'
                },
                {
                    value:'4',
                    label:'管道'
                },
                ],
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
                // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                    this.form.qudaoList = data;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=STTP').then((res)=>{
                    this.gjdl.STTP = res.data.list;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=STGR').then((res)=>{
                    this.zddj.STGR = res.data.list;
                });
                this.axios.get('/guanqu/admin/WRP_FieldInfo?FieldID=TYPE').then((res)=>{
                    this.jcys.TYPE = res.data.list;
                });
            this.Reload();
        },
        methods:{
            timechange(date){
                console.log(date);
                this.date = date;
            },

            // 行政区划选择器
            XZQHsearch(){
                console.log(this.form.model_adress);
                this.Reload();
            },
            // 渠道选择器
            QDsearch(){
                console.log(this.form.model_qudao);
                this.Reload();
            },
            // 国家定类选择器
            STTPUpdate(){
                console.log(this.gjdl.Field);
                this.Reload();
            },
            //站点等级选择器
            STGRUpdate(){
                console.log(this.zddj.Field);
                this.Reload();
            },
            // 监测要素选择器
            jcysUpdate(){
                debugger;
                console.log(this.jcys.Field);
                this.Reload();
            },
            //搜索框方法
            search(){
              if (this.form.searchmsg != '') {
                this.searchs = this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload();
            },
            Reload(){
                this.loading = true;
                if (this.form.model_adress.length == 0) {
                    this.form.xzqh = '';
                }
                // if (this.form.model_adress.length == 1) {
                //     var str1 = this.form.model_adress[0];
                //     str1 = str1.substring(0,6);
                //     this.form.xzqh = str1;
                // }
                if (this.form.model_adress.length == 1) {
                    var str2 = this.form.model_adress[0];
                    str2 = str2.substring(0,9);
                    this.form.xzqh = str2;
                }
                if (this.form.model_adress.length == 2) {
                    var str3 = this.form.model_adress[1];
                    str3 = str3.substring(0,12);
                    this.form.xzqh = str3;
                }
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
                    ADDVCD: this.form.xzqh,
                    STTP: this.gjdl.Field,
                    STGR: this.zddj.Field,
                    Canal_Code: this.form.qd,
                    STNM: this.searchs,
                    _orderby: '',
                    TYPE: this.jcys.Field
                }
                this.axios.get('/guanqu/jichujiancezhandian/jiancezhandian?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current,{params: obj}).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    this.data = res.data.list;
                    this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length ; i++) {
                        if (this.data[i].DA_Z == '.000') {
                            this.data[i].DA_Z = '-';
                        }else{
                            this.data[i].DA_Z = '0'+this.data[i].DA_Z;
                        }
                        this.data[i].DA_Q = '0'+this.data[i].DA_Q;
                    };
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
