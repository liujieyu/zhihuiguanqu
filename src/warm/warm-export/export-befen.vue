<template>
  <div>
    <Content class="searchcon">
        <el-container>
            <el-header class="el-header" height="30px">雨情报表导出</el-header>
            <el-main>
            <Row type="flex" :gutter="16" >
            <Col align="left" fixed="left">
                时间：
                <el-date-picker
                v-model="rainform.hourdate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                style="width: 400px"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
                :editable="false"
                size="small"
                >
                </el-date-picker>
            </Col>
            <Col align="left" fixed="left">
                <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: 200px;margin-right: 20px;" v-model="rainform.hourearchmsg" />
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportRainHour">时段表导出</Button>
            </Col>
            </Row> 
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
                <Col align="left" fixed="left">
                时间：
                        <el-date-picker
                        v-model="rainform.daydate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width: 200px"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: 200px;margin-right: 32px;margin-left:200px;" v-model="rainform.dayrearchmsg" />
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportRainDay">日表导出</Button>
            </Col>
            </Row>
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
                <Col align="left" fixed="left">
                时间：
                        <el-date-picker
                        v-model="rainform.monthdate"
                        type="month"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width: 200px"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: 200px;margin-right: 32px;margin-left:200px;" v-model="rainform.monthrearchmsg" />
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportRainMonth">月表导出</Button>
            </Col>
            </Row>
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
                <Col align="left" fixed="left">
                时间：
                        <el-date-picker
                        v-model="rainform.yeardate"
                        type="year"
                        placeholder="选择日期"
                        format="yyyy 年"
                        value-format="yyyy" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width: 200px"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Input search enter-button suffix="ios-search" placeholder="请输入站名" style="width: 200px;margin-right: 32px;margin-left:200px;" v-model="rainform.yearrearchmsg" />
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportRainYear">年表导出</Button>
            </Col>
            </Row>
            </el-main>
        </el-container>
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
                        style="width: 200px;margin-right: 448px;"
                        >
                        </el-date-picker>
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
                        style="width: 200px;margin-right: 448px;"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportSkMonth">月表导出</Button>
            </Col>
            </Row>
            </el-main>
        </el-container>
        <el-container>
            <el-header class="el-header" height="30px">河道水情报表导出</el-header>
            <el-main>
            <Row type="flex" :gutter="16" >
            <Col align="left" fixed="left">
                时间：
                <el-date-picker
                v-model="hdform.hourdate"
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
                <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportHdHour">小时表导出</Button>
            </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportHdHistory">历史表导出</Button>
            </Col>
            </Row> 
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
                <Col align="left" fixed="left">
                时间：
                        <el-date-picker
                        v-model="hdform.daydate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width: 200px;margin-right: 448px;"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportHdDay">日表导出</Button>
            </Col>
            </Row>
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
                <Col align="left" fixed="left">
                时间：
                        <el-date-picker
                        v-model="hdform.monthdate"
                        type="month"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width: 200px;margin-right: 448px;"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportHdMonth">月表导出</Button>
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
        rainform:{
           hourdate:'',
           hourearchmsg:'', 
           daydate:'',
           dayrearchmsg:'',
           monthdate:'',
           monthrearchmsg:'',
           yeardate:'',
           yearrearchmsg:''
        },
        skform:{
           hourdate:'',
           daydate:'',
           monthdate:'',
        },
        hdform:{
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
          this.rainform.daydate=`${date.getFullYear()}-${Month}-${Dateday}`;
          this.rainform.monthdate=`${date.getFullYear()}-${Month}`;
          this.rainform.yeardate=`${date.getFullYear()}`;
          this.skform.daydate=`${date.getFullYear()}-${Month}-${Dateday}`;
          this.skform.monthdate=`${date.getFullYear()}-${Month}`;
          this.hdform.daydate=`${date.getFullYear()}-${Month}-${Dateday}`;
          this.hdform.monthdate=`${date.getFullYear()}-${Month}`;
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
          datelist[0] = `${yesterday.getFullYear()}-${Month}-${Dateday} 00:00:00`;
          this.rainform.hourdate = datelist;
          this.skform.hourdate=datelist;
          this.hdform.hourdate=datelist;
    },
    exportRainHour(){
                var params='begintime='+this.rainform.hourdate[0]+'&endtime='+this.rainform.hourdate[1];
                if(typeof(this.rainform.hourearchmsg)!='undefined' && this.rainform.hourearchmsg!=null && this.rainform.hourearchmsg!=''){
                  params+='&stnm='+this.rainform.hourearchmsg;
                } 
                window.location.href='/excel/exportrainhour?'+params;
    },
    exportRainDay(){
                var params='begintime='+this.rainform.daydate+'&endtime='+this.stringToDate(this.rainform.daydate);
                if(typeof(this.rainform.dayrearchmsg)!='undefined' && this.rainform.dayrearchmsg!=null && this.rainform.dayrearchmsg!=''){
                  params+='&stnm='+this.rainform.dayrearchmsg;
                } 
                window.location.href='/excel/exportrainday?'+params;
    },
    exportRainMonth(){
                var params='begintime='+this.rainform.monthdate;
                if(typeof(this.rainform.monthrearchmsg)!='undefined' && this.rainform.monthrearchmsg!=null && this.rainform.monthrearchmsg!=''){
                  params+='&stnm='+this.rainform.monthrearchmsg;
                } 
                window.location.href='/excel/exportrainmonth?'+params;
    },
    exportRainYear(){
                var params='year='+this.rainform.yeardate;
                if(typeof(this.rainform.yearrearchmsg)!='undefined' && this.rainform.yearrearchmsg!=null && this.rainform.yearrearchmsg!=''){
                  params+='&stnm='+this.rainform.yearrearchmsg;
                } 
                window.location.href='/excel/exportrainyear?'+params;
    },
    exportSkHour(){
                var params='begintime='+this.skform.hourdate[0]+'&endtime='+this.skform.hourdate[1];
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
    exportSkHistory(){
                var params='begintime='+this.skform.hourdate[0]+'&endtime='+this.skform.hourdate[1];
                window.location.href='/excel/exportskhistory?'+params;
    },
    exportHdHour(){
                var params='begintime='+this.hdform.hourdate[0]+'&endtime='+this.hdform.hourdate[1];
                window.location.href='/excel/exporthdhour?'+params;
    },
    exportHdHistory(){
                var params='begintime='+this.hdform.hourdate[0]+'&endtime='+this.hdform.hourdate[1];
                window.location.href='/excel/exporthdhistory?'+params;
    },
    exportHdDay(){
                var params='begintime='+this.hdform.daydate;
                window.location.href='/excel/exporthdhday?'+params;
    },
    exportHdMonth(){
                var params='begintime='+this.hdform.monthdate;
                window.location.href='/excel/exporthdhmonth?'+params;
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
