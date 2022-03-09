<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>流域信息</BreadcrumbItem>
        </Breadcrumb>

    <Tabs value="lyxx">
          <TabPane label="流域信息" name="lyxx">
            <LYXX></LYXX>
          </TabPane>
      </Tabs>
  </div>
</template>

<script type="text/javascript">
  import LYXX from '@/table/table-basedata/table-lyxx/lyxx.vue'
  export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        LYXX,
      }
    }
</script>

<style type="text/css">
  
</style>