<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>维护管理</BreadcrumbItem>
            <BreadcrumbItem>大坝安全</BreadcrumbItem>
            <BreadcrumbItem>断面维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="duanmianmanage">
	        <TabPane label="断面维护" name="duanmianmanage">

	        	<DuanMianManage></DuanMianManage>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import DuanMianManage from '@/warm/warm-safe/dm-manage/dmmanage.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      DuanMianManage,
        
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>