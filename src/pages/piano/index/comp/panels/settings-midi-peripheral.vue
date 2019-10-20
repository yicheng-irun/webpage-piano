<template>
  <div class="midi-access">
    <div v-if="support" class="support">
      <xw-button @click="doConnect()">{{ linked ? "刷新" : "立即连接" }}</xw-button>
      <xw-button v-if="linked" @click="doDisconnect()">断开</xw-button>
      <span v-if="!linked" class="tips"
        >可将midi键盘或者电钢琴通过USB连接到您的电脑或手机后点击左侧连接按钮</span
      >
      <span v-if="errMsg" class="tips error">{{ errMsg }}</span>
      <div v-if="deviceInfo.length >= 0" class="d-info">
        <div v-for="item in deviceInfo" :key="item.id" class="d-info-item">
          已连接： {{ item.manufacturer }} {{ item.name }}
        </div>
      </div>
      <div v-if="deviceInfo.length == 0 && linked" class="d-info">未检测到设备</div>
    </div>
    <div v-else class="not-support">
      检测到您的浏览器不支持该功能。此功能可在电脑上的Chorme浏览器，大于5.0版本的安卓手机上运行。苹果移动设备上兼容性未知。
    </div>
  </div>
</template>

<script>
import {
  isSupport, connect, disConnect, getMidiParse,
} from '../controllers/midi-peripheral';
import xwButton from '../../../../../comp/xw-comp/xw-button.vue';

export default {
  components: {
    xwButton,
  },
  data() {
    return {
      support: false,
      linked: false,
      deviceInfo: [],
      errMsg: '',
    };
  },
  mounted() {
    this.support = isSupport();
    this.refreshInfo();
  },
  methods: {
    doConnect() {
      connect()
        .then(() => {
          this.refreshInfo();
        })
        .catch((e) => {
          this.errMsg = `${e}`;
        });
    },
    doDisconnect() {
      disConnect();
      this.refreshInfo();
    },
    refreshInfo() {
      const midiParser = getMidiParse();
      if (midiParser) {
        this.linked = true;
        const deviceInfo = [];
        midiParser.inputs.forEach((item) => {
          deviceInfo.push({
            id: item.id,
            name: item.name,
            manufacturer: item.manufacturer,
          });
        });
        this.deviceInfo = deviceInfo;
      } else {
        this.linked = false;
        this.deviceInfo = [];
      }
    },
  },
};
</script>

<style lang="stylus">
.midi-access {
    vertical-align top;
    display inline-block;
    >.support {
        >.tips {
            margin 0 10px;
            font-size 13px;
            &.error {
                color #f00;
            }
        }
        >.d-info {
            padding 5px 0;
            font-size 12px;
        }
    }
    >.not-support {
        font-size 13px;
    }
}
</style>
