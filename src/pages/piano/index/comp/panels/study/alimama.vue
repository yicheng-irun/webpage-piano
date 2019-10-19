<template>
  <div class="alimama">
    <div v-for="(item, index) in tuiguang" :key="index" class="item">
      <a :href="item.link" class="img" target="_blank">
        <img :src="item.img" :alt="item.title" />
        <div class="ad" />
      </a>
      <div class="info-block">
        <a :href="item.link" class="title">
          {{ item.title }}
        </a>
        <p class="info">
          {{ item.info }}
          <a :href="item.link">
            立即领取
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tuiguang: [
        {
          img: "https://img.alicdn.com/i4/3021610629/O1CN01UTsZIG1GW7gUWaJtw_!!0-item_pic.jpg",
          title: "便携式家用手卷电子钢琴",
          info: "可获得10元优惠券",
          link: "https://s.click.taobao.com/vvDr6zv"
        }
      ]
    };
  }
};
</script>

<style lang="stylus">
.alimama{
    text-align center
    >.item{
        display inline-block
        text-align center
        >.img{
            position relative
            display block
            width 180px;
            text-align center
            margin 0 auto;
            >img{
                max-width 100%;
                max-height 100%;
                border-radius 10px;
                border 2px solid #fff;
                box-shadow 0 0 5px #0003;
            }

            &:after {
                position absolute
                display block;
                top 2px
                right 0
                z-index 2
                content '广告'
                font-size 12px
                background #0008
                color #fff8
                padding 0 0.2em
            }
        }
        >.info-block{
            >.title{
                display block
                font-size 22px
                line-height 1.5
                padding 0.6em 0 0.4em
                text-decoration none
                text-shadow 0 0 4px #f003
                color #f00;
            }
            >.info{
                padding 0
                margin 0
            }
        }
    }
}
</style>
