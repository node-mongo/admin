/*
 * PhpMongoAdmin (www.phpmongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      config.js 1001 6/8/20, 8:58 pm  Gilbert Rehling $
 * @package      PhpMongoAdmin\resources
 * @subpackage   config.js
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
*   Define the API route we will be using
*/
let api_url = '',
    web_url = '',
    server  = '';

/*
*   Set the API route during the build process
*/

console.log(process.env.NODE_ENV);

switch ( process.env.NODE_ENV )  {
    case 'development':
    case 'dev':
    case 'local':
        api_url = '//192.168.1.141:8080/api';
        web_url = '//192.168.1.141:8080/';
        server  = '//192.168.1.141:8080';
        break;

    case 'staging':
        api_url = '//staging.nodemongoadmin.com:8080/api';
        web_url = '//staging.nodemongoadmin.com/';
        server  = '//staging.nodemongoadmin.com:8080';
        break;

    case 'demo':
        api_url = '//demo.nodemongoadmin.com:8080/api';
        web_url = '//demo.nodepmongoadmin.com/';
        server  = '//demo.nodemongoadmin.com:8080';
        break;

    case 'production':
        api_url = '/api';
        web_url = '/';
        server  = '';
        break;
}

export const MONGO_CONFIG = {
    API_URL: api_url,
    WEB_URL: web_url,
    SERVER: server,
    SITE_NAME: 'PhpMongoAdmin',
    SITE_FULLNAME: 'PHP Mongo Admin',
    LANGUAGES: { en: 'English', zh: 'Chinese' }
};
