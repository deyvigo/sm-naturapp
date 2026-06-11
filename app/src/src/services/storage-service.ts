import AsyncStorage from '@react-native-async-storage/async-storage'

const KEYS = {
  USER_NAME: '@naturapp_user_name',
  USER_EMAIL: '@naturapp_user_email',
  AUTH_TOKEN: '@naturapp_auth_token',
  THEME_DARK: '@naturapp_theme_dark',
  NOTIFICATIONS: '@naturapp_notifications',
  LAST_CATEGORY: '@naturapp_last_category',
  ONBOARDING_DONE: '@naturapp_onboarding',
}

const StorageService = {
  // create or update data
  async saveUserProfile(name: string, email: string) {
    try {
      await AsyncStorage.multiSet([
        [KEYS.USER_NAME, name],
        [KEYS.USER_EMAIL, email],
      ])
      return true
    } catch (error) {
      console.error('Error saving user profile: ', error)
      return false
    }
  },
  // read data
  async getUserProfile() {
    try {
      const values = await AsyncStorage.multiGet([KEYS.USER_NAME, KEYS.USER_EMAIL])
      return {
        name: values[0][1] || '',
        email: values[1][1] || '',
      }
    } catch (error) {
      console.error('Error reading user profile: ', error)
      return { name: '', email: '' }
    }
  },
  // preferences
  // dark theme
  async setDarkTheme(enabled: boolean) {
    await AsyncStorage.setItem(KEYS.THEME_DARK, JSON.stringify(enabled))
  },
  async isDarkTheme() {
    const value = await AsyncStorage.getItem(KEYS.THEME_DARK)
    return value ? JSON.parse(value) : false
  },
  // notifications
  async setNotifications(enabled: boolean) {
    await AsyncStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(enabled))
  },
  async getNotifications() {
    const value = await AsyncStorage.getItem(KEYS.NOTIFICATIONS)
    return value ? JSON.parse(value) : true
  },
  // auth token
  async setAuthToken(token: string) {
    await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token)
  },
  async getAuthToken() {
    return await AsyncStorage.getItem(KEYS.AUTH_TOKEN)
  },
  // delete data
  async logout() {
    await AsyncStorage.multiRemove([KEYS.AUTH_TOKEN, KEYS.USER_NAME, KEYS.USER_EMAIL])
  },
  // save last visited category
  async setLastCategory(category: string) {
    await AsyncStorage.setItem(KEYS.LAST_CATEGORY, category)
  },
  async getLastCategory() {
    return (await AsyncStorage.getItem(KEYS.LAST_CATEGORY)) || 'todos'
  },
}

export default StorageService
