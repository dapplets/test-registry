import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { app } from "../../src/app";
import { DATA_PATH } from "../../src/common/constants";
import fs from "fs";
import * as ethers from "ethers";
import { GLOBAL } from "../global";

const buf = fs.readFileSync('./test/data/manifest.json');
const id = ethers.utils.keccak256(new Uint8Array(buf)).substring(2);
GLOBAL.FILE_MANIFEST_ID = id;
GLOBAL.FILE_MANIFEST_HASH = id;

const filePath = `${DATA_PATH}/storage/${GLOBAL.FILE_MANIFEST_ID}`;
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
        cb(null, Buffer.from(res.data, "binary"));
    });
};

export function fileCreation() {

    it("should return new file with its hash", function (done) {
        chai.request(app)
            .post(`/${GLOBAL.ACCOUNT_NAME}/storage`)
            .type('form')
            .attach('file', './test/data/manifest.json', 'manifest.json')
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).to.eql(GLOBAL.FILE_MANIFEST_ID);
                done();
            })
            .catch(done);
    });

    it("should return created file by hash", function (done) {
        // calling home page api
        chai.request(app)
            .get(`/${GLOBAL.ACCOUNT_NAME}/storage/${GLOBAL.FILE_MANIFEST_ID}`)
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

};

export function fileDeletion() {

    it("should return successful deletion operation", function (done) {
        chai.request(app)
            .delete(`/${GLOBAL.ACCOUNT_NAME}/storage/${GLOBAL.FILE_MANIFEST_ID}`)
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                done();
            })
            .catch(done);
    });

};