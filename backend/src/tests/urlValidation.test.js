import supertest from 'supertest'
import assert from 'node:assert'
import helper from './test_helper'
import app from '../app'
import connectDB from '../config/db'
import URL from '../models/url'
import mongoose from 'mongoose'

const api = supertest(app)

describe('shortenUrl - URL Validation', () => {
  beforeEach(async () => {
    await connectDB()
    URL.deleteMany({})
  })
  it('should return 400 if no URL is provided', async () => {
    const response = await api.post('/api').send({}).expect(400)

    expect(response.body.error).toBe('longUrl is required!')
  })

  it('should return 400 if an invalid URL is provided', async () => {
    const response = await api
      .post('/api')
      .send({ longUrl: 'invalid-url' })
      .expect(400)

    expect(response.body.error).toBe('Invalid URL format!')
  })

  it('should accept a valid URL', async () => {
    const urls = await helper.urlsInDB()

    assert.strictEqual(urls.length, 0)

    const response = await api
      .post('/api')
      .send({ longUrl: 'https://www.google.com' })
      .expect(201)

    expect(response.body.shortUrl).toBeDefined()
    expect(response.body.longUrl).toBe('https://www.google.com')
  })
})

afterEach(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})
