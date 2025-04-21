import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function Input({ icon, dark, borderColor, ...props }) {
  return (
    <View style={[styles.wrap, { borderColor, backgroundColor: dark ? '#1E1E1E' : '#FFF' }]}>
      {icon}
      <TextInput
        style={[styles.input, { color: dark ? '#FFF' : '#000' }]}
        placeholderTextColor={dark ? '#888' : '#AAA'}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16
  },
  input: { flex: 1, fontSize: 14 }
});