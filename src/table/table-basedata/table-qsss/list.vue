<template>
  <div>
    <Breadcrumb :style="{margin: '0 0 24px 0'}">
            <BreadcrumbItem>基础数据</BreadcrumbItem>
            <BreadcrumbItem>取水设施</BreadcrumbItem>
        </Breadcrumb>

    <Tabs value="qsss">
          <TabPane label="取水设施" name="qsss">
            <QSSS></QSSS>
          </TabPane>
          <TabPane label="水闸" name="sz">
            <SZ></SZ>
          </TabPane>
          <TabPane label="坝" name="b">
            <B></B>
          </TabPane>
          <TabPane label="泵站" name="bz">
            <BZ></BZ>
          </TabPane>
      </Tabs>
  </div>
</template>

<script type="text/javascript">
  import QSSS from '@/table/table-basedata/table-qsss/qsss.vue'
  import SZ from '@/table/table-basedata/table-qsss/sz.vue'
  import B from '@/table/table-basedata/table-qsss/b.vue'
  import BZ from '@/table/table-basedata/table-qsss/bz.vue'
  export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
        QSSS,
        SZ,
        B,
        BZ
      }
    }
</script>

<style type="text/css">
  
</style>