const request = require('supertest')
const app = require('../app')

// GET requets 
describe('orders Routes for GET requets', () => {
    let encodedCredentials;

    beforeAll(() => {
        const username = 'user2';
        const password = '12345';
    
        encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
      });
    
  it('should not get all the orders without Authorization', async () => {
    const res = await request(app.callback())
      .get('/api/v1/orders/')
      console.log(res.body)
    expect(res.statusCode).toEqual(401)
  })

  it('should not get all the orders with Authorization', async () => {
    const res = await request(app.callback())
      .get('/api/v1/orders/')
      .set('Authorization', `Basic ${encodedCredentials}`);
    expect(res.statusCode).toEqual(200)
  })

  it('should get one categoty with Authorization', async () => {
    const res = await request(app.callback())
      .get('/api/v1/orders/1')
      .set('Authorization', `Basic ${encodedCredentials}`);
    expect(res.statusCode).toEqual(200)
    expect(res.body.links)
  })

  it('should not get categoty without Authorization', async () => {
    const res = await request(app.callback())
      .get('/api/v1/orders/1')
    expect(res.statusCode).toEqual(401)
  })

});
