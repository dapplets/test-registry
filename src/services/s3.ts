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

export async function createPresignedPost(id: string) {
    const client = _getAwsClient();

    const x = client.listObjects(process.env.SCALEWAY_BUCKET_NAME as string, id);
    const isExists = await new Promise((res, rej) => {
        x.on('error', rej);
        x.on('data', () => res(true));
        x.on('end', () => res(false));
    })

    if (isExists) throw Error('Item with such ID already exists');

    const policy = client.newPostPolicy();
    policy.setBucket(process.env.SCALEWAY_BUCKET_NAME as string);
    policy.setKeyStartsWith(id);
    const presignedPolicy = await client.presignedPostPolicy(policy);
    return presignedPolicy;
}

function _getAwsClient() {
    return new Minio.Client({
        endPoint: process.env.SCALEWAY_ENDPOINT as string,
        accessKey: process.env.SCALEWAY_ACCESS_KEY as string,
        secretKey: process.env.SCALEWAY_SECRET_KEY as string,
        region: process.env.SCALEWAY_BUCKET_REGION as string
    });
}