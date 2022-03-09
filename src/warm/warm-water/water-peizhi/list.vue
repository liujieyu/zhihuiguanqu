<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>配水管理</BreadcrumbItem>
            <BreadcrumbItem>配水计划</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="waterpeizhi">
	        <TabPane label="配水计划" name="waterpeizhi">
                <!--
                预留接口
                --> 
                
                 <WaterPeizhi></WaterPeizhi> 
                            
	        </TabPane>
	    </Tabs>
	</div>
</template>
<script type="text/javascript">
import WaterPeizhi from '@/warm/warm-water/water-peizhi/peizhi.vue'
export default {
        data() {
        return { 
        };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      WaterPeizhi,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>