import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useTheme } from '@/hooks/use-theme'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface CategoryChipProps {
  label: string
  active: boolean
  onPress: () => void
}

export const CategoryChip = ({ label, active, onPress }: CategoryChipProps) => {
  const theme = useTheme()

  return (
    <ThemedView style={[styles.chipShadow, { borderColor: theme.searchInputBorder }]}>
      <TouchableOpacity style={styles.chipBtn} onPress={onPress}>
        <ThemedView style={[styles.chip, { backgroundColor: theme.backgroundElement }, active && { opacity: 0.8 }]}>
          <ThemedText style={[styles.label, active && styles.activeLabel]}>{label}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  chipShadow: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  chipBtn: {
    backgroundColor: '#148F77',
    borderRadius: 10,
    display: 'flex',
    overflow: 'hidden',
  },
  chip: {
    width: '100%',
    height: '100%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 12, fontWeight: '600' },
  activeLabel: { color: '#148F77' },
})
