<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      LoginModal.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   LoginModal.vue
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
    /* @import '~@/abstracts/_variables.scss';*/

    div#login-modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba( 0, 0, 0, .8 );
        z-index: 9;

        div.login-box {
            width: 100%;
            max-width: 640px;
            min-width: 320px;
            background-color: transparent;
            -webkit-box-shadow: 0 1px 3px rgba(50,50,50,0.08);
            box-shadow: 0 1px 3px rgba(50,50,50,0.08);
            font-size: 16px;
            position: absolute;
            margin-top: 15px;
            top: 50%;
            left: 50%;
            height: 100%;
            transform: translate(-50%, -50%);
            z-index: 10;
            overflow: auto;
            scroll-behavior: smooth;

            div.login-label {
                background-color: $formGreyColor;
                border-radius: 10px 10px 0 0;
                color: $whiteFont;
                font-family: "Lato", sans-serif;
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                width: 100%;

                padding-top: 8px;
                height: 35px;

                h3 {
                    font-size: 1.0rem;

                    img {
                        float: right;
                        margin: 1px 15px 0 0;
                        border-radius: 3px;
                        cursor: pointer;
                        border: $red dotted 1px;
                    }
                }
            }

            .login-content {
                width: 100%;
                position: relative;
                text-align: center;

                p.into-message {
                    margin-top: 10px;
                }

                p.has-info {
                    padding-top: 10px;
                }

                a.learn-more-button {
                    border: 2px solid $buttonBorderedColor;
                    border-radius: 3px;
                    text-transform: uppercase;
                    font-family: "Lato", sans-serif;
                    color: $linkButtonColor;
                    width: 360px;
                    font-size: 16px;
                    text-align: center;
                    padding: 10px;
                    margin: 20px 0 0 0;
                    display: block;

                    &:hover {
                        color: $buttonColor;
                        background-color: $buttonBackgroundHeaderHover;
                    }
                }

                .logins {
                    text-align: center;
                    background-color: $formBackgroundColor;

                    a.social-link {
                        display: block;
                        width: 230px;
                        margin: 10px auto;
                    }

                    p.learn-more-description {
                        color: $midGreyColor;
                        text-align: center;
                    }

                    p:last-child {
                        margin-bottom: 0;
                    }
                }

                form#loginForm {
                    padding-top: 0;

                    .hidden-content {
                        display: none;
                    }

                    .login-error {
                        border: 1px solid $fieldBorderError;
                        font-weight: 600;
                        font-style: italic;
                        max-width: 500px;
                        margin: 0 auto 10px auto;
                    }
                }

                .has-error {
                    color: $dangerColor;
                }

                .form-group {
                    background-color: $formBackgroundColor;
                    padding: 15px 10px;

                    .fieldBlock {
                        display: inline-block;
                        margin-right: 25px;

                        label {
                            min-width: 65px;
                            text-align: right;
                        }

                        label, input, select {
                            display: inline-block;
                        }

                        .form-control {
                            width: auto;
                        }

                        input, select {
                            margin: 6px 0;
                        }

                        select {
                            min-width: 185px;
                        }

                        .is-invalid {
                            color: $fieldColorError;
                        }

                        .button-box {
                            margin: 12px 0;
                        }

                        .has-success {
                            border: 1px solid $fieldBorderSuccess;
                        }

                        .has-error {
                            border: 1px solid $fieldBorderError;
                        }

                        .db-select-label {
                            display: block;
                            font-weight: 600;
                        }
                    }

                    span.help-block {
                        width: auto;
                        display: block;
                        position: relative;
                        padding: 5px;
                        margin: 0 auto;
                        max-width: 375px;
                    }

                    span.has-success {
                        font-style: italic;
                        color: $spanHasSuccess;
                    }

                    button.button {
                        border-radius: 7px;
                    }
                }

                .rego-button {
                    border: 2px solid $buttonBorderedColor;
                    border-radius: 3px;
                    text-transform: uppercase;
                    font-family: "Lato", sans-serif;
                    color: $cosmicColor;
                    width: 400px;
                    font-size: 16px;
                    text-align: center;
                    padding: 10px;
                    cursor: pointer;

                    &:hover {
                        color: $buttonColor;
                        background-color: $buttonBackgroundHeaderHover;
                    }
                }

                .login-footer {
                    background-color: $formBackgroundColor;
                    padding-bottom: 20px;
                    text-align: center;

                    p.learn-more-description {
                        color: $midGreyColor;
                        text-align: center;
                    }

                    a.learn-more-button {
                        display: block;
                        margin: 0 auto;
                    }
                }

              .actions {
                a {
                  display: inline-block;
                  margin: 0 0 7px 0;
                }
              }
            }
        }
    }

    /* Small only */
    @media screen and (max-width: 768px) {
        div#login-modal {
            div.login-box {
                width: 95%;

                a.learn-more-button {
                    width: 300px;
                }
            }
        }
    }

    /* Medium only */
    @media (min-width: 769px) and (max-width: 992px) {
        div#login-modal {
            div.login-box {
                max-width: 840px;
                min-width: 640px;

                a.learn-more-button {
                    width: 300px;
                }
            }
        }
    }

    /* Large only */
    @media (min-width: 993px) and (max-width: 2048px) {
        div#login-modal {
            div.login-box {
                max-width: 1240px;
                min-width: 840px;

                a.learn-more-button {
                    width: 300px;
                }
            }
        }
    }
