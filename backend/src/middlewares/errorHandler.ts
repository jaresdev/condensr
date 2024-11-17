import type { ErrorRequestHandler } from 'express'
import logger from '../utils/logger'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'ValidationError') {
    res.status(err.status || 400).json({
      error: err.message || 'ValidationError.',
    })
  } else if (err.name === 'MongoError') {
    res.status(err.status || 400).json({
      error: err.message || 'MongoError.',
    })
  } else if (err.name === 'TypeError') {
    res.status(err.status || 400).json({
      error: err.message || 'TypeError.',
    })
  } else {
    res.status(err.status || 400).json({
      error: err.message || 'Internal server error.',
    })
  }
}
