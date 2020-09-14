import { DATA_STORAGE_PATH } from "../common/constants";
import * as ethers from "ethers";
import * as Minio from 'minio';
import Stream from 'stream';

export async function getFile(hash: string): Promise<Stream.Readable> {
    const client = _getAwsClient();
    return client.getObject(process.env.SCALEWAY_BUCKET_NAME as string, hash);
}

export async function saveFile(buf: Buffer): Promise<string> {
    const arr = new Uint8Array(buf);
    const hash = ethers.utils.keccak256(arr).replace('0x', '');
    const client = _getAwsClient();
    await client.putObject(process.env.SCALEWAY_BUCKET_NAME as string, hash, Buffer.from(buf), { 'Content-Type': 'application/octet-stream' });
    return hash;
}

function _getAwsClient() {
    return new Minio.Client({
        endPoint: process.env.SCALEWAY_ENDPOINT as string,
        accessKey: process.env.SCALEWAY_ACCESS_KEY as string,
        secretKey: process.env.SCALEWAY_SECRET_KEY as string,
        region: process.env.SCALEWAY_BUCKET_REGION as string
    });
}