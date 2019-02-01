const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes for Foods', () => {
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
    it('should return all foods', done => {
       chai.request(server)
         .get('/api/v1/foods')
         .end((err, response) => {
           response.should.have.status(200);
           response.should.be.json;
           response.body.should.be.a('array');
           response.body.length.should.equal(3);
           response.body[0].should.have.property('name');
           response.body[0].should.have.property('calories');
           response.body[0].name.should.equal('Burger');
           response.body[0].calories.should.equal(365);
           done();
         });
       });
     });

  describe('GET /api/v1/foods/:id', () => {
    it('should return a specific food', done => {
       chai.request(server)
         .get('/api/v1/foods/2')
         .end((err, response) => {
           response.should.have.status(200);
           response.should.be.json;
           response.body.should.be.a('object');
           response.body.should.have.property('name');
           response.body.should.have.property('calories');
           response.body.name.should.equal('Yogurt');
           response.body.calories.should.equal(100);
           done();
         });
       });
    });
  describe('POST /api/v1/foods',() => {
    it('should return info for the new food', done => {
      chai.request(server)
      .post('/api/v1/foods')
      .send({
         "name": "Chocolate Frogs",
         "calories": 92
       })
       .end((err,response) => {
         response.should.have.status(201);
         response.should.be.json;
         response.body.should.be.a('object');
         response.body.should.have.property('food');
         response.body.food.should.have.property('name');
         response.body.food.should.have.property('calories');
         response.body.food.calories.should.equal(92);
         response.body.food.name.should.equal('Chocolate Frogs');
         done();
       });
    });
  });

  describe('PATCH /api/v1/foods',() => {
    it('should return updated food info', done => {
      chai.request(server)
      .patch('/api/v1/foods/4')
      .send({
         "name": "Chocolate Froggos",
         "calories": 100
       })
       .end((err,response) => {
         response.should.have.status(201);
         response.should.be.json;
         response.body.should.be.a('object');
         response.body.should.have.property('food');
         response.body.food.should.have.property('name');
         response.body.food.should.have.property('calories');
         response.body.food.calories.should.equal(100);
         response.body.food.name.should.equal('Chocolate Froggos');
       });
       done();
    });
  });

});
