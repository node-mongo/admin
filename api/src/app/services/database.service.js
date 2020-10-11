/**
 *  Defines a model for handling all database (sqlite) queries
 */

/* Requires the sqlite adapter */
const db = require('./sqlite.service').db;

/* handle users queries */
exports.findUser = (id) => {
    if (id) {
        let query = `Select *
        FROM users
        WHERE id = ?`;

        db.get( query, [id], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row
                ? console.log(row)
                : console.log(`No user found with id: ${id}`);
        })
    }
};

exports.findAllUsers = () => {
    let query = `Select *
    FROM users`;

    db.all( query, [], (err, rows) => {
        if (err) {
            //return console.error(err.message);
            throw err;
        }
        return rows
            ? console.log(rows)
            : console.log(`No users found`);
    })
};

/* handle servers */