<template>
<div>
 <Row type="flex" :gutter="16" class="rowtocol">
     <Col>
     <Input search enter-button suffix="ios-search" placeholder="请输入姓名/部门/职务/电话号码" style="width: 260px;margin-left: 5px;" @on-search="search" v-model="form.searchmsg" />
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
    min-width="150">
   </el-table-column>
   <el-table-column
    label="职务"
    prop="POSITION"
    align="center"
    min-width="150">
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
                form:{searchmsg:''},
            }
        },
        mixins: [GetDataMethods],
        mounted(){
            this.Reload();
        },
        methods:{
            Reload(){
                this.loading = true;  
                var type=this.info.j+1;   
                var text=this.form.searchmsg;        
                this.axios.get(`/alarm/getaddrtype/${type}&${text}`).then((res)=>{
                    this.loading = false;
                    this.data = res.data;                 
                });
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
            //查询
            search(){
                this.Reload();
            },
            handleRowClick(row, column, event){
              this.$refs.checktable.toggleRowSelection(row);
            }
   },
}
</script>