import { useState } from 'react'
import { TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { toast } from 'sonner-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useTheme } from '@/hooks/use-theme'

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [logging, setLogging] = useState(false)

  const theme = useTheme()

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.error('Ingresa email y contraseña')
      return
    }
  }

  return (
    <ThemedView style={styles.loginContainer}>
      <ThemedText themeColor="callToActionButton" style={styles.loginTitle}>
        NaturApp
      </ThemedText>
      <ThemedText style={styles.loginSubtitle}>Inicia sesión para continuar</ThemedText>
      <TextInput
        style={[styles.input, { borderColor: theme.searchInputBorder, color: theme.text }]}
        placeholder="Email"
        value={loginEmail}
        onChangeText={setLoginEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { borderColor: theme.searchInputBorder, color: theme.text }]}
        placeholder="Contraseña"
        value={loginPassword}
        onChangeText={setLoginPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.loginBtn, { backgroundColor: theme.callToActionButton }]}
        onPress={handleLogin}
        disabled={logging}
      >
        {logging ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <ThemedText style={styles.loginBtnText}>Iniciar Sesión</ThemedText>
        )}
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    marginBottom: 10,
  },
  loginContainer: { flex: 1, justifyContent: 'center', padding: 32 },
  loginTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 40,
  },
  loginSubtitle: { fontSize: 16, textAlign: 'center', marginBottom: 32 },
  loginBtn: { borderRadius: 10, padding: 16, alignItems: 'center' },
  loginBtnText: { fontSize: 16, fontWeight: 'bold' },
})
