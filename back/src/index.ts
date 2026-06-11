import express from 'express'
import cors from 'cors'
import { initDatabase } from '@/database'
import productsRouter from '@/routes/products'
import ordersRouter from '@/routes/orders'
import authRouter from '@/routes/auth'
import categoriesRouter from '@/routes/categories'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

initDatabase()

app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/auth', authRouter)
app.use('/api/categories', categoriesRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NaturApp API running on http://0.0.0.0:${PORT}`)
})

export default app
