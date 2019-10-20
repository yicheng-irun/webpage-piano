<template>
  <div class="record-item">
    <div class="bottons">
      <xw-button-group class="btn-group">
        <xw-button icon="play">
          播放
        </xw-button>
        <xw-button icon="pause">
          暂停
        </xw-button>
      </xw-button-group>
    </div>
    <div class="jindu">
      jindu
    </div>
    <div class="jindu-info">
      <span>
        0:00/3:43
      </span>
    </div>
  </div>
</template>

<script>
import xwButton from '../../../../../../comp/xw-comp/xw-button.vue';
import xwButtonGroup from '../../../../../../comp/xw-comp/xw-button-group.vue';

export default {
  components: {
    xwButton,
    xwButtonGroup,
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
.record {
    font-size 14px;
    margin 0 1em
    padding 2em 0
    >.record-card {
        margin 0 auto
        padding 1em 0
        width 100%;
        max-width 500px;
        min-height 200px;
        background #fff3;
        >.bottons {
            font-size 12px
            margin 0.3em 14px
        }
        >.jindu-info{
            // font-size 12px;
            margin 0 1em
            text-align right
        }
        .jindu{
            margin 0 1em
            height 40px
            background #555
        }
    }
}
</style>
