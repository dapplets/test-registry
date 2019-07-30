import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { app } from "../../src/app";

chai.use(chaiHttp);

describe("Home Controller Unit Test", function () {

    it("should return homepage", function (done) {
        chai.request(app)
            .get("/")
            .then(res => {
                chai.expect(res.status).to.eql(200);
                chai.expect(res.body.success).to.eql(true);
                done();
            })
            .catch(done);
    });
});