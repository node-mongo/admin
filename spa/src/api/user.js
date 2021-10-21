/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      user.js 1001 15/9/21, 12:17 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Spa
 * @subpackage   user.js
 * @link         https://github.com/node-mongo/admin  Node MongoDB Admin
 * @copyright    Copyright (c) 2021. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
 * @licence      NodeMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
 * @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
 *  node-mongo-admin - License conditions:
 *  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
 *  This web application is available as Free Software and has no implied warranty or guarantee of usability.
 *  See licence.txt for the complete licensing outline.
 *  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
 *  See COPYRIGHT.js for copyright notices and further details.
 */

/*
*   Imports the PHP Mongo Admin URL from the config.
*/
import { MONGO_CONFIG } from '../config.js';

import Vue from 'vue';

export default {
    /*
    *   GET  /api/users/{uid} - get the current authenticated user
    */
    getUser: ( uid ) => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/users/' + uid );
    },

    /*
    *  GET   /api/users/all - get the current authenticated user
    */
    getUsers: () => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/users/all' );
    },

    /*
    *   GET  {iri} - get the current authenticated user
    */
    getUserByIri: ( iri ) => {
        return Vue.prototype.$http.get( MONGO_CONFIG.SERVER + iri, {
            withCredentials: true
        });
    },

    /*
    *  PUT  /api/users - create or update a user
    */
    putUpdateUser: ( dataObj ) => {
        return Vue.prototype.$http.put( MONGO_CONFIG.API_URL + '/users',
            {
                ...dataObj
            });
    },

    /*
    *  POST  /api/users - create a new user
    */
    postUser: ( data ) => {
        let dataObj = {
            active: data.active,
            database: data.database,
            isAdmin: data.isAdmin,
            password: data.password,
            password2: data.password2,
            roles: data.roles,
            type: data.type,
            user: data.user,
        }
        // only added these if they exist so they dont get validated as empty vars
        if (data.email) {
            dataObj.email = data.email
        }
        if (data.name) {
            dataObj.name = data.name
        }
        return Vue.prototype.$http.post( MONGO_CONFIG.API_URL + '/users',
            {
                ...dataObj
            });
    },

    /*
    *   DELETE /api/users - delete a single user
    */
    deleteUser: ( data ) => {
        return window.axios.delete( MONGO_CONFIG.API_URL + '/users/' + data.id + '/' + data.type + '/' + data.user + '?uid=' + data.id )
    },

    /*
    *  POST  /api/auth/login - login a user
    */
    loginUser: ( data ) => {
        return Vue.prototype.$http.post( MONGO_CONFIG.API_URL + '/auth/login',
            {
                ...data,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN'],
            },
            {
                withCredentials: true,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                }
            }
        );
    },

    /*
    *   GET /api/auth/logout  - logs out the user
    */
    logoutUser: () => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/auth/logout/')
    },

    /*
    *   GET  /api/users/fetch/{uid} - get the current authenticated user
    */
    fetchUser: ( uid ) => {
        return window.axios.get( MONGO_CONFIG.API_URL + '/users/fetch/' + uid )
    },


    /*
    *   GET /api/users/email/{email} - Check | verify an email address
    */
    checkEmail: ( email ) => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/users/email/' + email );
    },

    /*
    *   GET /api/users/location - Get the users location from IpInfo
    */
    getUserLocation: () => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/users/location' );
    }
}
