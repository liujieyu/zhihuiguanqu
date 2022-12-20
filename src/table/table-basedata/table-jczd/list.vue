<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>监测站点</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="jczd">
	        <TabPane label="监测站点" name="jczd">
	        	<Jzcd></Jzcd>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import Jzcd from '@/table/table-basedata/table-jczd/jczd.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: {
        Jzcd,

      }
    }
</script>

<style type="text/css">

</style>
