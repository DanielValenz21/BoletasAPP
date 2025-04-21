import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen  from './src/screens/MainScreen';

export default function App() {
  const [logged, setLogged]   = useState(false);
  const [dark, setDark]       = useState(false);   // tema claro/oscuro

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: dark ? '#101113' : '#FFFFFF' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      {logged
        ? <MainScreen dark={dark} toggleTheme={() => setDark(!dark)} />
        : <LoginScreen dark={dark} toggleTheme={() => setDark(!dark)} onSuccess={() => setLogged(true)} />
      }
    </SafeAreaView>
  );
}
