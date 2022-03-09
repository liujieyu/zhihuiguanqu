<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>水情信息</BreadcrumbItem>
            <BreadcrumbItem>河道水情</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="hdhour">
	        <TabPane label="小时表" name="hdhour">
	        	<Tablehour></Tablehour>
	        </TabPane>
	        <TabPane label="日表" name="hdday">
	        	<Tableday></Tableday>
	        </TabPane>
	        <TabPane label="月表" name="hdmonth">
	        	<Tablemonth></Tablemonth>
	        </TabPane>
	        <TabPane label="历史表" name="hdhistory">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Tablehour from '@/table/table-hdsq/table-hour.vue'
	import Tableday from '@/table/table-hdsq/table-day.vue'
	import Tablemonth from '@/table/table-hdsq/table-month.vue'
	import Tablehistory from '@/table/table-hdsq/table-history.vue'
	import Tabletop from '@/table/table-hdsq/table-top.vue'
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
        Tablehistory,
        Tabletop
      }
    }
</script>

<style type="text/css">

</style>
