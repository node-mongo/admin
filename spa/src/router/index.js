import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//import store from "../store"

let me = 1;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    redirect: { name: "admin" },
    component: Vue.component( "Layout", require( "../layouts/Layout.vue" ).default ),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "admin",
        name: "admin",
        component: Vue.component( "Admin", require( "../views/Admin.vue").default )
      },
      {
        path: "about",
        name: "about",
        component: Vue.component( "About", require( "../views/About.vue").default )
      }
    ]
  },
  {
    path: "/public",
    name: "public",
    redirect: { name: "login" },
    component: () => import(
        /* webpackChunkName: "public" */  '../layouts/Public.vue'
    ),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import(
            /* webpackChunkName: "login" */ '../views/Login.vue'
        )
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition;

    return { x: 0, y: 0 }
  },
  routes
});

//console.log("BASE_URL: " + process.env.BASE_URL);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //if (store.getters.isLoggedIn) {
    if (me === 2) {
      next();
      return;
    }
    next("/public/login");
  } else {
    next();
  }
});

export default router
