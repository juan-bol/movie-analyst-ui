process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('UI', () => {

  /*
  * Test the /Simple test
  */
  describe('/Simple test', () => {
    it('it should always pass', (done) => {
      const foo = "bar";
      foo.should.be.a('string');
      foo.should.equal("bar");
      foo.should.have.lengthOf(3);
      done();
    });
  });

});
