import fs from "fs";
import { DATA_PATH } from "./constants";

const checkAccountKey = (name: string, key: string) => new Promise((resolve, reject) => {
    if (!name || !key) return resolve(false);

    if (!fs.existsSync(`${DATA_PATH}/${name}`)) {
        return resolve(false);
    }

    const existingKey = fs.readFileSync(`${DATA_PATH}/${name}/secret.key`, 'utf8');
    if (existingKey === key) {
        return resolve(true);
    } else {
        return resolve(false);
    }
});

const getDirectories = (source: string): string[] => fs.readdirSync(source, {
    withFileTypes: true
}).reduce((a: any, c) => {
    c.isDirectory() && a.push(c.name)
    return a;
}, [])

export { checkAccountKey, getDirectories };