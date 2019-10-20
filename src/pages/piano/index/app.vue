<template>
  <piano />
</template>

<script>
import piano from './comp/piano.vue';
import store from './store';

export default {
  name: 'App',

  components: {
    piano,
  },

  store,

  data() {
    return {};
  },

  computed: {
    state() {
      return this.$store.state;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="stylus"></style>
