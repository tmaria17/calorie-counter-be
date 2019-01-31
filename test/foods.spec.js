const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe('GET /api/v1/foods', () => {
 it('should return all of the foods', done => {
    chai.request(server)
      .get('/api/v1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Burger');
        response.body[0].should.have.property('calories');
        response.body[0].calories.should.equal(365);
        done();
      });
    });
  });

});