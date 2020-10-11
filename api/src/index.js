/**
 * Node Mongo Admin
 */

/* Load our local config */
const config = require('./app/config/env.config.js');

/* We will use Express JS to wrap this API service */
const express = require('express');
const app = express();

/* Require body-parser to make our JSON life easier */
const bodyParser = require('body-parser');

/* Require the cookie=parser to enable our JWT management */
const cookieParser = require('cookie-parser');

/* Define all our our Routes here */
const SetupRouter = require('./setup/routes.config');
const AuthRouter = require('./authorization/routes.config');
const UserRouter = require('./users/routes.config');

/* We need to handle CORS */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);

    } else {
        return next();
    }
});

/* Initialise the body-parser */
app.use(bodyParser.json());

/* Initialise the cookie-parser */
app.use(cookieParser());

/* Initialise all of our Routes here */
SetupRouter.routesConfig(app);
AuthRouter.routesConfig(app);
UserRouter.routesConfig(app);

/* Simple test case to ensure the app is up and running */
app.get("/", (req, res) => res.send('Hello Gilly!'));

/* Init the server listener */
app.listen(config.port, () => console.log(`app configured for port ${config.port}`));

/* testing raw node */
//let http = require('http');
//http.createServer(function(request, response) {
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.write("Hello World!!");
//    response.end();
//}).listen(8080);