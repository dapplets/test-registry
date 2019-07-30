import express from "express";
import { asyncHandler } from "../common/helpers";

const router = express.Router();

router.get('/:account/get-versions', asyncHandler(async function (req, res) {
    let { name, branch } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!branch) branch = "default";

    res.json({
        success: false,
        message: "Not implemented yet"
    });
}));

router.get('/:account/resolve-to-uri', function (req, res) {
    let { name, branch, version } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!version) throw new Error("Version is required parameter.");
    if (!branch) branch = "default";

    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

router.get('/:account/get-features', function (req, res) {
    const { hostname } = req.query;
    if (!hostname) throw new Error("Hostname is required parameter.");

    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

router.post('/:account/add-module', function (req, res) {
    const { uri } = req.query;
    if (!uri) throw new Error("Uri is required parameter.");

    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

router.post('/:account/add-site-binding', function (req, res) {
    let { name, branch, site } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!site) throw new Error("Site is required parameter.");
    if (!branch) branch = "default";

    res.json({
        success: false,
        message: "Not implemented yet"
    });
});

export default router;