/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      index.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   index.js
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
 * Node Mongo Admin (primary loader)
 * index.js
 */

/* Make the .env available */
require('dotenv').config();

/* Load our local config */
const config = require('./app/config/env.config');

/* Load our App base */
const app = require('./app');

/* Load our logging service */
const { LogsService } = require('./app/services');

/* Load the file system reader to fetch the certs */
const fs = require('fs');

/* Because we are using express-session we need to set cookies.sameSite = none which requires SSL */
const http = require('http');
const https = require('https');

/* Get the cert and key */
const serverKey = fs.readFileSync('../storage/cert/server.key');
const cert = fs.readFileSync('../storage/cert/mongo-nodejs.crt');
const credentials = {key: serverKey, cert: cert };

/* Init the http server listener */
const httpServer = http.createServer(app);
httpServer.listen(config.port, () => {
    console.log("app configured for port " + config.port);
    LogsService.save(
        {
            "type": "index",
            "action": "launch",
            "message": "app configured for port " + config.port,
            "user_id": 0
        }
    )
});

/* Init the https server listener */
let httpsServer = https.createServer(credentials, app);
httpsServer.listen(config.httpsPort, () => {
    console.log("app configured for port " + config.httpsPort);
    LogsService.save(
        {
            "type": "index",
            "action": "launch",
            "message": "app configured for SSL port " + config.httpsPort,
            "user_id": 0
        }
    )
});

/* Handling exit statuses */
const exitHandler = () => {
    if (httpServer || httpsServer) {
        httpServer.close(() => {
            console.log("closing server!");
           LogsService.save(
                {
                    "type": "index",
                    "action": "closed",
                    "message": "server closed",
                    "user_id": 0
                }
            );
            process.exit(1);
        });
        httpsServer.close(() => {
            console.log("closing HTTPS server!");
            LogsService.save(
                {
                    "type": "index",
                    "action": "closed",
                    "message": "https server closed",
                    "user_id": 0
                }
            );
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

/* Handling unexpected errors */
const unexpectedErrorHandler = (error) => {
    console.log("unexpectedErrorHandler error.code: " + error.code);
    if (error&& error.code !== 'SQLITE_CANTOPEN') {
        console.log(error);
        LogsService.save(
            {
                "type": "index",
                "action": "error",
                "message": error,
                "user_id": 0
            }
        );
    }
    exitHandler();
};

/* Catch process errors */
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

/* Catch SIGTERM */
process.on('SIGTERM', () => {
    console.log("SIGTERM!!");
    LogsService.save(
        {
            "type": "index",
            "action": "SIGTERM",
            "message": "SIGTERM received",
            "user_id": 0
        }
    );
    if (httpServer) {
        httpServer.close();
    }
    if (httpsServer) {
        httpsServer.close();
    }
});



/* Simple test case to ensure the app is up and running */
app.get("/", (req, res) => {
    if (req.session.views) {
        req.session.views++;
    }
    else {
        req.session.views = 1;
    }
    res.send(`Hello World: number of views: ${req.session.views}!`)
});

/* testing raw node */
//let http = require('http');
//http.createServer(function(request, response) {
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.write("Hello World!!");
//    response.end();
