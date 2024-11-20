import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from '../app'
import URL from '../models/url'

const api = supertest(app)

const longUrl = 'https://www.example.com'

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
})

beforeEach(async () => {
  await URL.deleteMany({})
})

describe('redirectToUrl', () => {
  it('should return 404 for a non-existent short URL', async () => {
    const response = await api.get('/nonexistentId').expect(404)

    expect(response.body.error).toBe('Short Url not found!')
  })

  it('should redirect to the original URL when accessing the short URL', async () => {
    const postResponse = await api.post('/api').send({ longUrl }).expect(201)
    const shortUrlId = postResponse.body.shortUrl.split('/').pop()

    const response = await api.get(`/${shortUrlId}`).expect(302)

    expect(response.header.location).toBe(longUrl)
  })
})

describe('shortenUrl - URL Validation', () => {
  it('should reject a blank URL', async () => {
    const response = await api.post('/api').expect(400)

    expect(response.body.error).toBe('longUrl is required!')
  })

  it('should reject a URL that exceeds 1000 characters', async () => {
    const exceededLongUrl = longUrl + 'a'.repeat(990)

    const response = await api
      .post('/api')
      .send({ longUrl: exceededLongUrl })
      .expect(400)

    expect(response.body.error).toBe(
      'URL is too long. Maximum length is 1000 characters.',
    )
  })

  it('should not create a new shortUrl if the long URL already exists', async () => {
    await api.post('/api').send({ longUrl }).expect(201)

    const response = await api.post('/api').send({ longUrl }).expect(200)

    expect(response.body.shortUrl).toBeDefined()
    expect(response.body.longUrl).toBe(longUrl)
  })

  it('should reject an invalid URL', async () => {
    const invalidUrl = 'invalid-url'

    const response = await api
      .post('/api')
      .send({ longUrl: invalidUrl })
      .expect(400)

    expect(response.body.error).toBe('Invalid URL format!')
  })

  it('should accept a valid URL', async () => {
    const response = await api.post('/api').send({ longUrl }).expect(201)

    expect(response.body.shortUrl).toBeDefined()
    expect(response.body.longUrl).toBe(longUrl)
  })
})
