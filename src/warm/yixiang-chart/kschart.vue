<template>
  <div id="clickMe" class="backdiv" @dblclick="toggleFullScreen()">
    <img src="../common/image/ksmapnosite.png" :style="{'width':imgwidth+'px','height':imgheight+'px','position':'absolute','top':'0px','left':leftwidth+'px'}"></img>
      <div ref="left" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','left':'0px'}" v-show="showleft">
        <div ref="line" :style="{'width':lwidth+'px','height':theight+'px'}">
            <div id="firstchart" :style="{'width':lwidth+'px','height':(subheight2-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div id="secondchart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div id="threechart" :style="{'width':lwidth+'px','height':(subheight1)+'px'}" class="subback"></div>
        </div>
    </div>
    <div ref="center" :style="{'display':'inline-block','height':theight+'px','width':cwidth+'px','z-index':'3','margin-left':lwidth+'px'}">
      <div style="color:#fff;text-shadow:5px 2px 6px #000;text-align:center;z-index:10;position:relative;top:25px;"><h1>康苏水情测报系统</h1></div>
      <div class="switch" @click="switchleft" ref="switchleft">
          <i class="el-icon-d-arrow-left" v-if="showleft"></i>
          <i class="el-icon-d-arrow-right" v-if="!showleft"></i>
        </div>
      <div class="switchright" @click="switchright" ref="switchright">
          <i class="el-icon-d-arrow-left" v-if="!showright"></i>
          <i class="el-icon-d-arrow-right" v-if="showright"></i>
        </div>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>雨量：</td><td>{{form.P}}mm</td></tr><tr><td colspan="2">{{form.ALARMCONTENT}}</td></tr></table>
      <div slot="reference" :style="{'left':(782/2000*imgwidth+leftwidth)+'px','top':(imgheight*(584/1362))+'px'}" class="raindiv" @mouseover="showraininfo('6530240001')" id="R6530240001"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>雨量：</td><td>{{form.P}}mm</td></tr><tr><td colspan="2">{{form.ALARMCONTENT}}</td></tr></table>
      <div slot="reference" :style="{'left':(1114/2000*imgwidth+leftwidth)+'px','top':(imgheight*(856/1362))+'px'}" class="raindiv" @mouseover="showraininfo('6530240003')" id="R6530240003"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>雨量：</td><td>{{form.P}}mm</td></tr><tr><td colspan="2">{{form.ALARMCONTENT}}</td></tr></table>
      <div slot="reference" :style="{'left':(1333/2000*imgwidth+leftwidth)+'px','top':(imgheight*(1154/1362))+'px'}" class="raindiv" @mouseover="showraininfo('6530240002')" id="R6530240002"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水位：</td><td>{{form.Z}}m</td></tr><tr><td>距警戒：</td><td>{{form.JL}}m</td></tr></table>
      <div slot="reference" :style="{'left':(1126/2000*imgwidth+leftwidth)+'px','top':(imgheight*(868/1362))+'px'}" class="hddiv" @mouseover="showhdinfo('6530240003')" id="H6530240003"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水位：</td><td>{{form.RZ}}m</td></tr><tr><td>距汛限：</td><td>{{form.JL}}m</td></tr></table>
      <div slot="reference" :style="{'left':(1321/2000*imgwidth+leftwidth)+'px','top':(imgheight*(1174/1362))+'px'}" class="skdiv" @mouseover="showskinfo('6530240002')" id="S6530240002"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1308/2000*imgwidth+leftwidth)+'px','top':(imgheight*(1197/1362))+'px'}" class="qddiv" @mouseover="showcanalinfo('6530240007')" id="6530240007"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1308/2000*imgwidth+leftwidth)+'px','top':(imgheight*(1218/1362))+'px'}" class="qddiv" @mouseover="showcanalinfo('6530240004')" id="6530240004"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1330/2000*imgwidth+leftwidth)+'px','top':(imgheight*(1196/1362))+'px'}" class="qddiv" @mouseover="showcanalinfo('6530240005')" id="6530240005"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1332/2000*imgwidth+leftwidth)+'px','top':(imgheight*(1218/1362))+'px'}" class="qddiv" @mouseover="showcanalinfo('6530240006')" id="6530240006"></div>
      </el-popover>
    </div>
    <div ref="right" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','right':'0px'}" v-show="showright">
      <div ref="table" :style="{'width':lwidth+'px','height':(subheight2-1)+'px','margin-top':'1px','text-align':'center'}" class="subback">
        <div style="color:#fff;font-size:14px;font-weight:bold;padding-top:10px;padding-bottom:10px;">今日闸门开度流量</div>
        <el-table
                            :data="tabledata"
                            border
                            :height="tableheight"
                            v-loading="loading"
                            row-style="height:45px"
                            style="width:90%;margin-left:5%;">
                            <el-table-column
                              prop="STNM"
                              label="站点名称"
                              align="center"
                              min-width="120"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="OD"
                              label="闸门开度(m)"
                              align="center"
                              min-width="100"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="Q"
                              label="流量(m³/s)"
                              align="center"
                              min-width="100"
                              >
                            </el-table-column>
                          </el-table> 
      </div>
      <div ref="piechart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px','margin-top':'1px'}" class="subback"></div>
        <div ref="imgsite" :style="{'width':lwidth+'px','height':subheight1+'px','padding-top':'5px'}" class="subback">
            <div :style="{'margin-left':(lwidth*0.0183)+'px','margin-right':(lwidth*0.0183)+'px','width':(lwidth*0.2134)+'px','margin-top':'8px','display':'inline-block','float':'left','text-align':'center'}" v-for="item in imglist">   
                <img :style="{'width':(theight*0.072)+'px','height':(theight*0.07)+'px','cursor':'pointer'}" src="../common/image/shipin.png" @click="show(item.stcd)"></img>
                <div :style="{'width':(lwidth*0.2134)+'px','height':(theight*0.02-3)+'px','margin-bottom':'3px','color':'#fff','font-family':'微软雅黑','font-size':'12px','font-weight':'bold'}">{{item.stnm}}</div>            
            </div>
        </div>
        
    </div>
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
            imglist:[],
            theight:window.screen.height,
            subheight2:window.screen.height*0.334,
            tableheight:window.screen.height*0.334-80,
            subheight1:window.screen.height*0.333,
            lwidth:window.screen.width*0.28125,
            cwidth:window.screen.width*0.4375,
            imgwidth:window.screen.height*2000/1362,
            imgheight:window.screen.height,
            allwidth:window.screen.width,
            leftwidth:window.screen.width*0.28125*0.4,
            showleft:true,
            showright:true,
            form:{},
            canallist:[],
            rainlist:[],
            hdlist:[],
            sklist:[],
            tabledata:[],
        }
    },
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
      this.loadRealData();
      this.loadRain();
      this.loadSwkrline();
      this.loadline(); 
      this.loadGateData(); 
      this.loadImgdata();
      this.loadPiechart();  
      setInterval(() => {
          this.reloadData();
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
    //重新加载数据
    reloadData(){
      this.loadRealData();
      this.loadRain();
      this.loadSwkrline();
      this.loadline(); 
      this.loadGateData(); 
      this.loadImgdata();
      this.loadPiechart();
    },
    //绘制雨量柱状图
    loadRain(){
      var now=new Date();
      var emonth=now.getMonth()+1;if(emonth<10){emonth="0"+emonth;}
      var eday=now.getDay();if(eday<10){eday="0"+eday;}
      var ehour=now.getHours();if(ehour<10){ehour="0"+ehour;}
      var endtime=now.getFullYear()+"-"+emonth+"-"+eday+" "+ehour+":00:00";
      var before=new Date(now.getTime() - 23 * 60 * 60 * 1000);
      var bmonth=before.getMonth()+1;if(bmonth<10){bmonth="0"+bmonth;}
      var bday=before.getDay();if(bday<10){bday="0"+bday;}
      var bhour=before.getHours();if(bhour<10){bhour="0"+bhour;}
      var begintime=before.getFullYear()+"-"+bmonth+"-"+bday+" "+bhour+":00:00";
      this.axios.get('/'+this.$WarmTable+'/fieldinfo/raindata',{params:{begintime:begintime,endtime:endtime}}).then(res => {
            var datalist=res.data;
            var echartData ={x:new Object(),y1:new Object(),y2:new Object(),y3:new Object(),data:0};
            echartData.x.list=FilterMethods.methods.newArrayByObjArray(datalist, "DT", val => { // 过滤
                        return val.split(" ")[1];
                    });
            var num=0;
            echartData.y1.list=FilterMethods.methods.newArrayByObjArray(datalist, "RAIN1", val => { // 过滤
                        num+=val;
                        return parseFloat(val).toFixed(1);
                    });
            echartData.y2.list=FilterMethods.methods.newArrayByObjArray(datalist, "RAIN2", val => { // 过滤
                        num+=val;
                        return parseFloat(val).toFixed(1);
                    });
            echartData.y3.list=FilterMethods.methods.newArrayByObjArray(datalist, "RAIN3", val => { // 过滤
                        num+=val;
                        return parseFloat(val).toFixed(1);
                    });
            if(num>0){
              echartData.data=1;
            }
            this.createBorchart(echartData);
        });
    },
    //绘制水位库容曲线
    loadSwkrline(){
      this.axios.get('/'+this.$WarmTable+'/fieldinfo/swkrdata').then(res => {
            var datalist=res.data;
            var echartData ={x:new Object(),y:new Object()};
            echartData.x.list=FilterMethods.methods.newArrayByObjArray(datalist, "STCP", val => { // 过滤
                        return parseFloat(val).toFixed(2);
                    });
            echartData.y.list=FilterMethods.methods.newArrayByObjArray(datalist, "WL", val => { // 过滤
                        return parseFloat(val).toFixed(2);
                    });
            this.createLinechart(echartData);
        });
    },
    //绘制水位流量线性图
    loadline(){
      var body3={
          STCD: '6530240003',
          _page_size: 999999
      };
      var DTT = this.$FilterData
              .elDatePicker_Filter(this.$App.zeroPointToNowOfTheDay())
              .split(",");
      body3.Time_min = DTT[1];
      body3.Time_max = DTT[2];
      this.$GetData.Survey_History_HDSQ(
        "historyTable",
        body3,
        {
          default: true
        },
        data => {
          this.createChart('threechart', data.data,'入库流量站');
        }
      );
    },
    //查询闸门开度信息
    loadGateData(){
      var now=new Date();
      var month=now.getMonth()+1;if(month<10){month="0"+month;}
      var day=now.getDay();if(day<10){day="0"+day;}
      var begintime=now.getFullYear()+"-"+month+"-"+day;
      this.axios.get('/'+this.$WarmTable+'/fieldinfo/gatedata',{params:{begintime:begintime}}).then(res => {
            this.tabledata=res.data;
        });
    },
    //加载渠道和闸阀水情实时数据
    loadRealData(){
       this.axios.get('/'+this.$WarmTable+'/fieldinfo/getksrinfo').then(res => {
             var obj=res.data;
             this.canallist=obj.typecanal;
             for(var i=0;i<this.canallist.length;i++){
              var canalobj=this.canallist[i];
              if(canalobj.Z>0){
                document.getElementById(canalobj.STCD).className = "waterqddiv";
              }
              if(canalobj.ALARM==1){
                document.getElementById(canalobj.STCD).className = "warmqddiv";
              }
            }
             this.rainlist=obj.typerain;
             for(var i=0;i<this.rainlist.length;i++){
               var rainobj=this.rainlist[i];
               if(rainobj.P>0){
                 document.getElementById("R"+rainobj.STCD).className = "waterraindiv";
               }
               if(rainobj.ALARMLEVEL==3){
                 document.getElementById("R"+rainobj.STCD).className = "threeraindiv";
               }
               if(rainobj.ALARMLEVEL==2){
                 document.getElementById("R"+rainobj.STCD).className = "tworaindiv";
               }
               if(rainobj.ALARMLEVEL==1){
                 document.getElementById("R"+rainobj.STCD).className = "warmraindiv";
               }
             }
             this.hdlist=obj.typehd;
             for(var i=0;i<this.hdlist.length;i++){
               var hdobj=this.hdlist[i];
               if(hdobj.Z>0){
                 document.getElementById("H"+hdobj.STCD).className = "waterhddiv";
               }
               if(hdobj.ALARM==1){
                 document.getElementById("H"+hdobj.STCD).className = "warmhddiv";
               }
             }
             this.sklist=obj.typesk;
             for(var i=0;i<this.sklist.length;i++){
               var skobj=this.sklist[i];
               if(skobj.RZ>0){
                 document.getElementById("S"+skobj.STCD).className = "waterskdiv";
               }
               if(skobj.ALARM==1){
                 document.getElementById("S"+skobj.STCD).className = "warmskdiv";
               }
             }
         });
    },
    //加载视频站数据
    loadImgdata(){
      this.imglist=[];
        this.axios.get('/'+this.$WarmTable+'/fieldinfo/videodata').then(res => {
            var list=res.data;
            for(var i=0;i<list.length;i++){
                    var img_obj=new Object();
                    img_obj.stnm=list[i].STNM;
                    img_obj.stcd=list[i].STCD;
                    this.imglist.push(img_obj);
            }
        });
    },
  //加载饼状图
  loadPiechart(){
      this.axios.get('/'+this.$WarmTable+'/fieldinfo/piechart').then(res => {
            var list=res.data;
            var echartData={y:{list:[]}};
            if(list.length==1){
                if(list[0].CS==0){
                    var p1=new Object();
                    p1.value=list[0].TOTAL;
                    p1.name=list[0].TITLE;
                    echartData.y.list.push(p1);
                    var p2=new Object();
                    p2.value=0;
                    p2.name="正常";
                    echartData.y.list.push(p2);
                }else{
                    var p2=new Object();
                    p2.value=0;
                    p2.name="故障";
                    echartData.y.list.push(p2);
                    var p1=new Object();
                    p1.value=list[0].TOTAL;
                    p1.name=list[0].TITLE;
                    echartData.y.list.push(p1);                   
                }
            }else if(list.length>1){
                for(var h=0;h<list.length;h++){
                    var p_obj=new Object();
                    p_obj.value=list[h].TOTAL;
                    p_obj.name=list[h].TITLE;
                    echartData.y.list.push(p_obj);
                }               
            }
            this.createPiechart(echartData);
        });
  },
    // 水位流量线性图
    createChart(id, data,stnm) {
      if (data.length > 0) {
        var echartData = this.$App.transform_QDSQ_data_into_ehart_data(
          data,
          "historyTable"
        );
        // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        var x_List = echartData.x.list
        .map((val, index, array) => {
          // 时间过滤
          var time = val.split(" ");
          return time[1];
        });
        myChart = this.$echarts.init(document.getElementById(id));

        myChart.setOption({
          title: {
            text: stnm+"今日水情图",
             textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#fff'
            },
          },
          backgroundColor:'',
          tooltip: {
            trigger: "axis",
          },
          color:['#f6ff00','#00ffa2'],
          legend: {
            icon : 'roundRect',//icon为圆角矩形          
            data: [echartData.y1.name, echartData.y2.name],
            x: "right",
            textStyle:{
               color:'#fff'
           }
          },
          grid: {  
                left: '2%',   //图表距边框的距离
                right: '2%',
                bottom:'1%',
                containLabel: true,
                backgroundColor:'rgba(280,280,280,0.4)',
                show:true
            },
          animation: false,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: x_List,
              splitLine:{show: false},//去除网格线
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'2'
                   }
               },
              axisTick: {
                interval: function(index, val) {
                  var listLength = echartData.x.list.length;
                  if (listLength >= 4) {
                    var tick = Math.round(listLength / 4);
                    if ((index + 1) % tick === 0) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return true;
                  }
                },
                length: 10
              },
              axisLabel: {
                interval: function(index, val) {
                  var listLength = echartData.x.list.length;
                  if (listLength >= 4) {
                    var tick = Math.round(listLength / 4);
                    let a = (index + 1) % tick;
                    if ((index + 1) % tick === 0) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return true;
                  }
                },
                rotate: 1,
                margin: 16,
                textStyle: {
                       color: '#fff'
                   }
              }
            }
          ],
          yAxis: [
            {
              name: `${echartData.y1.name} m³/s`,
              type: "value",             
              splitLine:{show: false},//去除网格线
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'2'
                   }
               },
              axisLabel: {
                formatter: "{value} ",
                textStyle: {
                       color: '#fff'
                   }
              },
              scale: true
            },
            {
              name: `${echartData.y2.name}m`,
              type: "value",
              splitLine:{show: false},//去除网格线
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'2'
                   }
               },
              axisLabel: {
                formatter: "{value} ",
                textStyle: {
                       color: '#fff'
                   }
              },
              scale: true
            }
          ],
          series: [
            {
              name: echartData.y1.name,
              type: "line",
              data: echartData.y1.list,
              symbol: 'none',
              smooth:true,
              itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'#f6ff00',
                                        width:2,
                                        opacity:1
                                    }  
                                }  
                            },
            },
            {
              name: echartData.y2.name,
              type: "line",
              data: echartData.y2.list,
              yAxisIndex: 1,
              symbol: 'none',
              smooth:true,
              itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'#00ffa2',
                                        width:2,
                                        opacity:1
                                    }  
                                }  
                            },
            }
          ]
        });
      } else {
        var myChart = document.getElementById(id);
        myChart.style.display = "flex";
        myChart.style.alignItems = "center";
        myChart.style.justifyContent = "center";
        myChart.innerHTML ="<font style='color:#fff;font-weight:bold;'>"+stnm+"暂无今天数据</font>";
      }
    },
    //水位库容曲线
    createLinechart(echartData){
      if (echartData.x.list.length > 0) {
        myChart = this.$echarts.init(document.getElementById("secondchart"));
        myChart.setOption({
          title: {
            text: "康苏水库水位库容曲线",
             textStyle: {
              fontSize: 14,
              fontWeight: 'bolder',
              color: '#fff'
            },
          },
          legend: {
            icon : 'roundRect',//icon为圆角矩形          
            data: ['水位'],
            x: "right",
            textStyle:{
               color:'#fff'
           }
          },
          backgroundColor:'',
          tooltip: {
            trigger: "axis",
          },
          color:['#f6ff00'],
          grid: {  
                left: '1%',   //图表距边框的距离
                right: '2%',
                bottom:'1%',
                backgroundColor:'rgba(280,280,280,0.4)',
                show:true,
                containLabel: true,
            },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: echartData.x.list,
              splitLine:{show: false},//去除网格线
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'2'
                   }
               },
              axisTick: {
                interval: function(index, val) {
                  var listLength = echartData.x.list.length;
                  if (listLength >= 4) {
                    var tick = Math.round(listLength / 4);
                    if ((index + 1) % tick === 0) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return true;
                  }
                },
              },
              axisLabel: {
                interval: function(index, val) {
                  var listLength = echartData.x.list.length;
                  if (listLength >= 4) {
                    var tick = Math.round(listLength / 4);
                    let a = (index + 1) % tick;
                    if ((index + 1) % tick === 0) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    return true;
                  }
                },
                rotate: 1,
                margin: 16,
                textStyle: {
                       color: '#fff'
                   }
              }
            }
          ],
          yAxis: [
            {
              name:'水位m',
              type:'value',             
              splitLine:{show: false},//去除网格线
              axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#fff',
                       width:'2'
                   }
               },
              axisLabel: {
                formatter: "{value} ",
                textStyle: {
                       color: '#fff'
                   }
              },
              scale: true
            }
          ],
          series: [
            {
              name:'水位',
              type: 'line',
              data: echartData.y.list,
              symbol: 'none',
              smooth:true,
              itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'#f6ff00',
                                        width:2,
                                        opacity:1
                                    }  
                                }  
                            },
            }
          ]
        });
      } else {
        var myChart = document.getElementById("secondchart");
        myChart.style.display = "flex";
        myChart.style.alignItems = "center";
        myChart.style.justifyContent = "center";
        myChart.innerHTML ="<font style='color:#fff;font-weight:bold;'>康苏水库暂无水位库容数据</font>";
      }
    },
    //雨量柱状图
    createBorchart(edata){
        if(edata.data==1){
        var myChart = this.$echarts.init(document.getElementById("firstchart"));
        var option = {
                title: {
                    text:"24小时降雨柱状图",
                    textStyle: {
                    fontSize: 14,
                    fontWeight: 'bolder',
                    color: '#fff'
                    },
                },
                color: ['#00f6ff', '#06F806', '#f6ff00'],
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
                    data: ['预警雨量站', '坝上雨量水位站', '入库流量站'],
                    x: "right",
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
                        type: 'value',
                        splitLine:{show: false},//去除网格线
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
                        name: '预警雨量站',
                        type: 'bar',
                        barGap: 0,
                        data: edata.y1.list
                    },
                    {
                        name: '坝上雨量水位站',
                        type: 'bar',
                        data: edata.y2.list
                    },
                    {
                        name: '入库流量站',
                        type: 'bar',
                        data: edata.y3.list
                    }
                ]
        };
        myChart.setOption(option);
        }else{
          var myChart = document.getElementById("firstchart");
          myChart.style.display = "flex";
          myChart.style.alignItems = "center";
          myChart.style.justifyContent = "center";
          myChart.innerHTML ="<font style='color:#fff;font-weight:bold;'>暂无24小时降雨数据</font>";
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
            color:[  '#ef2424','#12d0ff'],
            // 图例
            legend: {
                data: ['正常','故障'],
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
                radius : '65%',
                center: ['50%', '55%'],
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
                            formatter: '{b} : {c} ({d}%)',
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
    show(stcd){
      let overdiv=this.$refs.over;
      let imgEl=document.createElement("img");
      imgEl.style.position='fixed';
      imgEl.style.cursor="pointer";
      imgEl.style.height=(this.theight*0.64)+'px';
      imgEl.style.width=this.lwidth+'px';
      for(var i=0;i<this.imglist.length;i++){
         var imgobj=this.imglist[i];
         if(imgobj.stcd==stcd){
           imgEl.src=imgobj.path;
           break;
         }
      }
      overdiv.appendChild(imgEl);
      this.coverLayer(1);
      imgEl.onclick = (e) => {
        this.coverLayer(0);
      }
    },
    coverLayer(tag){
      var overdiv=this.$refs.over;
      if(tag==1){
          overdiv.style.display="block";
          overdiv.style.opacity=1;
          overdiv.style.zIndex='100';
          overdiv.style.backgroundColor="#FFFFFF";
          overdiv.style.backgroundColor="rgba(0,0,0,0.7)";
      }else{
         overdiv.innerHTML='';
         overdiv.style.zIndex='0';
          overdiv.style.display="none";
      }
    },
    //显示渠道信息
  showcanalinfo(stcd){
      this.form=new Object();
      for(var i=0;i<this.canallist.length;i++){
        var canalobj=this.canallist[i];
        if(canalobj.STCD==stcd){
          this.form=canalobj;
          break;
        }
      }
  },
  //显示雨量信息
  showraininfo(stcd){
    this.form=new Object();
      for(var i=0;i<this.rainlist.length;i++){
        var rainobj=this.rainlist[i];
        if(rainobj.STCD==stcd){
          this.form=rainobj;
          break;
        }
      }
  },
  //显示河道信息
  showhdinfo(stcd){
    this.form=new Object();
      for(var i=0;i<this.hdlist.length;i++){
        var hdobj=this.hdlist[i];
        if(hdobj.STCD==stcd){
          this.form=hdobj;
          break;
        }
      }
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
.backdiv{
width:100%;
height: 100vh;
margin: 0 auto;
background-image: url(../common/image/backpic.jpg);
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
  background: linear-gradient(top, #177DE7, #1768BD);
  background: -ms-linear-gradient(top, #177DE7, #1768BD);
  background: -webkit-linear-gradient(top, #177DE7, #1768BD);
  background: -moz-linear-gradient(top, #177DE7, #1768BD);
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
    background: #BEDEFF;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: #1B74D0 2px solid;
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
    background: #BEDEFF;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: #1B74D0 2px solid;
    border-right: 0;

    &:hover {
      filter: brightness(1.1);
    }
}
.el-table{
        background-color: #0162DB;opacity: 1;
    }
.el-table th { color:#fff;background-color: #055CC8;}
.el-table td { color:#fff;background-color: #0162DB;}
.el-table__empty-text {
color:#fff;
} 
</style>