<template>
  <div v-loading="boxLoading">
              <table cellspacing="0" width="100%" class="table_detail">
                <tr>
                  <td align="right" class="dt_name">上传日期：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #C7CCD6">{{ mefileInfo.TMSTR || "&nbsp;" }}</td>
                  <td align="right" class="dt_name" >上传人员：</td>
                  <td align="center" class="dt_vale">{{mefileInfo.UP_MAN|| "&nbsp;"}}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">测量人：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #C7CCD6">{{ mefileInfo.ME_MAN || "&nbsp;" }}</td>
                  <td align="right" class="dt_name">审核状态：</td>
                  <td align="center" class="dt_vale">{{ mefileInfo.RESULT || "&nbsp;" }}</td>
                </tr>
                <tr>
                  <td align="right" class="dt_name">备注：</td>
                  <td align="center" class="dt_vale" colspan="3" style="padding-left:10px;padding-right:10px;">{{ mefileInfo.MEMO || "&nbsp;" }}</td>
                </tr>
                <tr v-if="audin">
                  <td align="right" class="dt_name">审核日期：</td>
                  <td align="center" class="dt_vale" style="border-right: 1px solid #C7CCD6">
                      <el-date-picker
                            style="width: 160px"
                            v-model="form.audiTm"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            size="small"
                            :clearable="false">
                    </el-date-picker>
                    <span style="color:red">*</span>
                  </td>
                  <td align="right" class="dt_name" >审核人员：</td>
                  <td align="center" class="dt_vale">
                      <Input v-model="form.audiMan" :value="form.audiMan" clearable style="width:160px"/>
                      <span style="color:red">*</span>
                  </td>
                </tr>
              </table>
              <el-table
                        :data="data"
                        border
                        :height="350"
                        style="width: 100%;margin-top:5px;"
                        >
                        <el-table-column
                          label=" "
                          prop="ROWID"
                          align="center"
                          width="45"
                          fixed="left"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="STNM"
                          label="测量站名"
                          align="center"
                          fixed="left"
                          min-width="120">
                        </el-table-column>
                        <el-table-column
                          prop="ME_TMSTR"
                          label="测量日期"
                          align="center"
                          min-width="120"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Z"
                          label="水深"
                          align="center"
                          min-width="90"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="Q"
                          label="流量"
                          align="center"
                          show-overflow-tooltip="true" 
                          min-width="90"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="CANAL_NAME"
                          label="所属渠道"
                          align="center"
                          min-width="150">
                        </el-table-column>
                      </el-table>
                    <div style="margin: 10px;overflow: hidden;">
                        <div style="float: right;font-size:12px;">
                            <Page 
                            :total="list_input1.total" 
                            :current="list_input1.current" show-sizer 
                            :page-size="list_input1.pagesize" :page-size-opts="list_input1.pagesizeopts"
                            @on-change="CurrentChange"
                            @on-page-size-change="PagesizeChange"
                            size="small"
                            show-total
                            show-elevator
                            ></Page>
                        </div>
                    </div>
  <div v-if="audin">
                <div style="width:100%;text-align:center;">
                    <Button type="primary" @click="onSubmit(2)" >审核通过</Button>
                    <Button type="primary" @click="onSubmit(3)" style="margin-left:20px;">作废</Button>
                </div>
  </div>
  </div>
</template>
<script type="text/javascript">
export default {
    props: {
    info: {}
  },
  data() {
    return {
       //上传文件信息
      mefileInfo: {},
      // 整块区域的加载控制
      boxLoading: false,
      //审核栏
      audin:false,
      data:[],
    list_input1:{
        total:100,
        pagesize:50,
        pagesizeopts:[10,20,50,75,100,200],
        current:1,
    },
    form:{
        audiTm:'',
        audiMan:''
    },
    }
  },
  methods: {
    // 处理页码切换
    CurrentChange(index) {
        this.list_input1.current = index;
        this.Reload();
    },
    // 处理每页显示条数切换
    PagesizeChange(pagesize) {
        this.list_input1.pagesize = pagesize;
        this.list_input1.current=1;
        this.Reload();  
    },
    Reload(){
    this.boxLoading = true;
    var _currentPage = this.list_input1.current;
    var _pageSizes = this.list_input1.pagesize;
    var _bgincount=(_currentPage - 1) * _pageSizes+1;
    var _endcount=_currentPage * _pageSizes; 
    
      // 获取详情数据
    this.axios.get(`/strealmanage/filedetail`,{params:{meCode:this.info.ME_CODE,begincount:_bgincount,endcount:_endcount}})
      .then(res => {
        this.mefileInfo=res.data.info;
        this.data = res.data.rows;
        this.list_input1.total = res.data.total;
        this.boxLoading = false;     
      });
    },
    onSubmit(auditing){
        if(this.form.audiTm==''){
            this.$message({ type: 'warning', message: '请输入审核时间！' });
              return;
        }
        if(this.form.audiMan==''){
            this.$message({ type: 'warning', message: '请输入审核人员！' });
              return;
        }
        this.axios.get(`/strealmanage/auditing`,{params:{meCode:this.info.ME_CODE,audiTm:this.form.audiTm,audiMan:this.form.audiMan,audinting:auditing}})
        .then(res => {
            if(res.data=="ok"){
                if(auditing==2){
                    this.$message({ type: 'success', message: this.info.FILE_NAME+'审核通过！' }); 
                }else{
                    this.$message({ type: 'success', message: this.info.FILE_NAME+'作废！' });
                }
                this.$emit('closedailog');
            }    
        });      
    },
  },
  mounted() {
      var date = new Date();
            var Month = date.getMonth() + 1;
            Month=Month<10?"0"+Month:Month;
            var day=date.getDate();
            day=day<10?"0"+day:day;
      this.form.audiTm=date.getFullYear() + '-' + Month + '-' + day;
      this.audin=this.info.audin;
      this.Reload();
  }
};
</script>

<style lang="less" scope>

.table_detail {
 border:1px solid #C7CCD6;
 border-collapse:collapse; 
  td {
    height: 35px;
    border-top: none;
    border:1px solid #C7CCD6;
  }

  .dt_name {
    width: 20%;
  }

  .dt_vale {
    width: 30%;
  }
}
</style>