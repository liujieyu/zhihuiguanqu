<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>基础信息</BreadcrumbItem>
            <BreadcrumbItem>渗流量信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="sllinfo">
	        <TabPane label="渗流量信息" name="sllinfo">

	        	<SLLInfo></SLLInfo>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SLLInfo from '@/warm/warm-safe/sll-base/sllinfo.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SLLInfo,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>