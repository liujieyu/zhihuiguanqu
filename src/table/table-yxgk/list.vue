<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>运行工况</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="history">
	        <TabPane label="运行工况" name="history">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Tablehistory from '@/table/table-yxgk/table-history.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: {
        Tablehistory,

      }
    }
</script>

<style type="text/css">

</style>
