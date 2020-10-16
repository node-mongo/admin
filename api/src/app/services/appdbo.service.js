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
class AppDbo {
    /**
     * AppDbo   constructor
     * @param   {string} dbPath
     */
    constructor(dbPath) {
        // initialise sqlite
        this.db = new sqlite3.Database( dbPath , (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log('Connected to the sqlite database:' + dbPath);
            }
        });

        // check that out tables are initialised
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
                    country TEXT DEFAULT 'AU',
                    active INTEGER DEFAULT 0,
                    timestamp TEXT DEFAULT 0)`;
        this.db.run(users);

        /* create the servers (connections) table */
        let servers = `CREATE TABLE IF NOT EXISTS servers(
                    id INTEGER PRIMARY KEY,
                    port INTEGER NOT NULL,
                    host TEXT NOT NULL,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    atlas INTEGER DEFAULT 0,
                    resolver INTEGER DEFAULT 0,
                    active INTEGER DEFAULT 0,
                    user_id INTEGER NOT NULL,
                    timestamp TEXT DEFAULT 0)`;
        this.db.run(servers);

        /* create the logging table */
        let logs = `CREATE TABLE IF NOT EXISTS logs(
                    id INTEGER PRIMARY KEY,
                    log BLOB NOT NULL,
                    user_id INTEGER DEFAULT 0,
                    timestamp TEXT DEFAULT 0)`;
        this.db.run(logs);
    }

    /**
     * Sqlite3 .run()
     * @param   {string}    sql
     * @param   {object}    params
     * @returns {Promise|Promise}
     */
    run(sql, params = []) {
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
     * Sqlit3 .get()
     * @param   {string}    sql
     * @param   {Object}    params
     * @returns {Promise|Promise}
     */
    get(sql, params = []) {
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
     * @returns {Promise|Promise}
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
}

module.exports = AppDbo;
