const indexRouter = require('../app/routes/index');
const genreRouter = require("../app/routes/genre.routes");
const movieRouter = require("../app/routes/movie.routes");
const rentalRouter = require("../app/routes/rental.routes");
const customerRoute = require("../app/routes/customer.route");
const userRouter = require("../app/routes/users.router");
const authRouter = require("../app/routes/auth.routes");
const error = require("../app/middleware/error.middleware");

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/genre', genreRouter);
  app.use('/movies', movieRouter);
  app.use('/rentals', rentalRouter);
  app.use('/customers', customerRoute);
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use(error);
}
