import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../components/Header';

const GREEN = '#1E7F40';
type Tab = 'scan' | 'history' | 'settings';

interface Props {
  dark: boolean;
  toggleTheme: () => void;
}

export default function MainScreen({ dark, toggleTheme }: Props) {
  const [tab, setTab] = useState<Tab>('scan');

  const bg     = dark ? '#101113' : '#FFF';
  const card   = dark ? '#1C1D1F' : '#FFF';
  const muted  = dark ? '#AAA' : '#666';
  const border = dark ? '#333' : '#EEE';

  return (
    <View style={[styles.flex, { backgroundColor:bg }]}>
      <Header dark={dark} toggleTheme={toggleTheme} />

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        {tab === 'scan' && (
          <>
            <Text style={styles.h1}>Escaneo de Boletas de Multa</Text>

            <TouchableOpacity style={[styles.scanBtn, { backgroundColor:GREEN }]}>
              <Icon name="camera" size={20} color="#FFF" style={{ marginRight:8 }}/>
              <Text style={styles.scanTxt}>Escanear Documento</Text>
            </TouchableOpacity>

            <View style={[styles.card, { backgroundColor:card }]}>
              <Text style={styles.cardTitle}>Datos Extraídos</Text>

              <DataRow icon="truck" label="Número de Placa"      value="ABC-123"  muted={muted}/>
              <DataRow icon="user"  label="Nombre del Infractor" value="Juan Pérez" muted={muted}/>
              <DataRow icon="file-text" label="Artículo Infringido" value="Art. 145 – Exceso de velocidad" muted={muted}/>
              <DataRow icon="dollar-sign" label="Monto" value="$150.00" muted={muted}/>

              <TouchableOpacity style={[styles.sendBtn, { backgroundColor:GREEN }]}>
                <Icon name="send" size={18} color="#FFF" style={{ marginRight:6 }}/>
                <Text style={styles.sendTxt}>Enviar Multa</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {tab === 'history' && (
          <>
            <Text style={styles.h1}>Historial de Multas</Text>
            <HistoryRow plate="ABC‑123" name="Juan Pérez"  amount="$150.00" card={card} />
            <HistoryRow plate="XYZ‑789" name="María López" amount="$200.00" card={card} />
          </>
        )}

        {tab === 'settings' && (
          <>
            <Text style={styles.h1}>Configuración</Text>
            <View style={[styles.settingsCard, { backgroundColor:card, borderColor:border }]}>
              <SettingRow icon="user" label="Perfil de Usuario"/>
              <Divider border={border}/>
              <SettingRow icon="settings" label="Preferencias"/>
              <Divider border={border}/>
              <SettingRow icon="moon" label="Tema">
                <Switch
                  value={dark}
                  onValueChange={toggleTheme}
                  thumbColor={dark ? GREEN : '#FFF'}
                  trackColor={{ true:'#6EE7B7', false:'#C4C4C4' }}
                />
              </SettingRow>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom nav */}
      <View style={[styles.nav, { borderColor:border }]}>
        <Nav icon="camera"   label="Escanear" active={tab==='scan'}     onPress={()=>setTab('scan')}     dark={dark}/>
        <Nav icon="file-text" label="Historial" active={tab==='history'} onPress={()=>setTab('history')} dark={dark}/>
        <Nav icon="settings" label="Ajustes"  active={tab==='settings'} onPress={()=>setTab('settings')} dark={dark}/>
      </View>
    </View>
  );
}

/* ---------- subcomponents ---------- */

function DataRow({ icon, label, value, muted }:{
  icon:string; label:string; value:string; muted:string;
}) {
  return (
    <View style={styles.dataRow}>
      <Icon name={icon} size={18} color={GREEN} style={{ marginRight:12 }}/>
      <View style={{ flex:1 }}>
        <Text style={[styles.dataLabel, { color:muted }]}>{label}</Text>
        <Text style={styles.dataValue}>{value}</Text>
      </View>
    </View>
  );
}

function HistoryRow({ plate, name, amount, card }:{
  plate:string; name:string; amount:string; card:string;
}) {
  return (
    <View style={[styles.histRow, { backgroundColor:card }]}>
      <View>
        <Text style={styles.histPlate}>{plate}</Text>
        <Text style={styles.histName}>{name}</Text>
      </View>
      <Text style={styles.histAmount}>{amount}</Text>
    </View>
  );
}

function SettingRow({ icon, label, children }:{
  icon:string; label:string; children?:React.ReactNode;
}) {
  return (
    <View style={styles.settingRow}>
      <Icon name={icon} size={18} color={GREEN} style={{ marginRight:12 }}/>
      <Text style={styles.settingTxt}>{label}</Text>
      {children && <View style={{ marginLeft:'auto' }}>{children}</View>}
    </View>
  );
}

function Divider({ border }:{ border:string }) {
  return <View style={{ height:1, backgroundColor:border, marginHorizontal:-20 }}/>;
}

function Nav({ icon, label, active, onPress, dark }:{
  icon:string; label:string; active:boolean; onPress:()=>void; dark:boolean;
}) {
  return (
    <TouchableOpacity style={styles.navBtn} onPress={onPress}>
      <Icon name={icon} size={22} color={active ? GREEN : dark ? '#888' : '#666'} />
      <Text style={[
        styles.navTxt,
        { color: active ? GREEN : dark ? '#888' : '#666' },
      ]}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---------- estilos ---------- */

const styles = StyleSheet.create({
  flex:{ flex:1 },
  body:{ padding:16, flexGrow:1 },
  h1:{ fontSize:18, fontWeight:'700', color:GREEN, alignSelf:'center', marginBottom:16 },

  /* Scan */
  scanBtn:{ flexDirection:'row', alignSelf:'center', borderRadius:12,
            paddingVertical:14, paddingHorizontal:24 },
  scanTxt:{ color:'#FFF', fontSize:16, fontWeight:'600' },
  card:{ borderRadius:16, padding:20, shadowColor:'#000', shadowOpacity:0.08,
         shadowOffset:{ width:0, height:2 }, shadowRadius:8, elevation:4 },
  cardTitle:{ fontSize:16, fontWeight:'700', color:GREEN, alignSelf:'center',
              marginBottom:16 },
  dataRow:{ flexDirection:'row', marginBottom:14 },
  dataLabel:{ fontSize:12 },
  dataValue:{ fontSize:15, fontWeight:'600' },

  sendBtn:{ flexDirection:'row', justifyContent:'center', alignItems:'center',
            borderRadius:12, paddingVertical:12, marginTop:8 },
  sendTxt:{ color:'#FFF', fontWeight:'600' },

  /* History */
  histRow:{ flexDirection:'row', justifyContent:'space-between',
            padding:16, borderRadius:12, marginBottom:10 },
  histPlate:{ fontWeight:'700' },
  histName:{ fontSize:12, color:'#666' },
  histAmount:{ fontWeight:'700', color:GREEN },

  /* Settings */
  settingsCard:{ borderRadius:16, borderWidth:1 },
  settingRow:{ flexDirection:'row', alignItems:'center', padding:20 },
  settingTxt:{ fontSize:16 },

  /* Nav */
  nav:{ flexDirection:'row', borderTopWidth:1 },
  navBtn:{ flex:1, alignItems:'center', paddingVertical:10 },
  navTxt:{ fontSize:12, marginTop:2 },
});
