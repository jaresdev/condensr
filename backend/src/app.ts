import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import urlRouter from './routes/url'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  }),
)

app.use(express.json())

app.use('/', urlRouter)

// Middlewares
if (process.env.NODE_ENV === 'production') {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: 'Internal server error.' })
  })
} else {
  app.use(errorHandler)
}

export default app
