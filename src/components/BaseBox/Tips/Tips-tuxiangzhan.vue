<template>
  <div class="imageSite">
    <div class="box">
      <img :src="`/guanqu/gis/pic_content?id=${info.STCD}`"   width="210" height="160"></img>
    </div>
  </div>
</template>



<script>
import { setTimeout } from 'timers';
export default {
  props: {
    info: {}
  },

};
</script>


<style lang="less" scope>
.imageSite {
  text-align: center;
  img {
    width: 9.375rem;
    height: 7.5rem;
  }
}
</style>
