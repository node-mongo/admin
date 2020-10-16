/*
 * PhpMongoAdmin (www.phpmongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      users.js 1001 6/8/20, 8:58 pm  Gilbert Rehling $
 * @package      PhpMongoAdmin\resources
 * @subpackage   users.js
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
|-------------------------------------------------------------------------------
| VUEX modules/users.js
|-------------------------------------------------------------------------------
| The Vuex data store for the users
*/

/*
*   This store requires the user api
*/
import UserAPI from '../api/user.js';

export const users = {
    /*
     *   Defines the state being monitored for the module.
     */
    state: {
        user: {},
        userLoadStatus: 0,
        userUpdateStatus: 0,
        userRegisterStatus: 0,
        userLoginStatus: 0,
        userLogoutStatus: 0,
        userAuthStatus: JSON.parse( localStorage.getItem('iri') ) || 0,
        emailCheck: {},
        emailCheckStatus: 0,
        iri: JSON.parse( localStorage.getItem('iri') ) || ''
    },

    /*
     *Defines the actions used to retrieve the data.
     */
    actions: {
        /*
         *  Register a user
         */
        registerUser( { commit, dispatch }, data ) {
            commit( 'setUserRegisterStatus', 1 );

            UserAPI.postUser( data.data.name, data.data.email, data.data.password )
                .then( (response) => {
                    //const token = 'Bearer ' + response.data.token;
                    //window.axios.defaults.headers.common['Authorization'] = token;
                    localStorage.setItem('iri', JSON.stringify(response.data.user.iri));
                    commit( 'setUserRegisterStatus', 2 );
                    commit( 'setUserIri', response.data.iri );
                    dispatch( 'loadUser', response.data.iri );
                })
                .catch( (error) => {
                    commit( 'setUserRegisterStatus', 3 );
                    localStorage.removeItem('token');
                    console.log(error);
                });
        },

        /*
         *   Login a user via the API
         */
        loginUser( { commit, dispatch }, data ) {
            commit( 'setUserLoginStatus', 1);

            UserAPI.loginUser( data.data.user, data.data.password )
                .then( ( response ) => {
                    if (response.data.success === true && response.data.user.iri) {
                      commit( 'setUserLoginStatus', 2);
                      commit( 'setUserAuthStatus', 1);
                      commit( 'setUserIri', response.data.user.iri );
                    //    commit( 'setUserToken', { token } );
                      dispatch( 'loadUser', response.data.user.iri );

                    } else {
                      commit( 'setUserLoginStatus', 3);
                      console.log("login error - secondary");
                      console.log(response.data.success);
                    }
                })
                .catch( (error) => {
                    commit( 'setUserLoginStatus', 3);
                    console.log("login error - primary");
                    console.log(error);
                    localStorage.removeItem('token');
                }
                )
                .finally(() => {
                    console.log("are we there yet?!");
                });
        },

        /*
         * Load the current user
         */
        loadUser( { commit }, iri ) {
            commit( 'setUserLoadStatus', 1 );

            UserAPI.getUserByIri(iri)
                .then( (response) => {
                    const user = response.data.user;
                    if (user.id) {
                        localStorage.setItem('iri', JSON.stringify(user.iri));
                        commit( 'setUser', user );
                        commit( 'setUserAuthStatus', 1 );
                        commit( 'setUserIri', user.iri );
                        commit( 'setUserLoadStatus', 2 );

                    } else {
                        // user response was empty
                        commit( 'setUser', {} );
                        commit( 'setUserLoadStatus', 3 );
                    }
                })
                .catch( (error) => {
                    commit( 'setUser', {} );
                    commit( 'setUserLoadStatus', 3 );
                    console.log(error);
                });
        },

        /*
         * Adds or Edits a user
         */
        editUser( { commit, dispatch }, data ) {
            commit( 'setUserUpdateStatus', 1 );

            UserAPI.putUpdateUser( data.name, data.email, data.password )
                .then( () => {
                    commit( 'setUserUpdateStatus', 2 );
                    dispatch( 'loadUser' );
                })
                .catch( (error) => {
                    commit( 'setUserUpdateStatus', 3 );
                    console.log(error);
                });
        },

        /*
         *   Logs out a user and clears the status and user pieces of state.
         */
        logoutUser( { commit }, data ) {
            commit( 'setUserLogoutStatus', 1 );

            UserAPI.logoutUser( data.uid )
                .then( (response) => {
                    if (response.data.success === true && response.data.message === 'success') {
                        localStorage.removeItem('iri');
                        commit( 'setUserLogoutStatus', 2 );
                        commit( 'setUserLoadStatus', 0 );
                        commit( 'setUserLoginStatus', 0 );
                        commit( 'setUserAuthStatus', 0 );
                        commit( 'setUserIri', '' );
                        commit( 'setUser', {} );
                    }
                })
                .catch( (error) => {
                    commit( 'setUserLogoutStatus', 3 );
                    console.log(error);
                });
        },

        /*
         *   Check an email address for uniqueness and validity
         */
        checkEmail( { commit }, data ) {
            commit( 'setEmailCheckStatus', 1);

            UserAPI.checkEmail( data.email )
                .then( (response) => {
                    commit('setEmailCheck', response.data );
                    commit('setEmailCheckStatus', 2);
                })
                .catch( (error) => {
                    commit('setEmailCheckStatus', 3);
                    commit('setEmailCheck', {});
                    console.log(error);
                });
        },
    },

    /*
     *  Defines the mutations used
     */
    mutations: {
        /*
         * Sets the user load status
         */
        setUserLoadStatus( state, status ) {
            state.userLoadStatus = status;
        },

        /*
         * Sets the user
         */
        setUser( state, user ) {
            state.user = user;
        },

        /*
         * Sets the user token
         */
        setUserIri( state, iri ) {
            state.iri = iri;
        },

        /*
         * Sets the user update status
         */
        setUserUpdateStatus( state, status ) {
            state.userUpdateStatus = status;
        },

        /*
         * Sets the user POST status
         */
        setUserRegisterStatus( state, status ) {
            state.userRegisterStatus = status;
        },

        /*
         * Set the user logging in process status
         */
        setUserLoginStatus( state, status ) {
            state.userLoginStatus = status;
        },

        /*
         * Set the user log out in process status
         */
        setUserLogoutStatus( state, status ) {
            state.userLogoutStatus = status;
        },

        /*
         *   Set and track the logged in user bu UID
         */
        setUserAuthStatus( state, uid ) {
            state.userAuthStatus = uid;
        },

        /*
         *   Set the email check status
         */
        setEmailCheckStatus( state, status ) {
            state.emailCheckStatus = status;
        },

        /*
         *   Set the email check result
         */
        setEmailCheck( state, result ) {
            state.emailCheck = result;
        }

    },

    /*
     * Defines the getters used by the module.
     */
    getters: {
        /*
         *   Returns the user load status.
         */
        getUserLoadStatus( state ) {
            return state.userLoadStatus;
        },

        /*
         *   Returns the user.
         */
        getUser( state ) {
            return state.user;
        },

        /*
         * Gets the user auth status - returns the users ID
         */
        getUserAuthStatus( state ) {
            return state.userAuthStatus;
        },

        /*
         *   Gets the user update status
         */
        getUserUpdateStatus( state ) {
            return state.userUpdateStatus;
        },

        /*
         *   Gets the user Register status
         */
        getUserRegisterStatus( state ) {
            return state.userRegisterStatus;
        },

        /*
         * Get the email check status
         */
        getEmailCheckStatus( state ) {
            return state.emailCheckStatus;
        },

        /*
         *   Get the email check result
         */
        getEmailCheck( state ) {
            return state.emailCheck;
        },

        /*
         *   Returns the login process status
         */
        getUserLoginStatus( state ) {
            return state.userLoginStatus;
        },

        /*
         *   Returns the logout process status
         */
        getUserLogoutStatus( state ) {
            return state.userLogoutStatus;
        },

        /*
         *   Checks if the token is set - toke indicate that the user has an API token
         */
        isLoggedIn( state ) {
            return (state.userAuthStatus !== 0 && state.iri !== '');
        },

        /*
         *   Return the logged in users name
         */
        getUsersName( state ) {
            return state.user.name;
        }
    }
};
