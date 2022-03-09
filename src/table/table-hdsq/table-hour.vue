<template>
    <div>
        <Content :style="{padding: '24px', background: '#fff'}">
                    <Row type="flex" style="margin: 10px;" :gutter="16" justify="start">
                        <Col>
                        时间:
                        <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        @change="timechange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                        size="small"
                        width="200"
                        >
                        </el-date-picker>
                        </Col>
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
                              style="width: 180px"
                              placeholder="请选择渠道"
                              :options="form.qudaoList"
                              v-model="form.model_qudao"
                              @change="QDsearch"
                              change-on-select
                            ></el-cascader>
                        </Col>
                        <Col style="margin-top: 10px;">
                            归属单位:
                            <Select v-model="form.gsdw" style="width:120px;margin-left: 5px;" @on-change="STGRsearch" clearable>
                                <Option v-for="item in gsdwlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col class="btn_baobiao" style="display: flex;justify-content: flex-start;">
                        <!-- 站名模糊搜索 -->
                            <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg" />
                            <Button type="primary" style="width: auto;" @click="err">导出</Button>
                        </Col>
                    </Row>
                    <Divider />
                    <Row style="font-size: 16px;">
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                           共{{data.length}}个站点
                        </Col> -->
                        <Col style='font-size: 14px;' class="borsLine">总站数：{{cols1.length}}&nbsp;
                      单位：水位 m，流量 m³/s，累计流量 10⁶m³</Col>
                    </Row>
                    <div :style="'width:'+wwww">
                    <el-table
                        :data="data"
                        border
                        height="480"
                        v-loading="loading"
                        style="width: 100%"
                        @cell-click="cellclick"
                        >
                        <el-table-column
                          label="站点"
                          align="center">
                          <el-table-column
                          label="警戒水位"
                          align="center"
                          >
                          <el-table-column
                          fixed
                          label="时间"
                          align="center"
                          prop="DT"
                          >
                        </el-table-column>
                        </el-table-column>
                        </el-table-column>
                        <el-table-column
                          :label="item.STNM"
                          align="center"
                          width="" v-for="(item,key) in cols1" :key="key">
                          <el-table-column
                          :label="Float_Filter(item.AWL)"
                          align="center"
                          >
                          <el-table-column
                          :prop="item.STNM+'平均水位'"
                          label="平均水位"
                          align="center"
                          >
                        </el-table-column>
<!--                              :prop="item.STNM+'水势'"-->
                        <el-table-column
                          :prop="item.STNM+'水势'"
                          label="水势"
                          align="center"
                          >
                            <template slot-scope="scope">
