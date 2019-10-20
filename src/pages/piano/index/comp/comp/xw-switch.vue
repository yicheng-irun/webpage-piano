<template>
  <div class="xw-switch" :class="value ? 'on-state' : ''" @click="trigger">
    <div class="bar" />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    trigger() {
      this.$emit('change', !this.value);
    },
  },
};
</script>

<style lang="stylus">
$size = 14px;
.xw-switch{
    display inline-block;
    vertical-align middle;
    cursor pointer;
    padding 2px 2px;
    margin 0 2px;
    width $size * 2.3;
    height $size;
    background #999;
    border-radius $size;
    border 2px solid #fff;
    transition background 0.3s;
    box-shadow 0 0 5px #0003;
    white-space nowrap;
    >.bar {
        vertical-align top;
        display inline-block;
        width $size;
        height $size;
        margin 0;
        border-radius $size;
        background #fff;
        transition margin 0.3s;
    }
    &.on-state{
        background #0166bdd9;
        >.bar{
            margin 0 0 0 $size * 1.3;
        }
    }
}
</style>
