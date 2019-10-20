<template>
    <transition
        name="loading-fade"
    >
        <div
            v-if="loading"
            class="xw-loading"
        >
            <div class="loading-icon">
                <i
                    v-for="n in tnum"
                    :key="n"
                    :class="`ld-${n}`"
                />
            </div>
            <div class="custom-text">
                <slot />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    /**
         * 球球的数量
         */
    num: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {};
  },
  computed: {
    tnum() {
      if (this.num >= 1 && this.num <= 10) {
        return this.num;
      }
      return 3;
    },
  },
};
</script>

<style lang="stylus">
@import './xw-color.styl';
.loading-fade-enter-active, .loading-fade-leave-active {
  transition: opacity .3s;
}
.loading-fade-enter, .loading-fade-leave-to {
  opacity: 0;
}

.xw-loading {
    position absolute;
    top 0
    left 0
    right 0
    bottom 0
    z-index 100
    background #fffb
    transition all 0.3s
    text-align center
    >.loading-icon{
        padding 4em 0 0
        pointer-events none
        >i{
            display inline-block;
            width 1.1em
            height 1.1em
            background-color primary
            margin 0 0.2em
            border-radius 50%
            transform-origin 50%;
            transform scale(0.1)
            animation loading_icon 2s infinite
        }
    }
    >.custom-text{
        padding 0.5em 0
        font-size 0.9em
    }
}

for idx in 1..10
    .xw-loading>.loading-icon>i:nth-child({idx}){
        animation-delay ((idx - 1)/4) s
    }

@keyframes loading_icon {
    0% {
        transform scale(0.1) translate(0, 0)
    }

    50% {
        transform scale(1) translate(0, -1em)
    }

    100% {
        transform scale(0.1) translate(0, 0)
    }
}

</style>
