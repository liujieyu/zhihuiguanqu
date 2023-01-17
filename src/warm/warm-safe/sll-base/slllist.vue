<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>安全监测</BreadcrumbItem>
            <BreadcrumbItem>基础信息</BreadcrumbItem>
            <BreadcrumbItem>测站信息</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="sllinfo">
	        <TabPane label="渗流测站信息" name="sllinfo">
	        	<SLLInfo></SLLInfo>               
	        </TabPane>
          <TabPane label="渗压测站信息" name="slylinfo">
	        	<SLYLInfo></SLYLInfo>             
	        </TabPane>
          <TabPane label="位移测站信息" name="spwylinfo">
	        	<SPWYInfo></SPWYInfo>
	        </TabPane>
          <TabPane label="沉降测站信息" name="cjwylinfo">
	        	<CJWYInfo></CJWYInfo>               
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import SLLInfo from '@/warm/warm-safe/sll-base/sllinfo.vue'
  import SLYLInfo from '@/warm/warm-safe/slyl-base/slylinfo.vue'
  import SPWYInfo from '@/warm/warm-safe/spwy-base/spwyinfo.vue'
  import CJWYInfo from '@/warm/warm-safe/cjwy-base/cjywinfo.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SLLInfo, SLYLInfo, SPWYInfo,CJWYInfo,     
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>