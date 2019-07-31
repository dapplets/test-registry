import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { app } from "../../../src/app";
import { GLOBAL } from "../../global";
import { getDefaultSettings } from "http2";

chai.use(chaiHttp);

export function registryCreationDeletion() {

    it("should add manifest to registry", function (done) {
        chai.request(app)
            .post(`/api/registry/${GLOBAL.ACCOUNT_NAME}/add-module?uri=${GLOBAL.FILE_MANIFEST_ID}`)
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                done();
            })
            .catch(done);
    });

    it("should return module versions list by name", function (done) {
        chai.request(app)
            .get(`/api/registry/${GLOBAL.ACCOUNT_NAME}/get-versions`)
            .query({
                name: GLOBAL.MODULE_NAME
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Array);
                chai.expect(res.body.data).contains(GLOBAL.MODULE_VERSION);
                done();
            })
            .catch(done);
    });

    it("should return module versions list by name and branch", function (done) {
        chai.request(app)
            .get(`/api/registry/${GLOBAL.ACCOUNT_NAME}/get-versions`)
            .query({
                name: GLOBAL.MODULE_NAME,
                branch: GLOBAL.MODULE_BRANCH
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Array);
                chai.expect(res.body.data).contains(GLOBAL.MODULE_VERSION);
                done();
            })
            .catch(done);
    });

    it("should resolve module uri by name and version", function (done) {
        chai.request(app)
            .get(`/api/registry/${GLOBAL.ACCOUNT_NAME}/resolve-to-uri`)
            .query({
                name: GLOBAL.MODULE_NAME,
                version: GLOBAL.MODULE_VERSION
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Array);
                chai.expect(res.body.data).contains(GLOBAL.FILE_MANIFEST_ID);
                done();
            })
            .catch(done);
    });

    it("should resolve module uri by name, branch and version", function (done) {
        chai.request(app)
            .get(`/api/registry/${GLOBAL.ACCOUNT_NAME}/resolve-to-uri`)
            .query({
                name: GLOBAL.MODULE_NAME,
                branch: GLOBAL.MODULE_BRANCH,
                version: GLOBAL.MODULE_VERSION
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Array);
                chai.expect(res.body.data).contains(GLOBAL.FILE_MANIFEST_ID);
                done();
            })
            .catch(done);
    });

    it("should add binding of branch with the site", function (done) {
        chai.request(app)
            .post(`/api/registry/${GLOBAL.ACCOUNT_NAME}/add-site-binding`)
            .query({
                name: GLOBAL.MODULE_NAME,
                branch: GLOBAL.MODULE_BRANCH,
                site: GLOBAL.BINDING_SITE
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                done();
            })
            .catch(done);
    });

    it("should return available features by hostname", function (done) {
        chai.request(app)
            .get(`/api/registry/${GLOBAL.ACCOUNT_NAME}/get-features`)
            .query({
                hostname: GLOBAL.BINDING_SITE
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Object);
                chai.expect(res.body.data).haveOwnProperty(GLOBAL.MODULE_NAME);
                chai.expect(res.body.data[GLOBAL.MODULE_NAME]).instanceOf(Array);
                chai.expect(res.body.data[GLOBAL.MODULE_NAME]).contains(GLOBAL.MODULE_BRANCH);
                done();
            })
            .catch(done);
    });

    it("should remove binding of branch with the site", function (done) {
        chai.request(app)
            .post(`/api/registry/${GLOBAL.ACCOUNT_NAME}/remove-site-binding`)
            .query({
                name: GLOBAL.MODULE_NAME,
                branch: GLOBAL.MODULE_BRANCH,
                site: GLOBAL.BINDING_SITE
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                done();
            })
            .catch(done);
    });

    it("should not return available features by hostname", function (done) {
        chai.request(app)
            .get(`/api/registry/${GLOBAL.ACCOUNT_NAME}/get-features`)
            .query({
                hostname: GLOBAL.BINDING_SITE
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Object);

                chai.expect(res.body.data).satisfy((data: any) => {
                    if (!data[GLOBAL.MODULE_NAME]) return true;
                    if (!(data[GLOBAL.MODULE_NAME] instanceof Array)) return false;
                    if (data[GLOBAL.MODULE_NAME].indexOf(GLOBAL.MODULE_BRANCH) === -1) return true;
                    return false;
                });
                done();
            })
            .catch(done);
    });

    it("should remove manifest from registry", function (done) {
        chai.request(app)
            .post(`/api/registry/${GLOBAL.ACCOUNT_NAME}/remove-module`)
            .query({
                name: GLOBAL.MODULE_NAME,
                branch: GLOBAL.MODULE_BRANCH,
                version: GLOBAL.MODULE_VERSION
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                done();
            })
            .catch(done);
    });

    it("should not return module versions list by name and branch", function (done) {
        chai.request(app)
            .get(`/api/registry/${GLOBAL.ACCOUNT_NAME}/get-versions`)
            .query({
                name: GLOBAL.MODULE_NAME,
                branch: GLOBAL.MODULE_BRANCH
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);

                chai.expect(res.body.data).satisfy((data: any) => {
                    if (!data) return true;
                    if (!(data instanceof Array)) return false;
                    if (data.indexOf(GLOBAL.MODULE_BRANCH) === -1) return true;
                    return false;
                });
                done();
            })
            .catch(done);
    });
    

    it("should not resolve module uri by name, branch and version", function (done) {
        chai.request(app)
            .get(`/api/registry/${GLOBAL.ACCOUNT_NAME}/get-versions`)
            .query({
                name: GLOBAL.MODULE_NAME,
                branch: GLOBAL.MODULE_BRANCH,
                version: GLOBAL.MODULE_VERSION
            })
            .then(res => {
                chai.assert.equal(res.status, 200);
                chai.expect(res.body.success).to.eql(true);
                chai.expect(res.body.data).instanceOf(Array);
                chai.expect(res.body.data).length(0);
                done();
            })
            .catch(done);
    });

    const getErrorPaths = [
        "/api/registry/dapplets-team/get-versions",
        "/api/registry/dapplets-team/resolve-to-uri?name=twitter-feature-1.dapplet-base.eth",
        "/api/registry/dapplets-team/resolve-to-uri?version=0.1.0",
        "/api/registry/dapplets-team/resolve-to-uri?name=twitter-feature-1.dapplet-base.eth&branch=default",
        "/api/registry/dapplets-team/resolve-to-uri?version=0.1.0&branch=default",
        "/api/registry/dapplets-team/get-features",
        "/api/registry/get-versions",
        "/api/registry/resolve-to-uri?name=twitter-feature-1.dapplet-base.eth",
        "/api/registry/resolve-to-uri?version=0.1.0",
        "/api/registry/resolve-to-uri?name=twitter-feature-1.dapplet-base.eth&branch=default",
        "/api/registry/resolve-to-uri?version=0.1.0&branch=default",
        "/api/registry/get-features"
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
        "/api/registry/dapplets-team/add-module",
        "/api/registry/dapplets-team/add-site-binding?name=twitter-adapter-1.dapplet-base.eth",
        "/api/registry/dapplets-team/add-site-binding?site=twitter.com",
        "/api/registry/add-module",
        "/api/registry/add-site-binding?name=twitter-adapter-1.dapplet-base.eth",
        "/api/registry/add-site-binding?site=twitter.com"
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

};