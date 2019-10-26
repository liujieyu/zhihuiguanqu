<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>灌区信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="jbxx">
	        <TabPane label="基本信息" name="jbxx">
	        	<Basedata></Basedata>
	        </TabPane>
	        <TabPane label="机构信息" name="jgxx">
	        	<JGXX></JGXX>
	        </TabPane>
	        <TabPane label="人员信息" name="ryxx">
	        	<RYXX></RYXX>
	        </TabPane>
	        <!-- <TabPane label="行政区划" name="xzqh">
	        	正在开发中...
	        </TabPane> -->
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Basedata from '@/table/table-basedata/table-gqxx/basedata.vue'
	import JGXX from '@/table/table-basedata/table-gqxx/jgxx.vue'
	import RYXX from '@/table/table-basedata/table-gqxx/ryxx.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Basedata,
        JGXX,
        RYXX
      }
    }
</script>

<style type="text/css">
	
</style>