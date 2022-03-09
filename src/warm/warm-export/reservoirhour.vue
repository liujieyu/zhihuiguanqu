<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol">
                        <Col>
                        时间：
                        <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        style="width: 380px"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="expireTimeOption"
                        @change="timechange"
                        :clearable="false"
                        :editable="false"
                        size="small"
                        >
                        </el-date-picker>
                        </Col> 
                        <Col align="left" fixed="left">
                         <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportSkHour">导出</Button>
                         </Col> 
                    </Row>
                    <Row class="fgline"></Row>
                    <div style="padding-bottom:5px;">
                        总站数：1  单位：水位 m，流量 m³/s，水量 万m³        <span style="float:right;font-weight:bold;font-size:14px;">总入库水量：{{totaldata.INW}}万m³&nbsp;&nbsp;&nbsp;&nbsp;总出库水量：{{totaldata.OUTW}}万m³</span> 
                    </div>
                    <el-table
                        :data="data"
                        border
                        :height="theight"
                        v-loading="loading"
                        style="width: 100%"
                        >
                        <el-table-column label="站点" min-width="100" align="center">
                            <el-table-column label="汛限水位" min-width="100" align="center">
                                <el-table-column label="正常蓄水位" min-width="100" align="center">
                                   <el-table-column label="时间" min-width="100" prop="DT" align="center">

                                   </el-table-column>
                                </el-table-column>
                            </el-table-column>
                        </el-table-column>
                        <template v-for="item in cols">
                            <el-table-column :label="item.STNM" align="center">
                                <el-table-column :label="item.FWL" align="center">
                                    <el-table-column :label="item.ZCWL" align="center">
                                        <el-table-column label="平均水位" min-width="100" prop="RZ" align="center">
                                       </el-table-column>
                                       <el-table-column label="水势" min-width="80" prop="CV" align="center">
                                           <template scope="scope">
                                                <span v-if="scope.row.CV==='↑'" style="color:#FF0000">↑</span>
                                                <span v-else-if="scope.row.CV==='↓'" style="color:#0000FF">↓</span>
                                                <span v-else style="color: #000000">-</span>
                                            </template>
                                       </el-table-column>
                                       <el-table-column label="平均入库流量" min-width="100" prop="INQ" align="center">
                                       </el-table-column>
                                       <el-table-column label="平均出库流量" min-width="100" prop="OTQ" align="center">
                                       </el-table-column>
                                       <el-table-column label="当前库容" min-width="100" prop="KR" align="center">
                                       </el-table-column>
                                    </el-table-column>
                                </el-table-column>
                            </el-table-column>
                        </template>
                      </el-table>
                </Content>
	</div>
</template>
<script type="text/javascript">
        import WarmDataConfig from "@/assets/commonJS/WarmDataConfig";
        import App from "@/App.vue";
	export default {
        data(){
            return{
                loading:false,
                theight:window.innerHeight-231,
                form:{
                    date:''
                },
                date:'',
                data:[],
                cols: [],
                totaldata:{},
                expireTimeOption:{
                    disabledDate(date) {
			          	//disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
                          var nowdate = new Date();
                          nowdate.setMinutes(0);
                          nowdate.setSeconds(0);
						return date.getTime() > nowdate.getTime();
					}
                }
            }
        },
                // 引入过滤方法到此组件
        mixins: [WarmDataConfig],
        mounted(){
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
          datelist[0] = `${date.getFullYear()}-${Month}-${Dateday} 00:00:00`;
          this.form.date=datelist;
            this.Reload();
        },
        methods:{
            timechange(date){
                this.form.date = date;
                this.Reload();
            },
            Reload(){
                debugger;
                this.loading = true;
                var lastbtime1=new Date(this.form.date[0]);
                var lastbtime2=new Date(lastbtime1.setHours(lastbtime1.getHours()-1));
                var lastetime1=new Date(this.form.date[1]);
                var lastetime2=new Date(lastetime1.setHours(lastetime1.getHours()-1));
                var lasttime=new Array();
                lasttime.push(lastbtime2);
                lasttime.push(lastetime2);
                var lastcon=this.datetimeFilter(lasttime);
                this.axios.get('/fieldinfo/getskhourinfo',{params:{begintime:this.form.date[0],endtime:this.form.date[1],addtion1:lastcon[0],addtion2:lastcon[1]}}).then((res)=>{
                    this.loading = false;
                    this.totaldata=res.data.total;
                    this.cols=res.data.header;
                    this.data = res.data.rows;
                });
            },
            exportSkHour(){
                var lastbtime1=new Date(this.form.date[0]);
                var lastbtime2=new Date(lastbtime1.setHours(lastbtime1.getHours()-1));
                var lastetime1=new Date(this.form.date[1]);
                var lastetime2=new Date(lastetime1.setHours(lastetime1.getHours()-1));
                var lasttime=new Array();
                lasttime.push(lastbtime2);
                lasttime.push(lastetime2);
                var lastcon=this.datetimeFilter(lasttime);
                var params='begintime='+this.form.date[0]+'&endtime='+this.form.date[1]+'&addtion1='+lastcon[0]+'&addtion2='+lastcon[1];
                window.location.href='/excel/exportskhour?'+params;
            },                
        },
    }
</script>