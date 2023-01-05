<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>维护管理</BreadcrumbItem>
            <BreadcrumbItem>大坝安全测点</BreadcrumbItem>
            <BreadcrumbItem>渗流量维护</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="shenliuliangmanage">
	        <TabPane label="渗流量维护" name="shenliuliangmanage">

	        	<ShenliuliangManage></ShenliuliangManage>
                
	        </TabPane>
	    </Tabs>
	</div>
</template>

<script type="text/javascript">
  import ShenliuliangManage from '@/warm/warm-safe/sll-manage/sllmanage.vue'
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      ShenliuliangManage,
        
      }
    }
</script>

<style lang="less" scope>
@import "../../common/warmcss.less";
</style>