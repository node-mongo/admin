
/**
 *   First we will load all of this project's JavaScript dependencies which
 *   includes Vue and other libraries.
 */
window._ = require("lodash");

/**
 *   We'll load jQuery and the Foundation-Sites library.
 */
try {
  window.Popper = require("popper.js").default;
  window.$ = window.jQuery = require("jquery");
  require("foundation-sites");
} catch(e) {
  console.log(e);
}

/**
 *   We'll load the axios HTTP library which allows us to easily issue requests
 *   to our Laravel back-end. This library automatically handles sending the
 *   CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 *   Load Vue
 *
 *   @type {{PluginObject: PluginObject; VNode: VNode; PropType: PropType; DirectiveOptions: DirectiveOptions;
 *   Component: Component; VNodeData: VNodeData; FunctionalComponentOptions: FunctionalComponentOptions;
 *   VNodeChildrenArrayContents: VNodeChildrenArrayContents; VueConstructor: VueConstructor; DirectiveFunction: DirectiveFunction;
 *   PluginFunction: PluginFunction; PropOptions: PropOptions; VNodeChildren: VNodeChildren; RenderContext: RenderContext;
 *   VNodeDirective: VNodeDirective; ComputedOptions: ComputedOptions; WatchOptions: WatchOptions; WatchHandler: WatchHandler;
 *   CreateElement: CreateElement; ComponentOptions: ComponentOptions; VNodeComponentOptions: VNodeComponentOptions;
 *   WatchOptionsWithHandler: WatchOptionsWithHandler; AsyncComponent: AsyncComponent}}
 */
import Vue from 'vue'

/**
 * Load & use the Vue cookie monster
 */
import VueCookies from "vue-cookie";
Vue.use(VueCookies);

/**
 *   Add axios as a prototype to $http and add the token if its set
 */
Vue.prototype.$http = window.axios;
const passport = JSON.parse( localStorage.getItem("token") ) || "";
if (passport) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = passport;
}

/**
 *   Load the Vue Router
 */
import router from './router'

/**
 *   Load the Vuex store (module data storage)
 */
import store from './store'

/**
 *   Load the translate service and define in the Vue creator
 */
import makeTrans from "./services/translate.js";
let userLang = navigator.language || navigator.userLanguage,
    locale = "en",
    currentLang = JSON.parse(localStorage.getItem("language"));
if (currentLang) {
  locale = currentLang;
}
else if (userLang) {
  locale = userLang;
}
const trans = makeTrans(locale);

import makeCountries from "./services/countries.js";
makeCountries();

/**
 *   Load the JQF methods to mock jQuery methods
 */
import makeJqf from "./services/jqf.js";
const jqf = makeJqf( );

/**
 *   Load the Object conversion methods
 *   These may be used in multiple places - easier to maintain and update
 */
import makeConvObj from "./services/convObj.js";
const convObj = makeConvObj();

Vue.config.productionTip = false;

import App from './App.vue'

new Vue({
  router,
  store,
  trans,
  jqf,
  convObj,
  render: h => h(App)
}).$mount('#app');
