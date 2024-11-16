import express from 'express'
import urlRouter from './routes/url'

const app = express()
app.use(express.json())

app.use('/api', urlRouter)

export default app
