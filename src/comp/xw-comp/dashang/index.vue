<template>
    <div class="dashang">
        <div class="d-title">
            {{ title }}
        </div>
        <div class="item">
            <img
                src="./ds-weixin.png"
                alt=""
            >
            <div class="ds-title">
                微信
            </div>
        </div>
        <div class="item">
            <img
                src="./ds-alipay.png"
                alt=""
            >
            <div class="ds-title">
                支付宝
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '谢谢钢琴家们的打赏~ 我会加倍努力哒',
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
.dashang {
    display inline-block;
    text-align center;
    background #0001;
    >.d-title {
        text-align center;
        font-size 16px;
        line-height 2
        padding 6px 0 6px 0;
        border-top 3px solid #f005;
    }
    >.item {
        max-width 168px;
        display inline-block;
        vertical-align top;
        margin 0 1em;
        >.ds-title {
            text-align center;
            font-size 18px;
            padding 0.2em 0 1em;
            text-shadow 0 0 2px;
        }
        >img {
            width 100%
            border 1px solid #fff
        }
    }
}
</style>
