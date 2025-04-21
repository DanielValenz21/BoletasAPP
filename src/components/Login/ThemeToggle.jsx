import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default function ThemeToggle({ dark, toggle }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={toggle}>
      <Icon name={dark ? 'sun' : 'moon'} size={20} color={dark ? '#FFD740' : '#333'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { position: 'absolute', top: 20, right: 20, padding: 6 }
});