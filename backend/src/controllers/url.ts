import type { Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { isURL } from 'validator'
import Url from '../models/url'

export async function shortenUrl(req: Request, res: Response) {
  const { longUrl } = req.body

  if (!longUrl) {
    return res.status(400).json({ error: 'longUrl is required!' })
  }

  if (
    !isURL(longUrl, { protocols: ['http', 'https'], require_protocol: true })
  ) {
    return res.status(400).json({ error: 'Invalid URL format!' })
  }

  const shortId = nanoid(6)

  const newUrl = new Url({ longUrl, shortId })
  await newUrl.save()

  res.status(201).json({
    longUrl,
    shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`,
  })
}

export async function redirectToUrl(req: Request, res: Response) {
  const { shortId } = req.params

  const url = await Url.findOne({ shortId })

  if (!url) {
    return res.status(404).json({ error: 'Short Url not found!' })
  }

  return res.redirect(url.longUrl!)
}
