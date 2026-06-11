import { TouchableOpacity, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Product } from '@/src/models/product'

interface ProductCardProps {
  product: InstanceType<typeof Product>
  onAddToCart: () => void
}

const tag = (id: number) => `product-${id}`

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter()
  const id = product.id

  return (
    <ThemedView style={styles.card}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/product/${id}`)}>
        <Animated.Image
          source={{ uri: product.image }}
          style={styles.image}
          sharedTransitionTag={`${tag(id)}-image`}
        />
        <Animated.Text
          style={styles.category}
          sharedTransitionTag={`${tag(id)}-category`}
        >
          {product.category}
        </Animated.Text>
        <Animated.Text
          style={styles.name}
          numberOfLines={2}
          sharedTransitionTag={`${tag(id)}-name`}
        >
          {product.name}
        </Animated.Text>
        <Animated.View style={styles.row} sharedTransitionTag={`${tag(id)}-row`}>
          <Animated.Text
            style={styles.price}
            sharedTransitionTag={`${tag(id)}-price`}
          >
            {product.getFormattedPrice()}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
      <ThemedView style={styles.addBtnWrapper}>
        <TouchableOpacity style={styles.addBtn} onPress={onAddToCart}>
          <ThemedText style={styles.addText}>+</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#FFF', borderRadius: 12, margin: 6, padding: 10, elevation: 2, maxWidth: '48%' },
  image: { width: '100%', height: 120, borderRadius: 8 },
  name: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 8 },
  category: { fontSize: 11, color: '#888', textTransform: 'capitalize', marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#148F77' },
  addBtnWrapper: { alignItems: 'flex-end', marginTop: -28 },
  addBtn: { backgroundColor: '#148F77', borderRadius: 16, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  addText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
})
