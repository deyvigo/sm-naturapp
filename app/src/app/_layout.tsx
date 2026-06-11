import DatabaseService from '@/src/services/database-service'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster } from 'sonner-native'

export default function RootLayout() {
  useEffect(() => {
    DatabaseService.init()
      .then(() => console.log('DatabaseService initialized'))
      .catch(err => console.error('Error DB: ', err))
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#1A5276' }, headerTintColor: '#FFF' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toaster position="top-center" />
    </GestureHandlerRootView>
  )
}
