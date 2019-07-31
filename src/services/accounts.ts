import { DATA_ACCOUNTS_PATH } from "../common/constants";
import fs from "fs";
import crypto from "crypto";
import { AuthError } from "../common/errors";
import { AccountConfig } from "../common/types";

export function getAccountList(): string[] {
    const accountNames = fs.readdirSync(DATA_ACCOUNTS_PATH)
        .map(n => n.substr(0, n.indexOf(".json")));
    return accountNames;
}

export function createAccount(name: string): string {
    if (fs.existsSync(`${DATA_ACCOUNTS_PATH}/${name}.json`)) {
        throw new Error("An account with the same name already exists.");
    }

    const key = crypto.randomBytes(64).toString('hex');

    const config: AccountConfig = {
        secret: key,
        modules: {},
        hostnames: {}
    };

    saveAccountConfig(name, config);

    return key;
}

export async function deleteAccount(name: string, key: string): Promise<void> {
    const isValidKey = checkAccountKey(name, key);
    if (!isValidKey) {
        throw new AuthError();
    }

    const path = `${DATA_ACCOUNTS_PATH}/${name}.json`;
    await new Promise<Buffer>((resolve, reject) =>
        fs.unlink(path, (err) => err ? reject(err.message) : resolve())
    );
}

export function checkAccountKey(name: string, key: string): boolean {
    if (!name || !key) return false;
    const config = getAccountConfig(name);

    if (config && config.secret && config.secret === key) {
        return true;
    } else {
        return false;
    }
}

export function getAccountConfig(account: string): AccountConfig {
    const configPath = DATA_ACCOUNTS_PATH + '/' + account + '.json';
    if (!fs.existsSync(configPath)) {
        throw new Error("The account doesn't exist.")
    }

    const json = fs.readFileSync(configPath, 'utf8');
    const config: AccountConfig = JSON.parse(json);
    return config;
}

export function saveAccountConfig(account: string, config: AccountConfig) {
    const configPath = DATA_ACCOUNTS_PATH + '/' + account + '.json';

    const json = JSON.stringify(config);
    fs.writeFileSync(configPath, json, 'utf8');
}