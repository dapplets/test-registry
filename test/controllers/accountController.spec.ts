import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { app } from "../../src/app";
import { DATA_ACCOUNTS_PATH } from "../../src/common/constants";
import fs from "fs";

const ACCOUNT_NAME = "unit-testing-account";
const DATA_TEST_ACCOUNT_PATH = DATA_ACCOUNTS_PATH + '/' + ACCOUNT_NAME + '.json';

if (fs.existsSync(DATA_TEST_ACCOUNT_PATH)) {
    fs.unlinkSync(DATA_TEST_ACCOUNT_PATH);
}

chai.use(chaiHttp);

describe("Account Controller Unit Test", function () {
    let key: string = "";

    it("should return new account with auth key", function (done) {
        // calling home page api
        chai.request(app)
            .post(`/api/accounts/${ACCOUNT_NAME}`)
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data.name).to.eql(ACCOUNT_NAME);
                chai.expect(res.body.data).haveOwnProperty('key');
                key = res.body.data.key;
                done();
            });
    });

    it("should return account list with created account", function (done) {
        // calling home page api
        chai.request(app)
            .get("/api/accounts")
            .send({ name: ACCOUNT_NAME })
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Array);

                chai.expect((!!res.body.data.find((f: any) => f === ACCOUNT_NAME))).to.eql(true);
                done();
            });
    });

    it("should return invalid key error", function (done) {
        // calling home page api
        chai.request(app)
            .delete("/api/accounts/" + ACCOUNT_NAME)
            .then(res => {
                chai.expect(res.status).to.eql(401);
                chai.expect(res.body.success).to.eql(false);
                done();
            });
    });

    it("should return succesfull deletion", function (done) {
        // calling home page api
        chai.request(app)
            .delete("/api/accounts/" + ACCOUNT_NAME + '?key=' + key)
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                done();
            });
    });

});