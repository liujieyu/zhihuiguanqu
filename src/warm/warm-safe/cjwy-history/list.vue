<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>历史分析</BreadcrumbItem>
            <BreadcrumbItem>沉降变形分析</BreadcrumbItem>
        </Breadcrumb>
		<Tabs value="cjbxfenxi">
	        <TabPane label="沉降变形分析" name="cjbxfenxi">
	        	<CJBXHISTORY></CJBXHISTORY>               
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import CJBXHISTORY from '@/warm/warm-safe/cjwy-history/cjwy-history.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      CJBXHISTORY,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>