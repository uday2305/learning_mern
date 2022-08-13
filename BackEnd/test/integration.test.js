let User = require("../model/user");
let chai = require('chai');
let chaiHttp  = require('chai-http');
let server = require("../main");
let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);

describe('Testing  Shop24X7 app Rest Api', () => {
    it('should  return status 404 for invalid urls',function(done){
        chai
            .request(server)
            .get('/')
            .then(function(res){
                expect(res).to.have.status(404);
                done();
            })
            .catch(function(err){
                fail(err);
            })
    });
    it('should  return status 200 on successful registration',function(done){
        User.deleteMany({}, (err) => {
            let user = { username: '123', password: '123',email:'abc@example.com' };
            chai
                .request(server)
                .post('/api/v1/register')
                .send(user)
                .then(function(res){
                    expect(res).to.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status");
                    res.body.status.should.be.eq("User created successfully");
                    done();
                })
                .catch(function(err){
                    fail(err);
                })
          });
    });
    it('should  return status 400 on un-successful registration as request is not good',function(done){
        let user = { username: '123', password: '123',email:'abc@example.com' };
        chai
            .request(server)
            .post('/api/v1/register')
            .send(user)//With the same emails already a document exists.
            .then(function(res){
                expect(res).to.have.status(400);
                done();
            })
            .catch(function(err){
                fail(err);
            })
    });
    it('should  return status 200 on successfull login with token and userid in response body',function(done){
        chai
            .request(server)
            .post('/api/v1/login')
            .send({ username: '123', password: '123'})
            .then(function(res){
                expect(res).to.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("token");
                res.body.should.have.property("userid");
                expect(res.body.token).to.be.not.eq(undefined);
                expect(res.body.token).to.be.not.eq(null);
                expect(res.body.userid).to.be.not.eq(undefined);
                expect(res.body.userid).to.be.not.eq(null);
                done();
            })
            .catch(function(err){
                fail(err);
            })
    });
    it('should  return status 404 on un-successfull login as no user exists with passed data',function(done){
        chai
            .request(server)
            .post('/api/v1/login')
            .send({ username: 'some-thing', password: '123'})
            .then(function(res){
                expect(res).to.have.status(404);
                done();
            })
            .catch(function(err){
                fail(err);
            })
    });
    it('should  return status 401 for missing authorization header',function(done){
        chai
            .request(server)
            .get('/api/v1/products')
            .then(function(res){
                expect(res).to.have.status(401);
                done();
            })
            .catch(function(err){
                fail(err);
            })
    });
    it('should  return status 401 for wrong authorization header value',function(done){
        chai
            .request(server)
            .get('/api/v1/products')
            .set('authorization', 'some_value')
            .then(function(res){
                expect(res).to.have.status(401);
                done();
            })
            .catch(function(err){
                fail(err);
            })
    });

    it('should  return status 200 for correct authorization header value with products in response',function(done){
        chai
            .request(server)
            .post('/api/v1/login')
            .send({ username: '123', password: '123'})
            .then(function(res){
                chai
                .request(server)
                .get('/api/v1/products')
                .set('authorization', res.body.token)
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.not.eq(undefined);
                    expect(res.body).to.be.not.eq(null);
                    done();
                })
                .catch(function(err){
                    throw(err)
                })
            })
            .catch(function(err){
                throw(err)
            })
        
    });
});