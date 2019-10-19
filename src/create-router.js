import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        component: () => import(/* webpackChunkName: "index" */ "./pages/index/app.vue")
      },
      {
        path: "/piano",
        component: () => import(/* webpackChunkName: "demo" */ "./pages/piano/index/app.vue")
      }
    ]
  });
}
