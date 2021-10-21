/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      app.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   app.js
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
 * Node Mongo Admin (primary app)
 * app.js
 */
const config   = require('./app/config/env.config');

/* We will use Express JS to wrap this API service */
const express  = require('express');

/* Use this sanitizer */
const xss      = require('xss-clean');

/* Handles our CORS requirements */
const cors     = require('cors');

/* Get the session handler */
const session  = require('express-session');

//const connect  = require('connect');

const SQLiteStore = require('connect-sqlite3')(session);


/* Require body-parser to make our JSON life easier */
const bodyParser = require('body-parser');

/* Define all our our Routes here */
const AuthRouter  = require('./authorization/routes.config');
const DatabasesRouter = require('./databases/routes.config');
const ServersRouter = require('./servers/routes.config');
const SetupRouter = require('./setup/routes.config');
const UserRouter  = require('./users/routes.config');

/* Require the cookie=parser to enable our JWT management */
const cookieParser = require('cookie-parser');

/* express */
const app = express();

/* set the cookie parser */
app.use(cookieParser());

/* trust me!! */
app.set('trust proxy', 1);

/* Set the session options */
let sess = {
    resave: false, // dont save unless we have to
    saveUninitialized: false, // dont create unless there is something to store
    secret: config.session_secret,
    store: new SQLiteStore({dir: config.sessDbPath}), // use config to store path to session db
    // we like cookies
    cookie: {
        path: '/',
        httpOnly: false,
        sameSite: 'none',
        secure: true, // process.env.NODE_ENV === "production",
        maxAge: 360000000, // 10 hours?
    } // ToDo: !! these settings suitable for DEV only !!
};

/* ToDo:  Try setting up our Session here */
app.use(session(sess));

/* Initialise the body-parser */
app.use(bodyParser.json());
//app.use(express.json());

/* Parse urlencoded requests */
app.use(express.urlencoded({ extended: true }));

/* Sanitize request data */
app.use(xss());

/* Initialise the cookie-parser */
//app.use(cookieParser());

/* Handle the CORS setup */
app.use(cors({
    credentials: true,
    origin: ['https://192.168.137.141:8080','https://node.mongo.local','http://192.168.137.141:8080','http://node.mongo.local'],
    methods: ['GET','POST'],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Connection, Cookie, Referer'
}));
app.options('*', cors());

app.use((req, res, next) => {
   //console.log('%0', req);
   next();
});

/* Initialise all of our Routes here */
AuthRouter.routesConfig(app);
DatabasesRouter.routesConfig(app);
ServersRouter.routesConfig(app);
SetupRouter.routesConfig(app);
UserRouter.routesConfig(app);

process.setMaxListeners(0);

/* Send a 404 error for any unknown requests */
/*
app.use((req, res, next) => {
    //next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    next(res.status(404));
});
*/

module.exports = app;