const request = require('supertest')
const app = require('../app')

xdescribe('Post new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        user_name: 'unique_112233',
        user_password: 'password',
        user_email: 'unique_email@example.com'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});


