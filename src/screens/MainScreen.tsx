/* ==========================================================
 * src/screens/MainScreen.tsx
 * Pantalla principal con OCR + envío de boletas
 * ========================================================== */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  RefreshControl,
  Switch,
  Alert,
} from 'react-native';
import TextRecognition from 'react-native-text-recognition';
import Icon            from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';

import Header      from '../components/Header';
import BoletaItem  from '../components/BoletaItem';
import BoletaModal from '../components/BoletaModal';

import {fetchBoletas, submitBoleta} from '../store/boletaSlice';
import type {RootState, AppDispatch} from '../store';
import type {Boleta} from '../store/boletaSlice';

import {openCamera} from '../utils/openCamera';   // << util para abrir cámara

const GREEN = '#1E7F40';
type Tab = 'scan' | 'history' | 'settings';

interface Props {
  dark: boolean;
  toggleTheme: () => void;
}

export default function MainScreen({dark, toggleTheme}: Props) {
  /* ---------------- Redux ---------------- */
  const dispatch = useDispatch<AppDispatch>();
  const {list, loading, error} = useSelector((s: RootState) => s.boletas);

  /* ---------- fetch al montar / refrescar ---------- */
  const load = useCallback(() => dispatch(fetchBoletas()), [dispatch]);
  useEffect(() => { load(); }, [load]);

  /* ---------------- UI state ---------------- */
  const [tab, setTab]         = useState<Tab>('history');
  const [sel, setSel]         = useState<Boleta | null>(null);
  const [ocr, setOcr]         = useState<Partial<Omit<Boleta, 'id'>> | null>(null);

  /* ---------------- Colores según tema ---------------- */
  const bg     = dark ? '#101113' : '#FFF';
  const card   = dark ? '#1C1D1F' : '#FFF';
  const muted  = dark ? '#AAA'    : '#666';
  const border = dark ? '#333'    : '#EEE';

  /* ---------- 1. ESCANEAR DOCUMENTO ---------- */
  const handleScan = async () => {
    const uri = await openCamera();
    if (!uri) return;

    const lines = await TextRecognition.recognize(uri);

    // Ajusta expresiones regulares a tu boleta real
    const placa    = lines.find(l => /placa[:\s\-]/i.test(l));
    const nombre   = lines.find(l => /nombres?[:\s\-]/i.test(l));
    const apellido = lines.find(l => /apellidos?[:\s\-]/i.test(l));
    const articulo = lines.find(l => /art\./i.test(l));
    const monto    = lines.find(l => /\$\s*\d+/i.test(l));

    setOcr({
      numeroPlaca: placa?.split(/[:\s]/).pop() || '',
      nombres: nombre   ? nombre.split(/[:\s]/).slice(1).join(' ')   : '',
      apellidos: apellido ? apellido.split(/[:\s]/).slice(1).join(' '): '',
      articuloInfringido: articulo || '',
      monto: monto ? parseFloat(monto.replace(/[^\d.]/g, '')) : 0,
      tarjetaCirculacion: '',
      nit: '',
      tipoVehiculo: '',
      marca: '',
      color: '',
      licencia: '',
      tipoLicencia: '',
      genero: '',
      baseLegal: '',
      lugarInfraccion: '',
      fechaInfraccion: new Date().toISOString().split('T')[0],
      horaInfraccion: new Date().toTimeString().slice(0,5),
      observaciones: '',
      numeroAgente: '',
    });
    setTab('scan');          // por si venías de otro tab
  };

  /* ---------- 2. ENVIAR AL BACKEND ---------- */
  const handleSend = async () => {
    if (!ocr) return;
    try {
      const {message} = await dispatch(submitBoleta(ocr as any)).unwrap();
      Alert.alert('Éxito', message);
      setOcr(null);
      load();
    } catch (err: any) {
      Alert.alert('Error', err.message || String(err));
    }
  };

  /* ---------------- Render ---------------- */
  return (
    <View style={[styles.flex, {backgroundColor: bg}]}>
      <Header dark={dark} toggleTheme={toggleTheme} />

      {/* ------------ HISTORIAL ------------ */}
      {tab === 'history' && (
        <FlatList
          data={list}
          keyExtractor={b => String(b.id)}
          renderItem={({item}) => (
            <BoletaItem
              data={item}
              card={card}
              onPress={() => setSel(item)}
            />
          )}
          contentContainerStyle={{padding: 16}}
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
          ListEmptyComponent={
            loading ? null : (
              <Text style={[styles.empty, {color: muted}]}>
                {error ?? 'Sin boletas aún'}
              </Text>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={load}
              tintColor={GREEN}
            />
          }
        />
      )}

      {/* ------------ ESCANEAR ------------- */}
      {tab === 'scan' && (
        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.h1}>Escaneo de Boletas de Multa</Text>

          <TouchableOpacity style={[styles.scanBtn, {backgroundColor: GREEN}]}
                            onPress={handleScan}>
            <Icon name="camera" size={20} color="#FFF" style={{marginRight: 8}} />
            <Text style={styles.scanTxt}>Escanear Documento</Text>
          </TouchableOpacity>

          {ocr && (
            <View style={[styles.card, {backgroundColor: card}]}>
              <Text style={styles.cardTitle}>Datos Extraídos</Text>

              <DataRow icon="truck"       label="Número de Placa" value={ocr.numeroPlaca!} muted={muted}/>
              <DataRow icon="user"        label="Nombre"          value={`${ocr.nombres} ${ocr.apellidos}`} muted={muted}/>
              <DataRow icon="file-text"   label="Artículo"        value={ocr.articuloInfringido!} muted={muted}/>
              <DataRow icon="dollar-sign" label="Monto"           value={`$${ocr.monto?.toFixed(2)}`} muted={muted}/>

              <TouchableOpacity style={[styles.sendBtn, {backgroundColor: GREEN}]}
                                onPress={handleSend}>
                <Icon name="send" size={18} color="#FFF" style={{marginRight: 6}} />
                <Text style={styles.sendTxt}>Enviar Multa</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      {/* ------------ AJUSTES ------------- */}
      {tab === 'settings' && (
        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.h1}>Configuración</Text>

          <View style={[styles.settingsCard, {backgroundColor: card, borderColor: border}]}>
            <SettingRow icon="moon" label="Tema">
              <Switch
                value={dark}
                onValueChange={toggleTheme}
                thumbColor={dark ? GREEN : '#FFF'}
                trackColor={{true: '#6EE7B7', false: '#C4C4C4'}}
              />
            </SettingRow>
          </View>
        </ScrollView>
      )}

      {/* ------------ Bottom Nav ------------ */}
      <View style={[styles.nav, {borderColor: border}]}>
        <Nav icon="camera"    label="Escanear"  active={tab === 'scan'}     onPress={() => setTab('scan')}     dark={dark}/>
        <Nav icon="file-text" label="Historial" active={tab === 'history'} onPress={() => setTab('history')} dark={dark}/>
        <Nav icon="settings"  label="Ajustes"   active={tab === 'settings'} onPress={() => setTab('settings')} dark={dark}/>
        <TouchableOpacity style={styles.reload} onPress={load}>
          <Icon name="rotate-ccw" size={20} color={GREEN} />
        </TouchableOpacity>
      </View>

      {/* ------------ Modal Detalle ------------ */}
      {sel && (
        <BoletaModal
          visible
          data={sel}
          onClose={() => setSel(null)}
        />
      )}
    </View>
  );
}

/* ---------- Sub-components ---------- */
function DataRow({icon, label, value, muted}:
  {icon: string; label: string; value: string; muted: string}) {
  return (
    <View style={styles.dataRow}>
      <Icon name={icon} size={18} color={GREEN} style={{marginRight: 12}} />
      <View style={{flex: 1}}>
        <Text style={[styles.dataLabel, {color: muted}]}>{label}</Text>
        <Text style={styles.dataValue}>{value}</Text>
      </View>
    </View>
  );
}
function SettingRow({icon, label, children}:
  {icon: string; label: string; children?: React.ReactNode}) {
  return (
    <View style={styles.settingRow}>
      <Icon name={icon} size={18} color={GREEN} style={{marginRight: 12}} />
      <Text style={styles.settingTxt}>{label}</Text>
      {children && <View style={{marginLeft: 'auto'}}>{children}</View>}
    </View>
  );
}
function Nav({icon, label, active, onPress, dark}:
  {icon: string; label: string; active: boolean; onPress: () => void; dark: boolean}) {
  return (
    <TouchableOpacity style={styles.navBtn} onPress={onPress}>
      <Icon name={icon} size={22} color={active ? GREEN : dark ? '#888' : '#666'} />
      <Text style={[
        styles.navTxt,
        {color: active ? GREEN : dark ? '#888' : '#666'},
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ---------- Estilos ---------- */
const styles = StyleSheet.create({
  flex: {flex: 1},

  /* Historial */
  empty: {alignSelf: 'center', marginTop: 40},

  /* Escanear */
  body: {padding: 16},
  h1:   {fontSize: 18, fontWeight: '700', color: GREEN, alignSelf: 'center', marginBottom: 16},
  scanBtn: {flexDirection: 'row', alignSelf: 'center', borderRadius: 12,
            paddingVertical: 14, paddingHorizontal: 24, marginBottom: 20},
  scanTxt: {color: '#FFF', fontSize: 16, fontWeight: '600'},
  card: {borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.08,
         shadowOffset: {width: 0, height: 2}, shadowRadius: 8, elevation: 4},
  cardTitle: {fontSize: 16, fontWeight: '700', color: GREEN, alignSelf: 'center', marginBottom: 16},
  dataRow: {flexDirection: 'row', marginBottom: 14},
  dataLabel: {fontSize: 12},
  dataValue: {fontSize: 15, fontWeight: '600'},
  sendBtn: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            borderRadius: 12, paddingVertical: 12, marginTop: 8},
  sendTxt: {color: '#FFF', fontWeight: '600'},

  /* Ajustes */
  settingsCard: {borderRadius: 16, borderWidth: 1},
  settingRow:   {flexDirection: 'row', alignItems: 'center', padding: 20},
  settingTxt:   {fontSize: 16},

  /* Nav */
  nav: {flexDirection: 'row', borderTopWidth: 1, alignItems: 'center'},
  navBtn: {flex: 1, alignItems: 'center', paddingVertical: 10},
  navTxt: {fontSize: 12, marginTop: 2},
  reload: {position: 'absolute', right: 16, top: -28, padding: 6, borderRadius: 20,
           backgroundColor: '#FFF', elevation: 4, shadowColor: '#000',
           shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1,
           shadowRadius: 3},
});
