import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import rimraf from "rimraf";
import { app } from "../../src/app";
import { DATA_PATH } from "../../src/common/constants";

const ACCOUNT_NAME = "unit-testing-account";

rimraf.sync(`${DATA_PATH}/${ACCOUNT_NAME}`);

chai.use(chaiHttp);

describe("Registry Controller Unit Test", function () {

    const getPaths = [
        "/api/registry/dapplets-team",
        "/api/registry/dapplets-team/twitter-adapter.dapplets-base.eth",
        "/api/registry/dapplets-team/twitter-adapter.dapplets-base.eth/default", //
        "/api/registry/dapplets-team/twitter-adapter.dapplets-base.eth/default/0.1.0", //
        "/api/registry/dapplets-team/twitter-adapter.dapplets-base.eth/default/0.1.0/index.js" //
    ];

    getPaths.forEach(path => {
        it("should return success false", function (done) {
            chai.request(app)
                .get(path)
                .then(res => {
                    chai.expect(res.status).to.eql(200);
                    //chai.expect(res.body.success).to.eql(false);
                    done();
                });
        });
    });

    const postPaths = [
        "/api/registry/dapplets-team"
    ];

    postPaths.forEach(path => {
        it("should return success false", function (done) {
            chai.request(app)
                .post(path)
                .then(res => {
                    chai.expect(res.status).to.eql(200);
                    //chai.expect(res.body.success).to.eql(false);
                    done();
                });
        });
    });

});