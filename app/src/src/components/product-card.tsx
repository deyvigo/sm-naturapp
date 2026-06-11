import { TouchableOpacity, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Product } from '@/src/models/product'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/use-theme'

interface ProductCardProps {
  product: InstanceType<typeof Product>
  onAddToCart: () => void
}

const tag = (id: number) => `product-${id}`

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter()
  const theme = useTheme()
  const id = product.id

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/product/${id}`)}>
        <Animated.Image source={{ uri: product.image }} style={styles.image} sharedTransitionTag={`${tag(id)}-image`} />
        <ThemedText style={styles.category} themeColor="textSecondary">
          {product.category}
        </ThemedText>
        <ThemedText style={styles.name} numberOfLines={2} themeColor="text">
          {product.name}
        </ThemedText>
      </TouchableOpacity>
      <ThemedView type="backgroundElement" style={styles.addBtnWrapper}>
        <ThemedText style={styles.name} themeColor="textSecondary">
          {product.getFormattedPrice()}
        </ThemedText>
        <TouchableOpacity style={styles.addBtn} onPress={onAddToCart}>
          <ThemedText style={styles.addText}>
            <Ionicons name="add" size={20} color={theme.text} />
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: 12, margin: 6, padding: 10, elevation: 2, maxWidth: '48%' },
  image: { width: '100%', height: 120, borderRadius: 8 },
  name: { fontSize: 14, fontWeight: '600', marginTop: 8 },
  category: { fontSize: 11, textTransform: 'capitalize', marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#148F77' },
  addBtnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    backgroundColor: '#148F77',
    borderRadius: 16,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
})
