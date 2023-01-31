<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 15px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>水源信息</BreadcrumbItem>
        </Breadcrumb>

    <Tabs value="sy">
          <TabPane label="水源信息" name="sy">
              <SY></SY>
          </TabPane>
<!--          <TabPane label="水库" name="sk">-->
<!--            <SK></SK>-->
<!--          </TabPane>-->
<!--          <TabPane label="河流" name="hl">-->
<!--            &lt;!&ndash; <HL></HL> &ndash;&gt;-->
<!--            正在开发中...-->
<!--          </TabPane>-->
<!--          <TabPane label="井" name="j">-->
<!--            <J></J>-->
<!--          </TabPane>-->
      </Tabs>
  </div>
</template>

<script type="text/javascript">
  import SY from '@/table/table-basedata/table-syxx/sy.vue'
  import SK from '@/table/table-basedata/table-syxx/sk.vue'
  import HL from '@/table/table-basedata/table-syxx/hl.vue'
  import J from '@/table/table-basedata/table-syxx/j.vue'
  export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: {
        SY,
        SK,
        HL,
        J
      }
    }
</script>

<style type="text/css">

</style>
