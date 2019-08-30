// Require in modules
require('dotenv').config();
const express = require('express');
const flash = require('connect-flash');
const layouts = require('express-ejs-layouts');
const moment = require('moment');
const axios = require('axios');
const passport = require('./config/passportConfig');
const session = require('express-session');
var methodOverride = require('method-override');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);
//const db = require('./models');

// Instantiate the express app
const app = express();

// Set up any middleware or settings
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(layouts);
app.use('/', express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash()); // After session!
app.use(passport.initialize());
app.use(passport.session());

// const sessionStore = new SequelizeStore({
//   db: db.sequelize,
//   expiration: 30 * 60 * 1000
// })

// sessionStore.sync();

// Custom middleware: write data to locals for EVERY page
app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  res.locals.moment = moment;
  next();
});

// Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/results', require('./controllers/results'));
app.use('/favorites', require('./controllers/favorites'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('*', (req, res) => {
    res.render('404');
});

// LISTEN!
app.listen(process.env.PORT, () => {
    console.log("☕ Server is now running at port", process.env.PORT);
});
