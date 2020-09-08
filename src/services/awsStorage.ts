import { DATA_STORAGE_PATH } from "../common/constants";
import * as ethers from "ethers";
import Minio from 'minio';
import streamToBuffer from 'stream-to-buffer';

export async function getFile(hash: string): Promise<ArrayBuffer> {
    const client = _getAwsClient();
    // const { metaData } = await client.statObject(process.env.SCALEWAY_BUCKET_NAME as string, hash);
    const dataStream = await client.getObject(process.env.SCALEWAY_BUCKET_NAME as string, hash);
    const buffer: Buffer = await new Promise((res, rej) => streamToBuffer(dataStream, (err: any, result: any) => err ? rej(err) : res(result)));
    return buffer.buffer;
}

export async function saveFile(buf: ArrayBuffer): Promise<string> {
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