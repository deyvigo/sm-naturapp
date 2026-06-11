import { useEffect } from 'react'
import { FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useOrders } from '@/src/viewmodels/use-order'
import { useTheme } from '@/hooks/use-theme'

const STATUS_COLORS: Record<string, string> = {
  pendiente: '#F39C12',
  procesando: '#3498DB',
  enviado: '#8E44AD',
  entregado: '#27AE60',
}

const STATUS_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  procesando: 'Procesando',
  enviado: 'Enviado',
  entregado: 'Entregado',
}

export default function OrdersScreen() {
  const { orders, loading, error, refresh } = useOrders()
  const theme = useTheme()

  useEffect(() => {
    refresh()
  }, [])

  if (loading && orders.length === 0) {
    return <ActivityIndicator size="large" color="#148F77" style={{ marginTop: 80 }} />
  }

  if (error) {
    return <ThemedText style={styles.error}>{error}</ThemedText>
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedView type="backgroundElement" style={styles.cardHeader}>
              <ThemedText style={styles.orderId}>Pedido #{item.id}</ThemedText>
              <ThemedView style={[styles.badge, { backgroundColor: STATUS_COLORS[item.status] || '#95A5A6' }]}>
                <ThemedText style={styles.badgeText}>{STATUS_LABELS[item.status] || item.status}</ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedText style={styles.date}>
              {new Date(item.date).toLocaleDateString('es-PE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </ThemedText>
            <ThemedText style={styles.address}>
              {/* TODO: Add position icon */}
              {item.address}
            </ThemedText>
            <ThemedText style={styles.itemCount}>{item.items.length} producto(s)</ThemedText>
            <ThemedView type="backgroundElement" style={[styles.totalRow, { borderTopColor: theme.searchInputBorder }]}>
              <ThemedText style={styles.totalLabel}>Total:</ThemedText>
              <ThemedText style={styles.totalValue}>S/ {item.total.toFixed(2)}</ThemedText>
            </ThemedView>
          </ThemedView>
        )}
        ListEmptyComponent={
          <ThemedView style={styles.empty}>
            <ThemedText style={styles.emptyIcon}>📋</ThemedText>
            <ThemedText style={styles.emptyText}>No tienes pedidos aún</ThemedText>
            <ThemedText style={styles.emptySubtext}>Tus pedidos aparecerán aquí</ThemedText>
          </ThemedView>
        }
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} colors={['#148F77']} />}
        contentContainerStyle={orders.length === 0 ? styles.emptyContainer : undefined}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderId: { fontSize: 17, fontWeight: 'bold', color: '#1A5276' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  date: { fontSize: 13, marginBottom: 4 },
  address: { fontSize: 14, marginBottom: 4 },
  itemCount: { fontSize: 13, marginBottom: 8 },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  totalLabel: { fontSize: 16, fontWeight: '600' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },
  error: { color: '#E74C3C', textAlign: 'center', marginTop: 80, fontSize: 16 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingTop: 60 },
  emptyContainer: { flex: 1, justifyContent: 'center' },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 },
  emptySubtext: { fontSize: 14 },
})
