import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ children, disabled, fullWidth }) {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        fullWidth && styles.full,
        disabled ? styles.disabled : styles.active
      ]}
      disabled={disabled}
    >
      <Text style={styles.txt}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1E7F40',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  full: { width: '100%' },
  active: { opacity: 1 },
  disabled: { opacity: 0.7 },
  txt: { color: '#FFF', fontSize: 16, fontWeight: '600' }
});