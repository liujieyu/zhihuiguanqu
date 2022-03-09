<template>
  <div id="clickMe" class="backdiv" @dblclick="toggleFullScreen()">
    <!--
      <div class="mapdiv" :style="{'width':imgwidth+'px','height':theight+'px','top':-theight*0.25+'px','left':allwidth*0.1+'px'}"></div>
    -->
    <img src="../common/image/mapnosite.png" :style="{'width':imgwidth+'px','height':imgheight+'px','position':'absolute','top':-0.125*imgheight+'px','left':leftwidth+'px'}"></img>
    <div ref="left" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','left':'0px'}" v-show="showleft">
        <div ref="line" :style="{'width':lwidth+'px','height':subheight1*2+'px'}" class="subback">
            <div id="firstchart" :style="{'width':lwidth+'px','height':subheight1+'px'}"></div>
            <div id="secondchart" :style="{'width':lwidth+'px','height':(subheight1-1)+'px'}"></div>
        </div>
        <div ref="borchart" :style="{'width':lwidth+'px','height':(subheight2-1)+'px','margin-top':'1px'}" class="subback"></div>
    </div>
    <div ref="center" :style="{'display':'inline-block','height':theight+'px','width':cwidth+'px','z-index':'3','margin-left':lwidth+'px'}">
      <div style="color:#fff;text-shadow:5px 2px 6px #000;text-align:center;z-index:10;position:relative;top:25px;"><h1>黄材灌区量测水管理系统</h1></div>
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
      <div slot="reference" :style="{'left':(1363/2020*imgwidth+leftwidth)+'px','top':(imgheight*(763/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0041HC')" id="611H0041HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1329/2020*imgwidth+leftwidth)+'px','top':(imgheight*(794/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0020HC')" id="611H0020HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1350/2020*imgwidth+leftwidth)+'px','top':(imgheight*(819/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0022HC')" id="611H0022HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1306/2020*imgwidth+leftwidth)+'px','top':(imgheight*(828/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0021HC')" id="611H0021HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1330/2020*imgwidth+leftwidth)+'px','top':(imgheight*(847/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0019HC')" id="611H0019HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1297/2020*imgwidth+leftwidth)+'px','top':(imgheight*(861/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0018HC')" id="611H0018HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1296/2020*imgwidth+leftwidth)+'px','top':(imgheight*(896/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0017HC')" id="611H0017HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1280/2020*imgwidth+leftwidth)+'px','top':(imgheight*(918/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0016HC')" id="611H0016HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1261/2020*imgwidth+leftwidth)+'px','top':(imgheight*(945/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0024HC')" id="611H0024HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1231/2020*imgwidth+leftwidth)+'px','top':(imgheight*(904/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0037HC')" id="611H0037HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1108/2020*imgwidth+leftwidth)+'px','top':(imgheight*(960/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0038HC')" id="611H0038HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1106/2020*imgwidth+leftwidth)+'px','top':(imgheight*(947/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0039HC')" id="611H0039HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1036/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1003/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0015HC')" id="611H0015HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1013/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1026/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0005HC')" id="611H0005HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(955/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1014/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0014HC')" id="611H0014HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(914/2020*imgwidth+leftwidth)+'px','top':(imgheight*(976/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0040HC')" id="611H0040HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(897/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1032/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0013HC')" id="611H0013HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(850/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1048/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0012HC')" id="611H0012HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(827/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1068/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0011HC')" id="611H0011HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(797/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1046/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0010HC')" id="611H0010HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(772/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1059/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0009HC')" id="611H0009HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(768/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1088/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0008HC')" id="611H0008HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(738/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1039/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0007HC')" id="611H0007HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(710/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1070/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0036HC')" id="611H0036HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(684/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1056/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0035HC')" id="611H0035HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(668/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1048/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0042HC')" id="611H0042HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(635/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1171/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0034HC')" id="611H0034HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(631/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1196/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0006HC')" id="611H0006HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(597/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1194/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0033HC')" id="611H0033HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(558/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1153/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0004HC')" id="611H0004HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(552/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1186/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0032HC')" id="611H0032HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(529/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1202/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0031HC')" id="611H0031HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(503/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1215/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0030HC')" id="611H0030HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(480/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1197/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0029HC')" id="611H0029HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(450/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1190/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0028HC')" id="611H0028HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(441/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1202/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0027HC')" id="611H0027HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(423/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1179/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0003HC')" id="611H0003HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(401/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1172/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0026HC')" id="611H0026HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(397/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1200/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0025HC')" id="611H0025HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(374/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1182/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0002HC')" id="611H0002HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(349/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1206/1703-0.125))+'px'}" class="qddiv" @mouseover="showcanalinfo('611H0001HC')" id="611H0001HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="240" trigger="hover">
      <table><tr><td align="right">时间：</td><td>{{form.TM}}</td></tr><tr><td>闸前水深：</td><td>{{form.UPZ}}m</td></tr><tr><td>闸后水深：</td><td>{{form.DWZ}}m</td></tr><tr><td align="right">流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1078/2020*imgwidth+leftwidth)+'px','top':(imgheight*(972/1703-0.125))+'px'}" class="zfdiv" @mouseover="showgateinfo('611H0046HC')" id="611H0046HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="240" trigger="hover">
      <table><tr><td align="right">时间：</td><td>{{form.TM}}</td></tr><tr><td>闸前水深：</td><td>{{form.UPZ}}m</td></tr><tr><td>闸后水深：</td><td>{{form.DWZ}}m</td></tr><tr><td align="right">流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(645/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1085/1703-0.125))+'px'}" class="zfdiv" @mouseover="showgateinfo('611H0044HC')" id="611H0044HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="240" trigger="hover">
      <table><tr><td align="right">时间：</td><td>{{form.TM}}</td></tr><tr><td>闸前水深：</td><td>{{form.UPZ}}m</td></tr><tr><td>闸后水深：</td><td>{{form.DWZ}}m</td></tr><tr><td align="right">流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(634/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1141/1703-0.125))+'px'}" class="zfdiv" @mouseover="showgateinfo('611H0045HC')" id="611H0045HC"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="240" trigger="hover">
      <table><tr><td align="right">时间：</td><td>{{form.TM}}</td></tr><tr><td>闸前水深：</td><td>{{form.UPZ}}m</td></tr><tr><td>闸后水深：</td><td>{{form.DWZ}}m</td></tr><tr><td align="right">流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(355/2020*imgwidth+leftwidth)+'px','top':(imgheight*(1191/1703-0.125))+'px'}" class="zfdiv" @mouseover="showgateinfo('611H0043HC')" id="611H0043HC"></div>
      </el-popover>
    </div>
    <div ref="right" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','right':'0px'}" v-show="showright">
        <div ref="imgsite" :style="{'width':lwidth+'px','height':(theight*0.64)+'px','padding-top':'13px'}" class="subback">
            <div :style="{'margin-left':(lwidth*0.026)+'px','margin-top':'3px','width':(lwidth*0.461)+'px','height':(theight*0.2)+'px','display':'inline-block','float':'left','text-align':'center'}" v-for="item in imglist">   
                <img :style="{'width':(lwidth*0.46)+'px','height':(theight*0.17-2)+'px','cursor':'pointer','box-shadow':'3px 3px 3px 1px #fcff00','border':'1px solid #fcff00'}" :src="item.path" @click="show(item.stcd)"></img>
                <div :style="{'width':(lwidth*0.46)+'px','height':(theight*0.03-3)+'px','margin-top':'3px','color':'#fff','font-family':'微软雅黑','font-size':'14px','font-weight':'bold'}">{{item.stnm}}</div>            
            </div>
        </div>
        <div ref="piechart" :style="{'width':lwidth+'px','height':(theight*0.36-1)+'px','margin-top':'1px'}" class="subback"></div>
    </div>
    <div ref="over" :style="{'height':(theight*0.64)+'px','width':lwidth+'px','position':'absolute','top':'0px','right':'0px','display':'none'}"></div>
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
            subheight1:window.screen.height*0.32,
            subheight2:window.screen.height*0.36,
            lwidth:window.screen.width*0.28125,
            cwidth:window.screen.width*0.4375,
            imgwidth:window.screen.height*2020/1703*1.25,
            imgheight:window.screen.height*1.25,
            allwidth:window.screen.width,
            leftwidth:window.screen.width*0.28125*0.49,
            showleft:true,
            showright:true,
            form:{},
            canallist:[],
            gatelist:[],
        }
    },
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
    this.$refs.switchleft.style.left=this.lwidth+'px';
    this.$refs.switchright.style.right=this.lwidth+'px';
      this.loadRealData();
      this.loadline();  
      this.loadBarchart();
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
      this.loadBarchart();
      this.loadImgdata();
      this.loadPiechart(); 
    },
    //绘制线性图
    loadline(){
        var body = {
        STCD: '611H0038HC',
        _page_size: 999999
      };
      debugger;
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
          this.createChart('firstchart', data.data,'南干渠渠首');
        }
      );
      var body2={
          STCD: '611H0039HC',
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
          this.createChart('secondchart', data.data,'北干渠渠首');
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
            for(var i=0;i<this.gatelist.length;i++){
              var gateobj=this.gatelist[i];
              if(gateobj.OP==1){
                document.getElementById(gateobj.STCD).className = "openzfdiv";
              }
              if(gateobj.ALARM==1){
                document.getElementById(gateobj.STCD).className = "warmzfdiv";
              }
            }
        });
    },
    //绘制柱状图
    loadBarchart(){
        this.axios.get('/fieldinfo/borchart').then(res => {
            var datalist=res.data;
            var echartData ={x:new Object(),y:new Object()};
            var xlist=FilterMethods.methods.newArrayByObjArray(datalist, "DT", val => { // 过滤
                        return val.substring(5);
                    });
            var ylist=FilterMethods.methods.newArrayByObjArray(datalist, "DWQ", val => { // 过滤
                        return parseFloat(val).toFixed(3);
                    });
            var ylist3d=new Array();
            for(var i=0;i<ylist.length;i++){
                var yobj=[i,0,ylist[i]];
                ylist3d.push(yobj);
            }
            echartData.x.list=xlist;
            echartData.y.list=ylist3d;//ylist
            this.createBorchart(echartData);
        });
    },
    //加载图像站数据
    loadImgdata(){
      this.imglist=[];
        this.axios.get('/fieldinfo/imgdata').then(res => {
            var list=res.data;
            for(var i=0;i<list.length;i++){
                    var img_obj=new Object();
                    img_obj.path = "data:image/png;base64,"+list[i].IMAGE;
                    img_obj.stnm=list[i].STNM;
                    img_obj.stcd=list[i].STCD;
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
    //水量柱状图
    createBorchart(edata){
        var myChart = this.$echarts.init(this.$refs.borchart);
        // 指定图表的配置项和数据
        var option = {
            color: ['#60EBFF'],
            title: {
                text: '渠首近10日水量图',
                subtext:'    水量 m³',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'bolder',
                    color: '#fff'
                    },
                subtextStyle: {
                  fontSize: 12,
                    color: '#fff'
                },
            },
             tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            icon : 'roundRect',//icon为圆角矩形          
            data: ['水量'],
            x: "right",
            textStyle:{
               color:'#fff'
           }
          },
            xAxis3D: {
                name:'日期',
                nameTextStyle:{ 
                  padding: [10, 0, 0, 0],
                  verticalAlign:'bottom',
                  color:'#fff',
                  fontSize:12
                },
                splitLine:{show: false},
                type: 'category',
                data: edata.x.list,
                axisLabel: {
                rotate: 50,
                textStyle: {
                       fontSize: 12,
                       color: '#fff'
                   }
              },
              axisLine:{
                    lineStyle:{
                        color:'#fff',
                        width:2
                    }
                },
            },
            yAxis3D: {
                type: 'category',
                name:'',
                axisLine:{
                    lineStyle:{
                        color:'#fff',
                        width:0
                    }
                },
                axisLabel: {
                  show:false
              },
            },
            zAxis3D: {
                name:'',
                splitLine:{show: false},
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'#fff',
                        width:2
                    }
                },
                axisLabel: {
                  textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
              }
            },
            grid3D: {
                boxWidth: 195,
                boxDepth: 80,
                axisPointer: {
                    show: false
                },
                light: {
                    main: {
                        intensity: 1.2
                    },
                    ambient: {
                        intensity: 0.3
                    }
                },
                viewControl: {
                    alpha: 0, //控制场景平移旋转
                    beta: 0
                }
            },
            series: [{
                type: 'bar3D',
                name: '水量',
                barSize: 14,
                data: edata.y.list,
                stack: 'stack',
                shading: 'lambert',
                emphasis: {
                    label: {
                        show: true
                    }
                }
            }]
        };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
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
            color:[  '#ef2424','#60EBFF'],
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
                        shadowColor: 'rgba(255, 255, 255, 1)'
                    },
                    normal:{ 
                        label:{ 
                            show: true, 
                            formatter: '{b} : {c} ({d}%)',
                        }, 
                        labelLine :{show:true},
                        // 设置扇形的阴影
                        shadowBlur: 30,
                        shadowColor: 'rgba(6,121,159,1)', 
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
.zfdiv{
  width:15px;
  height:17px;
  background:url(../common/image/zf.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.openzfdiv{
  width:15px;
  height:17px;
  background:url(../common/image/openzf.png);
  position:absolute;
  z-index:10;
  opacity: 1;
}
.warmzfdiv{
  width:15px;
  height:17px;
  background:url(../common/image/warmzf.png);
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
</style>