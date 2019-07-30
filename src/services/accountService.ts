import { DATA_PATH } from "../common/constants";
import { getDirectories, checkAccountKey } from "../common/helpers";
import fs from "fs";
import crypto from "crypto";
import rimraf = require("rimraf");
import { AuthError } from "../common/errors";

export class AccountService {
    public getList() : string[] {
        const accountNames = getDirectories(DATA_PATH);
        return accountNames;
    }

    public async create(name: string) : Promise<string> {
        if (fs.existsSync(`${DATA_PATH}/${name}`)) {
            throw new Error("An account with the same name already exists.");
        }
    
        const key = crypto.randomBytes(64).toString('hex');
    
        fs.mkdirSync(`${DATA_PATH}/${name}`);
    
        await new Promise((resolve, reject) => {
            fs.writeFile(`${DATA_PATH}/${name}/secret.key`, key, 'utf8', (err) => {
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
        const isValidKey = await checkAccountKey(name, key);
        if (!isValidKey) {
            throw new AuthError();
        }

        // account's folder removing
        rimraf.sync(`${DATA_PATH}/${name}`);
    }
}