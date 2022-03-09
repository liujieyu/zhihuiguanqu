<template>
  <div id="clickMe" class="backdiv" @dblclick="toggleFullScreen()">
    <img src="../common/image/ksmapnosite.png" :style="{'width':imgwidth+'px','height':imgheight+'px','position':'absolute','top':'0px','left':leftwidth+'px'}"></img>
      <div ref="left" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','left':'0px'}" v-show="showleft">
        <div ref="line" :style="{'width':lwidth+'px','height':theight+'px'}">
            <div id="firstchart" :style="{'width':lwidth+'px','height':(subheight2-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div id="nochart" :style="{'width':lwidth+'px','height':(subheight2-1)+'px','margin-bottom':'1px','display':'none'}" class="subback">
               <div :style="{'width':lwidth+'px','height':(subheight2*0.1)+'px'}"></div>
                <el-table
                            :data="raindata"
                            border
                            :height="(subheight2*0.8)"
                            v-loading="loading"
                            row-style="height:45px"
                            header-cell-style="background-color: #055CC8;"
                            style="width:95%;margin-left:2%;">
                            <el-table-column
                              prop="STNM"
                              label="站点名称"
                              align="center"
                              min-width="80"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="RAIN1"
                              label="1H降雨"
                              align="center"
                              min-width="60"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="RAIN12"
                              label="12H降雨"
                              align="center"
                              min-width="60"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="RAIN24"
                              label="24H降雨"
                              align="center"
                              min-width="60"
                              >
                            </el-table-column>
                          </el-table> 
            </div>
            <div id="secondchart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div id="threechart" :style="{'width':lwidth+'px','height':(subheight1)+'px'}" class="subback"></div>
        </div>
        <el-button type="success" size="mini" round :style="{'position':'absolute', 'top':(subheight1+10)+'px', 'left':'180px','z-index':'10'}" @click="centerDialogVisible = true">条件设置</el-button>
    </div>
    <div ref="center" :style="{'display':'inline-block','height':theight+'px','width':cwidth+'px','z-index':'3','margin-left':lwidth+'px'}">
      <div style="color:#fff;text-shadow:5px 2px 6px #000;text-align:center;z-index:10;position:relative;top:25px;"><h1>康苏水库水情测报系统</h1></div>
      <div style="color:#ffff00;font-weight:bold;font-size:23px;text-align:center;z-index:10;position:relative;top:60px;text-shadow: 0 0 5px #00008B, 0 0 10px #00008B, 0 0 15px #00008B, 0 0 40px #000080, 0 0 70px #000080;">
        <span>实时库容：{{realform.kr2}}万m³</span>
        <span style="margin-left:100px;">实时水位：{{realform.sw2}}m</span>
      </div>
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
      <div ref="table" :style="{'width':lwidth+'px','height':(subheight2*0.85-1)+'px','margin-top':'1px','text-align':'center'}" class="subback">
        <div style="color:#fff;font-size:14px;font-weight:bold;padding-top:10px;padding-bottom:10px;">闸门开度流量信息</div>
        <el-table
                            :data="tabledata"
                            border
                            :height="tableheight"
                            v-loading="loading"
                            row-style="height:35px"
                            :cell-style="gateStyle"
                            :header-cell-style="gateheaderStyle"
                            style="width:95%;margin-left:3%;">
                            <el-table-column
                              prop="PROPERTY"
                              label="站点名称"
                              align="center"
                              min-width="90"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="INFOONE"
                              :label="gatestnm1"
                              align="center"
                              min-width="120"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="INFOTWO"
                              :label="gatestnm2"
                              align="center"
                              min-width="120"
                              >
                            </el-table-column>
                          </el-table> 
      </div>
      <div ref="showtext" :style="{'width':lwidth+'px','height':(subheight1*0.8-1)+'px','margin-top':'1px','padding-left':'5px','padding-right':'5px'}" class="subback">
        <div style="color:#fff;font-size:14px;font-weight:bold;padding-top:10px;padding-bottom:10px;text-align:center;">汛情简况</div>
         <ul>
          <li style="width: 48%;border-left:solid 1px white;"><font style="font-weight:bold;">今日降雨</font>
          <ul>
          <li style="width:60%;text-align:right;">预警雨量站：</li>
          <li style="width:40%;border-left: solid 1px white;">{{realform.rain1}}mm</li>
          <li style="width:60%;text-align:right;">坝上雨量水位站：</li>
          <li style="width:40%;border-left: solid 1px white;">{{realform.rain2}}mm</li>
          <li style="width:60%;text-align:right;">入库流量站：</li>
          <li style="width:40%;border-left: solid 1px white;">{{realform.rain3}}mm</li>
          <li style="width:60%;border-bottom: solid 1px white;">&nbsp;&nbsp;</li>
          <li style="width:40%;border-bottom: solid 1px white;border-left: solid 1px white;">&nbsp;&nbsp;</li>
          </ul>
          </li>
          <li style="width: 52%;border-left:solid 1px white;border-right:solid 1px white;"><font style="font-weight:bold;">{{realform.dwtm}}入库出库</font>
            <ul>
            <li>入库流量：</li>
            <li style="border-left: solid 1px white;">{{realform.inq}}m³/s</li>
            <li>出库流量：</li>
            <li style="border-left: solid 1px white;">{{realform.onq}}m³/s</li>
            <li>入库水量：</li>
            <li style="border-left: solid 1px white;">{{realform.idw}}万m³</li>
            <li style="border-bottom: solid 1px white;">出库水量：</li>
            <li style="border-bottom: solid 1px white;border-left: solid 1px white;">{{realform.odw}}万m³</li>
            </ul>
          </li>
        </ul>
      </div>
        <div ref="imgsite" :style="{'width':lwidth+'px','height':subheight1*0.6+'px','padding-top':'4px','margin-top':'1px'}" class="subback">
            <div :style="{'margin-left':(lwidth*0.004)+'px','margin-right':(lwidth*0.004)+'px','width':(lwidth*0.19)+'px','margin-top':'3px','display':'inline-block','float':'left','text-align':'center'}" v-for="item in imglist">   
                <img :style="{'width':(theight*0.06)+'px','height':(theight*0.056)+'px','cursor':'pointer'}" src="../common/image/shipin.png" @click="showvideo(item.puid)"></img>
                <div :style="{'width':(lwidth*0.19)+'px','height':(theight*0.02)+'px','margin-bottom':'13px','color':'#fff','font-family':'微软雅黑','font-size':'12px','font-weight':'bold'}">{{item.stnm}}</div>            
            </div>
        </div> 
        <div ref="piechart" :style="{'width':lwidth+'px','height':(subheight1*0.75-1)+'px','margin-top':'1px'}" class="subback"></div>      
    </div>
    <audio id="audio" controls="controls" hidden :src="audiosrc"></audio>
      <el-dialog
  title="水位库容对应关系图"
  :visible.sync="centerDialogVisible"
  width="800"
  @open="open()"
    append-to-body center>
  <span>
    时间:
                <el-date-picker
                v-model="krdate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                @change="timechange"
                style="width: 400px"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
                size="small"
                >
                </el-date-picker><br/>
  <div id="datechart" style="width: 100%;height: 470px;margin-top: 1px;margin-bottom: 1px;"></div>
  </span>
