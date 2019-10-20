<template>
  <div
    ref="nbCont"
    class="note-bar-demo"
    :style="{ height: `${height}px`, transform: `scaleX(${scale})` }"
  >
    <div
      v-for="(item, index) in keyPosition"
      :key="index"
      :style="{ left: `${item[0]}px`, width: `${item[1]}px` }"
      class="cells"
    >
      <div :class="`key-${(index + 8) % 12}`" :style="randomBarStyle()" />
    </div>
  </div>
</template>

<script>
import { setNoteBar } from './size';
import { barPositionArray } from './keyboard';

export default {
  data() {
    return {
      height: 0,
      width: 200,
      scale: 1,
      randomBar: false,
    };
  },
  computed: {
    keyPosition() {
      return barPositionArray.map(item => [item[0], item[1]]);
    },
  },
  mounted() {
    setNoteBar(this);
    this.enable = true;
  },
  destroyed() {
    this.enable = false;
  },
  methods: {
    setSize(w, h, s) {
      // console.log(w, h, s);
      this.height = h;
      this.width = w;
      this.scale = s;
    },
    randomBarStyle() {
      if (!this.randomBar) {
        return {
          bottom: '10px',
          height: '100px',
        };
      }
      const height = Math.random() * 100 + 20;
      // const top = Math.random() * this.height - height;
      const bottom = Math.random() * this.height;
      return {
        // top: `${top}px`,
        // bottom: '0px',
        bottom: `${bottom}px`,
        height: `${height}px`,
      };
    },
  },
};
</script>

<style lang="stylus">
.note-bar-demo {
    position relative;
    transform scaleX(1);
    transform-origin: left top;
    >.cells {
        position absolute;
        height 100%;
        >div{
            // opacity 0.5;
            position absolute;
            width 100%;
            // background-color #64b77a;
            // border 1px solid #fff0;
            // box-sizing border-box;
            // border-radius 3px;
            box-shadow 0 0 6px #0003;
            &.key-0 {
                background hsl(0 , 80%, 50%)
            }
            &.key-1 {
                background hsl(217 , 80%, 50%)
            }
            &.key-2 {
                background hsl(152 , 80%, 50%)
            }
            &.key-3 {
                background hsl(307 , 80%, 50%)
            }
            &.key-4 {
                background hsl(97 , 80%, 50%)
            }
            &.key-5 {
                background hsl(330 , 80%, 50%)
            }
            &.key-6 {
                background hsl(230 , 80%, 50%)
            }
            &.key-7 {
                background hsl(172 , 80%, 50%)
            }
            &.key-8 {
                background hsl(58 , 80%, 50%)
            }
            &.key-9 {
                background hsl(288 , 80%, 50%)
            }
            &.key-10 {
                background hsl(25 , 80%, 50%)
            }
            &.key-11 {
                background hsl(202 , 80%, 50%)
            }
        }
    }
}
</style>
