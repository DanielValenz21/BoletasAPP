import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Boleta } from '../store/boletaSlice';
import { formatMoney, formatDate } from '../utils/format';

const GREEN = '#1E7F40';

interface Props {
  visible: boolean;
  onClose: () => void;
  data: Boleta | null;
}

export default function BoletaModal({ visible, onClose, data }: Props) {
  if (!data) return null;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.box}>{children}</View>
    </View>
  );

  const Row = ({ label, value }: { label: string; value: string | number }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'fullScreen'}
      onRequestClose={onClose}
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* encabezado */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{data.numeroPlaca}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>{formatMoney(data.monto)}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="x" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            <Section title="Información del Infractor">
              <Row label="Nombre Completo" value={`${data.nombres} ${data.apellidos}`} />
              <Row label="Licencia"         value={data.licencia} />
              <Row label="Tipo de Licencia" value={data.tipoLicencia} />
              <Row label="Género"           value={data.genero === 'M' ? 'Masculino' : 'Femenino'} />
              <Row label="NIT"              value={data.nit ?? '—'} />
            </Section>

            <Section title="Información del Vehículo">
              <Row label="Placa"                value={data.numeroPlaca} />
              <Row label="Tipo"                 value={data.tipoVehiculo} />
              <Row label="Marca"                value={data.marca} />
              <Row label="Color"                value={data.color} />
              <Row label="Tarjeta de Circulación" value={data.tarjetaCirculacion} />
            </Section>

            <Section title="Detalles de la Infracción">
              <Row label="Artículo Infringido" value={data.articuloInfringido} />
              <Row label="Base Legal"          value={data.baseLegal} />
              <Row label="Monto"               value={formatMoney(data.monto)} />
              <Row label="Lugar"               value={data.lugarInfraccion} />
              <Row label="Fecha"               value={formatDate(data.fechaInfraccion)} />
              <Row label="Hora"                value={data.horaInfraccion} />
              <Row label="Observaciones"       value={data.observaciones ?? '—'} />
            </Section>

            <Section title="Información del Agente">
              <Row label="Número de Agente" value={data.numeroAgente} />
            </Section>

            <TouchableOpacity style={styles.footerBtn} onPress={onClose}>
              <Text style={styles.footerTxt}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay:{ flex:1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'flex-end' },
  container:{ maxHeight:'90%', backgroundColor:'#FFF', borderTopLeftRadius:20, borderTopRightRadius:20 },
  header:{
    flexDirection:'row', alignItems:'center', padding:20, borderBottomWidth:1,
    borderColor:'#EEE',
  },
  headerTitle:{ fontSize:20, fontWeight:'700', color:GREEN, flex:1 },
  badge:{ backgroundColor:'#D1FAE5', paddingHorizontal:12, paddingVertical:4,
          borderRadius:16 },
  badgeTxt:{ color:GREEN, fontWeight:'700' },
  closeBtn:{ marginLeft:12 },

  section:{ marginTop:24, paddingHorizontal:20 },
  sectionTitle:{ fontSize:16, fontWeight:'700', color:GREEN, marginBottom:8 },
  box:{ backgroundColor:'#F9FAFB', borderRadius:12, padding:16 },
  row:{ flexDirection:'row', justifyContent:'space-between', marginBottom:12 },
  label:{ fontSize:12, color:'#6B7280', flex:1 },
  value:{ fontWeight:'600', flex:1, textAlign:'right' },

  footerBtn:{ backgroundColor:GREEN, margin:20, paddingVertical:14, borderRadius:12,
              alignItems:'center' },
  footerTxt:{ color:'#FFF', fontWeight:'700' },
});
