import { DATA_STORAGE_PATH } from "../common/constants";
import fs from "fs";
import crypto from "crypto";
import bs58 from "bs58";
import fetch from "node-fetch";

export async function getFile(url: string): Promise<ArrayBuffer> {
    const protocol = url.substring(0, url.indexOf(":"));

    switch (protocol) {
        case "http":
        case "https":
            return await (await fetch(url)).arrayBuffer();
        case "bzz":
            // ToDo: parametrize gateway url
            return await (await fetch("https://swarm-gateways.net/" + url)).arrayBuffer();
        default:
            return await new Promise<Buffer>((resolve, reject) =>
                fs.readFile(DATA_STORAGE_PATH + '/' + url, (err, buf) => err ? reject(err.message) : resolve(buf))
            );
    }
}

export async function saveFile(buf: ArrayBuffer): Promise<string> {
    const arr = new Uint8Array(buf);
    const hashFunction = Buffer.from('12', 'hex');
    const digest = crypto.createHash('sha256').update(arr).digest();
    const digestSize = Buffer.from(digest.byteLength.toString(16), 'hex');
    const combined = Buffer.concat([hashFunction, digestSize, digest]);
    const multihash = bs58.encode(combined);
    const id = multihash.toString();

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