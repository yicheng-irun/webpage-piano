<template>
  <div class="piano-pinlun">
    <xw-pin-lun id="piano" @focus="inputFocus" @blur="inputBlur" />
  </div>
</template>

<script>
import { start, stop } from "../keyboard-pc.js";
import xwPinLun from "../../../../../comp/site/xw-pinlun/index.vue";
export default {
  components: {
    xwPinLun
  },
  methods: {
    inputFocus() {
      stop();
    },
    inputBlur() {
      start();
    }
  }
};
</script>

<style lang="stylus">
.piano-pinlun{
    margin 20px 20px;
    padding 0 0 20px 0
}
</style>
