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
                            size="small"
                            :clearable="false"
                            width="200"
                            style=";width: 340px"
                    >
                    </el-date-picker>
                </Col>
                <Col>
                    行政区划:
                    <!-- 地址级联选择器 -->
                    <el-cascader
                            style="width: 150px"
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
                            style="width: 150px"
                            clearable
                            size="small"
                            placeholder="请选择渠道"
                            :options="form.qudaoList"
                            v-model="form.model_qudao"
                            @change="QDsearch"
                            change-on-select
                    ></el-cascader>
                </Col>
                <Col style="display: flex;justify-content: flex-start;align-items: center;margin-top: 10px;">
                    站点类型:
                    <Select v-model="form.zdlx" style="width:120px;margin-left: 5px;margin-right: 10px;" @on-change="TYPEsearch" clearable>
                        <Option v-for="item in zdlxlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Input search enter-button suffix="ios-search" placeholder="请输入站名"
                           style="width: auto;margin-right: 10px;" @on-search="search" v-model="form.searchmsg"/>
                    <Button type="primary" style="width: auto;margin-right: 10px;" @click="err">导出</Button>
                </Col>
            </Row>
                    <Divider />
                    <Row style="font-size: 16px;">
                        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                           共{{data.length}}个站点
                        </Col> -->
                        <Col style='font-size: 14px;' class="borsLine">总站数：{{cols1.length}}&nbsp;
                      单位：水深 m，流量 m³/s，水量 m³</Col>
                    </Row>
                    <!-- <div style="margin-left: 140px;">
                      <el-button type="primary" v-for="(item,index) in cols1" :key="index" style="width: 479px;">详情</el-button>
                    </div> -->
                    <div :style="'width:'+wwww">
                    <el-table
                        :data="data"
                        border
                        height="450"
                        v-loading="loading"
                        style="width: 100%"
                        @cell-click="cellclick"
                        >

                        <el-table-column
                          prop="dt"
                          label="时间"
                          align="center"
                          fixed>
                        </el-table-column>
                          <el-table-column
                            v-for="(item,index) in cols1" :key="index"

                            align="center"  :label="item.STNM">
                            <el-table-column
                              :prop="item.STNM+'平均水深'"
                              label="平均水深"
                              align="center"
                              >
                            </el-table-column>
                            <el-table-column
                              :prop="item.STNM+'平均流量'"
                              label="平均流量"
                              align="center"
                              >
                            </el-table-column>
                            <el-table-column
                              :prop="item.STNM+'小时累计水量'"
                              label="小时累计水量"
                              align="center"
                              >
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
                            size="small"
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
                wwww : '1900px',
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
                cols1:[],
                cols: [
                    {
                      label: "站点A",
                      Children:{
                        A_Zprop:'A_A_Z',
                        A_Qprop:'A_A_Q',
                        WQprop:'A_WQ',
                      },
                    },
                    {
                      label: "站点B",
                      Children:{
                        A_Zprop:'B_A_Z',
                        A_Qprop:'B_A_Q',
                        WQprop:'B_WQ',
                      },
                    },{
                      label: "站点C",
                      Children:{
                        A_Zprop:'C_A_Z',
                        A_Qprop:'C_A_Q',
                        WQprop:'C_WQ',
                      },
                    },
                ],
                tableData: [
                    {
                        DT:'19-06-04 10:52:00',
                        A_A_Z:'5.00',
                        A_A_Q:'6.00',
                        A_WQ:'10.000',
                        B_A_Z:'6.00',
                        B_A_Q:'6.00',
                        B_WQ:'11.000',
                        C_A_Z:'7.00',
                        C_A_Q:'6.00',
                        C_WQ:'12.000',
                    },

                ],

                testdata:[],
                testdata2:[],
                form:{
                    adressList:[],
                    qudaoList:[],
                    model_adress:'',
                    zdlx:'',
                    model_qudao:'',
                    date:[],
                    searchmsg:'',
                    xzqh:'',
                    qd:'',
                    field:'',
                },
                date:'',
                data:[],
                data2:[],
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
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods],
        mounted(){
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
            // 不卡顿的折中方法
            bukadun(){
                console.log('********',this.wwww);
                this.wwww = '100%';
                return;
            },
            // 向父组件传递参数
            cellclick(row, column, cell, event){
              // console.log(column.property);
              var value = column.property.replace('平均水深','').replace('平均流量','').replace('小时累计水量','')
              console.log(value);
              this.cols1.forEach((val, index, array) => {
                if (val.STNM == value) {
                  var STCD = val.STCD;
                  var evt = new Object();
                  evt.graphic = new Object();
                  evt.graphic.attributes = new Object();
                  evt.graphic.attributes.itype = "qudaoshuiqing";
                  evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(row))
                  evt.graphic.attributes.STNM = value;
                  evt.graphic.attributes.STCD = STCD;
                  evt.graphic.attributes.rowinfo.STNM = value;
                  evt.graphic.attributes.rowinfo.STCD = STCD;
                  evt.graphic.attributes.rowinfo.tableType = {
                    qdsq: "hourTable"
                  };
                  var v = new Object;
                  v.itype = "qudaoshuiqing";
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
            TYPEsearch(){
              console.log(this.form.zdlx);
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
                    // str4 = str4.substring(0, 5);
                    this.form.qd = this.form.model_qudao[0];
                }
                if (this.form.model_qudao.length == 2) {
                    // var str5 = this.form.model_qudao[1];
                    // str5 = str5.substring(0, 9);
                    this.form.qd = this.form.model_qudao[1];
                }
                // debugger;
                this.axios.get('/guanqu/qudaoshuiqing/xiaoshibiao?'+this.searchs,{params:{Time_min:this.form.date[0],Time_max:this.form.date[1],ADDVCD:this.form.xzqh,Canal_Code:this.form.qd,STYPE:this.form.zdlx}}).then((res)=>{
                    this.loading = false;
                    console.log(res);


                    // 处理拿回来的数据并赋值给表格
                    this.data  = res.data[0].tongji.map((val, index) => {
                        // debugger;
                        for (let key in val) {
                            if (val[key] === 0) {
                                val[key] = ""
                            }else if(/水深$/.test(key)){
                                val[key] =this.Float_Filter(val[key],2)
                            }else if(/流量$/.test(key)){
                                val[key] = this.Float_Filter(val[key],3)
                            }else if(key.indexOf('小时累计水量') !== -1){
                                val[key] = `${val[key]}`
                                let oFl = val[key].split('.')
                                if(oFl[1] === undefined){
                                    val[key] = `${val[key]}.000`
                                }else if(oFl[1].length === 1){
                                    val[key] = `${val[key]}00`
                                }else if(oFl[1].length === 2){
                                    val[key] = `${val[key]}0`
                                }else if(oFl[1].length === 3){
                                    val[key] = val[key]
                                }else {
                                    val[key] = val[key]
                                }
                            }
                        }
                        return val
                    }) ;
                    this.cols1 = res.data[0].zhandian;
                    // this.data = res.data.rows;
                    // console.log('tap',this.data[0].val.胜溪支渠站.pingjshuiwei);
                    this.list_input.total = res.data[0].zhandian.length;
                    for (var i = 0;i<this.data.length ; i++) {
                        this.data[i].DT = this.data[i].DT+' '+this.data[i].TM+':00';
                        this.data[i].A_Z = this.Z_Filter(this.data[i].A_Z);
                        this.data[i].A_Q = this.Z_Filter(this.data[i].A_Q, 3);
                        this.data[i].WQ = this.Z_Filter(this.data[i].WQ, 3);
                    }
                    //行政区划
                    this.getTableData_WRP_AD_B(data => {
                        this.form.adressList = data;
                    });
                    // 获取输排水渠道数据,然后设置渠道选择框选项
                    this.getTableData_WRP_IrrBTCanalSystem(data => {
                        this.form.qudaoList = data;
                    });
                });

                this.wwww = '1900px';
                setTimeout(()=>{
                    this.bukadun();
                },500);

            },

            search(){
              if (this.form.searchmsg != '') {
                this.searchs = '&STNM='+this.form.searchmsg;
              }else{
                this.searchs = '';
              }
                this.Reload();
                this.wwww = '1900px';
                setTimeout(()=>{
                    console.log(this.wwww);
                    this.wwww = '1901px'
                },3000);

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

            //测试
            handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }


        },
        components: {

        },
        created(){
          console.dir("showDrawer",this.$showDrawer)
        }
    }
</script>

<style type="text/css">
	.tb-edit .el-input {
    display: none;
}

.tb-edit .current-row .el-input {
    display: block;
}

.tb-edit .current-row .el-input + span {
    display: none;
}


</style>
