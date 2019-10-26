<template>
  <div class="waterLever" >
    
    <Row type="flex" justify="center">
      阀门已开高度：1.5m
    </Row>
    <div class="box">
      <div class="water">
        <img src="../../../assets/image/waterLever.png" class="waterImg" alt="">
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    info:{
    }
  },
  created () {
    console.log('闸阀水情tips',this.info);
  },
}
</script>


<style lang="less" scope>
.title{
  background: rgb(204,204,204);
  border-bottom: 1px solid black;
}
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
