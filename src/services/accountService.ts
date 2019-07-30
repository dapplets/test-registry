import { DATA_ACCOUNTS_PATH } from "../common/constants";
import fs from "fs";
import crypto from "crypto";
import { AuthError } from "../common/errors";
import { AccountConfig } from "../common/types";

export class AccountService {
    public getList() : string[] {
        const accountNames = fs.readdirSync(DATA_ACCOUNTS_PATH)
            .map(n => n.substr(0, n.indexOf(".json")));
        return accountNames;
    }

    public async create(name: string) : Promise<string> {
        if (fs.existsSync(`${DATA_ACCOUNTS_PATH}/${name}.json`)) {
            throw new Error("An account with the same name already exists.");
        }
    
        const key = crypto.randomBytes(64).toString('hex');

        const config: AccountConfig = {
            secret: key,
            modules: {},
            hostnames: {}
        };
    
        await new Promise((resolve, reject) => {
            fs.writeFile(`${DATA_ACCOUNTS_PATH}/${name}.json`, JSON.stringify(config), 'utf8', (err) => {
                if (err) {
                    reject("An error has occured.");
                } else {
                    resolve();
                }
            })
        });

        return key;
    }

    public async delete(name: string, key: string) {
        const isValidKey = this.checkKey(name, key);
        if (!isValidKey) {
            throw new AuthError();
        }

        const path = `${DATA_ACCOUNTS_PATH}/${name}.json`;
        await new Promise<Buffer>((resolve, reject) =>
            fs.unlink(path, (err) => err ? reject(err.message) : resolve())
        );
    }

    public checkKey(name: string, key: string) : boolean {
        if (!name || !key) return false;
        const config = this.getConfig(name);
        
        if (config && config.secret && config.secret === key) {
            return true;
        } else {
            return false;
        }
    }

    public getConfig(account: string): AccountConfig {
        const configPath = DATA_ACCOUNTS_PATH + '/' + account + '.json';
        if (!fs.existsSync(configPath)) {
            throw new Error("The account doesn't exist.")
        }

        const json = fs.readFileSync(configPath, 'utf8');
        const config: AccountConfig = JSON.parse(json);
        return config;
    }
}