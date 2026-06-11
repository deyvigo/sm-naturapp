import StorageService from '@/src/services/storage-service'
import { OrderType } from '@/src/models/order'
import { API_BASE_URL } from '@/constants/api'

const BASE_URL = API_BASE_URL

async function request(endpoint: string, options: RequestInit = {}) {
  try {
    const token = await StorageService.getAuthToken()
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error)
    throw error
  }
}

const ApiService = {
  async getProducts(category: string = '') {
    const query = category ? `?category=${category}` : ''
    return await request(`/products${query}`)
  },
  async getProductById(id: number) {
    return await request(`/products/${id}`)
  },
  async searchProducts(query: string) {
    return await request(`/products/search?q=${encodeURIComponent(query)}`)
  },
  // oders CRUD
  // create: create order
  async createOrder(orderData: Omit<OrderType, 'id'>) {
    return await request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  },
  // read; get all orders history
  async getOrders() {
    return await request('/orders')
  },
  // read: order detail
  async getOrderById(id: number) {
    return await request(`/orders/${id}`)
  },
  // Authentication
  async login(email: string, password: string) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    // Guarda token en persistencia básica
    if (data.token) {
      await StorageService.setAuthToken(data.token)
      await StorageService.saveUserProfile(data.user.name, data.user.email)
    }
    return data
  },
  // categories
  async getCategories() {
    return await request('/categories')
  },
}

export default ApiService
