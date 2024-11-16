import app from './app'
import connectDB from './config/db'
import { findAvailablePort } from './utils/portUtils'

connectDB()
;(async () => {
  try {
    const port = await findAvailablePort(3000)
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`)
    })
  } catch (err) {
    console.error('Error finding an available port: ', err)
  }
})()
