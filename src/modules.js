var router = require('express').Router();

// all modules and its branches
router.get('/', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

// all modules by specific account
router.get('/:account', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

// create new module in specific account
router.post('/:account', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

// all branches of specific module name
router.get('/:account/:name', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

// all versions of specific module name and branch
router.get('/:account/:name/:branch', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

// manifest of specific module name, branch, version
router.get('/:account/:name/:branch/:version', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

// resources of specific module name, branch, version
router.get('/:account/:name/:branch/:version/:file', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

module.exports = router;