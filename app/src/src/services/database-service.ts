import * as SQLite from 'expo-sqlite'
import { CartItemType } from '@/src/models/cart-item'

let db: SQLite.SQLiteDatabase | null = null
let initPromise: Promise<void> | null = null

interface ProductToCart {
  id: number
  name: string
  price: number
  image: string
}

async function ensureDb() {
  if (!db) {
    if (!initPromise) {
      initPromise = openDb()
    }
    await initPromise
  }
}

async function openDb() {
  db = await SQLite.openDatabaseAsync('naturapp.db')
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      quantity INTEGER DEFAULT 1
    );
  `)

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      added_date TEXT DEFAULT
        (datetime('now'))
    );
  `)
}

const DatabaseService = {
  async init() {
    if (!initPromise) {
      initPromise = openDb()
    }
    return initPromise
  },
  async addToCart({ id, name, price, image }: ProductToCart) {
    await ensureDb()
    const result = await db!.runAsync(
      `INSERT OR REPLACE INTO cart
        (product_id, name, price, image, quantity)
        VALUES (?, ?, ?, ?, 
          COALESCE(
            (SELECT quantity + 1 FROM cart WHERE product_id = ?), 1
          )
        )`,
      [id, name, price, image, id],
    )
    return result?.lastInsertRowId
  },
  async getCartItems() {
    await ensureDb()
    return await db!.getAllAsync<CartItemType>(
      `SELECT id, product_id as productId, name, price, image, quantity FROM cart ORDER BY id DESC`
    )
  },
  async updateCartQuantity(productId: number, quantity: number) {
    if (quantity <= 0) return
    await ensureDb()
    await db!.runAsync('UPDATE cart SET quantity = ? WHERE product_id = ?', [quantity, productId])
  },
  async removeFromCart(productId: number) {
    await ensureDb()
    await db!.runAsync('DELETE FROM cart WHERE product_id = ?', [productId])
  },
  async getCartTotal() {
    await ensureDb()
    const result = await db!.getFirstAsync<{ total: number }>('SELECT SUM(price * quantity) as total FROM cart')
    return result?.total || 0
  },
  async clearCart() {
    await ensureDb()
    await db!.runAsync('DELETE FROM cart')
  },
  async getCartCount() {
    await ensureDb()
    const result = await db!.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM cart')
    return result?.count || 0
  },
  async addFavorite({ id, name, price, image }: ProductToCart) {
    await ensureDb()
    await db!.runAsync(
      `INSERT OR IGNORE INTO favorites
      (product_id, name, price, image)
      VALUES (?, ?, ?, ?)`,
      [id, name, price, image],
    )
  },
  async removeFavorite(productId: number) {
    await ensureDb()
    await db!.runAsync('DELETE FROM favorites WHERE product_id = ?', [productId])
  },
  async isFavorite(productId: number) {
    await ensureDb()
    const row = await db!.getFirstAsync('SELECT id FROM favorites WHERE product_id = ?', [productId])
    return !!row
  },
  async getFavorites() {
    await ensureDb()
    return await db!.getAllAsync('SELECT * FROM favorites ORDER BY added_date DESC')
  },
}

export default DatabaseService
