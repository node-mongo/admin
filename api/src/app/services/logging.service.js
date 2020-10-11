/**
 *  Defines a model for logging actions
 */

/* Requires the sqlite adapter */
const db = require('./sqlite.service').db;

/* Define a method to save logging data */
exports.saveLog = (logData) => {
    let sql = `INSERT INTO logs
        (log, user_id)
        VALUES
        (?, ?)`;
    db.run(sql, [ logData, 0 ], (err) => {
        if (err) {
            // Todo: remove console logs for prod !!
            return console.error(err.message);
        }
    });
};