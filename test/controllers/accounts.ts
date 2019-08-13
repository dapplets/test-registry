import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { app } from "../../src/app";
import { DATA_ACCOUNTS_PATH } from "../../src/common/constants";
import fs from "fs";
import { GLOBAL } from "../global";

const DATA_TEST_ACCOUNT_PATH = DATA_ACCOUNTS_PATH + '/' + GLOBAL.ACCOUNT_NAME + '.json';

if (fs.existsSync(DATA_TEST_ACCOUNT_PATH)) {
    fs.unlinkSync(DATA_TEST_ACCOUNT_PATH);
}

chai.use(chaiHttp);

export function accountCreation() {
    it("should return new account with auth key", function (done) {
        // calling home page api
        chai.request(app)
            .post(`/accounts/${GLOBAL.ACCOUNT_NAME}`)
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data.name).to.eql(GLOBAL.ACCOUNT_NAME);
                chai.expect(res.body.data).haveOwnProperty('key');
                GLOBAL.ACCOUNT_KEY = res.body.data.key;
                done();
            })
            .catch(done);
    });

    it("should return account list with created account", function (done) {
        // calling home page api
        chai.request(app)
            .get("/accounts")
            .send({ name: GLOBAL.ACCOUNT_NAME })
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Array);

                chai.expect((!!res.body.data.find((f: any) => f === GLOBAL.ACCOUNT_NAME))).to.eql(true);
                done();
            })
            .catch(done);
    });
};

export function accountDeletion() {
    it("should return invalid key error", function (done) {
        // calling home page api
        chai.request(app)
            .delete("/accounts/" + GLOBAL.ACCOUNT_NAME)
            .then(res => {
                chai.expect(res.status).to.eql(401);
                chai.expect(res.body.success).to.eql(false);
                done();
            })
            .catch(done);
    });

    it("should return succesfull deletion", function (done) {
        // calling home page api
        chai.request(app)
            .delete("/accounts/" + GLOBAL.ACCOUNT_NAME + '?key=' + GLOBAL.ACCOUNT_KEY)
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                done();
            })
            .catch(done);
    });
};