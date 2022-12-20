<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>基础信息</BreadcrumbItem>
            <BreadcrumbItem>断面信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="duanmianinfo">
	        <TabPane label="断面信息" name="duanmianinfo">

	        	<DuanMianInfo></DuanMianInfo>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import DuanMianInfo from '@/warm/warm-safe/dm-base/duanmian.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      DuanMianInfo,
        
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>