<template>
  <div>
    <Content :style="{padding: '24px', background: '#fff'}">

      <Row :gutter="16">
        <Col :span="span1">
          <Row :gutter="16" type="flex" justify="start" z style="margin: 10px;line-height: 32px;">
        <Col>
          时间：
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            style="width: 340px;"
            @change="timechange"
            value-format="yyyy-MM-dd HH:mm:ss"
            :clearable="false"
            size="small"
            width="200"
            >
            </el-date-picker>
        </Col>
        <Col style="display: flex;justify-content: flex-start;">
          <Button type="primary" style="width: auto;" @click="cellclick">站点详情</Button>
          <Button type="primary" style="width: auto;margin-left: 10px;" @click="err">导出</Button>
          <!-- <Button type="primary" style="width: auto;margin-right: 0px;margin-left: 10px;" @click="test1">显示/隐藏树形</Button> -->
        </Col>
        <Col>

                </Col>
      </Row>
      <div class="switch" @click="Menu_toggle">
        <i class="el-icon-d-arrow-left" v-if="Menu.show_Controller"></i>
        <i class="el-icon-d-arrow-right" v-if="!Menu.show_Controller"></i>
      </div>
      <Divider/>
      <Row>
        <!-- <Col style="text-align: center;margin: 0 0 10px 0;">
                监测站名：{{CZMC}}
        </Col> -->
        <Col style='font-size: 14px;' class="borsLine">监测站名：{{CZMC}}&nbsp;
      闸阀门开度：m，过闸阀流量：m³/s，闸阀上水深：m，闸阀下水深：m</Col>
      </Row>
      <Row :gutter="16" style="">
        <Col>
          <div ref="achart" style="width: 100%;height: 280px;margin-top: 1%;margin-bottom: 0px;"></div>
        </Col>
      </Row>
      <Row type="flex" :gutter="16">
        <!-- <el-button type="primary" round style="margin-left: 45%; margin-bottom: 5px;" @click="change2on">切换</el-button> -->
        <Col style="width: 1172px;" v-if="change2">
          <el-table
                        :data="data1"
                        border
                        height="250"
                        v-loading="loading"
                        @sort-change="sort_change"
                        style="width: 100%">
                        <el-table-column
                          label=" "
                          type="index"
                          align="center"
                          width="60"
                          :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                          prop="TM"
                          label="时间"
                          sortable="custom"
                          align="center"
                          width="">
                        </el-table-column>
                        <el-table-column
                          prop="OD"
                          label="闸门开度"
                          sortable="custom"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Q"
                          label="过闸流量"
                          sortable="custom"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="UPZ"
                          label="闸前水深"
                          sortable="custom"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="DWZ"
                          label="闸后水深"
                          sortable="custom"
                          align="center"
                          >
                        </el-table-column>
                      </el-table>
          <div style="margin: 10px;overflow: hidden">
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
        <Col span="24" v-if="!change2">
          <span style="line-height:3rem;font-size:20px">阀门已开高度：{{GD}}m</span>
          <div style="background-color: #838B8B;height: 196px;width: 196px;position: absolute;margin: 1px 0 0 2px;transition: all 2s;" ref="zhamenimg" class="zhamenimg"></div>
          <div style="border: 2px solid black; height: 200px;width: 200px;"></div>
          <div style="margin-left: 0;margin-top: 10px;">
            <el-button icon="el-icon-video-play" circle @click="kaishi"></el-button>
            <el-button icon="el-icon-refresh-right" circle style="margin-left: 3%;" @click="rekaishi"></el-button>
          </div>
        </Col>
      </Row>
        </Col>
        <transition name="el-fade-in-linear">
            <Col :span="span2" v-show="show1">
              <Row style="margin-top: 10px;line-height: 32px;">
                <Col>
                  <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-right: 20px;" @on-search="search" v-model="searchmsg" />
                </Col>
              </Row>
              <Row style="margin-top: 30px;margin-left: 20px;">
                <Col style="max-height: 600px;overflow-y: auto;">
                  <Button shape="circle" @click="changeTree">切换树形图</Button>
                  <el-tree
                    class="filter-tree"
                    :data="Treedata2"

                    :filter-node-method="filterNode"
                    v-if="xingzhengquhua"
                    @node-click="xingzheng_tree"
                    ref="tree">
                  </el-tree>
                  <el-tree
                    class="filter-tree"
                    :data="Treedata"

                    :filter-node-method="filterNode"
                    v-if="qudao"
                    @node-click="qudao_tree"
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
      qudao: true,
      xingzhengquhua: false,
      show1:true,
      change2:true,
      Menu: { show_Controller: false },
      span1:'19',
      span2:'5',

      //闸门动态图测试
      testdata:[2,1,2,3,2,2],

      Treedata: [],
      Treedata: [],
      GD:'',
      data:[],
      data1: [],
      date:'',
      searchs:"",
      timesearch:'',
      echarts:{
        TM:[],
        OD:[],
        Q:[],
        UPZ:[],
        DWZ:[],
      },
      CZMC:'',
      STinfo:{},
      form:{
        searchmsg:'',
        date:'',
        field:'',
      },
      searchmsg:'',
      MaxY1:0,
      MaxY2:0,
      MinY1:0,
      MinY2:0,
      list_input: {
        total: 100,
        pagesize: 50,
        pagesizeopts: [10, 20, 50, 75, 100, 200],
        current: 1
      }
    };
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods, GetDataMethods],
  // watch: {
  //   searchmsg(val) {
  //     this.$refs.tree.filter(val);
  //   }
  // },
  mounted() {
    var date = new Date();
    var Month = date.getMonth()+1;
    var Day = date.getDate();
    var datelist = new Array();
    if (Month<10) {
      Month = `0${Month}`
    }
    if (Day<10) {
      Day = `0${Day}`
    }
    datelist[0] = date.getFullYear()+'-'+Month+'-'+Day+' 00:00:00';
    datelist[1] = date.getFullYear()+'-'+Month+'-'+Day+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    this.form.date = datelist;
    console.log(this.form.date);
    this.axios.get("/guanqu/table/xingzhen_tree?type=6").then(res => {
          this.Treedata2 = this.XingZheng_Tree_Filter('650000000000',res.data).data;
          //  this.Reload();
    });
    // 获取输排水渠道数据,然后设置渠道选择框选项
    this.axios.get("/guanqu/table/qudao_tree?type=6").then(res => {
          this.Treedata = this.QuDao_Tree_Filter(res.data).data;
          this.CZMC = this.QuDao_Tree_Filter(res.data).siteinfo.canal_name;
          this.STinfo.STNM = this.QuDao_Tree_Filter(res.data).siteinfo.canal_name;
          this.STinfo.STCD = this.QuDao_Tree_Filter(res.data).siteinfo.canal_code;
          console.log(this.QuDao_Tree_Filter(res.data));
          this.searchs = `&STCD=${this.QuDao_Tree_Filter(res.data).siteinfo.canal_code}`;
          this.Reload();
          console.log('渠道',this.QuDao_Tree_Filter(res.data));
    });
      // this.Reload();
  },
  methods: {
    change2on(){
      this.change2 = !this.change2;
    },
    sort_change(column){
              console.log(column);
              if (column.order == 'ascending') {
                this.form.field = column.prop;
                this.Reload();
              }
              if (column.order == 'descending') {
                this.form.field = column.prop+' desc';
                this.Reload();
              }
              if (column.order == null) {
                this.form.field = '';
                this.Reload();
              }
    },
    Menu_toggle() {
      this.Menu.show_Controller = !this.Menu.show_Controller;
      this.show1 = !this.show1;
      if (this.show1 == true ) {
        this.span1 = '19';
        this.span2 = '5';
        this.data2 = {};
        this.Reload();
      }else{
        this.span1 = '24';
        this.span2 = '0';
        this.data2 = {};
        this.Reload();
      }
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
    rekaishi(){
      this.$refs.zhamenimg.style.height = '196px';
    },
    kaishi(){
      this.$refs.zhamenimg.style.height = '150px';
      console.log(this.$refs.zhamenimg.style.height)
    },
    qudao_tree(data) {
                console.log(data);
                if (data.bj !== 0) {
                    this.searchs = '&STCD='+data.canal_code;
                    this.STinfo.STCD = data.canal_code;
                    this.STinfo.STNM = data.canal_name;
                    // this.STinfo = data;
                    this.CZMC = data.label.replace('【站点】','');
                    this.Reload();
                }
            },
            xingzheng_tree(data) {
                console.log(data);
                if (data.bj !== 0) {
                    this.searchs = '&STCD='+data.ad_cd;
                    this.STinfo.STCD = data.ad_cd;
                    this.STinfo.STNM = data.ad_nm;
                    // this.STinfo = data;
                    this.CZMC = data.label.replace('【站点】','');
                    this.Reload();
                }
            },
    filterNode(value, Treedata ,node) {
      this.filterTreeData.push(node);
      if (!value) return true;
      return Treedata.label.indexOf(value) !== -1;
    },
    search(){
      // console.log(this.searchmsg);
      this.filterTreeData = [];
      this.$refs.tree.filter(this.searchmsg);

      if (this.searchmsg != '') {
        this.filterTreeData.some((val, index) => {
        // console.log(val.expanded,val.data.bj)
        if (val.visible && val.data.bj == 0 && val.data.canal_code) {
          console.log(val);
          val.isCurrent = true;
          this.searchs = `&STCD=${val.data.canal_code}`;
          this.CZMC = val.label;
          console.log("this.searchmsg",this.searchmsg)
          return true;
        }else if(val.visible && val.data.bj == 0 && val.data.ad_cd){
          val.isCurrent = true;
          this.searchs = `&STCD=${val.data.ad_cd}`;
          this.CZMC = val.label;
          return true;
        }
      })
        this.Reload();
      }else{
        this.searchs = '';
        this.Reload();
      }
    },
    timechange(){
      console.log(this.form.date);
      this.Reload();
    },
    cellclick(){
      console.log("+++++++++++");
       console.log(this.STinfo);
      if (JSON.stringify(this.STinfo) == "{}") {
        this.$Message.warning('请先选择站点');
      }else{
        var evt = new Object();
        evt.graphic = new Object();
        evt.graphic.attributes = this.STinfo;


        // evt.graphic.attributes.STCD = this.STinfo.canal_code;
        // evt.graphic.attributes.STNM = this.STinfo.canal_name;
        // evt.graphic.attributes.STCD = this.STinfo.ad_cd;
        // evt.graphic.attributes.STNM = this.STinfo.ad_nm;
        evt.graphic.attributes.itype = "zhafazhuangtai";
        evt.graphic.attributes.rowinfo = JSON.parse(JSON.stringify(this.STinfo))
        evt.graphic.attributes.rowinfo.tableType = {
          zfzt: "historyTable"
        };
        var v = new Object;
        v.itype = "zhafazhuangtai";
        console.log("evt",evt);
        this.$App.showDrawer(evt, v);
      }
    },
    drawchart() {
      var achart = this.$echarts.init(this.$refs.achart);
      console.log(achart);
      achart.resize();
      achart.setOption({
        title: { text: "" },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["闸门开度", "过闸流量", "闸前水深", "闸后水深"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data:this.data.x.list, //控制x轴时间数据
            axisLabel:{interval:parseInt(this.data.x.list.length/3.2),rotate:50},
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
            min:this.data.y1.min,
            max:this.data.y1.max
          },
          {
            name: "水深",
            type: "value",
            min:this.data.y.min,
            max:this.data.y.max
          }
        ],
        series: [
          {
            name: "闸门开度",
            type: "line",
            yAxisIndex: 1,
            data:this.data.y4.list
            // data: [0.75, 0.69, 0.64, 0.75, 0.64]
          },
          {
            name: "过闸流量",
            type: "line",
            yAxisIndex: 0,
            data:this.data.y1.list
            // data: [0.36, 0.28, 0.36, 0.02, 0.12]
          },
          {
            name: "闸前水深",
            type: "line",
            yAxisIndex: 1,
            data:this.data.y2.list
            // data: [5.0, 10.0, 20.0, 25.0, 22.0]
          },
          {
            name: "闸后水深",
            type: "line",
            yAxisIndex: 1,
            data:this.data.y3.list
            // data: [6.0, 9.0, 18.0, 22.0, 20.0]
          }
        ]
      });
    },
    err(){
      this.$Message.warning('该功能还在开发中...');
    },
    indexMethod(index){
      return index + 1 + (this.list_input.pagesize*(this.list_input.current-1));
    },
    changeTree() {
      this.qudao = !this.qudao;
      this.xingzhengquhua = !this.xingzhengquhua;
      this.Reload();
    },
    Reload() {
      this.loading = true;
      // this.axios.get("/guanqu/table/ST_Gatage_H?_page_size="+this.list_input.pagesize +"&_page=" +this.list_input.current+this.searchs,{params:{TM:'bt,'+this.form.date[0]+','+this.form.date[1],_orderby:this.form.field}}).then(res => {
      //     console.log(res);
      //     this.data1 = res.data.rows;
      //     if (res.data.total != 0) {
      //       this.CZMC = res.data.rows[0].STNM;
      //       this.STinfo = res.data.rows[0];
      //     }
      //     this.list_input.total = res.data.total;
      //     this.loading = false;
      //     for (var i = 0; i < this.data1.length; i++) {
      //       this.data1[i].OD = this.Z_Filter(this.data1[i].OD);
      //       this.data1[i].Q = this.Z_Filter(this.data1[i].Q, 3);
      //       this.data1[i].UPZ = this.Z_Filter(this.data1[i].UPZ);
      //       this.data1[i].DWZ = this.Z_Filter(this.data1[i].DWZ);
      //       this.data1[i].TM = this.dateFilter(this.data1[i].TM);
      //       this.data1[i].STNM = this.data1[i].STNM.replace('**','');
      //     }
      //     if (res.data.total != 0) {
      //       this.GD = this.data1[0].OD;
      //       this.CZMC = this.data1[0].STNM;
      //     }else{
      //       this.GD = 0;
      //     }

      //     this.axios.get("/guanqu/table/ST_Gatage_H?_page=1&_page_size=99999"+this.searchs,{params:{TM:'bt,'+this.form.date[0]+','+this.form.date[1]}}).then(res => {
      //       this.data = res.data.rows;
      //       for (var i = 0;i<this.data.length ; i++) {
      //         this.data[i].TM = this.dateFilter(this.data[i].TM);
      //       }
      //       this.data = this.transform_ZFZT_data_into_ehart_data(this.data,'historyTable');
      //     this.drawchart();
      //     });
      //   });



        this.axios.get("/guanqu/zhafakongzhi/kaidulishi?_page_size="+this.list_input.pagesize +"&_page=" +this.list_input.current+this.searchs,{params:{Time_min:this.form.date[0],Time_max:this.form.date[1],_orderby:this.form.field}}).then(res => {
          console.log('data1数据')
          console.log(res);
          this.data1 = res.data.list;
          this.loading = false;
          //  this.axios.get("/guanqu/zhafakongzhi/kaidulishi?_page=1&_page_size=99999"+this.searchs,{params:{Time_min:this.form.date[0], Time_max:this.form.date[1]}}).then(res => {
          //   console.log('data数据')
          //   console.log(res)
          //   this.data = res.data.list;
          //   this.data = this.transform_ZFZT_data_into_ehart_data(this.data,'historyTable');
          //   this.drawchart();


          //   for (var i = 0;i<this.data.length ; i++) {
          //     this.data[i].TM = this.dateFilter(this.data[i].TM);
          //   }
          // //   this.data = this.transform_ZFZT_data_into_ehart_data(this.data,'historyTable');
          // // this.drawchart();
          // });

          // if (res.data.total != 0) {
          //   this.CZMC = res.data.rows[0].STNM;
          //   this.STinfo = res.data.rows[0];
          // }
          this.list_input.total = res.data.total;
          this.loading = false;
          for (var i = 0; i < this.data1.length; i++) {
            this.data1[i].OD = this.Z_Filter(this.data1[i].OD);
            this.data1[i].Q = this.Z_Filter(this.data1[i].Q, 3);
            this.data1[i].UPZ = this.Z_Filter(this.data1[i].UPZ);
            this.data1[i].DWZ = this.Z_Filter(this.data1[i].DWZ);
            // this.data1[i].TM = this.dateFilter(this.data1[i].TM);
            // this.data1[i].STNM = this.data1[i].STNM.replace('**','');
          }
          if (res.data.total != 0) {
            this.GD = this.data1[0].OD;
            // this.CZMC = this.data1[0].STNM;
          }else{
            this.GD = 0;
          }
          //  this.axios.get("/guanqu/zhafakongzhi/kaidulishi?_page=1&_page_size=99999"+this.searchs,{params:{TM:'bt,'+this.form.date[0]+','+this.form.date[1]}}).then(res => {
          //   console.log('data数据')
          //   console.log(res)
          //   this.data = res.data.list.reverse();


          //   for (var i = 0;i<this.data.length ; i++) {
          //     this.data[i].TM = this.dateFilter(this.data[i].TM);
          //   }
          //   this.data = this.transform_ZFZT_data_into_ehart_data(this.data,'historyTable');
          // this.drawchart();
          // });
});

this.axios.get("/guanqu/zhafakongzhi/kaidulishi?_page=1&_page_size=99999"+this.searchs,{params:{Time_min:this.form.date[0], Time_max:this.form.date[1]}}).then(res => {

            this.data = res.data.list;
            // this.data = this.transform_ZFZT_data_into_ehart_data(this.data,'historyTable');
            // this.drawchart();


            for (var i = 0;i<this.data.length ; i++) {
              this.data[i].TM = this.dateFilter(this.data[i].TM);

            }
          //   this.data = this.transform_ZFZT_data_into_ehart_data(this.data,'historyTable');
          // this.drawchart();
          this.data = this.transform_ZFZT_data_into_ehart_data(this.data,'historyTable');
          console.log("***************************");
          console.log(this.data);
            this.drawchart();
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
    }
  },
  created() {
  },
  computed: {
    balabala() {
      //console.log(this.$store.state.anniu);
      return this.$store.state.anniu
    }
  },
  watch: {
    // 'this.$store.state.anniu': function(){
    //   console.log(this.$store.state.anniu);
    // }
    balabala(curVal, oldVal) {
      console.log(curVal);
      this.test1(curVal)
    }
  },
};
</script>

<style type="text/css" lang="less">
// 闸阀状态动态模拟图
.zhamenimg{
  transition: all 2s;
}
.view{
    // max-height: 300px;
}
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
