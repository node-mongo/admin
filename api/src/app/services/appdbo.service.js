/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      appdbo.service.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   appdbo.service.js
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
 * Create an Abstract DBO class
 */

/* Require the SqLite adapter .verbose() */
const sqlite3 = require('sqlite3').verbose();

/* Require the Promise handler */
const Promise = require('bluebird');

/**
 * AppDbo Class
 */
class AppDboService {
    /**
     * AppDbo   constructor
     * @param   {string} dbPath
     */
    constructor(dbPath) {
        // initialise sqlite
        this.dbPath = dbPath;
        this.db = new sqlite3.Database( dbPath , (err) => {
            if (err) {
                console.error("constructor err: " + err.message);
            }
            else {
                console.log('Connected to the sqlite database:' + dbPath);
            }
        });

        // check that our tables are initialised
        /* create the users table */
        let users = `CREATE TABLE IF NOT EXISTS users(
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    user TEXT NOT NULL UNIQUE,
                    email TEXT NOT NULL UNIQUE,
                    salt TEXT NOT NULL,
                    hash TEXT NOT NULL,
                    control_user INTEGER DEFAULT 0,
                    admin_user INTEGER DEFAULT 0,
                    has_both INTEGER DEFAULT 0,
                    encrypted_password TEXT DEFAULT '',
                    country TEXT DEFAULT 'AU',
                    message TEXT DEFAULT '',
                    active INTEGER DEFAULT 0,
                    timestamp INTEGER DEFAULT 0)`;
        this.run(users);

        /* create the servers (connections) table */
        let servers = `CREATE TABLE IF NOT EXISTS servers(
                    id INTEGER PRIMARY KEY,
                    port INTEGER NOT NULL,
                    host TEXT NOT NULL,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    atlas INTEGER DEFAULT 0,
                    database TEXT DEFAULT NULL,
                    resolver INTEGER DEFAULT 0,
                    active INTEGER DEFAULT 0,
                    user_id INTEGER NOT NULL,
                    timestamp INTEGER DEFAULT 0)`;
        this.run(servers);

        /* create the logging table */
        let logs = `CREATE TABLE IF NOT EXISTS logs(
                    id INTEGER PRIMARY KEY,
                    log BLOB NOT NULL,
                    user_id INTEGER DEFAULT 0,
                    timestamp INTEGER DEFAULT 0)`;
        this.run(logs);
    }

    /**
     * Sqlite3 .run()
     * @param   {string}    sql
     * @param   {object}    params
     * @returns {Promise}
     */
    run(sql, params = []) {
        console.log("run sql: " + sql);
        return new Promise((resolve, reject) => {
           this.db.run(sql, params, (err) => {
               if (err) {
                   console.log('Error running sql ' + sql);
                   console.error(err);
                   reject(err);
               }
               else {
                   resolve({ id: this.lastID });
               }
           });
        });
    }

    /**
     * Sqlite3 .get()
     * @param   {string}    sql
     * @param   {Object}    params
     * @returns {Promise}
     */
    get(sql, params = []) {
        console.log("get sql: " + sql);
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql ' + sql);
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Sqlite3 .all()
     * @param   {string}    sql
     * @param   {object}    params
     * @returns {Promise}
     */
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql ' + sql);
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }

    getPath() {
        return this.dbPath;
    }
}

/* export thr abstract DB service */
module.exports = AppDboService;
