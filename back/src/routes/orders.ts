import { Router, Request, Response } from 'express'
import { getDb } from '@/database'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  const db = getDb()
  const { items, total, address } = req.body

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Items array is required and must not be empty' })
    return
  }
  if (!address || typeof address !== 'string' || !address.trim()) {
    res.status(400).json({ error: 'Address is required' })
    return
  }

  const date = new Date().toISOString()
  const result = db.prepare(
    'INSERT INTO orders (items, total, status, date, address) VALUES (?, ?, ?, ?, ?)'
  ).run(JSON.stringify(items), total, 'pendiente', date, address)

  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid) as Record<string, unknown>
  res.status(201).json({ ...order, items: JSON.parse(order.items as string) })
})

router.get('/', (_req: Request, res: Response) => {
  const db = getDb()
  const orders = db.prepare('SELECT * FROM orders ORDER BY id DESC').all() as Record<string, unknown>[]
  const parsed = orders.map(o => ({ ...o, items: JSON.parse(o.items as string) }))
  res.json(parsed)
})

router.get('/:id', (req: Request, res: Response) => {
  const db = getDb()
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id) as Record<string, unknown> | undefined

  if (!order) {
    res.status(404).json({ error: 'Order not found' })
    return
  }

  res.json({ ...order, items: JSON.parse(order.items as string) })
})

export default router
