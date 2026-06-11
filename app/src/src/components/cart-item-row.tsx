import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { CartItemType } from '@/src/models/cart-item'
import { useTheme } from '@/hooks/use-theme'
import { Ionicons } from '@expo/vector-icons'

interface CartItemRowProps {
  item: CartItemType
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

export const CartItemRow = ({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) => {
  const theme = useTheme()

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.backgroundElement }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <ThemedView style={[styles.info, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText style={styles.name} numberOfLines={2}>
          {item.name}
        </ThemedText>
        <ThemedText themeColor="callToActionButton" style={styles.price}>
          S/ {item.price.toFixed(2)}
        </ThemedText>
        <ThemedView style={[styles.controls, { backgroundColor: theme.backgroundElement }]}>
          <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: theme.callToActionButton }]} onPress={onDecrease}>
            <ThemedText style={styles.qtyBtnText}>
              <Ionicons name="remove" size={20} color={theme.text} />
            </ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.qty}>{item.quantity}</ThemedText>
          <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: theme.callToActionButton }]} onPress={onIncrease}>
            <ThemedText style={styles.qtyBtnText}>
              <Ionicons name="add" size={20} color={theme.text} />
            </ThemedText>
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
  container: { flexDirection: 'row', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 1 },
  image: { width: 70, height: 70, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 15, fontWeight: '600' },
  price: { fontSize: 16, fontWeight: 'bold', marginTop: 4, opacity: 0.8 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: {
    borderRadius: 16,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  qtyBtnText: { fontSize: 18, fontWeight: 'bold' },
  qty: { fontSize: 16, fontWeight: '600', marginHorizontal: 12 },
  removeBtn: { marginLeft: 'auto', paddingHorizontal: 12, paddingVertical: 6 },
  removeText: { fontSize: 13, color: '#E74C3C', fontWeight: '500' },
})
