// app/screens/AddPostModal.tsx

import React, { useState } from 'react'
import { TouchableWithoutFeedback, Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants'
import { ForumPost, addPost } from '../../script/forumData'

const C = Colors.light

interface Props {
  visible: boolean
  onClose: () => void
}

export default function AddPostModal({ visible, onClose }: Props) {
  const [message, setMessage] = useState('')
  const [sport, setSport] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [needed, setNeeded] = useState('')
  const [author, setAuthor] = useState('Anonymous')

  const handleSubmit = () => {
    addPost({
      id: Date.now().toString(),
      author,
      message,
      time,
      location,
      sport,
      needed,
    })
    setMessage('')
    setSport('')
    setTime('')
    setLocation('')
    setNeeded('')
    onClose()
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.heading}>New Forum Post</Text>

              <Text style={styles.label}>Username</Text>
              <TextInput style={styles.input} placeholder="Your username" placeholderTextColor={C.placeholder} value={author} onChangeText={setAuthor} />

              <Text style={styles.label}>Message</Text>
              <TextInput style={styles.input} placeholder="What's happening?" placeholderTextColor={C.placeholder} value={message} onChangeText={setMessage} />

              <Text style={styles.label}>Sport</Text>
              <TextInput style={styles.input} placeholder="e.g. Basketball, Tennis" placeholderTextColor={C.placeholder} value={sport} onChangeText={setSport} />

              <Text style={styles.label}>Time</Text>
              <TextInput style={styles.input} placeholder="e.g. 5:00PM July 5" placeholderTextColor={C.placeholder} value={time} onChangeText={setTime} />

              <Text style={styles.label}>Location</Text>
              <TextInput style={styles.input} placeholder="Where?" placeholderTextColor={C.placeholder} value={location} onChangeText={setLocation} />

              <Text style={styles.label}>Players Needed</Text>
              <TextInput style={styles.input} placeholder="e.g. 2 more / all welcome" placeholderTextColor={C.placeholder} value={needed} onChangeText={setNeeded} />

              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose} activeOpacity={0.7}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
                  <Text style={styles.submitButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '88%',
    backgroundColor: C.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
  },
  heading: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: C.text,
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: C.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: C.inputBg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
    fontSize: FontSize.md,
    color: C.text,
    borderWidth: 1,
    borderColor: C.border,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.sm,
    gap: Spacing.md,
  },
  cancelButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: C.border,
  },
  cancelButtonText: {
    color: C.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  submitButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    backgroundColor: C.primary,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
})
