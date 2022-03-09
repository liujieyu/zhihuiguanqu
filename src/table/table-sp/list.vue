<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>历史数据</BreadcrumbItem>
            <BreadcrumbItem>视频</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="realtime">
          <TabPane label="实时" name="realtime">
            <Tablerealtime></Tablerealtime>
          </TabPane>
	        <TabPane label="历史" name="history">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Tablehistory from '@/table/table-sp/table-history.vue'
  import Tablerealtime from '@/table/table-sp/table-real-time.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Tablehistory,
        Tablerealtime
      }
    }
</script>

<style type="text/css">
	
</style>