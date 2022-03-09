<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol">
                <Col>
                计划年份:
                <Select v-model="form.year" :clearable="false" @on-change="Consearch" style="width:100px;">
                    <Option
                    v-for="obj in yearlist"
                    :key="obj.value"
                    :label="obj.label"
                    :value="obj.value">
                    </Option>
                </Select>
                </Col>
                <Col>
                管理机构:
                <Select v-model="form.gljg" @on-change="Consearch" style="width:120px;margin-left: 5px;margin-right: 20px;" clearable>
                    <Option v-for="item in gljglist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </Col>
                <Col>
                 <Button type="primary" style="width: auto;margin-right: 20px;" @click="exportData">导出</Button>
                </Col>
            </Row>
            <Row class="fgline"></Row>
            <el-table
    :data="data"
    style="width: 100%;margin-bottom: 20px;"
    row-key="ID"
    :height="theight"
    border
    @row-click="clickTable"
    @expand-change="expandchange"
     ref="refTable"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column v-for="(column, index) in columns" :prop="column.value" :label="column.text" :min-width="column.minwidth" :fixed="column.fixed" :align="column.algin" :key="Math.random()">
    </el-table-column>
  </el-table>
        </Content>
    </div>
</template>
<script type="text/javascript">
import WarmDataConfig from "@/assets/commonJS/WarmDataConfig"
export default {
        data() {
        return {
            theight:window.innerHeight-282,
            loading:false,
            yearlist:[],
            gljglist:[],
                form:{
                    year:'',
                    gljg:'',
                }, 
            columns: [
        {
          text: "管理机构",
          value: "ORGAN_NAME",
          minwidth: 180,
          fixed:"left",
          algin:"left",
        },
        {
          text: "支渠名称",
          value: "CANAL_NANME",
          minwidth: 150,
          fixed:"left",
          algin:"center",
        },
        {
          text: "一月",
          value: "ONE",
          minwidth: 80, 
          algin:"center",
        },
        {
          text: "二月",
          value: "TWO",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "三月",
          value: "THREE",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "四月",
          value: "FOUR",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "五月",
          value: "FIVE",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "六月",
          value: "SIX",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "七月",
          value: "SEVEN",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "八月",
          value: "EIGHT",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "九月",
          value: "NINE",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "十月",
          value: "TEN",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "十一月",
          value: "ELEVEN",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "十二月",
          value: "TWELVE",
          minwidth: 80,
          algin:"center",
        },
        {
          text: "年度总计",
          value: "SUMW",
          minwidth: 100,
          fixed:"right",
          algin:"center",
        },
      ],
      data: []
        };
      },
      // 引入过滤方法到此组件
      mixins: [WarmDataConfig],
      mounted() {
            //计划年份
            var now=new Date();
            var year=now.getFullYear();
            for(var i=0;i<10;i++){
                var yobj=new Object();
                yobj.value=year-i;
                yobj.label=(year-i)+'年';
                this.yearlist.push(yobj);
            }
            this.form.year=year;
            //管理机构
            this.Get_Gljginfo(2,data => {
                this.gljglist = data;
            });
            this.Reload();
      },
      methods: {
          Reload(){
              this.loading = true;
              this.axios.get('/waterplan/planinfo',{params:{year:this.form.year,organCode:this.form.gljg}}).then((res)=>{
                    debugger;
                    this.data = res.data;
                    this.loading = false;
                });
          },
          Consearch(){
              this.Reload();
          },
          clickTable(row,index,e){
           this.$refs.refTable.toggleRowExpansion(row);
          },
          expandchange(data){
                setTimeout(()=> {
                            this.$refs.refTable.doLayout();
                        },100);
          },
          exportData(){
                var params='year='+this.form.year+'&organCode='+this.form.gljg;
                window.location.href='/excel/exportwaterplan?'+params;
          },
       },
      components: {   
      }
    }
</script>