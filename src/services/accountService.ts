import { DATA_ACCOUNTS_PATH } from "../common/constants";
import fs from "fs";
import crypto from "crypto";
import { AuthError } from "../common/errors";

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

        const config = {
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
        const isValidKey = await this.checkKey(name, key);
        if (!isValidKey) {
            throw new AuthError();
        }

        const path = `${DATA_ACCOUNTS_PATH}/${name}.json`;
        await new Promise<Buffer>((resolve, reject) =>
            fs.unlink(path, (err) => err ? reject(err.message) : resolve())
        );
    }

    public async checkKey(name: string, key: string) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!name || !key) return resolve(false);
        
            if (!fs.existsSync(`${DATA_ACCOUNTS_PATH}/${name}.json`)) {
                return resolve(false);
            }
        
            const configJson = fs.readFileSync(`${DATA_ACCOUNTS_PATH}/${name}.json`, 'utf8');
            const config = JSON.parse(configJson);
            if (config && config.secret && config.secret === key) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    }
}