<template>
  <div class="piano-sts">
    <div class="form-ct">
      <div class="form">
        <div class="sts-row">
          <label>隐藏顶部导航栏：</label>
          <xwSwitch v-model="state.hideNavBar" />
        </div>
        <div class="sts-row">
          <label>显示键盘上数字：</label>
          <xwSwitch v-model="state.cacheConf.showKbdNum" />
        </div>
        <div class="sts-row">
          <label>放大和缩小键盘：</label>
          <xw-button type="primary" @click="scaleCG(-1)">缩小</xw-button>
          <b class="scaletext">{{ state.cacheConf.scale }}</b>
          <xw-button type="primary" @click="scaleCG(1)">放大</xw-button>
        </div>
        <div class="sts-row">
          <label>外接MIDI键盘：</label>
          <settings-midi-peripheral />
        </div>
      </div>
    </div>
    <div v-show="state.cacheConf.barScale < 1" class="btm-fixed">
      <div class="visible-line">
        <div
          class="visible-bar"
          :style="{
            width: `${state.cacheConf.barScale * 100}%`,
            left: `${(1 - state.cacheConf.barScale) * state.cacheConf.left * 100}%`
          }"
        />
      </div>
      <div class="xw-btn f-btn lef" @click="mleft(false)">左</div>
      <div class="xw-btn f-btn rit" @click="mleft(true)">右</div>
    </div>
  </div>
</template>

<script>
import xwSwitch from '../comp/xw-switch.vue';
import { resize } from '../size';
import xwButton from '../../../../../comp/xw-comp/xw-button.vue';
import settingsMidiPeripheral from './settings-midi-peripheral.vue';

export default {
  components: {
    xwSwitch,
    xwButton,
    settingsMidiPeripheral,
  },
  data() {
    return {};
  },
  computed: {
    state() {
      return this.$store.state;
    },
  },
  watch: {
    'state.hideNavBar': function _() {
      this.$nextTick(resize);
    },
    'state.cacheConf.showKbdNum': function _() {
      //
    },
  },
  mounted() {},
  methods: {
    scaleCG(v) {
      let s = this.state.cacheConf.scale;
      s += v;
      if (s < 1) {
        s = 1;
      } else if (s > 20) {
        s = 20;
      }
      this.state.cacheConf.scale = s;
      this.$nextTick(resize);
    },
    mleft(v) {
      let f = this.state.cacheConf.left;
      if (v) {
        f += 0.1;
      } else {
        f -= 0.1;
      }
      if (f < 0) {
        f = 0;
      } else if (f > 1) {
        f = 1;
      }
      this.state.cacheConf.left = f;
      resize();
    },
  },
};
/**
 * 调大调小键盘的按钮
 * 左右移动键盘可见区的按钮
 * 显示或隐藏键盘上字母和数字的按钮
 */
</script>

<style lang="stylus">
@import '../comp/btn.styl';
.piano-sts{
    height 100%;
    font-size 15px;
    >.form-ct {
        position absolute;
        top 0;
        left 0;
        width 100%;
        bottom 32px;
        overflow-y auto;
        >div.form {
            padding 20px;
            >.sts-row {
                padding 0 0 8px;
                >label {
                    margin 0 0px 0 0;
                    user-select none;
                }
            }
        }
    }
    .scaletext {
        display inline-block;
        padding 0 10px;
    }
    >.btm-fixed {
        position absolute;
        bottom 0px;
        left 0;
        height 32px;
        width 100%;
        // padding 16px 0 0 0;
        >.visible-line {
            position relative;
            top 16px;
            height 1px;
            background-color #0006;
            margin 0 36px;
            pointer-events none;
            >.visible-bar {
                position relative;
                width 0;
                top -2px;
                height 5px;
                background-color #2579c294;
                // border 1px solid #fff;
                // box-shadow 0 0 5px #0003;
            }
        }
        >.f-btn {
            position absolute;
            top 2px;
            margin 0 2px;
            width 28px;
            height 24px;
            line-height 25px;
            text-align center;
            font-size 12px;
            padding 0;
            &.rit {
                right 0;
            }
        }
    }
}
</style>
