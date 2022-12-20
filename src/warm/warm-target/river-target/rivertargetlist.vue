<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>预警指标</BreadcrumbItem>
            <BreadcrumbItem>河道预警指标</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="rivertarget">
	        <TabPane label="河道水位预警指标" name="rivertarget">

	        	<RiverTarget></RiverTarget>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import RiverTarget from '@/warm/warm-target/river-target/rivertarget.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      RiverTarget,
        
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>