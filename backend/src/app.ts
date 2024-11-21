import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import urlRouter from './routes/url'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())
app.use('/', urlRouter)
app.use('/api', (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

app.use(express.static('dist'))

// Middlewares
if (process.env.NODE_ENV === 'production') {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: 'Internal server error.' })
  })
} else {
  app.use(errorHandler)
}

export default app
