import { getAccountConfig } from "./accounts";
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

export async function addModule(uri: string, hostnames?: string[]) {
    const buf = await getFile(uri);
    const enc = new TextDecoder("utf-8");
    const arr = new Uint8Array(buf);
    const json = enc.decode(arr);
    let m: Manifest = {};

    try {
        m = JSON.parse(json);
    } catch {
        throw new Error("Invalid manifest.");
    }

    if (!m.name || !m.branch || !m.version || !m.type || !m.dist || !m.icon || !m.title || !m.author || !m.description) {
        throw new Error("Not all required fields are filled in manifest.");
    }
}