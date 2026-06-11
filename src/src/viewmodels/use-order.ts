import { useState, useCallback } from 'react'
import ApiService from '@/src/services/api-service'
import { Order, OrderType } from '@/src/models/order'

export function useOrders() {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = (await ApiService.getOrders()) as OrderType[]
      setOrders(data.map(o => Order.fromJson(o)))
    } catch (err) {
      setError('No se pudo cargar el historial')
    } finally {
      setLoading(false)
    }
  }, [])

  return { orders, loading, error, refresh: loadOrders }
}
