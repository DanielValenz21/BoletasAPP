import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoginHeader({ dark, animate }) {
  return (
    <View style={[styles.wrap, animate && styles.anim]}>
      <View style={[styles.avatar, { borderColor: '#1E7F40' }]}>
        <View style={styles.ping} />
        <Text style={styles.tm}>TM</Text>
      </View>
      <Text style={[styles.title, { color: '#1E7F40' }]}>Tránsito Municipal</Text>
      <Text style={[styles.sub, { color: dark ? '#AAA' : '#666' }]}>
        Sistema de Control de Infracciones
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginBottom: 40 },
  anim: { opacity: 0, transform: [{ scale: 1.1 }, { translateY: -10 }] },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 3, justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden'
  },
  ping: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#1E7F40',
    opacity: 0.2,
    transform: [{ scale: 1.5 }],
    // Para RN >=0.70 usar Animated API si querés ping real
  },
  tm: { fontSize: 32, fontWeight: 'bold', color: '#1E7F40' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 12 },
  sub: { fontSize: 14, marginTop: 4 }
});