<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>预警管理</BreadcrumbItem>
            <BreadcrumbItem>发送短信</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="sendmessage">
	        <TabPane label="短信发送" name="sendmessage">

	        	<WarmSend ref="warmsend" :maninfo="dailog.info" @showdailog="showdailog"></WarmSend>
                
	        </TabPane>
	    </Tabs>
  <!--详情对话框-->
  <div v-if="dialogTableVisible">
  <el-dialog :title="dailog.title" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true"   :close-on-click-modal="false" :modal-append-to-body="false" :modal="false"  @close="beforeclose">
  <!--短信发送人员详情-->
        <div id="showdiv">
        <WarmSendman :info="dailog" v-if="dailog.itype=='fasongrenyuan'" @closedailog="closedailog" @setHeight="setHeight"></WarmSendman>
        </div>
   </el-dialog>
	</div>
	</div>
</template>

<script type="text/javascript">
  import WarmSend from '@/warm/warm-manage/warm-sendmessage/warmsend.vue'
  //短信发送人员详细对话框
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
          this.$refs['warmsend'].cancelcheck(this.dailog.type);         
        }
        this.dailog={};
      },
      //确认
      closedailog(){
        this.$refs['warmsend'].showphone(this.dailog);
        this.dialogTableVisible=false;
        this.beforeclose();
      },
      //设置对话框高度
      setHeight(){
        let obj=document.getElementsByClassName("el-dialog")[0];
        if(obj.clientHeight>document.documentElement.clientHeight){
          obj.style.height = (document.documentElement.clientHeight*0.7)+"px";
        }      
      }
      },
      computed: { },
      components: { 
        WarmSend,
        WarmSendman
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>