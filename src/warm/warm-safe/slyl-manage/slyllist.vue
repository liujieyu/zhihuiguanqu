<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>大坝安全测点</BreadcrumbItem>
            <BreadcrumbItem>渗流压力维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="slylmanage">
	        <TabPane label="渗流压力维护" name="slylmanage">

	        	<SLYLManage></SLYLManage>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SLYLManage from '@/warm/warm-safe/slyl-manage/slylmanage.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SLYLManage,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>