<template>
    <button
        type="button"
        class="xw-button"
        :class="[type, selected ? 'select' : '']"
        @click="type !== 'disable' && $emit('click')"
    >
        <i
            v-if="icon"
            class="iconfont"
            :class="`icon-${icon}`"
        />
        <slot>&nbsp;</slot>
    </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String, // primary default danger disable
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus">
@import './xw-color.styl';

.xw-button {
    position relative
    display: inline-block;
    background-color #fff;
    border 1px solid defaultBorder;
    border-radius 0.3em;
    color defaultText;
    padding 0em 0.8em;
    font-weight: 400;
    text-align: center;
    line-height 2
    font-size: inherit;
    cursor pointer;
    touch-action: manipulation;
    user-select none;
    transition all 0.3s;
    &:hover, &.select {
        color primary;
        border-color primary;
        box-shadow 0 0 0.3em #0003;
        z-index 5;
    }
    &:focus {
        outline: -webkit-focus-ring-color dashed 1px;
        color primary;
        border-color primary;
        box-shadow 0 0 0.3em #0003;
        z-index 5;
    }
    &:active {
        color primaryActive;
        border-color primaryActive;
    }
    &.primary {
        color #fff;
        background-color primary;
        &:hover, &.select {
            background-color primaryHover;
        }
        &:focus {
            background-color primaryHover;
        }
        &:active {
            background-color primaryActive;
        }
    }
    &.danger {
        color #fff;
        background-color danger;
        &:hover, &.select {
            background-color dangerHover;
            border-color dangerHover;
        }
        &:focus {
            background-color dangerHover;
            border-color dangerHover;
        }
        &:active {
            background-color dangerActive;
            border-color dangerActive;
        }
    }
    &.disable {
        background-color #f3f4f5
        color disableText;
        &:hover, &.select, &:focus {
            // outline none;
            color disableText;
            border-color defaultBorder;
            box-shadow none;
        }
        cursor not-allowed
    }
    &.link {
        background-color transparent
        border-color transparent
        color primary
    }
}
</style>
