import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('🚪 PROFILE: Cerrando sesión...');
              await logout();
              console.log('✅ PROFILE: Sesión cerrada, navegando a login');
              router.replace('/login');
            } catch (error) {
              console.error('❌ PROFILE: Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo nuevamente.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil de Usuario</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color="#4ADE80" />
          <Text style={styles.logoText}>WakiPE</Text>
        </View>

        {/* Avatar y nombre */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0).toUpperCase() || '?'}
                </Text>
              </View>
            )}
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={24} color="#4ADE80" />
            </View>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'Usuario'}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Pequeño Productor</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#4ADE80" />
            <Text style={styles.locationText}>Moyobamba, San Martín</Text>
          </View>
        </View>

        {/* Info Cards Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Ionicons name="leaf-outline" size={20} color="#4ADE80" />
            <Text style={styles.infoCardTitle}>CULTIVOS</Text>
            <Text style={styles.infoCardValue}>Café, Cacao</Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="call-outline" size={20} color="#4ADE80" />
            <Text style={styles.infoCardTitle}>TELÉFONO</Text>
            <Text style={styles.infoCardValue}>+51 987 654 321</Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="mail-outline" size={20} color="#4ADE80" />
            <Text style={styles.infoCardTitle}>EMAIL</Text>
            <Text style={styles.infoCardValue} numberOfLines={1}>
              {user?.email || 'N/A'}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="checkmark-circle" size={20} color="#4ADE80" />
            <Text style={styles.infoCardTitle}>ESTADO</Text>
            <Text style={[styles.infoCardValue, styles.verified]}>Verificado</Text>
          </View>
        </View>

        {/* Zona de Operación */}
        <View style={styles.operationZone}>
          <Text style={styles.operationTitle}>Zona de Operación</Text>
          
          <View style={styles.operationCard}>
            <Text style={styles.operationDescription}>
              Distrito de Moyobamba, Sector Norte.
            </Text>
            <Text style={styles.operationSubtext}>
              Cerca al centro de acopio principal.
            </Text>

            <View style={styles.mapSection}>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="location" size={48} color="#4ADE80" />
                <Text style={styles.mapTitle}>Mapa Interactivo</Text>
                <Text style={styles.mapSubtitle}>
                  Cargar mapa de la zona (aprox. 150 KB)
                </Text>
              </View>

              <TouchableOpacity style={styles.mapButton}>
                <Ionicons name="download-outline" size={20} color="#000" />
                <Text style={styles.mapButtonText}>Cargar Mapa</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.securityNote}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#94A3B8" />
              <Text style={styles.securityText}>
                La ubicación exacta se oculta por seguridad. Solo se muestra el área aproximada de operación.
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
            <Text style={styles.messageButtonText}>Mensaje</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={20} color="#000" />
            <Text style={styles.contactButtonText}>Contactar</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A4A6B'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0A4A6B'
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  editButtonText: {
    color: '#4ADE80',
    fontSize: 16,
    fontWeight: '500'
  },
  scrollView: {
    flex: 1
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8
  },
  profileSection: {
    alignItems: 'center',
    paddingBottom: 30
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff'
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff'
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff'
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  locationText: {
    color: '#fff',
    fontSize: 14
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20
  },
  infoCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  infoCardTitle: {
    fontSize: 10,
    color: '#4ADE80',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4
  },
  infoCardValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500'
  },
  verified: {
    color: '#4ADE80'
  },
  operationZone: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  operationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12
  },
  operationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  operationDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4
  },
  operationSubtext: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 20
  },
  mapSection: {
    backgroundColor: 'rgba(30, 64, 175, 0.3)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16
  },
  mapPlaceholder: {
    alignItems: 'center',
    marginBottom: 16
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4
  },
  mapSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center'
  },
  mapButton: {
    backgroundColor: '#4ADE80',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8
  },
  mapButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600'
  },
  securityNote: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start'
  },
  securityText: {
    flex: 1,
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  contactButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ADE80',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8
  },
  contactButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  bottomSpacer: {
    height: 20
  }
});