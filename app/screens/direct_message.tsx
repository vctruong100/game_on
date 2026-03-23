// app/screens/direct_message.tsx

import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants'

const C = Colors.light

type ChatMessage = {
  user: string
  date: Date
  message: string
}

export default function DirectMessage() {
  const router = useRouter()
  const scrollRef = useRef<ScrollView>(null)
  const [input, setInput] = useState('')
  const { user } = useLocalSearchParams<{ user: string }>()

  const [messages, setMessages] = useState<ChatMessage[]>([
    { user: 'Tennislover123', date: new Date(2025, 3, 22, 20, 0, 0), message: "I'm gonna head home for now. See you later!" },
    { user: 'self', date: new Date(2025, 3, 22, 20, 3, 0), message: 'See you soon!' },
    { user: 'Tennislover123', date: new Date(2025, 3, 23, 18, 34, 0), message: "Gonna grab Carls Jr. rq then I'm heading there in 5 minutes" },
    { user: 'Tennislover123', date: new Date(2025, 3, 23, 18, 34, 10), message: 'Thanks so much for letting me play with yall today!' },
    { user: 'self', date: new Date(2025, 3, 23, 18, 35, 0), message: 'np thanks for joining' },
    { user: 'Tennislover123', date: new Date(2025, 6, 5, 16, 30, 0), message: 'hey! I saw your post just now and was wondering if I can join yall?' },
    { user: 'self', date: new Date(2025, 6, 5, 16, 34, 0), message: 'For sure!' },
    { user: 'Tennislover123', date: new Date(2025, 6, 5, 16, 40, 0), message: 'Awesome, see you there in 5!' },
    { user: 'self', date: new Date(2025, 6, 5, 16, 42, 0), message: 'On my way!' },
  ])

  const handleMessage = () => {
    if (input.trim() === '') return
    setMessages((prev) => [...prev, { user: 'self', date: new Date(), message: input.trim() }])
    setInput('')
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/screens/messages')}>
          <Ionicons name="arrow-back" size={24} color={C.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user ?? 'Chat'}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="flag-outline" size={22} color={C.headerText} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="information-circle-outline" size={22} color={C.headerText} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((msg, idx) => {
            const isSelf = msg.user === 'self'
            return (
              <View key={idx} style={[styles.bubble, isSelf ? styles.bubbleRight : styles.bubbleLeft]}>
                <Text style={[styles.bubbleText, isSelf && styles.bubbleTextSelf]}>{msg.message}</Text>
                <Text style={[styles.bubbleTime, isSelf && styles.bubbleTimeSelf]}>
                  {msg.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            )
          })}
        </ScrollView>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="camera-outline" size={24} color={C.icon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={setInput}
            value={input}
            placeholder="Message..."
            placeholderTextColor={C.placeholder}
            returnKeyType="send"
            onSubmitEditing={handleMessage}
          />
          <TouchableOpacity onPress={handleMessage} style={styles.sendBtn}>
            <Ionicons name="send" size={22} color={C.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerActions: { flexDirection: 'row', gap: Spacing.md },
  messagesContainer: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: Spacing.sm },
  bubble: {
    maxWidth: '78%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
  },
  bubbleLeft: {
    backgroundColor: C.surface,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: C.border,
    borderBottomLeftRadius: Spacing.xs,
  },
  bubbleRight: {
    backgroundColor: C.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: Spacing.xs,
  },
  bubbleText: { fontSize: FontSize.md, color: C.text, lineHeight: 22 },
  bubbleTextSelf: { color: '#fff' },
  bubbleTime: { fontSize: FontSize.xs, color: C.textSecondary, marginTop: Spacing.xs, textAlign: 'right' },
  bubbleTimeSelf: { color: 'rgba(255,255,255,0.7)' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
    gap: Spacing.sm,
  },
  attachBtn: { padding: Spacing.xs },
  input: {
    flex: 1,
    backgroundColor: C.inputBg,
    height: 42,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    fontSize: FontSize.md,
    color: C.text,
    borderWidth: 1,
    borderColor: C.border,
  },
  sendBtn: { padding: Spacing.xs },
})
