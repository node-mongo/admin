<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      DeleteConfirmation.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   DeleteConfirmation.vue
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

    div.delete-notification-container{
        position: fixed;
        z-index: 999999;
        left: 12rem;
        right: 0;
        top: 0;

        div.delete-notification  {
            background: $white;
            box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);
            border-left: 5px solid $errorBorder;
            border-right: 5px solid $errorBorder;
            min-height: 50px;
            line-height: 55px;
            margin: 2.25rem auto auto auto;
            min-width: 400px;
            max-width: 920px;
            color: $noticeColor;
            font-family: "Lato", sans-serif;
            font-size: 16px;

            img {
                margin-right: 20px;
                margin-left: 20px;
                height: 20px;
            }

            button {
                margin: 0 0 0 1rem;
            }
        }
    }

</style>

<template>
    <transition name="slide-in-top">
        <div class="delete-notification-container" v-show="show">
            <div class="delete-notification">
                <img src="/img/error.svg"/> {{ message }}
                <button class="button warning" v-on:click="confirmDelete()">Confirm deletion</button>
                <button class="button" v-on:click="cancelDelete()">Cancel</button>
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
          Defines the data used by the component.
        */
        data(){
            return {
                message: 'Please confirm this delete request',
                show: false,
                id: null,
                element: null
            }
        },

        methods: {
            confirmDelete() {
                EventBus.$emit('confirm-delete-' + this.element, this.id);
                this.close();
            },

            cancelDelete() {
                EventBus.$emit('cancel-delete-' + this.element, this.id);
                this.close();
            },

            close() {
                let self = this;
                setTimeout(() => {
                    self.element = null;
                    self.id      = null;
                    self.show    = false;
                }, 1000);
            }
        },

        /*
          When mounted, bind the delete confirmation event.
        */
        mounted() {
            EventBus.$on('delete-confirmation', ( data ) => {
                this.message   = data.notification;
                this.show      = true;
                this.id        = data.id;
                this.element   = data.element;
            });
        }
    }
</script>
