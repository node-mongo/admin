<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      App.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   App.vue
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
  -->

<template>
  <transition mode="out-in">
    <router-view />
  </transition>
</template>

<script>
    import router from './router';

    export default {
        name: 'App',

        metaInfo: {
            title: 'Node Mongo Admin',
            titleTemplate: '%s | Node Mongo Admin',
            htmlAttrs: { lang: 'en' },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
        },

        methods: {
            handleCheckSetup() {
                let status = this.$store.getters.getSetupStatus;
                if (status === 1) {
                    setTimeout(() => {
                        this.handleCheckSetup();
                    }, 250);
                }
                if (status === 2) {
                    let checked = this.$store.getters.getSetup;
                    if (checked === false) {
                        console.log("status 2: load setup...");
                        router.push({ name: 'public-setup' });
                    } else {
                        if (checked.iri) {
                            this.$store.dispatch('loadUser', checked.iri);
                        } else {
                            console.log("go to login!");
                            router.push({ name: 'login'});
                        }
                    }
                }
                if (status === 3) {
                    let errorData = this.$store.getters.getAppErrorData;
                    console.log("errorData: " + errorData);
                    if (errorData && errorData.error && errorData.error === 'Unable to connect to API') {
                        this.$store.dispatch('clearUser');
                        console.log("App.vue network error...");
                        router.push({ name: 'public'});
                    } else {
                      console.log("status 3: load setup...");
                      router.push({ name: 'public-setup' });
                    }
                }
            }
        },

        mounted() {
            this.$store.dispatch('checkSetup');
            this.handleCheckSetup();
        }
    }
</script>

