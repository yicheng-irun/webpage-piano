<template>
    <div
        class="xw-msg-fixed"
    >
        <transition-group
            name="msg-list"
            class="msg-list"
            tag="div"
        >
            <div
                v-for="(item, index) in msgList"
                :key="item.id"
                class="msg-list-item"
            >
                <div
                    class="msg-content-wrapper"
                >
                    <div
                        class="msg-content"
                    >
                        <p>{{ item.content }}</p>
                        <span
                            class="msg-close iconfont icon-close"
                            @click="close(index)"
                        />
                    </div>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
import '../icon-font';

let listid = 0;
export default {
  data() {
    return {
      msgList: [
        // {
        //     id: listid++,
        //     content: 'asdfasdfasdf啊啊啊啊',
        //     icon: '',
        // },
        // {
        //     id: listid++,
        //     content: 'asdfasdfasdfaaaaasadf啊啊啊啊234234234234asdfasdfasdfaaaaasadf啊啊啊啊234234234234asdfasdfasdfaaaaasadf啊啊啊啊234234234234',
        //     icon: '',
        // },
        // {
        //     id: listid++,
        //     content: 'asdfasdfasdf啊啊啊啊',
        //     icon: '',
        // },
      ],
    };
  },
  methods: {
    open({
      icon,
      content,
      duration,
    }) {
      const t = {
        id: listid++,
        content,
        icon,
      };
      this.msgList.push(t);

      let time = 5000;
      if (duration > 0) {
        time = duration;
      } else if (duration === 0) {
        return;
      }

      setTimeout(() => {
        const index = this.msgList.indexOf(t);
        if (index >= 0) {
          this.msgList.splice(index, 1);
        }
      }, time);
    },
    close(index) {
      this.msgList.splice(index, 1);
    },
  },
};
</script>

<style lang="stylus">
.xw-msg-fixed {
    position fixed;
    left 0
    width 100%
    overflow visible;
    top 0.5em;
    z-index 100;
    >.msg-list {
        position absolute;
        top 0;
        left -100%;
        width 100%;
        height 0;
        text-align center
        >.msg-list-item {
            position relative;
            display block;
            width 100%;
            transition: all 0.6s;
            transform-origin 150% top;
            >.msg-content-wrapper {
                position relative;
                left 40px;
                margin 0 20px;
                >.msg-content {
                    position relative;
                    left 100%;
                    display inline-block;
                    max-width 100%
                    margin 0.5em 0;
                    background #fff;
                    line-height 1.6em;
                    padding 0.4em 2.6em 0.4em 1em
                    border-radius 0.2em;
                    box-shadow 0 0 5px #0003;
                    font-size 15px;
                    >p {
                        word-break break-all
                        margin 0 0 0 0
                    }
                    >.msg-close {
                        position absolute;
                        top 50%;
                        right 0;
                        // background-color #0003;
                        margin -1em 0 0;
                        cursor pointer;
                        padding 0.2em 0.8em 0.2em 0.2em;
                    }
                }
            }
        }
        .msg-list-enter {
            opacity: 0;
            transform translate(0, 100px) scale(0.2)
        }
        .msg-list-leave-to {
            opacity: 0;
            transform translate(0, -100px) scale(0.2)
        }
        .msg-list-leave-active {
            position: absolute;
        }
    }
}
</style>
