<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      Setup.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   Setup.vue
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

<style scoped>

</style>

<template>
  <div class="content-container text-center" v-if="show">
    <div class="row justify-content-center grid-container">
      <div class="column">
        <div class="card">
          <p>&nbsp;</p>
          <h2 v-text="showLanguage('setup', 'title')"></h2>
          <p>
            <strong v-text="showLanguage('setup', 'p1')"></strong>
          </p>
          <p v-text="showLanguage('setup', 'p2')"></p>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center grid-container">
      <div class="grid-x small-up-2 medium-up-3 large-up-4 ">
        <div class="card">
          <div class="card-header">
            <p>&nbsp;</p>
            <h3 v-text="showLanguage('setup', 'formTitle')"></h3>
          </div>
          <div class="card-body">
            <div class="grid-x small-up-1 medium-up-2 large-up-3">
              <div class="cell"></div>
              <div class="cell">
                <form
                    id="setup"
                    @submit="checkForm($event)"
                >
                  <div class="form-group row">
                    <label for="country" class="col-md-4 col-form-label text-md-right" v-text="showLanguage('setup', 'country')"></label>

                    <div class="col-md-6">
                      <select id="country"
                              @change="setCountryByCode"
                             :class="'form-control ' + hasError('country')"
                             v-model="credentials.country"
                             required
                             autofocus>
                        <option value="" v-text="showLanguage('setup', 'countryOption')"></option>
                        <option v-for="option in getCountries" :value="option.code" :key="option.code">{{ option.name }}</option>
                      </select>

                      <span class="invalid-feedback" role="alert" ref="name-info" v-if="errors.name">
                        <strong>{{ errors.name }}</strong>
                      </span>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="name" class="col-md-4 col-form-label text-md-right" v-text="showLanguage('setup', 'name')"></label>

                    <div class="col-md-6">
                      <input id="name"
                             type="text"
                             :class="'form-control ' + hasError('name')"
                             v-model="credentials.name"
                             :placeholder="showLanguage('setup', 'namePlaceholder')"
                             required
                             autocomplete="name"
                             minlength="2"
                             maxlength="100"
                             autofocus>

                      <span class="invalid-feedback" role="alert" ref="name-info" v-if="errors.name">
                        <strong>{{ errors.name }}</strong>
                      </span>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right" v-text="showLanguage('setup', 'username')"></label>

                    <div class="col-md-6">
                      <input id="user"
                             type="text"
                             :class="'form-control ' + hasError('user')"
                             v-model="credentials.user"
                             :placeholder="showLanguage('setup', 'usernamePlaceholder')"
                             required
                             minlength="5"
                             maxlength="50"
                             autocomplete="user">

                      <span class="invalid-feedback" role="alert" ref="user-info" v-if="errors.user">
                        <strong>{{ errors.user }}</strong>
                      </span>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right" v-text="showLanguage('setup', 'password')"></label>

                    <div class="col-md-6">
                      <input id="password"
                             type="password"
                             :class="'form-control ' + hasError('password')"
                             v-model="credentials.password"
                             :placeholder="showLanguage('setup', 'passwordPlaceholder')"
                             required
                             minlength="8"
                             maxlength="100"
                             autocomplete="current-password">

                      <span class="invalid-feedback" role="alert" v-if="errors.password">
                        <strong>{{ errors.password }}</strong>
                      </span>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="email" class="col-md-4 col-form-label text-md-right" v-text="showLanguage('setup', 'email')"></label>

                    <div class="col-md-6">
                      <input id="email"
                             type="email"
                             :class="'form-control ' + hasError('email')"
                             v-model="credentials.email"
                             :placeholder="showLanguage('setup', 'emailPlaceholder')"
                             required
                             minlength="5"
                             maxlength="256"
                             autocomplete="email">

                      <span class="invalid-feedback" role="alert" v-if="errors.email">
                        <strong>{{ errors.email }}</strong>
                      </span>
                    </div>
                  </div>

                  <div class="form-group row mb-0">
                    <div class="col-md-8 offset-md-4">
                      <button type="submit" class="button" v-text="showLanguage('setup', 'save')"></button>
                    </div>
                    <div><p class="is-invalid" v-if="errorMessage">{{ errorMessage }}</p></div>
                  </div>
                </form>
              </div>
              <div class="cell"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    /*
     * Import the EventBus and the router
     */
    import {EventBus} from "../event-bus";
    import router from '../router';

    export default {
        name: "Setup",

        /*
          Defines the data used by the component.
        */
        data() {
            return {
                show: false,
                verifiedName: null,
                verifiedEmail: null,
                verifiedPassword: null,
                credentials: {
                    country: '',
                    name: null,
                    user: null,
                    email: null,
                    password: null,
                    hasErrors: false
                },
                errorMessage: null,
                formStatus: 0,
                errors: {
                    country: '',
                    name: '',
                    user: '',
                    email: '',
                    password: '',
                }
            }
        },

        /*
         *   This modules computed methods
         */
        computed: {
            submitButtonClass() {
                return this.formStatus === 0 ? 'secondary' : 'success'
            },

            submitButtonStatus() {
                return this.formStatus === 0 ? 'true' : 'false'
            },

            enableSubmit() {
                return !(this.formStatus === 1)
            },

            getCountries() {
                return this.$store.getters.getCountries;
            }
        },

        /*
         *   This components active methods
         */
        methods: {
            /*
             * Calls the Translation and Language service
             */
            showLanguage(context, key) {
                return this.$store.getters.getLanguageString( context, key )
            },

            hasError(name) {
                if (this.errors[name] !== '') {
                    return 'is-invalid'
                }
            },

            setCountryByCode() {
                if (this.credentials.country) {
                    this.$store.dispatch( 'setCountryByCode', this.credentials.country)
                }
            },

            checkForm: function (event) {
                event.preventDefault();
                this.credentials.hasErrors = false;

                if (!this.credentials.name) {
                    this.errors.name = "Name required";
                    this.credentials.hasErrors = true
                }

                if (!this.credentials.user) {
                    this.errors.user = "Username required";
                    this.credentials.hasErrors = true
                }

                if (!this.credentials.password) {
                    this.errors.password = "Password required";
                    this.credentials.hasErrors = true
                }

                if (!this.credentials.email) {
                    this.errors.email = 'Email required';
                    this.credentials.hasErrors = true

                } else if (!this.validEmail(this.credentials.email)) {
                    this.errors.email = 'Valid email required';
                    this.credentials.hasErrors = true
                }

                if (this.credentials.hasErrors === false) {
                    this.createUser()
                }
            },

            validEmail: function (email) {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email)
            },

            createUser() {
                console.log("sending: " + this.credentials);
                //let data = { data: this.credentials };
                this.$store.dispatch( 'createControlUser', this.credentials );
                this.handleCreateUser()
            },

            handleCreateUser() {
                let status = this.$store.getters.getControlUserStatus;
                if (status === 1) {
                    setTimeout(() => {
                        this.handleCreateUser()
                    }, 250)
                }
                if (status === 2) {
                    EventBus.$emit('show-success', { notification: 'Control user created: please login using the credential you entered',timer: 7500});
                    router.push({ name: 'login' })
                }
                if (status === 3) {
                  this.errorMessage = ' Control user creation failed: please check your information and try again'
                }
            },

          getSetup(){
            this.show = this.$store.getters.getSetup
          }
        },

      mounted() {
          this.getSetup()
      }
    }
</script>
