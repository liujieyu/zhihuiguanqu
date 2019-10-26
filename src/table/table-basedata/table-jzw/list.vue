<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>建筑物</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="dc">
	        <TabPane label="渡槽" name="dc">
				<DC></DC>
	        </TabPane>
	        <TabPane label="隧洞" name="sd">
				<SD></SD>
	        </TabPane>
	        <TabPane label="倒虹吸" name="dxh">
				<DXH></DXH>
	        </TabPane>
	        <TabPane label="涵洞" name="hd">
				<HD></HD>
	        </TabPane>
	        <TabPane label="跌水" name="ds">
				<DS></DS>
	        </TabPane>
	        <TabPane label="陡坡" name="dp">
				<DP></DP>
	        </TabPane>
	        <TabPane label="沉沙池" name="csd">
				<CSD></CSD>
	        </TabPane>
	        <!-- <TabPane label="行政区划" name="xzqh">
	        	正在开发中...
	        </TabPane> -->
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
	import DC from '@/table/table-basedata/table-jzw/dc.vue'
	import SD from '@/table/table-basedata/table-jzw/sd.vue'
	import DXH from '@/table/table-basedata/table-jzw/dxh.vue'
	import HD from '@/table/table-basedata/table-jzw/hd.vue'
	import DS from '@/table/table-basedata/table-jzw/ds.vue'
	import DP from '@/table/table-basedata/table-jzw/dp.vue'
	import CSD from '@/table/table-basedata/table-jzw/csd.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        DC,
        SD,
        DXH,
        HD,
        DS,
        DP,
        CSD
      }
    }
</script>

<style type="text/css">
	
</style>