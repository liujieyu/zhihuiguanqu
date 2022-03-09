<template>
  <div>
    <Content class="searchcon">
         <el-container>
            <el-header class="el-header" height="30px">水库水情报表导出</el-header>
            <el-main>
            <Row type="flex" :gutter="16" >
            <Col align="left" fixed="left">
                时间：
                <el-date-picker
                v-model="skform.hourdate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                style="width: 400px;margin-right: 108px;"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
                :editable="false"
                size="small"
                >
                </el-date-picker>
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportSkHour">小时表导出</Button>
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportSkHistory">历史表导出</Button>
            </Col>
            </Row> 
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
                <Col align="left" fixed="left">
                时间：
                        <el-date-picker
                        v-model="skform.daydate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width: 200px;margin-right: 272px;"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportSkWByDay">日入库出库水量导出</Button>
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportSkDay">日表导出</Button>
            </Col>
            </Row>
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
                <Col align="left" fixed="left">
                时间：
                        <el-date-picker
                        v-model="skform.monthdate"
                        type="month"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width: 200px;margin-right: 272px;"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportSkWByMonth">月入库出库水量导出</Button>
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportSkMonth">月表导出</Button>
            </Col>
            </Row>
            </el-main>
            <el-footer class="el-header" height="30px"></el-footer>
        </el-container>
    </Content>
  </div>
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods";
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
export default {
  data()
  {
    return{     
        skform:{
           hourdate:'',
           daydate:'',
           monthdate:'',
        },
    }
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods,GetDataMethods,WarmDataConfig],
  mounted(){
      this.setKudate();
  },
  methods:{
      //设置日期条件
    setKudate(){
      var date = new Date();
          var Month = date.getMonth()+1;
          var datelist = new Array();
          var Hours = date.getHours()-1;
          if(Hours<0){
              Hours=0;
          }
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
          datelist[1] = `${date.getFullYear()}-${Month}-${Dateday} ${Hours}:59:59`;
          this.skform.daydate=`${date.getFullYear()}-${Month}-${Dateday}`;
          this.skform.monthdate=`${date.getFullYear()}-${Month}`;
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
          datelist[0] = `${date.getFullYear()}-${Month}-${Dateday} 00:00:00`;
          this.skform.hourdate=datelist;
    },
    exportSkHour(){
                var lastbtime1=new Date(this.skform.hourdate[0]);
                var lastbtime2=new Date(lastbtime1.setHours(lastbtime1.getHours()-1));
                var lastetime1=new Date(this.skform.hourdate[1]);
                var lastetime2=new Date(lastetime1.setHours(lastetime1.getHours()-1));
                var lasttime=new Array();
                lasttime.push(lastbtime2);
                lasttime.push(lastetime2);
                var lastcon=this.datetimeFilter(lasttime);
                var params='begintime='+this.skform.hourdate[0]+'&endtime='+this.skform.hourdate[1]+'&addtion1='+lastcon[0]+'&addtion2='+lastcon[1];
                window.location.href='/excel/exportskhour?'+params;
    },
    exportSkDay(){
                var params='begintime='+this.skform.daydate;
                window.location.href='/excel/exportskday?'+params;
    },
    exportSkMonth(){
                var params='begintime='+this.skform.monthdate;
                window.location.href='/excel/exportskmonth?'+params;
    },
    exportSkWByDay(){
                var now=new Date();
                var Year=now.getFullYear();
                var Month = now.getMonth()+1;
                var Hours = now.getHours()-1;
                var Dateday=now.getDate();
                var dayarray=this.skform.daydate.split("-");
                var begintime=this.skform.daydate+" 00:00:00";
                var endtime=this.skform.daydate+" 23:59:59";
                if(parseInt(dayarray[0])==Year && parseInt(dayarray[1])==Month && parseInt(dayarray[2])==Dateday){
                    if (Hours<10) {
                      Hours = "0"+Hours;
                    }
                    endtime=this.skform.daydate+" "+Hours+":59:59";
                }
                
                var lastbtime1=new Date(begintime);
                var lastbtime2=new Date(lastbtime1.setHours(lastbtime1.getHours()-1));
                var lastetime1=new Date(endtime);
                var lastetime2=new Date(lastetime1.setHours(lastetime1.getHours()-1));
                var lasttime=new Array();
                lasttime.push(lastbtime2);
                lasttime.push(lastetime2);
                var lastcon=this.datetimeFilter(lasttime);
                var params='begintime='+begintime+'&endtime='+endtime+'&addtion1='+lastcon[0]+'&addtion2='+lastcon[1]+'&adcd='+this.skform.daydate;            
               window.location.href='/excel/exportsktime?'+params;
    },
    exportSkWByMonth(){
                var now=new Date();
                var nowYear=now.getFullYear();
                var nowMonth = now.getMonth()+1;
                var nowday=now.getDate();
                var nowHours = now.getHours()-1;
                var year=parseInt(this.skform.monthdate.split("-")[0]);
                var month=parseInt(this.skform.monthdate.split("-")[1])-1;
                var begindate=new Date(year,month,1);
                var enddate=new Date(new Date(year,month+1,0).setHours(23));
                if(nowYear==year && nowMonth==month+1){
                    enddate=new Date(new Date(year,month,nowday).setHours(nowHours));
                }
                var beginarray=new Array();
                beginarray.push(begindate);
                beginarray.push(enddate);
                var begincon=this.datetimeFilter(beginarray);
                var lastbtime2=new Date(begindate.setHours(begindate.getHours()-1));
                var lastetime2=new Date(enddate.setHours(enddate.getHours()-1));
                var lasttime=new Array();
                lasttime.push(lastbtime2);
                lasttime.push(lastetime2);
                var lastcon=this.datetimeFilter(lasttime);
                var title=year+"年"+(month+1)+"月";
                var params='begintime='+begincon[0]+'&endtime='+begincon[1]+'&addtion1='+lastcon[0]+'&addtion2='+lastcon[1]+'&adcd='+title;            
               window.location.href='/excel/exportsktime?'+params;
    },
    exportSkHistory(){
                var params='begintime='+this.skform.hourdate[0]+'&endtime='+this.skform.hourdate[1];
                window.location.href='/excel/exportskhistory?'+params;
    },
    stringToDate(str){

    var tempStrs = str.split(" ");

    var dateStrs = tempStrs[0].split("-");

    var year = parseInt(dateStrs[0], 10);

    var month = parseInt(dateStrs[1], 10) - 1;

    var day = parseInt(dateStrs[2], 10);

    var date = new Date(year, month, day);
    date.setDate(date.getDate() + 1);
    date=new Date(date);
    var Month = date.getMonth()+1;
    var Dateday=date.getDate();
    if (Month<10) {
            Month = `0${Month}`
        }
    if(Dateday<10){
            Dateday = `0${Dateday}`
        }
    return date.getFullYear()+'-'+Month+'-'+Dateday;

},
  }
}
</script>
<style lang="less" scope>
.el-header{
    background-color: #B3C0D1;
    color: #111;
    text-align: left;
    line-height: 30px;
    font-size:14px;
}
</style>
