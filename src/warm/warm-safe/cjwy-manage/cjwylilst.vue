<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>维护管理</BreadcrumbItem>
            <BreadcrumbItem>大坝安全测点</BreadcrumbItem>
            <BreadcrumbItem>沉降变形维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="cjwylinfo">
	        <TabPane label="沉降变形维护" name="cjwylinfo">

	        	<CJWYInfo></CJWYInfo>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import CJWYInfo from '@/warm/warm-safe/cjwy-manage/cjwymanage.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      CJWYInfo,       
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>