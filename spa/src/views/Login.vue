<!--
  - PhpMongoAdmin (www.phpmongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      Login.vue 1001 6/8/20, 8:58 pm  Gilbert Rehling $
  - @package      PhpMongoAdmin\resources
  - @subpackage   Login.vue
  - @link         https://github.com/php-mongo/admin PHP MongoDB Admin
  - @copyright    Copyright (c) 2020. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
  - @licence      PhpMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
  - @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
  -  php-mongo-admin - License conditions:
  -  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
  -  This web application is available as Free Software and has no implied warranty or guarantee of usability.
  -  See licence.txt for the complete licensing outline.
  -  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
  -  See COPYRIGHT.php for copyright notices and further details.
  -->

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
          let self = this;
          setTimeout(function() {
              if (self.$store.getters.getSetup === false) {
                  router.push('setup');
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
