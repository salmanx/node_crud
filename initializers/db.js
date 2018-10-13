const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
  mongoose.connect("mongodb://localhost/bookrental", { useNewUrlParser: true })
  .then(winston.info("mongodb connected"));
  // we dont need catch block here. since it's already handled by unhandledRejection
  //.catch(err => console.log(err));
}


