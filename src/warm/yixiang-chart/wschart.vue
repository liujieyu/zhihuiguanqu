<template>
  <div id="clickMe" class="backdiv" @dblclick="toggleFullScreen()">
    <img src="../common/image/wsmapnosite.png" :style="{'width':imgwidth+'px','height':imgheight+'px','position':'absolute','top':-0.085*imgheight+'0px','left':leftwidth+'px'}"></img>
      <div ref="left" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','left':'0px'}" v-show="showleft">
        <div ref="line" :style="{'width':lwidth+'px','height':(subheight1*4)+'px'}">
            <div id="firstchart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div id="secondchart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div id="threechart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px','margin-bottom':'1px'}" class="subback"></div>
            <div id="fourchart" :style="{'width':lwidth+'px','height':(subheight1)+'px'}" class="subback"></div>
        </div>
    </div>
    <div ref="center" :style="{'display':'inline-block','height':theight+'px','width':cwidth+'px','z-index':'3','margin-left':lwidth+'px'}">
      <div style="color:#fff;text-shadow:5px 2px 6px #000;text-align:center;z-index:21;position:relative;top:25px;"><h1>枉水灌区量测水管理系统</h1></div>
      <div class="switch" @click="switchleft" ref="switchleft">
          <i class="el-icon-d-arrow-left" v-if="showleft"></i>
          <i class="el-icon-d-arrow-right" v-if="!showleft"></i>
        </div>
      <div class="switchright" @click="switchright" ref="switchright">
          <i class="el-icon-d-arrow-left" v-if="!showright"></i>
          <i class="el-icon-d-arrow-right" v-if="showright"></i>
        </div>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(728/2055*imgwidth+leftwidth)+'px','top':(imgheight*(522/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000014')" id="SMB0000014"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(785/2055*imgwidth+leftwidth)+'px','top':(imgheight*(600/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000013')" id="SMB0000013"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(565/2055*imgwidth+leftwidth)+'px','top':(imgheight*(705/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMF0000001')" id="SMF0000001"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(584/2055*imgwidth+leftwidth)+'px','top':(imgheight*(778/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000006')" id="SMB0000006"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(608/2055*imgwidth+leftwidth)+'px','top':(imgheight*(778/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMF0000002')" id="SMF0000002"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(776/2055*imgwidth+leftwidth)+'px','top':(imgheight*(677/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000017')" id="SMB0000017"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(492/2055*imgwidth+leftwidth)+'px','top':(imgheight*(850/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000007')" id="SMB0000007"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(465/2055*imgwidth+leftwidth)+'px','top':(imgheight*(870/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000021')" id="SMB0000021"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(500/2055*imgwidth+leftwidth)+'px','top':(imgheight*(946/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000008')" id="SMB0000008"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(452/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1001/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMF0000005')" id="SMF0000005"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(415/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1125/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000011')" id="SMB0000011"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(426/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1147/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000010')" id="SMB0000010"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(420/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1170/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000009')" id="SMB0000009"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(386/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1304/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMU0000001')" id="SMU0000001"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(669/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1036/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000012')" id="SMB0000012"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(676/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1139/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000020')" id="SMB0000020"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1255/2055*imgwidth+leftwidth)+'px','top':(imgheight*(736/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMF0000004')" id="SMF0000004"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1169/2055*imgwidth+leftwidth)+'px','top':(imgheight*(756/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMF0000003')" id="SMF0000003"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1076/2055*imgwidth+leftwidth)+'px','top':(imgheight*(836/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000015')" id="SMB0000015"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1059/2055*imgwidth+leftwidth)+'px','top':(imgheight*(856/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000016')" id="SMB0000016"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(934/2055*imgwidth+leftwidth)+'px','top':(imgheight*(877/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000004')" id="SMB0000004"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(946/2055*imgwidth+leftwidth)+'px','top':(imgheight*(994/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000005')" id="SMB0000005"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(828/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1118/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000018')" id="SMB0000018"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(836/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1184/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000003')" id="SMB0000003"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(800/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1220/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000019')" id="SMB0000019"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(807/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1260/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000002')" id="SMB0000002"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(745/2055*imgwidth+leftwidth)+'px','top':(imgheight*(1333/1703-0.085))+'px'}" class="qddiv" @mouseover="showcanalinfo('SMB0000001')" id="SMB0000001"></div>
      </el-popover>
    </div>
    <div ref="right" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','right':'0px'}" v-show="showright">
        <div ref="imgsite" :style="{'width':lwidth+'px','height':(theight*0.68)+'px','padding-top':'5px'}" class="subback">
            <div :style="{'margin-left':(lwidth*0.0183)+'px','margin-right':(lwidth*0.0183)+'px','width':(lwidth*0.2134)+'px','margin-top':'3px','display':'inline-block','float':'left','text-align':'center'}" v-for="item in imglist">   
                <img :style="{'width':(theight*0.0545)+'px','height':(theight*0.05445)+'px','cursor':'pointer'}" src="../common/image/shipin.png" @click="showvideo(item.puid)"></img>
                <div :style="{'width':(lwidth*0.2134)+'px','height':(theight*0.02-3)+'px','margin-bottom':'3px','color':'#fff','font-family':'微软雅黑','font-size':'12px','font-weight':'bold'}">{{item.stnm}}</div>            
            </div>
        </div>
        <div ref="piechart" :style="{'width':lwidth+'px','height':(theight*0.32-1)+'px','margin-top':'1px'}" class="subback"></div>
    </div>
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
            subheight1:window.screen.height*0.25,
            lwidth:window.screen.width*0.28125,
            cwidth:window.screen.width*0.4375,
            imgwidth:window.screen.height*2055/1703*1.19,
            imgheight:window.screen.height*1.19,
            allwidth:window.screen.width,
            leftwidth:window.screen.width*0.28125*0.7,
            showleft:true,
            showright:true,
            videosign:false,
            videotop:(window.screen.height-680)/2,
            videoleft:(window.screen.width-900)/2,
            videosrc:'',
            form:{},
            canallist:[],
            gatelist:[],
        }
    },
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
      this.loadRealData();
      this.loadline();  
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
      this.loadline();  
      this.loadImgdata();
      this.loadPiechart(); 
    },
    //绘制线性图
    loadline(){
        var body = {
        STCD: 'SMB0000002',
        _page_size: 999999
      };

      // 时间参数
      var DTT = this.$FilterData
              .elDatePicker_Filter(this.$App.zeroPointToNowOfTheDay())
              .split(",");
      body.Time_min = DTT[1];
      body.Time_max = DTT[2];

      this.$GetData.Survey_History_QDSQ(
        "historyTable",
        body,
        {
          default: true
        },
        data => {
          this.createChart('firstchart', data.data,'凉水干渠渠首');
        }
      );
      var body2={
          STCD: 'SMB0000003',
          _page_size: 999999
      };
      body2.Time_min = DTT[1];
      body2.Time_max = DTT[2];
      this.$GetData.Survey_History_QDSQ(
        "historyTable",
        body2,
        {
          default: true
        },
        data => {
          this.createChart('secondchart', data.data,'团岭干渠渠首');
        }
      );
      var body3={
          STCD: 'SMB0000019',
          _page_size: 999999
      };
      body3.Time_min = DTT[1];
      body3.Time_max = DTT[2];
      this.$GetData.Survey_History_QDSQ(
        "historyTable",
        body3,
        {
          default: true
        },
        data => {
          this.createChart('threechart', data.data,'孙家冲平衡站');
        }
      );
      var body4={
          STCD: 'SMB0000016',
          _page_size: 999999
      };
      body4.Time_min = DTT[1];
      body4.Time_max = DTT[2];
      this.$GetData.Survey_History_QDSQ(
        "historyTable",
        body4,
        {
          default: true
        },
        data => {
          this.createChart('fourchart', data.data,'石门桥干渠渠首');
        }
      );
    },
    //加载渠道和闸阀水情实时数据
    loadRealData(){
       this.axios.get('/fieldinfo/getrinfo').then(res => {
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
             this.gatelist=obj.typegate;
         });
    },
    //加载图像站数据
    loadImgdata(){
      this.imglist=[];
        this.axios.get('/fieldinfo/videodata').then(res => {
            var list=res.data;
            for(var i=0;i<list.length;i++){
                    var img_obj=new Object();
                    img_obj.stnm=list[i].STNM;
                    img_obj.stcd=list[i].STCD;
                    img_obj.puid=list[i].PUID;
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
                left: '3%',   //图表距边框的距离
                right: '4%',
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
                       color:'#ebebe3',
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
                rotate: 0,
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
                       color:'#ebebe3',
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
                       color:'#ebebe3',
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
      this.videosrc="webdemo/index.html?"+puid;
      
    },
    hidediv(){
      this.videosign=false;
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
  //显示闸阀信息
  showgateinfo(stcd){
    this.form=new Object();
      for(var i=0;i<this.gatelist.length;i++){
        var gateobj=this.gatelist[i];
        if(gateobj.STCD==stcd){
          this.form=gateobj;
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
.subback{
  opacity:0.9;
  //background: #1B74D0;
  background: linear-gradient(to bottom, #177DE7, #1768BD);
  background: -ms-linear-gradient(top, #177DE7, #1768BD);
  background: -webkit-linear-gradient(top, #177DE7, #1768BD);
  background: -moz-linear-gradient(top, #177DE7, #1768BD);
  box-shadow: 0 0 1px #fff;
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
.gatediv{
  width:14px;
  height:14px;
  background-color:yellow;
  position:absolute;
  z-index:10;
  opacity: 0;
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
</style>