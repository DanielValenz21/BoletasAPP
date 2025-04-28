import React from 'react';
import { SafeAreaView, StatusBar, Button } from 'react-native';
import { Provider, useSelector }   from 'react-redux';
import { PersistGate }             from 'redux-persist/integration/react';
import {launchCamera} from 'react-native-image-picker';

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
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
      <Button
        title="Test camera"
        onPress={() => {
          console.log('🟡 1) Pulsado');
          launchCamera(
            {mediaType: 'photo', includeBase64: false},
            r => console.log('🟢 2) callback ->', r),
          );
        }}
      />
    </>
  );
}
