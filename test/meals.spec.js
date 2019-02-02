const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes for Meals', () => {
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

  describe('GET /api/v1/meals/:meal_id/foods', () => {
    it('should return an array of meals with arrays of food objects', done => {
      chai.request(server)
      .get('/api/v1/meals/1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
         response.body.should.have.property('id');
         response.body.should.have.property('meal');
         response.body.should.have.property('foods');
         response.body.foods[0].should.have.property('id');
         response.body.foods[0].should.have.property('name');
         response.body.foods[0].should.have.property('calories');
         done();
        });
      });
    })

  describe('POST /api/v1/meals/:meal_id/foods/:food_id', () => {
    it('should successfully create a new MealFood resource', done => {
      chai.request(server)
        .post('/api/v1/meals/1/foods/1?date=1')
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('message');
          response.body.message.should.equal("Successfully added food to meal");
          done();
        });
      });
    it('should not  create a new food item to meal if food_id does not exist', done => {
       chai.request(server)
       .post('/api/v1/meals/1/foods/10000?date=100')
       .end((err, response) => {
         response.should.have.status(400);
         done();
       });
     });
    });

});