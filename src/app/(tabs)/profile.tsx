import { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { toast } from 'sonner-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useProfile } from '@/src/viewmodels/use-profile'

export default function ProfileScreen() {
  const { name, setName, email, setEmail, darkTheme, notifications, loading, saveProfile, toggleTheme, toggleNotifications, login, isLoggedIn, logout } = useProfile()

  if (!isLoggedIn) {
    return <LoginForm onLogin={login} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedView style={styles.avatar}>
        <ThemedText style={styles.avatarText}>{name.charAt(0).toUpperCase()}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.name}>{name}</ThemedText>
      <ThemedText style={styles.email}>{email}</ThemedText>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Información Personal</ThemedText>
        <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
          <ThemedText style={styles.saveBtnText}>Guardar Cambios</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Preferencias</ThemedText>
        <ThemedView style={styles.settingRow}>
          <ThemedText style={styles.settingLabel}>Tema Oscuro</ThemedText>
          <Switch value={darkTheme} onValueChange={toggleTheme} trackColor={{ false: '#DDD', true: '#148F77' }} thumbColor={darkTheme ? '#FFF' : '#F4F3F4'} />
        </ThemedView>
        <ThemedView style={styles.settingRow}>
          <ThemedText style={styles.settingLabel}>Notificaciones</ThemedText>
          <Switch value={notifications} onValueChange={toggleNotifications} trackColor={{ false: '#DDD', true: '#148F77' }} thumbColor={notifications ? '#FFF' : '#F4F3F4'} />
        </ThemedView>
      </ThemedView>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  )
}

function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [logging, setLogging] = useState(false)

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.error('Ingresa email y contraseña')
      return
    }
    setLogging(true)
    try {
      await onLogin(loginEmail, loginPassword)
    } catch (e: any) {
      toast.error(e?.message || 'Error al iniciar sesión')
    } finally {
      setLogging(false)
    }
  }

  return (
    <ThemedView style={styles.loginContainer}>
      <ThemedText style={styles.loginTitle}>NaturApp</ThemedText>
      <ThemedText style={styles.loginSubtitle}>Inicia sesión para continuar</ThemedText>
      <TextInput style={styles.input} placeholder="Email" value={loginEmail} onChangeText={setLoginEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Contraseña" value={loginPassword} onChangeText={setLoginPassword} secureTextEntry />
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={logging}>
        {logging ? <ActivityIndicator color="#FFF" /> : <ThemedText style={styles.loginBtnText}>Iniciar Sesión</ThemedText>}
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { padding: 20, paddingTop: 40 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#148F77', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1A5276', textAlign: 'center' },
  email: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 24 },
  section: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A5276', marginBottom: 12 },
  input: { backgroundColor: '#F9F9F9', borderRadius: 8, padding: 14, fontSize: 15, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 10 },
  saveBtn: { backgroundColor: '#148F77', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 4 },
  saveBtnText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  settingLabel: { fontSize: 15, color: '#333' },
  logoutBtn: { borderWidth: 1, borderColor: '#E74C3C', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8 },
  logoutText: { color: '#E74C3C', fontSize: 15, fontWeight: '600' },
  loginContainer: { flex: 1, justifyContent: 'center', padding: 32, backgroundColor: '#F5F5F5' },
  loginTitle: { fontSize: 36, fontWeight: 'bold', color: '#148F77', textAlign: 'center', marginBottom: 8 },
  loginSubtitle: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 32 },
  loginBtn: { backgroundColor: '#148F77', borderRadius: 10, padding: 16, alignItems: 'center' },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
})
