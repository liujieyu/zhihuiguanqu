<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>值班管理</BreadcrumbItem>
            <BreadcrumbItem>值班安排</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmdutyplan">
	        <TabPane label="值班安排" name="warmdutyplan">
	        	<Warmdutyplan @showdailog="showdailog"></Warmdutyplan>               
	        </TabPane>
	    </Tabs>
        <!--详情对话框-->
  <div v-if="dialogTableVisible">
  <el-dialog :title="dailog.detailtitle" width="450px" height="450px" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true"   :close-on-click-modal="false" :modal-append-to-body="false" :modal="false"  @close="beforeclose">
  <!--值班安排详情-->
  <WarmDutyplan :info="dailog.info" v-if="dailog.info.itype=='zhibanxiangqing'"></WarmDutyplan>
   </el-dialog>
  </div>
	</div>
</template>

<script type="text/javascript">
  import Warmdutyplan from '@/warm/warm-duty/warm-dutyplan/warmdutyplan.vue'
  //值班安排详细对话框
  import WarmDutyplan from "@/warm/warm-detail/Detail-dutyplan.vue";
	export default {
        data() {
        return { 
              //对话框
          dialogTableVisible:false,
          dailog: {
          detailtitle:'',
          info:{}
          },
        };
      },

      mounted() { },
      methods: { 
        //显示对话框
        showdailog(info){
            this.dailog=info;
            this.dialogTableVisible=true;
          },
          //关闭对话框
          beforeclose(){
            this.dailog={info:{}};
          },
      },
      computed: { },
      components: { 
        Warmdutyplan,
        //值班安排
        WarmDutyplan
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>