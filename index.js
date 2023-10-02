// Dependencies
const express = require('express');
const cors = require('cors');
const dbConnect = require('./helpers/dbConnect');
require('dotenv').config();

// Creating the app
const app = express();

// Port config
const port = process.env.PORT || 3000;

// MongoDB connection
dbConnect();

// CORS middleware
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
    maxAge: 500
}));

// Parse application/json
app.use(express.json({ limit: '50mb' }));

// Route to connect to the 'kenjo-challenge' database and interact with the 'album-db' collection in MongoDB
app.use('/album', require('./routers/albumRouter'));

// Error handling
app.use((error, req, res, next) => {

    // Checks if the response (res) has not yet been sent to the client and its writing has not completed.
    if (!res.writableEnded) return res.status(500).json(error.message);

});

// Listen for requests
let server = app.listen(port, '0.0.0.0', () => console.info(`Server started on port ${port}`));

server.on('error', (serverError) => console.error('Server error', serverError));

process.setMaxListeners(14);

// Export `app` and `server` for testing purposes.
module.exports = { app, server };