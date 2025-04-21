import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Header({ dark, toggleTheme }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={[styles.avatar, { borderColor: '#1E7F40' }]}>
          {/* reemplaza Image con tu logo si quieres */}
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.avatarImg}
          />
        </View>
        <View>
          <Text style={[styles.welcome, { color: dark ? '#FFF' : '#000' }]}>
            Bienvenido,
          </Text>
          <Text style={[styles.user, { color: dark ? '#FFF' : '#000' }]}>
            Oficial García
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={toggleTheme}>
        <Icon name={dark ? 'sun' : 'moon'} size={24} color={dark ? '#FFD740' : '#333'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 2, marginRight: 12, overflow: 'hidden'
  },
  avatarImg: { width: '100%', height: '100%' },
  welcome: { fontSize: 12 },
  user:    { fontSize: 16, fontWeight: '600' }
});