import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Boleta } from '../store/boletaSlice';
import { formatMoney, formatDate } from '../utils/format';

const GREEN = '#1E7F40';

interface Props {
  data: Boleta;
  onPress: () => void;
  card: string;
}

export default function BoletaItem({ data, onPress, card }: Props) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: card }]} onPress={onPress}>
      <View>
        <Text style={styles.plate}>{data.numeroPlaca}</Text>
        <Text style={styles.name}>{`${data.nombres} ${data.apellidos}`}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>{formatMoney(data.monto)}</Text>
        <Text style={styles.date}>{formatDate(data.fechaInfraccion)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  plate:   { fontWeight: '700', fontSize: 16 },
  name:    { fontSize: 12, color: '#666' },
  right:   { alignItems: 'flex-end' },
  amount:  { fontWeight: '700', color: GREEN },
  date:    { fontSize: 12, color: '#666' },
});
