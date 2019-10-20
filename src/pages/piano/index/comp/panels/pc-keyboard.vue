

<template>
  <div>
    <div ref="keyboardCT" class="pc-kbd-ct">
      <div v-for="(row, idx) in kbdMain" :key="idx" class="pc-kbd-row">
        <div
          v-for="(item, index) in row"
          :key="index"
          :class="{
            disable: item.d == 1,
            selec: editState && item.c == selectedKey
          }"
          :style="{
            width: item.w ? `${item.w}px` : '',
            height: item.h ? `${item.h}px` : '',
            marginLeft: item.m ? `${item.m}px` : ''
          }"
          :name="item.c"
          :disable="item.d == 1"
        >
          <div class="key-name">
            {{ item.n }}
          </div>
          <div v-if="item.d !== 1" class="key-rep">
            {{ getEqualName(item.c) }}
          </div>
        </div>
      </div>
    </div>
    <div class="pc-kbd-set">
      <div class="row">
        <span>您可以 </span>
        <xw-button type="primary" tabindex="0" @click="editState = !editState">
          {{ editState ? "退出编辑" : "编辑" }}
        </xw-button>
        <span> 上面的映射</span>
      </div>
      <div v-if="editState" class="row edit-container">
        <p>
          PS:
          鼠标或键盘在上方选中一个电脑键之后，然后用鼠标在下方的钢琴键盘中按下对应的键，即可进行映射和绑定。
        </p>
        <div v-if="selectedKey === 0">
          请用鼠标或者电脑键盘按下一个键
        </div>
        <div v-else>
          <span>已选中 </span>
          <div
            :style="{
              width: getPcKeyWidth(selectedKey)
            }"
            class="select-key"
          >
            <div class="key-name">
              {{ getPcKeyName(selectedKey) }}
            </div>
          </div>
          <span>键，此键当前</span>
          <span>{{
            getName(selectedKey)
              ? `已经设置为钢琴第 ${getKeyIndex(selectedKey)} 个键，音名：${getName(selectedKey)}`
              : "未绑定钢琴键"
          }}</span>
        </div>
        <div class="btn-group">
          <span>全部</span>
          <xw-button type="primary" @click="degradeYin">
            降低 (降调)
          </xw-button>
          <span>半个音高，</span>
          <span>全部</span>
          <xw-button type="primary" @click="upgradeYin">
            升高 (升调)
          </xw-button>
          <span>半个音高，</span>
          <span>这里可以</span>
          <xw-button type="primary" @click="clearConfig()">
            清空
          </xw-button>
          <span>上面的配置，</span>
          <span>还可以</span>
          <xw-button type="primary" @click="restoreConfig()">
            还原
          </xw-button>
          <span>成默认配置(C大调纯白键版)，</span>
          <span>或者是</span>
          <xw-button type="primary" @click="restoreConfig2()">
            还原
          </xw-button>
          <span>成以前版本的默认配置(C大调包括黑键版)。</span>
        </div>
      </div>
      <div class="row">
        <pcKeyboardSave />
      </div>
      <div class="row">
        <pcKeyboardSaveSys />
      </div>
      <div class="row-title">
        FAQ :
      </div>
      <faq
        class="row"
        question="有些玩家在吐槽专区问到为什么不能按下黑键？"
        answer="
                1. 请在上方找到 系统默认键盘配置方案-> 黑键方案 -> 点击 `使用`。
                2. 在上方找到一个编辑按钮，点击 `编辑` ，在展开的配置界面上进行个性化的配置。
                "
      />
      <faq
        class="row"
        question="为什么我的电脑键盘有的键不能多个同时按下去？"
        answer="键盘生产商在生产键盘时做了限制。有些键盘生产商为了节省开支，会把许多键放在一条线路上，这样相同区域的多个键被同时按下时，只会有一个键起作用。"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable guard-for-in */

/**
 * 电脑键盘映射设置
 * 在屏幕上列一个键盘吧，列出所有可用的键和对应的键code
 */
import pcKeyboardSave from './pc-keyboard-save.vue';
import xwButton from '@/comp/xw-comp/xw-button.vue';
import {
  onEvent, offEvent, keyDown, keyUp, getKeyConfig,
} from '../keyboard-pc';
import { keyNameList } from '../keyboard';
import { keypress } from '../piano-control';
import faq from '../comp/faq.vue';
import pckey2key, { pckey2keyType2 } from '../../pckey-key';
import xwMessage from '@/comp/xw-comp/xw-message';

const domArray = new Array(256);
const keyNameArray = new Array(256);

const kbdMain = getKeyConfig();

kbdMain.forEach((item) => {
  item.forEach((element) => {
    if (element.d !== 1) {
      keyNameArray[element.c] = element;
    }
  });
});

