/**
 *  Defines a model for logging actions
 */

/* Requires the sqlite adapter */
const AppDbo  = require('./appdbo.service');
const { Log } = require('../models');
const config  = require('../config/env.config');

const dbo = new AppDbo(config.dbPath);
const logs = new Log(dbo);

/* Define a method to save logging data */
const save = (logData) => {
    logs.create(logData, 0)
        .then(() => {
           // console.log("log result: " + result.id);
            logs.findAll()
                .then((rows) => {
                    console.log("logs count: " + rows.length);
                    /*rows.forEach((row) => {
                        console.log(row);
                    });*/
                });
        });
};

module.exports = {
    save
};
