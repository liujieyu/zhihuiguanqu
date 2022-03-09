<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>其他监测</BreadcrumbItem>
        </Breadcrumb>
		预留接口
<!--		<Tabs value="fwlcrong">-->
<!--	        <TabPane label="水位库容" name="fwlcrong">-->
<!--&lt;!&ndash;	        	<FwlCR></FwlCR>&ndash;&gt;-->
<!--				-->
<!--	        </TabPane>-->
<!--	    </Tabs>-->
	    <!-- <el-tabs v-model="activeName" @tab-click="Click">
		    <el-tab-pane label="小时表" name="hour">
		    	<component :is="Table_hour"></component>
		    </el-tab-pane>
		    <el-tab-pane label="日表" name="day">
		    	<component :is="Table_day"></component>
		    </el-tab-pane>
		    <el-tab-pane label="月表" name="month">
		    	<component :is="Table_month"></component>
		    </el-tab-pane>
		    <el-tab-pane label="历史表" name="history">
		    	<component :is="Table_history"></component>
		    </el-tab-pane>
		    <el-tab-pane label="最高水位" name="top">
		    	<component :is="Table_top"></component>
		    </el-tab-pane>
	    </el-tabs> -->
	</div>
</template>

<script type="text/javascript">
	const FwlCR = resolve =>require(['@/table/table-swkrfx/table-swkr.vue'],resolve)
	export default {
        data() {
        return {
        	activeName:'fwlcrong',
        };
      },

      mounted() { },
      methods: {
      	Click(tab, event){
      		this.checkVue(tab.name);
      	},
      	checkVue (name) {
      		switch (name) {
      			case 'fwlcrong' :
		          this.Tablehour = FwlCR
		          break
			}
      	}
      },
      computed: { },
      components: {
		  FwlCR
      }
    }
</script>

<style type="text/css">

</style>
