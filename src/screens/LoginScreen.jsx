import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function LoginScreen() {
  const sysDark = useColorScheme() === 'dark';
  const [dark, setDark] = useState(sysDark);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const colors = {
    bg:      dark ? '#0D0D0D' : '#F5F7FA',
    card:    dark ? '#1E1E1E' : '#FFFFFF',
    text:    dark ? '#FFFFFF' : '#000000',
    muted:   dark ? '#A0A0A0' : '#666666',
    primary: '#1E7F40'
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Toggle */}
          <Icon
            name={dark ? 'sun' : 'moon'}
            size={22}
            color={colors.text}
            style={styles.toggle}
            onPress={() => setDark(!dark)}
          />

          {/* Avatar */}
          <View style={[styles.avatarShadow, { shadowColor: colors.primary }]}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>TM</Text>
            </View>
          </View>

          {/* Titles */}
          <Text style={[styles.title, { color: colors.primary }]}>
            Tránsito Municipal
          </Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Sistema de Control de Infracciones
          </Text>

          {/* Card */}
          <View style={[styles.card, { backgroundColor: colors.card, shadowColor: '#000' }]}>
            <Text style={[styles.label, { color: colors.text }]}>Usuario</Text>
            <View style={[styles.inputWrap, { borderColor: colors.muted }]}>
              <Icon name="mail" size={18} color={colors.muted} />
              <Text
                style={[styles.placeholder, { color: colors.muted }]}
              >
                Ingrese su usuario
              </Text>
            </View>

            <Text style={[styles.label, { color: colors.text }]}>Contraseña</Text>
            <View style={[styles.inputWrap, { borderColor: colors.muted }]}>
              <Icon name="lock" size={18} color={colors.muted} />
              <Text
                style={[styles.placeholder, { color: colors.muted }]}
              >
                Ingrese su contraseña
              </Text>
            </View>

            {/* Button */}
            <View style={[styles.btn, { backgroundColor: colors.primary }]}>
              <Text style={styles.btnText}>Iniciar Sesión</Text>
              <Icon name="chevron-right" size={16} color="#FFF" />
            </View>
          </View>

          {/* Footer logos (placeholders) */}
          <View style={styles.footer}>
            <View style={styles.logoBox} />
            <View style={styles.divider} />
            <View style={styles.logoBox} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:  { flex: 1 },
  scroll: { alignItems: 'center', padding: 24 },
  toggle: { position: 'absolute', top: 20, right: 20 },

  avatarShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6
  },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    justifyContent: 'center', alignItems: 'center'
  },
  avatarText: { color: '#FFF', fontSize: 36, fontWeight: 'bold' },

  title:    { fontSize: 22, fontWeight: '700', marginTop: 16 },
  subtitle: { fontSize: 14, marginBottom: 32 },

  card: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4
  },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20
  },
  placeholder: { marginLeft: 8, fontSize: 14 },

  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 10
  },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '600', marginRight: 4 },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40
  },
  logoBox: {
    width: 48, height: 48, backgroundColor: '#E5E7EB', borderRadius: 6
  },
  divider: {
    width: 1, height: 32, backgroundColor: '#D1D5DB', marginHorizontal: 20
  }
});