import * as SQLite from 'expo-sqlite'
import { CartItemType } from '@/src/models/cart-item'

let db: SQLite.SQLiteDatabase | null = null

interface ProductToCart {
  id: number
  name: string
  price: number
  image: string
}

const DatabaseService = {
  async init() {
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
  },
  // CRUD: cart
  // create: add product into cart
  async addToCart({ id, name, price, image }: ProductToCart) {
    const result = await db?.runAsync(
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
  // read: get all products from cart
  async getCartItems() {
    const rows = await db?.getAllAsync<CartItemType>('SELECT * FROM cart ORDER BY id DESC')
    return rows
  },
  // update: change quantity
  async updateCartQuantity(productId: number, quantity: number) {
    if (quantity <= 0) return //
    await db?.runAsync('UPDATE cart SET quantity = ? WHERE product_id = ?', [quantity, productId])
  },
  // delete: remove from cart
  async removeFromCart(productId: number) {
    await db?.runAsync('DELETE FROM cart WHERE product_id = ?', [productId])
  },
  // read: get total price of cart
  async getCartTotal() {
    const result = await db?.getFirstAsync<{ total: number }>('SELECT SUM(price * quantity) as total FROM cart')
    return result?.total || 0
  },
  // delete: clear cart
  async clearCart() {
    await db?.runAsync('DELETE FROM cart')
  },
  // read: count products in cart
  async getCartCount() {
    const result = await db?.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM cart')
    return result?.count || 0
  },
  // CRUD: favorites
  async addFavorite({ id, name, price, image }: ProductToCart) {
    await db?.runAsync(
      `INSERT OR IGNORE INTO favorites
      (product_id, name, price, image)
      VALUES (?, ?, ?, ?)`,
      [id, name, price, image],
    )
  },
  async removeFavorite(productId: number) {
    await db?.runAsync('DELETE FROM favorites WHERE product_id = ?', [productId])
  },
  async isFavorite(productId: number) {
    const row = await db?.getFirstAsync('SELECT id FROM favorites WHERE product_id = ?', [productId])
    return !!row
  },
  async getFavorites() {
    return await db?.getAllAsync('SELECT * FROM favorites ORDER BY added_date DESC')
  },
}

export default DatabaseService
