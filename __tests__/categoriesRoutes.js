const request = require('supertest')
const app = require('../app')

// GET requets 
describe('categories Routes for GET requets', () => {
    let encodedCredentials;

    beforeAll(() => {
        const username = 'user2';
        const password = '12345';
    
        encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
      });
    
  it('should get all the categories', async () => {
    const res = await request(app.callback())
      .get('/api/v1/categories')
    expect(res.statusCode).toEqual(200)
    expect(res.body.links)
    expect(res.body.categories)
  })

  it('should get one categoty with Authorization', async () => {
    const res = await request(app.callback())
      .get('/api/v1/categories/1')
      .set('Authorization', `Basic ${encodedCredentials}`);
    expect(res.statusCode).toEqual(200)
    expect(res.body.links)
    expect(res.body.categoty)
  })

  it('should not get categoty without Authorization', async () => {
    const res = await request(app.callback())
      .get('/api/v1/categories/1')
    expect(res.statusCode).toEqual(401)
  })

});


// POST requests

describe('categories Routes for POST requets', () => {
    let encodedCredentials;
  
      beforeAll(() => {
          const username = 'user2';
          const password = '12345';
      
          encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        });
  
  
    it('should not create a new category without Authorization', async () => {
      const res = await request(app.callback())
        .post('/api/v1/categories')
        .send({
          category_name : "new category",
          category_description : "new category test",
        })
      expect(res.statusCode).toEqual(401)
    })
  
    it('should create one category with Authorization and valid data', async () => {
      const res = await request(app.callback())
        .post('/api/v1/categories/')
        .send({
          category_name : "new category",
          category_description : "new category test",
        })
        .set('Authorization', `Basic ${encodedCredentials}`);
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('created', true)
    })
  
    it('should not create one category with unvalid data', async () => {
      const res = await request(app.callback())
        .post('/api/v1/categories/')
        .send({
          category_description : "new category test",
        })
        .set('Authorization', `Basic ${encodedCredentials}`);
      expect(res.statusCode).toEqual(400)
      expect(res.body.message)
    })
  
  });
  


// PUT requets 
describe('categories Routes for PUT requets', () => {
    let encodedCredentials;
  
      beforeAll(() => {
          const username = 'user2';
          const password = '12345';
      
          encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        });
  
  
    it('should not update any category without correct id', async () => {
      const res = await request(app.callback())
        .put('/api/v1/categories/200')
        .send({
          category_name : "new category",
          category_description : "new category test",
        }).set('Authorization', `Basic ${encodedCredentials}`);
      expect(res.statusCode).toEqual(404)
    })
  
    it('should update one category with correct id', async () => {
      const res = await request(app.callback())
        .put('/api/v1/categories/1')
        .send({
          category_name : "new category",
          category_description : "new category test",
        })
        .set('Authorization', `Basic ${encodedCredentials}`);
        
      expect(res.statusCode).toEqual(201)
    })
  
    it('should not update category with unvalid data', async () => {
      const res = await request(app.callback())
        .put('/api/v1/categories/1')
        .send({
          category_description : "new category test",
        })
        .set('Authorization', `Basic ${encodedCredentials}`);
      expect(res.statusCode).toEqual(400)
    })
  
  });
  