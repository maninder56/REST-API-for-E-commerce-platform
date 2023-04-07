const request = require('supertest')
const app = require('../app')

// GET requets 
describe('Products Routes for GET requets', () => {
    let encodedCredentials;

    beforeAll(() => {
        const username = 'user2';
        const password = '12345';
    
        encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
      });
    
  it('should get all the products', async () => {
    const res = await request(app.callback())
      .get('/api/v1/products')
    expect(res.statusCode).toEqual(200)
    expect(res.body.links)
    expect(res.body.products)
  })

  it('should get one product with Authorization', async () => {
    const res = await request(app.callback())
      .get('/api/v1/products/1')
      .set('Authorization', `Basic ${encodedCredentials}`);
    expect(res.statusCode).toEqual(200)
    expect(res.body.links)
    expect(res.body.product)
  })

  it('should not get product without Authorization', async () => {
    const res = await request(app.callback())
      .get('/api/v1/products/1')
    expect(res.statusCode).toEqual(401)
  })

});


// POST requets 
describe('Products Routes for POST requets', () => {
  let encodedCredentials;

    beforeAll(() => {
        const username = 'user2';
        const password = '12345';
    
        encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
      });


  it('should not create a new product without Authorization', async () => {
    const res = await request(app.callback())
      .post('/api/v1/products')
      .send({
        product_name : "new product",
        product_description : "new product test",
        price: 300,
        category_id: 1
      })
    expect(res.statusCode).toEqual(401)
  })

  it('should create one product with Authorization and valid data', async () => {
    const res = await request(app.callback())
      .post('/api/v1/products/')
      .send({
        product_name : "new product",
        product_description : "new product test",
        price: 300,
        category_id: 1
      })
      .set('Authorization', `Basic ${encodedCredentials}`);
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })

  it('should not create one product with unvalid data', async () => {
    const res = await request(app.callback())
      .post('/api/v1/products/')
      .send({
        product_description : "new product test",
        price: 300,
        category_id: 1
      })
      .set('Authorization', `Basic ${encodedCredentials}`);
    expect(res.statusCode).toEqual(400)
    expect(res.body.message)
  })

});




// PUT requets 
describe('Products Routes for PUT requets', () => {
  let encodedCredentials;

    beforeAll(() => {
        const username = 'user2';
        const password = '12345';
    
        encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
      });


  it('should not update any product without correct id', async () => {
    const res = await request(app.callback())
      .put('/api/v1/products/200')
      .send({
        product_name : "new product",
        product_description : "new product test",
        price: 300,
        category_id: 1
      }).set('Authorization', `Basic ${encodedCredentials}`);
    expect(res.statusCode).toEqual(404)
  })

  it('should update one product with correct id', async () => {
    const res = await request(app.callback())
      .put('/api/v1/products/1')
      .send({
        product_name : "new product",
        product_description : "new product test",
        price: 300,
        category_id: 1
      })
      .set('Authorization', `Basic ${encodedCredentials}`);
      
    expect(res.statusCode).toEqual(201)
  })

  it('should not update product with unvalid data', async () => {
    const res = await request(app.callback())
      .put('/api/v1/products/1')
      .send({
        product_description : "new product test",
        price: 300,
        category_id: 1
      })
      .set('Authorization', `Basic ${encodedCredentials}`);
    expect(res.statusCode).toEqual(400)
  })

});


