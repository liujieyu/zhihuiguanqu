<template>
 <el-table :data="siteData" 
 height="500" 
 :loading="boxLoading"  
 border 
 row-style="height:35px;"
 header-cell-style="background-color: #F8F8F9;padding:6px 0px;"
 :span-method="handleSpan" >
 <el-table-column
          v-for="(item,index) in siteColumns"
          :prop="item.prop"
          :align="item.align"
          :label="item.label"
          :width="item.width"
  ></el-table-column>
  <el-table-column align="center" label="预警类型" :width="114">
                    <template slot-scope="scope">
                        <div>
                        <img :src="scope.row.YJTYPE === 3 ? '/static/demo-hunanguanqu/red.png' : scope.row.YJTYPE === 2 ? '/static/demo-hunanguanqu/yellow.png' : '/static/demo-hunanguanqu/purple.png'" style="width:14px;height:14px;">
                        <span style="margin-left:10px;">{{ scope.row.YJTYPE === 3 ?'水位预警' : scope.row.YJTYPE === 2 ? '雨量预警' : '设备异常'}}</span>
                        </div>
                    </template>
                </el-table-column>
  <el-table-column align="left" label="预警详情" :width="285">
                    <template slot-scope="scope">
                        {{ scope.row.YMMEMO }}
                    </template>
                </el-table-column>
 </el-table>
</template>

<script type="text/javascript">
import { Console } from 'console';
export default {
  data() {
    return {
      boxLoading: false,
      siteData:[],
      siteColumns: [
          {
            label: '所在乡镇',
            prop: 'TOWN',
            width:115,
            align:'center',
          },
          {
            label: '所在村',
            prop: 'COUNTRY',
            width:115,
            align:'center',
          },
          {
            label: '预警站点',
            prop: 'STNM',
            width:120,
            align:'center',
          },
      ],
      spanArr: [],
      position: 0,
      cunArr:[],
      cunposition:0,
      zdArr:[],
      zdposition:0
    }
  },
  methods: {
    // 组件加载中
    componentLoading() {
      this.boxLoading = true;
    },
    // 取消组件加载
    cancelComponentLoading() {
      this.boxLoading = false;
    },
    rowspan() {
             this.siteData.forEach((item,index) => {
             if( index === 0){
                 this.spanArr.push(1);
                 this.position = 0;
                 this.cunArr.push(1);
                 this.cunposition=0;
                 this.zdArr.push(1);
                 this.zdposition=0;
             }else{
                 if(this.siteData[index].TOWN === this.siteData[index-1].TOWN ){
                     this.spanArr[this.position] += 1;
                     this.spanArr.push(0);
                 }else{
                     this.spanArr.push(1);
                    this.position = index;
                 }
                 if(this.siteData[index].COUNTRY === this.siteData[index-1].COUNTRY ){
                     this.cunArr[this.cunposition] += 1;
                     this.cunArr.push(0);
                 }else{
                     this.cunArr.push(1);
                    this.cunposition = index;
                 }
                 if(this.siteData[index].STNM === this.siteData[index-1].STNM ){
                     this.zdArr[this.zdposition] += 1;
                     this.zdArr.push(0);
                 }else{
                     this.zdArr.push(1);
                    this.zdposition = index;
                 }
             }
         })
       },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
             const _row = this.spanArr[rowIndex];
             const _col = _row>0 ? 1 : 0;
             return {
                 rowspan: _row,
                 colspan: _col
             }
         }
      if (columnIndex === 1) {
             const _row = this.cunArr[rowIndex];
             const _col = _row>0 ? 1 : 0;
             return {
                 rowspan: _row,
                 colspan: _col
             }
         }
      if (columnIndex === 2) {
             const _row = this.zdArr[rowIndex];
             const _col = _row>0 ? 1 : 0;
             return {
                 rowspan: _row,
                 colspan: _col
             }
         }
      // if(columnIndex===0){
      //   if(row.ROWXZ>1){
      //     return {
      //            rowspan: row.ROWXZ,
      //            colspan: 1
      //        }
      //   }
      // }else if(columnIndex===1){
      //   if(row.ROWC>1){
      //     return {
      //            rowspan: row.ROWC,
      //            colspan: 1
      //        }
      //   }
      // }else if(columnIndex===2){
      //   if(row.ROWZD>1){
      //     return{
      //         rowspan: row.ROWZD,
      //            colspan: 1
      //     }
      //   }
      // }

        console.log(row);
    }
  },
  mounted() {
      // 组件加载中
    this.componentLoading();
      // 获取详情数据
    this.axios
      .get(`/guanqu/cursiteinfo/real`)
      .then(res => {
        var data=res.data;
        this.siteData=data.yjlist;
        this.rowspan();
        // 加载取消
        this.cancelComponentLoading();     
      });
  }
};
</script>

<style lang="less" scope>
@import "../Details/common/common.less";
</style>