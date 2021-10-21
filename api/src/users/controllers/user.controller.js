/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      user.controller.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   user.controller.js
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
 * Defines the controller for handling the emailing API route
 */

/* Require the logging service */
const { LogsService } = require('../../app/services');

/* Require the User model */
const { UserModel } = require('../../app/models');

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

    UserModel.findById(id)
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
