import { useCallback, useEffect, useState } from 'react'
import StorageService from '@/src/services/storage-service'
import ApiService from '@/src/services/api-service'

export function useProfile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [darkTheme, setDarkTheme] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loadProfile = useCallback(async () => {
    const token = await StorageService.getAuthToken()
    if (!token) {
      setIsLoggedIn(false)
      return
    }
    setIsLoggedIn(true)
    const profile = await StorageService.getUserProfile()
    setName(profile.name)
    setEmail(profile.email)
    setDarkTheme(await StorageService.isDarkTheme())
    setNotifications(await StorageService.getNotifications())
  }, [])

  const saveProfile = useCallback(async () => {
    await StorageService.saveUserProfile(name, email)
  }, [name, email])

  const toggleTheme = useCallback(async () => {
    const newVal = !darkTheme
    setDarkTheme(newVal)
    await StorageService.setDarkTheme(newVal)
  }, [darkTheme])

  const toggleNotifications = useCallback(async () => {
    const newVal = !notifications
    setNotifications(newVal)
    await StorageService.setNotifications(newVal)
  }, [notifications])

  const login = useCallback(async (loginEmail: string, password: string) => {
    setLoading(true)
    try {
      const data = await ApiService.login(loginEmail, password)
      setName(data.user.name)
      setEmail(data.user.email)
      setIsLoggedIn(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await StorageService.logout()
    setName('')
    setEmail('')
    setIsLoggedIn(false)
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  return {
    name, setName, email, setEmail,
    darkTheme, notifications, loading, isLoggedIn,
    saveProfile, toggleTheme, toggleNotifications,
    login, logout,
  }
}
