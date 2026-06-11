import Constants from 'expo-constants'

const EXTRA = Constants.expoConfig?.extra as Record<string, string> | undefined

export const API_BASE_URL: string =
  EXTRA?.apiUrl ?? 'http://localhost:3000/api'

export const API_TIMEOUT = 10000
