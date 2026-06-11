import { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { toast } from 'sonner-native'
import Animated from 'react-native-reanimated'
import { useLocalSearchParams, Stack } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import ApiService from '@/src/services/api-service'
import { useCart } from '@/src/viewmodels/use-cart'
import { Product, ProductType } from '@/src/models/product'

const tag = (id: number) => `product-${id}`

export default function ProductDetailScreen() {
  const { id: idStr } = useLocalSearchParams<{ id: string }>()
  const id = Number(idStr)
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    ApiService.getProductById(id)
      .then((data: ProductType) => setProduct(Product.fromJson(data)))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = async () => {
    if (!product) return
    try {
      await addItem(product)
      toast.success(`${product.name} agregado al carrito`)
    } catch (e: any) {
      toast.error(e?.message || 'Error al agregar')
    }
  }

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Stack.Screen options={{ title: 'Cargando...', headerStyle: { backgroundColor: '#1A5276' }, headerTintColor: '#FFF' }} />
        <ActivityIndicator size="large" color="#148F77" />
      </ThemedView>
    )
  }

  if (error || !product) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Stack.Screen options={{ title: 'Error', headerStyle: { backgroundColor: '#1A5276' }, headerTintColor: '#FFF' }} />
        <ThemedText style={{ color: '#E74C3C' }}>{error || 'Producto no encontrado'}</ThemedText>
      </ThemedView>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: product.name, headerStyle: { backgroundColor: '#1A5276' }, headerTintColor: '#FFF' }} />
      <Animated.Image
        source={{ uri: product.image }}
        style={styles.image}
        sharedTransitionTag={`${tag(id)}-image`}
      />
      <ThemedView style={styles.content}>
        <Animated.Text
          style={styles.category}
          sharedTransitionTag={`${tag(id)}-category`}
        >
          {product.category}
        </Animated.Text>
        <Animated.Text
          style={styles.name}
          sharedTransitionTag={`${tag(id)}-name`}
        >
          {product.name}
        </Animated.Text>
        <ThemedView style={styles.ratingRow}>
          <ThemedText style={styles.rating}>★ {product.rating.toFixed(1)}</ThemedText>
          {product.stock > 0 ? (
            <ThemedText style={styles.inStock}>En stock ({product.stock})</ThemedText>
          ) : (
            <ThemedText style={styles.outOfStock}>Sin stock</ThemedText>
          )}
        </ThemedView>
        <Animated.View
          style={styles.priceRow}
          sharedTransitionTag={`${tag(id)}-row`}
        >
          <Animated.Text
            style={styles.price}
            sharedTransitionTag={`${tag(id)}-price`}
          >
            {product.getFormattedPrice()}
          </Animated.Text>
        </Animated.View>
        <ThemedText style={styles.description}>{product.description}</ThemedText>
        {product.benefits.length > 0 && (
          <ThemedView style={styles.benefitsSection}>
            <ThemedText style={styles.benefitsTitle}>Beneficios</ThemedText>
            {product.benefits.map((b, i) => (
              <ThemedView key={i} style={styles.benefitRow}>
                <ThemedText style={styles.benefitDot}>•</ThemedText>
                <ThemedText style={styles.benefitText}>{b}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        )}
        <TouchableOpacity
          style={[styles.addBtn, !product.isAvailable() && styles.addBtnDisabled]}
          onPress={handleAddToCart}
          disabled={!product.isAvailable()}
        >
          <ThemedText style={styles.addBtnText}>
            {product.isAvailable() ? 'Agregar al Carrito' : 'Sin Stock'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  image: { width: '100%', height: 300 },
  content: { padding: 20 },
  category: { fontSize: 13, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1A5276', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  rating: { fontSize: 15, color: '#F39C12', fontWeight: '600', marginRight: 12 },
  inStock: { fontSize: 13, color: '#27AE60', fontWeight: '500' },
  outOfStock: { fontSize: 13, color: '#E74C3C', fontWeight: '500' },
  priceRow: { marginBottom: 16 },
  price: { fontSize: 28, fontWeight: 'bold', color: '#148F77' },
  description: { fontSize: 15, color: '#555', lineHeight: 22, marginBottom: 20 },
  benefitsSection: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 20, elevation: 1 },
  benefitsTitle: { fontSize: 16, fontWeight: '700', color: '#1A5276', marginBottom: 10 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  benefitDot: { fontSize: 18, color: '#148F77', marginRight: 8 },
  benefitText: { fontSize: 14, color: '#555' },
  addBtn: { backgroundColor: '#148F77', borderRadius: 12, padding: 16, alignItems: 'center' },
  addBtnDisabled: { backgroundColor: '#95A5A6' },
  addBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
})
