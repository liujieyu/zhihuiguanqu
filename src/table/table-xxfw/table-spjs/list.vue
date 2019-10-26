<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>历史数据</BreadcrumbItem>
            <BreadcrumbItem>视频监控</BreadcrumbItem>
            <BreadcrumbItem>实时监控</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="spjk">
	        <TabPane label="实时监控" name="spjk">
	        	<Tablerealtime></Tablerealtime>
	        </TabPane>
	        
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import Tablerealtime from '@/table/table-xxfw/table-spjs/table-realtime.vue'
	export default {
        data() {
        return { };
      },
      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Tablerealtime
      }
    }
</script>

<style type="text/css">
	
</style>