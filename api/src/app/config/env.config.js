/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      env.config.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   env.config.js
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

/**
 * Defines some basic configuration values
 * Todo: !! Its worth noting that this config could be loaded via the ENV
 */

/* Update this according to the environment and URL served */
module.exports = {
    "dbPath": "/var/hosting/sites/node-mongo-admin/api/storage/sqlite/db",
    "sessDbPath": '/var/hosting/sites/node-mongo-admin/api/storage/sqlite',
    "port": 8080,
    "httpsPort": 8443,
    "appEndpoint": "http://192.168.137.141:8080",
    "apiEndpoint": "http://192.168.137.141:8080",
    "appHttpsEndpoint": "http://192.168.137.141:8443",
    "apiHttpsEndpoint": "http://192.168.137.141:8443",
    "frontEndDomain": "node.mongo.local",
    "session_secret": "myTestSessionSecret",
    "jwt_secret": "this is not stored here",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "adminTables": [
        "admin",
        "local"
    ]
};
