/**
 * Defines the controller for handling the emailing API route
 */

// Require the logging service
const { LogsService } = require('../../app/services');
/* Use the database service for queries */
const { AppDBOService } = require('../../app/services');
/* Get the User model */
const { UserModel } = require('../../app/models');
/* Load our local config */
const config = require('../../app/config/env.config');
/* Initialise */
const dbo = new AppDBOService(config.dbPath);
const User = new UserModel(dbo);

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

    User.findById(id)
        .then((user) => {
            // check that the sender's domain is authorized
            if (user) {
                /* return a cut down user */
                let u = {
                    id: user.id,
                    iri: "/api/users/" + user.id,
                    user: user.user,
                    name: user.name,
                    country: user.country
                };
                return res.status(200).json({ message: "success", user: u});

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

const location = (req, res) => {
    return res.status(200).json({ message: "success", location: {}});
};

module.exports = {
    findUser,
    location
};
