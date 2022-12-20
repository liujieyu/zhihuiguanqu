<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>水雨情监测</BreadcrumbItem>
            <BreadcrumbItem>预警指标</BreadcrumbItem>
            <BreadcrumbItem>水库预警指标</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="rsvtarget">
	        <TabPane label="水库水位预警指标" name="rsvtarget">

	        	<RsvTarget></RsvTarget>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import RsvTarget from '@/warm/warm-target/rsv-target/rsvtarget.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      RsvTarget,
        
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>