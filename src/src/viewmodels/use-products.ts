import { useCallback, useEffect, useState } from 'react'
import ApiService from '@/src/services/api-service'
import { Product, ProductType } from '@/src/models/product'
import StorageService from '@/src/services/storage-service'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const cat = category === 'todos' ? '' : category
      const data = (await ApiService.getProducts(cat)) as ProductType[]
      const mapped = data.map(p => Product.fromJson(p))
      setProducts(mapped)
      await StorageService.setLastCategory(category)
    } catch (error) {
      setError('No se pudieron cargar los productos')
    } finally {
      setLoading(false)
    }
  }, [category])

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      loadProducts()
      return
    }
    setLoading(true)
    try {
      const data = (await ApiService.searchProducts(query)) as ProductType[]
      setProducts(data.map(p => Product.fromJson(p)))
    } catch (error) {
      setError('No se pudieron buscar productos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    StorageService.getLastCategory().then(cat => setCategory(cat))
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    products,
    loading,
    error,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    search,
    refresh: loadProducts,
  }
}
