import app from './app'
import connectDB from './config/db'
import logger from './utils/logger'
import { findAvailablePort } from './utils/portUtils'
import schedule from 'node-schedule'
import Url from './models/url'

connectDB()
;(async () => {
  try {
    const port = await findAvailablePort(3000)

    app.listen(port, () => {
      logger.info(`🚀 Server running on port ${port}`)
    })

    schedule.scheduleJob('0 0 * * *', async () => {
      await Url.deleteMany({
        createdAt: { $lte: new Date().setMonth(new Date().getMonth() - 1) },
      })
    })
  } catch (err) {
    logger.error('Error finding an available port: ', err)
  }
})()
