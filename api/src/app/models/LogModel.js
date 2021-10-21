/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      LogRepository.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   LogRepository.js
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
 * Create a Log model class
 *
 * Require the config and the base DB class
 */
const config = require('../config/env.config');
const AppDboService = require('../services/appdbo.service');

/* create the db object */
const AppDbo = new AppDboService(config.dbPath);

/**
 * LogModel Class
 */
class LogModel {
    /**
     *
     * @param dbo AppDboService
     */
    constructor(dbo) {
        this.dbo = dbo;
    }

    /**
     *
     * @param log
     * @param user_id
     * @returns {Promise<AppDboService>}
     */
    create(log, user_id) {
        // set a timestamp in seconds
        const ts = Math.floor(Date.now() / 1000);
        return this.dbo.run(
            `INSERT INTO logs (log, user_id, timestamp)
                VALUES (?, ?, ?)`,
            [log, user_id, ts]
        )
    }

    /**
     *
     * @returns {Promise<AppDboService>}
     */
    findAll() {
        return this.dbo.all(`SELECT * FROM logs`);
    };
}

/* export the instantiated model */
module.exports = new LogModel(AppDbo);