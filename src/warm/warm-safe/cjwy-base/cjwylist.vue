<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>基础信息</BreadcrumbItem>
            <BreadcrumbItem>沉降变形信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="cjwylinfo">
	        <TabPane label="沉降变形信息" name="cjwylinfo">

	        	<CJWYInfo></CJWYInfo>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import CJWYInfo from '@/warm/warm-safe/cjwy-base/cjywinfo.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      CJWYInfo,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>