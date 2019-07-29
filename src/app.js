var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var router = express.Router();

router.use('/modules', require('./modules')); 
router.use('/users', require('./users')); 

app.use('/api', router);

module.exports = app;