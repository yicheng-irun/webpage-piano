<template>
  <div class="pc-keyboard-save">
    <div class="t-save-tips">
      <span>或者用 </span>
      <input
        id=""
        v-model="inputName"
        type="text"
        class="xw-input"
        maxlength="30"
        placeholder="请输入一个存档名称"
        @focus="inputFocus"
        @blur="inputBlur"
      />
      <span> 作为名称</span>
      <xw-button type="primary" @click="save()">
        保存
      </xw-button>
      <span>至下方的本地存档，</span>
      <span>也可以</span>
      <xw-button type="primary" @click="saveFile()">
        另存为
      </xw-button>
      <span>本地.xkmp文件，</span>
      <span>还可以</span>
      <xw-button type="primary" @click="chooseFile()">
        读取
      </xw-button>
      <span>本地保存的.xkmp文件。</span>
    </div>
    <h4 class="title">
      {{ list.length === 0 ? "本地暂无配置存档" : "您的配置存档:" }}
    </h4>
    <transition-group name="save-list" class="save-list" tag="div">
      <div v-for="(item, index) in list" :key="item.key" class="save-list-item">
        <div class="cont">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="time">保存于：{{ howLong(item.time) }}</div>
          <div class="btns">
            <xw-button type="danger" @click="remove(index)">
              删除
            </xw-button>
            <xw-button @click="use(index)">
              使用
            </xw-button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import xwButton from '@/comp/xw-comp/xw-button.vue';
import { start, stop } from '../keyboard-pc';
import { howLong } from '../../../../../lib/string/format-time';
import { saveFile, chooseFile } from '../../../../../comp/tools/js-file-util';
import { encodeXKMP, decodeXKMP } from '../controllers/xkmp-file';
import xwMessage from '@/comp/xw-comp/xw-message';

const KEY_NAME = 'kmap';

export default {
  components: {
    xwButton,
  },
  data() {
    return {
      inputName: '未命名的存档',
      list: [],
      listKey: 1,
    };
  },
  mounted() {
    const list = this.loadLocalList();
    list.forEach((item) => {
      this.listKey += 1;
      item.key = this.listKey;
    });
    this.list = list;
  },
  methods: {
    howLong,
    randomKey() {
      return `${Date.now()}`;
    },
    remove(index) {
      this.list.splice(index, 1);
      this.saveToLocal(this.list);
    },
    use(index) {
      const t = this.list[index];
      if (t) {
        const { data } = t;
        try {
          const tdata = JSON.parse(data);
          const newKey = {};
          Object.keys(tdata).forEach((i) => {
            const t2 = parseInt(i, 10);
            if (t2) {
              newKey[t2] = tdata[i];
            }
          });

          this.$store.state.cacheConf.pckey2key = newKey;
          this.inputName = t.name;
          xwMessage.success('应用成功');
        } catch (e) {
          //
        }
      }
    },
    loadLocalList() {
      const t = window.localStorage.getItem(KEY_NAME);
      try {
        if (t) {
          const tvar = JSON.parse(t);
          if (Array.isArray(tvar)) {
            return tvar;
          }
        }
      } catch (e) {
        //
      }
      return [];
    },
    saveToLocal(list) {
      const t = JSON.stringify(list);
      window.localStorage.setItem(KEY_NAME, t);
    },
    getMapData() {
      const {
        cacheConf: { pckey2key },
      } = this.$store.state;
      const newKey = {};
      Object.keys(pckey2key).forEach((i) => {
        const t = parseInt(i, 10);
        if (t) {
          newKey[t] = pckey2key[i];
        }
      });

      return newKey;
    },
    save() {
      const data = this.getMapData();
      const newItem = {
        key: this.randomKey(),
        name: this.inputName,
        time: Date.now(),
        data: JSON.stringify(data),
      };
      this.list.unshift(newItem);
      // console.log(JSON.stringify(data, null, '    '));
      this.saveToLocal(this.list);
    },
    saveFile() {
      const dataObj = this.getMapData();
      const fileData = encodeXKMP(dataObj);
      const fileName = this.inputName || '未命名的钢琴映射文件';
      saveFile(fileData, `${fileName}.xkmp`);
    },
    chooseFile() {
      chooseFile('.xkmp', (dataStr, fileName = '') => {
        try {
          const data = decodeXKMP(dataStr);
          const newItem = {
            key: this.randomKey(),
            name: fileName,
            time: Date.now(),
            data: JSON.stringify(data),
          };
          this.list.unshift(newItem);
          // console.log(JSON.stringify(data, null, '    '));
          this.saveToLocal(this.list);
        } catch (e) {
          xwMessage.success(e.message || '解析出错');
        }
      });
    },
    inputFocus() {
      stop();
    },
    inputBlur() {
      start();
    },
  },
};
</script>

<style lang="stylus">
@import '../comp/input.styl';
.pc-keyboard-save {
    padding 0px 0 0px 0;
    >.t-save-tips {
        margin 1em 0;
    }
    >.title {
        margin 0 0 1em;
    }
    .save-list {
        position relative;
        // width 700px;
        padding 0 0 1em;
        .save-list-item {
            display inline-block;
            margin 3px;
            transition: all 0.6s;
            >div.cont{
                position relative;
                padding 10px 12px;
                width 280px;
                // border 1px solid #333
                border-radius 3px;
                box-shadow 0 0 6px #0004;
                background-color #fff;
                >.name {
                    font-weight bold;
                    white-space nowrap
                    overflow hidden;
                    text-overflow ellipsis;
                    margin 0 50px 5px 0;
                }
                >.time {
                    font-size 12px;
                }
                >.btns {
                    position absolute;
                    bottom 5px;
                    right 3px;
                    // width 70px;
                    text-align center;
                    >.xw-button {
                        font-size 12px;
                    }
                }
            }
        }
    }
    .save-list-enter {
        opacity: 0;
        transform translateY(-100px) scale(0.5)
    }
    .save-list-leave-to {
        opacity: 0;
        transform scale(0.2) translateY(-100px) rotate(30deg)
    }
    .save-list-leave-active {
        position: absolute;
    }
}
</style>
