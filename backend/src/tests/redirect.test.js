import supertest from 'supertest'
import assert from 'node:assert'
import helper from './test_helper'
import app from '../app'
import connectDB from '../config/db'
import URL from '../models/url'
import mongoose from 'mongoose'

const api = supertest(app)

describe('Redirect to url, /:shortId', () => {
  beforeEach(async () => {
    await connectDB()
    URL.deleteMany({})
  })

  it('should redirect to the longUrl', async () => {
    const urls = await helper.urlsInDB()
    const longUrl = 'https://www.google.com/'

    assert.strictEqual(urls.length, 0)

    const response = await api
      .post('/api')
      .send({ longUrl: longUrl })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const shortUrl = response.body.shortUrl

    const redirectResponse = await api
      .get(`/${shortUrl.split('/').pop()}`)
      .expect(302)

    assert.strictEqual(redirectResponse.header.location, longUrl)
  })

  it("should return 404 error when doesn't find the url", async () => {
    const urls = await helper.urlsInDB()

    assert.strictEqual(urls.length, 0)

    await api
      .post('/api')
      .send({ longUrl: 'https://www.google.com/' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api.get('/asd123').expect(404)
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })
})
