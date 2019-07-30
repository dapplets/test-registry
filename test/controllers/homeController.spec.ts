import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import rimraf from "rimraf";
import { app } from "../../src/app";
import { DATA_PATH } from "../../src/common/constants";

const ACCOUNT_NAME = "unit-testing-account";

rimraf.sync(`${DATA_PATH}/${ACCOUNT_NAME}`);

chai.use(chaiHttp);

describe("Home Controller Unit Test", function () {

    it("should return homepage", function (done) {
        chai.request(app)
            .get("/")
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                done();
            });
    });
});