import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: '/home/taizhang'},
  {
    path: "/home",
    name: "home",
    component: HomeView,
    children:[
      {
        name: "taizhang",
        path: "/home/taizhang",
        component: () =>
        import(/* webpackChunkName: "about" */ "../views/TaizhangView.vue"),
      },
      {
        name: "taizhang2",
        path: "/home/taizhang2",
        component: () =>
        import(/* webpackChunkName: "about" */ "../views/Taizhang2View.vue"),
      },
      {
        name: "taizhang3",
        path: "/home/taizhang3",
        component: () =>
        import(/* webpackChunkName: "about" */ "../views/Taizhang3View.vue"),
      },
      {
        name: "Fenbu",
        path: "/home/Fenbu",
        component: () =>
        import(/* webpackChunkName: "about" */ "../views/FenbuView.vue"),
      },
    ]
  },

];

const router = new VueRouter({
  routes,
});

export default router;
