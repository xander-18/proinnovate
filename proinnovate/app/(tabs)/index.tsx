// import ChatScreen from "@/components/ChatScreen";
import ChatScreen from "@/components/ChatScreen";
import NewDemand from "@/components/NewDemand";
import PublishOffer from "@/components/PublishOffer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Match = {
  id: string;
  product: string;
  location: string;
  date: string;
  imageUrl: string;
  isNew: boolean;
};

const MOCK_MATCHES: Match[] = [
  {
    id: "1",
    product: "Papa Canchán",
    location: "Huancayo, Junín",
    date: "Disp. 12 Oct",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200",
    isNew: true,
  },
  {
    id: "2",
    product: "Papa Canchán",
    location: "Huancayo, Junín",
    date: "Disp. 12 Oct",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200",
    isNew: false,
  },
  {
    id: "3",
    product: "Papa Canchán",
    location: "Huancayo, Junín",
    date: "Disp. 12 Oct",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200",
    isNew: true,
  },
];

export default function HomeScreen() {
  const [matches] = useState<Match[]>(MOCK_MATCHES);
  const [showNewDemand, setShowNewDemand] = useState(false);
  const [showPublishOffer, setShowPublishOffer] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const handleContactPress = (match: Match) => {
    setSelectedMatch(match);
    setShowChat(true);
  };

  const renderMatch = ({ item, index }: { item: Match; index: number }) => (
    <View style={styles.matchCard}>
      {item.isNew && (
        <View style={styles.newBadge}>
          <View style={styles.newDot} />
          <Text style={styles.newText}>NUEVO</Text>
        </View>
      )}

      <View style={styles.matchContent}>
        <View style={styles.matchInfo}>
          <Text style={styles.productName}>{item.product}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#4ADE80" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>

          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>

        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      </View>

      <TouchableOpacity
        style={[
          styles.contactButton,
          index === matches.length - 1 && styles.contactButtonOutline,
        ]}
        onPress={() => handleContactPress(item)}
      >
        <Ionicons
          name="chatbubble"
          size={16}
          color={index === matches.length - 1 ? "#4ADE80" : "#000"}
        />
        <Text
          style={[
            styles.contactButtonText,
            index === matches.length - 1 && styles.contactButtonTextOutline,
          ]}
        >
          {index === matches.length - 1 ? "Reanudar" : "Contactar"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {/* PANTALLA PRINCIPAL */}
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            <Ionicons name="arrow-back" size={24} color="#0A4A6B" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Mis Coincidencias</Text>
            <Ionicons name="leaf" size={24} color="#4ADE80" />
          </View>
        </View>

        {/* Matches Count */}
        <View style={styles.subHeader}>
          <Text style={styles.matchCount}>3 Nuevas conexiones</Text>
          <TouchableOpacity>
            <Text style={styles.filterButton}>Filtrar</Text>
          </TouchableOpacity>
        </View>

        {/* Matches List */}
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Floating Action Buttons */}
        <View style={styles.fabContainer}>
          <TouchableOpacity
            style={styles.fabSecondary}
            onPress={() => setShowNewDemand(true)}
          >
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.fabSecondaryText}>Nueva Demanda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fabPrimary}
            onPress={() => setShowPublishOffer(true)}
          >
            <Ionicons name="add" size={24} color="#000" />
            <Text style={styles.fabPrimaryText}>Publicar Oferta</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* MODAL: NUEVA DEMANDA */}
      <Modal
        visible={showNewDemand}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowNewDemand(false)}
      >
        <NewDemand onClose={() => setShowNewDemand(false)} />
      </Modal>

      {/* MODAL: PUBLICAR OFERTA */}
      <Modal
        visible={showPublishOffer}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowPublishOffer(false)}
      >
        <PublishOffer onClose={() => setShowPublishOffer(false)} />
      </Modal>

      {/* MODAL: CHAT */}
      <Modal
        visible={showChat}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowChat(false)}
      >
        <ChatScreen 
          match={selectedMatch}
          onClose={() => setShowChat(false)} 
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0A4A6B",
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  matchCount: {
    fontSize: 14,
    color: "#64748B",
  },
  filterButton: {
    fontSize: 14,
    color: "#4ADE80",
    fontWeight: "600",
  },
  listContent: {
    padding: 20,
    paddingBottom: 200,
  },
  matchCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  newBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  newDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
  },
  newText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4ADE80",
    letterSpacing: 0.5,
  },
  matchContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  matchInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0A4A6B",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#64748B",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#94A3B8",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4ADE80",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  contactButtonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4ADE80",
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  contactButtonTextOutline: {
    color: "#4ADE80",
  },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    gap: 12,
    paddingBottom: 20,
  },
  fabSecondary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A4A6B",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabSecondaryText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  fabPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4ADE80",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#4ADE80",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabPrimaryText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
  },
});