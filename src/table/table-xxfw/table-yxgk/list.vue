<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>水雨情监测</BreadcrumbItem>
            <BreadcrumbItem>历史分析</BreadcrumbItem>
            <BreadcrumbItem>运行工况</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="yxgk">
	        <TabPane label="运行工况" name="yxgk">
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
        Tablehistory
      }
    }
</script>

<style type="text/css">

</style>
