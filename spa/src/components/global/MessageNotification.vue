<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      MessageNotification.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   MessageNotification.vue
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
    /* @import '~@/abstracts/_variables.scss'; */

    div.success-notification-container {
        position: fixed;
        z-index: 999999;
        left: 12rem;
        right: 0;
        top: 0;

        div.success-notification {
            background: $white;
            box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);
            border-left: 5px solid $messageBorder;
            border-right: 5px solid $messageBorder;
            min-height: 50px;
            line-height: 60px;
            margin: 2.5rem auto auto auto;
            min-width: 400px;
            max-width: 920px;
            color: $noticeColor;
            font-family: "Lato", sans-serif;
            font-size: 16px;

            img {
                margin-right: 20px;
                margin-left: 20px;
            }
        }
    }

</style>

<template>
  <transition name="slide-in-top">
    <div class="success-notification-container" v-show="show">
      <div class="success-notification">
        <img src="/img/progressring.gif"/> {{ successMessage }}
      </div>
    </div>
  </transition>
</template>

<script>
    /*
    Imports the Event Bus to pass events on tag updates
    */
    import { EventBus } from '../../event-bus.js';

    export default {
        /*
        *    Defines the data used by the component.
        */
        data() {
            return {
                successMessage: '',
                show: false
            }
        },

        /*
        *   Sets up the component when mounted.
        */
        mounted() {
            /*
            *   On show success, show the notification.
            */
            EventBus.$on('show-message', ( data ) => {
                this.successMessage = data.notification;
                this.show = true;

                /*
                After 15 seconds hide the notification.
                */
                setTimeout( function() {
                    this.show = false;

                }.bind(this), 10000);

            });

            /*
            *   Close the message prematurely
            */
            EventBus.$on( 'hide-message', () => {
                this.show = false;

            });
        }
    }
</script>
