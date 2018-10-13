const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const winston = require('winston');

require("./initializers/logger")();
require("./initializers/routes")(app);
require("./initializers/db")();
require("./initializers/config")();
require("./initializers/objectIdValidation")();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = app;
