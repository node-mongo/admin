/*
 * PhpMongoAdmin (www.phpmongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      user.js 1001 6/8/20, 8:58 pm  Gilbert Rehling $
 * @package      PhpMongoAdmin\resources
 * @subpackage   user.js
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
*   Imports the PHP Mongo Admin URL from the config.
*/
import { MONGO_CONFIG } from '../config.js';

import Vue from 'vue';

export default {
    /*
    *  POST  /api/auth/login - login a user
    */
    loginUser: ( user, password ) => {
        return Vue.prototype.$http.post( MONGO_CONFIG.API_URL + '/auth/login',
            {
                user: user,
                password: password,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   GET /api/auth/logout  - logs out the user
    */
    logoutUser: () => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/auth/logout/')
    },

    /*
    *  GET   /api/users - get the current authenticated user
    */
    getUsers: () => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/users' );
    },

    /*
    *  PUT  /api/users - create or update a user
    */
    putUpdateUser: ( name, email, password ) => {
        return Vue.prototype.$http.put( MONGO_CONFIG.API_URL + '/users',
            {
                name: name,
                email: email,
                password: password
            });
    },

    /*
    *  POST  /api/users - register a new user
    */
    postUser: ( name, email, password ) => {
        return Vue.prototype.$http.post( MONGO_CONFIG.API_URL + '/users',
            {
                name: name,
                email: email,
                password: password,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   GET  /api/users/{uid} - get the current authenticated user
    */
    getUser: ( uid ) => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/users/' + uid );
    },

    /*
    *   GET  {iri} - get the current authenticated user
    */
    getUserByIri: ( iri ) => {
        return Vue.prototype.$http.get( MONGO_CONFIG.SERVER + iri );
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
