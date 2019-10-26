<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>信息服务</BreadcrumbItem>
            <BreadcrumbItem>闸门调度方案</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="dispatcher">
	        <TabPane label="闸门调度方案" name="dispatcher">

	        	<dispatcher></dispatcher>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import dispatcher from '@/warm/warm-dispatch/warm-dispatcher/dispatcher.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        dispatcher,
        
      }
    }
</script>

<style type="text/css">

</style>