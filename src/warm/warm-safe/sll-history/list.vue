<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 0 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>历史分析</BreadcrumbItem>
            <BreadcrumbItem>渗流量分析</BreadcrumbItem>
        </Breadcrumb>
		<Tabs value="sllfenxi">
	        <TabPane label="渗流量分析" name="sllfenxi">
	        	<SLLHISTORY></SLLHISTORY>               
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SLLHISTORY from '@/warm/warm-safe/sll-history/sllhistory.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SLLHISTORY,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>