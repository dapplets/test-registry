var request = require("supertest");
var should = require("should");
var app = require("../src/app");

describe("Unit test", function () {

  const getPaths = [
    "/api/modules",
    "/api/modules/dapplets-team",
    "/api/modules/dapplets-team/twitter-adapter.dapplets-base.eth",
    "/api/modules/dapplets-team/twitter-adapter.dapplets-base.eth/default",
    "/api/modules/dapplets-team/twitter-adapter.dapplets-base.eth/default/0.1.0",
    "/api/modules/dapplets-team/twitter-adapter.dapplets-base.eth/default/0.1.0/index.js",
    "/api/users"
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
    "/api/modules/dapplets-team",
    "/api/users"
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