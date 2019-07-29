var request = require("supertest");
var should = require("should");
var app = require("../src/app");
var rimraf = require("rimraf");
const { DATA_PATH } = require('../src/constants'); 

const ACCOUNT_NAME = "unit-testing-account";

rimraf.sync(`${DATA_PATH}/${ACCOUNT_NAME}`);

describe("Unit test", function () {

    it("should return homepage", function (done) {
        // calling home page api
        request(app)
            .get("/")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });

    const getPaths = [
        "/api/modules",
        "/api/modules/dapplets-team",
        "/api/modules/dapplets-team/twitter-adapter.dapplets-base.eth",
        "/api/modules/dapplets-team/twitter-adapter.dapplets-base.eth/default",
        "/api/modules/dapplets-team/twitter-adapter.dapplets-base.eth/default/0.1.0",
        "/api/modules/dapplets-team/twitter-adapter.dapplets-base.eth/default/0.1.0/index.js"
    ];

    getPaths.forEach(path => {
        it("should return success false", function (done) {
            // calling home page api
            request(app)
                .get(path)
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });

    const postPaths = [
        "/api/modules/dapplets-team"
    ];

    postPaths.forEach(path => {
        it("should return success false", function (done) {
            // calling home page api
            request(app)
                .post(path)
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    res.body.success.should.equal(false);
                    done();
                });
        });
    });

});

describe("Account creation and deletion", function () {
    let key = null;

    it("should return new account with auth key", function (done) {
        // calling home page api
        request(app)
            .post(`/api/accounts/${ACCOUNT_NAME}`)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.data.name.should.equal(ACCOUNT_NAME);
                res.body.data.should.have.property('key');
                key = res.body.data.key;
                done();
            });
    });

    it("should return account list with created account", function (done) {
        // calling home page api
        request(app)
            .get("/api/accounts")
            .send({ name: ACCOUNT_NAME })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.data.should.be.instanceof(Array);

                (!!res.body.data.find(f => f.name === ACCOUNT_NAME)).should.equal(true);
                done();
            });
    });

    it("should return invalid key error", function (done) {
        // calling home page api
        request(app)
            .delete("/api/accounts/" + ACCOUNT_NAME)
            .expect("Content-type", /json/)
            .expect(401)
            .end(function (err, res) {
                res.status.should.equal(401);
                res.body.success.should.equal(false);
                done();
            });
    });

    it("should return succesfull deletion", function (done) {
        // calling home page api
        request(app)
            .delete("/api/accounts/" + ACCOUNT_NAME + '?key=' + key)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });
    });

});