</el-dialog>
<div id="videodiv" class="videodiv" v-show="videosign">
      <img src="../common/image/close.png" style="float:right;cursor:pointer;width:32px;height:32px;" @click="hidediv()"></img>
      <iframe :style="{'width':'900px','height':'680px','overflow':'hidden','margin-top':videotop+'px','margin-left':videoleft+'px'}" :src="videosrc"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no">

      </iframe>
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
            tableheight:window.screen.height*0.334*0.9-80,
            subheight1:window.screen.height*0.333,
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
            canallist:[],
            rainlist:[],
            hdlist:[],
            sklist:[],
            tabledata:[],
            raindata:[{STNM:'预警雨量站',RAIN1:0,RAIN12:0,RAIN24:0},{STNM:'坝上雨量水位站',RAIN1:0,RAIN12:0,RAIN24:0},{STNM:'入库流量站',RAIN1:0,RAIN12:0,RAIN24:0}],
            gatestnm1:'',
            gatestnm2:'',
            centerDialogVisible: false,
            krdate:'',
            realform:{
              rain1:0.0,rain2:0.0,rain3:0.0,sw1:'',sw2:'',kr2:'',inq:0.0,onq:0.0,idw:0.0,odw:0.0,dwtm:''
            },
            rivertime:'',
            rvsrrtime:'',
        }
    },
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
      this.setKudate();
      this.loadRealData();
      this.loadRain();
      this.loadSwkrline();
      this.loadline(); 
      this.loadGateData(); 
      this.loadImgdata();
      this.loadPiechart();  
      this.showwarmzinfo();
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
    //设置日期条件
    setKudate(){
      var date = new Date();
          var Month = date.getMonth()+1;
          var datelist = new Array();
          var Hours = date.getHours();
          var Minutes = date.getMinutes();
          var Seconds = date.getSeconds();
          var Dateday=date.getDate();
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
          if(Dateday<10){
            Dateday = `0${Dateday}`
          }
          datelist[1] = `${date.getFullYear()}-${Month}-${Dateday} ${Hours}:${Minutes}:${Seconds}`;
          var t=date.getTime()-1000*60*60*24;
          var yesterday=new Date(t);
          var yesterdate=yesterday.getDate();
          if(yesterdate<10){
            yesterdate="0"+yesterdate;
          }
          var yesterhour=yesterday.getHours();
          if(yesterhour<10){
            yesterhour="0"+yesterhour;
          }
          datelist[0] = `${yesterday.getFullYear()}-${Month}-${yesterdate} ${yesterhour}:${Minutes}:${Seconds}`;
          this.krdate = datelist;
          //获取今日汛情数据
          this.axios.get('/fieldinfo/gettodayinfo').then(res => {
             var dataobj=res.data;
             //今日降雨量
             var rainlist=dataobj.todayrain;
             if(rainlist.length>0){
               for(var i=0;i<rainlist.length;i++){
                 var rainobj=rainlist[i];
                 if(rainobj.stcd=='6530240001'){
                   this.realform.rain1=rainobj.p;
                 }else if(rainobj.stcd=='6530240002'){
                   this.realform.rain2=rainobj.p;
                 }else if(rainobj.stcd=='6530240003'){
                   this.realform.rain3=rainobj.p;
                 }
               }
             }
             //今日入库出库信息
             var iolist=dataobj.todayqw;
             if(iolist.length>0){
               this.realform.inq=iolist[0].INQ;
               this.realform.onq=iolist[0].OTQ;
               this.realform.idw=iolist[0].IDW;
               this.realform.odw=iolist[0].ODW;
               var tmarray=iolist[0].TM.split('-');
               this.realform.dwtm=tmarray[0]+'年'+tmarray[1]+'月'+tmarray[2]+'日';
             }
          });
    },
    //弹框
    open(){
        this.$nextTick(() => {
        //  执行echarts方法
          this.loadkrlineBydate();
        })
      },
    //切换日期
    timechange(){
      console.log(this.form.date);
      this.loadkrlineBydate();
    },
    //重新加载数据
    reloadData(){
      this.setKudate();
      this.loadRealData();
      this.loadRain();
      this.loadSwkrline();
      this.loadline(); 
      this.loadGateData(); 
      this.loadImgdata();
      this.loadPiechart();
      this.showwarmzinfo();
    },
    //绘制雨量柱状图
    loadRain(){
      var now=new Date();
      var emonth=now.getMonth()+1;if(emonth<10){emonth="0"+emonth;}
      var eday=now.getDate();if(eday<10){eday="0"+eday;}
      var ehour=now.getHours();if(ehour<10){ehour="0"+ehour;}
      var endtime=now.getFullYear()+"-"+emonth+"-"+eday+" "+ehour+":00:00";
      var before=new Date(now.getTime() - 23 * 60 * 60 * 1000);
      var bmonth=before.getMonth()+1;if(bmonth<10){bmonth="0"+bmonth;}
      var bday=before.getDate();if(bday<10){bday="0"+bday;}
      var bhour=before.getHours();if(bhour<10){bhour="0"+bhour;}
      var begintime=before.getFullYear()+"-"+bmonth+"-"+bday+" "+bhour+":00:00";
      this.axios.get('/fieldinfo/raindata',{params:{begintime:begintime,endtime:endtime}}).then(res => {
            var datalist=res.data;
            var echartData ={x:new Object(),y1:new Object(),y2:new Object(),y3:new Object(),data:0};
            echartData.x.list=FilterMethods.methods.newArrayByObjArray(datalist, "DT", val => { // 过滤
                        return val.split(" ")[1];
                    });
            var num=0;
            var maxval=0;
            echartData.y1.list=FilterMethods.methods.newArrayByObjArray(datalist, "RAIN1", val => { // 过滤
                        num+=val;
                        if(val>maxval) maxval=val;
                        return parseFloat(val).toFixed(1);
                    });
            echartData.y2.list=FilterMethods.methods.newArrayByObjArray(datalist, "RAIN2", val => { // 过滤
                        num+=val;
                        if(val>maxval) maxval=val;
                        return parseFloat(val).toFixed(1);
                    });
            echartData.y3.list=FilterMethods.methods.newArrayByObjArray(datalist, "RAIN3", val => { // 过滤
                        num+=val;
                        if(val>maxval) maxval=val;
                        return parseFloat(val).toFixed(1);
                    });
            if(num>0){
              echartData.data=1;
            }
            if(maxval<5){
              maxval=5;
            }else{
              maxval=Math.ceil(maxval);
            }
            echartData.yAxismax=maxval;
            this.createBorchart(echartData);
        });
    },
    //绘制水位库容曲线
    loadSwkrline(){
      var obj={
        begintime:this.krdate[0],
        endtime:this.krdate[1]
      };
      this.axios.get('/fieldinfo/swkrdatabydate',{params:obj}).then(res => {
            var _data = res.data; // 数据深拷贝
            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                markdata:[],
            }
                    // y1轴
                    echartData.y1.name = "水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                   //设置markLine
                    var jhsw=new Object();
                    jhsw.name='校核水位 '+2524.12;
                    jhsw.yAxis=2524.12;
                    jhsw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'red'
                    }
                    echartData.markdata.push(jhsw);
                    var zcsw=new Object();
                    zcsw.name='正常蓄水位 '+2520.2;
                    zcsw.yAxis=2520.2;
                    zcsw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'red'
                    }
                    echartData.markdata.push(zcsw);
                    var y1max = 2525,
                        y1min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y1.list));
                    if(y1min>2514){
                      y1min=2514;
                    }else{
                      var ssw=new Object();
                      ssw.name='死水位 '+2514;
                      ssw.yAxis=2514;
                      ssw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'red'
                    }
                      echartData.markdata.push(ssw);
                    }
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "库容"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "W", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = Math.ceil(FilterMethods.methods.get_echart_max(echartData.y2.list)),
                        y2min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y2.list));
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值                    
                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        //var time = val.TM.split(" ");
                        //var returval=time[1].substring(0,5);
                        return val.TM;
                    });
                    //获取当前水位和库容
                    var curentsw2=echartData.y1.list[echartData.x.list.length-1];
                    this.realform.sw2=curentsw2.toString();
                    var curentkr2=echartData.y2.list[echartData.x.list.length-1];
                    this.realform.kr2=curentkr2.toString();
                    var datalist1=[];
                    var datalist2=[];
                    for(var i=0;i<echartData.x.list.length;i++){
                      var obj_data1=[echartData.x.list[i],echartData.y1.list[i]];
                      datalist1.push(obj_data1);
                      var obj_data2=[echartData.x.list[i],echartData.y2.list[i]];
                      datalist2.push(obj_data2);
                    }
                    echartData.y1.list=datalist1;
                    echartData.y2.list=datalist2;                   
            this.createLinechart(echartData);
        });
    },
    //绘制带条件的库容曲线
    loadkrlineBydate(){
      var obj={
        begintime:this.krdate[0],
        endtime:this.krdate[1]
      };
       this.axios.get('/fieldinfo/swkrdatabydate',{params:obj}).then(res => {
            var _data = res.data; // 数据深拷贝
            var echartData = {
                chartName: "",
                x: new Object(),
                y1: new Object(),
                y2: new Object(),
                y3: new Object(),
                markdata:[],
            }
                    // y1轴
                    echartData.y1.name = "水位"; // Y1轴名字

                    echartData.y1.list = FilterMethods.methods.newArrayByObjArray(_data, "RZ", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    //设置markLine
                    var jhsw=new Object();
                    jhsw.name='校核水位 '+2524.12;
                    jhsw.yAxis=2524.12;
                    jhsw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'orange'
                    }
                    echartData.markdata.push(jhsw);
                    var zcsw=new Object();
                    zcsw.name='正常蓄水位 '+2520.2;
                    zcsw.yAxis=2520.2;
                    zcsw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'orange'
                    }
                    echartData.markdata.push(zcsw);
                    var y1max = 2525,
                        y1min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y1.list));
                    if(y1min>2514){
                      y1min=2514;
                    }else{
                      var ssw=new Object();
                      ssw.name='死水位 '+2514;
                      ssw.yAxis=2514;
                      ssw.label={
                           formatter: '{b}',
                           position: 'middle',
                           color:'orange'
                    }
                      echartData.markdata.push(ssw);
                    }
                    echartData.y1.max = y1max; // y1最大值
                    echartData.y1.min = y1min; // y1最小值

                    // y2轴
                    echartData.y2.name = "库容"; // Y2轴名字

                    echartData.y2.list = FilterMethods.methods.newArrayByObjArray(_data, "W", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 0;
                        }
                        return parseFloat(val).toFixed(2);
                    });

                    var y2max = Math.ceil(FilterMethods.methods.get_echart_max(echartData.y2.list)),
                        y2min = Math.floor(FilterMethods.methods.get_echart_min(echartData.y2.list));
                    echartData.y2.max = y2max; // y2最大值
                    echartData.y2.min = y2min < 0 ? 0 : y2min; // y2最小值

                    // x轴
                    echartData.x.list = _data.map((val, index, array) => {
                        // var time = `${index}:00 ~ ${index + 1}:00`;
                        var time = val.TM;
                        return time;
                    });
                    var datalist1=[];
                    var datalist2=[];
                    for(var i=0;i<echartData.x.list.length;i++){
                      var obj_data1=[echartData.x.list[i],echartData.y1.list[i]];
                      datalist1.push(obj_data1);
                      var obj_data2=[echartData.x.list[i],echartData.y2.list[i]];
                      datalist2.push(obj_data2);
                    }
                    echartData.y1.list=datalist1;
                    echartData.y2.list=datalist2;
            this.createKrchart(echartData);
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
      body3.Time_min = this.krdate[0].substr(0,16);
      body3.Time_max = this.krdate[1].substr(0,16);
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
      var day=now.getDate();if(day<10){day="0"+day;}
      var begintime=now.getFullYear()+"-"+month+"-"+day;
      this.axios.get('/fieldinfo/gatedata',{params:{begintime:begintime}}).then(res => {
            var odata=res.data;
            var showdata=[{PROPERTY:'闸门开度(m)',INFOONE:'',INFOTWO:''},{PROPERTY:'流量(m³/s)',INFOONE:'',INFOTWO:''},{PROPERTY:'开度时间',INFOONE:'',INFOTWO:''}];
            this.gatestnm1=odata[0].STNM;
            this.gatestnm2=odata[1].STNM;
            showdata[0].INFOONE=odata[0].OD;
            showdata[0].INFOTWO=odata[1].OD;
            showdata[1].INFOONE=odata[0].Q;
            showdata[1].INFOTWO=odata[1].Q;
            showdata[2].INFOONE=odata[0].TM;
            showdata[2].INFOTWO=odata[1].TM;
            this.tabledata=showdata;//流量(m³/s)  闸门开度(m)
        });
    },
    //修改闸门开度样式
    gateStyle(column){
        if(column.columnIndex === 0) {
        return "font-weight:bold;background-color: #055CC8;"}
    },
    gateheaderStyle(column){
      if(column.columnIndex === 0) {
        return "background-color: #055CC8;"}
    },
    //加载渠道和闸阀水情实时数据
    loadRealData(){
       this.axios.get('/fieldinfo/getksrinfo').then(res => {
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
        this.axios.get('/fieldinfo/videodata').then(res => {
            var list=res.data;
            for(var i=0;i<list.length;i++){
                    var img_obj=new Object();
                    img_obj.stnm=list[i].STNM;
                    img_obj.stcd=list[i].STCD;
                    img_obj.puid=list[i].PUID;
                    //img_obj.path=list[i].WWWPath;
                    this.imglist.push(img_obj);
            }
        });
    },
  //加载饼状图
  loadPiechart(){
      this.axios.get('/fieldinfo/piechart').then(res => {
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
          "historyTable",
          true
        );
        // 渠道水情历史统计表数据 转 ehart图形用数据 返回一个对象, 对象里分别装 Y1轴对象 Y2轴对象 X轴对象
        var x_List = echartData.x.list
        .map((val, index, array) => {
          // 时间过滤
          //var time = val.split(" ");
          var time=val;
          return time;
        });
        //获取当前水位
        var curentsw1=echartData.y2.list[echartData.x.list.length-1]
        this.realform.sw1=curentsw1.toString();
        var datalist1=[];
        for(var i=0;i<echartData.x.list.length;i++){
          var obj_data1=[echartData.x.list[i],echartData.y2.list[i]];
           datalist1.push(obj_data1);
        }
        echartData.y2.list=datalist1;
        myChart = this.$echarts.init(document.getElementById(id));

        myChart.setOption({
          title: {
            text: "24小时入库水位过程曲线",
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
            //data: [echartData.y1.name, echartData.y2.name],
            data: ["水位"],
            x: "right",
            textStyle:{
               color:'#fff'
           }
          },
          grid: {  
                left: '1%',   //图表距边框的距离
                right: '3.5%',
                bottom:'1%',
                containLabel: true,
                backgroundColor:'rgba(280,280,280,0.4)',
                show:true
            },
          animation: false,
          xAxis: [
            {
              type: "time",
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
              axisLabel: {
                formatter: function (val) {
               var date= new Date(val);
               var hour=date.getHours();if(hour<10)hour="0"+hour;
               var minute=date.getMinutes();if(minute<10)minute="0"+minute;
               var texts=[hour,minute];
               return texts.join(":")
              },
                textStyle: {
                       color: '#fff'
                   }
              }
            }
          ],
          yAxis: [
          /*  {
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
            },*/
            {
              name: `水位m`,
              type: "value",
              minInterval:1, 
              min:2710,
              max:2720,
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
           /* {
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
            },*/
            {
              name: "水位",
              type: "line",
              data: echartData.y2.list,
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
            text: "24小时坝上水位过程曲线",
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
            data: [echartData.y1.name],
            x: "right",
            textStyle:{
               color:'#fff'
           }
          },
          grid: {  
                left: '1%',   //图表距边框的距离
                right: '3.5%',
                bottom:'1%',
                containLabel: true,
                backgroundColor:'rgba(280,280,280,0.4)',
                show:true
            },
          animation: false,
          xAxis: [
            {
              type: "time",
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
              axisLabel: {
                formatter: function (val) {
               var date= new Date(val);
               var hour=date.getHours();if(hour<10)hour="0"+hour;
               var minute=date.getMinutes();if(minute<10)minute="0"+minute;
               var texts=[hour,minute];
               return texts.join(":")
              },
                textStyle: {
                       color: '#fff'
                   }
              }
            }
          ],
          yAxis: [
            {
              name: `${echartData.y1.name}m`,
              type: "value",   
              min:echartData.y1.min,
              max:echartData.y1.max, 
              minInterval:1,          
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
              markLine : {
                symbol:'none',
                itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'red',
                                    }  
                                }  
                            },
                data : echartData.markdata,
            },
            }
          ]
        });
      } else {
        var myChart = document.getElementById("secondchart");
        myChart.style.display = "flex";
        myChart.style.alignItems = "center";
        myChart.style.justifyContent = "center";
        myChart.innerHTML ="<font style='color:#fff;font-weight:bold;'>暂无24小时坝上水位过程数据</font>";
      }
    },
    //带条件的库容曲线
    createKrchart(echartData){
      var myChart = this.$echarts.init(document.getElementById("datechart"));
      myChart.setOption({
        title: { text: "" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
         }
        },
        legend: {
          data: [ echartData.y1.name, echartData.y2.name ]
        },
        axisPointer: {
        link: {xAxisIndex: 'all'}
        },
        grid: [{
        left: 38,
        right: 18,
        height: '34%'
        }, {
        left: 38,
        right: 18,
        top: '60%',
        height: '33.5%'
       }],
        xAxis: [
        {
            type: 'time',
            boundaryGap: false,
            data: echartData.x.list,
            //axisLabel:{interval:parseInt(echartData.x.list.length/5),rotate:0},
        },
        {
            gridIndex: 1,
            type: 'time',
            boundaryGap: false,
            data: echartData.x.list,
            position: 'bottom'
        }
        ],
        yAxis: [
          {
            name: echartData.y1.name+'(m)',
            type: "value",
            minInterval:1, 
            min:echartData.y1.min,
            max:echartData.y1.max
          },
          {
            gridIndex: 1,
            name: echartData.y2.name+'(万m³)',
            type: "value",
            minInterval:1, 
            min:200,
            max:1000
          }
        ],
        series: [
          {
            name: echartData.y1.name,
            type: "line",
            yAxisIndex: 0,
            smooth:true,
            data:echartData.y1.list,
            markLine : {
                symbol:'none',
                itemStyle : {  
                                normal : {  
                                    lineStyle:{  
                                        color:'orange',
                                    }  
                                }  
                            },
                data : echartData.markdata,
            },
          },
          {
            name: echartData.y2.name,
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth:true,
            data:echartData.y2.list
          }
        ]
      });
    },
    //雨量柱状图
    createBorchart(edata){
        if(edata.data==1){
        document.getElementById("firstchart").style.display="block";
        document.getElementById("nochart").style.display="none";
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
          document.getElementById("firstchart").style.display="none";
        document.getElementById("nochart").style.display="block";
         // var myChart = document.getElementById("firstchart");
          //myChart.style.display = "flex";
         // myChart.style.alignItems = "center";
         // myChart.style.justifyContent = "center";
         // myChart.innerHTML ="<font style='color:#fff;font-weight:bold;'>暂无24小时降雨数据</font>";
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
  background: linear-gradient(to bottom, #177DE7, #1768BD);
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
.el-table th { color:#fff;background-color: #0162DB;}
.el-table td { color:#fff;background-color: #0162DB;height:35px;}
.el-table__empty-text {
color:#fff;
} 
.el-table tbody tr:hover>td {
    background-color: #0162DB!important;
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
</style>