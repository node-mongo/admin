

/**
 *  This defines the SqLite adapter
 */
const sqlite3 = require('sqlite3').verbose();

// some db options
// Todo: !! a couple of the options (reconnectTries & reconnectInterval) are throwing deprecated warning - need to investigate further !!
const options = {
    dbPath: '../../../storage/sqlite/sqlite.db', // path to sqlite database

};

// initialise sqlite
let db = new sqlite3.Database( options.dbPath , (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the sqlite database.');
});

exports.db = db;
