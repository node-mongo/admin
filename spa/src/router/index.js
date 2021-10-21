/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      index.js 1001 15/9/21, 12:17 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Spa
 * @subpackage   index.js
 * @link         https://github.com/node-mongo/admin  Node MongoDB Admin
 * @copyright    Copyright (c) 2021. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
 * @licence      NodeMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
 * @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
 *  node-mongo-admin - License conditions:
 *  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
 *  This web application is available as Free Software and has no implied warranty or guarantee of usability.
 *  See licence.txt for the complete licensing outline.
 *  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
 *  See COPYRIGHT.js for copyright notices and further details.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"

Vue.use(VueRouter);

let router = new VueRouter({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: { name: "admin" },
      component: Vue.component( 'Layout', require( '../layouts/Layout.vue' ).default ),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'admin',
          name: 'admin',
          component: Vue.component( 'Admin', require( '../views/Admin.vue').default )
        },
        {
          path: 'about',
          name: 'about',
          component: Vue.component( 'About', require( '../views/About.vue').default )
        }
      ]
    },
    {
      path: '/public',
      name: 'public',
      redirect: { name: 'login' },
      component: Vue.component('Public', require('../layouts/Public.vue').default ),
      children: [
        {
          path: 'login',
          name: 'login',
          component: Vue.component( 'Login', require( '../views/Login.vue').default )
        },
        {
          path: 'about',
          name: 'public-about',
          component: Vue.component( 'About', require( '../views/About.vue').default )
        },
        {
          path: 'setup',
          name: 'public-setup',
          component: Vue.component( 'About', require( '../views/Setup.vue').default )
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("requiresAuth isLoggedIn: " + store.getters.isLoggedIn);
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    console.log("routes auth check going to login...");
    next('/public/login')
  } else {
    next()
  }
})

export default router
