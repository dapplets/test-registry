import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { app } from "../../src/app";
import { DATA_PATH } from "../../src/common/constants";
import fs from "fs";
import crypto from "crypto";
import bs58 from "bs58";

const buf = fs.readFileSync('./test/data/test.txt');
const arr = new Uint8Array(buf);
const hashFunction = Buffer.from('12', 'hex');
const digest = crypto.createHash('sha256').update(arr).digest();
const digestSize = Buffer.from(digest.byteLength.toString(16), 'hex');
const combined = Buffer.concat([hashFunction, digestSize, digest]);
const multihash = bs58.encode(combined);
const id = multihash.toString();

const filePath = `${DATA_PATH}/storage/${id}`;
if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
}

chai.use(chaiHttp);

const binaryParser = function (res: any, cb: any) {
    res.setEncoding("binary");
    res.data = "";
    res.on("data", function (chunk: any) {
        res.data += chunk;
    });
    res.on("end", function () {
        cb(null, new Buffer(res.data, "binary"));
    });
};

describe("Storage Controller Unit Test", function () {

    it("should return new file with its hash", function (done) {
        chai.request(app)
            .post(`/api/storage`)
            .type('form')
            .attach('file', './test/data/test.txt', 'test.txt')
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).to.eql(id);
                done();
            })
            .catch(done);
    });

    it("should return created file by hash", function (done) {
        // calling home page api
        chai.request(app)
            .get("/api/storage/" + id)
            .send()
            .buffer()
            .parse(binaryParser)
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body).to.instanceOf(Buffer);
                chai.expect(res.body).to.eql(buf);
                done();
            })
            .catch(done);
    });

});