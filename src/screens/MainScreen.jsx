// src/screens/MainScreen.tsx
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
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../components/Header';
import BoletaItem from '../components/BoletaItem';
import BoletaModal from '../components/BoletaModal';

import {fetchBoletas} from '../store/boletaSlice';
import type {RootState, AppDispatch} from '../store';
import type {Boleta} from '../store/boletaSlice';

import {openCamera} from '../utils/openCamera';        // ⬅️ NUEVO

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
  useEffect(() => {
    load();
  }, [load]);

  /* ---------------- UI state ---------------- */
  const [tab, setTab] = useState<Tab>('history');
  const [sel, setSel] = useState<Boleta | null>(null);

  /* ---------------- handler de cámara ---------------- */
  const handleScan = async () => {
    console.log('▶️  handleScan');
    try {
      const res = await openCamera();
      console.log('✅  openCamera result', res);
      if (!res) return;
      Alert.alert('Imagen capturada', res.uri ?? '—');
    } catch (e) {
      console.error('❌  openCamera error', e);
      Alert.alert('Error', String(e));
    }
  };

  /* ---------------- Colores según tema ---------------- */
  const bg = dark ? '#101113' : '#FFF';
  const card = dark ? '#1C1D1F' : '#FFF';
  const muted = dark ? '#AAA' : '#666';
  const border = dark ? '#333' : '#EEE';

  /* ---------------- Render ---------------- */
  return (
    <View style={[styles.flex, {backgroundColor: bg}]}>
      <Header dark={dark} toggleTheme={toggleTheme} />

      {/* ------------ Cuerpo ------------ */}
      {tab === 'history' && (
        <FlatList
          data={list}
          keyExtractor={b => String(b.id)}
          renderItem={({item}) => (
            <BoletaItem data={item} card={card} onPress={() => setSel(item)} />
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

      {tab === 'scan' && (
        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.h1}>Escaneo de Boletas de Multa</Text>

          {/* BOTÓN de cámara */}
          <TouchableOpacity
            style={[styles.scanBtn, {backgroundColor: GREEN}]}
            onPress={handleScan}>
            <Icon name="camera" size={20} color="#FFF" style={{marginRight: 8}} />
            <Text style={styles.scanTxt}>Escanear Documento</Text>
          </TouchableOpacity>

          {/* Tarjeta vacía (cuando integremos OCR la llenaremos) */}
          <View style={[styles.card, {backgroundColor: card}]}>
            <Text style={styles.cardTitle}>Datos Extraídos</Text>
            <Text style={{color: muted, alignSelf: 'center'}}>
              (Aún no hay datos)
            </Text>
          </View>
        </ScrollView>
      )}

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
        <Nav
          icon="camera"
          label="Escanear"
          active={tab === 'scan'}
          onPress={() => setTab('scan')}
          dark={dark}
        />
        <Nav
          icon="file-text"
          label="Historial"
          active={tab === 'history'}
          onPress={() => setTab('history')}
          dark={dark}
        />
        <Nav
          icon="settings"
          label="Ajustes"
          active={tab === 'settings'}
          onPress={() => setTab('settings')}
          dark={dark}
        />
        <TouchableOpacity style={styles.reload} onPress={load}>
          <Icon name="rotate-ccw" size={20} color={GREEN} />
        </TouchableOpacity>
      </View>

      {/* ------------ Modal ------------ */}
      {sel && (
        <BoletaModal visible data={sel} onClose={() => setSel(null)} />
      )}
    </View>
  );
}

/* ---------- Sub-components auxiliares ---------- */
function SettingRow({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.settingRow}>
      <Icon name={icon} size={18} color={GREEN} style={{marginRight: 12}} />
      <Text style={styles.settingTxt}>{label}</Text>
      {children && <View style={{marginLeft: 'auto'}}>{children}</View>}
    </View>
  );
}

function Nav({
  icon,
  label,
  active,
  onPress,
  dark,
}: {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
  dark: boolean;
}) {
  return (
    <TouchableOpacity style={styles.navBtn} onPress={onPress}>
      <Icon name={icon} size={22} color={active ? GREEN : dark ? '#888' : '#666'} />
      <Text
        style={[
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
  h1: {
    fontSize: 18,
    fontWeight: '700',
    color: GREEN,
    alignSelf: 'center',
    marginBottom: 16,
  },
  scanBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  scanTxt: {color: '#FFF', fontSize: 16, fontWeight: '600'},
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: GREEN,
    alignSelf: 'center',
    marginBottom: 16,
  },

  /* Ajustes */
  settingsCard: {borderRadius: 16, borderWidth: 1},
  settingRow: {flexDirection: 'row', alignItems: 'center', padding: 20},
  settingTxt: {fontSize: 16},

  /* Nav */
  nav: {flexDirection: 'row', borderTopWidth: 1, alignItems: 'center'},
  navBtn: {flex: 1, alignItems: 'center', paddingVertical: 10},
  navTxt: {fontSize: 12, marginTop: 2},
  reload: {
    position: 'absolute',
    right: 16,
    top: -28,
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
