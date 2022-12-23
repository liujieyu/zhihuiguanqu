<template>
  <div>
    <Content :style="{padding: '12px 24px 24px 24px', background: '#fff'}">
      <Row :gutter="16">
        <Col :span="span1">
          <Row :gutter="16" type="flex" justify="start" z style="margin-top: 10px;line-height: 32px;">
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
                style="width: 340px"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
                size="small"
                width="200"
                >
                </el-date-picker>
            </Col>
            <Col>
              测点编号：
              <Select v-model="select.weiyibianxing_select" @on-change="optionchange" style="width:130px;margin-right: 20px;" placeholder="测点编号" >
                                <Option v-for="item in select.wybxmpsdList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
            </Col>
            <Col>
            <Button type="primary" style="width: auto;margin-right: 10px;" @click="WybxInfo">位移测点信息</Button>
            </Col>
          </Row>
          <div class="switch" @click="Menu_toggle">
            <i class="el-icon-d-arrow-left" v-if="Menu.show_Controller"></i>
            <i class="el-icon-d-arrow-right" v-if="!Menu.show_Controller"></i>

          </div>
          <Divider style="margin-top:20px;"/>

          <Row>
                <Col style='font-size: 14px;' class="borsLine">站名：{{spwyInfo.stnm}}&nbsp;测点编号：{{spwyInfo.mpcd}}&nbsp;位移阈值：{{spwyInfo.xyhrds}}mm&nbsp;X基准值：{{spwyInfo.stvlx}}m&nbsp;Y基准值：{{spwyInfo.stvly}}m&nbsp;
              单位：水平位移 mm</Col>
            </Row>
          <Row :gutter="24" style="display: flex;">
            <Col style="width: 480px;">
              <el-table
                  :data="data1"
                  border
                  :height="theight"
                  v-loading="loading"
                  @sort-change="sort_change"
                  style="width: 480px">
                  <el-table-column
                    label=" "
                    type="index"
                    align="center"
                    width="55"
                    :index="indexMethod">
                  </el-table-column>
                  <el-table-column
                    prop="mstm"
                    label="时间"
                    sortable="custom"
                    align="center"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="xhrds"
                    label="X向水平位移"
                    sortable="custom"
                    align="center"
                    width="125"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="yhrds"
                    label="Y向水平位移"
                    sortable="custom"
                    align="center"
                    width="125"
                    >
                  </el-table-column>
                </el-table>
              <div style="margin: 10px 0px 0px 10px;overflow: hidden">
                <div style="float: right;">
                  <Page
                    :total="list_input.total"
                    :current="list_input.current"
                    show-sizer
                    :page-size="list_input.pagesize"
                    :page-size-opts="list_input.pagesizeopts"
                    @on-change="CurrentChange"
                    @on-page-size-change="PagesizeChange"
                    size="small"
                    show-total
                    show-elevator
                  ></Page>
                </div>
              </div>
            </Col>
            <Col span="14">
              <div ref="achart" v-show="data1.length > 0"  :style="{'width': '100%','height': chartheight+'px','margin-top': '1%'}"></div>
              <div ref="noachart" v-show="data1.length==0"  :style="{'width': '100%','height': chartheight+'px',margin: 'auto', display:'flex', alignItems:'center', justifyContent: 'center','margin-top': '1%'}">暂无曲线图数据</div>
            </Col>
          </Row>
        </Col>
        <transition name="el-fade-in-linear">
        <Col :span="span2" v-show="show1">
          <Row style="margin-top: 10px;line-height: 32px;">
            <Col>
              <Input search enter-button suffix="ios-search" placeholder="请输入行政区划或者站点名称" style="width: 250px;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
            </Col>
          </Row>
          <Row style="margin-top: 30px;margin-left: 20px;">
            <Col :style="{'overflow-y': 'auto', height: (theight+30)+'px'}">
              <el-tree
               
                class="filter-tree"
                :data="Treedata"
                highlight-current="true"
                node-key="id"
                :default-expanded-keys="expandedarray"
                :filter-node-method="filterNode"
                @node-click="xzqh_tree"
                ref="tree">
              </el-tree>
            </Col>
          </Row>
        </Col>
      </transition>
      </Row>
    </Content>
    <el-dialog
    :title="slldetail"
    :visible.sync="detailVisible"
    :width="dialogwidth"
    @close="closeYjDialog()"
    append-to-body center
   >
  <SPWYDETAIL v-if="detailitem.itemshow" :info="detailitem"></SPWYDETAIL>
  </el-dialog>
  </div>
