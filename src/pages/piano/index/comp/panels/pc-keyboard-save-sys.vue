<template>
  <div class="pc-keyboard-save">
    <h4 class="title">
      系统默认键盘配置:
    </h4>
    <div v-if="list.length > 0">
      <transition-group name="save-list" class="save-list" tag="div">
        <div v-for="(item, index) in list" :key="item.key" class="save-list-item">
          <div class="cont">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="time">
              {{ item.tips }}
            </div>
            <div class="btns">
              <xw-button @click="use(index)">
                使用
              </xw-button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import xwButton from '@/comp/xw-comp/xw-button.vue';
import xwMessage from '@/comp/xw-comp/xw-message';
import pckey2key, { pckey2keyType2 } from '../../pckey-key';

export default {
  components: {
    xwButton,
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.list.push({
      key: '1',
      name: '不带黑键方案',
      tips: 'C大调纯白键的方案，带小数字键盘',
      data: JSON.stringify(pckey2key()),
    });
    this.list.push({
      key: '2',
      name: '黑键方案',
      tips: 'C大调, 能按到黑键的方案',
      data: JSON.stringify(pckey2keyType2()),
    });
  },
  methods: {
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
  },
};
</script>

<style lang="stylus">
// 公用 pc-keyboard-save 的样式
</style>
