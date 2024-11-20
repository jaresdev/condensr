import type { Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { isURL } from 'validator'
import Url from '../models/url'
import { urlLengthValidator } from '../utils/urlLengthValidator'

export async function shortenUrl(req: Request, res: Response) {
  const { longUrl } = req.body

  if (!longUrl) {
    return res.status(400).json({ error: 'longUrl is required!' })
  }

  if (!urlLengthValidator(longUrl)) {
    return res.status(400).json({
      error: 'URL is too long. Maximum length is 1000 characters.',
    })
  }

  if (
    !isURL(longUrl, { protocols: ['http', 'https'], require_protocol: true })
  ) {
    return res.status(400).json({ error: 'Invalid URL format!' })
  }

  let shortId
  const url = await Url.findOne({ longUrl })

  if (!url) {
    shortId = nanoid(6)

    const newUrl = new Url({ longUrl, shortId })
    await newUrl.save()
  } else {
    shortId = url?.shortId
  }

  res.status(!url ? 201 : 200).json({
    longUrl,
    shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`,
  })
}

export async function redirectToUrl(req: Request, res: Response) {
  const { shortId } = req.params

  const url = await Url.findOne({ shortId })

  if (!url) {
    const env = process.env.NODE_ENV || 'development'
    if (env === 'development') {
      return res.redirect('http://localhost:4321/404')
    }

    // TODO
    return res.status(404).json({ error: 'Short Url not found!' })
  }

  return res.redirect(url.longUrl!)
}
