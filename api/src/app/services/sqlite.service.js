

/**
 *  This defines the SqLite adapter
 */
const sqlite3 = require('sqlite3').verbose();

// some db options
// Todo: !! a couple of the options (reconnectTries & reconnectInterval) are throwing deprecated warning - need to investigate further !!
const options = {
    dbPath: './storage/sqlite/sqlite.db', // path to sqlite database
};

// initialise sqlite
let db = new sqlite3.Database( options.dbPath , (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the sqlite database:' + options.dbPath);
    }
});

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
    active INTEGER DEFAULT 0)`;
db.run(users);

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
    user_id INTEGER NOT NULL)`;
db.run(servers);

/* create the logging table */
let logs = `CREATE TABLE IF NOT EXISTS logs(
    id INTEGER PRIMARY KEY,
    log BLOB NOT NULL,
    user_id INTEGER DEFAULT 0)`;
db.run(logs);

exports.db = db;
