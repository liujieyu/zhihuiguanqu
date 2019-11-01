<template>
  <div>
    <Content :style="{padding: '20px', background: '#fff'}">
      <Row :gutter="16">
        <Col :span="span1">
          <Row :gutter="16" type="flex" justify="start" z style="margin-top: 10px;line-height: 32px;">
            <Col>
              年份:
                <Select v-model="form.year" :clearable="false" @on-change="Yearsearch" style="width:100px;margin-left: 5px;margin-right: 20px;">
                    <Option
                    v-for="obj in yearlist"
                    :key="obj.value"
                    :label="obj.label"
                    :value="obj.value">
                    </Option>
                </Select>
            </Col>
            <Col>
            </Col>
            <Col>
            </Col>
            <Col>
              <Button type="primary" style="width: auto;margin-right: 10px;" @click="exportExcel">导出</Button>
            </Col>
            <Col>
              <Button type="primary" style="width: auto;margin-right: 20px;" @click="addresult">新增</Button>
            </Col>
          </Row>
          <div class="switch" @click="Menu_toggle">
            <i class="el-icon-d-arrow-left" v-if="Menu.show_Controller"></i>
            <i class="el-icon-d-arrow-right" v-if="!Menu.show_Controller"></i>
          </div>
          <Divider/>
          <Row>
                <Col style='font-size: 14px;' class="borsLine">站点名称：{{STinfo.STNM}}&nbsp;&nbsp;测量类型：{{STinfo.TYPE_NM}}&nbsp;&nbsp;所属渠道：{{STinfo.CANAL_NAME}}&nbsp;&nbsp;最大水深：{{STinfo.MAX_Z}}m&nbsp;</Col>
           </Row>
          <Row :gutter="24" style="display: flex;">
            <Col style="width: 500px;">
              <el-table
                            :data="data1"
                            border
                            :height="theight"
                            v-loading="loading"
                            @cell-click="cellclick"
                            style="width: 400px">
                            <el-table-column
                              label=" "
                              type="index"
                              align="center"
                              width="40"
                              :index="indexMethod">
                            </el-table-column>
                            <el-table-column
                              prop="Z"
                              label="水深"
                              align="center"
                              min-width="70"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="Q"
                              label="流量"
                              align="center"
                              min-width="70"
                              >
                            </el-table-column>
                            <el-table-column label="操作" align="center" min-width="120">
                              <template slot-scope="scope">
                                <el-button @click="updateClick(scope.row)" type="primary" size="small">修改</el-button>
                                <el-button @click="deleteClick(scope.row)" type="primary" size="small">删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table> 
            </Col>
            <Col span="13">
              <div ref="achart" style="width: 100%;min-height: 400px;margin-top: 1%;"></div>
            </Col>
          </Row>
        </Col>
        <transition name="el-fade-in-linear">
        <Col :span="span2" v-show="show1">
          <Row style="margin-top: 30px;margin-left: 20px;">
            <Col :style="{'height': (theight+90)+'px','overflow-y': 'auto'}">
              <el-tree
                class="filter-tree"
                :data="Treedata"
                :props="defaultProps"
                highlight-current="true"
                @node-click="type_tree"
                node-key="STCD"
               :default-expanded-keys="keys"
                ref="tree">
              </el-tree>
            </Col>
          </Row>
        </Col>
      </transition>
      </Row>
    </Content>
  </div>
</template>

