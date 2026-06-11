import { Router, Request, Response } from 'express'
import { getDb } from '@/database'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  const db = getDb()
  const rows = db.prepare('SELECT DISTINCT category FROM products ORDER BY category ASC').all() as { category: string }[]
  const categories = rows.map(r => r.category)
  res.json(categories)
})

export default router
