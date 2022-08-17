let User = require("../model/user");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../main");
let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);

describe("Testing  Shop24X7 app Rest Api", () => {
  it("should  return status 404 for invalid urls", function (done) {
    chai
      .request(server)
      .get("/")
      .then(function (res) {
        expect(res).to.have.status(404);
        done();
      })
      .catch(function (err) {
        fail(err);
      });
  });
  it("should  return status 200 on successful registration", function (done) {
    let user = {
      firstName: "atest",
      lastName: "ztest",
      isAdmin: true,
      password: "12345678",
      email: "abc@example.com",
    };
    chai
      .request(server)
      .post("/api/v1/users/register")
      .set("content-type", "application/json")
      .send(user)
      .then(function (res) {
        expect(res).to.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.be.eq("user created successfully");
        done();
      })
      .catch(done);
  });
  it("should  return status 400 on un-successful registration as request is not good", function (done) {
    let user = {
      firstName: "atest",
      lastName: "ztest",
      password: "12345678",
      email: "abc@example.com",
    };
    chai
      .request(server)
      .post("/api/v1/users/register")
      .send(user) //With the same emails already a document exists.
      .then(function (res) {
        expect(res).to.have.status(400);
        done();
      })
      .catch(done);
  });
  it("should  return status 200 on successful login with token and userid in response body", function (done) {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .set("content-type", "application/json")
      .send({ email: "abc@example.com", password: "12345678" })
      .then(function (res) {
        expect(res).to.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("accessToken");
        res.body.should.have.property("firstName");
        res.body.should.have.property("isAdmin");
        expect(res.body.accessToken).to.be.not.eq(undefined);
        expect(res.body.accessToken).to.be.not.eq(null);
        expect(res.body.firstName).to.be.not.eq(undefined);
        expect(res.body.firstName).to.be.not.eq(null);
        done();
      })
      .catch(done);
  });
  it("should  return status 404 on un-successfull login as no user exists with passed data", function (done) {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .send({ email: "some-wrong", password: "123" })
      .then(function (res) {
        expect(res).to.have.status(404);
        done();
      })
      .catch(done);
  });
  it("should  return status 401 for missing authorization header", function (done) {
    chai
      .request(server)
      .get("/api/v1/profile")
      .then(function (res) {
        expect(res).to.have.status(401);
        done();
      })
      .catch(done);
  });
  it("should  return status 401 for wrong authorization header value", function (done) {
    chai
      .request(server)
      .get("/api/v1/profile")
      .set("content-type", "application/json")
      .set("authorization", "some_value")
      .then(function (res) {
        expect(res).to.have.status(401);
        done();
      })
      .catch(done);
  });

  it("should  return status 200 for correct authorization header value with profile in response", function (done) {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .set("content-type", "application/json")
      .send({ email: "abc@example.com", password: "12345678" })
      .then(function (res) {
        chai
          .request(server)
          .get("/api/v1/profile")
          .set("authorization", res.body.accessToken)
          .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.not.eq(undefined);
            expect(res.body).to.be.not.eq(null);
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  it("should return 200 with all users data with an admin login", function (done) {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .set("content-type", "application/json")
      .send({ email: "abc@example.com", password: "12345678" })
      .then(function (res) {
        chai
          .request(server)
          .get("/api/v1/admin/users")
          .set("authorization", res.body.accessToken)
          .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.not.eq(undefined);
            expect(res.body).to.be.not.eq(null);
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  it("should return 200 on delete of a user with admin login", function (done) {
    chai
      .request(server)
      .post("/api/v1/users/login")
      .set("content-type", "application/json")
      .send({ email: "abc@example.com", password: "12345678" })
      .then(function (res) {
        let accessToken = res.body.accessToken;
        chai
          .request(server)
          .get("/api/v1/admin/users")
          .set("authorization", accessToken)
          .then(function (res) {
            let userId = res.body.users.find(function (user) {
              if (user.email === "abc@example.com") return user;
            })._id;
            chai
              .request(server)
              .delete(`/api/v1/admin/users/${userId}`)
              .set("authorization", accessToken)
              .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.not.eq(undefined);
                expect(res.body).to.be.not.eq(null);
                done();
              })
              .catch(done);
          })
          .catch(done);
      })
      .catch(done);
  });
});
