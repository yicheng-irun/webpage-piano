<template>
  <div class="faq-item">
    <header>{{ question }}</header>
    <p>{{ answer }}</p>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      default: '',
    },
    answer: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
.faq-item {
    background #fff;
    padding 16px 0 8px
    border-radius 5px;
    box-shadow 0 0 5px #0004;
    margin 0 0 1em;
    >header {
        position relative;
        font-size 16px;
        padding 0 10px 0 20px;
        color #000;
        &:before{
            position: absolute;
            top: 8px;
            left: 0;
            content: "";
            display: inline-block;
            width: 14px;
            height: 9px;
            background: #2479c1;
        }
    }
    >p {
        margin 5px 10px 5px 20px;
    }
}
</style>