</style>

<template>
  <div id="login-modal" v-show="show" v-on:click="closeDialogOutside($event)">
    <div class="login-box" v-on:click.stop="">

        <div class="login-label">
          <h3>
            <span v-text="showLanguage('login', 'title')"></span>
            <img v-on:click="closeThisDialog()" title="Close" alt="Close" src="/img/close-icon-white.svg">
          </h3>
        </div>

        <div class="login-content">

            <form id="loginForm" name="loginForm" ref="loginForm" action="#" method="post" class="form-group" v-on:submit="loginUser($event)">

                <p>&nbsp;</p>

                <p class="login-error has-error hidden-content" ref="loginError"></p>

                <p>
                    <span class="fieldBlock">
                        <label for="user" class="col-md-4 col-form-label text-md-right" v-text="showLanguage('login', 'username')"></label>
                        <input
                            id="user"
                            type="text"
                            class="form-control"
                            ref="user"
                            name="user"
                            v-model="credentials.user" required autocomplete="user"
                            v-on:blur="checkUser()"
                        >
                    </span>
                    <span class="help-block" id="userInfo" ref="userInfo"></span>
                </p>

                <p>
                    <span class="fieldBlock">
                        <label for="password" class="col-md-4 col-form-label text-md-right" v-text="showLanguage('login', 'password')"></label>
                        <input id="password"
                               type="password"
                               class="form-control"
                               ref="password"
                               name="password"
                               required
                               autocomplete="current-password"
                               v-model="credentials.password"
                               v-on:focus="verifyUser"
                               v-on:keyup="countPassword"
                               v-on:change="countPassword"
                        >
                    </span>
                    <span class="help-block" id="passwordInfo" ref="passwordInfo"></span>
                </p>

              <p v-if="hasServers">
                <span class="intro-message"><span class="has-info" id="introMessage" v-text="showLanguage('login', 'selectServer')"></span></span>
                <span class="fieldBlock">
                        <label for="host" class="col-md-4 col-form-label text-md-right" v-text="showLanguage('login', 'host')"></label>
                        <select id="host" class="form-control" ref="host" name="host" v-model="credentials.host" required autofocus v-on:blur="checkHost()">
                            <option value="localhost" v-text="showLanguage('login', 'localhost')"></option>
                        </select>
                    </span>
                <span class="help-block" id="hostInfo" ref="hostInfo"></span>
              </p>

              <p v-if="hasDatabases">
                    <span class="fieldBlock">
                        <label for="db" class="db-select-label col-md-4 col-form-label text-md-right" v-text="showLanguage('login', 'selectDatabase')"></label>
                        <input id="db" type="text" class="form-control" ref="db" name="db" v-model="credentials.db" autocomplete="db" v-on:blur="checkDb()">
                    </span>
                <span class="help-block" id="dbInfo" ref="dbInfo"></span>
              </p>

              <p>
                  <span class="col-md-6 offset-md-4">
                      <span class="form-check">
                          <input
                              class="form-check-input"
                              type="checkbox"
                              name="remember"
                              id="remember"
                              v-model="credentials.remember"
                          >
                          <label class="form-check-label" for="remember" v-text="showLanguage('login', 'remember')"></label>
                      </span>
                  </span>
              </p>

              <div class="col-md-8 offset-md-4">
                  <button type="submit" :class="'button ' + submitButtonClass" :disabled="enableSubmit" v-bind:aria-disabled="submitButtonStatus" v-text="showLanguage('login', 'button')"></button>
                  <button class="button warning" v-on:click="closeThisDialog()" v-text="showLanguage('global', 'close')"></button>
                  <br />
                  <a class="btn btn-link" v-on:click="resetPassword()" href="#" v-text="showLanguage('login', 'resetPassword')"></a>
                  <br>
                  <a class="btn btn-link" v-on:click="forgetUsername()" href="#" v-text="showLanguage('login', 'forgetUsername')"></a>
                  <p v-text="showLanguage('login', 'cookieCleared')" v-show="cookieCleared"></p>
              </div>

            </form>
        </div>
    </div>
  </div>
