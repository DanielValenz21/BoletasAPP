import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';

export default function LoginForm({ dark, onSuccess }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = () => {
    if (!user || !pass) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  const borderColor = dark ? '#444' : '#CCC';

  return (
    <View style={styles.form}>
      <Text style={[styles.label, { color: dark ? '#FFF' : '#000' }]}>Usuario</Text>
      <Input
        icon={<Icon name="mail" size={18} color={dark ? '#888' : '#999'} />}
        placeholder="Ingrese su usuario"
        value={user}
        onChangeText={setUser}
        dark={dark}
        borderColor={borderColor}
      />

      <Text style={[styles.label, { color: dark ? '#FFF' : '#000' }]}>Contraseña</Text>
      <Input
        icon={<Icon name="lock" size={18} color={dark ? '#888' : '#999'} />}
        placeholder="Ingrese su contraseña"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
        dark={dark}
        borderColor={borderColor}
      />

      <Button disabled={loading} fullWidth onPress={handle}>
        {loading
          ? <Spinner />
          : <>
              <Text style={styles.btnTxt}>Iniciar Sesión</Text>
              <Icon name="chevron-right" size={16} color="#FFF" style={{ marginLeft: 6 }}/>
            </>
        }
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { width: '100%' },
  label: { fontSize: 14, marginBottom: 6, fontWeight: '600' },
  btnTxt: { color: '#FFF', fontSize: 16, fontWeight: '600' }
});