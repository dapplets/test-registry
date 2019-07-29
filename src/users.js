var router = require('express').Router();

// all accounts
router.get('/', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

// create new account
router.post('/', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

module.exports = router;