/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      index.js 1001 15/9/21, 12:17 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Spa
 * @subpackage   index.js
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
* --------------------------------------------
* VUEX store.js
* --------------------------------------------
* Builds the data store from all of the modules fro the application
*/

/*
*   Adds the promise polyfill for IE 11
*/
require( "es6-promise" ).polyfill();

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/*
*   Imports all of the modules used in the application  to build the data store
*/
import { application } from "../modules/application";

import { display } from "../modules/display";

import { filters } from "../modules/filters";

import { database } from "../modules/database";

import { collection } from "../modules/collection"

import { server } from "../modules/server";

import { users } from "../modules/users";

export default new Vuex.Store({
  modules: {
    application,
    display,
    filters,
    database,
    collection,
    server,
    users
  }
})
