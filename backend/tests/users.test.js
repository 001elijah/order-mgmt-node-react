const request = require('supertest')
const app = require('../app')

describe('GET /users', () => {
  it('should return users response', async () => {
    const res = await request(app).get('/users')
    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('respond with a resource')
  })
})
