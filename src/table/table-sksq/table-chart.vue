<template>
<div>
 <Row :gutter="19" type="flex" justify="center" align="middle" style="margin-bottom:4px;">
                            <Col span="1">
                            </Col>
                            <Col span="3">
                            <span>水位：</span>
                            </Col>
                            <Col span="6">
                            <Input
                                v-model="input.huansuan.waterLever"
                                placeholder="库水位 m"
                                style="min-width: 90px;"
                                size="small"
                                @on-keyup="keyUp($event, 'waterLever',true)"
                            />
                            </Col>
                            <Col span="3">
                            <Button type="info" size="small" @click="getKrBySw()">换算</Button>
                            </Col>
                            <Col span="4">
                            <span>库容：</span>
                            </Col>
                            <Col span="6">
                            <Input
                                v-model="input.huansuan.kurong"
                                placeholder="库容 万m³"
                                style="min-width: 90px"
                                size="small"
                                readonly="true"
                            />
                            </Col> 
                            <Col span="1">
                            </Col>                          
                        </Row>
                        <Row :gutter="19" type="flex" justify="center" align="middle">
                            <Col span="1">
                            </Col>
                            <Col span="3">
                            <span>水位：</span>
                            </Col>
                            <Col span="6">
                            <Input
                                v-model="input.huansuan.shuishen"
                                placeholder="库水位 m"
                                style="min-width: 90px"
                                size="small"
                                @on-keyup="keyUp($event, 'shuishen',true)"
                            />
                            </Col>
                            <Col span="3">
                            <Button type="info" size="small" @click="getArBySw()">换算</Button>
                            </Col>
                            <Col span="4">
                            <span>水面面积：</span>
                            </Col>
                            <Col span="6">
                            <Input
                                v-model="input.huansuan.mianji"
                                placeholder="水面面积 km²"
                                style="min-width: 90px"
                                size="small"
                                readonly="true"
                            />
                            </Col> 
                            <Col span="1">
                            </Col>
                        </Row>
                    <!-- 分割线 -->
                    <div class="divider"></div>
                <Tabs type="card">
                    <TabPane label="水位库容曲线">
                    <!-- 绘图 -->
                    <div
                        v-show="table.guanxiquxian.Rows_filter.length > 0"
                        id="swkrChart"
                        :style="{width: '540px', height: '400px',margin: 'auto'}"
                        ></div>
                        <div id="nogswkr"
                        v-show="table.guanxiquxian.Rows_filter.length == 0"
                        :style="{width: '540px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                        >暂无水位库容关系曲线</div>
                    </TabPane>
                    <TabPane label="水位面积曲线">
                    <!-- 绘图 -->
                    <div
                        v-show="table.guanxiquxian.Rows_filter.length > 0"
                        id="swmjChart"
                        :style="{width: '540px', height: '400px',margin: 'auto'}"
                        ></div>
                        <div id="noswmj"
                        v-show="table.guanxiquxian.Rows_filter.length == 0"
                        :style="{width: '540px', height: '350px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center'}"
                        >暂无水位水面面积关系曲线</div>
                    </TabPane>
                    <TabPane label="关系数据">
                    <!-- 表格用于展示数据 -->
                    <div>
                        <Table
                        :columns="table.guanxiquxian.columns"
                        :data="table.guanxiquxian.Rows_filter"
                        :loading="table.guanxiquxian.loading"
                        border
                        size="small"
                        :height="table.guanxiquxian.height"
                        ></Table>
                        <!-- 分割线 -->
                        <div class="divider"></div>
                        <!-- 分页器 -->
                        <el-pagination
                        background
                        :page-size="table.guanxiquxian.pageSizes"
                        layout="sizes, total, prev, pager, next, jumper"
                        :total="table.guanxiquxian.total"
                        :page-sizes="[20, 50, 100, 200]"
                        :pager-count="5"
                        :current-page="table.guanxiquxian.currentPage"
                        @current-change="handleCurrentChange_guanxiquxian"
                        @size-change="handleSizeChange_guanxiquxian"
                        class="pageController"
                        small
                        ></el-pagination>
                        </div>
                    <!-- 分割线 -->
                    <div class="divider"></div>
                    </TabPane>
                </Tabs>
  </div>       
