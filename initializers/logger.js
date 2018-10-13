require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');


module.exports = () => {

  // handle uncaught exception error
  // that can happen in anywhere in application outside of request process pipeline
  // process.on("uncaughtException", (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });
  // throw new Error("Something bad happened during startup");

  // // handle undandle promise rejection 
  // // it might be remote http service, database crash etc
  // process.on("unhandledRejection", (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });
  // const p = Promise.reject(new Error("Something failed miserably!"));
  // p.then(() => console.log("done") );

  // BETTER APPROACH
  // winston.handleExceptions can handle any uncaught exceptions
  // version 3.4 does not handle unhandledRejection

  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: 'logfile.log' });
  
  winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/bookrental',
    level: 'info'
  });  

}
