/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Chicken Soup',
  summary: 'Delicious soup, an special recipe from my grandma',  
};

const diet = {
  name: 'Vegan'
}

describe('Api routes test', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));    
  describe('GET /api/recipes', () => {    
    it('should get 200', () =>
      agent.get('/api/recipes').expect(200)
    );
  });

  describe('GET /api/recipes/:id', () => {
    it('should reply the GET method /api/recipes/ with status code 404 if params is not a valid id', async () => {
      const response = await agent.get('/api/recipes/peanuts');
      expect(response.statusCode).to.equal(404);
    });
  })
  
  beforeEach(() => Diet.sync({ force: true })
    .then(() => Diet.create(diet)));    
  describe('GET /api/types', () => {    
    it('should get 200', () =>
      agent.get('/api/types').expect(200)
    );
  });
  
  describe('POST /api/recipe', () => {  
    it('should reply the POST method /api/recipe whith code 500 if name and summary is not sent', async () => {
      const res = await agent.post('/api/recipe').send({});
      expect(res.statusCode).to.equal(500);
      const res1 = await agent.post('/api/recipe').send({name: 'Ice Cream'});
      expect(res1.statusCode).to.equal(500);
    });  
    it('should reply the POST method /api/recipe with status code 200 if name, summary and dietTypes is sent', async () => {
      const res2 = await agent.post('/api/recipe').send({name: 'Ice Cream', summary: 'Refreshing option', dietTypes: 'vegan'});
      expect(res2.statusCode).to.equal(200);
    })  
  });
});




//{name: 'Mango Ice Cream', summary: 'Ice Cream', score: 50, healthScore: 50, steps: 'Buy it!'}


// it('should reply the POST method /bodyData with status code 200 if data is send', async () => {
//   const res = await request(app).post('/bodyData').send({arg1: 3, arg2: 7});
//   expect(res.statusCode).toBe(200);
// });



