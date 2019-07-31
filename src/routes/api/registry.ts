import express from "express";
import { asyncHandler } from "../../common/helpers";
import { getModuleVersions, getFeatures, addModule, resolveModuleToUris, addSiteBinding, removeModule, removeSiteBinding } from "../../services/registry";

const router = express.Router();

router.get('/:account/get-versions', asyncHandler(async function (req, res) {
    const { account } = req.params;
    let { name, branch } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!branch) branch = "default";

    const versions = getModuleVersions(account, name, branch);

    res.json({ success: true, data: versions });
}));

router.get('/:account/resolve-to-uri', function (req, res) {
    const { account } = req.params;
    let { name, branch, version } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!version) throw new Error("Version is required parameter.");
    if (!branch) branch = "default";

    const uris = resolveModuleToUris(account, name, branch, version);

    res.json({ success: true, data: uris });
});

router.get('/:account/get-features', function (req, res) {
    const { account } = req.params;
    const { hostname } = req.query;
    if (!hostname) throw new Error("Hostname is required parameter.");

    const features = getFeatures(account, hostname);

    res.json({ success: true, data: features });
});

router.post('/:account/add-module', asyncHandler(async function (req, res) {
    // ToDo: authorization
    const { account } = req.params;
    const { uri } = req.query;
    if (!uri) throw new Error("Uri is required parameter.");

    await addModule(account, uri);

    res.json({ success: true, message: "The module is added to registry." });
}));

router.post('/:account/remove-module', asyncHandler(async function (req, res) {
    // ToDo: authorization
    const { account } = req.params;
    let { name, branch, version } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!version) throw new Error("Version is required parameter.");
    if (!branch) branch = "default";

    removeModule(account, name, branch, version);

    res.json({ success: true, message: "The module is added to registry." });
}));

router.post('/:account/add-site-binding', function (req, res) {
    // ToDo: authorization
    const { account } = req.params;
    let { name, branch, site } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!site) throw new Error("Site is required parameter.");
    if (!branch) branch = "default";

    addSiteBinding(account, name, branch, site);

    res.json({ success: true, message: "The module branch is binded with the site." });
});

router.post('/:account/remove-site-binding', function (req, res) {
    // ToDo: authorization
    const { account } = req.params;
    let { name, branch, site } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!site) throw new Error("Site is required parameter.");
    if (!branch) branch = "default";

    removeSiteBinding(account, name, branch, site);

    res.json({ success: true, message: "The module branch is unbinded from the site." });
});

export default router;