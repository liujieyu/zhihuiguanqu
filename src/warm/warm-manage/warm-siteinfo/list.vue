<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>预警管理</BreadcrumbItem>
            <BreadcrumbItem>站点预警</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmsite">
	        <TabPane label="站点预警" name="warmsite">

	        	<WarmSite @showdailog="showdailog"></WarmSite>
                
	        </TabPane>
	    </Tabs>
        <!--详情对话框-->
  <div v-if="dialogTableVisible">
  <el-dialog title="站点预警详情" width="570px" :visible.sync="dialogTableVisible" v-dialogDrag:{dialogDrag}="true"  v-dialogChange:{dialogChange}="true" :close-on-click-modal="false"  :modal="false" :modal-append-to-body="false"  @close="beforeclose">
  <!--站点预警详情-->
        <WarmSiteInfo :info="dailog.info" v-if="dailog.info.itype=='yujingxiangqing'"></WarmSiteInfo>
   </el-dialog>
  </div>
	</div>
</template>

<script type="text/javascript">
  import WarmSite from '@/warm/warm-manage/warm-siteinfo/siteinfo.vue'
  //站点预警详细信息框
  import WarmSiteInfo from "@/warm/warm-detail/Detail-siteinfo1.vue"
	export default {
        data() {
        return { 
          dialogTableVisible:false,
          dailog: {
            info:{}
          },
        };
      },

      mounted() {},
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
        WarmSiteInfo      
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>