const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/config')
const logger = require('morgan');
const helmet = require('helmet')
const ratelimit = require('express-rate-limit')
const errorHandler = require('./middleware/errorHandler')

const usersRoute = require('./routes/users_route')
const courseRoute = require('./routes/course_route');

const app = express();

// config security 
app.use(cors())
app.set('trust proxy', 1)
const limiter = ratelimit({
  windowMs: 15*60*1000,
  max: 100
})
app.use(limiter)    // apply ratelimit to all requests
app.use(helmet())   // use helmet for http header security 

// Connect mongoDB Database
mongoose.Promise = global.Promise
mongoose
  .connect(config.MONGODB_URI)
  .then((res) => console.log('Database successfully connected'))
  .catch((error) => console.log('Connection error'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize()) // init passport

app.use('/user', usersRoute)
app.use('/course', courseRoute)

// error handler
app.use(errorHandler)

module.exports = app;