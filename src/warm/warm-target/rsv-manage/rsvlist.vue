<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>维护管理</BreadcrumbItem>
            <BreadcrumbItem>防洪信息维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="rsvmanage">
	        <TabPane label="防洪信息维护" name="rsvmanage">
	        	<RsvManage></RsvManage>               
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import RsvManage from '@/warm/warm-target/rsv-manage/rsvmanage.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      RsvManage,
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>