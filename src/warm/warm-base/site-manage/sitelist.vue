<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>维护管理</BreadcrumbItem>
            <BreadcrumbItem>监测站点维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="sitemanage">
	        <TabPane label="监测站点维护" name="sitemanage">

	        	<SiteManage></SiteManage>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SiteManage from '@/warm/warm-base/site-manage/sitemanage.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SiteManage,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>