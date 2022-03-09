<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>值班管理</BreadcrumbItem>
    <BreadcrumbItem>值班通讯录维护</BreadcrumbItem>
    </Breadcrumb>

	<Tabs value="dutyinfomanage">
	  <TabPane label="值班通讯录维护" name="dutyinfomanage">
	    <AddrManage ref="addmanage" @showdailog="showdailog"></AddrManage>
	  </TabPane>
	</Tabs>
      <!--表单对话框-->
  <div v-if="dialogTableVisible">
  <el-dialog width="600px" :title="dailog.title" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true"   :close-on-click-modal="false" :modal-append-to-body="false" :modal="false"  @close="beforeclose">
  <!--表单详情-->
        <DutyInfo :info="dailog" v-if="dailog.itype=='dutyform'" @closedailog="closedailog"></DutyInfo>
   </el-dialog>
	</div>
  </div>
</template>

<script type="text/javascript">
  import AddrManage from '@/warm/warm-duty/addrlist-manage/addrmanage.vue'
  import DutyInfo from '@/warm/warm-detail/Detail-dutyinfo.vue'
  export default {
    data() {
        return { 
          //对话框
          dialogTableVisible:false,
          dailog: {},
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
        this.dailog={};
      },
      //确认
      closedailog(year){
        let list=this.$refs['addmanage'].years;
        let sign=0;
        for(let i=0;i<list.length;i++){
           if(year==list[i].value){
             sign=1;
             break;
           }
        }
        if(sign==0){
          this.$refs['addmanage'].getyears();
        }else{
          this.$refs['addmanage'].Reload();
        }
        if(this.dailog.sign=="update"){
          this.dialogTableVisible=false;
          this.beforeclose();
        }
      }
      },
    computed:{ },
    components:{ 
    AddrManage,
    DutyInfo
    }
  }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>