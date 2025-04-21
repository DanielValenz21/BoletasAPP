import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { RootState } from '../store';

const GREEN = '#1E7F40';
const GRAY  = '#888';

export default function LoginScreen({ dark, toggleTheme }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector(s => s.auth);

  const submit = () => {
    if (!user || !pass || loading) return;
    dispatch(login({ username: user, password: pass }));
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, dark && { backgroundColor:'#101113' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Toggle tema */}
        <TouchableOpacity style={styles.toggle} onPress={toggleTheme}>
          <Icon name={dark ? 'sun' : 'moon'} size={20} color={dark ? '#FFD740' : '#666'} />
        </TouchableOpacity>

        {/* Avatar TM */}
        <View style={styles.shadow}>
          <View style={[styles.avatar, { backgroundColor:GREEN }]}>
            <Text style={styles.avatarTxt}>TM</Text>
          </View>
        </View>

        <Text style={[styles.title, dark && { color:GREEN }]}>Tránsito Municipal</Text>
        <Text style={[styles.subtitle, dark && { color:'#AAA' }]}>
          Sistema de Control de Infracciones
        </Text>

        {/* Form */}
        <View style={[styles.card, dark && { backgroundColor:'#1C1D1F' }]}>
          {/* Usuario */}
          <Text style={[styles.label, dark && { color:'#FFF' }]}>Usuario</Text>
          <View style={[styles.inputWrap, dark && { borderColor:'#444' }]}>
            <Icon name="mail" size={18} color={GRAY} style={{ marginRight:8 }}/>
            <TextInput
              style={[styles.input, dark && { color:'#FFF' }]}
              placeholder="Ingrese su usuario"
              placeholderTextColor={GRAY}
              autoCapitalize="none"
              value={user}
              onChangeText={setUser}
              returnKeyType="next"
            />
          </View>

          {/* Contraseña */}
          <Text style={[styles.label, dark && { color:'#FFF' }]}>Contraseña</Text>
          <View style={[styles.inputWrap, dark && { borderColor:'#444' }]}>
            <Icon name="lock" size={18} color={GRAY} style={{ marginRight:8 }}/>
            <TextInput
              style={[styles.input, dark && { color:'#FFF' }]}
              placeholder="Ingrese su contraseña"
              placeholderTextColor={GRAY}
              secureTextEntry
              value={pass}
              onChangeText={setPass}
              returnKeyType="done"
              onSubmitEditing={submit}
            />
          </View>

          {/* Error */}
          {error && <Text style={styles.error}>{error}</Text>}

          {/* Botón */}
          <TouchableOpacity
            style={[styles.btn, loading && { opacity:0.7 }]}
            onPress={submit}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#FFF"/>
              : <>
                  <Text style={styles.btnTxt}>Iniciar Sesión</Text>
                  <Icon name="chevron-right" size={16} color="#FFF" />
                </>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* estilos… (idénticos a los que tenías) */
const styles = StyleSheet.create({
  flex:{ flex:1, backgroundColor:'#FFF' },
  container:{ alignItems:'center', padding:24 },
  toggle:{ position:'absolute', top:16, right:16, padding:6 },
  shadow:{ shadowColor:'#000', shadowOpacity:0.15,
           shadowOffset:{ width:0, height:4 }, shadowRadius:6, elevation:5 },
  avatar:{ width:100, height:100, borderRadius:50,
           alignItems:'center', justifyContent:'center' },
  avatarTxt:{ color:'#FFF', fontSize:36, fontWeight:'700' },
  title:{ fontSize:22, fontWeight:'700', color:GREEN, marginTop:20 },
  subtitle:{ fontSize:14, color:'#666', marginBottom:30 },
  card:{ width:'100%', borderRadius:16, backgroundColor:'#FFF', padding:20,
         shadowColor:'#000', shadowOpacity:0.1, shadowOffset:{ width:0, height:2 },
         shadowRadius:8, elevation:4 },
  label:{ fontSize:14, fontWeight:'600', marginBottom:6, color:'#000' },
  inputWrap:{ flexDirection:'row', alignItems:'center', borderWidth:1,
              borderColor:'#DDD', borderRadius:10, paddingHorizontal:12, marginBottom:20 },
  input:{ flex:1, height:44, fontSize:14, color:'#000' },
  error:{ color:'#DC2626', textAlign:'center', marginBottom:8 },
  btn:{ flexDirection:'row', justifyContent:'center', alignItems:'center',
        backgroundColor:GREEN, borderRadius:10, paddingVertical:14 },
  btnTxt:{ color:'#FFF', fontSize:16, fontWeight:'600', marginRight:4 },
});
