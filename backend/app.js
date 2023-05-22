const express = require('express');
const expressValidator = require('express-validator');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');

require('dotenv').config();

const app = express();
const SQLiteStore = require('connect-sqlite3')(session);
app.locals.pluralize = require('pluralize');


const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');

// ** view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*------------------MIDDLEWARE---------------------*/
// static files/assets
app.use(express.static(path.join(__dirname, './public')));
//      parse form data
app.use(express.urlencoded({extended : false}));
//      parse json
app.use(express.json());
//      log out requests
app.use(logger("dev"));
//      any request with a 'body' will be parssed to json format
app.use(bodyParser.json());
//      validator - learn more
// app.use(expressValidator());

//      cookie parser
app.use(cookieParser());

// a session secret is used to compute hash
/*
app.use(session({
    secret : process.env.JWT_SECRET,
    resave : false,
    saveUninitialized : false,
    store : new SQLiteStore({db: 'sessions.db', dir: './var/dir'})
}));

app.use(passport.authenticate('session'));

app.use(function(req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !!msgs.length;
    req.session.messages = [];
    next();
});

*/
// catch 404 and forward error handler
app.use(function(req,res,next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development mode
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render an error page
    res.status(err.status || 500);
    res.render('error');
});


// ** routers
// ** here I'll put the routes 
app.use('./api/users',userRoutes);
app.use('./api/tasks',taskRoutes);
app.use('/',indexRoutes);
app.use('/login', authRoutes);


// app.use('/login',auth);

/* SERVER listening */
// app.listen(5000, () =>{
//     console.log('listening on port 5000...');
// });

module.exports = app;