import { Router } from 'express'
import { shortenUrl } from '../controllers/url'

const router = Router()

// TODO delete 'as any' and fix the bug
router.post('/', shortenUrl as any)

export default router
