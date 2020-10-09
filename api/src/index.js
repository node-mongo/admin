


/* Load our local config */
const config = require('./app/config/env.config.js');

/* We will use Express JS to wrap this API service */
const express = require('express');
const app = express();

/* Require body-parser to make our JSON life easier */
const bodyParser = require('body-parser');

/* We need to handle CORS */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);

    } else {
        return next();
    }
});

/* Initialise the body-parser */
app.use(bodyParser.json());

/* Simple test case to ensure the app is up and running */
app.get("/", (req, res) => res.send('Hello Gilly!'));

/* Init the server listener */
app.listen(config.port, () => console.log(`app configured for port ${config.port}`));