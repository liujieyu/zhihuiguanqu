<template>
  <div class="waterLever" >
    <Row type="flex" align="center">
      阀门已开高度：1.5m
    </Row>
    <!-- 分割线 -->
      <Divider/>
    <div class="box">
      <div class="water">
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    info:{
    }
  }
}
</script>


<style lang="less" scope>
.waterLever{
  text-align: center;
  .box{
    width: 9.375rem;
    margin: 0 auto;
    border-left: rgb(139, 139, 139) 0.9375rem solid;
    border-right: rgb(139, 139, 139) 0.9375rem solid;
    background-color: rgb(191, 191, 191) ;
    height: 9.375rem;
    display: flex;
    flex-direction: column-reverse;
  }
  .water{
    width: 100%;
    background: white;
    padding: 0.625rem 0;
  }
  .waterImg{
    width: 6.25rem;
  }
}
</style>
