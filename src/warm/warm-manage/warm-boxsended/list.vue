<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>预警管理</BreadcrumbItem>
            <BreadcrumbItem>预警查询</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmsite">
          <TabPane label="站点预警" name="warmsite">
	        	<WarmSite></WarmSite>               
	        </TabPane>
	        <TabPane label="短信预警查询" name="warmsend">
	        	<WarmSended @showdailog="showdailog"></WarmSended>               
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
  import WarmSite from '@/warm/warm-manage/warm-siteinfo/siteinfo.vue'
  import WarmSended from '@/warm/warm-manage/warm-boxsended/warmsended.vue'
  //发送短信详细信息框
  import WarmBoxInfo from "@/warm/warm-detail/Detail-boxsending1.vue";
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
        WarmSite,
        WarmSended,
        WarmBoxInfo
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>