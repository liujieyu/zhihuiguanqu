<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>渠道</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="qd">
	        <TabPane label="渠道" name="qd">
	        	<Qudao></Qudao>
	        </TabPane>
	        <!-- <TabPane label="渡槽" name="dc">
	        正在开发中...
	        </TabPane>
	        <TabPane label="渠下涵" name="qxh">
	        正在开发中...
	        </TabPane>
	        <TabPane label="闸阀" name="zf">
	        正在开发中...
	        </TabPane> -->
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import Qudao from '@/table/table-basedata/table-qd/qudao.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        Qudao,
        
      }
    }
</script>

<style type="text/css">
	
</style>