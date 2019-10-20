<template>
    <transition-group
        name="xw-pagination"
        class="xw-pagination"
        tag="nav"
    >
        <xw-button
            v-for="item in btnList"
            :key="item.id"
            :type="item.type"
            :class="{select: pageIndex == item.text}"
            @click="pageChange(item.n)"
        >{{ item.text }}</xw-button>
    </transition-group>
</template>

<script>
import xwButton from './xw-button.vue';

export default {
  name: 'XWPagination',
  components: {
    xwButton,
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  computed: {
    btnList() {
      const total = this.total > 0 ? this.total : 0;
      const pageSize = this.pageSize > 0 ? this.pageSize : 1;
      const pageNum = Math.ceil(total / pageSize);

      const list = [];

      let min = this.pageIndex - 2;
      if (min < 1) {
        min = 1;
      }
      let max = this.pageIndex + 2;
      if (max > pageNum) {
        max = pageNum;
      }

      for (let i = min; i > 0 && i <= max; i++) {
        list.push({
          id: i,
          text: i,
          type: 'default',
          n: i,
        });
      }

      if (min > 2) {
        let n = min - 3;
        n < 2 ? n = 2 : 0;
        list.unshift({
          id: n,
          text: '···',
          type: 'default',
          n,
        });
      }
      if (max < pageNum - 1) {
        let n = max + 3;
        n > pageNum - 1 ? n = pageNum - 1 : 0;
        list.push({
          id: n,
          text: '···',
          type: 'default',
          n,
        });
      }

      if (min > 1) {
        list.unshift({
          id: 1,
          text: 1,
          type: 'default',
          n: 1,
        });
      }

      if (max < pageNum) {
        list.push({
          id: pageNum,
          text: pageNum,
          type: 'default',
          n: pageNum,
        });
      }

      return list;
    },
  },
  methods: {
    pageChange(n) {
      if (n !== this.pageIndex) {
        this.$emit('onPageChange', n);
      }
    },
  },
};
</script>

<style lang="stylus">
.xw-pagination {
    display inline-block;
    >.xw-button {
        margin 0 3px;
    }
    // .xw-pagination-enter, .xw-pagination-leave-to {
    //     opacity: 0;
    // }
    .xw-pagination-leave-active {
        position: absolute;
    }
}
</style>
