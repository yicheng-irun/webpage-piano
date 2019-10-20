<template>
    <div
        v-if="show"
        class="unsupported"
    >
        <div class="wrapper">
            <div
                class="cont"
            >
                <h2>{{ title }}</h2>
                <p>原因是：{{reason}}</p>
                <p>要不试一试下面的浏览器吧</p>
                <div
                    class="suggest"
                >
                    <a
                        v-for="item in browers"
                        :key="item.name"
                        :href="item.href"
                        target="_blank"
                        class="item"
                    >
                        <img
                            :src="item.img"
                        >
                        <div>{{ item.name }}</div>
                    </a>
                </div>
                <div class="insist-use">
                    <a
                        href="javascript:void(0)"
                        @click="show=false"
                    >我要继续浏览</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import chorme from './icons/chorme.png';
import firefox from './icons/firefox.png';
import qq from './icons/qq.png';
import sogou from './icons/sogou.png';
import uc from './icons/uc.png';

export default {
  props: {
    reason: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '您的浏览器版本太低了，没办法正常打开当前页面。',
    },
  },
  data() {
    return {
      show: true, // 用户用户隐藏
      browers: [
        {
          name: 'Chorme',
          href: 'https://pc.qq.com/detail/1/detail_2661.html',
          img: chorme,
        },
        {
          name: 'Firefox',
          href: 'https://pc.qq.com/detail/11/detail_22931.html',
          img: firefox,
        },
        {
          name: 'QQ浏览器',
          href: 'https://pc.qq.com/detail/11/detail_351.html',
          img: qq,
        },
        {
          name: '搜狗浏览器',
          href: 'https://pc.qq.com/detail/7/detail_22127.html',
          img: sogou,
        },
        {
          name: 'UC浏览器',
          href: 'https://pc.qq.com/detail/13/detail_13993.html',
          img: uc,
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
.unsupported {
    position absolute;
    top 0;
    left 0;
    right 0;
    bottom 0;
    z-index 1000;
    background-color #0005;
    >.wrapper {
        width 100%;
        max-width 600px;
        background-color #fff;
        margin 80px auto;
        >.cont {
            padding 20px;
        }
    }
    .suggest {
        padding 15px 0;
        >.item{
            display inline-block;
            width 90px;
            text-align center;
            font-size 14px;
            padding 8px 0;
            &:hover {
                background #0002;
            }
        }
    }
    .insist-use {
        text-align right;
    }
}

</style>
