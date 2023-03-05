const express = require('express');
const path = require('path');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global Variables

// Routes
app.use(require('./routes/index.routes'))

// Static files
app.use(express.static(path.join(__dirname, 'public')));
 
module.exports = app;