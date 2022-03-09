<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>历史数据</BreadcrumbItem>
            <BreadcrumbItem>闸阀状态</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="history">
	        <TabPane label="开度历史" name="history">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	        <!-- <TabPane label="时长统计" name="statistics">
	        	<Tablestatistics></Tablestatistics>
	        </TabPane> -->
	        
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Tablestatistics from '@/table/table-zfzt/table-statistics.vue'
	import Tablehistory from '@/table/table-zfzt/table-history.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Tablestatistics,
        Tablehistory
      }
    }
</script>

<style type="text/css">
	
</style>