</template>

<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import SPWYDETAIL from "@/warm/warm-safe/spwy-base/spwydetail.vue";
import App from "@/App.vue";
export default {
  data() {
    return {
      loading: false,
      theight:window.innerHeight-330,
      chartheight:(window.innerHeight-310)<600?(window.innerHeight-310):600,
      show1:true,
      span1:'19',
      span2:'5',
      Treedata:[],
      expandedarray:[],
      filterTreeData:[],
      GD:'',
      spwyInfo:{},
      data1: [],
      date:'',
      searchs:"",
      siteno:'',
      timesearch:'',
      slldetail:'',//断面特征弹框标题
      detailVisible:false,//是否显示弹框
      detailitem:{itemshow:false},//弹框对象
      dialogwidth:(520/window.innerWidth*100)+"%",
      select:{
        weiyibianxing_select:"",
        wybxmpsdList:[],
      },
      echarts:{
        TM:[],
        Q:[],
        Z:[],
      },
      form:{
        searchmsg:'',
        date:'',
        field:'',
      },
      tree_filter_node:[],
      searchmsg:'',
      MaxY1:0,
      MaxY2:0,
      MinY1:0,
      MinY2:0,
      data2:[],
      Menu: { show_Controller: false },
      list_input: {
        total: 100,
        pagesize: 50,
        pagesizeopts: [10, 20, 50, 75, 100, 200],
        current: 1
      },
      tree_index:0,
      tree_index_list:[],
    };
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods, GetDataMethods],
  components: {
          SPWYDETAIL
        },
  mounted() {
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
    //获取行政区划树
    this.axios.get("/guanqu/info/xzqhtree?TYPE=3").then(res => {
      this.Treedata = res.data;
      this.expandedarray.push(this.Treedata[0].id);
      this.expandedarray.push(this.Treedata[0].children[0].id);
      var stcd=this.Treedata[0].children[0].children[0].value;
      this.searchs = stcd;    
      this.siteno = this.Treedata[0].children[0].children[0].label;
      this.getMpcdList(mpcd=>{
        this.axios.get("/guanqu/detail/spwyinfo", {
            params: {MPCD:mpcd}
        }).then(res => {
            var data=res.data.spwyinfo;
            this.spwyInfo=data[0];
            this.spwyInfo.stnm=this.siteno;
            this.Reload();
        });      
      });
      
    });
  },
  methods: {
    //弹框
    WybxInfo(){
      this.slldetail=this.spwyInfo.stnm+"测站"+this.select.weiyibianxing_select+"位移变形信息";
              this.detailitem={mpcd:this.select.weiyibianxing_select,itemshow:true};
              this.detailVisible=true;
    },
    closeYjDialog(){
              this.detailVisible=false;
              this.detailitem.itemshow=false;
            },
    sort_change(column){
              if (column.order == 'ascending') {
                this.form.field = column.prop;
                this.ReloadBysort();
              }
              if (column.order == 'descending') {
                this.form.field = column.prop+' desc';
                this.ReloadBysort();
              }
              if (column.order == null) {
                this.form.field = '';
                this.ReloadBysort();
              }
    },
    filterNode(value, Treedata, node) {  
      if (!value){
        this.filterTreeData.push(Treedata);
        return true;
      } 
      if(Treedata.label.indexOf(value) !== -1){
        this.filterTreeData.push(Treedata);
        return true;
      }else{
        if(this.filterTreeData.length==0){
          return false;
        }else{
          var nodedata=this.filterTreeData[this.filterTreeData.length-1];
          if(nodedata.level==3){
            return false;
          }else{
            if(nodedata.level>=Treedata.level){
              return false;
            }else{
              var parent=Treedata.parent;
                if(parent.indexOf(nodedata.value)>-1){
                  return true;
                }else{
                  return false;
                }     
            }
          }
          
        }
        
      }
      
    },
    Menu_toggle() {
      this.Menu.show_Controller = !this.Menu.show_Controller;
      this.show1 = !this.show1;
      if (this.show1 == true ) {
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
      }else{
        this.span1 = '24';
        this.span2 = '0';
        this.data2 = {}
      }
      this.Reload();
    },

    // 监听动态参数事件处理函数
    test1(agmt) {
      this.Menu.show_Controller = !agmt;
      // this.show1 = agmt;
      if (agmt) {
        if(this.span1 == '24'){
          this.span2 = '0';
          this.asyncExecute();
          return
        }
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
        this.asyncExecute()
      } else {
        if(this.span1 == '24'){
          this.span2 = '0';
          this.asyncExecute();
          return;
        }
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
        this.asyncExecute()
      }
    },
    // 异步刷新，重新绘图
    asyncExecute(){
      setTimeout(this.Reload, 100)
    },
    xzqh_tree(data){
      if (data.level==3) {
        this.searchs = data.value;
        this.siteno=data.label;
        this.list_input.current = 1;
        this.form.field = '';
        this.getMpcdList(mpcd=>{
        this.axios.get("/guanqu/detail/spwyinfo", {
            params: {MPCD:mpcd}
        }).then(res => {
            var data=res.data.spwyinfo;
            this.spwyInfo=data[0];
            this.spwyInfo.stnm=this.siteno;
            this.Reload();
        });         
        });
      }
    },
    optionchange(){
      var stnm=this.spwyInfo.stnm;
       this.list_input.current = 1;
        this.form.field = '';
       this.axios.get("/guanqu/detail/spwyinfo", {
            params: {MPCD:this.select.weiyibianxing_select}
        }).then(res => {
            var data=res.data.spwyinfo;
            this.spwyInfo=data[0];
            this.spwyInfo.stnm=stnm;
            this.Reload();
        });         
    },
    search(){
      this.filterTreeData = [];
      this.$refs.tree.filter(this.searchmsg);     
      if (this.searchmsg != '') {
        this.filterTreeData.some((val, index) => {
        if(index==0 && val.level==1){
          this.expandedarray=[val.id,val.children[0].id];
          this.searchs=val.children[0].children[0].value;
          this.siteno=val.children[0].children[0].label;
          return true;
        }else if(index==0 && val.level==2){
          this.expandedarray=[val.id];
          this.searchs=val.children[0].value;
          this.siteno=val.children[0].label;
          return true;
        }else if(index==0 && val.level==3){
          this.searchs = val.value;
          this.siteno=val.label;
          return true;
        }
      });
        this.list_input.current = 1;
        this.form.field = '';
        this.getMpcdList(mpcd=>{
          this.axios.get("/guanqu/detail/spwyinfo", {
            params: {MPCD:mpcd}
        }).then(res => {
            var data=res.data.spwyinfo;
            this.spwyInfo=data[0];
            this.spwyInfo.stnm=this.siteno;
            this.Reload();
        });          
        });
      }else{ 
        this.$refs.tree.root.childNodes.forEach((e)=>{
            e.expanded=false;
        }); 
        this.expandedarray=[this.Treedata[0].id,this.Treedata[0].children[0].id];    
        this.searchs = this.Treedata[0].children[0].children[0].value;   
        this.siteno= this.Treedata[0].children[0].children[0].label;  
        this.list_input.current = 1;
        this.form.field = '';  
        this.getMpcdList(mpcd=>{
          this.axios.get("/guanqu/detail/spwyinfo", {
            params: {MPCD:mpcd}
        }).then(res => {
            var data=res.data.spwyinfo;
            this.spwyInfo=data[0];
            this.spwyInfo.stnm=this.siteno;
            this.Reload();
        });          
        });      
      }
    },
    timechange(){
      this.Reload();
    },
    drawchart() {
      var achart = this.$echarts.init(this.$refs.achart);
      achart.resize();
      achart.setOption({
        title: { text: this.data2.chartName },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [ this.data2.y1.name, this.data2.y2.name ],
          bottom:-5
        },
        toolbox: {           
            show: true,
            feature: {
              mark: { show: true },
              magicType: { show: true, type: ["line", "bar"] },
              saveAsImage: { show: true }
            }
          },
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        grid: [{
            left: 38,
            right: this.data2.right,
            height: '33%'
            }, {
            left: 38,
            right: this.data2.right,
            top: '59%',
            height: '33%'
       }],
        calculable: true,
        animation: true,
        xAxis: [
          {
            boundaryGap: false,
            data: this.data2.x.list,
        },
        {
            gridIndex: 1,
            boundaryGap: false,
            data: this.data2.x.list,
            position: 'bottom'
        }
        ],
        yAxis: [
            {
            name: this.data2.y1.title+'mm',
            type: "value",
            //minInterval:1, 
            min:this.data2.y1.min,
            max:this.data2.y1.max
          },
          {
            gridIndex: 1,
            name: this.data2.y2.title+'mm',
            type: "value",
            //minInterval:1, 
            min:this.data2.y2.min,
            max:this.data2.y2.max
          },
        ],
        series: [
          {
            name: this.data2.y1.name,
            type: "line",
            yAxisIndex: 0,
            showSymbol: false,
            data:this.data2.y1.list,
            smooth: true,
            itemStyle : {  
                normal : {  
                    color:'#6C84CE'  
                }  
            },  
            areaStyle: {},
            markLine: {
            symbol:'none',
                itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'red',
                                    }  
                                }  
                            },
            data: [{name:"位移阈值"+this.data2.y1.markval,
                    yAxis: this.data2.y1.markval,
                    label: {
                      formatter: '{b}',
                      position: 'middle'
                    }}],
          }
          },
          {
            name: this.data2.y2.name,
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            showSymbol: false,
            data:this.data2.y2.list,
            smooth: true,
            itemStyle : {  
                normal : {  
                    color:'#91CC75'  
                }  
            },  
            areaStyle: {},
            markLine: {
            symbol:'none',
                itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'red',
                                    }  
                                }  
                            },
            data: [{name:"位移阈值"+this.data2.y2.markval,
                    yAxis: this.data2.y2.markval,
                    label: {
                      formatter: '{b}',
                      position: 'middle'
                    }}],
          }

          },
        ]
      });
    },
    err(){
      this.$Message.warning('该功能还在开发中...');
    },
    getNowDayString(now){
      return now.getFullYear()+"-"+((now.getMonth()+1)<10?"0"+(now.getMonth()+1):(now.getMonth()+1))+"-"+(now.getDate()<10?"0"+now.getDate():now.getDate());
    },
    //获取测站编号列表
    getMpcdList(callback){
      this.axios.get("/guanqu/info/cdbhlist?TYPE=3&STCD="+this.searchs).then(res => {
        this.select.wybxmpsdList=res.data;
        this.select.weiyibianxing_select=res.data[0].value;
        if (typeof callback == "function") {
          callback(this.select.weiyibianxing_select);
        }
      });
    },
    ReloadBysort(){
      let obj = {
        Time_min: this.form.date[0],
        Time_max: this.form.date[1],
        MPCD: this.select.weiyibianxing_select,
        _page: this.list_input.current || 1,
        _page_size: this.list_input.pagesize || 20
      };
      if(this.form.field!=null && this.form.field!=''){
        obj._orderby=this.form.field;
      }
      this.loading = true;
      this.$GetData.Safe_History_DATA(
        "wybx",
        obj,
        {
          default: true,
          myFilter: data => {
            data.map(val => {
              val.current = obj._page;
              val.pagesize = obj._page_size;
              return val;
            });
            return data;
          }
        },
        data => {
          this.data1 = data.data;
          this.list_input.total = data.total;
          this.loading = false;
        }
      );
    },
    Reload() {     
       let obj = {
        Time_min: this.form.date[0],
        Time_max: this.form.date[1],
        MPCD: this.select.weiyibianxing_select,
        _page: this.list_input.current || 1,
        _page_size: this.list_input.pagesize || 20
      };
      if(this.form.field!=null && this.form.field!=''){
        obj._orderby=this.form.field;
      }
      this.loading = true;
      this.$GetData.Safe_History_DATA(
        "wybx",
        obj,
        {
          default: true,
          myFilter: data => {
            data.map(val => {
              val.current = obj._page;
              val.pagesize = obj._page_size;
              return val;
            });
            return data;
          }
        },
        data => {
          this.data1 = data.data;
          this.list_input.total = data.total;
          obj._page_size = 999999999;
          obj._page = 1;
          this.$GetData.Safe_History_DATA(
            "wybx",
            obj,
            {
              default: true,
              myFilter: data => {
                data.map(val => {
                  val.current = obj._page;
                  val.pagesize = obj._page_size;
                  return val;
                });
                return data;
              }
            },
            chartData => {
              this.data2=chartData.data;
              if(this.data2==null || this.data2.length==0){
                return;
              }
              this.data2 = this.$App.transform_SAFE_data_into_ehart_data(this.data2,"wybx",true); 
              var y1max = Math.ceil(FilterMethods.methods.get_echart_max(this.data2.y1.list)),
                  y1min = Math.floor(FilterMethods.methods.get_echart_min(this.data2.y1.list)),
                  y2max = Math.ceil(FilterMethods.methods.get_echart_max(this.data2.y2.list)),
                  y2min = Math.floor(FilterMethods.methods.get_echart_min(this.data2.y2.list));            
              if(y1max<this.spwyInfo.xyhrds){
                y1max=Math.ceil(this.spwyInfo.xyhrds);
              }
              if(y1min>this.spwyInfo.xyhrds){
                y1min=Math.floor(this.spwyInfo.xyhrds);
              }
              this.data2.y1.max=y1max;
              this.data2.y1.min=y1min;
              this.data2.y1.markval=this.spwyInfo.xyhrds;
              if(y2max<this.spwyInfo.xyhrds){
                y2max=Math.ceil(this.spwyInfo.xyhrds);
              }
              if(y2min>this.spwyInfo.xyhrds){
                y2min=Math.floor(this.spwyInfo.xyhrds);
              }
              this.data2.y2.max=y2max;
              this.data2.y2.min=y2min;
              this.data2.y2.markval=this.spwyInfo.xyhrds;
              var mintime=this.data2.x.list[0].slice(0, 10),maxtime=this.data2.x.list[this.data2.x.list.length-1].slice(0, 10);
              var nowDate=new Date();
              var now=this.getNowDayString(nowDate);
              this.data2.right=35;
              if(mintime==now && maxtime==now){
                this.data2.right=22;
                  this.data2.chartName = "今日位移曲线图";
                  for(var i=0;i<this.data2.x.list.length;i++){
                    var time = this.data2.x.list[i].split(" ");
                    this.data2.x.list[i]=time[time.length-1];
                  }
              }else if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==nowDate.getFullYear()){
                  for(var i=0;i<this.data2.x.list.length;i++){
                    var time = this.data2.x.list[i].substr(5);
                    this.data2.x.list[i]=time;
                  }
              }
              this.drawchart();
            }
          );
          this.loading = false;
        }
      );
    },
    indexMethod(index){
      return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
    },
    // 处理页码切换
    CurrentChange(index) {
      this.list_input.current = index;
      this.ReloadBysort();
    },
    // 处理每页显示条数切换
    PagesizeChange(pagesize) {
      this.list_input.pagesize = pagesize;
      this.ReloadBysort();
    }
  },
  created() {
  },
  computed:{
    balabala(){
      return this.$store.state.anniu
    }
  },
  watch:{
    balabala(curVal,oldVal){
      this.test1(curVal)
    }
  }

};
</script>

<style type="text/css" lang="less">
.switch{
  position: absolute;
  right: 0;
  top: 0;
  height: 55px;
  display: flex;
  align-items: center;
  background: white;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: #7eb7f0 2px solid;
  border-right: 0;
}
</style>
