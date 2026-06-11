import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { CartItem, CartItemType } from '@/src/models/cart-item'

interface CartItemRowProps {
  item: CartItemType
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

export const CartItemRow = ({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) => {
  return (
    <ThemedView>
      <ThemedText>{item.name}</ThemedText>
    </ThemedView>
  )
}
