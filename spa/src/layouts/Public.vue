<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      Public.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   Public.vue
  - @link         https://github.com/node-mongo/admin  Node MongoDB Admin
  - @copyright    Copyright (c) 2021. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
  - @licence      NodeMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
  - @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
  -  node-mongo-admin - License conditions:
  -  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
  -  This web application is available as Free Software and has no implied warranty or guarantee of usability.
  -  See licence.txt for the complete licensing outline.
  -  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
  -  See COPYRIGHT.js for copyright notices and further details.
  --> -->

<style lang="scss">
  div.public-view {
    background-color: $navBgColor;

    header.header-content {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      background: url("/img/header-background-dark-blue.png") repeat-x 0 -22px;
      padding-top: 16px;
      z-index: 2;

      .grid-container {
        max-width: 99%;
      }
    }
    .main-content {
      padding: 30px 0 10px 0;
      margin-top: 0;
    }
  }
</style>

<template>
  <div id="app-layout" class="public_view off-canvas-wrapper-inner" ref="appLayout">
    <h2 style="color: red; text-align: center" v-if="getAppError && getAppError.status === 404">{{ cannotConnect }}</h2>
    <header class="header-content">
      <navigation></navigation>
    </header>

    <success-notification></success-notification>

    <error-notification></error-notification>

    <message-notification></message-notification>

    <router-view></router-view>

    <site-footer></site-footer>

    <login-modal></login-modal>

    <language-modal></language-modal>
  </div>
</template>

<script>
/*
*   Import components
*/
import Navigation from "../components/global/PublicHeader.vue";

import SuccessNotification from "../components/global/SuccessNotification.vue";

import ErrorNotification from "../components/global/ErrorNotification.vue";

import MessageNotification from "../components/global/MessageNotification";

import SiteFooter from "../components/global/SiteFooter.vue";

import LoginModal from "../components/global/LoginModal.vue";

import LanguageModal from "../components/global/LanguageModal";

export default {
  components: {
    Navigation,
    SuccessNotification,
    ErrorNotification,
    MessageNotification,
    SiteFooter,
    LoginModal,
    LanguageModal,
  },

  data() {
      return {
          errorData: null,
          cannotConnect: "Unable to connect to API. Please ensure the NodeJs instance is running..."
      }
  },

    computed: {
        getAppError() {
            return this.$store.getters.getAppErrorData
        },
    },

  methods: {
    getCountryFromCookie() {
      return this.$cookies.get("my-country");
    },

    getCountryFromStore() {
      return this.$store.getters.getCountryName;
    },
  },

  mounted() {
    if (this.getCountryFromCookie !== this.getCountryFromStore)  {
      this.$store.dispatch("setCountryNameFromCookie", this.$cookies.get("my-country"));
    }
  },

  created() {
    this.$store.dispatch( "setDefaultLanguage" );

    this.$http.interceptors.response.use(undefined, function (err) {
        console.error("layout.vue created: err: " + err);
        //let error = err.toJSON();
        return new Promise(function () {
            if (err.status && err.status === 401 && err.config && !err.config.__isRetryRequest) {
                this.$store.dispatch("logoutUser");
                return
            }
            throw err;
        });
    });
  },
}
</script>
