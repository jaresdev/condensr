import supertest from 'supertest'
import express from 'express'
import { errorHandler } from '../middlewares/errorHandler'

describe('ErrorHandler Middleware', () => {
  let app

  beforeAll(() => {
    app = express()
    app.use(express.json())

    app.get('/throw', (req, res, next) => {
      const error = new Error('Test error')
      error.name = 'TestError'
      error.status = 500
      next(error)
    })

    app.get('/validation-error', (req, res, next) => {
      const error = new Error('ValidationError')
      error.name = 'ValidationError'
      next(error)
    })

    app.get('/mongo-error', (req, res, next) => {
      const error = new Error('Database error')
      error.name = 'MongoError'
      next(error)
    })

    app.get('/type-error', (req, res, next) => {
      const error = new TypeError('Invalid type')
      next(error)
    })

    app.get('/unknown-error', (req, res, next) => {
      const error = new TypeError()
      error.name = 'UnknownError'
      next(error)
    })

    app.use(errorHandler)
  })

  it('should handle a generic error', async () => {
    const response = await supertest(app).get('/throw').expect(500)

    expect(response.body.error).toBe('Test error')
  })

  it('should handle a validation error', async () => {
    const response = await supertest(app).get('/validation-error')

    expect(response.body.error).toBe('ValidationError')
  })

  it('should handle a MongoError', async () => {
    const response = await supertest(app).get('/mongo-error').expect(400)

    expect(response.body.error).toBe('Database error')
  })

  it('should handle a TypeError', async () => {
    const response = await supertest(app).get('/type-error').expect(400)

    expect(response.body.error).toBe('Invalid type')
  })

  it('should handle an unknown error', async () => {
    const response = await supertest(app).get('/unknown-error').expect(400)

    expect(response.body.error).toBe('Internal server error.')
  })
})