</template>
<script>
import FilterMethods from "@/assets/commonJS/FilterMethods"; // 过滤方法
import GetDataMethods from "@/assets/commonJS/GetDataMethods"; // 获取数据方法
export default {
  props: {
    info: {}
  },
  data() {
    return {
        // 输入框对象
      input: {
        // 关系曲线换算的
        huansuan: {
          waterLever: "",
          shuishen:"",
          kurong: "",
          mianji:"",
          minsw:"",
          maxsw:"",
        }
      },
      // 表格
      table: {
        // 关系曲线
        guanxiquxian: {
          // 表头设置
          columns: [
            {
              title: " ",
              type: "index",
              width: 60,
              align: "center",
              // 自定义序号
              indexMethod(item) {
                var index =
                  item._index + 1 + (item.currentPage - 1) * item.pageSizes;

                return index;
              },
              ellipsis: true
            },
            {
              title: "库水位(m)",
              //width: 95,
              key: "WL",
              align: "center"
            },
            {
              title: "库容(万m³)",
              key: "STCP",
              //width: 105,
              align: "center"
            },
            {
              title: "水面面积(㎡)",
              key: "AR",
              //width: 105,
              align: "center"
            },
          ],
          // 表体内容
          Rows: [],
          // 过滤后的表体内容
          Rows_filter: [],
          // 表格是否加载中
          loading: false,
          // 日期时间选择器值
          date: null,
          // 总条数
          total: 0,
          // 表格高度
          height: 400,
          // 当前页
          currentPage: 1,
          // 每页显示数量
          pageSizes: 20
        },
      },
    }
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods,GetDataMethods],
  mounted() {  
        // 关系曲线
        this.search_guanxiquxian();
  },
  methods: {
    //配置关系曲线所有数据
    setAllTableData(tableName,data){
      this.table[tableName].Rows=data;
    },
    // 更新 XX 表格的数据
    setTableData(tableName, data) {
      this.table[tableName].Rows_filter = data;
    },
    // 设置表格总条数
    setTableTotal(tableName, total) {
      this.table[tableName].total = total;
    },
    // 处理页码切换_关系曲线
    handleCurrentChange_guanxiquxian(index) {
      this.table["guanxiquxian"].currentPage = index;
      var _data=this.table["guanxiquxian"].Rows;
      _data= _data.map(val => {
              val.currentPage = this.table["guanxiquxian"].currentPage;
              val.pageSizes = this.table["guanxiquxian"].pageSizes;
              return val;
            });
      var datafilter=[];
      var lastnum=this.table["guanxiquxian"].pageSizes*index;
      if(lastnum>this.table["guanxiquxian"].total){
        lastnum=this.table["guanxiquxian"].total;
      }
      for(var i=(index-1)*this.table["guanxiquxian"].pageSizes;i<lastnum;i++){
          datafilter.push(_data[i]);
      }      
      this.setTableData("guanxiquxian", datafilter);
      this.setTableTotal("guanxiquxian", _data.length);
      //this.search_guanxiquxian();
    },
    // 处理每页显示条数切换_关系曲线
    handleSizeChange_guanxiquxian(pageSizes) {
      this.table["guanxiquxian"].pageSizes = pageSizes;
      this.table["guanxiquxian"].currentPage = 1;
      var _data=this.table["guanxiquxian"].Rows;
      _data= _data.map(val => {
              val.currentPage = this.table["guanxiquxian"].currentPage;
              val.pageSizes = this.table["guanxiquxian"].pageSizes;
              return val;
            });
      var datafilter=[];
      for(var i=0;i<this.table["guanxiquxian"].pageSizes;i++){
          datafilter.push(_data[i]);
      }      
      this.setTableData("guanxiquxian", datafilter);
      this.setTableTotal("guanxiquxian", _data.length);
      //this.search_guanxiquxian();
    },
    //只能输入2位小数
     keyUp(e, key, money) {
        
          if (!this.input.huansuan[key]) {
            return (this.input.huansuan[key] = "");
          }
          // 每次抬键处理,对应金额渲染两位小数||数字
          let num = "";
          if (money) {
            num = this.input.huansuan[key].match(/^\d*(\.?\d{0,2})/g)[0];
          } else {
            num = this.input.huansuan[key].replace(/^[^\d]+$/g, "").split('.')[0];
          }
          this.input.huansuan[key] = `${num}`;
        },
    //根据水位获取库容
    getKrBySw(){
      if(this.input.huansuan.waterLever==""){
          this.$message({
          message: '请输入库水位！',
          type: 'warning'
        });
      }else if(this.input.huansuan.waterLever<this.input.huansuan.minsw || this.input.huansuan.waterLever>this.input.huansuan.maxsw){
          this.$message({
          message: '此库水位不存在！',
          type: 'warning'
        });
      }else{
          var obj={
            RZ:this.input.huansuan.waterLever,
            STCD:this.siteInfo.STCD
          };
          this.axios.get('/guanqu/detail/getkrval',{params:obj}).then(res => {
              this.input.huansuan.kurong=res.data;
          });
      }
    },
    //根据水位获取水面面积
    getArBySw(){
      if(this.input.huansuan.shuishen==""){
          this.$message({
          message: '请输入库水位！',
          type: 'warning'
        });
      }else if(this.input.huansuan.shuishen<this.input.huansuan.minsw || this.input.huansuan.shuishen>this.input.huansuan.maxsw){
          this.$message({
          message: '此库水位不存在！',
          type: 'warning'
        });
      }else{
          var obj={
            RZ:this.input.huansuan.shuishen,
            STCD:this.siteInfo.STCD
          };
          this.axios.get('/guanqu/detail/getarval',{params:obj}).then(res => {
              this.input.huansuan.mianji=res.data;
          });
      }
    },
     // 查询关系曲线表格
    search_guanxiquxian() {
      var obj={
        STCD:this.info.STCD
      };
      this.axios.get('/guanqu/detail/rzkrdata',{params:obj}).then(res => {
        var _data = res.data; // 数据深拷贝
        _data= _data.map(val => {
              val.currentPage = this.table["guanxiquxian"].currentPage;
              val.pageSizes = this.table["guanxiquxian"].pageSizes;
              val.WL=parseFloat(val.WL).toFixed(2);
              val.STCP=parseFloat(val.STCP).toFixed(3);
              val.AR=parseFloat(val.AR).toFixed(3);
              return val;
            });
        this.setAllTableData("guanxiquxian",_data);
        var datafilter=[];
      for(var i=0;i<this.table["guanxiquxian"].pageSizes;i++){
          datafilter.push(_data[i]);
      }      
      this.setTableData("guanxiquxian", datafilter);
        this.setTableTotal("guanxiquxian", _data.length);
        this.input.huansuan.minsw=_data[0].WL;
        this.input.huansuan.maxsw=_data[_data.length-1].WL;
        var echartData = {
            chartName1: "水位-库容关系曲线",
            chartName2: "水位-水面面积关系曲线",
            x1: new Object(),
            x2: new Object(),
            y1: new Object(),
            y:new Object(),
        }
        // y1轴
        echartData.y1.name = "库水位 m"; // Y1轴名字
        echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "WL", val => { // 过滤
            if (isNaN(val) || val === "" || val == null) {
                return 0;
            }
            return parseFloat(val).toFixed(2);
        });
        echartData.y1.min=Math.floor(echartData.y1.list[0]);
        echartData.y1.max=Math.ceil(echartData.y1.list[echartData.y1.list.length-1])+1;
        //x1轴
        echartData.x1.name = "库容 万m³"; // X1轴名字
        echartData.x1.list = FilterMethods.methods.newArrayByObjArray(_data, "STCP", val => { // 过滤
            if (isNaN(val) || val === "" || val == null) {
                return 0;
            }
            return parseFloat(val).toFixed(3);
        });
        echartData.x1.min=Math.floor(echartData.x1.list[0]);
        echartData.x1.max=Math.ceil(echartData.x1.list[echartData.x1.list.length-1])+5;
        //x2轴
        echartData.x2.name = "水面面积 km²"; // X1轴名字
        echartData.x2.list = FilterMethods.methods.newArrayByObjArray(_data, "AR", val => { // 过滤
            if (isNaN(val) || val === "" || val == null) {
                return 0;
            }
            return parseFloat(val).toFixed(3);
        });
        echartData.x2.min=Math.floor(echartData.x2.list[0]);
        echartData.x2.max=Math.ceil(echartData.x2.list[echartData.x2.list.length-1])+1;
        var listar=[];
        var listkr=[];
        for(var i=0;i<echartData.y1.list.length;i++){         
          listkr.push([echartData.x1.list[i],echartData.y1.list[i]]);
          listar.push([echartData.x2.list[i],echartData.y1.list[i]]);
        }
        echartData.y.list1=listkr;
        echartData.y.list2=listar;
        console.log(echartData);
        this.swkrchart(echartData);
        this.swmjchart(echartData);
      });
    },
    //绘制水位库容曲线
    swkrchart(echartData){
      var myChart = this.$echarts.init(document.getElementById("swkrChart"));
      myChart.setOption({
        title: {
            text: echartData.chartName1
          },
          tooltip: {
            show:true,
            trigger: "axis",
            formatter: function (params, ticket, callback) {
              console.log(params);
             var tip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#6C84CE;"></span>库水位：' + params[0].value[1] +"m<br/>";
                 tip += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#6C84CE;"></span>库容：'  + params[0].value[0] + '万m³';
             return tip;
            }
          },
          legend: {
            data: [],
            y: "bottom"
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              magicType: { show: true, type: ["line", "bar"] },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          animation: true,
          grid: {
            right: 75
          },
          xAxis: [
            {
              name: `库容 万m³`,
              minInterval:1,
              min:echartData.x1.min,
              max:echartData.x1.max,
              scale: true
            }
          ],
          yAxis: [
            {
              name: `库水位 m`,
              type: "value",
              minInterval:1,
              min:echartData.y1.min,
              max:echartData.y1.max,
              scale: true
            }
          ],
          series: [
            {
              type: "line",
              data: echartData.y.list1,
              showSymbol: false,
            smooth: true,
            itemStyle : {  
                normal : {  
                    color:'#6C84CE'  
                }  
            },  
            areaStyle: {},
            },
          ]
      });
    },
    //绘制水位水面面积曲线
    swmjchart(echartData){
      var myChart = this.$echarts.init(document.getElementById("swmjChart"));
      myChart.setOption({
        title: {
            text: echartData.chartName2
          },
          tooltip: {
            show:true,
            trigger: "axis",
            formatter: function (params, ticket, callback) {
              console.log(params);
             var tip = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#91CC75;"></span>库水位：' + params[0].value[1] +"m<br/>";
                 tip += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#91CC75;"></span>水面面积：'  + params[0].value[0] + 'km²';
             return tip;
            }
          },
          legend: {
            data: [],
            y: "bottom"
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              magicType: { show: true, type: ["line", "bar"] },
              saveAsImage: { show: true }
            }
          },
          grid: {
            right: 75
          },
          calculable: true,
          animation: true,
          xAxis: [
            {
              name: `面积 km²`,
              minInterval:0.1,
              min:echartData.x2.min,
              max:echartData.x2.max,
              scale: true
            }
          ],
          yAxis: [
            {
              name: `库水位 m`,
              type: "value",
              minInterval:0.1,
              min:echartData.y1.min,
              max:echartData.y1.max,
              scale: true
            }
          ],
          series: [
            {
              type: "line",
              data: echartData.y.list2,
              showSymbol: false,
            smooth: true,
            itemStyle : {  
                normal : {  
                    color:'#91CC75'  
                }  
            },  
            areaStyle: {},
            },
          ]
      });
    },
  },
    computed: {},

  watch: {}
};
</script>