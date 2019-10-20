<template>
  <div class="yingui">
    <div class="controller-wp">
      <xw-button-group class="btn-group">
        <xw-button icon="play">播放</xw-button>
        <xw-button icon="pause">暂停</xw-button>
        <xw-button icon="record">录制</xw-button>
      </xw-button-group>
    </div>
    <div class="yg-main">
      <div class="left">
        <div ref="keyList" class="left-keylist" />
      </div>
      <div class="right">
        <div class="kedu">
          <div class="zhizhen" />
        </div>
        <div ref="yinguiBg" class="yg-bg" />
      </div>
    </div>
  </div>
</template>

<script>
import { heiKeyArray } from '../../keyboard';
import getRepeatImg from './bg-repeat';
import xwButtonGroup from '../../../../../../comp/xw-comp/xw-button-group.vue';
import xwButton from '../../../../../../comp/xw-comp/xw-button.vue';

export default {
  components: {
    xwButtonGroup,
    xwButton,
  },
  data() {
    return {};
  },
  mounted() {
    let keyDomList = '';
    heiKeyArray.forEach((element) => {
      keyDomList = `<div class="w"></div>${keyDomList}`; // 白键
      if (element > 0) {
        keyDomList = `<div class="h"></div>${keyDomList}`; // 黑键
      }
    });
    this.$refs.keyList.innerHTML = keyDomList;
    const src = getRepeatImg();
    this.$refs.yinguiBg.style.backgroundImage = `url(${src})`;
  },
};
</script>

<style lang="stylus">
_keduHeight = 25px;

.yingui{
    >.controller-wp {
        // height 50px;
        padding 16px 10px 10px 40px;
    }
    >.yg-main{
        position relative;
        min-width 1000px
        overflow-x auto
        >.left {
            position relative;
            width 40px;
            padding _keduHeight 0 30px 0;
            // box-shadow 0 0 8px #0003;
            z-index 5;
        }
        >.right {
            position absolute;
            top 0
            left 40px;
            right 0;
            height 100%;
            // background #999;
            overflow-x hidden;
            >.yg-bg {
                position absolute;
                top _keduHeight;
                left 0;
                right 0;
                bottom 0;
                background-repeat: repeat-x;
            }
            >.kedu {
                position relative;
                height _keduHeight;
                width 100%;
                background #0008;
            }
        }
    }
    .left-keylist {
        background #333;
        padding 1px 0;
        margin 0px 0;
        border-right 1px solid #000;
        >div {
            height 8px;
            margin 1px 0;
        }
        >.w {
            background #fff;
        }
        >.h {
            background #666;
        }
    }
}
</style>
