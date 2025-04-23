import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider, useSelector }   from 'react-redux';
import { PersistGate }             from 'redux-persist/integration/react';

import { store, persistor, RootState } from './src/store';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen  from './src/screens/MainScreen';

function Router() {
  const [dark, setDark] = React.useState(false);
  const token = useSelector((s: RootState) => s.auth.token);

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: dark ? '#101113' : '#FFF' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      {token
        ? <MainScreen dark={dark} toggleTheme={() => setDark(!dark)} />
        : <LoginScreen dark={dark} toggleTheme={() => setDark(!dark)} />
      }
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      {/* PersistGate NO guarda auth, sólo sirve si más adelante persistes otros slices */}
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}
