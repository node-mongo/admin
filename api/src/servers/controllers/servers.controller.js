/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      servers.controller.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   servers.controller.js
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
 * Defines the servers.controller and methods for the API: /api/servers
 */

// Require the logging service
//const { LogsService } = require('../../app/services');
const { CryptoService } = require('../../app/services')

/* Require the ServerModel */
const { ServerModel } = require('../../app/models');

function handleResult() {
    let result = ServerModel.getResults();
    if (!result) {
        setTimeout(() => {
            return handleResult()
        }, 100);
    } else {
        console.log("result: " + result);
        return result;
    }
}

/**
 * Create a server record
 *
 * URL:         /api/servers/create
 * Method:      POST
 * Description: Create or Update a server
 *
 * @param       req
 * @param       res
 * @returns     {*}
 */
const create = (req, res) => {
    // ensure that all elements exist !! basic test only !!
    if (!(req.body.host && req.body.username)) {
        return res.status(400).json({errors: ['Required parameters missing']});
    }

    // handle an update
    if (req.body) {
        let user = req.session.user;
        if (req.body.id) {
            ServerModel.findById(req.body.id)
                .then((server) => {
                    //console.log("server: " + server);
                    // confirm the current user matches
                    if (server.user_id === user.id) {
                        let password = server.password;
                        if (req.body.password) {
                            password = CryptoService.encrypt(req.body.password);
                        }
                        let params = {
                            id: req.body.id,
                            host:     req.body.host,
                            username: req.body.username,
                            port:     req.body.port,
                            password: password,
                            atlas:    req.body.atlas,
                            database: req.body.database,
                            resolver: req.body.resolver,
                            active:   req.body.active
                        }

                        ServerModel.update(params)
                            .then(() => {
                                ServerModel.setResults({
                                    ...params,
                                    user_id: user.id
                                })

                            })
                            .catch((error) => {
                                console.log("error: " + error);
                                ServerModel.setResults({ id: 'error' })
                            });
                    }
                });
            let result = handleResult(res);
            if (result && result.id) {
                return res.json( {
                    success: true,
                    message: "success",
                    server: result
                } );
            } else {
                return res.json( { success: false, errors: "failed" } );
            }
        }

        if (!req.body.password) {
            return res.status(400).json({ errors: ['Required parameters missing']});
        }

        // create new
        let password = CryptoService.encrypt(req.body.password);
        return ServerModel.create(
            req.body.host,
            req.body.port,
            req.body.username,
            password,
            req.body.atlas,
            req.body.database,
            req.body.resolver,
            req.body.active,
            user.id
            )
            .then((result) => {
                console.log(result);
                return res.json( { success: true, message: "success"} );
            })
            .catch((error) => {
                console.log(error);
                return res.json( { success: false, message: "failed"} );
            });
    } else {
        console.log("request: " + req);
        console.log("request body: " + req.body);
    }
}

/**
 * Get server(s) configurations
 *
 * URL:         /api/servers
 * Method:      GET
 * Description: Fetches all servers if Control User or servers for current user only
 *
 * @param       {object}    req
 * @param       {object}    res
 * @returns     {*}
 */
const get = (req, res) => {
    console.log(req.session.user);
    if (req.session.user.control_user === 1) {
        console.log("getting servers for control user");
        ServerModel.findAll()
            .then((results) => {
                ServerModel.setResults(ServerModel.filterResults(results));
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        console.log("user_id: " + req.session.user.id);
        ServerModel.findByUser(req.session.user.id)
            .then((results) => {
                ServerModel.setResults(ServerModel.filterResults(results));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return res.json({
        success: true,
        message: "success",
        servers: ServerModel.getResults()
    })
};

module.exports = {
    get,
    create
};
