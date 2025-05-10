const request = require('supertest')
const app = require('../app')

describe('GET /', () => {
  it('should return index view', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('Express')
  })
})
