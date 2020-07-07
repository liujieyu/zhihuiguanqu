<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>配水管理</BreadcrumbItem>
            <BreadcrumbItem>用水统计</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="usewater">
	        <TabPane label="用水统计" name="usewater">
                
                <Usewater></Usewater>
                 
                <!--
                预留接口  
                -->           
	        </TabPane>
	    </Tabs>
	</div>
</template>
<script type="text/javascript">
import Usewater from '@/warm/warm-water/water-use/usewater.vue'
export default {
        data() {
        return { 
        };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      Usewater,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>