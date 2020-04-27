import { getAccountConfig, saveAccountConfig } from "./accounts";

export function getModuleVersions(account: string, name: string, branch: string): string[] {
    const config = getAccountConfig(account);

    if (!config || !config.modules || !config.modules[name] || !config.modules[name][branch]) {
        return [];
    }

    const versions = Object.getOwnPropertyNames(config.modules[name][branch]);

    return versions;
}

export function resolveModuleToUris(account: string, name: string, branch: string, version: string): { hash: string, uris: string[] } {
    const config = getAccountConfig(account);

    if (!config || !config.modules || !config.modules[name] || !config.modules[name][branch] || !config.modules[name][branch][version]) {
        throw new Error(`Module "${name}#${branch}@${version}" doesn't exist in the Registry.`);
    }

    const manifestHash = config.modules[name][branch][version];
    const uris = hashToUris(account, manifestHash);

    return {
        hash: manifestHash,
        uris: uris
    };
}

export function getFeatures(account: string, hostnames: string[]): { [hostname: string]: { [name: string]: string[] } } {
    const config = getAccountConfig(account);

    if (!config || !config.hostnames) {
        return {};
    }

    const features: any = {};

    for (const hostname of hostnames) {
        if (config.hostnames[hostname]) {
            features[hostname] = config.hostnames[hostname];
        }
    }

    return features;
}

export async function addModule(account: string, name: string, branch: string, version: string, manifestHash: string) {
    if (!name || !branch || !version) {
        throw new Error("A module name, branch, version are required.");
    }

    const config = getAccountConfig(account);

    if (!config.modules) config.modules = {};
    if (!config.modules[name]) config.modules[name] = {};
    if (!config.modules[name][branch]) config.modules[name][branch] = {};

    if (!config.modules[name][branch][version]) {
        config.modules[name][branch][version] = manifestHash;
    } else {
        throw new Error(`Module "${name}#${branch}@${version}" already exists in the Registry.`);
    }

    saveAccountConfig(account, config);
}

export async function addModuleWithObjects(account: string, name: string, branch: string, version: string, hashUris: { hash: string, uri: string }[]) {
    if (!name || !branch || !version) {
        throw new Error("A module name, branch, version are required.");
    }    
    if (!hashToUris || hashToUris.length === 0) {
        throw new Error("Module must have objects with hashes and URIs.");
    }

    for (const { hash, uri } of hashUris) {
        addHashUri(account, hash, uri);
    }
    
    const manifestHash = hashUris[0].hash;
    await addModule(account, name, branch, version, manifestHash);
}

export function removeModule(account: string, name: string, branch: string, version: string) {
    const config = getAccountConfig(account);

    if (!config.modules) return;
    if (!config.modules[name]) return;
    if (!config.modules[name][branch]) return;
    if (!config.modules[name][branch][version]) return;

    delete config.modules[name][branch][version];
    if (Object.getOwnPropertyNames(config.modules[name][branch]).length === 0) delete config.modules[name][branch];
    if (Object.getOwnPropertyNames(config.modules[name]).length === 0) delete config.modules[name];

    saveAccountConfig(account, config);
}

export function addSiteBinding(account: string, name: string, branch: string, hostname: string) {
    const config = getAccountConfig(account);

    if (!config.modules || !config.modules[name] || !config.modules[name][branch] || Object.getOwnPropertyNames(config.modules[name][branch]).length === 0) {
        throw new Error("The registry doesn't have any modules with this name and branch.");
    }

    if (!config.hostnames) config.hostnames = {};
    if (!config.hostnames[hostname]) config.hostnames[hostname] = {};
    if (!config.hostnames[hostname][name]) config.hostnames[hostname][name] = [];

    if (config.hostnames[hostname][name].indexOf(branch) !== -1) {
        throw new Error(`This hostname already exists in "${name}#${branch}"`);
    } else {
        config.hostnames[hostname][name].push(branch);
    }

    saveAccountConfig(account, config);
}

export function removeSiteBinding(account: string, name: string, branch: string, hostname: string) {
    const config = getAccountConfig(account);

    if (!config.hostnames) return;
    if (!config.hostnames[hostname]) return;
    if (!config.hostnames[hostname][name]) return;

    config.hostnames[hostname][name] = config.hostnames[hostname][name].filter(f => f !== branch);

    if (config.hostnames[hostname][name].length === 0) delete config.hostnames[hostname][name];
    if (Object.getOwnPropertyNames(config.hostnames[hostname]).length === 0) delete config.modules[hostname];

    saveAccountConfig(account, config);
}

export function hashToUris(account: string, hash: string): string[] {
    const config = getAccountConfig(account);
    return config?.hashUris?.[hash] || [];
}

export function addHashUri(account: string, hash: string, uri: string) {
    const config = getAccountConfig(account);

    if (!config.hashUris) config.hashUris = {};
    if (!config.hashUris[hash]) config.hashUris[hash] = [];

    if (config.hashUris[hash].indexOf(uri) !== -1) {
        throw new Error(`This URI already exists in this hash.`);
    } else {
        config.hashUris[hash].push(uri);
    }

    saveAccountConfig(account, config);
}

export function removeHashUri(account: string, hash: string, uri: string) {
    const config = getAccountConfig(account);

    if (!config.hashUris) return;
    if (!config.hashUris[hash]) return;

    config.hashUris[hash] = config.hashUris[hash].filter(u => u !== uri);

    if (config.hashUris[hash].length === 0) delete config.hashUris[hash];

    saveAccountConfig(account, config);
}