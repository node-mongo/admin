/*
 * PhpMongoAdmin (www.phpmongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      application.js 1001 6/8/20, 8:58 pm  Gilbert Rehling $
 * @package      PhpMongoAdmin\resources
 * @subpackage   application.js
 * @link         https://github.com/php-mongo/admin PHP MongoDB Admin
 * @copyright    Copyright (c) 2020. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
 * @licence      PhpMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
 * @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
 *  php-mongo-admin - License conditions:
 *  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
 *  This web application is available as Free Software and has no implied warranty or guarantee of usability.
 *  See licence.txt for the complete licensing outline.
 *  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
 *  See COPYRIGHT.php for copyright notices and further details.
 */

/*
* ----------------------------------------------------
* VUEX modules/application.js
* ----------------------------------------------------
* The Vuex data store for application - all global requirements go here
*/

/*
*   This store requires the user api
*/
import UserAPI from '../api/user.js';

export const application = {
    /*
    *   Defines the 'state' being monitored for the module
    * JSON.parse(sessionStorage.getItem('location'))
    */
    state: {
        language: JSON.parse(localStorage.getItem('language')) || 'en',
        languages: ['en', 'zh'],
        languageOptions: [
            { value: 'en', name: 'English' },
            { value: 'zh', name: 'Chinese' },
            { value: 'jp', name: 'Japanese' }
        ],
        languageStatus: 0,
        languageArray: {},
        location: {},
        locationStatus: 0,
        currentLocation: {},
        country: JSON.parse(sessionStorage.getItem('country')) || 'AU',
        countryName: JSON.parse(sessionStorage.getItem('country_name')) || 'Australia',
        countries: {},
        states: [],
        suburb: '',
        setup: false,
        setupStatus: 0,
        controlUserStatus: 0,
        postcode: '',
        activeNav: null
    },

    actions: {
        /*
        *   This method is run from the Language modal for changing the current language
        */
        setLanguage( { commit, state }, data) {
            commit( 'setLanguageStatus', 0);

            console.log("language passed to set: " + data);

            // this block simply ensures we are trying to load an existing language
            if (state.languages.find(language => language === data)) {
                commit( 'setLanguage', data);
                localStorage.setItem( 'language', JSON.stringify(data) );
                commit( 'setLanguageArray' );
                commit( 'setLanguageStatus', 2);
                console.log("language GTG!");

            } else {
                commit( 'setLanguageStatus', 3);
                console.log("language not found in array!!");
            }
        },

        /*
        *   Commit the language
        */
        commitLanguage( { commit }, data) {
            commit( 'setLanguageStatus', 0);
            commit( 'setLanguage', data);
            commit( 'setLanguageArray' );
            commit( 'setLanguageStatus', 2);
        },

        /*
        *   Set the default language - uses predefined config
        */
        setDefaultLanguage( { commit }) {
            commit( 'setLanguageStatus', 0);
            commit( 'setLanguageArray' );
            commit( 'setLanguageStatus', 2);
        },

        checkSetup( { commit }) {
            commit( 'setSetupStatus', 1 );

            UserAPI.fetchUser(0)
                .then( ( response ) => {
                    console.log(response);
                    //commit( 'setSetup', response.data );
                    commit( 'setSetup', false );
                    commit( 'setSetupStatus', 2);
                })
                .catch( (error) => {
                    commit( 'setSetup', false );
                    commit( 'setSetupStatus', 3);
                    console.log('check setup error: ' + error);
                    if (error.response) {
                        console.log('check setup error response message: ' + error.response.data.message);
                        console.log('check setup error response status: ' + error.response.status);
                        console.log('check setup error response headers: ' + error.response.headers);
                    }
                });
        },

        createControlUser({ commit }, data) {
            commit( 'setControlUserStatus', 1 );

            UserAPI.createControlUser( data )
                .then( () => {
                    commit( 'setControlUserStatus', 2 );
                    commit( 'setSetup', true );
                })
                .catch( (error) => {
                    commit( 'setControlUserStatus', 3 );
                    console.log('error creating control user: ' + error);
                });
        },

        /*
        *   Get the user's location from IPINFO
        */
        getLocation( { commit, dispatch }) {
            commit( 'setLocationStatus', 1 );

            if (sessionStorage.getItem('location')) {
                let cache = JSON.parse(window.sessionStorage.getItem('location'));
                commit( 'setLocation', cache );
                commit( 'setLocationStatus', 2 );
                dispatch( 'applyCurrentLocation', { location: cache } );

                dispatch( 'getStates', cache.country );

            } else {
                UserAPI.getUserLocation( )
                    .then( (response ) => {
                        if (response.data.ip) {
                            let location = {};
                            location.ip         = response.data.ip;
                            location.city       = response.data.city;
                            location.country    = response.data.country;
                            location.country_name = response.data.country_name;
                            location.region     = response.data.region;
                            location.postal     = response.data.postal;

                            commit( 'setLocation', response.data );
                            commit( 'setLocationStatus', 2 );
                            dispatch('applyCurrentLocation', { location: location } );
                            sessionStorage.setItem( 'location', JSON.stringify(response.data) );

                        } else {
                            // location response was empty
                            commit( 'setLocation', {} );
                            commit( 'setLocationStatus', 3 );
                        }
                    })
                    .catch( (error) => {
                        commit( 'setLocation', {} );
                        commit( 'setLocationStatus', 3 );
                        console.log('error getting location: ' + error);
                    });
            }
        },

        /*
        *   Apply the detected location
        */
        applyCurrentLocation( { commit }, data ) {
            if (data.location) {
                let current = {};
                current.city        = data.location.city;
                current.state       = data.location.region;
                current.postcode    = data.location.postal;
                current.country     = data.location.country_name;
                current.code        = data.location.country;
                // make the commitment
                commit( 'setCurrentLocation', current );

            } else {
                console.log("current location cannot be set: " + data.location);
            }
        },

        /*
        *   Set country from cookie
        */
        setCountryNameFromCookie( { commit }, data) {
            commit( 'setCountryName', data);
        },

        setCountryByCode( { commit }, code) {
            commit( 'setCountryByCode', code);
        },

        /*
        *   Set the countries array
        */
        setCountries( { commit }, data ) {
            commit( 'setCountries', data);
        },

        /*
        *   Get states for the current country (limited data at the moment)
        */
        getStates( { commit }, data ) {
            UserAPI.getUserStates( data )
                .then( ( response ) => {
                    commit( 'setStates', response.data.states );
                })
                .catch( (error) => {
                    console.log(error);
                })
        },

        /*
        *   Set or clear the active navigation items
        *   ToDo: this allows clearing the activeNav value for the main navigation panel - until a better way surfaces
        */
        setActiveNav( { commit }, data ) {
            console.log("setting active nav: " + data);
            commit( 'setActiveNav', data );
        }

    },

    mutations: {
        setLanguageStatus( state, status ) {
            state.languageStatus = status;
        },

        setLanguage( state, language) {
            state.language = language;
        },

        setLanguageArray( state ) {
            let language = JSON.parse(localStorage.getItem('language')) || state.language;
            let data = [];
            if (language) {
                if (language === 'en-US') {
                    language = 'en';
                }
                console.log("initialising language: " + language);
                if (window.i18n[ language ]) {
                    data = window.i18n[ language ];
                }
                localStorage.setItem( 'language', JSON.stringify(language) );

            } else {
                console.log("setting default language: en");
                data = window.i18n[ 'en' ];
            }
            state.languageArray = data;
        },

        setSetupStatus( state, status ) {
            state.setupStatus = status;
        },

        setSetup( state, value ) {
            state.setup = value;
        },

        setControlUserStatus( state, status ) {
            state.controlUserStatus = status;
        },

        setLocationStatus( state, status ) {
            state.locationStatus = status;
        },

        setLocation( state, location ) {
            state.location = location; // Object.assign({}, location); // location;
        },

        setLocationFromCache( state, location ) {
            state.location = location;
        },

        setCurrentLocation( state, location ) {
            state.currentLocation = location; // Object.assign({}, location); // location;
        },

        setCurrentLocationFromCache( state, location ) {
            state.currentLocation = location;
        },

        setCountryName( state, countryName ) {
            state.countryName = countryName;
        },

        setCountries( state, countries ) {
            state.countries = countries;
        },

        setCountryByCode( state, code ) {
            console.log("code: " + code);
            let countries = state.countries;
            let country;
            countries.map((c) => {
                if (c.code === code) {
                    console.log("matched code..");
                    country = c;
                }
            });
            console.log("country: " + country);
            state.country = country.code;
            state.countryName = country.name;
        },

        setStates( state, states ) {
            state.states = states;
        },

        setPostcode( state, postcode ) {
            state.postcode = postcode;
        },

        setSuburb( state, suburb ) {
            state.suburb = suburb;
        },

        /*
        *   Set the active navigation panel - this stores the panel name sent in events
        */
        setActiveNav(state, panel) {
            state.activeNav = panel;
        }
    },

    getters: {
        getLanguageStatus( state ) {
            return state.languageStatus;
        },

        getLanguage( state ) {
            return state.language;
        },

        getLanguageArray( state ) {
            return state.languageArray;
        },

        getLanguageString: (state) => (context, key) => {
            if (state.languageArray[context]) {
                if (key.indexOf('.') !== -1) {
                    let keys = key.split(".");
                    if (state.languageArray[context][keys[0]]) {
                        if (state.languageArray[context][keys[0]][keys[1]]) {
                            return state.languageArray[context][keys[0]][keys[1]];
                        } else {
                            console.log("no secondary key: " + keys[1]);
                        }

                    } else {
                        console.log("no primary key: " + keys[0]);
                    }

                } else {
                    if (state.languageArray[context][key]) {
                        return state.languageArray[context][key];
                    } else {
                        console.log("no key: " + key);
                    }
                }

            } else {
                console.log("no context: " + context);
            }
        },

        getLanguageOptions( state ) {
            return state.languageOptions;
        },

        getLocationStatus( state ) {
            return state.locationStatus;
        },

        getSetupStatus( state ) {
            return state.setupStatus;
        },

        getSetup( state ) {
            return state.setup;
        },

        getControlUserStatus( state ) {
            return state.controlUserStatus;
        },

        getLocation( state) {
            return state.location;
        },

        getCurrentLocation( state ) {
            return state.currentLocation;
        },

        getCountry( state ) {
            return state.country;
        },

        getCountryName( state ) {
            return state.countryName;
        },

        getCountries( state ) {
            return state.countries;
        },

        getStates( state ) {
            return state.states;
        },

        getCurrentStateCode: ( state ) => (name) => {
            let code = state.states.find(ste => ste.name === name);
            if (code) {
                return code.code;
            }
            return name;
        },

        getState( state ) {
            return state.currentLocation.state;
        },

        /*
        *   Get the active navigation panel
        */
        getActiveNav(state) {
            return state.activeNav;
        }
    }
};
