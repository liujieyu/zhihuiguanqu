<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>水雨情监测</BreadcrumbItem>
            <BreadcrumbItem>监测站点</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="jczd">
	        <TabPane label="站点信息" name="jczd">
	        	<Jzcd></Jzcd>
	        </TabPane>
          <TabPane label="水库站信息" name="skzd">
	        	<Skzd></Skzd>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import Jzcd from '@/table/table-basedata/table-jczd/jczd.vue'
  import Skzd from '@/table/table-basedata/table-jczd/skzd.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: {
        Jzcd,
        Skzd
      }
    }
</script>

<style type="text/css">

</style>
