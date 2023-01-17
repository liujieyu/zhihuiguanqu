<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>大坝安全监测</BreadcrumbItem>
            <BreadcrumbItem>监测历史分析</BreadcrumbItem>
        </Breadcrumb>
		<Tabs value="sllfenxi">
	        <TabPane label="渗流量分析" name="sllfenxi">
	        	<SLLHISTORY></SLLHISTORY>               
	        </TabPane>
          <TabPane label="渗流压力分析" name="slylfenxi">
	        	<SLYLHISTORY></SLYLHISTORY>               
	        </TabPane>
          <TabPane label="位移变形分析" name="wybxfenxi">
	        	<WYBXHISTORY></WYBXHISTORY>               
	        </TabPane>
          <TabPane label="沉降变形分析" name="cjbxfenxi">
	        	<CJBXHISTORY></CJBXHISTORY>               
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SLLHISTORY from '@/warm/warm-safe/sll-history/sllhistory.vue'
  import SLYLHISTORY from '@/warm/warm-safe/slyl-history/slylhistory.vue'
  import WYBXHISTORY from '@/warm/warm-safe/spwy-history/spwyhistory.vue'
  import CJBXHISTORY from '@/warm/warm-safe/cjwy-history/cjwy-history.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SLLHISTORY,SLYLHISTORY,WYBXHISTORY, CJBXHISTORY,      
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>