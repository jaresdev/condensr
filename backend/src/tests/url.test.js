import supertest from 'supertest'
import assert from 'node:assert'
import helper from './test_helper'
import app from '../app'
import connectDB from '../config/db'
import URL from '../models/url'
import mongoose from 'mongoose'

const api = supertest(app)

describe('Create short url, /api', () => {
  beforeEach(async () => {
    await connectDB()
    URL.deleteMany({})
  })

  it('should create an short url', async () => {
    const urls = await helper.urlsInDB()

    assert.strictEqual(urls.length, 0)

    await api
      .post('/api')
      .send({ longUrl: 'https://www.google.com/' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const urlsAfterCreation = await helper.urlsInDB()

    assert.strictEqual(urlsAfterCreation.length, 1)
  })

  it('should return a 400 error when no long URL is provided', async () => {
    const urls = await helper.urlsInDB()

    const response = await api
      .post('/api')
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('longUrl is required!'))
    assert.strictEqual(urls.length, 0)
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })
})
