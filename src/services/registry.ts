import { getAccountConfig, saveAccountConfig } from "./accounts";
import { getFile } from "./storage";
import { Manifest } from "../common/types";

export function getModuleVersions(account: string, name: string, branch: string): string[] {
    const config = getAccountConfig(account);

    if (!config || !config.modules || !config.modules[name] || !config.modules[name][branch]) {
        return [];
    }

    const versions = Object.getOwnPropertyNames(config.modules[name][branch]);

    return versions;
}

export function resolveModuleToUris(account: string, name: string, branch: string, version: string): string[] {
    const config = getAccountConfig(account);

    if (!config || !config.modules || !config.modules[name] || !config.modules[name][branch] || !config.modules[name][branch][version]) {
        return [];
    }

    const uris = config.modules[name][branch][version];

    return uris;
}

export function getFeatures(account: string, hostname: string): { [name: string]: string[] } {
    const config = getAccountConfig(account);

    if (!config || !config.hostnames || !config.hostnames[hostname]) {
        return {};
    }

    const features = config.hostnames[hostname];

    return features;
}

export async function addModule(account: string, uri: string) {
    const buf = await getFile(uri);
    const arr = new Uint8Array(buf);
    const encodedString = String.fromCharCode.apply(null, Array.from(arr));
    const json = decodeURIComponent(escape(encodedString));
    let m: Manifest = {};

    try {
        m = JSON.parse(json);
    } catch {
        throw new Error("Invalid manifest.");
    }

    if (!m.name || !m.version || !m.type || !m.dist) {
        throw new Error("A module manifest must have filled name, version, type and dist fields.");
    }

    if (m.type === "FEATURE" && (!m.icon || !m.title || !m.author || !m.description)) {
        throw new Error("A feature manifest must have filled icon, title, author and description fields.");
    }

    if (!m.branch) m.branch = "default";

    const config = getAccountConfig(account);

    if (!config.modules) config.modules = {};
    if (!config.modules[m.name]) config.modules[m.name] = {};
    if (!config.modules[m.name][m.branch]) config.modules[m.name][m.branch] = {};
    if (!config.modules[m.name][m.branch][m.version]) config.modules[m.name][m.branch][m.version] = [uri];

    saveAccountConfig(account, config);
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
    config.hostnames[hostname][name].push(branch);

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