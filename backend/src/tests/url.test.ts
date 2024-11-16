import supertest from 'supertest'
import assert from 'node:assert'
import helper from './test_helper'
import app from '../app'
const api = supertest(app)

describe('Create short url, /api', () => {
  it('should return a 400 error when no long URL is provided', async () => {
    const urls = helper.urlsInDB

    const response = await api
      .post('/api')
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('longUrl is required!'))
    assert.strictEqual(urls.length, 0)
  })
})
