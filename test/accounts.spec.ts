import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import rimraf from "rimraf";
import { app } from "../src/app";
import { DATA_PATH } from "../src/constants";

const ACCOUNT_NAME = "unit-testing-account";

rimraf.sync(`${DATA_PATH}/${ACCOUNT_NAME}`);

chai.use(chaiHttp);

describe("Account creation and deletion", function () {
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

                chai.expect((!!res.body.data.find((f: any) => f.name === ACCOUNT_NAME))).to.eql(true);
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