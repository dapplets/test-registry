import { AccountService } from "./accountService";
import { StorageService } from "./storageService";
import { Manifest } from "../common/types";

export class RegistryService {
    private _accountService = new AccountService();
    private _storageService = new StorageService();

    public getVersions(account: string, name: string, branch: string): string[] {
        const config = this._accountService.getConfig(account);

        if (!config || !config.modules || !config.modules[name] || !config.modules[name][branch]) {
            return [];
        }

        const versions = Object.getOwnPropertyNames(config.modules[name][branch]);

        return versions;
    }

    public resolveToUris(account: string, name: string, branch: string, version: string): string[] {
        const config = this._accountService.getConfig(account);

        if (!config || !config.modules || !config.modules[name] || !config.modules[name][branch] || !config.modules[name][branch][version]) {
            return [];
        }

        const uris = config.modules[name][branch][version];

        return uris;
    }

    public getFeatures(account: string, hostname: string): { [name: string]: string[] } {
        const config = this._accountService.getConfig(account);

        if (!config || !config.hostnames || !config.hostnames[hostname]) {
            return {};
        }

        const features = config.hostnames[hostname];

        return features;
    }

    public async addModule(uri: string, hostnames?: string[]) {
        const buf = await this._storageService.get(uri);
        const enc = new TextDecoder("utf-8");
        const arr = new Uint8Array(buf);
        const json = enc.decode(arr);
        let m : Manifest = {};

        try {
            m = JSON.parse(json);
        } catch {
            throw new Error("Invalid manifest.");
        }

        if (!m.type || m.type !== "FEATURE") {
            throw new Error("Can not .");
        }

        if (!m.name || !m.branch || !m.version || !m.type || !m.dist || !m.icon || !m.title || !m.author || !m.description) {
            throw new Error("Not all required fields are filled in manifest.");
        }
    }
}