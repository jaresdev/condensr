import express from 'express'
import urlRouter from './routes/url'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(express.json())

app.use('/', urlRouter)

// Middleware
app.use(errorHandler)

export default app
