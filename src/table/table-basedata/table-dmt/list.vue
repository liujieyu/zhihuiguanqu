<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>多媒体</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="dmt">
	        <TabPane label="多媒体" name="dmt">
	        	<DMT></DMT>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
import DMT from '@/table/table-basedata/table-dmt/dmt.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        DMT
        
      }
    }
</script>

<style type="text/css">
	
</style>