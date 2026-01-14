import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface NewDemandProps {
  onClose: () => void;
}

export default function NewDemand({ onClose }: NewDemandProps) {
  const [offlineMode, setOfflineMode] = useState(false);
  const [quantity, setQuantity] = useState('0');
  const [unit, setUnit] = useState('Kilogramos');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Nueva Demanda</Text>
        
        <Ionicons name="leaf" size={24} color="#4ADE80" />
      </View>

      {/* Offline Mode Toggle */}
      <View style={styles.offlineContainer}>
        <View style={styles.offlineInfo}>
          <Ionicons name="wifi-outline" size={20} color="#94A3B8" />
          <View style={styles.offlineTextContainer}>
            <Text style={styles.offlineTitle}>Modo sin conexión</Text>
            <Text style={styles.offlineSubtitle}>Guardar borrador en dispositivo</Text>
          </View>
        </View>
        <Switch
          value={offlineMode}
          onValueChange={setOfflineMode}
          trackColor={{ false: '#E2E8F0', true: '#4ADE80' }}
          thumbColor="#fff"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.mainTitle}>¿Qué necesitas?</Text>

        {/* Producto Agrícola */}
        <View style={styles.section}>
          <Text style={styles.label}>Producto Agrícola</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownPlaceholder}>Selecciona un producto...</Text>
            <Ionicons name="chevron-down" size={20} color="#4ADE80" />
          </TouchableOpacity>
        </View>

        {/* ¿Cuánto necesitas? */}
        <Text style={styles.sectionTitle}>¿Cuánto necesitas?</Text>

        <View style={styles.row}>
          <View style={styles.quantitySection}>
            <Text style={styles.label}>Cantidad</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          <View style={styles.unitSection}>
            <Text style={styles.label}>Unidad</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{unit}</Text>
              <Ionicons name="chevron-down" size={20} color="#4ADE80" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Detalles de entrega */}
        <Text style={styles.sectionTitle}>Detalles de entrega</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Fecha límite de recepción</Text>
          <TouchableOpacity style={styles.dateInput}>
            <TextInput
              style={styles.dateText}
              placeholder="mm/dd/yyyy"
              value={date}
              onChangeText={setDate}
            />
            <Ionicons name="calendar-outline" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Zona de interés / Centro de acopio</Text>
          <View style={styles.locationInput}>
            <TextInput
              style={styles.locationText}
              placeholder="Ej. Mercado Mayorista, Lima"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity>
              <Ionicons name="add-circle" size={24} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            Ingresó el lugar donde recibirás el producto.
          </Text>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.publishButton}>
          <Text style={styles.publishButtonText}>Publicar Demanda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.draftButton}>
          <Text style={styles.draftButtonText}>Guardar como Borrador</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  cancelButton: {
    fontSize: 16,
    color: '#64748B'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A4A6B'
  },
  offlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  offlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  offlineTextContainer: {
    gap: 2
  },
  offlineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A4A6B'
  },
  offlineSubtitle: {
    fontSize: 12,
    color: '#94A3B8'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0A4A6B',
    marginTop: 24,
    marginBottom: 24
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A4A6B',
    marginBottom: 16,
    marginTop: 8
  },
  label: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: '#94A3B8'
  },
  dropdownText: {
    fontSize: 15,
    color: '#0A4A6B'
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20
  },
  quantitySection: {
    flex: 1
  },
  unitSection: {
    flex: 1
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 15,
    color: '#0A4A6B'
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    color: '#0A4A6B'
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 8
  },
  locationText: {
    flex: 1,
    fontSize: 15,
    color: '#0A4A6B'
  },
  helperText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4
  },
  spacer: {
    height: 120
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12
  },
  publishButton: {
    backgroundColor: '#4ADE80',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000'
  },
  draftButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ADE80'
  }
});