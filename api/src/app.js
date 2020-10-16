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
const SetupRouter = require('./setup/routes.config');
const UserRouter  = require('./users/routes.config');

/* Require the cookie=parser to enable our JWT management */
//const cookieParser = require('cookie-parser');

/* express */
const app = express();

/* trust me!! */
app.set('trust proxy', 1);

/* Set the session options */
let sess = {
    resave: false, // dont save unless we have to
    saveUninitialized: false, // dont create unless there is something to store
    secret: config.session_secret,
    store: new SQLiteStore({dir: './storage'}),
    //cookie: {}
    cookie: {
        path: '/',
        httpOnly: false,
        secure: false,
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
    origin: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Connection, Cookie, Referer'
}));
app.options('*', cors());

app.use((req, res, next) => {
   console.log('%0', req);
   next();
});

/* Initialise all of our Routes here */
AuthRouter.routesConfig(app);
DatabasesRouter.routesConfig(app);
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