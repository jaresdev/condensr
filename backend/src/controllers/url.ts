import type { Request, Response } from 'express'
import { nanoid } from 'nanoid'
import Url from '../models/url'

export async function shortenUrl(req: Request, res: Response) {
  const { longUrl } = req.body

  if (!longUrl) {
    return res.status(400).json({ error: 'longUrl is required!' })
  }

  try {
    const shortId = nanoid(6)

    const newUrl = new Url({ longUrl, shortId })
    await newUrl.save()

    res.status(201).json({
      longUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}