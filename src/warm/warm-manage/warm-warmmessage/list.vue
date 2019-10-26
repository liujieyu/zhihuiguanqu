<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>预警管理</BreadcrumbItem>
            <BreadcrumbItem>预警短信发布</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmmessage">
	        <TabPane label="预警短信发布" name="warmmessage">

	        	<WarmMessage ref="warmmessage" :maninfo="dailog.info" @showdailog="showdailog"></WarmMessage>
                
	        </TabPane>
	    </Tabs>
  <!--详情对话框-->
  <div v-if="dialogTableVisible">
  <el-dialog :title="dailog.title" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true"   :close-on-click-modal="false" :modal-append-to-body="false" :modal="false"  @close="beforeclose">
  <!--预警人员详情-->
        <WarmSendman :info="dailog" v-if="dailog.itype=='fasongrenyuan'" @closedailog="closedailog"></WarmSendman>
   </el-dialog>
	</div>
	</div>
</template>

<script type="text/javascript">
  import WarmMessage from '@/warm/warm-manage/warm-warmmessage/warmmessage.vue'
  //预警人员详细对话框
  import WarmSendman from "@/warm/warm-detail/Detail-sendman.vue";
	export default {
        data() {
        return { 
          maininfo:[],
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
        if(this.dailog.list.length==0){
          this.$refs['warmmessage'].cancelcheck(this.dailog.type);         
        }
        this.dailog={};
      },
      //确认
      closedailog(){
        this.$refs['warmmessage'].showphone(this.dailog);
        this.dialogTableVisible=false;
        this.beforeclose();
      }
      },
      computed: { },
      components: { 
        WarmMessage,
        WarmSendman
      }
    }
</script>

<style type="text/css">
	
</style>