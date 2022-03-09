<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>图像视频</BreadcrumbItem>
            <BreadcrumbItem>图像信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="history">
	        <TabPane label="历史" name="history">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Tablehistory from '@/table/table-tx/table-history.vue'
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
