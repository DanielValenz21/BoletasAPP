// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  return (
    <>
      {/* Ajusta el estilo de la barra de estado si quieres claro/oscuro */}
      <StatusBar barStyle="dark-content" />
      {/* Aquí invocas tu login */}
      <LoginScreen />
    </>
  );
}