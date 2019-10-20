import Vue from 'vue';
import runtime from '../../lib/runtime';
import msgComp from './xw-message-comp.vue';

let msgVue = null;

function init() {
  const msgWrapper = document.createElement('div');
  document.body.appendChild(msgWrapper);

  msgVue = new Vue({
    methods: {
      open(...arg) {
        this.$children[0].open(...arg);
      },
    },
    render: h => h(msgComp),
  });
  msgVue.$mount(msgWrapper);
}

if (runtime.isClient) {
  init();
}


function open({
  icon,
  content,
  duration = 3000,
}) {
  if (msgVue) {
    msgVue.open({
      icon,
      content,
      duration,
    });
  }
}

function success(content, duration) {
  open({
    // icon: 'success',
    type: 'success',
    content,
    duration,
  });
}

function error(content, duration) {
  open({
    // icon: 'error',
    type: 'error',
    content,
    duration,
  });
}

function info(content, duration) {
  open({
    // icon: 'info',
    type: 'info',
    content,
    duration,
  });
}

function warn(content, duration) {
  open({
    // icon: 'warn',
    type: 'warn',
    content,
    duration,
  });
}

export default {
  success,
  error,
  info,
  warn,
};
