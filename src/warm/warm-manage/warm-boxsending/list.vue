<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>预警管理</BreadcrumbItem>
            <BreadcrumbItem>短信查询</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmsending">
	        <TabPane label="发送短信查询" name="warmsending">
	        	<WarmSending @showdailog="showdailog"></WarmSending>               
	        </TabPane>
          <TabPane label="接收短信查询" name="warmreceived">
	        	<Warmreceived></Warmreceived>   
	        </TabPane>
	    </Tabs>
   <!--详情对话框-->
  <div v-if="dialogTableVisible">
  <el-dialog title="发送短信详情" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true" :close-on-click-modal="false" :modal-append-to-body="false"  :modal="false"  @close="beforeclose">
  <!--发送短信详情-->
        <WarmBoxInfo :info="dailog.info" v-if="dailog.info.itype=='fasongduanxin'"></WarmBoxInfo>
   </el-dialog>
  </div>
	</div>
</template>

<script type="text/javascript">
  import WarmSending from '@/warm/warm-manage/warm-boxsending/warmsending.vue'
  //发送短信详细信息框
  import WarmBoxInfo from "@/warm/warm-detail/Detail-boxsending1.vue";
  import Warmreceived from '@/warm/warm-manage/warm-boxreceived/warmreceived.vue'
	export default {
        data() {
        return { 
          dialogTableVisible:false,
          dailog: {
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
          this.dailog={};
        },
       },
      computed: { },
      components: { 
        WarmSending,
        WarmBoxInfo,
        Warmreceived
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>