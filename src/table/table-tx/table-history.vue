<template>
  <div>
    <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" :gutter="16" justify="start">
                      <Col>
                            行政区划:
                            <!-- 地址级联选择器 -->
                            <el-cascader
                              clearable
                              size="small"
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
                              size="small"
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col style="display: flex;justify-content: flex-start">
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;" @on-search="search" v-model="form.searchmsg" />
                            <Button type="primary" style="width: auto;margin-left: 10px;" @click="err">导出</Button>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                    <!-- <Row type="flex" style="margin: 10px;" :gutter="16" justify="end">
                        <Col>
                            行政区划:

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
                    </Row> -->
                    <Row style="font-size: 16px;">
                        <Col class="borsLine">
                           共{{STNMSlength}}个站点,今日收到图像站数{{getToday}},今日未收到图像站数{{STNMSlength-getToday}}
                        </Col>
                    </Row>
                    <Row type="flex" style="flex-wrap:wrap;" :gutter="24" v-loading="loading">
                        <Col span="6" v-for="(item,index) in data" style="margin-top: 20px;">
                            <Card>
                                <div slot="title">
                                    <img :src="item.Image ? item.Image : require('@/assets/image/shuizha.jpg')" style="width: 100%;cursor:pointer" @click="fangda(data,index)">
                                </div>
                                <p><a href="#" @click="cellclick(item)">{{item.STNM}}</a> {{item.TM}}</p>
                                <br>
                                <el-collapse v-model="activeNames" @change="handleChange">
                                  <el-collapse-item title="监测要素" :name="index">
                                    <div>
                                      <span v-if="!item.GUANLIAN_YAOSU">暂无数据</span>
                                      <div v-for="(item2,index) in item.GUANLIAN_YAOSU">
                                        <div v-if="item2.REAL_TIME_DATA!=null&&item2.type==6">
                                          <span v-if="item2.REAL_TIME_DATA.OD!=0">闸门开度:{{Z_Filter(item2.REAL_TIME_DATA.OD)}}m</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.Q!=0">过闸流量:{{Z_Filter(item2.REAL_TIME_DATA.Q,3)}}m³/s</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.UPZ!=0">闸前水位:{{Z_Filter(item2.REAL_TIME_DATA.UPZ)}}m</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.DWZ!=0">闸后水位:{{Z_Filter(item2.REAL_TIME_DATA.DWZ)}}m</span>
                                        </div>
                                        <div v-if="item2.REAL_TIME_DATA!=null&&item2.type==4">
                                          <span v-if="item2.REAL_TIME_DATA.Q!=0">流量:{{Z_Filter(item2.REAL_TIME_DATA.Q,3)}}m³/s</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.Z!=0">水位:{{Z_Filter(item2.REAL_TIME_DATA.Z)}}m</span>
                                        </div>
                                        <div v-if="item2.REAL_TIME_DATA!=null&&item2.type==5">
                                          <span v-if="item2.REAL_TIME_DATA.UPZ!=0">闸前水位:{{Z_Filter(item2.REAL_TIME_DATA.UPZ)}}m</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.DWZ!=0">闸后水位:{{Z_Filter(item2.REAL_TIME_DATA.DWZ)}}m</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.Q!=0">流量:{{Z_Filter(item2.REAL_TIME_DATA.Q,3)}}m³/s</span><br>
                                        </div>
                                        <div v-if="item2.REAL_TIME_DATA!=null&&item2.type==2">
                                          <span v-if="item2.REAL_TIME_DATA.INQ!=0">入库流量:{{Z_Filter(item2.REAL_TIME_DATA.INQ,3)}}m³/s</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.OTQ!=0">出库流量:{{Z_Filter(item2.REAL_TIME_DATA.OTQ,3)}}m³/s</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.BLRZ!=0">库下水位:{{Z_Filter(item2.REAL_TIME_DATA.BLRZ)}}m</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.W!=0">库下水位:{{Z_Filter(item2.REAL_TIME_DATA.W,3)}}10⁶m³</span>
                                        </div>
                                        <div v-if="item2.REAL_TIME_DATA!=null&&item2.type==3">
                                          <span v-if="item2.REAL_TIME_DATA.Z!=0">水位:{{Z_Filter(item2.REAL_TIME_DATA.Z)}}m</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.CV!=0">水位差:{{Z_Filter(item2.REAL_TIME_DATA.CV)}}m</span><br>
                                          <span v-if="item2.REAL_TIME_DATA.Q!=0">水位差:{{Z_Filter(item2.REAL_TIME_DATA.Q,3)}}m³/s</span>
                                        </div>
                                      </div>
                                    </div>
                                  </el-collapse-item>
                                </el-collapse>
                            </Card>
                        </Col>
                    </Row>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page
                            :total="list_input.total"
                            :current="list_input.current" show-sizer
                            :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                            @on-change="CurrentChange"
                            @on-page-size-change="PagesizeChange"
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
                getToday: '',
                loading:false,
                activeNames: [],
                list_input:{
                    total:100,
                    pagesize:48,
                    pagesizeopts:[10,20,48,75,100,200],
                    current:1,
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
                timesearch:'',
                data:[],
                searchs:'',
                STNMSlength:0,
                STNMlength:0,
                STinfo: {
                    CZMZ: ''
                },

            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){

            this.axios.get("/guanqu/table/qudao_tree?type=4").then(res => {
                // this.Treedata = this.QuDao_Tree_Filter(res.data).data;
                this.STinfo.CZMC = this.QuDao_Tree_Filter(res.data).siteinfo.canal_name;
                console.log(this.QuDao_Tree_Filter(res.data));
                // this.searchs = `&STCD=${this.QuDao_Tree_Filter(res.data).siteinfo.canal_code}`;
                this.STinfo.STCD = this.QuDao_Tree_Filter(res.data).siteinfo.canal_code
                this.Reload();
                console.log('渠道',this.QuDao_Tree_Filter(res.data));
                this.Reload();
            });
            var date = new Date();
            var Month = date.getMonth()+1;
            if (Month<10) {
                Month = '0'+ Month;
            }
            var Hours = date.getHours()-1;
            var TM = new Array();
            TM[0] = date.getFullYear()+'-'+Month+'-'+date.getDate()+' '+Hours+':00:00.000';
            TM[1] = date.getFullYear()+'-'+Month+'-'+date.getDate()+' '+date.getHours()+':00:00.000';
            console.log(TM);
            this.form.date = TM;
        },
        methods:{
             handleChange(val) {
              console.log(val);
            },
            fangda(data,index){
              data = data.map((val)=>{
                val.url = val.Image;
                return val;
              });
              // console.log(item);
              this.$App.enlarge_img(data,index);
            },
            cellclick(val){
                console.log(val);
                var evt = new Object();
                evt.graphic = new Object();
                evt.graphic.attributes = val;
                evt.graphic.attributes.STNM = val.STNM;
                evt.graphic.attributes.itype = "tuxiang";
                evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(val))
                evt.graphic.attributes.rowinfo.tableType = {
                    tx: "historyTable"
                };
                var v = new Object;
                v.itype = "tuxiang";
                console.log("evt",evt);
                this.$App.showDrawer(evt, v);
            },
            search(){
                if (this.form.searchmsg=='') {
                    this.searchs = '';
                }else{
                    this.searchs = this.form.searchmsg;
                }
                this.Reload();
            },
            XZQHsearch(){
              console.log(this.form.model_adress);
              this.Reload();
            },
            QDsearch(){
              console.log(this.form.model_qudao);
              this.Reload();
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
                if (this.form.model_qudao.length == 0) {
                  this.form.qd = '';
                }
                if (this.form.model_qudao.length == 1) {
                  // var str4 = this.form.model_qudao[0];
                  // str4 = str4.substring(0,5);
                  this.form.qd = this.form.model_qudao[0];
                }
                if (this.form.model_qudao.length == 2) {
                  // var str5 = this.form.model_qudao[1];
                  // str5 = str5.substring(0,9);
                  this.form.qd = this.form.model_qudao[1];
                }
                // this.axios.get('/guanqu/table/ST_JPG_H?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current+this.searchs,{params:{ADDVCD:this.form.xzqh,Canal_Code:this.form.qd}}).then((res)=>{
                //     this.loading = false;
                // });
                 this.axios.get('/guanqu/tuxiangxinxi/lishi_tuxiang?_page_size='+this.list_input.pagesize+'&_page='+this.list_input.current,{params:{ADDVCD:this.form.xzqh,STNM: this.searchs,Canal_Code:this.form.qd}}).then((res)=>{
                    this.loading = false;
                    this.data = res.data.list;
                     console.log(this.data);
                     this.list_input.total = res.data.total;
                    for (var i = 0;i<this.data.length; i++) {
                        this.data[i].TM = this.data[i].TM.replace('.000','').replace('20','');
                    }
                    this.data.forEach((val, index, array) => {
                        var Image = '/guanqu/gis/pic_content?id='+val.STCD;
                        this.axios.get('/guanqu/tuxiang/details?STCD='+val.STCD).then((res)=>{
                          if (res.data.GUANLIAN_YAOSU.length != 0) {
                            val.GUANLIAN_YAOSU = res.data.GUANLIAN_YAOSU;
                          }
                        });
                        val.Image = Image;
                    });
                    console.log('关联要素',this.data);
                 });
                 this.axios.get('/guanqu/tuxiangxinxi/lishi_tuxiang?_page_size=99999',{params:{ADDVCD:this.form.xzqh,Canal_Code:this.form.qd}}).then((res)=>{
                    this.STNMSlength = res.data.total;
                 });
                 this.getTableData_WRP_AD_B(data => {
                        this.form.adressList = data;
                    });
                    // 获取输排水渠道数据,然后设置渠道选择框选项
                  this.getTableData_WRP_IrrBTCanalSystem(data => {
                        this.form.qudaoList = data;
                    });

                  this.axios.get('/guanqu/tuxiangxinxi/lishi_tuxiangtj').then(res => {
                      console.log(res);
                      this.getToday = res.data;
                  })
            },
            err(){
                this.$Message.warning('该功能还在开发中...');
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
  .ivu-card-head{
        padding: 0;
        border-bottom:0;
    }
</style>
