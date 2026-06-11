import { Router, Request, Response } from 'express'
import { getDb } from '@/database'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' })
    return
  }

  const db = getDb()
  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as Record<string, unknown> | undefined

  if (!user) {
    db.prepare('INSERT INTO users (email, name, password) VALUES (?, ?, ?)').run(
      email,
      email.split('@')[0],
      password
    )
    user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as Record<string, unknown>
  }

  const token = uuidv4()
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  })
})

router.post('/register', (req: Request, res: Response) => {
  const { email, name, password } = req.body

  if (!email || !name || !password) {
    res.status(400).json({ error: 'Email, name and password are required' })
    return
  }

  const db = getDb()
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)

  if (existing) {
    res.status(409).json({ error: 'Email already registered' })
    return
  }

  db.prepare('INSERT INTO users (email, name, password) VALUES (?, ?, ?)').run(email, name, password)
  const user = db.prepare('SELECT id, email, name FROM users WHERE email = ?').get(email)

  const token = uuidv4()
  res.status(201).json({ token, user })
})

export default router
