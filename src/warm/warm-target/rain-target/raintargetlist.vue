<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>水雨情监测</BreadcrumbItem>
            <BreadcrumbItem>预警指标</BreadcrumbItem>
            <BreadcrumbItem>降雨预警指标</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="raintarget">
	        <TabPane label="降雨预警指标" name="raintarget">

	        	<RainTarget></RainTarget>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import RainTarget from '@/warm/warm-target/rain-target/raintarget.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      RainTarget,
        
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>