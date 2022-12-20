<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>预警管理</BreadcrumbItem>
            <BreadcrumbItem>短信查询</BreadcrumbItem>
            <BreadcrumbItem>接收短信查询</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmreceived">
	        <TabPane label="接收短信查询" name="warmreceived">

	        	<Warmreceived></Warmreceived>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import Warmreceived from '@/warm/warm-manage/warm-boxreceived/warmreceived.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Warmreceived,
        
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>