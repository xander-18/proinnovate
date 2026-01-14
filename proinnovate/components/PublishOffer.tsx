import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface PublishOfferProps {
  onClose: () => void;
}

export default function PublishOffer({ onClose }: PublishOfferProps) {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Kg');
  const [isReady, setIsReady] = useState(true);
  const [location, setLocation] = useState('Huancayo, Junín');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#64748B" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Publicar Oferta</Text>
        
        <Ionicons name="leaf" size={24} color="#4ADE80" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.mainTitle}>¿Qué vas a vender hoy?</Text>
        <Text style={styles.subtitle}>Completa los datos para encontrar compradores</Text>

        {/* Producto */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cube-outline" size={20} color="#4ADE80" />
            <Text style={styles.sectionTitle}>Producto</Text>
          </View>

          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownPlaceholder}>Selecciona cultivo...</Text>
            <Ionicons name="chevron-down" size={20} color="#4ADE80" />
          </TouchableOpacity>
        </View>

        {/* Cantidad */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.quantitySection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calculator-outline" size={20} color="#4ADE80" />
                <Text style={styles.sectionTitle}>Cantidad</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />
            </View>

            <View style={styles.unitSection}>
              <Text style={styles.unitLabel}>Unidad</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>{unit}</Text>
                <Ionicons name="chevron-down" size={20} color="#4ADE80" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ¿Cuándo está lista? */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={20} color="#4ADE80" />
            <Text style={styles.sectionTitle}>¿Cuándo está lista?</Text>
          </View>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isReady && styles.toggleButtonActive]}
              onPress={() => setIsReady(true)}
            >
              <Text style={[styles.toggleText, isReady && styles.toggleTextActive]}>
                Ya lo tengo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleButton, !isReady && styles.toggleButtonActive]}
              onPress={() => setIsReady(false)}
            >
              <Text style={[styles.toggleText, !isReady && styles.toggleTextActive]}>
                Cosecha futura
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ubicación */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location" size={20} color="#4ADE80" />
            <Text style={styles.sectionTitle}>Ubicación</Text>
          </View>

          <View style={styles.locationCard}>
            <Text style={styles.locationText}>{location}</Text>
            <TouchableOpacity>
              <Ionicons name="add-circle" size={24} color="#4ADE80" />
            </TouchableOpacity>
          </View>

          <Text style={styles.helperText}>Detectado automáticamente</Text>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.publishButton}>
          <Text style={styles.publishButtonText}>Publicar Oferta</Text>
          <Ionicons name="arrow-forward" size={20} color="#000" />
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A4A6B'
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
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 24
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A4A6B'
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
    gap: 12
  },
  quantitySection: {
    flex: 2
  },
  unitSection: {
    flex: 1
  },
  unitLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A4A6B',
    marginBottom: 12
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    gap: 4
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  toggleButtonActive: {
    backgroundColor: '#4ADE80'
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B'
  },
  toggleTextActive: {
    color: '#000'
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8
  },
  locationText: {
    fontSize: 15,
    color: '#0A4A6B'
  },
  helperText: {
    fontSize: 12,
    color: '#4ADE80',
    marginLeft: 4
  },
  spacer: {
    height: 100
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0'
  },
  publishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ADE80',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000'
  }
});