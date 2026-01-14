import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
  isRead?: boolean;
};

type Match = {
  id: string;
  product: string;
  location: string;
  date: string;
  imageUrl: string;
  isNew: boolean;
};

interface ChatScreenProps {
  match: Match | null;
  onClose: () => void;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hola, ¿tienes papa amarilla?',
    time: '10:30 AM',
    isMine: false
  },
  {
    id: '2',
    text: 'Sí, tengo 5 sacos listos.',
    time: '10:32 AM',
    isMine: true,
    isRead: true
  },
  {
    id: '3',
    text: '¿A qué precio?',
    time: '10:33 AM',
    isMine: false
  },
  {
    id: '4',
    text: 'A 80 soles el saco',
    time: '10:35 AM',
    isMine: true,
    isRead: true
  }
];

export default function ChatScreen({ match, onClose }: ChatScreenProps) {
  const [messages] = useState<Message[]>(MOCK_MESSAGES);
  const [messageText, setMessageText] = useState('');

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isMine && styles.myMessageContainer]}>
      <View style={[styles.messageBubble, item.isMine ? styles.myMessage : styles.theirMessage]}>
        <Text style={[styles.messageText, item.isMine && styles.myMessageText]}>
          {item.text}
        </Text>
      </View>
      <View style={[styles.messageInfo, item.isMine && styles.myMessageInfo]}>
        <Text style={styles.messageTime}>{item.time}</Text>
        {item.isMine && item.isRead && (
          <Ionicons name="checkmark-done" size={16} color="#4ADE80" />
        )}
      </View>
    </View>
  );

  const renderDateSeparator = () => (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateText}>Hoy</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#64748B" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Juan Pérez</Text>
            <Text style={styles.headerStatus}>En línea</Text>
          </View>

          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          ListHeaderComponent={renderDateSeparator}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí..."
            placeholderTextColor="#94A3B8"
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9'
  },
  keyboardView: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A4A6B'
  },
  headerStatus: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 16
  },
  dateText: {
    fontSize: 12,
    color: '#94A3B8',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12
  },
  messageContainer: {
    marginBottom: 16,
    alignItems: 'flex-start'
  },
  myMessageContainer: {
    alignItems: 'flex-end'
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18
  },
  theirMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4
  },
  myMessage: {
    backgroundColor: '#4ADE80',
    borderBottomRightRadius: 4
  },
  messageText: {
    fontSize: 15,
    color: '#0F172A',
    lineHeight: 20
  },
  myMessageText: {
    color: '#000'
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 4,
    gap: 4
  },
  myMessageInfo: {
    marginLeft: 0,
    marginRight: 4
  },
  messageTime: {
    fontSize: 11,
    color: '#94A3B8'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12
  },
  input: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
    maxHeight: 100
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4ADE80',
    justifyContent: 'center',
    alignItems: 'center'
  }
});