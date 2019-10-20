import Vue from 'vue';
import App from './App.vue';
import createRouter from './create-router';
import './comp/layout.styl';

Vue.config.productionTip = false;

const router = createRouter();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
