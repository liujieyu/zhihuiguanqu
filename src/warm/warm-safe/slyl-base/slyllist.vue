<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>基础信息</BreadcrumbItem>
            <BreadcrumbItem>渗流压力信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="slylinfo">
	        <TabPane label="渗流压力信息" name="slylinfo">

	        	<SLYLInfo></SLYLInfo>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SLYLInfo from '@/warm/warm-safe/slyl-base/slylinfo.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SLYLInfo,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>