<style lang="scss">
  @import "../node_modules/foundation-sites/assets/foundation.scss";

  body {
    padding: 0;
    position: relative;
    color: $bodyFontColor;
    margin: 0;
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    background-color: $body-bg;

    .hidden-element {
      display: none;
    }

    .content-container {
      margin-top: 3rem;
    }

    a {
      color: $linkColor;

      &.router-link-active {
        color: $whiteFont;
        background-color: $regularGrey !important;
        border-radius: 7px;
      }

      &.router-link-logo {
        background-color: transparent !important;
      }
    }

    form {

      label {
        border: 1px solid transparent;
        border-radius: 10px;
        padding: 10px;

        &.is-invalid {
          border-color: $formErrorColor;
          color: $red;
        }
      }

      .invalid-feedback {
        color: $formErrorColor;
      }

      .button {
        border-radius: $form-button-radius;
      }
    }

    span.button.grey {
      background-color: $lighterGrey;
      color: $darkGreyColor
    }

    input.width-150 {
      width: 150px;
    }

    .pma-link {
      color: $linkColor;
      cursor: pointer;
    }

    .pma-link-danger {
      color: $dangerColor;
      cursor: pointer;
    }

    div.page {
      min-height: calc(100vh - 200px);
      padding: 20px;

      div p img {
        width: auto;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
      }

      .text-info {
        color: $textInfoColor;
      }
    }

    .background-quepal {
      background:$quepalColor url('/img/background-quepal.svg') no-repeat center center;
      background-size:cover;
    }
    .fill-quepal {background:$quepalColor !important;}
    .color-quepal {color:$quepalColor !important;}

    .background-brady {
      background:$bradyColor url('/img/background-brady.svg') no-repeat center center;
      background-size:cover;
    }
    .fill-brady {background:$bradyColor !important;}
    .color-brady {color:$bradyColor !important;}

    .background-cosmic {
      background:$cosmicColor url('/img/background-cosmic.svg') no-repeat center center;
      background-size:cover;
    }
    .fill-cosmic {background:$cosmicColor !important;}
    .color-cosmic {color:$cosmicColor !important;}

    .background-ice {
      background:$iceColor url('/img/background-ice.svg') no-repeat center center;
      background-size:cover;
    }
    .fill-ice {background:$iceColor !important;}
    .color-ice {color:$iceColor !important;}


    .u-img-responsive {
      display: block;
      max-width: 100%;
      height: auto;
      margin:0 auto;
    }

    .u-img-circle {
      border-radius: 50%
    }

    .u-unstyled-list {
      list-style:none;
      margin:0;
      padding:0;
    }

    .u-center-block {
      display: block;
      margin-left: auto;
      margin-right: auto
    }

    .u-pull-right {
      float: right !important
    }

    .u-pull-left {
      float: left !important
    }

    // Vertical Align
    // -------------------------
    .u-vertical-align {
      display:table;
      width:100vw;
      height:100vh;
    }
    .u-align-middle {
      display: table-cell;
      vertical-align: middle;
    }

    .u-align-center {
      margin:0 auto;
    }

    // Typography
    // -------------------------
    .u-text-ellipse {
      width: 100%;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .u-margin-top-flush{margin-top:0!important}
    .u-margin-top-x-small{margin-top:.25em!important}
    .u-margin-top-small{margin-top:.5em!important}
    .u-margin-top-medium{margin-top:1em!important}
    .u-margin-top-large{margin-top:1.5em!important}
    .u-margin-top-x-large{margin-top:2em!important}
    .u-margin-top-xx-large{margin-top:4em!important}
    .u-margin-top-ultra{margin-top:5em!important}

    .u-margin-right-flush{margin-right:0!important}
    .u-margin-right-x-small{margin-right:.25em!important}
    .u-margin-right-small{margin-right:.5em!important}
    .u-margin-right-medium{margin-right:1em!important}
    .u-margin-right-large{margin-right:1.5em!important}
    .u-margin-right-x-large{margin-right:2em!important}
    .u-margin-right-xx-large{margin-right:4em!important}
    .u-margin-right-ultra{margin-right:5em!important}

    .u-margin-bottom-flush{margin-bottom:0!important}
    .u-margin-bottom-x-small{margin-bottom:.25em!important}
    .u-margin-bottom-small{margin-bottom:.5em!important}
    .u-margin-bottom-medium{margin-bottom:1em!important}
    .u-margin-bottom-large{margin-bottom:1.5em!important}
    .u-margin-bottom-x-large{margin-bottom:2em!important}
    .u-margin-bottom-xx-large{margin-bottom:4em!important}
    .u-margin-bottom-ultra{margin-bottom:5em!important}

    .u-margin-left-flush{margin-left:0!important}
    .u-margin-left-x-small{margin-left:.25em!important}
    .u-margin-left-small{margin-left:.5em!important}
    .u-margin-left-medium{margin-left:1em!important}
    .u-margin-left-large{margin-left:1.5em!important}
    .u-margin-left-x-large{margin-left:2em!important}
    .u-margin-left-xx-large{margin-left:4em!important}
    .u-margin-left-ultra{margin-left:5em!important}

    .u-margin-flush{margin:0!important}
    .u-margin-x-small{margin:.25em!important}
    .u-margin-small{margin:.5em!important}
    .u-margin-medium{margin:1em!important}
    .u-margin-large{margin:1.5em!important}
    .u-margin-x-large{margin:2em!important}
    .u-margin-xx-large{margin:4em!important}
    .u-margin-ultra{margin:5em!important}

    .u-padding-top-flush{padding-top:0!important}
    .u-padding-top-x-small{padding-top:.25em!important}
    .u-padding-top-small{padding-top:.5em!important}
    .u-padding-top-medium{padding-top:1em!important}
    .u-padding-top-large{padding-top:1.5em!important}
    .u-padding-top-x-large{padding-top:2em!important}
    .u-padding-top-xx-large{padding-top:4em!important}
    .u-padding-top-ultra{padding-top:5em!important}

    .u-padding-right-flush{padding-right:0!important}
    .u-padding-right-x-small{padding-right:.25em!important}
    .u-padding-right-small{padding-right:.5em!important}
    .u-padding-right-medium{padding-right:1em!important}
    .u-padding-right-large{padding-right:1.5em!important}
    .u-padding-right-x-large{padding-right:2em!important}
    .u-padding-right-xx-large{padding-right:4em!important}
    .u-padding-right-ultra{padding-right:5em!important}

    .u-padding-bottom-flush{padding-bottom:0!important}
    .u-padding-bottom-x-small{padding-bottom:.25em!important}
    .u-padding-bottom-small{padding-bottom:.5em!important}
    .u-padding-bottom-medium{padding-bottom:1em!important}
    .u-padding-bottom-large{padding-bottom:1.5em!important}
    .u-padding-bottom-x-large{padding-bottom:2em!important}
    .u-padding-bottom-xx-large{padding-bottom:4em!important}
    .u-padding-bottom-ultra{padding-bottom:5em!important}

    .u-padding-left-flush{padding-left:0!important}
    .u-padding-left-x-small{padding-left:.25em!important}
    .u-padding-left-small{padding-left:.5em!important}
    .u-padding-left-medium{padding-left:1em!important}
    .u-padding-left-large{padding-left:1.5em!important}
    .u-padding-left-x-large{padding-left:2em!important}
    .u-padding-left-xx-large{padding-left:4em!important}
    .u-padding-left-ultra{padding-left:5em!important}

    .u-padding-flush{padding:0!important}
    .u-padding-x-small{padding:.25em!important}
    .u-padding-small{padding:.5em!important}
    .u-padding-medium{padding:1em!important}
    .u-padding-large{padding:1.5em!important}
    .u-padding-x-large{padding:2em!important}
    .u-padding-xx-large{padding:4em!important}
    .u-padding-ultra{padding:5em!important}

    .u-weight-black{font-weight:900!important}
    .u-weight-bold{font-weight:700!important}
    .u-weight-semibold{font-weight:500!important}
    .u-weight-normal{font-weight:400!important}
    .u-weight-light{font-weight:300!important}

    .u-text-smaller{font-size:.9em!important}
    .u-text-larger{font-size:1.2em!important}

    .u-text-left{text-align:left!important}
    .u-text-center{text-align:center!important}
    .u-text-right{text-align:right!important}

    .u-text-muted{color:#a8a9b0!important}
    .u-text-inherit-all{font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important}
    .u-text-inherit-base{font-size:inherit!important;line-height:inherit!important}
    .u-text-nowrap{white-space:nowrap!important}
    .u-display-block{display:block!important}
    .u-display-inline{display:inline!important}
    .u-display-inline-block{display:inline-block!important}
    .u-display-none{display:none!important}
    .u-display-full-width{width:100%!important}

    .u-flex{display:flex!important}
    .u-flex-column{flex-direction:column!important}
    .u-flex-row{flex-direction:row!important}
    .u-flex-wrap{flex-wrap:wrap!important}

    .u-align-center{align-items:center!important}
    .u-align-stretch{align-items:stretch!important}
    .u-align-right{align-items:flex-end!important}
    .u-justify-center{justify-content:center!important}
    .u-justify-right{justify-content:flex-end!important}
    .u-justify-between{justify-content:space-between!important}
    .u-align-self-center{align-self:center!important}
    .u-align-self-left{align-self:flex-start!important}
    .u-align-self-end,.u-align-self-right{align-self:flex-end!important}
    .u-justify-self-left,.u-justify-self-start{justify-self:start!important}
    .u-justify-self-end,.u-justify-self-right{justify-self:end!important}
    .u-justify-self-center{justify-self:center!important}
    .u-justify-self-stretch{justify-self:stretch!important}

    .u-border-none{border:none!important}
    .u-border-radius-none{border-radius:0!important}
    .u-border-top-lightGray{border-top:1px solid #ebebeb!important}
    .u-border-right-lightGray{border-right:1px solid #ebebeb!important}
    .u-border-bottom-lightGray{border-bottom:1px solid #ebebeb!important}
    .u-border-left-lightGray{border-left:1px solid #ebebeb!important}

    .u-margin-centered{margin-left:auto!important;margin-right:auto!important}
    .u-overflow-visible{overflow:visible}
    .u-noscroll{overflow:hidden;max-height:100vh}
    .u-visually-hidden{position:absolute;width:1px;height:1px;border:0;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0)}
    .u-avoid-page-break{page-break-inside:avoid!important;break-inside:avoid!important}

    // Desktop/Mobile specific
    @media screen and (max-width:767px){
      .u-hide-on-mobile{display:none!important}
    }

    .for-desktop-only,.for-desktop-only-inline,.for-desktop-only-inline-block,.for-desktop-only-table-cell{display:none!important;}

    @media screen and (min-width:48em) {
      .for-mobile-only{display:none!important;}
      .for-desktop-only{display:block!important;}
      .for-desktop-only-inline{display:inline!important;}
      .for-desktop-only-inline-block{display:inline-block!important;}
      .for-desktop-only-table-cell{display:table-cell!important;}
    }

    // Print CSS
    .u-show-on-print{display:none!important}

    @media only print {
      .u-hide-on-print{display:none!important}
      .u-show-on-print{display:block!important}
    }

  }

</style>