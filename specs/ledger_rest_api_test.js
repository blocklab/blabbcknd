var request = require('supertest');

var server = require('../src/boundaries/delivery/ledger_rest_api').start();

describe('Rest API', function () {
  var token;

  before(function(done) {
    this.timeout(4000);
    require('../src/boundaries/blockchain/web3_setup')().then(function() {
      done();
    });
  });

  it('receives token with valid credentials', function (done) {
    request(server)
      .post('/auth')
      .send(
        {
          email : "mail0@test.com",
          password: "pw0"
        }
      )
      .expect(200)
      .end(function(error, response) {
        token = response.text;
        expect(token).to.contain('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9');
        done();
    });
  });

  var ownerAccountId;

  it('can read all ledger entries', function(done) {
    this.timeout(5000);
    request(server)
      .get('/ledgers')
      .set('Authorization', token)
      .expect(200)
      .end(function(error, response) {
        ownerAccountId = response.body[0].ethereumAddress;
        expect(response.body.length).to.equal(10);
        done();
      });
  });

  it('can read single ledger entry', function(done) {
    request(server)
      .get('/ledgers/' + ownerAccountId)
      .set('Authorization', token)
      .expect(200)
      .end(function (error, response) {
        expect(response.body.tokenAmount).to.equal('10000');
        done();
      })
  });

});