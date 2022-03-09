<template>
<div>
 <Row type="flex" :gutter="16" class="rowtocol">
     <Col>
        行政区划:
        <!-- 地址级联选择器 -->
        <el-cascader
            clearable
            size="small"
            placeholder="请选择地址"
            :options="form.adressList"
            v-model="form.model_adress"
            @change="XZQHsearch"
            change-on-select
        ></el-cascader>
    </Col> 
    <Col>
    <!-- 姓名模糊搜索 -->
        <Input search enter-button suffix="ios-search" placeholder="请输入姓名" style="width: 180px;margin-right: 20px;" @on-search="search" v-model="form.searchname" />
    </Col>

    <Col> 
        <Button type="primary"  @click="checkman">确认</Button>
    </Col>
 </Row>
  <el-table
   :data="data"
    border
    v-loading="loading"
    style="width: 100%;margin-top:10px;"
    @selection-change="changeFun"
    ref="checktable"
     @row-click="handleRowClick"
   >
   <el-table-column type="selection" width="55"></el-table-column>
   <el-table-column
    prop="NM"
    label="姓名"
    align="center"
    min-width="120">
   </el-table-column>
   <el-table-column
    prop="MOBILE"
    label="手机号码"
    align="center"
    min-width="120">
   </el-table-column>
   <el-table-column
    label="部门"
    prop="UNIT"
    align="center"
    min-width="160">
   </el-table-column>
   <el-table-column
    label="职务"
    prop="ZW"
    align="center"
    min-width="140">
   </el-table-column>
   <el-table-column
    label="行政区划"
    prop="AD_NM"
    align="center"
    min-width="160">
   </el-table-column>
    </el-table>
</div>
</template>
<script type="text/javascript">
import GetDataMethods from "@/assets/commonJS/GetDataMethods";
	export default {
        props: {
            info: {}
        },
        data(){
            return{
                loading:false,
                data:[],
                currentinfo:[],
                form:{
                    adressList:[],
                    model_adress:'',
                    searchname:'',
                    xzqh:'',
                }
            }
        },
        mixins: [GetDataMethods],
        mounted(){
            this.Reload();
            //行政区划
            this.getTableData_WRP_AD_B(data => {
                this.form.adressList = data;             
            });
        },
        methods:{
            Reload(){
                this.loading = true;   
                if (this.form.model_adress.length == 0) {
                  this.form.xzqh = null; 
                }
                if (this.form.model_adress.length == 1) {
                  var str1 = this.form.model_adress[0];
                  str1 = str1.substring(0,6);
                  this.form.xzqh = str1; 
                }
                if (this.form.model_adress.length == 2) {
                  var str2 = this.form.model_adress[1];
                  str2 = str2.substring(0,9);
                  this.form.xzqh = str2; 
                }
                if (this.form.model_adress.length == 3) {
                  var str3 = this.form.model_adress[2];
                  str3 = str3.substring(0,12);
                  this.form.xzqh = str3; 
                }           
                this.axios.get('/alarm/getman',{params:{types:this.info.type,adCd:this.form.xzqh,nm:this.form.searchname}}).then((res)=>{
                    this.loading = false;
                    this.data = res.data; 
                    let that=this;                  
                    setTimeout(function(){that.$emit('setHeight');}, 50);
                                  
                });
            },
            //行政区划
            XZQHsearch(){
              this.Reload();
            },
            //姓名模糊查询
            search(){
              this.Reload();
            },
            //选中记录
            changeFun(val){
              this.currentinfo=val;              
            },
            //确认
            checkman(){
                this.info.list=this.currentinfo;
                this.$emit('closedailog');
            },
            handleRowClick(row, column, event){
              this.$refs.checktable.toggleRowSelection(row);
            }
   },
}
</script>