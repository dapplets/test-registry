import { asyncHandler } from "../common/helpers";
import { checkAccountKey } from "../services/accounts";
import * as RegistryService from "../services/registry";
import { AuthError } from "../common/errors";

export const getVersions = asyncHandler(async function (req: any, res: any) {
    const { account } = req.params;
    let { name, branch } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!branch) branch = "default";

    const versions = RegistryService.getModuleVersions(account, name, branch);

    res.json({ success: true, data: versions });
})

export const resolveToUri = function (req: any, res: any) {
    const { account } = req.params;
    let { name, branch, version } = req.query;
    if (!name) throw new Error("Name is required parameter.");
    if (!version) throw new Error("Version is required parameter.");
    if (!branch) branch = "default";

    const uris = RegistryService.resolveModuleToUris(account, name, branch, version);

    res.json({ success: true, data: uris });
}

export const getFeatures = function (req: any, res: any) {
    const { account } = req.params;
    const { hostname } = req.query;
    if (!hostname) throw new Error("Hostname is required parameter.");
    const hostnames = Array.isArray(hostname) ? hostname : [hostname];

    const features = RegistryService.getFeatures(account, hostnames);

    res.json({ success: true, data: features });
}

export const addModule = asyncHandler(async function (req: any, res: any) {
    // ToDo: authorization
    const { account } = req.params;
    const { name, branch, version, manifestHash, key } = req.query;
    
    if (!key) throw new Error("key is required parameter.");
    if (!checkAccountKey(account, key)) throw new AuthError();
    if (!name) throw new Error("name is required parameter.");
    if (!branch) throw new Error("branch is required parameter.");
    if (!version) throw new Error("version is required parameter.");
    if (!manifestHash) throw new Error("manifestHash is required parameter.");

    await RegistryService.addModule(account, name, branch, version, manifestHash);

    res.json({ success: true, message: "The module is added to registry." });
})

export const addModuleWithObjects = asyncHandler(async function (req: any, res: any) {
    // ToDo: authorization
    const { account } = req.params;
    const { name, branch, version, hashUris, key } = req.query;
    
    if (!key) throw new Error("key is required parameter.");
    if (!checkAccountKey(account, key)) throw new AuthError();
    if (!name) throw new Error("name is required parameter.");
    if (!branch) throw new Error("branch is required parameter.");
    if (!version) throw new Error("version is required parameter.");
    if (!hashUris) throw new Error("hashUris is required parameter.");

    await RegistryService.addModuleWithObjects(account, name, branch, version, hashUris);

    res.json({ success: true, message: "The module is added to registry." });
})

export const removeModule = asyncHandler(async function (req: any, res: any) {
    // ToDo: authorization
    const { account } = req.params;
    let { name, branch, version, key } = req.query;
    if (!key) throw new Error("Key is required parameter.");
    if (!checkAccountKey(account, key)) throw new AuthError();
    if (!name) throw new Error("Name is required parameter.");
    if (!version) throw new Error("Version is required parameter.");
    if (!branch) branch = "default";

    RegistryService.removeModule(account, name, branch, version);

    res.json({ success: true, message: "The module is removed from registry." });
})

export const addSiteBinding = function (req: any, res: any) {
    // ToDo: authorization
    const { account } = req.params;
    let { name, branch, site, key } = req.query;
    if (!key) throw new Error("Key is required parameter.");
    if (!checkAccountKey(account, key)) throw new AuthError();
    if (!name) throw new Error("Name is required parameter.");
    if (!site) throw new Error("Site is required parameter.");
    if (!branch) branch = "default";

    RegistryService.addSiteBinding(account, name, branch, site);

    res.json({ success: true, message: "The module branch is binded with the site." });
}

export const removeSiteBinding = function (req: any, res: any) {
    // ToDo: authorization
    const { account } = req.params;
    let { name, branch, site, key } = req.query;
    if (!key) throw new Error("Key is required parameter.");
    if (!checkAccountKey(account, key)) throw new AuthError();
    if (!name) throw new Error("Name is required parameter.");
    if (!site) throw new Error("Site is required parameter.");
    if (!branch) branch = "default";

    RegistryService.removeSiteBinding(account, name, branch, site);

    res.json({ success: true, message: "The module branch is unbinded from the site." });
}

export const hashToUris = function (req: any, res: any) {
    // ToDo: authorization
    const { account } = req.params;
    const { hash } = req.query;

    if (!account) throw new Error("account is required parameter.");
    if (!hash) throw new Error("hash is required parameter.");

    const uris = RegistryService.hashToUris(account, hash);

    res.json({ success: true, data: uris });
}

export const addHashUri = function (req: any, res: any) {
    // ToDo: authorization
    const { account } = req.params;
    let { hash, uri, key } = req.query;
    if (!key) throw new Error("key is required parameter.");
    if (!checkAccountKey(account, key)) throw new AuthError();
    if (!hash) throw new Error("hash is required parameter.");
    if (!uri) throw new Error("uri is required parameter.");

    RegistryService.addHashUri(account, hash, uri);

    res.json({ success: true, message: "The URI is added to the hash." });
}

export const removeHashUri = function (req: any, res: any) {
    // ToDo: authorization
    const { account } = req.params;
    let { hash, uri, key } = req.query;
    if (!key) throw new Error("key is required parameter.");
    if (!checkAccountKey(account, key)) throw new AuthError();
    if (!hash) throw new Error("hash is required parameter.");
    if (!uri) throw new Error("uri is required parameter.");

    RegistryService.removeHashUri(account, hash, uri);

    res.json({ success: true, message: "The URI is removed from the hash." });
}