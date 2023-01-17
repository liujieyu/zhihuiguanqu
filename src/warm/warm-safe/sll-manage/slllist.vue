<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>维护管理</BreadcrumbItem>
            <BreadcrumbItem>大坝安全</BreadcrumbItem>
            <BreadcrumbItem>测站维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="shenliuliangmanage">
	        <TabPane label="渗流测站维护" name="shenliuliangmanage">
	        	<ShenliuliangManage></ShenliuliangManage>                
	        </TabPane>
          <TabPane label="渗压测站维护" name="slylmanage">
	        	<SLYLManage></SLYLManage>               
	        </TabPane>
          <TabPane label="位移测站维护" name="spwymanage">
	        	<SPWYManage></SPWYManage>             
	        </TabPane>
          <TabPane label="沉降测站维护" name="cjwylinfo">
	        	<CJWYInfo></CJWYInfo>
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import ShenliuliangManage from '@/warm/warm-safe/sll-manage/sllmanage.vue'
  import SLYLManage from '@/warm/warm-safe/slyl-manage/slylmanage.vue'
  import SPWYManage from '@/warm/warm-safe/spwy-manage/spwymanage.vue'
  import CJWYInfo from '@/warm/warm-safe/cjwy-manage/cjwymanage.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      ShenliuliangManage,SLYLManage,SPWYManage,CJWYInfo,
        
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>