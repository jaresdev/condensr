import { Router } from 'express'
import { shortenUrl, redirectToUrl } from '../controllers/url'

const router = Router()

// TODO delete 'as any' and fix the bugs

router.post('/condensr-api', shortenUrl as any)

router.get('/:shortId', redirectToUrl as any)

export default router
