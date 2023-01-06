<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>维护管理</BreadcrumbItem>
            <BreadcrumbItem>大坝安全测点</BreadcrumbItem>
            <BreadcrumbItem>位移变形维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="spwymanage">
	        <TabPane label="位移变形维护" name="spwymanage">

	        	<SPWYManage></SPWYManage>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SPWYManage from '@/warm/warm-safe/spwy-manage/spwymanage.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SPWYManage,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>