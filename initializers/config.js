
const config = require('config');

module.exports = () => {
  if(!config.get('jwtPrivateKey')){
    throw new Error("FATAL_ERROR: jwtPrivateKey is not set");
  }
}

