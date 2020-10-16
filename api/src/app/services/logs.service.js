/**
 *  Defines a model for logging actions
 */

/* Requires the sqlite adapter */
const AppDbo  = require('./appdbo.service');
const { LogModel } = require('../models');
const config  = require('../config/env.config');

const dbo = new AppDbo(config.dbPath);
const Logs = new LogModel(dbo);

/* Define a method to save logging data */
const save = (logData) => {
    Logs.create(logData, 0)
        .then(() => {
           // console.log("log result: " + result.id);
            Logs.findAll()
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
