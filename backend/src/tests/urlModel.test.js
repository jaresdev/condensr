import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import URL from '../models/url'

const longUrl = 'https://example.com'
const shortId = 'abc123'

describe('Url Model', () => {
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

  afterEach(async () => {
    await URL.deleteMany({})
  })

  it('should transform JSON output correctly', async () => {
    const validUrl = new URL({
      longUrl: longUrl,
      shortId: shortId,
    })

    const savedUrl = await validUrl.save()
    const json = savedUrl.toJSON()

    expect(json.id).toBeDefined()
    expect(json._id).toBeUndefined()
    expect(json.__v).toBeUndefined()
  })
})
