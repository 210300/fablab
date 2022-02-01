const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
var MemoryStore = require('memorystore')(expressSession)
const passport = require('passport');
const flash = require('connect-flash');
const dotenv = require("dotenv");
dotenv.config({ path: './.env'});

const port = process.env.PORT || 5000

const app = express();
app.use(express.json());

//template
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views',);

//static files 
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));

//connection to db
const mongoURI = require('./config/db');
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, },).then(() => console.log("Connected !"),);

app.use(cookieParser('random'));

app.use(expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
}));

// app.use(csrf({ cookie: true }))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.error = req.flash('error');
    next();
});
function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
  }

//for viewadmin booking
// app.use(require('./authcontroller/userbooking'));
app.use(require('./controller/routes.js'));
app.use('',require('./authcontroller/viewbooking'));


app.use('', require('./authcontroller/latestproject'));
app.use('', require('./authcontroller/services'));
app.use('', require('./authcontroller/addteam'));
app.use(require('./authcontroller/newsandEvents'));
//  for admin section
// app.use('/', require('./authcontroller/community'))
app.use(require('./authcontroller/student')) 
app.use('',require('./authcontroller/startup'));
app.use('/bussiness', require('./authcontroller/company'));

//for booking
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.use(ignoreFavicon);
app.listen(port);