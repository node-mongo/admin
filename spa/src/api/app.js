/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      app.js 1001 15/9/21, 12:17 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Spa
 * @subpackage   app.js
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
    *  GET   /api/setup - get the application setup ch3eck result
    */
    checkSetup: () => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/setup' );
    },

    createControlUser: (data) => {
        return Vue.prototype.$http.post( MONGO_CONFIG.API_URL + '/setup',
            {
                country: data.country,
                name: data.name,
                user: data.user,
                email: data.email,
                password: data.password
            });
    },

    /*
    *   GET /api/setup/states/{country} - Get the users states based on country code
    */
    getStates: (country) => {
        return Vue.prototype.$http.get( MONGO_CONFIG.API_URL + '/setup/states/' + country);
    }
}