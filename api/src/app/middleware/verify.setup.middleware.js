/**
 * Define a middleware check that ensures the application has been setup and initialized
 */

/* Use the database service for queries */
const Database = require('../services/database.service');

exports.checkSetup = (req, res, next) => {
    let users = Database.findAllUsers();
    if (users && users.length >= 1) {
        let hasControlUser = false;
        users.forEach((value) => {
            if (value.control_user === true) {
                hasControlUser = true;
            }
        });
        if (hasControlUser === false) {
            return res.status(400).json({message: "no control user found"});
        }
        else {
            next();
        }
    }
    else {
        return res.status(400).json({message: "setup required"});
    }
};