</template>

<script>
    /*
    Imports the event bus.
    */
    import { EventBus } from '../../event-bus.js';

    import router from '../../router';

    export default {
        /*
        Defines the data used by the component.
        */
        data() {
            return {
              cookieCleared: false,
              credentials: {
                active: "1" // ensures that only active users can login
              },
              errorData: null,
              formStatus: 0,
              hasServers: null,
              hasDatabases: null,
              index: 0,
              limit: 55,
              show: false,
              verifiedHost: null,
              verifiedUser: null,
              verifiedEmail: null,
              verifiedPassword: null,
              verifiedDb: null,
            }
        },

        /*
         *   This modules computed actions
         */
        computed: {
            submitButtonClass() {
                return this.formStatus === 0 ? 'secondary' : 'success';
            },

            submitButtonStatus() {
                return this.formStatus === 0 ? 'true' : 'false';
            },

            enableSubmit() {
                return !(this.formStatus === 1);
            }
        },

        /*
         * This modules methods
         */
        methods: {
            /*
            * Calls the Translation and Language service
            */
            showLanguage(context, key) {
              return this.$jqf().nl2br(this.$store.getters.getLanguageString( context, key ))
            },

            closeThisDialog() {
                this.show = false;
            },

            closeDialogOutside( event ) {
              if (window.jquery(event.target).is('#login-modal')) {
                this.closeThisDialog()
              }
            },

            loginUser( event ) {
                event.preventDefault();
                this.$store.dispatch( 'loginUser', this.credentials );
                setTimeout(() => {
                  this.completeLogin()
                }, 500)
            },

            completeLogin() {
                let status = this.$store.getters.getUserLoginStatus;
                if (status === 1 && this.index < this.limit) {
                  setTimeout(() => {
                    this.completeLogin()
                  }, 200)
                }
                if (status === 2) {
                    this.show = false;
                    EventBus.$emit('show-success', { notification: this.showLanguage('auth', 'login-success')});
                    setTimeout(() => {
                        this.$cookies.set('nodemongo-member', this.$store.getters.getUserName, 360000);
                        router.push( { name: 'admin' } );
                        this.show = false
                    }, 2000);
                }
                if (status === 3) {
                    this.showLoginError();
                }
            },

            showLoginError() {
                this.errorData = this.$store.getters.getUserErrorData;
                let text = this.errorData.data && this.errorData.data.error ?
                    this.showLanguage('auth', this.errorData.data.error) :
                    this.showLanguage('auth', 'unknown');
                this.$jqf(this.$refs.loginError).remove('hidden-content').html(text);
                setTimeout(() => {
                  this.$jqf(this.$refs.loginError).add('hidden-content')
                }, 10000)
            },

            resetPassword() {
              window.location = '/setup'
            },

            forgotUsername() {
              console.log("lets get the username!!")
            },

            /*
            * Check host placeholder
            */
            checkHost() {
                this.verifiedHost = true;
            },

            /*
             * Check host placeholder
             */
            checkDb() {
                this.verifiedDb = true;
            },

            checkUser() {
                let e = this.credentials.user || false;
                if (e.length >= 5) {
                  this.verifiedUser = e;
                  this.$jqf(this.$refs.userInfo).replace(['has-error', 'has-success']).text('Username verified');
                  this.$jqf(this.$refs.user).replace(['has-error', 'has-success']);

                } else {
                  this.$jqf(this.$refs.userInfo).replace(['has-success', 'has-error']).text('Invalid username - minimum 5 characters!');
                  this.$jqf(this.$refs.user).replace(['has-success', 'has-error']).focus();
                }
            },

            /*
             *   Verify the email address
             */
            checkEmail() {
                let e = this.credentials.email || false;
                if (e.length >= 5) {
                    if (e.indexOf('@') === -1 || e.indexOf('.') === -1) {
                        this.$jqf(this.$refs.emailInfo).replace(['has-success', 'has-error']).text('Your email address appears invalid!');
                        this.$jqf(this.$refs.email).replace(['has-success', 'has-error']).focus();

                    } else {
                        this.verifiedEmail = e;
                        this.$jqf(this.$refs.emailInfo).replace(['has-error', 'has-success']).text('Email address verified');
                        this.$jqf(this.$refs.email).replace(['has-error', 'has-success']);
                    }
                }
            },

            verifyEmail() {
                let e = this.credentials.email || false;
                if (e && e !== false) {
                    if (e.indexOf('@') === -1 || e.indexOf('.') === -1 || e !== this.verifiedEmail) {
                        this.$jqf(this.$refs.emailInfo).replace(['has-success', 'has-error']).text('Your email address appears invalid!');
                        this.$jqf(this.$refs.email).replace(['has-success', 'has-error']).focus();
                    }

                } else {
                    this.$jqf(this.$refs.emailInfo).replace(['has-success', 'has-error']).text('Please enter your email address first!');
                    this.$jqf(this.$refs.email).replace(['has-success', 'has-error']).focus();

                }
            },

            verifyUser() {
                let e = this.credentials.user || false;
                if (e && e !== false) {
                    if (e.length < 5 || e !== this.verifiedUser) {
                        this.$jqf(this.$refs.userInfo).replace(['has-success', 'has-error']).text('Your username appears invalid!');
                        this.$jqf(this.$refs.user).replace(['has-success', 'has-error']).focus();
                    }

                } else {
                    this.$jqf(this.$refs.userInfo).replace(['has-success', 'has-error']).text('Please enter your username first!');
                    this.$jqf(this.$refs.user).replace(['has-success', 'has-error']).focus();

                }
            },

            countPassword() {
                let p = this.credentials.password || undefined;
                if (p !== undefined) {
                    if (p.length < 8) {
                        this.$jqf(this.$refs.passwordInfo).replace(['has-success', 'has-error']).text('Password length = ' + p.length +'.  Min 8 characters required');
                        this.$jqf(this.$refs.password).replace(['has-success', 'has-error']);
                    }
                    if (p.length >= 8) {
                        this.$jqf(this.$refs.passwordInfo).replace(['has-error', 'has-success']).text('Password length validated');
                        this.$jqf(this.$refs.password).replace(['has-error', 'has-success']);
                        this.verifiedPassword = true;
                        this.formStatus = 1;
                    }
                }
            },

            handleRememberMe() {
              this.cookieCleared = false;
              let user = this.$cookies.get('nodemongo-member');
              if (user) {
                // only do this is user exists
                this.credentials.user = user;
                this.checkUser()
              }
            },

            forgetUsername() {
              this.$cookies.set('nodemongo-member', '', '-60');
              this.cookieCleared = true
            },
        },

        /*
        Sets up the component on the mounted lifecycle hook.
        */
        mounted() {
          /*
          When prompted for login, show the component.
          */
          EventBus.$on('prompt-login', () => {
            this.show = true;
          });

          this.handleRememberMe()
        }
    }
</script>
