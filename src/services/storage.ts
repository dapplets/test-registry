import { DATA_STORAGE_PATH } from "../common/constants";
import fs from "fs";
import * as ethers from "ethers";

export async function getFile(id: string): Promise<ArrayBuffer> {
    return await new Promise<Buffer>((resolve, reject) =>
        fs.readFile(DATA_STORAGE_PATH + '/' + id, (err, buf) => err ? reject(err.message) : resolve(buf))
    );
}

export async function saveFile(buf: ArrayBuffer): Promise<string> {
    const id = ethers.utils.keccak256(new Uint8Array(buf)).substring(2);

    const path = DATA_STORAGE_PATH + '/' + id;
    if (fs.existsSync(path)) return id;

    await new Promise<Buffer>((resolve, reject) =>
        fs.writeFile(path, buf, (err) => err ? reject(err.message) : resolve())
    );

    return id;
}

export async function deleteFile(id: string): Promise<void> {
    const path = DATA_STORAGE_PATH + '/' + id;
    await new Promise<Buffer>((resolve, reject) =>
        fs.unlink(path, (err) => err ? reject(err.message) : resolve())
    );
}