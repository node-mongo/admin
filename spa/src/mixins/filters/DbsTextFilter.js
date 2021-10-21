/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      DbsTextFilter.js 1001 15/9/21, 12:17 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Spa
 * @subpackage   DbsTextFilter.js
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

export const DbsTextFilter = {
  methods: {
    processDbsTextFilter( db, text ) {
      /*
      *  Only process if the text is greater than 1
      */
      if ( text.length > 1 ) {
        /*
        *  If the db name matches the entered text return true otherwise return false.
        */
        if( db.name.toLowerCase().match( '[^,]*' + text.toLowerCase() + '[,$]*' )) {
            // db is matched
          return true;

        } else {
            // db is not matched
          return false;
        }

      } else {
          // error!! search text not founds
        return true;
      }
    }
  }
};
