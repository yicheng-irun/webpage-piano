<template>
  <div class="record">
    <xwLoading :loading="recording" :num="5" class="record-loading">
      <xw-button type="danger" icon="stop" @click="stop">
        停止
      </xw-button>
      <div ref="recordingLong" class="record-time">
        0:00
      </div>
    </xwLoading>
    <div class="record-card">
      <div class="bottons">
        <xw-button
          type="primary"
          icon="record"
          :style="recording ? 'opacity:0' : ''"
          @click="start"
        >
          录制
        </xw-button>
      </div>
      <div class="jindu-info">
        <span>
          0:00/3:43
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import xwButton from '../../../../../../comp/xw-comp/xw-button.vue';
import xwLoading from '../../../../../../comp/xw-comp/xw-loading.vue';
import {
  onEvent, offEvent, startRecord, stopRecord,
} from './record-back-end';

export default {
  components: {
    xwButton,
    xwLoading,
  },
  data() {
    return {
      recording: false,
    };
  },
  beforeMount() {
    this.onEvent = (status) => {
      this.recording = status.recording;
      const { longTime } = status;
      const m = Math.floor(longTime / (1000 * 60)); // 分钟
      const s = Math.floor((longTime % (1000 * 60)) / 1000);
      const ts = s < 10 ? `0${s}` : String(s);
      if (this.$refs.recordingLong) {
        this.$refs.recordingLong.innerText = `${m}:${ts}`;
      }
    };
    onEvent(this.onEvent);
  },
  destroyed() {
    offEvent(this.onEvent);
  },
  methods: {
    start() {
      startRecord();
    },
    stop() {
      stopRecord();
    },
  },
};
</script>

<style lang="stylus">
.record {
    position relative;
    z-index 1
    font-size 14px;
    min-height 100%
    >.record-loading {
        font-size 18px
        .record-time {
            margin 0.5em 0
            font-size 40px
            line-height 2
            user-select none
        }
    }
    >.record-card {
        margin 0 auto;
        padding 4em 0 1em
        width 100%;
        max-width 500px;
        min-height 200px;
        background #fff3;
        >.bottons {
            margin 0 1em
            text-align center
            >button {
                font-size 16px
                transition opacity 0.3s
            }
        }
        >.jindu-info{
            // font-size 12px;
            margin 0 1em
            text-align right
        }
    }
}
</style>
