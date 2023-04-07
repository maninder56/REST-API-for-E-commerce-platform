const request = require('supertest')
const app = require('../app')

// GET requets 
xdescribe('Products Routes for GET requets', () => {
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
xdescribe('Products Routes for GET requets', () => {
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
