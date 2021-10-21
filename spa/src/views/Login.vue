<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      Login.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   Login.vue
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
  .about-us {
    p.paragraph {
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <div class="page about-us">
    <div class="grid-container">
      <div class="row grid-x grid-padding-x">
        <div class="column small-3">&nbsp;</div>
        <div class="column large-6 medium-6 small-12">
          <h3 v-text="showLanguage('login', 'heading')"></h3>
          <p v-text="showLanguage('login', 'text1')"></p>
          <p v-text="showLanguage('login', 'text2')"></p>
          <p v-text="showLanguage('login', 'text3')"></p>
          <p v-text="showLanguage('login', 'text4')"></p>
        </div>
        <div class="column small-3">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {EventBus} from "../event-bus";

  import router from '../router';

  export default {
    methods: {
      /*
       * Calls the Translation and Language service
       */
      showLanguage( context, key ) {
        return this.$store.getters.getLanguageString( context, key );
      },

      setAction() {
          setTimeout(() => {
              if (this.$store.getters.getSetup === false) {
                  let errors = this.$store.getters.getAppErrorData;
                  if (errors && errors.status === 404) {
                      router.push({ name: 'public-about' });
                  } else {
                      console.log("login.vue go to setup..");
                      router.push({ name: 'public-setup' });
                  }
              } else {
                  EventBus.$emit('prompt-login');
              }
          },100);
      }
    },

      /*
     * Sets up the component on the mounted lifecycle hook.
     */
      mounted() {
          /*
           * When mounted et the required actions.
           */
          this.setAction();
      },
  }
</script>
