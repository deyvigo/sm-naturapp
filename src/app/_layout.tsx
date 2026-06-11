import DatabaseService from '@/src/services/database-service'
import { Stack } from 'expo-router'
import { useEffect } from 'react'

export default function RootLayout() {
  useEffect(() => {
    DatabaseService.init()
      .then(() => console.log('DatabaseService initialized'))
      .catch(err => console.error('Error DB: ', err))
  }, [])

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#1A5276' }, headerTintColor: '#FFF' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
