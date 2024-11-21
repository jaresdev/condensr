import { Router } from 'express'
import { shortenUrl, redirectToUrl } from '../controllers/url'
import path from 'path'

const router = Router()

// TODO delete 'as any' and fix the bugs

router.post('/api', shortenUrl as any)

router.get('/404', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '../../dist/404.html'))
})

router.get('/500', (req, res) => {
  res.status(500).sendFile(path.resolve(__dirname, '../../dist/500.html'))
})

router.get('/:shortId', redirectToUrl as any)

export default router
