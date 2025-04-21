import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  dark: boolean;
  toggleTheme: () => void;
}

export default function Header({ dark, toggleTheme }: Props) {
  return (
    <View style={[styles.wrap, dark && { backgroundColor:'#1C1D1F' }]}>
      <View style={styles.left}>
        <View style={[styles.avatar, { borderColor:'#1E7F40' }]}>
          <Image source={{ uri:'https://via.placeholder.com/40' }} style={{ flex:1 }} />
        </View>
        <View>
          <Text style={[styles.welcome, dark && { color:'#FFF' }]}>Bienvenido,</Text>
          <Text style={[styles.name, dark && { color:'#FFF' }]}>Oficial García</Text>
        </View>
      </View>

      <TouchableOpacity onPress={toggleTheme} style={{ padding:6 }}>
        <Icon name={dark ? 'sun' : 'moon'} size={20} color={dark ? '#FFD740' : '#333'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center',
         padding:16, backgroundColor:'#FFF' },
  left:{ flexDirection:'row', alignItems:'center' },
  avatar:{ width:40, height:40, borderRadius:20, overflow:'hidden', borderWidth:2,
           marginRight:12 },
  welcome:{ fontSize:12, color:'#444' },
  name:{ fontSize:16, fontWeight:'700', color:'#000' },
});
