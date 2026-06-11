import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { toast } from 'sonner-native'
import { useProducts } from '@/src/viewmodels/use-products'
import { useCart } from '@/src/viewmodels/use-cart'
import ProductCard from '@/src/components/product-card'
import { CategoryChip } from '@/src/components/category-chip'
import { Product } from '@/src/models/product'
import { useTheme } from '@/hooks/use-theme'
import { ThemedView } from '@/components/themed-view'

const CATEGORIES = ['todos', 'superfoods', 'aceites', 'capsulas', 'infusiones', 'miel']

export default function HomeScreen() {
  // Obtener datos del ViewModel (NO del servicio)
  const { products, loading, error, category, setCategory, searchQuery, setSearchQuery, search, refresh } =
    useProducts()
  const { addItem } = useCart()
  const theme = useTheme()

  const handleAddToCart = async (product: Product) => {
    try {
      await addItem(product)
      toast.success(`${product.name} agregado al carrito`)
    } catch (e: any) {
      toast.error(e?.message || 'Error al agregar')
    }
  }

  return (
    <ThemedView type="background" style={styles.container}>
      {/* Barra de búsqueda */}
      <TextInput
        style={[
          styles.searchBar,
          { backgroundColor: theme.backgroundElement, borderColor: theme.searchInputBorder, color: theme.text },
        ]}
        placeholder="Buscar productos naturales..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => search(searchQuery)}
      />

      {/* Chips de categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map(cat => (
          <CategoryChip key={cat} label={cat} active={category === cat} onPress={() => setCategory(cat)} />
        ))}
      </ScrollView>

      {/* Lista de productos */}
      <ThemedView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#148F77" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={item => `${item.id}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ProductCard product={item} onAddToCart={() => handleAddToCart(item)} />}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
          />
        )}
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  searchBar: {
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categories: { display: 'flex', gap: 10, maxHeight: 40, marginBottom: 4 },
  error: { color: '#E74C3C', textAlign: 'center', marginTop: 40, fontSize: 16 },
  categoriesContent: { alignItems: 'center', gap: 10 },
})
