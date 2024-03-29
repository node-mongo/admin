<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      PublicHeader.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   PublicHeader.vue
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

    nav.public-navigation {
        margin-top: 50px;
        min-height: 40px;

        ul.links {
            display: block;
            float: left;
            margin: 0;

            li {
                display: inline-block;
                list-style-type: none;
                margin-left: 7px;

                a {
                    font-weight: bold;
                    color: $white;
                    font-size: 12px;
                    line-height: 40px;
                    padding: 8px;
                    background-color: $menuButtonBackground;
                    border-color: $menuButtonBorder;
                    border-radius: 7px;

                    &:hover {
                        background-color: $buttonBackgroundHeaderHover;
                        border-color: $menuButtonBorderHover;
                    }
                }
            }

            li.member-button {
                a {
                    background-color: transparent;
                    border: 0;
                    padding: 0;

                    button {
                        background-color: $navBgColor;
                        color: $memberButtonColor;
                        border-radius: 7px;
                        padding: 9px;
                        cursor: pointer;

                        &:hover {
                            color: $bodyFontColor;
                            border: 1px solid $baseColor;
                            background-color: $iceColor;
                        }
                    }
                }
            }
        }

        div.text-center {
            a {
                margin: 0 auto;
                display: inline-block;
                width: 100%;

                span.logo {
                    background-color: transparent !important;
                    border-radius: 7px;
                    color: $white;
                    cursor: pointer;
                    display: block;
                    font-size: 30px;
                    font-weight: 400;
                    height: 40px;
                    padding: 3px 0 0 0;

                    &:hover{
                        color: white;
                        background-color: $lightGrey !important;
                    }
                }
            }

            a.router-link-active {
                background-color: transparent !important;
            }
        }

        div.right {
            float: right;
            color: $white;

            .country-flag {
                height: 48px;
                width: 48px;
                cursor: pointer;

                img {
                    margin-top: -10px;
                }
            }
        }
    }

    /* Small only - (max-width: 39.9375em) */
    @media screen and (max-width: 769px) {
        nav.public-navigation {
            div.text-center {
                a {
                    span.logo {
                        font-size: 20px;
                        padding-top: 8px;
                    }
                }
            }
        }
    }

    /* Medium only - (min-width: 40em) and (max-width: 63.9375em) */
    @media (min-width: 769px) and (max-width: 992px) {
        nav.public-navigation {
            div.text-center {
                a {
                    span.logo {
                        font-size: 25px;
                        padding-top: 4px;
                    }
                }
            }
        }
    }

    /* Large only - (min-width: 64em) and (max-width: 74.9375em) */
    @media (min-width: 993px) and (max-width: 2048px) {
        nav.public-navigation {
            div.text-center {
            }
        }
    }
</style>

<template>
    <nav class="public-navigation grid-container">
        <div class="grid-x">
            <div class="large-5 medium-5 small-6 cell text-left">
                <ul class="links">
                    <!-- public header links -->
                    <li>
                        <router-link :to="{ name: 'public-about' }">
                            <span v-text="showLanguage('nav','about')"></span>
                        </router-link>
                    </li>
                    <li v-show="isMember" class="member-button">
                        <span v-show="!userLoadStatus">
                            <a href="#" v-on:click="loadLogin($event)">
                                <button v-bind:title="showLanguage('title', 'loginTitle')" v-text="showLanguage('nav', 'login')"></button>
                            </a>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="large-2 medium-2 hide-for-small-only cell text-center logo-link">
                <router-link :to="{ name: 'login' }">
                    <span class="logo"><img :alt="siteName" :title="siteName" src="/img/logo-nma.png" /></span>
                </router-link>
            </div>
            <div class="large-5 medium-5 small-6 cell" style="position: relative;">
                <div class="right">
                    <!-- country flag display -->
                    <span v-on:click="openLanguageSelector()" class="country-flag ng-scope" v-show="hasCountryName">
                        <img v-bind:src="'/img/flags/icons/' + setCountryName + '.ico'" v-bind:alt="'Your country is ' + setCountryName" v-bind:title="showLanguage('title', 'countryIsTitle') + ' ' + setCountryName">
                    </span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    /*
    *   Import the application JS config
    */
    import { MONGO_CONFIG } from "../../config.js";

    /*
    *   Imports the event bus.
    */
    import { EventBus } from '../../event-bus.js';

    export default {
        /*
        *   Data used with this component
        */
        data() {
            return {
                countryName: 'Australia',
                isLoggedIn: null,
                user: {}
            };
        },

        /*
        * Defines the computed properties on the component.
        */
        computed: {
            /*
            *   Retrieves the User Load Status from Vuex
            */
            userLoadStatus() {
                return (this.$store.getters.getUserLoadStatus === 2);
            },

            /*
            *   Return the site name from config
            */
            siteName() {
                return MONGO_CONFIG.SITE_NAME;
            },

            hasCountryName() {
                return (this.countryName != null);
            },

            setCountryName() {
                return this.countryName;
            },

            isMember() {
                let isMember = this.$cookies.get('nodemongo-member');
                return ((isMember && isMember.length >= 5) || this.userLoadStatus);
            },
        },

        /*
        *   Defined methods
        */
        methods: {
            /*
            * Calls the Translation and Language service
            */
            showLanguage( context, key ) {
                return this.$store.getters.getLanguageString( context, key );
            },

            openLanguageSelector() {
                EventBus.$emit('show-language-selector');
            },

            getCountryNameValue() {
                this.countryName = this.$store.getters.getCountryName;
            },

            loadLogin(event) {
                event.preventDefault();
                EventBus.$emit('prompt-login');
            },

            userLoggedIn() {
                this.isLoggedIn = this.$store.getters.isLoggedIn;
            },

            /*
            * Retrieves the User from Vuex
            */
            getUser() {
                this.user = this.$store.getters.getUser;
            },

            resetStatus(logout) {
              if (logout) {
                this.isLoggedIn = null
              }
            },
        },

        mounted() {
            this.getCountryNameValue();
            this.userLoggedIn();
            this.getUser();

            EventBus.$on('user-logged-out', () => {
              this.resetStatus(true)
            })
        },

        watch: {
            getCountryName() {
                this.getCountryNameValue();
            }
        }
    }
</script>
