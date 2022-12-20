<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>历史分析</BreadcrumbItem>
            <BreadcrumbItem>位移变形分析</BreadcrumbItem>
        </Breadcrumb>
		<Tabs value="wybxfenxi">
	        <TabPane label="位移变形分析" name="wybxfenxi">
	        	<WYBXHISTORY></WYBXHISTORY>               
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import WYBXHISTORY from '@/warm/warm-safe/spwy-history/spwyhistory.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      WYBXHISTORY,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>