<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import App from "@/App.vue";
export default {
  data() {
    return {
      loading: false,
      show1:true,
      span1:'19',
      span2:'5',
      theight:window.innerHeight-290,
      Treedata: [],
      defaultProps: {
          children: 'children',
          label: 'label'
        },
      keys:[],
      data1: [],
      date:'',
      STinfo:{},
      form:{
        year:'',
      },
      yearlist:[],
      tree_filter_node:[],
      data2:[],
      Menu: { show_Controller: false },
    };
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
    var date = new Date();
    var year=date.getFullYear();
    this.form.year=year;
    for(let i=0;i<10;i++){
        let y_obj=new Object();
        y_obj.value=year;
        y_obj.label=year+'年';
        this.yearlist.push(y_obj);
        year--;
    }

    this.axios.get('/'+this.$WarmTable+'/ldresult/typesite').then(res => {
      var root=new Object();
      root["label"]="类型";root["ZD_SIGN"]=0;root["STCD"]="0";
      var typelist=new Array();
      var type1=new Object();
      type1["label"]="标准断面";type1["ME_TYPE"]=1;type1["ZD_SIGN"]=0;type1["STCD"]="1";typelist.push(type1);
      var type2=new Object();
      type2["label"]="巴歇尔槽";type2["ME_TYPE"]=2;type2["ZD_SIGN"]=0;type2["STCD"]="2";typelist.push(type2);
      var type3=new Object();
      type3["label"]="水闸";type3["ME_TYPE"]=3;type3["ZD_SIGN"]=0;type3["STCD"]="3";typelist.push(type3);
      var type4=new Object();
      type4["label"]="管道";type4["ME_TYPE"]=4;type4["ZD_SIGN"]=0;type4["STCD"]="4";typelist.push(type4);
      root.children=typelist;
      var keyarry=["0","1"];
      var datalist=res.data;
      for(var h=0;h<datalist.length;h++){
        datalist[h].label=datalist[h].STNM;
      }
      typelist.map(val => {
                val.children = getChildrenList(val.ME_TYPE, datalist);
                return val;
            });
      function getChildrenList(me_type, data) {
                var newList;
                newList = data.filter((val, index) => {
                    if (val.ME_TYPE == me_type) {
                        return true;
                    }
                })
                return newList;
            }
      keyarry.push(typelist[0].children[0].STCD);
      this.Treedata.push(root);
      this.keys=keyarry;
      this.STinfo=typelist[0].children[0];
      this.axios.get('/'+this.$WarmTable+'/ldresult/maxinfo',{params: {metype:this.STinfo.ME_TYPE,stcd:this.STinfo.STCD}}).then(res => {
            var maxobj=res.data;
            this.STinfo.MAX_Z=maxobj.MAX_Z;
            this.STinfo.MAX_Q=maxobj.MAX_Q;
            if(this.STinfo.MAX_Z==undefined || this.STinfo.MAX_Z==''){
              this.STinfo.MAX_Z=0;
            }
            if(this.STinfo.MAX_Q==undefined || this.STinfo.MAX_Q==''){
              this.STinfo.MAX_Q=0;
            }
            this.Reload();
          });
      });
  },
  methods: {
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
    type_tree(data){
      if (data.ZD_SIGN == 1) {
        this.STinfo = data;
        if(data.ME_TYPE==1 || data.ME_TYPE==2){
          this.axios.get('/'+this.$WarmTable+'/ldresult/maxinfo',{params: {metype:data.ME_TYPE,stcd:data.STCD}}).then(res => {
            var maxobj=res.data;
            this.STinfo.MAX_Z=maxobj.MAX_Z;
            this.STinfo.MAX_Q=maxobj.MAX_Q;
            if(this.STinfo.MAX_Z==undefined || this.STinfo.MAX_Z==''){
              this.STinfo.MAX_Z=0;
            }
            if(this.STinfo.MAX_Q==undefined || this.STinfo.MAX_Q==''){
              this.STinfo.MAX_Q=0;
            }
            this.Reload();
          });
        }else{
          this.STinfo.MAX_Z=0;
          this.STinfo.MAX_Q=0;
          this.Reload();
        }
        
      }
    },
    drawchart() {
      var achart = this.$echarts.init(this.$refs.achart);
      console.log(achart);
      achart.resize();
      achart.setOption({
        title: { text: "流量曲线图" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
          type: 'cross',
          animation: false,
          }
        },
        toolbox: {
          show: true,
          feature: {
              saveAsImage: {}
          }
        },
        legend: {
          data: this.data2.legend
        },
        calculable: true,
        xAxis: [
          {
            type: "category",      
            name:'水深',
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: "#2f4554"
                }
            },
            data:this.data2.x1.list,
            axisLabel:{
              interval:parseInt(this.data2.x1.list.length/10),
              showMinLabel: true,
              showMaxLabel: true,
              },
          },
          {
            type: 'category',
            name:'水深',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: "#c23531"
                }
            },
            data: this.data2.x2.list,
            axisLabel:{
              interval:parseInt(this.data2.x2.list.length/10),
              showMinLabel: true,
              showMaxLabel: true,
              },
        }
        ],
        grid: { // 控制图的大小，调整下面这些值就可以，
          x: 70,
          x2: 40,
          y2: 100// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
        },
        yAxis: [
          {
            name: "流量",
            type: "value",
            min:parseFloat(this.data2.y1.min),
            max:parseFloat(this.data2.y1.max)
          }
        ],
        series: [
          {
            name: this.data2.legend[1],
            type: "line",
            data:this.data2.y1.list,
            smooth:true,
            xAxisIndex: 0,
            itemStyle: {
                        normal: {
                            color: "#2f4554",//折线点的颜色
                            lineStyle: {
                                color: "#2f4554"//折线的颜色
                            }
                        }
                    },
          },
          {
            name: this.data2.legend[0],
            type: "line",
            data: this.data2.y2.list,
            smooth:true,
            xAxisIndex: 1,
            itemStyle: {
                        normal: {
                            color: "#c23531",//折线点的颜色
                            lineStyle: {
                                color: "#c23531"//折线的颜色
                            }
                        }
                    },
          }
        ]
      });
    },
    Yearsearch(){
      this.Reload();
    },
    Reload() {
      let obj = {
          stcd:this.STinfo.STCD,
          year:this.form.year
      };
      let lastyear=parseInt(this.form.year)-1;
      this.loading = true;
      this.axios.get('/'+this.$WarmTable+'/ldresult/eqrllist',{params: obj}).then(res => {
          var newdatalist = res.data.curlist.map(val => {
                var newobj=new Object();
                newobj["Z"]=parseFloat(val["Z"]).toFixed(2);
                newobj["Q"]=parseFloat(val["Q"]).toFixed(3);
                newobj["ID"]=val["ID"];
                return newobj;
            });
          this.data1 = newdatalist;
          this.loading = false;
          var curlist=res.data.curlist;
          var lastlist=res.data.lastlist;
          var echartData = {
                        chartName: "曲线图",
                        legend:[lastyear+"年",this.form.year+"年"],
                        x1: new Object(),
                        x2: new Object(),
                        y1: new Object(),
                        y2: new Object()
                    }
          var curx=FilterMethods.methods.newArrayByObjArray(curlist, "Z", val => { // 过滤
                        return parseFloat(val).toFixed(2);
                    });
          var lastx=FilterMethods.methods.newArrayByObjArray(lastlist, "Z", val => { // 过滤
                        return parseFloat(val).toFixed(2);
                    });
            echartData.x2.list= lastx;       
            echartData.y2.list=this.getY(lastlist);
            echartData.x1.list=curx;
            echartData.y1.list=this.getY(curlist);
            echartData.y1.min=0;
          var maxq=this.getMaxQ(lastlist);
          if(this.STinfo.MAX_Q<maxq){
            this.STinfo.MAX_Q=maxq;
          }
          maxq=this.getMaxQ(curlist);
          if(this.STinfo.MAX_Q<maxq){
            this.STinfo.MAX_Q=maxq;
          }
          echartData.y1.max=parseFloat(this.STinfo.MAX_Q)+0.5;
          this.data2=echartData;
           this.drawchart();
        });
    },
    indexMethod(index){
      return index + 1;
    },
    //新增
    addresult(){
      var formobj=new Object();
      formobj.stcd=this.STinfo.STCD;
      formobj.stnm=this.STinfo.STNM;
      formobj.year=this.form.year;
      formobj.sign="add";
      formobj.itype="resultform";
      formobj.title="新增率定结果信息";
      this.$emit('showdailog', formobj);
    },
    //修改
    updateClick(row){
      var formobj=new Object();
      formobj.stcd=this.STinfo.STCD;
      formobj.stnm=this.STinfo.STNM;
      formobj.year=this.form.year;
      formobj.z=row.Z;
      formobj.q=row.Q;
      formobj.id=row.ID;
      formobj.sign="update";
      formobj.itype="resultform";
      formobj.title="修改率定结果信息";
      this.$emit('showdailog', formobj);
    },
    //删除
    deleteClick(row){
      this.$confirm('是否删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.get('/'+this.$WarmTable+'/ldresult/deleteeqrl',{params: {id:row.ID}}).then(res => {
          if(res.data=="ok"){
           this.$message({message:'删除率定结果成功！',type:'success'});
           this.Reload();
         }      
        });
        });
    },
    //获取y轴信息
    getY(array){
      var newArray = array.map(val => {
                var newVal = val["Q"];
                return newVal;
            });
            return newArray;
    },
    //获取数据中的最大值
    getMaxQ(array){
        var maxq=0;
        array.map(val => {
                if(val["Q"]>maxq){
                  maxq=val["Q"];
                }
            });
        return maxq;
    },
    exportExcel(){
      var params="year="+this.form.year+"&stcd="+this.STinfo.STCD+"&stnm="+this.STinfo.STNM+"&metypename="+this.STinfo.TYPE_NM+"&canalname="+this.STinfo.CANAL_NAME+"&maxz="+this.STinfo.MAX_Z;
       window.location.href='/'+this.$WarmTable+'/excel/exportldresult?'+params;
    }
  },
  created() {
  },
  watch:{
    'this.$store.state.anniu': function(){
      console.log(this.$store.state.anniu);
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
