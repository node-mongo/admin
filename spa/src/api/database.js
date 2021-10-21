/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      database.js 1001 15/9/21, 12:17 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Spa
 * @subpackage   database.js
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
*  Imports the PHP Mongo Admin URL from the config.
*/
import { MONGO_CONFIG } from "../config";

import Vue from 'vue';

export default {
    /*
    *   Get all databases
    *   GET /api/databases
    */
    getDatabases: () => {
        return  Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/databases' );
    },

    /*
    *   Get a single database
    *   GET /api/databases/{name}
    */
    getDatabase: ( name ) => {
        return  Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/databases/' + name );
    },

    /*
    *   Create a new Database
    *   POST  /api/databases/create
    */
    createDatabase: ( name) => {
        return  Vue.prototype.$http.post( MONGO_CONFIG.API_URL + '/databases/create',
            {
                database: name,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Delete one or more Database(s)
    *   POST  /api/databases/delete
    */
    deleteDatabase: ( names) => {
        return  Vue.prototype.$http.post( MONGO_CONFIG.API_URL + '/databases/delete',
            {
                names: names,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Run a command against a database
    *   POST  /api/databases/{database}/command
    */
    databaseCommand: ( data ) => {
        return  Vue.prototype.$http.post( MONGO_CONFIG.API_URL + '/databases/' + data.database + '/command',
            {
                database: data.database,
                params: data.params,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    }
}
