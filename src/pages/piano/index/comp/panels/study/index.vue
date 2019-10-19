<template>
  <div class="study">
    <pianoBanner :no-href="true" />
    <div class="tuijian">
      <h1>钢琴学习资料与工具</h1>
    </div>
    <alimama />
  </div>
</template>

<script>
import pianoBanner from "../../../../../home/comps/piano-banner";
import alimama from "./alimama";

export default {
  components: {
    alimama,
    pianoBanner
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus">
.study{
    >div.tuijian{
        text-align center
        >h1{
            font-size 18px;
            font-weight bold;
        }
        padding 1em 0
    }
}
</style>
