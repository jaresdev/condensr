import mongoose from 'mongoose'
import logger from '../utils/logger'

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV || 'development'
    const uri =
      env === 'production'
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV

    if (!uri) {
      throw new Error('Mongo URI not defined!')
    }

    const connection = await mongoose.connect(uri)
    logger.info(`📀 MongoDB Connected: ${connection.connection.host}`)
  } catch (error) {
    logger.error('❌ Error connecting to MongoDB: ', error)
    process.exit(1)
  }
}

export default connectDB
