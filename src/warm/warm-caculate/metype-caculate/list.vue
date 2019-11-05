<template>
	<div>
		<Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>率定管理</BreadcrumbItem>
            <BreadcrumbItem>率定计算</BreadcrumbItem>
        </Breadcrumb>

		<Tabs value="warmcaculate">
	        <TabPane label="率定计算" name="warmcaculate">

	        	<Warmcaculate ></Warmcaculate>
                
	        </TabPane>
	    </Tabs>
    </div>
</template>
<script type="text/javascript">
import Warmcaculate from '@/warm/warm-caculate/metype-caculate/caculate.vue'
export default {
        data() {
      },
      mounted() { },
      methods: {     
      },
      computed: { },
      components: { 
        Warmcaculate
      }
    }
</script>