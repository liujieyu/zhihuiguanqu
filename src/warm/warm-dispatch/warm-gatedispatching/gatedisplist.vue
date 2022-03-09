<template>
  <div>
	<Breadcrumb :style="{margin: '0 0 24px 0'}">
    <BreadcrumbItem>信息服务</BreadcrumbItem>
    <BreadcrumbItem>闸门调度</BreadcrumbItem>  
    </Breadcrumb>

	<Tabs value="gatedisptching">
	  <TabPane label="闸门调度泄流信息" name="gatedisptching">
	    <Gatedisptching></Gatedisptching>
	  </TabPane>
    <TabPane label="闸门调度方案" name="dispatcher">
	        	<dispatcher></dispatcher>                
	        </TabPane>
	</Tabs>
  </div>
</template>

<script type="text/javascript">
  import Gatedisptching from '@/warm/warm-dispatch/warm-gatedispatching/gatedispatching.vue';
  import dispatcher from '@/warm/warm-dispatch/warm-dispatcher/dispatcher.vue';
  export default {
    data(){
      return{ };
    },
    
    methods:{ },
    computed:{ },
    components:{ 
    Gatedisptching,
    dispatcher
    }
  }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>