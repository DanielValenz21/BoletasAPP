import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ style, dark, ...props }) => {
  return (
    <TextInput
      style={[
        styles.input,
        { 
          backgroundColor: dark ? '#2C2C2E' : '#F2F2F7',
          color: dark ? '#FFFFFF' : '#000000'
        },
        style
      ]}
      placeholderTextColor={dark ? '#8E8E93' : '#3C3C43'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginVertical: 8,
  }
});

export default Input;
