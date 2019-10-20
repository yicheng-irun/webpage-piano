<template>
  <div ref="keyboardConatiner" class="keyboard-c">
    <div
      ref="keyboard"
      class="keyboard"
      :style="{ transform: `scale(${scale}) translateX(-${left}px)` }"
      :class="{ hidenum: !cacheConf.showKbdNum }"
    >
      <div ref="blacks" class="black" />
      <div ref="whites" class="white" />
      <div ref="centerC" class="center-c" />
    </div>
    <!-- <pre class="info">{{ infos.join('\n') }}</pre> -->
  </div>
</template>
<script>
import { offset } from '../../util/index';
import { setKeyBoard } from './size';
import { whiteDom, blackDom, getKey } from './keyboard';
import { keypress } from './piano-control';

export default {
  data() {
    return {
      scale: 1,
      offsetTop: 0,
      offsetLeft: 0,
      left: 0,
      // infos: ['asdfasdf', 'aaaa'],
    };
  },

  computed: {
    cacheConf() {
      return this.$store.state.cacheConf;
    },
  },

  mounted() {
    this.init();
    this.initEvent();
    this.$refs.centerC.innerText = '中央C';

    setKeyBoard(this);
  },

  methods: {
    init() {
      const { blacks, whites } = this.$refs;
      blacks.innerHTML = blackDom;
      whites.innerHTML = whiteDom;

      const keyDoms = new Array(89);

      function doCache(pdom) {
        for (let i = 0; i < pdom.children.length; i += 1) {
          const item = pdom.children[i];
          // item.setAttribute('class', Math.random() < 0.1 ? 'act' : ''); // 方便调试按键按下时显示的样式
          const key = parseInt(item.getAttribute('data-key'), 10);
          if (key) {
            keyDoms[key] = item;
          }
        }
      }
      doCache(blacks);
      doCache(whites);
      this.keyDoms = keyDoms;
    },

    initEvent() {
      // const element = this.$refs.keyboard;
      const { keyboardConatiner } = this.$refs;

      const mouseEvent = () => {
        let isDown = false;
        keyboardConatiner.addEventListener(
          'mousedown',
          (e) => {
            e.stopPropagation();
            e.preventDefault();
            isDown = true;
            // console.log('down');
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            const key = getKey(x / this.scale + this.left, y / this.scale);
            if (key) {
              keypress.down([key], true, 1);
            }
          },
          true,
        );

        // console.log(this.$parent.$el);
        document.addEventListener(
          'mousemove',
          (e) => {
            if (isDown) {
              e.stopPropagation();
              e.preventDefault();
              // console.log('move');
              const x = e.pageX - this.offsetLeft;
              const y = e.pageY - this.offsetTop;
              const key = getKey(x / this.scale + this.left, y / this.scale);
              keypress.down([key], true, 1);
            }
          },
          true,
        );
        document.addEventListener(
          'mouseup',
          (e) => {
            if (isDown) {
              e.stopPropagation();
              e.preventDefault();
              // console.log('up');
              isDown = false;
              const x = e.pageX - this.offsetLeft;
              const y = e.pageY - this.offsetTop;
              const key = getKey(x / this.scale + this.left, y / this.scale);
              keypress.up([key], 1);
            }
          },
          true,
        );
      };

      const touchEvent = () => {
        let isDown = false;
        keyboardConatiner.addEventListener(
          'touchstart',
          (e) => {
            e.stopPropagation();
            e.preventDefault();
            isDown = true;
            // console.log(e);
            // console.log('down');
            // this.infos.push(`down ${e.touches.length} ${Date.now()}`);
            const { touches } = e;
            const keys = [];
            for (let i = 0; i < e.touches.length; i += 1) {
              const pst = touches[i];
              const x = pst.pageX - this.offsetLeft;
              const y = pst.pageY - this.offsetTop;
              const key = getKey(x / this.scale + this.left, y / this.scale);
              if (key) {
                keys.push(key);
              }
            }
            if (keys.length) {
              keypress.down(keys, true, 1);
            }
          },
          true,
        );

        // console.log(this.$parent.$el);
        document.addEventListener(
          'touchmove',
          (e) => {
            if (isDown) {
              e.stopPropagation();
              e.preventDefault();
              const { touches } = e;
              const keys = [];
              for (let i = 0; i < e.touches.length; i += 1) {
                const pst = touches[i];
                const x = pst.pageX - this.offsetLeft;
                const y = pst.pageY - this.offsetTop;
                const key = getKey(x / this.scale + this.left, y / this.scale);
                if (key) {
                  keys.push(key);
                }
              }
              keypress.down(keys, true, 1);
            }
          },
          true,
        );
        document.addEventListener(
          'touchend',
          (e) => {
            if (isDown) {
              e.stopPropagation();
              e.preventDefault();
              if (e.touches.length === 0) {
                isDown = false;
              }
              const { touches } = e;
              const keys = [];
              for (let i = 0; i < e.touches.length; i += 1) {
                const pst = touches[i];
                const x = pst.pageX - this.offsetLeft;
                const y = pst.pageY - this.offsetTop;
                const key = getKey(x / this.scale + this.left, y / this.scale);
                if (key) { keys.push(key); }
              }
              keypress.down(keys, true, 1);
              if (touches.length === 0) {
                isDown = false;
              }
            }
          },
          true,
        );
      };

      if ('ontouchstart' in window) {
        touchEvent();
      }
      mouseEvent();

      keypress.onDown((keys = []) => {
        keys.forEach((i) => {
          this.keyDoms[i].setAttribute('class', 'act');
        });
      });

      keypress.onUp((keys = []) => {
        keys.forEach((i) => {
          this.keyDoms[i].setAttribute('class', '');
        });
      });
    },

    setSize(scale, left) {
      this.scale = scale;
      this.left = left;
      const offsetValue = offset(this.$refs.keyboard);
      this.offsetTop = offsetValue.top + 200;
      this.offsetLeft = offsetValue.left;
      // console.log(offsetValue);
    },
  },
};
</script>
<style lang="stylus">
.keyboard-c {
    position: absolute;
    bottom: 0;
    left: 0;
    width 100%;
    padding 0 0 15px;
    // .info {
    //     position fixed;
    //     top 50px;
    //     left 0;
    //     font-size 12px;
    //     line-height 1;
    // }
}
.keyboard {
    position absolute;
    bottom 15px;
    // width: 2080px;
    height: 200px;
    touch-action: none;
    cursor: default;
    overflow: visible;
    transition: transform 0.2s;
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    transform-origin: 0 100%;
    font-size 12px;
    box-shadow 0 0 10px #0004;
    >.black {
        position: absolute;
        height: 125px;
        margin: 0 0 0 26px;
        width: 0;
        bottom: 75px;
        z-index: 4;
        pointer-events none;
        >div {
            position: absolute;
            left: 0;
            top: 0;
            width: 27px;
            height: 100%;
            background-color: #444444;
            border: 1px solid #0008;
            border-radius: 3px;
            color: #fff;
            text-align: center;
            // box-shadow 0 0 8px #0009;
            &.act {
                background-color #c783b2;
                border-color #0008;
            }
        }
    }
    >.white {
        height: 200px;
        white-space nowrap;
        // width: 2060px;
        bottom: 0px;
        margin: 0 0 0 1px;
        z-index: 2;
        pointer-events none;
        >div{
            position: relative;
            // float: left;
            display inline-block;
            width: 41px;
            height: 100%;
            background-color: #fff;
            border: 1px solid #0004;
            margin: 0 0 0 -1px;
            box-sizing: border-box;
            border-radius: 4px;
            text-align: center;
            color: #000;

            &.act {
                background-color #ad3c8a99;
            }

            >div{
                position: absolute;
                width: 100%;
                bottom: 10px;
                font-size: 12px;
            }
        }
    }
    &.hidenum {
        >div>div>span{
            display: none;
        }
    }
    >.center-c {
        position: absolute;
        bottom: 35px;
        left: 925px;
        font-size: 12px;
        color: #A43983;
        z-index: 5;
        pointer-events: none;
    }
}
</style>
