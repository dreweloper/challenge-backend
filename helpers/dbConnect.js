const mongoose = require('mongoose');

/**
 * Establishes a connection to MongoDB based on the current environment.
 * 
 * @async
 * @function dbConnect
 * @returns {Promise<mongoose.Connection>} A promise that resolves to a MongoDB client.
 * @throws {Error}
 */
const dbConnect = async () => {

    /**
     * MongoDB connection string based on the current environment.
     * @type {String}
     */
    const connectionString = process.env.NODE_ENV != 'test' ? process.env.MONGODB_URI : process.env.MONGODB_URI_TEST;

    /**
     * MongoDB connection options.
     * @type {Object}
     * @property {Boolean} useNewUrlParser - Enable the new URL parser (default: true).
     * @property {Boolean} useUnifiedTopology - Enable the unified topology engine (default: true).
     */
    const mongodbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    try {
        
        const mongodbClient = mongoose.connect(connectionString, mongodbOptions);

        console.log('Connected to MongoDB');

        return mongodbClient;

    } catch (error) {
        
        console.error('Failed to connect to MongoDB', error);

        throw error;

    };

};

module.exports = dbConnect;