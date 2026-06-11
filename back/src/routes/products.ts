import { Router, Request, Response } from 'express'
import { getDb } from '@/database'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const db = getDb()
  const { category, q } = req.query

  let sql = 'SELECT * FROM products'
  const params: unknown[] = []

  if (category && typeof category === 'string' && category !== 'todos') {
    sql += ' WHERE category = ?'
    params.push(category)
  }

  if (q && typeof q === 'string') {
    sql += params.length ? ' AND' : ' WHERE'
    sql += ' (name LIKE ? OR description LIKE ?)'
    params.push(`%${q}%`, `%${q}%`)
  }

  sql += ' ORDER BY id DESC'

  const products = db.prepare(sql).all(...params) as Record<string, unknown>[]
  const parsed = products.map(p => ({ ...p, benefits: JSON.parse(p.benefits as string) }))
  res.json(parsed)
})

router.get('/search', (req: Request, res: Response) => {
  const db = getDb()
  const { q } = req.query

  if (!q || typeof q !== 'string') {
    res.status(400).json({ error: 'Query parameter "q" is required' })
    return
  }

  const products = db.prepare(
    'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY name ASC'
  ).all(`%${q}%`, `%${q}%`) as Record<string, unknown>[]

  const parsed = products.map(p => ({ ...p, benefits: JSON.parse(p.benefits as string) }))
  res.json(parsed)
})

router.get('/:id', (req: Request, res: Response) => {
  const db = getDb()
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id) as Record<string, unknown> | undefined

  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return
  }

  res.json({ ...product, benefits: JSON.parse(product.benefits as string) })
})

export default router
