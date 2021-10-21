/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      mongoose.service.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   mongoose.service.js
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
 *  This defines the Mongoose MongoDB adapter
 */

const mongoose = require('mongoose');
let count = 0;

// some db options
// Todo: !! a couple of the options (reconnectTries & reconnectInterval) are throwing deprecated warning - need to investigate further !!
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // getting rid off the depreciation errors
    useNewUrlParser: true,
    useUnifiedTopology: true

};

// this method can be looped until it connects
const connectWithRetry = () => {
    console.log('MongoDB connection with reattempts: ' + count);
    mongoose.connect("mongodb://localhost/admin", options).then(() => {
        console.log('MongoDB connection established');

    }).catch(err => {
        console.log('MongoDB connection failed with err: ' + err, ++count);
        setTimeout(connectWithRetry, 4000)
    })
};

// initialise
connectWithRetry();

exports.mongoose = mongoose;
