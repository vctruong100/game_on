// app/screens/messages.tsx

import { Ionicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants'
import { Message, messagesData } from '../../script/messageData'

const C = Colors.light

const allContacts = Array.from(new Set(messagesData.map((m) => m.sender)))

export default function Messages() {
  const router = useRouter()
  const navigation = useNavigation()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [showModal, setShowModal] = useState(false)
  const [contactQuery, setContactQuery] = useState('')

  useEffect(() => {
    setMessages([...messagesData])
  }, [messagesData])

  const filteredMessages = messages.filter((msg) => {
    const query = input.trim().toLowerCase()
    if (query === '') return true
    return msg.sender.toLowerCase().includes(query) || msg.preview.toLowerCase().includes(query)
  })

  const filteredContacts = allContacts.filter((contact) => {
    const query = contactQuery.trim().toLowerCase()
    if (query === '') return true
    return contact.toLowerCase().includes(query)
  })

  const renderMessage = ({ item: msg }: { item: Message }) => (
    <TouchableOpacity
      style={styles.msgRow}
      activeOpacity={0.7}
      onPress={() => router.push({ pathname: '/screens/direct_message', params: { user: msg.sender } })}
    >
      <Image source={require('../../assets/images/profile.png')} style={styles.avatar} />
      <View style={styles.msgBody}>
        <Text style={styles.senderName}>{msg.sender}</Text>
        <Text style={styles.preview} numberOfLines={1}>{msg.preview}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={C.border} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="menu" size={26} color={C.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Ionicons name="create-outline" size={24} color={C.headerText} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchArea}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={18} color={C.placeholder} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            onChangeText={setInput}
            value={input}
            placeholder="Search messages..."
            placeholderTextColor={C.placeholder}
          />
        </View>
      </View>

      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="mail-outline" size={48} color={C.border} />
            <Text style={styles.emptyText}>No messages yet</Text>
          </View>
        }
      />

      <Modal visible={showModal} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>New Message</Text>
                <View style={styles.modalSearchWrapper}>
                  <Ionicons name="search" size={16} color={C.placeholder} style={{ position: 'absolute', left: 12, zIndex: 1 }} />
                  <TextInput
                    placeholder="Search contacts..."
                    placeholderTextColor={C.placeholder}
                    style={styles.modalSearchInput}
                    value={contactQuery}
                    onChangeText={setContactQuery}
                  />
                </View>
                <ScrollView style={{ maxHeight: 250 }}>
                  {filteredContacts.map((contact) => (
                    <TouchableOpacity
                      key={contact}
                      style={styles.contactRow}
                      activeOpacity={0.7}
                      onPress={() => {
                        setShowModal(false)
                        setContactQuery('')
                        router.push({ pathname: '/screens/direct_message', params: { user: contact } })
                      }}
                    >
                      <Image source={require('../../assets/images/profile.png')} style={styles.contactAvatar} />
                      <Text style={styles.contactName}>{contact}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowModal(false)} activeOpacity={0.7}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.headerBg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: { color: C.headerText, fontSize: FontSize.xl, fontWeight: '700' },
  searchArea: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  searchInputWrapper: { position: 'relative', justifyContent: 'center' },
  searchIcon: { position: 'absolute', left: Spacing.md, zIndex: 1 },
  searchInput: {
    backgroundColor: C.inputBg,
    height: 42,
    borderRadius: BorderRadius.xl,
    paddingLeft: 40,
    paddingRight: Spacing.lg,
    fontSize: FontSize.md,
    color: C.text,
    borderWidth: 1,
    borderColor: C.border,
  },
  listContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxxl },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: C.border,
    gap: Spacing.md,
  },
  avatar: { width: 48, height: 48, borderRadius: BorderRadius.full },
  msgBody: { flex: 1 },
  senderName: { fontSize: FontSize.md, fontWeight: '700', color: C.text, marginBottom: 2 },
  preview: { fontSize: FontSize.sm, color: C.textSecondary },
  emptyState: { alignItems: 'center', paddingVertical: Spacing.xxxl * 2, gap: Spacing.md },
  emptyText: { fontSize: FontSize.md, color: C.textSecondary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: {
    width: '85%',
    backgroundColor: C.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
  },
  modalTitle: { fontSize: FontSize.xl, fontWeight: '700', color: C.text, marginBottom: Spacing.lg },
  modalSearchWrapper: { position: 'relative', justifyContent: 'center', marginBottom: Spacing.md },
  modalSearchInput: {
    backgroundColor: C.inputBg,
    height: 40,
    borderRadius: BorderRadius.md,
    paddingLeft: 36,
    paddingRight: Spacing.md,
    fontSize: FontSize.md,
    color: C.text,
    borderWidth: 1,
    borderColor: C.border,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderColor: C.border,
  },
  contactAvatar: { width: 36, height: 36, borderRadius: BorderRadius.full },
  contactName: { fontSize: FontSize.md, color: C.text, fontWeight: '500' },
  cancelBtn: { alignItems: 'center', marginTop: Spacing.lg, paddingVertical: Spacing.sm },
  cancelText: { fontSize: FontSize.md, color: C.accent, fontWeight: '600' },
})