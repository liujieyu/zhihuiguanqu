<template>
  <div>
    <Content class="searchcon">
         <el-container>
            <el-header class="el-header" height="30px">渠道水情报表导出</el-header>
            <el-main :style="{'height':theight+'px'}">
            <Row type="flex" :gutter="16" >
              <Col align="left" fixed="left">
                  站点类型：
                  <Select v-model="qdform.sitetype" @on-change="QDsearch" style="width:120px;margin-right: 10px;" clearable>
                  <Option v-for="item in sitetypes" :value="item.value" :key="item.value">{{ item.lable }}</Option>
                  </Select>
              </Col>
              <Col>
                    所属渠道:
                    <el-cascader
                            style="width: 180px;margin-right: 10px;"
                            clearable
                            size="small"
                            placeholder="请选择渠道"
                            :options="qdform.qudaoList"
                            v-model="qdform.hourcanal"
                            @change="QDsearch"
                            change-on-select
                    ></el-cascader>
                </Col>
               <Col>
                   站点：
                   <Select v-model="qdform.hoursite" multiple filterable transfer :max-tag-count="5" placeholder="请输入或者选择站点" style="width: 350px;">
                      <Option v-for="item in qdform.siteList" :value="item.STCD" :key="item.STCD">{{ item.STNM }}</Option>
                   </Select>
               </Col> 
            </Row>
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
              <Col align="left" fixed="left">
                  时间：
                  <el-date-picker
                  v-model="qdform.hourdate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  style="width: 360px;margin-right: 10px;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :clearable="false"
                  :editable="false"
                  size="small"
                  >
                  </el-date-picker>
              </Col>
              
              <Col align="left" fixed="left">
                  <Button type="primary" style="width: auto;margin-right: 10px;" @click="exportQdHour">小时表导出</Button>
              </Col>
              <Col align="left" fixed="left">
                  <Button type="primary" style="width: auto;" @click="exportQdHistory">历史表导出</Button>
              </Col>
            </Row> 
            <el-divider></el-divider>
            <Row type="flex" :gutter="16">
                <Col align="left" fixed="left">
                日期：
                        <el-date-picker
                        v-model="qdform.daydate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width: 200px;margin-right: 182px;"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportQdDay">日表导出</Button>
            </Col>
            </Row>
            <el-divider></el-divider>
            <Row type="flex" :gutter="16" >
                <Col align="left" fixed="left">
                月份：
                        <el-date-picker
                        v-model="qdform.monthdate"
                        type="month"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM" 
                        size="small"
                        :clearable="false"
                        :editable="false"
                        style="width:200px;margin-right: 182px;"
                        >
                        </el-date-picker>
                </Col>
            <Col align="left" fixed="left">
                <Button type="primary" style="width: auto;" @click="exportQdMonth">月表导出</Button>
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
        qdform:{
           hourdate:'',
           daydate:'',
           monthdate:'',
           sitetype:0,
           monthtype:0,
           hourtype:0,
           qudaoList:[],
           hourcanal:[],
           siteList:[],
           hoursite:[],
        },
        sitetypes:[ 
        {
          lable:'明渠',
          value:'1',
        },
        {
          lable:'堰槽',
          value:'2',
        },
        {
          lable:'渡槽',
          value:'3',
        },
        {
          lable:'管道',
          value:'4',
        },],  
        theight:window.innerHeight-275,     
    }
  },
  // 引入过滤方法到此组件
  mixins: [FilterMethods,GetDataMethods,WarmDataConfig],
  mounted(){
      this.setQddate();
      this.setInfo();
      this.getSiteInfo();
  },
  methods:{
    //加载渠道信息和站点信息
    setInfo(){
          // 获取输排水渠道数据,然后设置渠道选择框选项
                this.getCanalSystem(data => {
                    this.qdform.qudaoList = data;
                });
                this.getSiteInfo(data => {
                    this.qdform.siteList = data;
                });
          
    },
    //获取站点信息
    getSiteInfo(callback){
      var params='rand='+Math.random();
      if(this.qdform.sitetype>0){
        params+='&sitetype='+this.qdform.sitetype;
      }
      if(this.qdform.hourcanal!='' && this.qdform.hourcanal.length>0){
        params+='&meCode='+this.qdform.hourcanal[this.qdform.hourcanal.length-1];
      }
      this.axios.get('/fieldinfo/siteinfo?'+params).then((res)=>{
                    var siteList=res.data;
                    if (typeof callback == "function") {
                        callback(siteList);
                    }
                });
    },
    // 获取输排水渠道数据
        getCanalSystem(callback) {
            this.axios.get('/fieldinfo/canalinfo')
                .then(res => {
                    var data = res.data;
                    var qudaoList = new Array();

                    data.forEach((val, index, array) => {
                        if (!val.Upper_Canal_Code || val.Upper_Canal_Code == -1) {
                            val.value = val.Canal_Code;
                            val.label = val.Canal_Name;
                            val.title = val.Canal_Name;
                            qudaoList.push(val);
                        }
                    })

                    // 获取孩子的递归方法
                    function getChildren(array, data) {

                        array.forEach(parent => {
                            var children = new Array();
                            data.forEach((val, index, array) => {
                                if (val.Upper_Canal_Code == parent.Canal_Code) {
                                    val.value = val.Canal_Code;
                                    val.label = val.Canal_Name;
                                    val.title = val.Canal_Name;
                                    children.push(val);

                                }

                            })

                            if (children.length > 0) {
                                parent.children = children;
                                return getChildren(parent.children, data);
                            }


                        })



                        return array;

                    }

                    qudaoList = getChildren(qudaoList, data);
                    if (typeof callback == "function") {
                        callback(qudaoList);
                    }
                })
        },
      QDsearch(){
        this.getSiteInfo(data => {
                    this.qdform.siteList = data;
                });
      },
      //设置日期条件
    setQddate(){
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
          this.qdform.daydate=`${date.getFullYear()}-${Month}-${Dateday}`;
          this.qdform.monthdate=`${date.getFullYear()}-${Month}`;
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
          this.qdform.hourdate=datelist;
    },
    exportQdDay(){
                var params='begintime='+this.qdform.daydate;
                if(this.qdform.sitetype>0){
                  params+="&sitetype="+this.qdform.sitetype;
                }
                if(this.qdform.hourcanal!='' && this.qdform.hourcanal.length>0){
                  params+='&canalCode='+this.qdform.hourcanal[this.qdform.hourcanal.length-1];
                }
                if(this.qdform.hoursite !=null && this.qdform.hoursite.length>0){
                  var memo="";
                  for(var i=0;i<this.qdform.hoursite.length;i++){
                      memo+="'"+this.qdform.hoursite[i]+"'";
                      if(i<this.qdform.hoursite.length-1){
                        memo+=",";
                      }
                  }
                  params+="&memo="+memo;
                }
                window.location.href='/excel/exportqdhday?'+params;
    },
    exportQdMonth(){
                var params='begintime='+this.qdform.monthdate;
                if(this.qdform.sitetype>0){
                  params+="&sitetype="+this.qdform.sitetype;
                }
                if(this.qdform.hourcanal!='' && this.qdform.hourcanal.length>0){
                  params+='&canalCode='+this.qdform.hourcanal[this.qdform.hourcanal.length-1];
                }
                if(this.qdform.hoursite !=null && this.qdform.hoursite.length>0){
                  var memo="";
                  for(var i=0;i<this.qdform.hoursite.length;i++){
                      memo+="'"+this.qdform.hoursite[i]+"'";
                      if(i<this.qdform.hoursite.length-1){
                        memo+=",";
                      }
                  }
                  params+="&memo="+memo;
                }
                window.location.href='/excel/exporthqdmonth?'+params;
    },
    exportQdHour(){
                var params='begintime='+this.qdform.hourdate[0]+'&endtime='+this.qdform.hourdate[1];
                if(this.qdform.sitetype>0){
                  params+="&sitetype="+this.qdform.sitetype;
                }
                if(this.qdform.hourcanal!='' && this.qdform.hourcanal.length>0){
                  params+='&canalCode='+this.qdform.hourcanal[this.qdform.hourcanal.length-1];
                }
                if(this.qdform.hoursite !=null && this.qdform.hoursite.length>0){
                  var memo="";
                  for(var i=0;i<this.qdform.hoursite.length;i++){
                      memo+="'"+this.qdform.hoursite[i]+"'";
                      if(i<this.qdform.hoursite.length-1){
                        memo+=",";
                      }
                  }
                  params+="&memo="+memo;
                }
                window.location.href='/excel/exporthqdhour?'+params;
    },
    exportQdHistory(){
              var params='begintime='+this.qdform.hourdate[0]+'&endtime='+this.qdform.hourdate[1];
                if(this.qdform.sitetype>0){
                  params+="&sitetype="+this.qdform.sitetype;
                }
                if(this.qdform.hourcanal!='' && this.qdform.hourcanal.length>0){
                  params+='&canalCode='+this.qdform.hourcanal[this.qdform.hourcanal.length-1];
                }
                if(this.qdform.hoursite !=null && this.qdform.hoursite.length>0){
                  var memo="";
                  for(var i=0;i<this.qdform.hoursite.length;i++){
                      memo+="'"+this.qdform.hoursite[i]+"'";
                      if(i<this.qdform.hoursite.length-1){
                        memo+=",";
                      }
                  }
                  params+="&memo="+memo;
                }
                window.location.href='/excel/exporthqdlishi?'+params;
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
