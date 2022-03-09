<template>
  <div>
	<Content class="searchcon">
      <Row type="flex" :gutter="16" class="rowtocol">
        <Col>
          调度方式：
          <Select v-model="form.ddtype" :clearable="false" @on-change="TYPEsearch" style="width:120px;margin-left: 5px;margin-right: 20px;">
            <Option
              v-for="obj in ddtypelist"
              :key="obj.value"
              :label="obj.label"
              :value="obj.value">
            </Option>
          </Select>
        </Col>
        <Col>
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="showchart">{{showname}}</Button>
        </col>
        <Col>
          <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportExcel">导出</Button>
        </col>
      </Row>
      <Divider />
      <Row>
        <Col style='font-size: 14px;' class="borsLine">
      库水位：m，闸门开启高度：m，泄流量：m³/s
      </Col>
      </Row>
      <div ref="tablediv">
      <el-table
        :data="data"
        border
        :height="theight"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          label=" "
          prop="ROWID"
          align="center"
          width="65"
          fixed="left">
        </el-table-column>
        <el-table-column
          label="库水位"
          prop="Z"
          align="center"
          min-width="80"
          fixed="left">
        </el-table-column>
        <el-table-column label="导流洞" align="center">
          <el-table-column
            prop="DLKDNAME"
            label="闸门开启高度"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="DL_Q"
            label="泄流量"
            min-width="120"
            align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="溢洪洞" align="center">
          <el-table-column
            prop="XHKDNAME"
            label="闸门开启高度"
            min-width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="XH_Q"
            label="泄流量"
            min-width="120"
            align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="联合泄流量"
          prop="SUM_Q"
          align="center"
          min-width="120"
          fixed="left">
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;margin-right:10px;overflow: hidden">
        <div style="float: right;">
          <Page 
            :total="list_input.total" 
            :current="list_input.current" show-sizer 
            :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
            @on-change="CurrentChange"
            @on-page-size-change="PagesizeChange"
            size="small"
            show-total
            show-elevator>
          </Page>
        </div>
      </div>
      </div>
      <div ref="achart" style="width: 100%;height: 500px;margin-top: 1%;display:none;"></div>
	</Content>
  </div>
</template>

