/**
 * Node Mongo Admin (primary loader)
 * index.js
 */

/* Load our local config */
const config = require('./app/config/env.config');

/* Load our App base */
const app = require('./app');

/* Load our logging service */
const { LogsService } = require('./app/services');

/* Init the server listener */
let server = app.listen(config.port, () => {
    console.log("app configured for port " + config.port);
    LogsService.save(
        {
            "type": "index",
            "action": "launch",
            "message": "app configured for port " + config.port
        }
    );
});

/* Handling exit statuses */
const exitHandler = () => {
    if (server) {
        server.close(() => {
            LogsService.save(
                {
                    "type": "index",
                    "action": "closed",
                    "message": "server closed"
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
    LogsService.save(
        {
            "type": "index",
            "action": "error",
            "message": error
        }
    );
    exitHandler();
};

/* Catch process errors */
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

/* Catch SIGTERM */
process.on('SIGTERM', () => {
    LogsService.save(
        {
            "type": "index",
            "action": "SIGTERM",
            "message": "SIGTERM received"
        }
    );
    if (server) {
        server.close();
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
    res.send(`Hello World Views: ${req.session.views}!`)
});

/* testing raw node */
//let http = require('http');
//http.createServer(function(request, response) {
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.write("Hello World!!");
//    response.end();
