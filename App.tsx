import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './src/store';
import { RootState }       from './src/store';

import LoginScreen from './src/screens/LoginScreen';
import MainScreen  from './src/screens/MainScreen';

function Root() {
  const [dark, setDark] = React.useState(false);
  const token = useSelector((s: RootState) => s.auth.token);

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: dark? '#101113':'#FFF' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      {token
        ? <MainScreen dark={dark} toggleTheme={() => setDark(!dark)} />
        : <LoginScreen dark={dark} toggleTheme={() => setDark(!dark)} />
      }
    </SafeAreaView>
  );
}

export default function App() {
  /*  Provider + PersistGate envuelven la app entera  */
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
