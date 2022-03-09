<template>
  <el-table
   :data="data"
   :span-method="objectSpanMethod"
    border
   v-loading="loading"
     style="width: 100%;height:100%"
   >
   <el-table-column
    label="值班职务"
    prop="TYPENAME"
    align="center"
    min-width="120">
</el-table-column>
<el-table-column
    prop="NAME"
    label="姓名"
    align="center"
    min-width="120">
</el-table-column>
<el-table-column
    prop="PHONE"
    label="联系电话"
    align="center"
    min-width="160">
</el-table-column>
    </el-table>
</template>
<script type="text/javascript">
	export default {
        props: {
            info: {}
        },
        data(){
            return{
                loading:false,
                data:[],
                rowList: [],
                spanArr: [],
                position: 0
            }
        },
        mounted(){
            this.Reload();
        },
        methods:{
            Reload(){
                this.loading = true;              
                this.axios.get('/alarm/plandetail/'+this.info.DT).then((res)=>{
                    this.loading = false;
                    this.data = res.data;
                    this.rowspan();
                });
            },
            rowspan() {
             this.data.forEach((item,index) => {
             if( index === 0){
                 this.spanArr.push(1);
                 this.position = 0;
             }else{
                 if(this.data[index].TYPENAME === this.data[index-1].TYPENAME ){
                     this.spanArr[this.position] += 1;
                     this.spanArr.push(0);
                 }else{
                     this.spanArr.push(1);
                    this.position = index;
                 }
             }
         })
       },
     objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
         if (columnIndex === 0) {
             const _row = this.spanArr[rowIndex];
             const _col = _row>0 ? 1 : 0;
             return {
                 rowspan: _row,
                 colspan: _col
             }
         }
     }
   },
}
</script>