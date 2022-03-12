<template>
  <div id="clickMe" class="backdiv" @dblclick="toggleFullScreen()">
    <img src="../common/image/mapnosite.png" :style="{'width':imgwidth+'px','height':imgheight+'px','position':'absolute','top':'0px','left':leftwidth+'px'}"></img>
      <div ref="left" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','left':'0px'}" v-show="showleft">
            <div :style="{'width':lwidth+'px','height':(subheight1-1)+'px','margin-bottom':'1px'}" class="subback">
                <div :style="{'width':lwidth+'px','height':'30px','line-height':'30px','display':'none'}">
                    <el-button type="success" plain size="mini" round  @click="centerDialogVisible = true" :style="{'margin-left':lwidth/3+'px','opacity':'0.9'}">水位库容关系</el-button>
                    <el-select
                      v-model="waterOption"
                      filterable
                      clearable
                      @change="showWaterchart"
                      size="mini"
                      placeholder="请选择或输入水库名称"
                      style="width:170px;float:right;margin-right:5px;opacity:0.9;"
                    >
                      <el-option
                        v-for="item in waterList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        style="background-color: transparent !important;opacity:0.9;"
                      ></el-option>
                    </el-select>
                </div>
                <div id="secondchart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px'}" ></div>
            </div>
            <div  :style="{'width':lwidth+'px','height':(subheight2-1)+'px','margin-bottom':'1px'}" class="subback">
                <div :style="{'width':lwidth+'px','height':'30px','line-height':'30px','display':'none'}">
                    <el-select
                      v-model="rainOption"
                      filterable
                      clearable
                      @change="showRainchart"
                      size="mini"
                      placeholder="请选择或输入水库名称"
                      style="width:170px;float:right;margin-right:5px;opacity:0.9;"
                    >
                      <el-option
                        v-for="item in rainList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        style="background-color: transparent !important;opacity:0.9;"
                      ></el-option>
                    </el-select>
                </div>
                <div id="firstchart" :style="{'width':lwidth+'px','height':(subheight2-1)+'px'}" ></div>
            </div>
            <div ref="piechart" :style="{'width':lwidth+'px','height':(subheight3)+'px'}" class="subback"></div>
            
    </div>
    <div :style="{'width':lwidth*0.33+'px','height':(subheight3)+'px','z-index':'5','position':'absolute','top':(subheight1+subheight2+subheight3*0.5-gzsitelist.length*10-11)+'px','left':(lwidth*0.67-20)+'px'}">
                <table style="border: 1px solid #fff" border cellspacing="0" width="100%" class="gz_detail">
                  <tr>
                    <th class="dt_name" algin="center">故障站点</th><th algin="center" class="dt_vale">故障类型</th>
                  </tr>
                  <template v-for="item in gzsitelist">
                    <tr>
                    <td align="center" class="dt_name">{{item.TITLE}}</td><td align="center" class="dt_vale">{{item.GZTYPE}}</td>
                    </tr>
                  </template>
                </table>
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
      <el-popover placement="top-start" :title="form.STNM" width="232" trigger="hover">
      <table><tr><td align="right">水情时间：</td><td>{{form.TM}}</td></tr><tr><td align="right">库容：</td><td>{{form.W}}m³</td></tr><tr><td align="right">水位：</td><td>{{form.RZ}}m</td></tr><tr><td align="right">距汛限：</td><td>{{form.JL}}m</td></tr><tr><td align="right">今日降雨：</td><td>{{form.P}}mm</td></tr></table>
      <div slot="reference" :style="{'left':(1280/2020*imgwidth+leftwidth)+'px','top':(imgheight*(918/1703-0.125))+'px'}" class="waterskdiv" @mouseover="showskinfo('611H1035HC')" id="S611H1035HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="232" trigger="hover">
      <table><tr><td align="right">水情时间：</td><td>{{form.TM}}</td></tr><tr><td align="right">库容：</td><td>{{form.W}}m³</td></tr><tr><td align="right">水位：</td><td>{{form.RZ}}m</td></tr><tr><td align="right">距汛限：</td><td>{{form.JL}}m</td></tr><tr><td align="right">今日降雨：</td><td>{{form.P}}mm</td></tr></table>
      <div slot="reference" :style="{'left':(827/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1068/1703-0.125))+'px'}" class="waterskdiv" @mouseover="showskinfo('611H1037HC')" id="S611H1037HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="232" trigger="hover">
      <table><tr><td align="right">水情时间：</td><td>{{form.TM}}</td></tr><tr><td align="right">库容：</td><td>{{form.W}}m³</td></tr><tr><td align="right">水位：</td><td>{{form.RZ}}m</td></tr><tr><td align="right">距汛限：</td><td>{{form.JL}}m</td></tr><tr><td align="right">今日降雨：</td><td>{{form.P}}mm</td></tr></table>
      <div slot="reference" :style="{'left':(710/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1070/1703-0.125))+'px'}" class="waterskdiv" @mouseover="showskinfo('611H1036HC')" id="S611H1036HC"></div>
      </el-popover>
    </div>
    <div ref="right" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','right':'0px'}" v-show="showright">
      <div ref="table" :style="{'width':lwidth+'px','height':(theight*0.57-1)+'px','margin-top':'0px','text-align':'center'}" class="subback">
        <div style="color:#fff;font-size:14px;font-weight:bold;padding-top:5px;padding-bottom:5px;text-align:center;">今日水情</div>
        <el-table
                            :data="tabledata"
                            border
                            :height="(theight*0.57-35)"
                            v-loading="loading"
                            row-style="height:25px"
                            header-cell-style="background-color: #055CC8;padding:6px 0px;"
                            style="width:100%;margin-top:2px;">
                            <el-table-column
                              prop="STNM"
                              label="站点名称"
                              align="center"
                              min-width="90"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="KR"
                              label="实时库容(万m³)"
                              align="center"
                              min-width="110"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="SW"
                              label="实时水位(m)"
                              align="center"
                              min-width="110"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="JXX"
                              label="距汛限(m)"
                              align="center"
                              min-width="100"
                              >
                            </el-table-column>
                          </el-table> 
      </div>
      <div id="raindata" :style="{'width':lwidth+'px','height':(theight*0.43)+'px'}" class="subback">
               <div style="color:#fff;font-size:14px;font-weight:bold;padding-top:5px;padding-bottom:5px;text-align:center;">今日降雨</div>
                <el-table
                            :data="raindata"
                            border
                            :height="(theight*0.43-31)"
                            v-loading="loading"
                            row-style="height:25px"
                            header-cell-style="background-color: #055CC8;padding:6px 0px;"
                            style="width:100%">
                            <el-table-column
                              prop="STNM"
                              label="站点名称"
                              align="center"
                              min-width="80"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="HOURRAIN"
                              label="当前小时降雨(mm)"
                              align="center"
                              min-width="90"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="TODAYRAIN"
                              label="今日累计降雨(mm)"
                              align="center"
                              min-width="90"
                              >
                            </el-table-column>
                          </el-table> 
            </div>  
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
            subheight2:window.screen.height*0.27,
            tableheight:window.screen.height*0.334*0.9-80,
            subheight1:window.screen.height*0.47,
            subheight3:window.screen.height*0.26,
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
            tabledata:[{STNM:'梅溪',SW:'2521.37m',KR:'732.19万m³',JXX:'1.17m'},{STNM:'蒿溪',SW:'2518.59m',KR:'732.19万m³',JXX:'-1.61m'},{STNM:'喻家坳',SW:'2516.42m',KR:'732.19万m³',JXX:'-3.78m'}],
            raindata:[{STNM:'喻家坳',HOURRAIN:1.2+"mm",TODAYRAIN:5.4+"mm"},{STNM:'蒿溪',HOURRAIN:0.5+"mm",TODAYRAIN:1.8+"mm"},{STNM:'梅溪',HOURRAIN:"0.0mm",TODAYRAIN:0.4+"mm"}],
            gatestnm1:'',
            gatestnm2:'',
            centerDialogVisible: false,
            krdate:'',
            yldate:'',
            realform:{
              rain1:0.0,rain2:0.0,rain3:0.0,sw1:'',sw2:'',kr2:'',inq:0.0,onq:0.0,idw:0.0,odw:0.0,dwtm:''
            },
            rivertime:'',
            rvsrrtime:'',
            rainOption:'喻家坳',
            rainList:[{value:'611H1036HC',label:'喻家坳'},{value:'611H1035HC',label:'蒿溪'},{value:'611H1037HC',label:'梅溪'}],
            waterOption:'梅溪',
            waterList:[{value:'611H1037HC',label:'梅溪'},{value:'611H1035HC',label:'蒿溪'},{value:'611H1036HC',label:'喻家坳'}],
            shounum:0,
            dingshiqi:null,
            pageone:0,
            pagetwo:0,
            gzsitelist:[],
        }
    },
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
      this.setKudate();
      this.loadRealData(true);
      //this.loadRain();
      //this.loadSwkrline();
      //this.loadline(); 
      //this.loadGateData(); 
      //this.loadImgdata();
      this.loadPiechart();  
      //this.showwarmzinfo();
      setInterval(() => {
          //this.reloadData();
          this.setKudate();
          this.loadPiechart();
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
      var now=date;
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
          var emonth=now.getMonth()+1;if(emonth<10){emonth="0"+emonth;}
          var eday=now.getDate();if(eday<10){eday="0"+eday;}
          var ehour=now.getHours();if(ehour<10){ehour="0"+ehour;}
          var endtime=now.getFullYear()+"-"+emonth+"-"+eday+" "+ehour+":00:00";
          var before=new Date(now.getTime() - 23 * 60 * 60 * 1000);
          var bmonth=before.getMonth()+1;if(bmonth<10){bmonth="0"+bmonth;}
          var bday=before.getDate();if(bday<10){bday="0"+bday;}
          var bhour=before.getHours();if(bhour<10){bhour="0"+bhour;}
          var begintime=before.getFullYear()+"-"+bmonth+"-"+bday+" "+bhour+":00:00";
          var datearray=new Array();
          datearray[0]=begintime;
          datearray[1]=endtime;
          this.yldate=datearray;
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
    startChartTime1(){
      this.dingshiqi = setInterval(()=>{
          this.shounum=this.shounum+1;
          if(this.shounum>this.waterList.length-1){
            this.shounum=0;
          }
          this.waterOption=this.waterList[this.shounum].value;
          this.loadRainAndWater(false);         
      },15000);
    },
    closeChartTime1(){
      clearInterval(this.dingshiqi);
    },
    //重新加载数据
    reloadData(){
      this.setKudate();
      this.loadRealData(false);
      //this.loadline(); 
      //this.loadGateData(); 
      //this.loadImgdata();
      this.loadPiechart();
      //this.showwarmzinfo();
    },
    //下拉切换雨量图
    showRainchart(value){
      if(value==null || value==""){
        return;
      }
      console.log(value+","+this.rainOption);
      this.loadRain();
    },
    //下拉切换水位曲线
    showWaterchart(value){
      if(value==null || value==""){
        return;
      }
      console.log(value+","+this.waterOption);
      this.loadSwkrline();
    },
    //绘制雨量柱状图和水位库容线性图
    loadRainAndWater(triggertime){
      var obj={
        begintime:this.krdate[0],
        endtime:this.krdate[1],
        sitename:this.waterOption,
        starttime:this.yldate[0],
        overtime:this.yldate[1]
      };
      this.axios.get('/fieldinfo/waterraindata',{params:obj}).then(res => {
          var datalist=res.data.raindata;
          var _data=res.data.waterdata;
          this.loadRain(datalist);
          this.loadSwkrline(_data);
          if(triggertime){
            this.startChartTime1();
          }
      });
    },
    //绘制雨量柱状图
    loadRain(datalist){
      // var now=new Date();
      // var emonth=now.getMonth()+1;if(emonth<10){emonth="0"+emonth;}
      // var eday=now.getDate();if(eday<10){eday="0"+eday;}
      // var ehour=now.getHours();if(ehour<10){ehour="0"+ehour;}
      // var endtime=now.getFullYear()+"-"+emonth+"-"+eday+" "+ehour+":00:00";
      // var before=new Date(now.getTime() - 23 * 60 * 60 * 1000);
      // var bmonth=before.getMonth()+1;if(bmonth<10){bmonth="0"+bmonth;}
      // var bday=before.getDate();if(bday<10){bday="0"+bday;}
      // var bhour=before.getHours();if(bhour<10){bhour="0"+bhour;}
      // var begintime=before.getFullYear()+"-"+bmonth+"-"+bday+" "+bhour+":00:00";
      // var stcd=this.waterOption;
      // this.axios.get('/fieldinfo/raindata',{params:{starttime:begintime,overtime:endtime,sitename:stcd}}).then(res => {
      //       var datalist=res.data;
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
    //    });
    },
    //绘制水位库容曲线
    loadSwkrline(_data){
      // var obj={
      //   begintime:this.krdate[0],
      //   endtime:this.krdate[1],
      //   sitename:this.waterOption
      // };
      // this.axios.get('/fieldinfo/swkrdatabydate',{params:obj}).then(res => {
       //     var _data = res.data; // 数据深拷贝
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
            //this.createLinechart(echartData);
            this.createKrchart(echartData);
     //   });
    },
    //绘制带条件的库容曲线
    loadkrlineBydate(){
      var obj={
        begintime:this.krdate[0],
        endtime:this.krdate[1],
        sitename:this.waterOption
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
            //this.createKrchart(echartData);
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
    },
    //加载渠道和闸阀水情实时数据
    loadRealData(triggertime){
       this.axios.get('/fieldinfo/getksrinfo').then(res => {
             var obj=res.data;
             this.canallist=obj.typecanal;
             this.rainlist=obj.typerain;
             this.sklist=obj.typesk;
             this.tabledata=[];
             this.raindata=[];
             this.waterList=[];
             for(var i=0;i<this.sklist.length;i++){
               var skobj=this.sklist[i];
               skobj.P=this.rainlist[i].P;
               var watersel=new Object();
               watersel.value=skobj.STCD;
               watersel.label=skobj.STNM;
               this.waterList.push(watersel);
               var waterobj=new Object();
               waterobj.KR=skobj.W;
               waterobj.SW=skobj.RZ;
               waterobj.STNM=skobj.STNM;
               waterobj.JXX=skobj.JL;
               waterobj.SORT=parseFloat(skobj.JL);
               this.tabledata.push(waterobj);
               var rainobj=new Object();
               rainobj.STNM=skobj.STNM;
               rainobj.HOURRAIN=parseFloat(this.rainlist[i].HOURP).toFixed(1);
               rainobj.TODAYRAIN=parseFloat(this.rainlist[i].P).toFixed(1);
               rainobj.SORT=parseFloat(this.rainlist[i].P);
               this.raindata.push(rainobj);
               if(skobj.RZ>0){
                 document.getElementById("S"+skobj.STCD).className = "waterskdiv";
               }
               if(skobj.ALARM==1){
                 document.getElementById("S"+skobj.STCD).className = "warmskdiv";
               }
             }
             for(var i=0;i<this.tabledata.length-1;i++){
                for(var j=0;j<this.tabledata.length-1-i;j++){
                    if(this.tabledata[j].SORT<this.tabledata[j+1].SORT){
                       var b=this.tabledata[j];
                        this.tabledata[j]=this.tabledata[j+1];
                        this.tabledata[j+1]=b;
                        var b1=this.waterList[j];
                        this.waterList[j]=this.waterList[j+1];
                        this.waterList[j+1]=b1;
                    }
                }
             }
             for(var i=0;i<this.raindata.length-1;i++){
                for(var j=0;j<this.raindata.length-1-i;j++){
                    if(this.raindata[j].SORT<this.raindata[j+1].SORT){
                       var b=this.raindata[j];
                        this.raindata[j]=this.raindata[j+1];
                        this.raindata[j+1]=b;
                    }
                }
             }
             this.waterOption=this.waterList[0].value;
             //this.loadRain();
             //this.loadSwkrline();
             this.loadRainAndWater(triggertime);
         });
    },
  //加载饼状图
  loadPiechart(){
      this.axios.get('/fieldinfo/troublechart').then(res => {
        debugger;
            var list=res.data;
            this.gzsitelist=[];
            var echartData={y:{list:[]},titles:[]};
            if(list.length==1){
                    var p1=new Object();
                    p1.value=list[0].TOTAL;
                    p1.name=list[0].TITLE;
                    echartData.y.list.push(p1);
                    var p2=new Object();
                    p2.value=0;
                    p2.name="故障";
                    echartData.y.list.push(p2);
                    echartData.titles.push(list[0].TITLE);
                    echartData.titles.push("故障");
                    this.createPiechart2(echartData);
            }else if(list.length>1){
                var p_zcobj=new Object();
                p_zcobj.value=list[list.length-1].TOTAL;
                p_zcobj.name=list[list.length-1].TITLE;
                echartData.y.list.push(p_zcobj);
                var p2=new Object();
                p2.value=list.length-1;
                p2.name="故障";
                echartData.y.list.push(p2);
                for(var h=0;h<list.length-1;h++){
                      var p_obj=new Object();
                      p_obj.GZTYPE=list[h].GZTYPE;
                      p_obj.TITLE=list[h].TITLE;
                      this.gzsitelist.push(p_obj);
                }
                this.createPiechart(echartData);               
            }
            
        });
  },
    //水位库容曲线
    createLinechart(echartData){
      debugger;
      if (echartData.x.list.length > 0) {
        var showname;
        for(var i=0;i<this.waterList.length;i++){
          if(this.waterOption==this.waterList[i].value){
            showname=this.waterList[i].label;
            break;
          }
        }
        myChart = this.$echarts.init(document.getElementById("secondchart"));
        myChart.setOption({
          title: {
            text: showname+"24小时水位过程曲线",
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
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },
          grid: [{  
                left: '1%',   //图表距边框的距离
                right: '3.5%',
                bottom:'1%',
                containLabel: true,
                backgroundColor:'rgba(280,280,280,0.4)',
                height: '34%',
                show:true
            },
            {  
                left: '1%',   //图表距边框的距离
                right: '3.5%',
                bottom:'1%',
                containLabel: true,
                backgroundColor:'rgba(280,280,280,0.4)',
                top: '60%',
                height: '33.5%',
                show:true
            },],
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
            },
            {
              gridIndex: 1,
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
            },
            {
              name: `${echartData.y2.name}万m³`,
              type: "value",   
              min:200,
              max:1000, 
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
            },
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
            },
          {
            name: echartData.y2.name,
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth:true,
            data:echartData.y2.list,
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
        var myChart = document.getElementById("secondchart");
        myChart.style.display = "flex";
        myChart.style.alignItems = "center";
        myChart.style.justifyContent = "center";
        myChart.innerHTML ="<font style='color:#fff;font-weight:bold;'>暂无24小时水位过程数据</font>";
      }
    },
    //带条件的库容曲线
    createKrchart(echartData){
        var showname;
        for(var i=0;i<this.waterList.length;i++){
          if(this.waterOption==this.waterList[i].value){
            showname=this.waterList[i].label;
            break;
          }
        }
      var myChart = this.$echarts.init(document.getElementById("secondchart"));
      myChart.setOption({
        title: {
            text: showname+"24小时水位库容过程曲线",
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
          data: [ echartData.y1.name, echartData.y2.name ],
          x: "right",
            textStyle:{
               color:'#fff'
           }
        },
        axisPointer: {
        link: {xAxisIndex: 'all'}
        },
        grid: [{
        left: '1%',   //图表距边框的距离
        right: '3.5%',
        containLabel: true,
        backgroundColor:'rgba(280,280,280,0.4)',
        height: '45%',
        show:true
        }, {
        left: '1%',   //图表距边框的距离
        right: '3.5%',
        containLabel: true,
        backgroundColor:'rgba(280,280,280,0.4)',
        top: '65.5%',
        height: '34.5%',
        show:true
       }],
        animation: false,
        xAxis: [
        {
            type: 'time',
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
            //axisLabel:{interval:parseInt(echartData.x.list.length/5),rotate:0},
        },
        {
            gridIndex: 1,
            type: 'time',
            boundaryGap: false,
            data: echartData.x.list,
            position: 'bottom',
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
            name: echartData.y1.name+'(m)',
            type: "value",
            min:echartData.y1.min,
            max:echartData.y1.max,       
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
            gridIndex: 1,
            name: echartData.y2.name+'(万m³)',
            type: "value",
            minInterval:1, 
            min:1000,
            max:200,         
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
            yAxisIndex: 0,
            smooth:true,
            data:echartData.y1.list,
            symbol: 'none',
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
          },
          {
            name: echartData.y2.name,
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            smooth:true,
            data:echartData.y2.list,
            symbol: 'none',
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
    },
    //雨量柱状图
    createBorchart(edata){
        if(edata.data==1){
        var showname;
        for(var i=0;i<this.waterList.length;i++){
          if(this.waterOption==this.waterList[i].value){
            showname=this.waterList[i].label;
            break;
          }
        }
        var myChart = this.$echarts.init(document.getElementById("firstchart"));
        var option = {
                title: {
                    text:showname+"24小时降雨柱状图",
                    textStyle: {
                    fontSize: 14,
                    fontWeight: 'bolder',
                    color: '#fff'
                    },
                },
                color: ['#00f6ff'],
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
                    data: [showname],
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
                        name: '喻家坳',
                        type: 'bar',
                        barGap: 0,
                        data: edata.y1.list
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
                 x: 'left',
                 left:75,
                 top: 7,
                 textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color:'#fff'
                  },
            },
            //自定义的颜色
            color:[ '#12d0ff','#ef2424'],
            // 图例
            legend: {
                data: ['正常','故障'],
                orient: 'vertical',
                x:'left',
                y:'center',
                textStyle:{
                    color:'#fff'
                }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b}: {c} ({d}%)'
            },
            grid: {  
                bottom:'2%',
            },
            // 数据
            series: [{
                name: '分布情况',
                type: 'pie',
                radius : '71%',
                center: ['35%', '55%'],
                data: edata.y.list,
                label: {
                  formatter: '{b}:\n{c} ({d})%',
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
            }
            ]
        };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);       
    },
    //饼状图
    createPiechart2(edata){
    var myChart = this.$echarts.init(this.$refs.piechart);
        // 指定图表的配置项和数据
        var option = {
            // 标题
            title: {
                text: '站点运行工况故障分布图',
                 x: 'left',
                 top: 10,
                 textStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color:'#fff'
                  },
            },
            //自定义的颜色
            color:[ '#12d0ff','#ef2424'],
            // 图例
            legend: {
                data: ['正常','故障'],
                orient: 'vertical',
                x:'left',
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