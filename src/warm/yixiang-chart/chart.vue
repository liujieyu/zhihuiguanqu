<template>
  <div id="clickMe" class="backdiv" @dblclick="toggleFullScreen()">
    <!--
      <div class="mapdiv" :style="{'width':imgwidth+'px','height':theight+'px','top':-theight*0.25+'px','left':allwidth*0.1+'px'}"></div>
    -->
    <img src="../common/image/map.png" :style="{'width':imgwidth+'px','height':imgheight+'px','position':'absolute','top':-0.15*imgheight+'px','left':leftwidth+'px'}"></img>
    <div ref="left" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','left':'0px'}">
        <div ref="line" :style="{'width':lwidth+'px','height':(subheight1*2)+'px'}" class="subback">
            <div id="firstchart" :style="{'width':lwidth+'px','height':subheight1+'px'}"></div>
            <div id="secondchart" :style="{'width':lwidth+'px','height':subheight1+'px'}"></div>
        </div>
        <div ref="borchart" :style="{'width':lwidth+'px','height':(subheight2-1)+'px'}" class="subback"></div>
    </div>
    <div ref="center" :style="{'display':'inline-block','height':theight+'px','width':cwidth+'px','z-index':'3'}">
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(imgwidth*0.6824+leftwidth)+'px','top':(imgheight*0.28925)+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0041HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1666/2500*imgwidth+leftwidth)+'px','top':(imgheight*(962/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0020HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1690/2500*imgwidth+leftwidth)+'px','top':(imgheight*(990/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0022HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1639/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1002/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0021HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1667/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1025/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0019HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1630/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1041/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0018HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1628/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1082/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0017HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1609/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1106/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0016HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1587/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1138/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0024HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1552/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1091/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0037HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1406/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1160/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0038HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1408/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1142/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0039HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1325/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1208/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0015HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1298/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1232/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0005HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1230/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1218/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0014HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1183/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1175/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0040HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1162/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1240/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0013HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1109/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1259/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0012HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1080/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1281/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0011HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1046/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1256/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0010HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1017/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1271/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0009HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1013/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1304/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0008HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(978/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1249/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0007HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(945/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1283/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0036HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(914/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1264/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0035HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(897/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1259/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0042HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(856/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1403/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0034HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(853/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1430/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0006HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(813/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1429/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0033HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(767/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1382/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0004HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(760/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1419/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0032HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(732/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1436/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0031HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(704/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1453/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0030HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(678/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1432/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0029HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(644/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1433/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0028HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(630/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1426/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0027HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(611/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1413/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0003HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(586/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1405/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0026HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(579/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1436/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0025HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(552/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1414/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0002HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="220" trigger="hover">
      <table><tr><td>时间：</td><td>{{form.TM}}</td></tr><tr><td>水深：</td><td>{{form.Z}}m</td></tr><tr><td>流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(526/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1438/2107-0.15))+'px'}" class="sitediv" @mouseover="showcanalinfo('611H0001HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="240" trigger="hover">
      <table><tr><td align="right">时间：</td><td>{{form.TM}}</td></tr><tr><td>闸前水深：</td><td>{{form.UPZ}}m</td></tr><tr><td>闸后水深：</td><td>{{form.DWZ}}m</td></tr><tr><td align="right">流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(1373/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1167/2107-0.15))+'px'}" class="gatediv" @mouseover="showgateinfo('611H0046HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="240" trigger="hover">
      <table><tr><td align="right">时间：</td><td>{{form.TM}}</td></tr><tr><td>闸前水深：</td><td>{{form.UPZ}}m</td></tr><tr><td>闸后水深：</td><td>{{form.DWZ}}m</td></tr><tr><td align="right">流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(868/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1301/2107-0.15))+'px'}" class="gatediv" @mouseover="showgateinfo('611H0044HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="240" trigger="hover">
      <table><tr><td align="right">时间：</td><td>{{form.TM}}</td></tr><tr><td>闸前水深：</td><td>{{form.UPZ}}m</td></tr><tr><td>闸后水深：</td><td>{{form.DWZ}}m</td></tr><tr><td align="right">流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(856/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1368/2107-0.15))+'px'}" class="gatediv" @mouseover="showgateinfo('611H0045HC')"></div>
      </el-popover>
      <el-popover placement="top-start" :title="form.STNM" width="240" trigger="hover">
      <table><tr><td align="right">时间：</td><td>{{form.TM}}</td></tr><tr><td>闸前水深：</td><td>{{form.UPZ}}m</td></tr><tr><td>闸后水深：</td><td>{{form.DWZ}}m</td></tr><tr><td align="right">流量：</td><td>{{form.Q}}m³/s</td></tr></table>
      <div slot="reference" :style="{'left':(526/2500*imgwidth+leftwidth)+'px','top':(imgheight*(1422/2107-0.15))+'px'}" class="gatediv" @mouseover="showgateinfo('611H0043HC')"></div>
      </el-popover>
    </div>
    <div ref="right" :style="{'display':'inline-block','height':theight+'px','width':lwidth+'px','z-index':'3','position':'absolute','top':'0px','right':'0px'}">
        <div ref="imgsite" :style="{'width':lwidth+'px','height':(theight*0.64)+'px','padding-top':'13px'}" class="subback">
            <div :style="{'margin-left':(lwidth*0.026)+'px','margin-top':'3px','width':(lwidth*0.461)+'px','height':(theight*0.2)+'px','display':'inline-block','float':'left','text-align':'center'}" v-for="item in imglist">   
                <img :style="{'width':(lwidth*0.46)+'px','height':(theight*0.17-2)+'px','cursor':'pointer','box-shadow':'3px 3px 3px 1px #fcff00','border':'1px solid #fcff00'}" :src="item.path" @click="show(item.stcd)"></img>
                <div :style="{'width':(lwidth*0.46)+'px','height':(theight*0.03-3)+'px','margin-top':'3px','color':'#fff','font-family':'微软雅黑','font-size':'14px','font-weight':'bold'}">{{item.stnm}}</div>            
            </div>
        </div>
        <div ref="piechart" :style="{'width':lwidth+'px','height':(theight*0.36-1)+'px'}" class="subback"></div>
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
            lwidth:window.outerWidth*0.28125,
            cwidth:window.outerWidth*0.4375,
            imgwidth:window.screen.height*1.1865*1.28,
            imgheight:window.screen.height*1.28,
            allwidth:window.outerWidth,
            leftwidth:window.outerWidth*0.28125*0.36,
            form:{},
            canallist:[],
            gatelist:[],
        }
    },
  mixins: [FilterMethods, GetDataMethods],
  mounted() {
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
      this.axios.get('/'+this.$WarmTable+'/fieldinfo/getrinfo').then(res => {
            var obj=res.data;
            this.canallist=obj.typecanal;
            this.gatelist=obj.typegate;
        });
    },
    //绘制柱状图
    loadBarchart(){
        this.axios.get('/'+this.$WarmTable+'/fieldinfo/borchart').then(res => {
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
        this.axios.get('/'+this.$WarmTable+'/fieldinfo/imgdata').then(res => {
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
    //水量柱状图
    createBorchart(edata){
        var myChart = this.$echarts.init(this.$refs.borchart);
        // 指定图表的配置项和数据
        var option = {
            color: ['#60d8ff'],
            title: {
                text: '渠首近10日水量图',
                subtext:'    水量(m³)',
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
                        color:'#ebebe3',
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
  opacity:0.6;
  background: linear-gradient(top, #0b25c1, #030d6d);
  background: -ms-linear-gradient(top, #0b25c1, #030d6d);
  background: -webkit-linear-gradient(top, #0b25c1, #030d6d);
  background: -moz-linear-gradient(top, #0b25c1, #030d6d);
  box-shadow: 0 0 1px #fff;
}
.sitediv{
  width:12px;
  height:12px;
  background-color:red;
  position:absolute;
  z-index:10;
  opacity: 0;
}
.gatediv{
  width:14px;
  height:14px;
  background-color:yellow;
  position:absolute;
  z-index:10;
  opacity: 0;
}
</style>