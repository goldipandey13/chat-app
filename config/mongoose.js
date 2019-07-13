const config = require('./../config/config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: 10, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect(config.MONGODB_URI, options).then(
    () => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log('Connected to database:', config.MONGODB_URI);
        console.log('Kindly check the log file for logs!');

    })
    .catch((err) => console.log('Error connecting to database: ', err));

module.exports = {
    mongoose
};