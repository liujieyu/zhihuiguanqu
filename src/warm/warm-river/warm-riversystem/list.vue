<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础信息</BreadcrumbItem>
            <BreadcrumbItem>河流水系</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="riversystem">
	        <TabPane label="河流水系" name="riversystem">

	        	<riversystem></riversystem>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import riversystem from '@/warm/warm-river/warm-riversystem/riversystem.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        riversystem,
        
      }
    }
</script>

<style type="text/css">

</style>