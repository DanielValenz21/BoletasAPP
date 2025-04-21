import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function Spinner({ size = 20 }) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size={size} color="#FFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 6 }
});