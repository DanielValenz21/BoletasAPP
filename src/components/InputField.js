import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function InputField({
  icon, placeholder, secureText, value, onChange, theme
}) {
  const { card, border, placeholder: phColor, text } = theme;
  return (
    <View style={[styles.wrapper, { backgroundColor: card, borderColor: border }]}>
      <Icon name={icon} size={18} color={phColor} style={styles.icon}/>
      <TextInput
        style={[styles.input, { color: text }]}
        placeholder={placeholder}
        placeholderTextColor={phColor}
        secureTextEntry={secureText}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems:   'center',
    borderWidth:  1,
    borderRadius: 8,
    padding:      10,
    marginBottom: 16
  },
  icon: { marginRight: 8 },
  input:{ flex:1, height: 40 }
});