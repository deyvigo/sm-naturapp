import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { CartItemType } from '@/src/models/cart-item'

interface CartItemRowProps {
  item: CartItemType
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

export const CartItemRow = ({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) => {
  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <ThemedView style={styles.info}>
        <ThemedText style={styles.name} numberOfLines={2}>{item.name}</ThemedText>
        <ThemedText style={styles.price}>S/ {item.price.toFixed(2)}</ThemedText>
        <ThemedView style={styles.controls}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease}>
            <ThemedText style={styles.qtyBtnText}>−</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.qty}>{item.quantity}</ThemedText>
          <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease}>
            <ThemedText style={styles.qtyBtnText}>+</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
            <ThemedText style={styles.removeText}>Eliminar</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 1 },
  image: { width: 70, height: 70, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '600', color: '#333' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#148F77', marginTop: 4 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { backgroundColor: '#E8F8F5', borderRadius: 16, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { fontSize: 18, fontWeight: 'bold', color: '#148F77' },
  qty: { fontSize: 16, fontWeight: '600', marginHorizontal: 12, color: '#333' },
  removeBtn: { marginLeft: 'auto', paddingHorizontal: 12, paddingVertical: 6 },
  removeText: { fontSize: 13, color: '#E74C3C', fontWeight: '500' },
})
