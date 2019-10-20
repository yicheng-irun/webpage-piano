<template>
    <div class="piano-banner">
        <div class="banner-keys">
            <router-link
                class="keys"
                :to="'/piano/'"
            >
                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />
                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />

                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />
                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />

                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />
                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />
                <i class="h" />
                <i />
            </router-link>
        </div>
        <h1
        >
            <router-link to="/piano/">
                A Webpage Piano
            </router-link>
        </h1>
    </div>
</template>

<script>

export default {
  props: {
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
.piano-banner
    >h1
        text-align center
        font-size 18px
        >a
            text-decoration none
            color #256492

.banner-keys{
    position relative
    background #256492
    text-align center
    overflow hidden
    >.keys{
        display inline-block
        white-space nowrap
        text-align center
        padding 0 0 1.5em
        >i{
            display inline-block
            vertical-align top;
            width 2em
            height 9em
            background #fff;
            margin 0.5px
            box-shadow 0 0 3px #0003
            animation huadong 3.6s 0s infinite;
            transform-origin 50% 0;
            &.h {
                position absolute
                height 6em
                width 1.2em
                margin 0 0 0 -0.6em
                background #000
                z-index 5
            }
        }
    }
}
for num in 1..36
    .banner-keys>.keys>i:nth-child({num})
        animation-delay (num/10) s

@keyframes huadong {
    0% {
        transform translate(0, 0)
    }

    10% {
        transform translate(8px, 0)
    }

    30% {
        transform translate(0, 0)
    }

    100% {
        transform translate(0, 0)
    }
}

</style>
