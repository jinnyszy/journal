const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
var session = require('express-session');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var expressValidator = require('express-validator');
var path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New
app.use(cors());
// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());
app.use(expressValidator());

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
