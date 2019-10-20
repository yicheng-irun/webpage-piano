<template>
  <div class="setting-panel" :style="{ height: `${height}px` }">
    <div class="rit-btn" />
    <menu class="slide-menu">
      <a
        v-for="(item, index) in manus"
        :key="index"
        :class="select === index ? 'active' : ''"
        tabindex="0"
        href="javascript:void(0)"
        @click="setSelect(index)"
      >
        <i v-if="item[1]" class="iconfont" :class="item[1]" />
        <span v-text="item[0]" />
      </a>
    </menu>
    <section class="st-cont">
      <visit v-if="select === 0" />
      <settings v-if="select === 1" />
      <pc-keyboard v-if="select === 2" />
      <!-- <record
                v-if="select===3"
            /> -->
    </section>
  </div>
</template>

<script>
import visit from './panels/visit.vue';
// import settings from './panels/settings.vue';
import pcKeyboard from './panels/pc-keyboard.vue';
import { setMainPanel } from './size';

export default {
  components: {
    visit,
    settings: () => import(/* webpackChunkName: "piano/settings" */ './panels/settings.vue'),
    pcKeyboard,
    // record: () => import(/* webpackChunkName: "piano/record" */'./panels/record/index.vue'),
  },
  data() {
    return {
      height: 1000,
      width: 200,
      scale: 1,

      select: 0,
      manus: [
        ['感谢访问'],
        ['设置', 'icon-shezhi'], // 外接 midi 键盘
        ['电脑键盘映射', 'icon-jianpan'],
        // ['音轨录制', 'icon-luyin'],
        // '多人联机模式',
      ],
    };
  },

  mounted() {
    setMainPanel(this);
  },

  methods: {
    setSelect(idx) {
      if (this.select !== idx) {
        this.select = idx;
      }
    },
    setSize(w, h, s) {
      // console.log(w, h, s);
      this.height = h;
      this.width = w;
      this.scale = s;
    },
  },
};
</script>

<style lang="stylus">
.setting-panel {
    position relative;
    >.rit-btn {

    }
    >.slide-menu {
        position relative;
        top 4px;
        z-index 10
        margin 0px 0 0 0;
        padding 0 15px 0;
        line-height 32px;
        // border-bottom 1px solid #0166bd33;
        // border-bottom 4px solid #fff;
        overflow-y hidden;
        font-size 13px;
        white-space nowrap;
        background #fff;
        box-shadow 0 0 5px #0003;
        >a {
            display inline-block;
            // list-style none;
            padding 0 12px;
            cursor pointer;
            margin 0 1px;
            background-color #fff5;
            // border-radius 4px 4px 0 0;
            // border-bottom 2px solid #000;
            transition background-color 0.3s;
            text-decoration none;
            color #000a;
            font-size 14px;
            &.active {
                position relative;
                background-color #0166bd22;
                color #0166bdff;
                font-weight bold;
                border 1px solid #0166bd33;
                border-width 0 1px;
                // box-shadow 0 0 6px #0003;
                // font-weight bold;
            }
            &:focus, &:hover {
                // outline 1px dashed #0166bd88;
                outline none;
                background-color #0166bd22;
            }
            >.iconfont {
                padding 0 3px 0 0;
            }
        }
    }
    >.st-cont {
        position absolute;
        top 36px;
        left 0;
        bottom 0px;
        width 100%;
        overflow-y auto;
        // background-image url("../../index/assets/img/pianobg.jpg")
        // box-shadow 0 0 6px #0003
        // background #fff4;
    }
}
</style>
