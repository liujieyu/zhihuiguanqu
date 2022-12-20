<template>
	<div>
		<Content class="searchcon">
                    <Row type="flex" :gutter="16" class="rowtocol">
                        <Col>
                        时间：
                        <el-date-picker
                        v-model="form.date"
                        type="date"
                        :picker-options="pickerOptions"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" 
                        size="small"
                        :clearable="false"
                        @change="timechange"
                        >
                        </el-date-picker>
                        </Col>  
                        <Col> 
                            <Button type="primary" style="width: auto;" @click="exportToExcel">导出</Button>
                        </Col>
                        <!--
                        <Col> 
                            <Button type="primary" style="width: auto;" @click="exportToExcelhour">导出最新1小时水情测报</Button>
                        </Col>
                        -->
                        <Col> 
                            <Button type="primary" style="width: auto; margin-left:10px;" @click="showchart()">监测统计图</Button>
                        </Col>
                    </Row>
                    <Row class="fgline"></Row>
                    <el-table
                        :data="data"
                        border
                        height="370"
                        v-loading="loading"
                        @cell-click="cellclick"
                        style="width: 100%"
                        >
                        <el-table-column 
                            v-for="col in cols"
                            :prop="col.prop" :label="col.label" >
                        </el-table-column>
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
                pickerOptions: {
          shortcuts: [{
            text: '前一时段',
            onClick(picker) {
              const start = picker.date;
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', start);
            }
          }, {
            text: '后一时段',
            onClick(picker) {
              const start = picker.date;
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', start);
            }
          }]
        },
                form:{
                    date:''
                },
                date:'',
                data:[],
                cols: []
            }
        },
                // 引入过滤方法到此组件
        mixins: [WarmDataConfig],
        mounted(){
            var date = new Date();
            var Month = date.getMonth()+1;
            this.form.date = date.getFullYear()+'-'+Month+'-'+date.getDate();
            this.Reload();
        },
        methods:{
            timechange(date){
                this.form.date = date;
                this.Reload();
            },
            Reload(){
                this.axios.get('/alarm/dutyplan/'+this.form.date).then((res)=>{
                    this.loading = false;
                    this.cols=res.data.cols;
                    this.data = res.data.rows;
                });
            }, 
            cellclick(row, column, cell, event){
              var detailinfo=new Object();             
              detailinfo.detailtitle=row.YEAR+"值班安排";
              detailinfo.info=row;
              detailinfo.info.itype="zhibanxiangqing";
              this.$emit('showdailog', detailinfo);
            }, 
            exportToExcel() {
              window.location.href='/excel/exportdutyplan/'+this.form.date;
             }, 
             exportToExcelhour(){
               window.location.href='/excel/exportqandwhour/';
             },
            showchart(){
              window.open("/#/yixiang-chart",'newwindow','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+ ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
              //window.open("/dist/index.html#/yixiang-wschart",'newwindow','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+ ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
              //window.open("/dist/index.html#/yixiang-kschart",'newwindow','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+ ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
            },                  
        },
    }
</script>