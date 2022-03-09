<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>历史数据</BreadcrumbItem>
            <BreadcrumbItem>水情信息</BreadcrumbItem>
            <BreadcrumbItem>水库水情</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="xsb">
	        <TabPane label="小时表" name="xsb">
	        	正在开发中...
	        </TabPane>
	        <TabPane label="日表" name="rb">
	        	正在开发中...
	        </TabPane>
	        <TabPane label="月表" name="yb">
	        	正在开发中...
	        </TabPane>
	        <TabPane label="年表" name="nb">
	        	正在开发中...
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