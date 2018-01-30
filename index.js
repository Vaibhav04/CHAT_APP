const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http= require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const morgan = require('morgan');
const passport = require('passport');

const container = require('./container');

container.resolve(function(users, _, admin) {
     mongoose.Promise = global.Promise;
     mongoose.connect('mongodb://localhost/chatapp');
    const app = SetupExpress();
    
    function SetupExpress() {
        const app = express();
        app.listen(3000, function( ) {
            console.log('listening on port 3000');
        });

        ConfigureExpress(app);
        
        const router = require('express-promise-router')();
        users.setRouting(router);
        admin.setRouting(router);
        app.use(router);
    }

    function ConfigureExpress(app) {
        require('./passport/passport-local');
        require('./passport/passport-facebook');
        require('./passport/passport-google');

        app.use(morgan('dev'));
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        app.use(validator());
        app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: mongoose.connection})
        }));

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        //underscore
        app.locals._ = _;
    }
});