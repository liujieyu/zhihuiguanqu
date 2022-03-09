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
               <Button type="primary" style="width: auto;margin-right: 10px;" @click="exportExcel">导出</Button> 
            </Col>
            <Col>
            </Col>
            <Col>
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
                <Col style='font-size: 14px;' class="borsLine">支渠名称：{{STinfo.CANAL_NANME}}&nbsp;&nbsp;&nbsp;&nbsp;单位：用水量（万m³）&nbsp;&nbsp;用水率（%）</Col>
           </Row>
          <Row :gutter="24" style="display: flex;">
            <Col style="width:100%;">
              <el-table
              :data="data1"
              border
              height="156"
              v-loading="loading"
              style="width: 100%;">
                <el-table-column v-for="(column, index) in columns" :prop="column.value" :label="column.text" :min-width="column.minwidth" :fixed="column.fixed" :align="column.algin" :key="Math.random()">
                </el-table-column>
              </el-table>
            <div ref="achart" :style="{'width': '100%','height': (theight-120)+'px','margin-top':'5px'}"></div> 
            </Col>
          </Row>
        </Col>
        <transition name="el-fade-in-linear">
        <Col :span="span2" v-show="show1">
        <Row>
          <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: auto;margin-left: 20px;" @on-search="search" v-model="searchmsg" />    
          </Row>
          <Row style="margin-top: 10px;margin-left: 20px;">
            <Col :style="{'height': (theight+125)+'px','overflow-y': 'auto'}">
              <el-tree
                class="filter-tree"
                :data="Treedata"
                :props="defaultProps"
                highlight-current="true"
                @node-click="type_tree"
                node-key="ID"
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
export default {
        data() {
        return {
            loading:false,
            show1:true,
            span1:'19',
            span2:'5',
            theight:window.innerHeight-370,
            searchmsg:'',
            Treedata: [],
            defaultProps: {
                children: 'children',
                label: 'CANAL_NANME'
              },
            keys:[],
            data1: [],
            yearlist:[],
            STinfo:{},
            Menu: { show_Controller: false },
                form:{
                    year:'',
                }, 
            columns: [
        {
          text: "名称",
          value: "STNM",
          minwidth: 100,
          fixed:"left",
          algin:"center",
        },
        {
          text: "一月",
          value: "ONE",
          minwidth: 80, 
          algin:"center",
        },
        {
          text: "二月",
          value: "TWO",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "三月",
          value: "THREE",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "四月",
          value: "FOUR",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "五月",
          value: "FIVE",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "六月",
          value: "SIX",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "七月",
          value: "SEVEN",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "八月",
          value: "EIGHT",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "九月",
          value: "NINE",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "十月",
          value: "TEN",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "十一月",
          value: "ELEVEN",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "十二月",
          value: "TWELVE",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "年度总计",
          value: "SUMW",
          minwidth: 100,
          fixed:"right",
          algin:"center",
        },
      ],
      data: []
        };
      },
      // 引入过滤方法到此组件
      mixins: [FilterMethods],
      mounted() {
            //年份
            var now=new Date();
            var year=now.getFullYear();
            for(var i=0;i<10;i++){
                var yobj=new Object();
                yobj.value=year-i;
                yobj.label=(year-i)+'年';
                this.yearlist.push(yobj);
            }
            this.form.year=year;
            this.axios.get('/waterplan/managetree',{params:{canalname:this.searchmsg}}).then(res => {
              debugger;
              var root=res.data.tree;
              var keyarry=[];
              if(root.children.length>0){
              keyarry.push(root.ID,root.children[0].ID,root.children[0].children[0].ID);
              }
              this.Treedata.push(root);
              this.keys=keyarry;
              if(root.children.length>0){
              this.STinfo=root.children[0].children[0];
              }
              this.Reload();
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
          Reload(){
              let obj = {
                  organCode:this.STinfo.CANAL_CODE,
                  year:this.form.year
              };
              this.loading = true;
              this.axios.get('/waterplan/useinfo',{params:obj}).then((res)=>{                
                    this.data1 = res.data;
                    this.loading = false;
                    var echartData = {
                        x: new Object(),
                        y1: new Object(),
                        y2: new Object(),
                        y3: new Object()
                    }
                    var quota=res.data[0];
                    var real=res.data[1];
                    var usel=res.data[2];
                    echartData.x.list=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
                    echartData.y1.list=[quota["ONE"],quota["TWO"],quota["THREE"],quota["FOUR"],quota["FIVE"],quota["SIX"],quota["SEVEN"],quota["EIGHT"],quota["NINE"],quota["TEN"],quota["ELEVEN"],quota["TWELVE"]];
                    echartData.y2.list=[real["ONE"],real["TWO"],real["THREE"],real["FOUR"],real["FIVE"],real["SIX"],real["SEVEN"],real["EIGHT"],real["NINE"],real["TEN"],real["ELEVEN"],real["TWELVE"]];
                    echartData.y3.list=[parseFloat(usel["ONE"]).toFixed(1),parseFloat(usel["TWO"]).toFixed(1),parseFloat(usel["THREE"]).toFixed(1),parseFloat(usel["FOUR"]).toFixed(1),parseFloat(usel["FIVE"]).toFixed(1),parseFloat(usel["SIX"]).toFixed(1),parseFloat(usel["SEVEN"]).toFixed(1),parseFloat(usel["EIGHT"]).toFixed(1),parseFloat(usel["NINE"]).toFixed(1),parseFloat(usel["TEN"]).toFixed(1),parseFloat(usel["ELEVEN"]).toFixed(1),parseFloat(usel["TWELVE"]).toFixed(1)];
                    var max1=0,max2=100;
                    for(var i=0;i<12;i++){
                      if(echartData.y1.list[i]>max1){
                        max1=echartData.y1.list[i];
                      }
                      if(echartData.y2.list[i]>max1){
                        max1=echartData.y2.list[i];
                      }
                      if(parseFloat(echartData.y3.list[i])>max2){
                        max2=parseFloat(echartData.y3.list[i]);
                      }
                    }
                    let maxint = Math.ceil(max1 / 9.8);
                    echartData.y1.max=maxint * 10;
                    let maxint2=Math.ceil(max2 / 9.8);
                    echartData.y3.max=maxint2*10;
                    this.drawchart(echartData);
                });
          },
          type_tree(data){
            if (data.ID >100) {
              this.STinfo = data;
              this.Reload();             
            }
          },
          search(){
            this.Treedata=[];
            this.axios.get('/waterplan/managetree',{params:{canalname:this.searchmsg}}).then(res => {
              var root=res.data.tree;
              var keyarry=[];
              keyarry.push(root.ID,root.children[0].ID,root.children[0].children[0].ID);
              this.Treedata.push(root);
              this.keys=keyarry;
              this.STinfo=root.children[0].children[0];
              this.Reload();
            });
          },
          exportExcel(){
               var params='year='+this.form.year+'&organCode='+this.STinfo.CANAL_CODE+'&canalname='+this.STinfo.CANAL_NANME;
                window.location.href='/excel/exportusewater?'+params; 
          },
          drawchart(echartData) {
            var achart = this.$echarts.init(this.$refs.achart);
            console.log(achart);
            achart.resize();
            achart.setOption({
    tooltip: {
            trigger: "axis",
          },
    color:['#FF4000','#2A93FC','#027802'],
    legend: {
        data:['用水定额','实际用水','用水率']
    },
    grid: {  
                left: '1%',   //图表距边框的距离
                right: '1%',
                bottom:'1%',
                containLabel: true
            },
    xAxis: [
        {
            type: 'category',
            data: echartData.x.list,
            axisLabel:{interval:0}
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: ' 用水量(万m³)',
            min: 0,
            max: echartData.y1.max,
            splitNumber: 5,
            interval: echartData.y1.max/5,

        },
        {
            type: 'value',
            name: '百分比(%)',
            min: 0,
            max: echartData.y3.max,
            splitNumber: 5,
            interval: echartData.y3.max/5,

        }
    ],
    series: [
        {
            name:'用水定额',
            type:'bar',
            barGap: 0,
            data:echartData.y1.list
        },
        {
            name:'实际用水',
            type:'bar',
            data:echartData.y2.list
        },
        {
            name:'用水率',
            type:'line',
            yAxisIndex: 1,
            data:echartData.y3.list
        }
    ]
});
       },
       },
      components: {   
      }
    }
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