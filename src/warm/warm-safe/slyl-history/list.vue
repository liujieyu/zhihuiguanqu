<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>历史分析</BreadcrumbItem>
            <BreadcrumbItem>渗流压力分析</BreadcrumbItem>
        </Breadcrumb>
		<Tabs value="slylfenxi">
	        <TabPane label="渗流压力分析" name="slylfenxi">
	        	<SLYLHISTORY></SLYLHISTORY>               
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SLYLHISTORY from '@/warm/warm-safe/slyl-history/slylhistory.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SLYLHISTORY,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>