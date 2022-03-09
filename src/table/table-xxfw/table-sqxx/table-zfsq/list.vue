<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>水情信息</BreadcrumbItem>
            <BreadcrumbItem>闸阀水情</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="xsb">
	        <TabPane label="小时表" name="xsb">
	        	<Tablehour></Tablehour>
	        </TabPane>
	        <TabPane label="日表" name="rb">
	        	<Tableday></Tableday>
	        </TabPane>
	        <TabPane label="月表" name="yb">
	        	<Tablemonth></Tablemonth>
	        </TabPane>
	        <TabPane label="历史表" name="nb">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Tablehour from '@/table/table-zfsq/table-hour.vue'
	import Tableday from '@/table/table-zfsq/table-day.vue'
	import Tablemonth from '@/table/table-zfsq/table-month.vue'
	import Tablehistory from '@/table/table-zfsq/table-history.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Tablehour,
        Tableday,
        Tablemonth,
        Tablehistory
      }
    }
</script>

<style type="text/css">
	
</style>