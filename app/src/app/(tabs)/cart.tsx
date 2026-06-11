import React, { useState, useCallback } from 'react'
import { FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { toast } from 'sonner-native'
import { useFocusEffect } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useCart } from '@/src/viewmodels/use-cart'
import { CartItemRow } from '@/src/components/cart-item-row'

export default function CartScreen() {
  const { items, total, loading, updateQuantity, removeItem, checkout, refresh } = useCart()

  useFocusEffect(useCallback(() => {
    refresh()
  }, [refresh]))
  const [address, setAddress] = useState('')

  const handleCheckout = async () => {
    try {
      const order = await checkout(address)
      toast.success(`Pedido #${order.id} registrado.`)
      setAddress('')
    } catch (e: any) {
      toast.error(e?.message || 'Error al crear pedido')
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Mi Carrito ({items.length} items)</ThemedText>

      <FlatList
        data={items}
        keyExtractor={item => item.productId.toString()}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
            onRemove={() => { removeItem(item.productId); toast.success(`${item.name} eliminado del carrito`) }}
          />
        )}
        ListEmptyComponent={<ThemedText style={styles.empty}>Tu carrito está vacío</ThemedText>}
      />

      {items.length > 0 && (
        <ThemedView style={styles.footer}>
          <TextInput
            style={styles.addressInput}
            placeholder="Dirección de entrega"
            value={address}
            onChangeText={setAddress}
          />
          <ThemedView style={styles.totalRow}>
            <ThemedText style={styles.totalLabel}>Total:</ThemedText>
            <ThemedText style={styles.totalValue}>S/ {total.toFixed(2)}</ThemedText>
          </ThemedView>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <ThemedText style={styles.checkoutText}>Realizar Pedido</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1A5276', marginBottom: 16 },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 16, color: '#999' },
  footer: { borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingTop: 16 },
  addressInput: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 12,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 18, fontWeight: '600', color: '#333' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#148F77' },
  checkoutBtn: { backgroundColor: '#148F77', borderRadius: 10, padding: 16, alignItems: 'center' },
  checkoutText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
})
