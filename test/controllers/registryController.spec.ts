import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { app } from "../../src/app";

const ACCOUNT_NAME = "unit-testing-account";

chai.use(chaiHttp);

describe("Registry Controller Unit Test", function () {

    const getPaths = [
        "/api/registry/dapplets-team/get-versions?name=twitter-feature-1.dapplet-base.eth",
        "/api/registry/dapplets-team/get-versions?name=twitter-feature-1.dapplet-base.eth&branch=default",
        "/api/registry/dapplets-team/resolve-to-uri?name=twitter-feature-1.dapplet-base.eth&branch=default&version=0.1.0",
        "/api/registry/dapplets-team/get-features?hostname=twitter.com"
    ];

    getPaths.forEach(path => {
        it("should return 200 OK", function (done) {
            chai.request(app)
                .get(path)
                .then(res => {
                    chai.assert.equal(res.status, 200);
                    //chai.expect(res.body.success).to.eql(false);
                    done();
                })
                .catch(done);
        });
    });

    const postPaths = [
        "/api/registry/dapplets-team/add-module",
        "/api/registry/dapplets-team/add-site-binding?name=twitter-adapter-1.dapplet-base.eth&branch=default&site=twitter.com"
    ];

    postPaths.forEach(path => {
        it("should return 200 OK", function (done) {
            chai.request(app)
                .post(path)
                .then(res => {
                    chai.assert.equal(res.status, 200);
                    //chai.expect(res.body.success).to.eql(false);
                    done();
                })
                .catch(done);
        });
    });

    const getErrorPaths = [
        "/api/registry/dapplets-team/get-versions?name=twitter-feature-1.dapplet-base.eth",
        "/api/registry/dapplets-team/get-versions?name=twitter-feature-1.dapplet-base.eth&branch=default",
        "/api/registry/dapplets-team/resolve-to-uri?name=twitter-feature-1.dapplet-base.eth&branch=default&version=0.1.0",
        "/api/registry/dapplets-team/get-features?hostname=twitter.com"
    ];

    getErrorPaths.forEach(path => {
        it("should return ERROR", function (done) {
            chai.request(app)
                .get(path)
                .then(res => {
                    chai.assert.notEqual(res.status, 200);
                    //chai.expect(res.body.success).to.eql(false);
                    done();
                })
                .catch(done);
        });
    });

    const postErrorPaths = [
        "/api/registry/dapplets-team/add-module?uri=hash",
        "/api/registry/dapplets-team/add-site-binding?name=twitter-adapter-1.dapplet-base.eth&branch=default&site=twitter.com"
    ];

    postErrorPaths.forEach(path => {
        it("should return ERROR", function (done) {
            chai.request(app)
                .post(path)
                .then(res => {
                    chai.assert.notEqual(res.status, 200);
                    //chai.expect(res.body.success).to.eql(false);
                    done();
                })
                .catch(done);
        });
    });

});