<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>用水户</BreadcrumbItem>
        </Breadcrumb>

    <Tabs value="ysh">
          <TabPane label="用水户" name="ysh">
            <YSH></YSH>
          </TabPane>
          <TabPane label="农业用水单元" name="nyysdy">
            <NYYSDY></NYYSDY>
          </TabPane>
          <TabPane label="工业用水单元" name="gyysdy">
            <GYYSDY></GYYSDY>
          </TabPane>
      </Tabs>
  </div>
</template>

<script type="text/javascript">
  import YSH from '@/table/table-basedata/table-ysh/ysh.vue'
  import NYYSDY from '@/table/table-basedata/table-ysh/nyysdy.vue'
  import GYYSDY from '@/table/table-basedata/table-ysh/gyysdy.vue'
  export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        YSH,
        NYYSDY,
        GYYSDY
      }
    }
</script>

<style type="text/css">
  
</style>