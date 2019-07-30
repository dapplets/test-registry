import express from "express";
import { asyncHandler } from "../common/helpers";

const router = express.Router();

router.get('/:account/get-versions', asyncHandler(async function (req, res) {
    const { name, branch } = req.query;
    if (!name) throw new Error("Name is required parameter.");

    res.json({
        success: false,
        message: "Not implemented yet"
    });
}));

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