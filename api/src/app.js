/**
 * Node Mongo Admin (primary app)
 * app.js
 */

/* We will use Express JS to wrap this API service */
const express = require('express');

/* Use this sanitizer */
const xss = require('xss-clean');

/* Handles our CORS requirements */
const cors = require('cors');

/* Require body-parser to make our JSON life easier */
//const bodyParser = require('body-parser');

/* Define all our our Routes here */
const SetupRouter = require('./setup/routes.config');
const AuthRouter = require('./authorization/routes.config');
const UserRouter = require('./users/routes.config');

/* Require the cookie=parser to enable our JWT management */
const cookieParser = require('cookie-parser');

const app = express();

/* Initialise the body-parser */
//app.use(bodyParser.json());
app.use(express.json());

/* Parse urlencoded requests */
app.use(express.urlencoded({ extended: true }));

/* Sanitize request data */
app.use(xss());

/* Initialise the cookie-parser */
app.use(cookieParser());

/* Handle the CORS setup */
app.use(cors());
app.options('*', cors());

/* Initialise all of our Routes here */
SetupRouter.routesConfig(app);
AuthRouter.routesConfig(app);
UserRouter.routesConfig(app);

/* Send a 404 error for any unknown requests */
app.use((req, res, next) => {
    //next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    next(res.status(404));
});

module.exports = app;