export default {
  components: {
    xwButton,
    pcKeyboardSave,
    pcKeyboardSaveSys: () => import('./pc-keyboard-save-sys.vue'),
    faq,
  },
  data() {
    return {
      kbdMain,
      editState: false,
      selectedKey: 0,
    };
  },
  computed: {},

  mounted() {
    this.bindToArray();
    onEvent(this.onEvent);
    keypress.onDown(this.onKeypressDown);
  },

  destroyed() {
    offEvent(this.onEvent);
    keypress.offDown(this.onKeypressDown);
  },

  methods: {
    onKeypressDown(keys, by) {
      if (by === 1 && this.editState && this.selectedKey !== 0 && keys.length) {
        const [key] = keys;
        const {
          cacheConf: { pckey2key },
        } = this.$store.state;
        this.$set(pckey2key, this.selectedKey, key);
      }
    },
    getEqualName(pcKey) {
      const {
        cacheConf: { pckey2key },
      } = this.$store.state;
      const key = pckey2key[pcKey];
      if (key && keyNameList[key]) {
        return `♩ = ${keyNameList[key]}`;
      }
      return '';
    },
    getName(pcKey) {
      const {
        cacheConf: { pckey2key },
      } = this.$store.state;
      const key = pckey2key[pcKey];
      if (key && keyNameList[key]) {
        return keyNameList[key];
      }
      return '';
    },
    getKeyIndex(pcKey) {
      // 通过pc键盘的key获取对应的钢琴键盘的key
      const {
        cacheConf: { pckey2key },
      } = this.$store.state;
      const key = pckey2key[pcKey];
      return key;
    },
    getPcKeyName(key) {
      if (keyNameArray[key]) {
        return keyNameArray[key].n;
      }
      return '';
    },
    getPcKeyWidth(key) {
      if (keyNameArray[key] && keyNameArray[key].w) {
        return `${keyNameArray[key].w}px`;
      }
      return '';
    },
    bindDomClickEvent(dom, key) {
      let isdown = false;
      dom.addEventListener(
        'mousedown',
        (e) => {
          isdown = true;
          keyDown(key);
          e.stopPropagation();
          e.preventDefault();
        },
        true,
      );
      function up(e) {
        if (isdown) {
          isdown = false;
          keyUp(key);
        }
        e.stopPropagation();
        e.preventDefault();
      }
      dom.addEventListener('mouseleave', up, true);
      dom.addEventListener('mouseup', up, true);
    },
    bindCommentEvent() {},
    bindToArray() {
      const { keyboardCT } = this.$refs;
      for (let index = 0; index < keyboardCT.children.length; index += 1) {
        const element = keyboardCT.children[index];
        for (let j = 0; j < element.children.length; j += 1) {
          const element2 = element.children[j];
          if (!element2.getAttribute('disable')) {
            const name = element2.getAttribute('name');
            const key = parseInt(name, 10);
            domArray[key] = element2;
            this.bindDomClickEvent(element2, key);
          }
        }
      }
    },
    onEvent(isDown, which) {
      const element = domArray[which];
      if (element) {
        if (isDown) {
          element.classList.add('d');
          if (this.editState) {
            this.selectedKey = which;
          }
        } else {
          element.classList.remove('d');
        }
      }
    },
    upgradeYin() {
      const {
        cacheConf: { pckey2key },
      } = this.$store.state;
      for (const i in pckey2key) {
        const t = parseInt(i, 10);
        if (t) {
          pckey2key[t] += 1;
        }
      }
      xwMessage.success('升调成功');
    },
    degradeYin() {
      const {
        cacheConf: { pckey2key },
      } = this.$store.state;
      for (const i in pckey2key) {
        const t = parseInt(i, 10);
        if (t) {
          pckey2key[t] -= 1;
        }
      }
      xwMessage.success('升调成功');
    },
    clearConfig() {
      this.$store.state.cacheConf.pckey2key = {};
      xwMessage.success('清除成功');
    },
    restoreConfig() {
      this.$store.state.cacheConf.pckey2key = pckey2key();
      xwMessage.success('还原成功');
    },
    restoreConfig2() {
      // 老版本的
      this.$store.state.cacheConf.pckey2key = pckey2keyType2();
      xwMessage.success('还原成功');
    },
  },
};
</script>

<style lang="stylus">
.pc-kbd-ct {
    padding 30px 5px 15px;
    user-select none;
    width 1272px;
    margin 0 auto;
    >.pc-kbd-row {
        display block;
        white-space nowrap;
        height 52px;
        margin 0 0 5px;
        >div {
            display inline-block;
            width 50px;
            height 50px;
            margin 0 5px 0 0;
            background #fff;
            border 1px solid #0000004d;
            border-radius 4px;
            line-height 1;
            vertical-align top;
            &.disable {
                // background #ccc;
                background #7d97ad;
                border 1px solid #0003;
            }
            &.d {
                background-color #c7274c80;
            }
            &.selec {
                animation shanshan 1s infinite;
            }
            >.key-name {
                padding 5px 8px 0;
                pointer-events none;
            }
            >.key-rep {
                font-size 12px;
                padding 6px 0 0 0px;
                color #100affcc;
                font-weight bold;
                text-align center;
                pointer-events none;
            }
        }
    }

}
.pc-kbd-set {
    width 1272px;
    margin 0 auto;
    padding 0 0 50px 0;
    >.row-title {
        margin 0 10px 0.5em
        font-size 16px
        font-weight bold
    }
    >.row {
        margin 0 10px;
        &.faq-item{
            margin 0 10px 1em;
        }
    }
    .xw-button{
        font-size 14px;
        margin 0 0.25em;
    }
    .select-key{
        display inline-block;
        width 50px;
        height 50px;
        margin 0 5px 0 0;
        background #000b;
        border 1px solid #0000004d;
        border-radius 4px;
        line-height 1;
        vertical-align top;
        >.key-name {
            padding 5px 8px 0;
            pointer-events none;
            font-weight bold;
            // color #100affcc;
            color #fff;
        }
    }

    .edit-container {
        margin 5px 0 0 0;
        border 1px solid #0003;
        padding 3px 16px 20px;
        background #fff;
        >.btn-group {
            margin 10px 0 0 0;
        }
    }
}


@keyframes shanshan {
    0% {
        border 1px solid #100affcc;
        color #100affcc;
        background-color #100aff33;
    }
    49% {
        border 1px solid #100affcc;
        color #100affcc;
        background-color #100aff33;
    }
    50% {
        border 1px solid #0000004d;
        color #000;
    }
    100% {
        border 1px solid #0000004d;
        color #000;
    }
}
</style>
