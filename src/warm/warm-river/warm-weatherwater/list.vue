<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础信息</BreadcrumbItem>
            <BreadcrumbItem>气象水文</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="weatherwater">
	        <TabPane label="气象水文" name="weatherwater">

	        	<weatherwater></weatherwater>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import weatherwater from '@/warm/warm-river/warm-weatherwater/weatherwater.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        weatherwater,
        
      }
    }
</script>

<style type="text/css">

</style>