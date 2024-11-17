import type { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: 'ValidationError: ' + error.message })
  } else if (error.name === 'MongoError') {
    return res.status(400).json({ error: 'MongoError: ' + error.message })
  } else if (error.name === 'TypeError') {
    return res.status(404).json({ error: 'TypeError: ' + error.message })
  } else {
    return res.status(400).send({ error: 'Internal server error.' })
  }
}
