<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>行政单元</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="xzdy">
	        <TabPane label="行政单元" name="xzdy">
				<XZDY></XZDY>
	        </TabPane>
	        <!-- <TabPane label="行政区划" name="xzqh">
	        	正在开发中...
	        </TabPane> -->
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import XZDY from '@/table/table-basedata/table-xzdy/xzdy.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        XZDY,
      }
    }
</script>

<style type="text/css">
	
</style>