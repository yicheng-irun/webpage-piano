<template>
  <div class="home-page">
    <pianoBanner />
    <div class="dashang-wrapper">
      <p class="intros">
        公仔厂的流水线上有点忙，平常工作的话基本上每天加班要晚上9点才下班，每个周末就抽出一些时间陆陆续续开发了一年，应该写了上万行代码。
        后面争取多抽一些时间，把想加的功能统统都加上去。
      </p>
      <dashang />
    </div>
  </div>
</template>

<script>
import pianoBanner from './comps/piano-banner.vue';
import dashang from '../../comp/xw-comp/dashang/index.vue';

export default {
  name: 'HelloWorld',
  components: {
    pianoBanner,
    dashang,
  },
  props: {
  },
};
</script>

<style lang="stylus">
.home-page {
  >.dashang-wrapper {
    margin 6em 0 3em;
    text-align center;
    >.intros {
      font-size 14px;
      margin 1em 1em;
    }
  }
}
</style>
