<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>闸阀水情</BreadcrumbItem>
        </Breadcrumb>

		<!-- <Tabs value="hour">
	        <TabPane label="小时表" name="hour">
	        	<Tablehour></Tablehour>
	        </TabPane>
	        <TabPane label="日表" name="day">
	        	<Tableday></Tableday>
	        </TabPane>
	        <TabPane label="月表" name="month">
	        	<Tablemonth></Tablemonth>
	        </TabPane>
	        <TabPane label="历史表" name="history">
	        	<Tablehistory></Tablehistory>
	        </TabPane>
	    </Tabs> -->
	    <el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="小时表" name="hour">
		    	<component :is="Tablehour"></component>
		    	<!-- <Tablehour></Tablehour> -->
		    </el-tab-pane>
		    <el-tab-pane label="日表" name="day">
		    	<component :is="Tableday"></component>
		    	<!-- <Tableday></Tableday> -->
		    </el-tab-pane>
		    <el-tab-pane label="月表" name="month">
		    	<component :is="Tablemonth"></component>
		    	<!-- <Tablemonth></Tablemonth> -->
		    </el-tab-pane>
		    <el-tab-pane label="历史表" name="history">
		    	<component :is="Tablehistory"></component>
				<!-- <Tablehistory></Tablehistory> -->
		    </el-tab-pane>
	    </el-tabs>
	</div>
</template>

<script type="text/javascript">
	const Tablehour = resolve =>require(['@/table/table-zfsq/table-hour.vue'],resolve)
	const Tableday = resolve =>require(['@/table/table-zfsq/table-day.vue'],resolve)
	const Tablemonth = resolve =>require(['@/table/table-zfsq/table-month.vue'],resolve)
	const Tablehistory = resolve =>require(['@/table/table-zfsq/table-history.vue'],resolve)
	// import Tablehour from '@/table/table-zfsq/table-hour.vue'
	// import Tableday from '@/table/table-zfsq/table-day.vue'
	// import Tablemonth from '@/table/table-zfsq/table-month.vue'
	// import Tablehistory from '@/table/table-zfsq/table-history.vue'
	export default {
        data() {
        return {
        	activeName:'day',
        };
      },

      mounted() { },
      methods: {
      	handleClick(tab, event){
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
		      		}
      	}
      },
      computed: { },
      components: {
        // Tablehour,
        // Tableday,
        // Tablemonth,
        // Tablehistory
      }
    }
</script>

<style type="text/css">

</style>
