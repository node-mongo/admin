/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      ServerRepository.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   ServerRepository.js
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
 * Creates a Server model class
 *
 * Require the config and the DB service
 */
const config = require('../config/env.config');
const AppDboService = require('../services/appdbo.service');

/* create the db object */
const AppDbo = new AppDboService(config.dbPath);

/**
 * Server Repository
 */
class ServerRepository {
    setResults(results) {
        this.results = results
    }

    getResults() {
        return this.results
    }

    /**
     * ServerRepository   Constructor
     * @param   {Object}    dbo
     */
    constructor(dbo) {
        //super(dbPath);
        this.dbo = dbo;
    }

    /**
     * Create a server
     *
     * @param   {string}  host
     * @param   {number}  port
     * @param   {string}  username
     * @param   {string}  password
     * @param   {number}  atlas
     * @param   {string}  database
     * @param   {number}  resolver
     * @param   {number}  active
     * @param   {number}  user_id
     * @returns {Promise<AppDboService>}
     */
    create(host, port, username, password, atlas, database, resolver, active, user_id) {
        // set a timestamp in seconds
        const ts = Math.floor(Date.now() / 1000);
        return this.dbo.run(
            `INSERT INTO servers (host, port, username, password, atlas, database, resolver, active, user_id, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [host, port, username, password, atlas, database, resolver, active, user_id, ts]
        )
    }

    /**
     * Update a server
     *
     * @param   {Object} params
     * @returns {Promise<AppDboService>}
     */
    update(params) {
        const { id, host, username, port, password, atlas, database, resolver, active } = params;
        console.log("id: " + id);
        console.log("active: " + active);
        return this.dbo.run(
            `UPDATE servers
                SET host = ?,
                port = ?,
                username = ?,
                password = ?,
                atlas = ?,
                database = ?,
                resolver = ?,
                active = ?
                WHERE id = ?`,
            [host, port, username, password, atlas, database, resolver, active, id]
        )
    }

    /**
     * Delete a server
     *
     * @param   {number}    id
     * @returns {Promise<AppDboService>}
     */
    delete(id) {
        return this.dbo.run(
            `DELETE FROM servers WHERE id = ?`, [id]
        )
    }

    /**
     * Find a single server by id
     *
     * @param   {number}    id
     * @returns {Promise<AppDboService>}
     */
    findById(id) {
        return this.dbo.get(
            `SELECT * FROM servers WHERE id = ?`, [id]
        );
    }

    /**
     * Find all servers that belong to a user (user_id)
     *
     * @param   {number}    userId
     * @returns {Promise<AppDboService>}
     */
    findByUser(userId) {
        return this.dbo.get(
            `SELECT * FROM servers WHERE user_id = ?`, [userId]
        );
    }

    /**
     * Find all servers
     *
     * @returns {Promise<AppDboService>}
     */
    findAll() {
        return this.dbo.all(`SELECT * FROM servers`);
    }

    /**
     * Filters the input and removes items in the filterArray
     *
     * @param results
     * @returns {*[]}
     */
    filterResults(results) {
        let filterArray = [
            'password'
        ];

        let output = [];
        results.forEach((result) => {
            let obj = {}, x;
            for (x in result) {
                if (filterArray.find(filter => filter !== x)) {
                    obj[x] = result[x];
                }
            }
            output.push(obj)
        });
        return output
    }
}

/* export the instantiated model */
module.exports = new ServerRepository(AppDbo);