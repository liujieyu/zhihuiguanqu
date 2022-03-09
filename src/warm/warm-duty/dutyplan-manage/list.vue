<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>值班管理</BreadcrumbItem>
    <BreadcrumbItem>值班安排维护</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="planmanage">
	  <TabPane label="值班安排维护" name="planmanage">
	    <PlanManage ref="planmanage" @showdailog="showdailog"></PlanManage>
	  </TabPane>
	</Tabs>
  <!--详情对话框-->
  <div v-if="dialogTableVisible">
  <el-dialog :title="dailog.title" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true"   :close-on-click-modal="false" :modal-append-to-body="false" :modal="false"  @close="beforeclose">
  <!--短信发送人员详情-->
        <div id="showdiv">
        <DutyMan :info="dailog" v-if="dailog.itype=='zhibanrenyuan'" @closedailog="closedailog"></DutyMan>
        </div>
   </el-dialog>
	</div>
  </div>
</template>

<script type="text/javascript">
  import PlanManage from '@/warm/warm-duty/dutyplan-manage/planmanage.vue'
  //值班通讯录详细对话框
  import DutyMan from "@/warm/warm-detail/Detail-dutyman.vue";
  export default {
    data(){
      return{ 
        maininfo:[],
          //对话框
          dialogTableVisible:false,
          dailog: {},
      };
    },
    
    methods:{ 
      //显示对话框
      showdailog(info){
        this.dailog=info;
        this.dialogTableVisible=true;
      },
      //确认
      closedailog(){
        this.$refs['planmanage'].showphone(this.dailog);
        this.dialogTableVisible=false;
        this.dailog={};
      }
    },
    computed:{ },
    components:{ 
    PlanManage,
    DutyMan,
    }
  }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>