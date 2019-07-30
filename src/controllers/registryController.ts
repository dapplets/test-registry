import express from "express";

const router = express.Router();

router.get('/:account/get-versions', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

router.get('/:account/resolve-to-uri', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

router.get('/:account/get-features', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

router.post('/:account/add-module', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

router.post('/:account/add-site-binding', function (req, res) {
    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

export default router;