<!--                                <el-tag type="danger" v-if="scope.row[scope.column.property] == '↑'">{{scope.row[scope.column.property]}}</el-tag>-->
<!--                                <el-tag v-if="scope.row[scope.column.property] == '↓'">{{scope.row[scope.column.property]}}</el-tag>-->
<!--                                <el-tag type="info" v-if="scope.row[scope.column.property] == '-'">{{scope.row[scope.column.property]}}</el-tag>-->
                                <span :style="{color: scope.row[scope.column.property] == '↑'? 'red' : (scope.row[scope.column.property] == '↓'? 'blue': 'black')}">{{ scope.row[scope.column.property] }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                          :prop="item.STNM+'平均流量'"
                          label="平均流量"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          :prop="item.STNM+'小时流量'"
                          label="小时流量"
                          align="center"
                          >
                        </el-table-column>
                        </el-table-column>
                        </el-table-column>

                      </el-table>
                    </div>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <!-- <Page
                            :total="list_input.total"
                            :current="list_input.current" show-sizer
                            :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                            @on-change="CurrentChange"
                            @on-page-size-change="PagesizeChange"
                            show-total
                            show-elevator
                            ></Page> -->
                        </div>
                    </div>
                </Content>
    </div>
</template>

<script type="text/javascript">
    import FilterMethods from "@/assets/commonJS/FilterMethods";
    import GetDataMethods from "@/assets/commonJS/GetDataMethods";
    import App from "@/App.vue";
    export default {
        data(){
            return{
                wwww: 1900 + 'px',
                gsdwlist:[
                {
                    value:'1',
                    label:'国家重要站'
                },
                {
                    value:'2',
                    label:'省级重要站'
                },
                {
                    value:'3',
                    label:'一般站'
                },
                {
                    value:'4',
                    label:'实验或专用站'
                },
                {
                    value:'5',
                    label:'山洪站'
                },
                {
                    value:'6',
                    label:'临时站'
                },
                {
                    value:'7',
                    label:'其他站'
                },
                {
                    value:'8',
                    label:'灌区站'
                },
                ],
                form:{
                    adressList:[],
                    qudaoList:[],
                    model_adress:'',
                    gsdw:'',
                    model_qudao:'',
                    date:[],
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                    field:'',
                },
                cols1:[],
                date:'',
                STinfo:{},
                xzqhdata:[],
                xzqh:'',
                loading:false,
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
                data: [],
                searchs:'',
                timesearch:'',
                pickerOptions2: {
                  shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近三个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                    }
                  }]
                },
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
            this.axios.get("/guanqu/table/qudao_tree?type=4").then(res => {
                this.Treedata = this.QuDao_Tree_Filter(res.data).data;
                this.STinfo.CZMC = this.QuDao_Tree_Filter(res.data).siteinfo.canal_name;
                console.log(this.QuDao_Tree_Filter(res.data));
                this.STinfo.STCD = this.QuDao_Tree_Filter(res.data).siteinfo.canal_code
                // this.searchs = `&STCD=${this.QuDao_Tree_Filter(res.data).siteinfo.canal_code}`;
                this.Reload();
                console.log('渠道',this.QuDao_Tree_Filter(res.data));
            });


            var date = new Date();
          var Month = date.getMonth()+1;
          var datelist = new Array();
          var Hours = date.getHours();
          var Minutes = date.getMinutes();
          var Seconds = date.getSeconds();
          if (Hours<10) {
            Hours = `0${Hours}`
          }
          if (Minutes<10) {
            Minutes = `0${Minutes}`
          }
          if (Seconds<10) {
            Seconds = `0${Seconds}`
          }
          if (Month<10) {
            Month = `0${Month}`
          }
          datelist[0] = `${date.getFullYear()}-${Month}-${date.getDate()} 00:00:00`;
          datelist[1] = `${date.getFullYear()}-${Month}-${date.getDate()} ${Hours}:${Minutes}:${Seconds}`;
          this.form.date = datelist;
          console.log(this.form.date);
          this.Reload();
        },
        methods:{
            cellclick(row, column, cell, event){
              console.log(row, column);
              var value = column.property.replace('平均水位','').replace('水势','').replace('平均流量','').replace('小时流量','');
              console.log(this.cols1);
              this.cols1.forEach((val, index, array) => {
                if (val.STNM == value) {
                  var STCD = val.STCD;
                  var evt = new Object();
                  evt.graphic = new Object();
                  evt.graphic.attributes = new Object();
                  evt.graphic.attributes.itype = "hedaoshuiqing";
                  evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
                  evt.graphic.attributes.STNM = value;
                  evt.graphic.attributes.STCD = STCD;
                  evt.graphic.attributes.itype = {
                      hdsq: "hourTable"
                  };
                  evt.graphic.attributes.rowinfo.STNM = value;
                  evt.graphic.attributes.rowinfo.STCD = STCD;
                  evt.graphic.attributes.rowinfo.tableType = {
                    hdsq: "hourTable"
                  };
                  var v = new Object;
                  v.itype = "hedaoshuiqing";
                  console.log("evt",evt);
                  this.$App.showDrawer(evt, v);
                }
              });
            },
            timechange(){
              console.log(this.form.date);
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
            STGRsearch(){
              console.log(this.form.gsdw);
              this.Reload();
            },

            Reload(agmt){
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
                    // str4 = str4.substring(0, 5);
                    this.form.qd = this.form.model_qudao[0];
                }
                if (this.form.model_qudao.length == 2) {
                    // var str5 = this.form.model_qudao[1];
                    // str5 = str5.substring(0, 9);
                    this.form.qd = this.form.model_qudao[1];
                }
                let obj = {
                    Time_min:this.form.date[0],
                    Time_max:this.form.date[1],
                    ADDVCD:this.form.xzqh,
                    Canal_Code:this.form.qd,
                    STGR:this.form.gsdw,
                    // STCD: this.STinfo.STCD,
                    STNM: this.searchs
                }
                this.axios.get('/guanqu/hedaoshuiqing/lishi_xiaoshibiao?',{params: obj}).then((res)=>{
                    this.loading = false;
                    console.log(res);
                    this.cols1 = res.data[0].zhandian;
                    // this.data = res.data[0].tongji;

                    this.data = res.data[0].tongji.map((val, index) => {
                        // debugger;
                        for (let key in val) {
                            if(/平均水位$/.test(key)){
                                val[key] =this.Float_Filter(val[key],2)
                            }else if(/水势$/.test(key)){
                              val[key] = val[key]>0?'↑':(val[key]<0?'↓':'-')
                            }else if(/平均流量$/.test(key) || /小时流量$/.test(key)){
                                val[key] = this.Float_Filter(val[key],3)
                            }else if (val[key] === 0) {
                                val[key] = ""
                            }
                        }
                        return val
                    }) ;
                    this.wwww = '1900px'
                    setTimeout(() => {
                        this.wwww = '100%'
                    },1000)
                });
                //行政区划
                this.getTableData_WRP_AD_B(data => {
                    this.form.adressList = data;
                });
                // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getTableData_WRP_IrrBTCanalSystem(data => {
                    this.form.qudaoList = data;
                });


            },

            search(){
              if (this.form.searchmsg != '') {
                this.searchs = this.form.searchmsg;
                this.Reload()
              }else{
                this.searchs = '';
                this.Reload()
              }
            },
            // 处理页码切换
            CurrentChange(index) {
                // console.log(index);
              this.list_input.current = index;
              this.data[0].ID = index*this.list_input.pagesize;
              this.Reload();
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
                // console.log(pagesize)
              this.list_input.pagesize = pagesize;
              this.Reload();
            },
            err(){
              // console.log("showDrawer",this.$showDrawer);
                this.$Message.warning('该功能还在开发中...');
            },


        },
        components: {

        },
        created(){
          console.dir("showDrawer",this.$showDrawer)
        }
    }
</script>

<style scoped="scoped" type="text/css">
    .el-table th{
        padding: 0 !important;
    }
</style>
