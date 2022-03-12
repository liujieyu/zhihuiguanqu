<template>
  <div id="clickMe" class="backdiv" @dblclick="toggleFullScreen()">
    <img src="../common/image/mapnosite.png" :style="{'width':imgwidth+'px','height':imgheight+'px','position':'absolute','top':'0px','left':leftwidth+'px'}"></img>
      <div ref="left" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','left':'0px'}" v-show="showleft">
            <div ref="secondchart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div ref="firstchart" :style="{'width':lwidth+'px','height':(subheight2-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div ref="piechart" :style="{'width':lwidth+'px','height':(subheight3)+'px'}" class="subback"></div>
            
    </div>
    <div ref="center" :style="{'display':'inline-block','height':theight+'px','width':cwidth+'px','z-index':'3','margin-left':lwidth+'px'}">
      <div style="color:#fff;text-shadow:5px 2px 6px #000;text-align:center;z-index:10;position:relative;top:25px;"><h1>宁乡市小型水库监测预警平台</h1></div>
      <div class="switch" @click="switchleft" ref="switchleft">
          <i class="el-icon-d-arrow-left" v-if="showleft"></i>
          <i class="el-icon-d-arrow-right" v-if="!showleft"></i>
        </div>
      <div class="switchright" @click="switchright" ref="switchright">
          <i class="el-icon-d-arrow-left" v-if="!showright"></i>
          <i class="el-icon-d-arrow-right" v-if="showright"></i>
        </div>
      <el-popover placement="top-start" :title="form.STNM" width="210" trigger="hover">
      <table><tr><td align="right">当前库容：</td><td>{{form.W}}m³</td></tr><tr><td align="right">当前水位：</td><td>{{form.RZ}}m</td></tr><tr><td align="right">距汛限：</td><td>{{form.JL}}m</td></tr><tr><td align="right">今日降雨：</td><td>{{form.P}}mm</td></tr><tr><td align="right">当前小时降雨：</td><td>{{form.HOURP}}mm</td></tr></table>
      <div slot="reference" :style="{'left':(1280/2020*imgwidth+leftwidth)+'px','top':(imgheight*(918/1703-0.125))+'px'}" class="waterskdiv" @mouseover="showskinfo('611H1035HC')" id="S611H1035HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="210" trigger="hover">
      <table><tr><td align="right">当前库容：</td><td>{{form.W}}m³</td></tr><tr><td align="right">当前水位：</td><td>{{form.RZ}}m</td></tr><tr><td align="right">距汛限：</td><td>{{form.JL}}m</td></tr><tr><td align="right">今日降雨：</td><td>{{form.P}}mm</td></tr><tr><td align="right">当前小时降雨：</td><td>{{form.HOURP}}mm</td></tr></table>
      <div slot="reference" :style="{'left':(827/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1068/1703-0.125))+'px'}" class="waterskdiv" @mouseover="showskinfo('611H1037HC')" id="S611H1037HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="210" trigger="hover">
      <table><tr><td align="right">当前库容：</td><td>{{form.W}}m³</td></tr><tr><td align="right">当前水位：</td><td>{{form.RZ}}m</td></tr><tr><td align="right">距汛限：</td><td>{{form.JL}}m</td></tr><tr><td align="right">今日降雨：</td><td>{{form.P}}mm</td></tr><tr><td align="right">当前小时降雨：</td><td>{{form.HOURP}}mm</td></tr></table>
      <div slot="reference" :style="{'left':(710/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1070/1703-0.125))+'px'}" class="waterskdiv" @mouseover="showskinfo('611H1036HC')" id="S611H1036HC"></div>
      </el-popover>
    </div>
    <div ref="right" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','right':'0px'}" v-show="showright">
      <div ref="table" :style="{'width':lwidth+'px','height':(theight*0.65-1)+'px','margin-top':'0px','text-align':'center'}" class="subback">
        <div style="color:#fff;font-size:14px;font-weight:bold;padding-top:5px;padding-bottom:5px;text-align:center;">今日汛情</div>
        <el-table
                            :data="tabledata"
                            border
                            :height="(theight*0.65-35)"
                            v-loading="loading"
                            :span-method="handleSpan"
                            row-style="height:25px"
                            header-cell-style="background-color: #036658;padding:6px 0px;"
                            style="width:100%;margin-top:2px;">
                            <el-table-column
                              prop="STNM"
                              label="预警站点"
                              align="center"
                              width="90"
                              >
                            </el-table-column>
                            <el-table-column align="center" label="预警类型" width="78">
                                <template slot-scope="scope">
                                  <div class="imgbox" :style="{'background':scope.row.YJTYPE === 3 ? 'red' : 'yellow'}">
                                  </div>                                 
                                </template>
                            </el-table-column>
                            <el-table-column align="left" label="预警详情" min-width="210">
                                <template slot-scope="scope">
                                    {{ scope.row.YMMEMO }}
                                </template>
                            </el-table-column>
                          </el-table> 
      </div>
      <div ref="rainzzchart" :style="{'width':lwidth+'px','height':(theight*0.35)+'px'}" class="subback">
               
      </div>  
    </div>
    <audio id="audio" controls="controls" hidden :src="audiosrc"></audio>
  </div>
</template>
<script>
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import { setInterval,setTimeout } from "timers";
import { truncateSync } from "fs";
export default {
    data() {
        return {
            theight:window.screen.height,
            subheight2:window.screen.height*0.35,
            tableheight:window.screen.height*0.334*0.9-80,
            subheight1:window.screen.height*0.30,
            subheight3:window.screen.height*0.35,
            lwidth:window.screen.width*0.28125,
            cwidth:window.screen.width*0.4375,
            imgwidth:window.screen.height*2000/1362,
            imgheight:window.screen.height,
            allwidth:window.screen.width,
            leftwidth:window.screen.width*0.28125*0.4,
            videosign:false,
            videotop:(window.screen.height-680)/2,
            videoleft:(window.screen.width-900)/2,
            videosrc:'',
            audiosrc:'audio/warm.mp3',
            showleft:true,
            showright:true,
            form:{},
            rainlist:[],
            sklist:[],
            tabledata:[],
            zdArr:[],
            zdposition:0,
            raindata:[{STNM:'喻家坳',HOURRAIN:1.2+"mm",TODAYRAIN:5.4+"mm"},{STNM:'蒿溪',HOURRAIN:0.5+"mm",TODAYRAIN:1.8+"mm"},{STNM:'梅溪',HOURRAIN:"0.0mm",TODAYRAIN:0.4+"mm"}],
            gatestnm1:'',
            gatestnm2:'',
            centerDialogVisible: false,
            krdate:'',
            yldate:'',
            rivertime:'',
            rvsrrtime:'',
        }
    },
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
      this.chartRealData();
      setInterval(() => {
          this.chartRealData();
        }, 1000*60*5); 
  },
  methods: {
    toggleFullScreen(){
          var el=document.documentElement;
          if(el.requestFullscreen){
              el.requestFullscreen()
            }else if(el.mozRequestFullScreen){
              el.mozRequestFullScreen()
            }else if(el.webkitRequestFullscreen){
              el.webkitRequestFullscreen();    
            }else if(el.msRequestFullscreen){
              el.msRequestFullscreen()            
            }
      },
    //获取仪表图实时数据
    chartRealData(){
      this.axios.get('/guanqu/system/chartdata').then(res => {
          var data=res.data;
          //水库实时数据
          var sslist=data.shishiinfo;
          this.loadRealData(sslist);
          //水情饼状图数据
          var sqtjlist=data.sqtjinfo;
          this.loadWaterData(sqtjlist);
          //雨情饼状图数据
          var yqtjlist=data.yqtjinfo;
          this.loadRainData(yqtjlist);
          //工况故障饼状图数据
          var sbtjlist=data.sbtjinfo;
          this.loadPiechart(sbtjlist);
          //预警站点雨量柱状图数据
          var rainzzt=data.zztrain;
          this.loadRainChart(rainzzt);
          //今日汛情详情数据
          var yjdetail=data.detailinfo;
          this.tabledata=yjdetail;
          this.rowspan();
      });
    },
    rowspan() {
             this.tabledata.forEach((item,index) => {
             if( index === 0){
                 this.zdArr.push(1);
                 this.zdposition=0;
             }else{
                 if(this.tabledata[index].STNM === this.tabledata[index-1].STNM ){
                     this.zdArr[this.zdposition] += 1;
                     this.zdArr.push(0);
                 }else{
                     this.zdArr.push(1);
                    this.zdposition = index;
                 }
             }
         })
       },
       handleSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
             const _row = this.zdArr[rowIndex];
             const _col = _row>0 ? 1 : 0;
             return {
                 rowspan: _row,
                 colspan: _col
             }
         }
    },
    //生成水情饼状图
    loadWaterData(sqlist){
      var echartData={y:{list:[]},titles:[]};     
      for(var i=0;i<sqlist.length;i++){
        var p1=new Object();
        p1.value=sqlist[i].TOTAL;
        p1.name=sqlist[i].TITLE;
        echartData.y.list.push(p1);
        echartData.titles.push(sqlist[i].TITLE);
      }
      this.createPiechart2(echartData);
    },
    //生成雨情饼状图
    loadRainData(yqlist){
      var echartData={y:{list1:[],list2:[]},titles:[]};
            for(var i=0;i<yqlist.length;i++){
              var sbobj=yqlist[i];
              var pobj=new Object();
              pobj.value=sbobj.TOTAL;
              pobj.name=sbobj.TITLE;
              var sign=sbobj.YJSIGN;
              if(sign==-1 || sign==0){
                echartData.y.list1.push(pobj);
                echartData.y.list2.push(pobj);
              }else if(sign==1){
                echartData.y.list1.push(pobj);
              }else{
                echartData.y.list2.push(pobj);
              }
              echartData.titles.push(pobj.name);
            }
            this.createRainPiechart(echartData);
    },
    //重新加载数据
    reloadData(){
      this.loadRealData(false);
    },
    //绘制雨量柱状图
    loadRainChart(datalist){
            var echartData ={x:{list:[]},y1:{list:[]},y2:{list:[]},data:0};
            var maxval=0;
            echartData.data=datalist.length;
            for(var i=0;i<datalist.length;i++){
              echartData.x.list.push(datalist[i].STNM);
              echartData.y1.list.push(datalist[i].P);
              echartData.y2.list.push(datalist[i].HOURP);
              if(parseFloat(datalist[i].P)+parseFloat(datalist[i].HOURP)>maxval) maxval=parseFloat(datalist[i].P)+parseFloat(datalist[i].HOURP);
            }
            if(maxval<5){
              maxval=5;
            }else{
              maxval=Math.ceil(maxval);
            }
            echartData.yAxismax=maxval;
            this.createBorchart(echartData);
    },
    //加载雨量和水库水情实时数据
    loadRealData(sslist){
             this.sklist=sslist;
             for(var i=0;i<sslist.length;i++){
               var skobj=sslist[i];
               document.getElementById("S"+skobj.STCD).className = "waterskdiv";
               if(skobj.ALARM==1){
                 document.getElementById("S"+skobj.STCD).className = "warmskdiv";
               }else if(skobj.RAINALARM==1){
                 document.getElementById("S"+skobj.STCD).className = "rainskdiv";
               }
             }
    },
  //加载工况故障饼状图数据
  loadPiechart(sblist){
            var echartData={y:{list1:[],list2:[]},titles:[]};
            for(var i=0;i<sblist.length;i++){
              var sbobj=sblist[i];
              var pobj=new Object();
              pobj.value=sbobj.TOTAL;
              pobj.name=sbobj.TITLE;
              var sign=sbobj.GZSIGN;
              if(sign==0){
                echartData.y.list1.push(pobj);
                echartData.y.list2.push(pobj);
              }else if(sign==1){
                echartData.y.list1.push(pobj);
              }else{
                echartData.y.list2.push(pobj);
              }
              echartData.titles.push(pobj.name);
            }
            this.createPiechart(echartData); 
  },
    //雨量柱状图
    createBorchart(edata){
        if(edata.data>=1){
        var myChart = this.$echarts.init(this.$refs.rainzzchart);
        var option = {
                title: {
                    text:"预警站点今日降雨柱状图",
                    x: 'left',
                    textStyle: {
                    fontSize: 14,
                    fontWeight: 'bolder',
                    color: '#fff'
                    },
                },
                color: ['#00f6ff','#841DFA'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {  
                left: '2%',   //图表距边框的距离
                right: '1%',
                bottom:'1%',
                containLabel: true,
                show:false
                },
                legend: {
                    data: ['今日降雨量','当前小时降雨量'],
                    x:'right',
                      textStyle:{
                        color:'#fff'
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        splitLine:{show: false},//去除网格线
                        axisTick: {show: false},
                        axisLine: {
                          lineStyle: {
                              type: 'solid',
                              color:'#fff',
                              width:'2'
                          }
                        },
                        data: edata.x.list
                    }
                ],
                yAxis: [
                    {
                        name: '降雨量mm',
                        nameTextStyle: {
                            padding: [0, 0, 0, 14]    // 四个数字分别为上右下左与原位置距离
                        },
                        type: 'value',
                        splitLine:{show: false},//去除网格线
                        minInterval:1,
                        min:0,
                        max:edata.yAxismax,                      
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#fff',
                                width:'2'
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '今日降雨量',
                        barMaxWidth:25,
                        stack: 'one',
                        type: 'bar',
                        barGap: 0,
                        data: edata.y1.list
                    },
                    {
                       name: '当前小时降雨量',
                        barMaxWidth:25,
                        stack: 'one',
                        type: 'bar',
                        barGap: 0,
                        data: edata.y2.list
                    }
                ]
        };
        myChart.setOption(option);
        }else{
          var myChart = this.$refs.rainzzchart;
          myChart.style.display = "flex";
          myChart.style.alignItems = "center";
          myChart.style.justifyContent = "center";
          myChart.innerHTML ="<font style='color:#fff;font-weight:bold;'>今日无预警降雨数据</font>";
        }
    },
    //饼状图
    createPiechart(edata){
    var myChart = this.$echarts.init(this.$refs.piechart);
        // 指定图表的配置项和数据
        var option = {
            // 标题
            title: {
                text: '站点运行工况故障分布图',
                 x: 'center',
                 top: 10,
                 textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color:'#fff'
                  },
            },
            //自定义的颜色
            color:[ '#12d0ff','#ef2424','#FD5A02','#FDC002'],
            // 图例
            legend: {
                data: edata.titles,
                orient: 'vertical',
                x:'right',
                y:'center',
                textStyle:{
                    color:'#fff'
                }
            },
            grid: {  
                bottom:'2%',
            },
            // 数据
            series: [{
                name: '分布情况',
                type: 'pie',
                radius: [0, '38%'],
                center: ['45%', '55%'],
                data: edata.y.list1,
                label: {
                  formatter: function (e) {
                                            let data = e.data;
                                            if (data.value == 0) {
                                                return ''
                                            } else {
                                                return `${data.name}:\n${data.value}(${e.percent}%)`
                                            }
                                        },
                  position: 'inner',
                  fontSize: 12
                },
                labelLine: {
                  show: false
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    normal:{ 
                        // 设置扇形的阴影
                        shadowBlur: 30,
                        shadowColor: 'rgba(6,121,159,0.8)', 
                        shadowOffsetX: -10,
                        shadowOffsetY: 10
                    }
                } 
            },
            {
                name: '故障',
                type: 'pie',
                radius: ['55%', '80%'],
                center: ['45%', '55%'],
                label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    }
                }
            },
            labelLine: {
                normal: {
                    smooth: 0.2,
                    length: 2
                }
            },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    normal:{ 
                        label:{ 
                            formatter: function (e) {
                                            let data = e.data;
                                            if(data.name=="正常"){
                                              return ''
                                            }else if (data.value == 0) {
                                                return ''
                                            } else {
                                                return `${data.name}:${data.value}(${e.percent}%)`
                                            }
                                        },
                            position: 'inner',
                        }, 
                        // 设置扇形的阴影
                        shadowBlur: 30,
                        shadowColor: 'rgba(6,121,159,0.8)', 
                        shadowOffsetX: -10,
                        shadowOffsetY: 10
                    }
                },
                data: edata.y.list2
              }
            ]
        };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);       
    },
    //饼状图
    createRainPiechart(edata){
    var myChart = this.$echarts.init(this.$refs.firstchart);
        // 指定图表的配置项和数据
        var option = {
            // 标题
            title: {
                text: '站点降雨预警分布图',
                 x: 'center',
                 top: 10,
                 textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color:'#fff'
                  },
            },
            //自定义的颜色
            color:['#12d0ff','#ef2424','#FCFC02','#FFA500','#FF0000'],
            // 图例
            legend: {
                data: edata.titles,
                orient: 'vertical',
                x:'right',
                y:'center',
                textStyle:{
                    color:'#fff'
                }
            },
            grid: {  
                bottom:'2%',
            },
            // 数据
            series: [{
                name: '分布情况',
                type: 'pie',
                radius: [0, '38%'],
                center: ['45%', '55%'],
                data: edata.y.list1,
                label: {
                   formatter: function (e) {
                                            let data = e.data;
                                            if (data.value == 0) {
                                                return ''
                                            } else {
                                                return `${data.name}:\n${data.value}(${e.percent}%)`
                                            }
                                        },
                  position: 'inner',
                  fontSize: 12
                },
                labelLine: {
                  show: false
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    normal:{ 
                        // 设置扇形的阴影
                        shadowBlur: 30,
                        shadowColor: 'rgba(6,121,159,0.8)', 
                        shadowOffsetX: -10,
                        shadowOffsetY: 10
                    }
                } 
            },
            {
                name: '预警',
                type: 'pie',
                radius: ['55%', '80%'],
                center: ['45%', '55%'],
                label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    }
                }
            },
            labelLine: {
                normal: {
                    smooth: 0.2,
                    length: 2
                }
            },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    normal:{ 
                        label:{ 
                            formatter: function (e) {
                                            let data = e.data;
                                            if(data.name=="正常"){
                                              return ''
                                            }else if (data.value == 0) {
                                                return ''
                                            } else {
                                                return `${data.name}:${data.value}(${e.percent}%)`
                                            }
                                        },
                            position: 'inner',
                        }, 
                        // 设置扇形的阴影
                        shadowBlur: 30,
                        shadowColor: 'rgba(6,121,159,0.8)', 
                        shadowOffsetX: -10,
                        shadowOffsetY: 10
                    }
                },
                data: edata.y.list2
              }
            ]
        };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);       
    },
    //饼状图
    createPiechart2(edata){
    var myChart = this.$echarts.init(this.$refs.secondchart);
        // 指定图表的配置项和数据
        var option = {
            // 标题
            title: {
                text: '站点水位超汛限预警分布图',
                 x: 'center',
                 top: 10,
                 textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color:'#fff',
                  },
            },
            //自定义的颜色
            color:[ '#12d0ff','#ef2424'],
            // 图例
            legend: {
                data: edata.titles,
                orient: 'vertical',
                x:'right',
                y:'center',
                textStyle:{
                    color:'#fff'
                }
            },
            grid: {  
                bottom:'2%',
            },
            // 数据
            series: [{
                name: '分布情况',
                type: 'pie',
                radius : '71%',
                center: ['51%', '56%'],
                data: edata.y.list,
                 label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    normal:{ 
                        label:{ 
                            show: true, 
                            formatter: '{b}:{c}({d}%)'
                        }, 
                        labelLine :{show:true},
                        // 设置扇形的阴影
                        shadowBlur: 30,
                        shadowColor: 'rgba(6,121,159,0.8)', 
                        shadowOffsetX: -10,
                        shadowOffsetY: 10
                    }
                } 
            }
            ]
        };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);           
    },
  //显示水库信息
  showskinfo(stcd){
    this.form=new Object();
      for(var i=0;i<this.sklist.length;i++){
        var skobj=this.sklist[i];
        if(skobj.STCD==stcd){
          this.form=skobj;
          break;
        }
      }
  },
  //2小时水位变化提示预警
  showwarmzinfo(){
    this.axios.get('/fieldinfo/getchangeinfo').then(res => {
             var dataobj=res.data;
             var riverobj=dataobj.changeriver;
             var rivername=riverobj[0].STNM;
             var rivertm=riverobj[0].TM;
             var riverupz=parseInt(parseFloat(riverobj[0].UPZ)*100);
             var riverdownz=parseInt(parseFloat(riverobj[0].DOWNZ)*100);
             var rsvrrobj=dataobj.changersvrr;   
             var rsvrrname=rsvrrobj[0].STNM;
             var rsvrrtm=rsvrrobj[0].TM;
             var rsvrruprz=parseInt(parseFloat(rsvrrobj[0].UPRZ)*100);
             var rsvrrdownrz=parseInt(parseFloat(rsvrrobj[0].DOWNRZ)*100);
             var showtext='';
             var showsign=5.00;
             if(rsvrruprz>=showsign && this.rvsrrtime!=rsvrrtm){
               showtext+='<strong>当前库水位2小时内上涨超过'+rsvrruprz+'cm</strong></br>';
             }
             if(rsvrrdownrz>=showsign && this.rvsrrtime!=rsvrrtm){
               showtext+='<strong>当前库水位2小时内下降超过'+rsvrrdownrz+'cm</strong></br>';
             }  
             if(riverupz>=showsign && this.rivertime!=rivertm){
               showtext+='<strong>当前河道水位2小时内上涨超过'+riverupz+'cm</strong></br>';
             }
             if(riverdownz>=showsign && this.rivertime!=rivertm){
               showtext+='<strong>当前河道水位2小时内下降超过'+riverdownz+'cm</strong></br>';
             }
             if(showtext!=''){
               this.$notify({
                  title: '水位预警',
                  dangerouslyUseHTMLString: true,
                  message: showtext,
                  type: 'warning',
                  position: 'bottom-right',
                  duration:4*60*1000,
                  onClose:function(){
                    var audio=document.getElementById("audio");
                    audio.pause(); // 停止
                    audio.loop="false";
                  }
                });
              var audio=document.getElementById("audio");
              audio.loop="loop";
              audio.play();
              this.rivertime=rivertm;
              this.rvsrrtime=rsvrrtm;
             }

    });
  },
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
 },
  JsGuid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
           this.s4() + '-' + this.s4() + this.s4() + this.s4();
  },
  //显示视频
  showvideo(puid){
      if (!!window.ActiveXObject || "ActiveXObject" in window){
         try
          {
            var obj = new ActiveXObject("DPSDK_OCX.DPSDK_OCXCtrl.1");
          }
          catch(e)
          {
            this.$message({message:'控件未注册，请先注册控件！',type:'warning'});
            var url = '/file/downloadocx';
            window.location.href = url;
            return;
          }
      }else{
        this.$message({message:'请确保在IE浏览器下使用视频监控功能！',type:'warning'});
        return;
      }
      this.videosign=true;
      this.videosrc="webdemoks/index.html?"+puid;
      
    },
  hidediv(){
      this.videosign=false;
    },
    switchleft(){
    this.showleft=!this.showleft;
    if(this.showleft){
      this.$refs.switchleft.style.left=this.lwidth+'px';
    }else{
      this.$refs.switchleft.style.left='0px';
    }
  },
  switchright(){
    this.showright=!this.showright;
    if(this.showright){
      this.$refs.switchright.style.right=this.lwidth+'px';
    }else{
      this.$refs.switchright.style.right='0px';
    }
  },
 },
}
</script>
<style lang="less" scope>
.ivu-page.mini{
  .ivu-page-prev{
    margin-right:4px;
    opacity:0.85;
  }
  .ivu-page-item{
    margin-right:4px;
    opacity:0.85;
    color: #3A3C3E;   
    font-size: 11px;
    &.ivu-page-item-active{
      font-weight: bold;
      opacity:0.9;
    }
  }
  .ivu-page-next{
    opacity:0.85;
  }
}
 .imgbox{
width:18px;
height:18px;
margin-left:20px;
line-height: 18px;
border-radius: 50%;//圆角百分比
}
.backdiv{
width:100%;
height: 100vh;
margin: 0 auto;
background:;
background: linear-gradient(to bottom, #0068DE, #11C9FD);
  background: -ms-linear-gradient(top, #0068DE, #11C9FD);
  background: -webkit-linear-gradient(top, #0068DE, #11C9FD);
  background: -moz-linear-gradient(top, #0068DE, #11C9FD);
background-repeat: no-repeat;
background-size: cover;
overflow: hidden;
position: relative;
}
.mapdiv{
position:absolute;
background-image: url(../common/image/map.png);
background-repeat: no-repeat;
background-size: cover;
z-index: 2;
}
.subback{
  opacity:0.9;
  background: linear-gradient(to bottom, #1C8173, #0E4F47);
  background: -ms-linear-gradient(top, #1C8173, #0E4F47);
  background: -webkit-linear-gradient(top, #1C8173, #0E4F47);
  background: -moz-linear-gradient(top, #1C8173, #0E4F47);
  box-shadow: 0 0 1px #fff;
}
.raindiv{
  width:16px;
  height:16px;
  background:url(../common/image/rain.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.waterraindiv{
  width:16px;
  height:16px;
  background:url(../common/image/waterrain.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.warmraindiv{
  width:16px;
  height:16px;
  background:url(../common/image/warmrain.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.tworaindiv{
  width:16px;
  height:16px;
  background:url(../common/image/tworain.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.threeraindiv{
  width:16px;
  height:16px;
  background:url(../common/image/threerain.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.skdiv{
  width:16px;
  height:16px;
  background:url(../common/image/sk.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.waterskdiv{
  width:16px;
  height:16px;
  background:url(../common/image/watersk.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.warmskdiv{
  width:16px;
  height:16px;
  background:url(../common/image/warmsk.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.rainskdiv{
  width:16px;
  height:16px;
  background:url(../common/image/rainskw.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.hddiv{
  width:16px;
  height:16px;
  background:url(../common/image/hd.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.waterhddiv{
  width:16px;
  height:16px;
  background:url(../common/image/waterhd.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.warmhddiv{
  width:16px;
  height:16px;
  background:url(../common/image/warmhd.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.qddiv{
  width:16px;
  height:16px;
  background:url(../common/image/qd.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.waterqddiv{
  width:16px;
  height:16px;
  background:url(../common/image/waterqd.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.warmqddiv{
  width:16px;
  height:16px;
  background:url(../common/image/warmqd.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.videodiv{
width:100%;
height: 100vh;
top: 0;
left: 0;
background: #166CC7;
position:absolute;
z-index:20;
opacity:0.85;
}
.switch {
    position: absolute;
    left: 28.125%;
    top:50%;
    width: 15px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #EAFCF9;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: #147063 2px solid;
    border-left: 0;

    &:hover {
      filter: brightness(1.1);
    }
  }
.switchright{
  position: absolute;
    right:28.125%;
    top:50%;
    width: 15px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #EAFCF9;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: #147063 2px solid;
    border-right: 0;

    &:hover {
      filter: brightness(1.1);
    }
}
.el-table{
        background: linear-gradient(to bottom, #1D8175, #0E4F47);
        background: -ms-linear-gradient(top, #1D8175, #0E4F47);
        background: -webkit-linear-gradient(top, #1D8175, #0E4F47);
        background: -moz-linear-gradient(top, #1D8175, #0E4F47);
        opacity: 1;
    }
.el-table th { color:#fff;background-color: #156A5F;}
.el-table td { color:#fff;background-color: #026F60;height:35px;}
.el-table__empty-text {
color:#fff;
} 
.el-table tbody tr:hover>td {
    background-color: #156A5F!important;
    }
ul li {
 float: left;
 list-style-type: none;
 font-size: 14px;
 color: #FFFFFF;
 position: relative;
 line-height:40px;
 text-align:center;
 border: solid 1px white;
 border-bottom-width: 0px;
 border-right-width: 0px;
 border-left-width: 0px;
 background-color: #055CC8;
}
ul li ul li {
 float: left;
 width: 50%;
 white-space: nowrap;
 overflow: hidden;
 display: inline;
  line-height:35px;
 background-color: #0162DB;opacity: 1;
}
.gz_detail {
  color:#fff;
  font-size: 12px;
  opacity:0.8;
  th{
    border-top: none;
    height: 22px;
    border-color: #fff;
    background-color: #055CC8;
  }
 td {
    border-top: none;
    height: 20px;
    border-color: #fff;
    background-color: #0162DB;
  }
  tr:last-child{
    td{
      border-bottom: none;
    } 
  }
   .dt_name {
    border-left: none;
  }

  .dt_vale {
    border-right: none;
    border-left: none;
  }
}
</style>