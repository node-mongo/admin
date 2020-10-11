import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import store from "../store"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    redirect: { name: "admin" },
    component: () => import(
        '../layouts/Layout.vue'
    ),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "admin",
        name: "admin",
        component: ()=> import(
            /* webpackChunkName: "admin" */ '../views/Admin.vue'
        )
      },
      {
        path: "about",
        name: "about",
        component: () => import(
            /* webpackChunkName: "about" */ '../views/About.vue'
        )
      }
    ]
  },
  {
    path: "/public",
    name: "public",
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
      },
      {
        path: "setup",
        name: "setup",
        component: () => import(
            /* webpackChunkName: "setup" */ '../views/Setup.vue'
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
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/public/login");
  } else {
    next();
  }
});

export default router
