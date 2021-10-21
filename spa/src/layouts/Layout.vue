<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      Layout.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   Layout.vue
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
    div#app-layout {
        background-color: inherit;
    }
</style>

<template>
    <div id="app-layout" class="off-canvas-wrapper-inner" ref="appLayout">

        <success-notification></success-notification>

        <error-notification></error-notification>

        <message-notification></message-notification>

        <delete-confirmation></delete-confirmation>

        <router-view></router-view>

        <no-results-found></no-results-found>

        <setup-modal></setup-modal>

        <login-modal></login-modal>

        <language-modal></language-modal>

    </div>
</template>

<script>
    /*
    *   Import components
    */
    import SuccessNotification from "../components/global/SuccessNotification.vue";

    import ErrorNotification from "../components/global/ErrorNotification.vue";

    import MessageNotification from "../components/global/MessageNotification";

    import DeleteConfirmation from "../components/global/DeleteConfirmation";

    import NoResultsFound from "../components/admin/NoResultsFound";

    import LoginModal from "../components/global/LoginModal.vue";

    import LanguageModal from "../components/global/LanguageModal";

    import SetupModal from "../components/global/SetupModal.vue";

    import router from '../router'

    export default {
        components: {
            SuccessNotification,
            ErrorNotification,
            MessageNotification,
            DeleteConfirmation,
            NoResultsFound,
            LoginModal,
            LanguageModal,
            SetupModal,
        },

        methods: {
            getCountryFromCookie() {
                return this.$cookies.get('my-country');
            },

            getCountryFromStore() {
                return this.$store.getters.getCountryName;
            }
        },

        mounted() {
            if (this.getCountryFromCookie !== this.getCountryFromStore)  {
                this.$store.dispatch('setCountryNameFromCookie', this.$cookies.get('my-country'));
            }
        },

        created() {
            this.$store.dispatch( 'getLocation');
            this.$store.dispatch( 'setDefaultLanguage' );

            this.$http.interceptors.response.use(undefined, function (err) {
                console.error("layout.vue created: err: " + err);
                let error = err.toJSON();
                return new Promise(function() {
                    if (err.status && err.status === 401 && err.config && !err.config.__isRetryRequest) {
                      this.$store.dispatch('logoutUser');
                      router.push({ name: 'public'});
                      return
                    }
                    if (error.message === 'Network Error') {
                      console.log("found: Network Error");
                      this.$store.dispatch('setErrorData', { error: 'Unable to connect to API' });
                      router.push({ name: 'public-about'});
                      return
                    }
                    throw err;
                });
            });
        }
    }
</script>
