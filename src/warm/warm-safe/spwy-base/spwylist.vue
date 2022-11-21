<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>基础信息</BreadcrumbItem>
            <BreadcrumbItem>位移变形信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="spwylinfo">
	        <TabPane label="位移变形信息" name="spwylinfo">

	        	<SPWYInfo></SPWYInfo>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SPWYInfo from '@/warm/warm-safe/spwy-base/spwyinfo.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SPWYInfo,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>