<script type="text/javascript">
  import FilterMethods from "@/assets/commonJS/FilterMethods";
  import GetDataMethods from "@/assets/commonJS/GetDataMethods";
  import App from "@/App.vue";
  export default {
    data(){
            return{
                loading:false,
                showname:'泄流曲线',
                tableBox_show:1,
                ddtypelist:[{
                  value: '1',
                  label: '先导流洞'
                }, {
                  value: '2',
                  label: '先溢洪洞'
                }],
                form:{
                    ddtype:'1',   
                },
                theight:window.innerHeight-290,
                data:[],
                data2:{},
                list_input:{
                    total:100,
                    pagesize:50,
                    pagesizeopts:[10,20,50,75,100,200],
                    current:1,
                },
            }
        },
                // 引入过滤方法到此组件
        mixins: [FilterMethods,GetDataMethods], 
        mounted(){ 
           this.$refs.achart.style.width=document.body.offsetWidth+"px"; 
           this.$refs.achart.style.height=(document.body.offsetHeight-258)+"px";
            this.reloadchart();         
            this.Reload();
        }, 
        methods:{
          Reload(){
                this.loading = true;
                var _currentPage = this.list_input.current;
                var _pageSizes = this.list_input.pagesize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;                
                this.axios.get('/gatedd/xhxx',{params:{begincount:_bgincount,endcount:_endcount,sign:this.form.ddtype}}).then((res)=>{
                    this.loading = false;
                    this.data = res.data.rows;
                    this.list_input.total = res.data.total;
                });
            },
          // 处理页码切换
            CurrentChange(index) {
              this.list_input.current = index;
              this.Reload();             
            },
            // 处理每页显示条数切换
            PagesizeChange(pagesize) {
              this.list_input.pagesize = pagesize;
              this.list_input.current=1;
              this.Reload();
            },
            TYPEsearch(){
              this.list_input.current=1;
              this.Reload();
              this.reloadchart();
            },
            showchart(){
              if(this.tableBox_show==1){
                this.tableBox_show=0;
                this.showname='泄流表格';
                this.$refs.achart.style.display="";
                this.$refs.tablediv.style.display="none";
              }else{
                this.tableBox_show=1;
                this.showname='泄流曲线';
                this.$refs.achart.style.display="none";
                this.$refs.tablediv.style.display="";
              }
            },
            //导出
            exportExcel(){
              //this.axios.get('/excel/exportgate', {params: {begincount:0,endcount:99999,sign:this.form.ddtype}});
              window.location.href='/excel/exportgate?sign='+this.form.ddtype+'&begincount=0&endcount=99999';
            },
            //曲线图加载
            reloadchart(){
              this.axios.get('/gatedd/xhchart', {params: {sign:this.form.ddtype}}).then(res => {
                    var _data = JSON.parse(JSON.stringify(res.data));
                    var echartData = {
                        chartName: "曲线图",
                        x: new Object(),
                        y1: new Object(),
                        y2: new Object(),
                        y3: new Object(),
                        y4: new Object(),
                        y5: new Object()
                    }
                    echartData.x.list=FilterMethods.methods.newArrayByObjArray(_data, "Z", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 2520.00;
                        }
                        return parseFloat(val).toFixed(2);
                    });
                    echartData.y1.list=FilterMethods.methods.newArrayByObjArray(_data, "DL_Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 1.000;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    echartData.y2.list=FilterMethods.methods.newArrayByObjArray(_data, "XH_Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 1.000;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    echartData.y3.list=FilterMethods.methods.newArrayByObjArray(_data, "SUM_Q", val => { // 过滤
                        if (isNaN(val) || val === "" || val == null) {
                            return 1.000;
                        }
                        return parseFloat(val).toFixed(3);
                    });
                    this.data2 = echartData;
                    console.log(this.data2);
                    this.drawchart();
                });
            },
             drawchart() {
               var obj_c=this.$refs.achart;
                var achart = this.$echarts.init(obj_c);
                console.log(achart);
                achart.resize();
                achart.setOption({
                    title: {text: "流量曲线图"},
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        data: ["导流洞流量", "溢洪洞流量", "合计流量","导流洞开度","溢洪洞开度"]
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: "category",
                            boundaryGap: false,
                            data: this.data2.x.list,
                            axisLabel: { show: true,interval: parseInt(this.data2.x.list.length/14)},
                        }
                    ],
                    yAxis: [
                        {
                            name: "流量",
                            type: "value",
                            min: 0,
                            max: 1100
                        },
                        {
                            name: "闸门开度",
                            type: "value",
                            min: 0,
                            max: 4.1
                        }
                    ],
                    series: [
                        {
                            name: "导流洞流量",
                            type: "line",
                            yAxisIndex: 0,
                            data: this.data2.y1.list,
                            smooth:true,
                            itemStyle: {
                                normal: {
                                    color: "#006400",//折线点的颜色
                                    lineStyle: {
                                        color: "#006400"//折线的颜色
                                    }
                                }
                            },
                            // data: [0.36, 0.28, 0.36, 0.02, 0.12]
                        },
                        {
                            name: "溢洪洞流量",
                            type: "line",
                            yAxisIndex: 0,
                            data: this.data2.y2.list,
                            smooth:true,
                            itemStyle: {
                                normal: {
                                    color: "#8B0000",//折线点的颜色
                                    lineStyle: {
                                        color: "#8B0000"//折线的颜色
                                    }
                                }
                            },
                        },
                        {
                            name: "合计流量",
                            type: "line",
                            yAxisIndex: 0,
                            data: this.data2.y3.list,
                            smooth:true,
                            itemStyle: {
                                normal: {
                                    color: "#9400D3",//折线点的颜色
                                    lineStyle: {
                                        color: "#9400D3"//折线的颜色
                                    }
                                }
                            },
                        },
                    ]
                });
            },
        }
  }
</script>  