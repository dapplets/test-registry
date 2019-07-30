import { DATA_PATH } from "../common/constants";
import fs from "fs";
import crypto from "crypto";
import bs58 from "bs58";

export class StorageService {
    private _storagePath = DATA_PATH + '/storage';

    public async get(id: string): Promise<ArrayBuffer> {
        const path = this._storagePath + '/' + id;
        const buf = await new Promise<Buffer>((resolve, reject) =>
            fs.readFile(path, (err, buf) => err ? reject(err.message) : resolve(buf))
        );
        return buf;
    }

    public async save(buf: ArrayBuffer): Promise<string> {
        const arr = new Uint8Array(buf);
        const hashFunction = Buffer.from('12', 'hex');
        const digest = crypto.createHash('sha256').update(arr).digest();
        const digestSize = Buffer.from(digest.byteLength.toString(16), 'hex');
        const combined = Buffer.concat([hashFunction, digestSize, digest]);
        const multihash = bs58.encode(combined);
        const id = multihash.toString();

        const path = this._storagePath + '/' + id;

        await new Promise<Buffer>((resolve, reject) =>
            fs.writeFile(path, buf, (err) => err ? reject(err.message) : resolve())
        );

        return id;
    }

    public async delete(id: string) : Promise<void> {
        const path = this._storagePath + '/' + id;
        await new Promise<Buffer>((resolve, reject) =>
            fs.unlink(path, (err) => err ? reject(err.message) : resolve())
        );
    }
}