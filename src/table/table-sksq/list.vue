<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>水雨情监测</BreadcrumbItem>
            <BreadcrumbItem>历史分析</BreadcrumbItem>
            <BreadcrumbItem>水情分析</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="history">
	        <TabPane label="小时报表" name="hour">
	        	<Tablehour></Tablehour>
	        </TabPane>
	        <TabPane label="日报表" name="day">
	        	<Tableday></Tableday>
	        </TabPane>
	        <TabPane label="月报表" name="month">
	        	<Tablemonth></Tablemonth>
	        </TabPane>
	        <TabPane label="历史分析" name="history">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs>
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
	const Tablehour = resolve =>require(['@/table/table-sksq/table-hour.vue'],resolve)
	const Tableday = resolve =>require(['@/table/table-sksq/table-day.vue'],resolve)
	const Tablemonth = resolve =>require(['@/table/table-sksq/table-month.vue'],resolve)
	const Tablehistory = resolve =>require(['@/table/table-sksq/table-history.vue'],resolve)
	const Tabletop = resolve =>require(['@/table/table-sksq/table-top.vue'],resolve)
	export default {
        data() {
        return {
        	activeName:'hour',
        };
      },

      mounted() { },
      methods: {
      	Click(tab, event){
      		this.checkVue(tab.name);
      	},
      	checkVue (name) {
      		switch (name) {
      			case 'hour' :
		          this.Tablehour = Tablehour
		          break
		        case 'day' :
		          this.Tableday = Tableday
		          break
		        case 'month' :
		          this.Tablemonth = Tablemonth
		          break
		        case 'history' :
		          this.Tablehistory = Tablehistory
		          break
		        case 'top' :
		          this.Tabletop = Tabletop
		          break
		      		}
      	}
      },
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
