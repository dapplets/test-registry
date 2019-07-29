var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var router = express.Router();

router.use('/modules', require('./modules')); 
router.use('/accounts', require('./accounts')); 

app.use('/api', router);

// main page
app.get('/', function (req, res) {
    res.json({
        success: true,
        message: "Hello! I'm Test Dapplet Registry. More information is here: https://github.com/dapplets/dapplet-registry"
    });
}); 

module.exports = app;