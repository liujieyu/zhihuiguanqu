<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>维护管理</BreadcrumbItem>
            <BreadcrumbItem>降雨预警维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="rsvmanage">
	        <TabPane label="降雨预警维护" name="rsvmanage">
	        	<RAINManage></RAINManage>               
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import RAINManage from '@/warm/warm-target/rain-manage/rainmanage.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      RAINManage,
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>