/**
 * Defines the controller for handling the emailing API route
 */

// Require the logging service
const { LogsService } = require('../../app/services');
/* Use the database service for queries */
const { AppDboService } = require('../../app/services');
/* Get the User model */
const { User } = require('../../app/models');
/* Load our local config */
const config = require('../../app/config/env.config');
/* Initialise */
const dbo = new AppDboService(config.dbPath);
const user = new User(dbo);

/* Define the send method */
const findUser = (req, res) => {
    let id  = req.params.id;
    // with query params ?id=1 // let id = req.query.id;

    // ensure that all elements exist !! basic test only !!
    if (!(id)) {
        return res.status(400).send({errors: ['Required parameters missing']});
    }

    if (parseInt(id) === 0) {
        return res.status(201).json({message: "Not found"});
    }

    user.findById(id)
        .then((user) => {
            // check that the sender's domain is authorized
            if (user) {
                /* what do we do now?? */
                console.log(user);

            } else {
                // log this
                let logData = {
                    "type": "user",
                    "action": "findById",
                    "message": "user not found for id: " + id
                };
                LogsService.save(logData);

                // return an error response
                return res.status(404).send({errors: ['User not found for id: ' + id]});
            }
        });
};

module.exports = {
    findUser
};
