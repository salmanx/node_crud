const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

if(!config.get('jwtPrivateKey')){
  console.log("FATAL_ERROR: jwtPrivateKey is not set");
  process.exit(1);
}

mongoose.connect("mongodb://localhost/bookrental", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongodb connected!");
});

const indexRouter = require('./app/routes/index');
const genreRouter = require("./app/routes/genre.routes");
const movieRouter = require("./app/routes/movie.routes");
const rentalRouter = require("./app/routes/rental.routes");
const customerRoute = require("./app/routes/customer.route");
const userRouter = require("./app/routes/users.router");
const authRouter = require("./app/routes/auth.routes");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/genre', genreRouter);
app.use('/movies', movieRouter);
app.use('/rentals', rentalRouter);
app.use('/customers', customerRoute);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(8000, ()=>{
  console.log("App is listening 8000");
});

module.exports = app;
