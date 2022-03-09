<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>水情信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="qdsq">
	        <TabPane label="渠道水情" name="qdsq">

	        </TabPane>
	        <TabPane label="闸阀水情" name="zfsq">

	        </TabPane>
	        <TabPane label="水库水情" name="sksq">

	        </TabPane>
	        <TabPane label="河道水情" name="hdsq">

	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	// import Tablehour from '@/table/table-zfsq/table-hour.vue'
	// import Tableday from '@/table/table-zfsq/table-day.vue'
	// import Tablemonth from '@/table/table-zfsq/table-month.vue'
	// import Tablehistory from '@/table/table-zfsq/table-history.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        // Tablehour,
        // Tableday,
        // Tablemonth,
        // Tablehistory
      }
    }
</script>

<style type="text/css">
	
</style>