<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>通讯录</BreadcrumbItem>
        </Breadcrumb>

    <Tabs value="txl">
          <TabPane label="通讯录" name="txl">
            <TXL></TXL>
          </TabPane>
      </Tabs>
  </div>
</template>

<script type="text/javascript">
  import TXL from '@/table/table-basedata/table-txl/txl.vue'
  export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        TXL,
      }
    }
</script>

<style type="text/css">
  
</style>