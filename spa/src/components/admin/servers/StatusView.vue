<!--
  - PhpMongoAdmin (www.phpmongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      ServersView.vue 1001 6/8/20, 8:58 pm  Gilbert Rehling $
  - @package      PhpMongoAdmin\resources
  - @subpackage   ServersView.vue
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
    /* */
</style>

<template>
    <div id="pma-status-view" class="pma-servers-panel align-left" v-show="show">
        <div class="servers-inner">
            <h3 v-text="showLanguage('server', 'titleStatus')"></h3>
            <div v-if="errorMessage">{{ errorMessage }}</div>
            <div v-html="getString(status)"></div>
        </div>
    </div>
</template>

<script>
    /*
     * Import the Event bus
     */
    import { EventBus } from '../../../event-bus.js';

    export default {
        name: "StatusView",

        /*
         *   Data required for this component
         */
        data() {
            return {
                index: 0,
                limit: 55,
                show: false,
                status: {},
                form: {
                    host: null,
                    port: 27017,
                    username: null,
                    password: null,
                    password2: null,
                    active: null
                },
                errorMessage: null,
                error: null
            }
        },

        /*
         *   Define methods for the server component
         */
        methods: {
            /*
            *   Calls the Translation and Language service
            */
            showLanguage( context, key ) {
                return this.$store.getters.getLanguageString( context, key );
            },

            getString(object) {
                return this.$convObj().jsonH(JSON.stringify(object));
            },

            getStatus() {
                this.$store.dispatch('getServerStatus', 'admin');
                this.handleStatus();
            },

            handleStatus() {
                let status = this.$store.getters.getLoadServerStatus;
                if (status === 1 && this.index < this.limit) {
                    this.index+=1;
                    setTimeout(() => {
                        this.handleStatus();
                    }, 200);
                }
                if (status === 2) {
                    this.status = this.$store.getters.getServerStatus;
                }
                if (status === 3) {
                    this.errorMessage = this.showLanguage('server', 'statusError');
                }
            },

            /*
             *   Show component
             */
            showComponent() {
                this.show = true;
            },

            /*
             *   Hide component
             */
            hideComponent() {
                this.show = false;
            }
        },

        /*
        *    get on ur bikes and ride !!
        */
        mounted() {
            /*
            *    Hide this component
            */
            EventBus.$on('hide-panels', () => {
                this.hideComponent();
            });

            /*
            *    Show this component
            */
            EventBus.$on('show-status', () => {
                this.showComponent();
                this.getStatus();
            });
        }
    }
</script>
