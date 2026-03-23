// app/screens/yourPosts.tsx

import { Ionicons } from '@expo/vector-icons'
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants'
import { CURRENT_USER_ID, deletePost, forumData, ForumPost, updatePost } from '../../script/forumData'

const C = Colors.light

export default function YourPosts() {
  const [yourPosts, setYourPosts] = useState<ForumPost[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedMessage, setEditedMessage] = useState('')
  const [editedTime, setEditedTime] = useState('')
  const [editedLocation, setEditedLocation] = useState('')
  const [editedSport, setEditedSport] = useState('')
  const [editedNeeded, setEditedNeeded] = useState('')
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      const filtered = forumData.filter((post) => post.userId === CURRENT_USER_ID)
      setYourPosts([...filtered])
    }, [])
  )

  const handleDelete = (id: string) => {
    Alert.alert('Delete Post', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          deletePost(id)
          setYourPosts(forumData.filter((p) => p.userId === CURRENT_USER_ID))
        },
        style: 'destructive',
      },
    ])
  }

  const handleStartEdit = (post: ForumPost) => {
    setEditingId(post.id)
    setEditedMessage(post.message)
    setEditedTime(post.time)
    setEditedLocation(post.location)
    setEditedSport(post.sport)
    setEditedNeeded(post.needed)
  }

  const handleSaveEdit = () => {
    if (editingId) {
      const updated = forumData.find((p) => p.id === editingId)
      if (updated) {
        updatePost({
          ...updated,
          message: editedMessage,
          time: editedTime,
          location: editedLocation,
          sport: editedSport,
          needed: editedNeeded,
        })
        setYourPosts(forumData.filter((p) => p.userId === CURRENT_USER_ID))
      }
      setEditingId(null)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="menu" size={26} color={C.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Posts</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {yourPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={48} color={C.border} />
            <Text style={styles.emptyText}>You haven't created any posts yet.</Text>
          </View>
        ) : (
          yourPosts.map((post) => (
            <View key={post.id} style={styles.card}>
              {editingId === post.id ? (
                <>
                  <Text style={styles.label}>Message</Text>
                  <TextInput style={styles.input} placeholder="Message" placeholderTextColor={C.placeholder} value={editedMessage} onChangeText={setEditedMessage} />
                  <Text style={styles.label}>Time</Text>
                  <TextInput style={styles.input} placeholder="Time" placeholderTextColor={C.placeholder} value={editedTime} onChangeText={setEditedTime} />
                  <Text style={styles.label}>Location</Text>
                  <TextInput style={styles.input} placeholder="Location" placeholderTextColor={C.placeholder} value={editedLocation} onChangeText={setEditedLocation} />
                  <Text style={styles.label}>Sport</Text>
                  <TextInput style={styles.input} placeholder="Sport" placeholderTextColor={C.placeholder} value={editedSport} onChangeText={setEditedSport} />
                  <Text style={styles.label}>Needed</Text>
                  <TextInput style={styles.input} placeholder="Needed" placeholderTextColor={C.placeholder} value={editedNeeded} onChangeText={setEditedNeeded} />
                  <View style={styles.editActions}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditingId(null)} activeOpacity={0.7}>
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={handleSaveEdit} activeOpacity={0.8}>
                      <Text style={styles.saveBtnText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.message}>{post.message}</Text>
                  <Text style={styles.meta}>
                    {post.author}  ·  {post.time}  ·  {post.sport}
                  </Text>
                  <Text style={styles.meta}>
                    <Ionicons name="location-outline" size={13} color={C.textSecondary} /> {post.location}  ·  Needs: {post.needed}
                  </Text>
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => handleStartEdit(post)} activeOpacity={0.7}>
                      <Ionicons name="create-outline" size={22} color={C.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(post.id)} activeOpacity={0.7}>
                      <Ionicons name="trash-outline" size={22} color={C.accent} />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))
        )}
      </ScrollView>
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
  list: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.xxxl },
  card: {
    backgroundColor: C.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: C.border,
  },
  message: { fontSize: FontSize.lg, fontWeight: '700', color: C.text, marginBottom: Spacing.xs },
  meta: { fontSize: FontSize.sm, color: C.textSecondary, marginTop: Spacing.xs },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: Spacing.md, gap: Spacing.xl },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: C.textSecondary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: C.inputBg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    fontSize: FontSize.md,
    color: C.text,
    borderWidth: 1,
    borderColor: C.border,
  },
  editActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: Spacing.lg, gap: Spacing.md },
  cancelBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: C.border,
  },
  cancelBtnText: { color: C.textSecondary, fontSize: FontSize.sm, fontWeight: '600' },
  saveBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    backgroundColor: C.primary,
  },
  saveBtnText: { color: '#fff', fontSize: FontSize.sm, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: Spacing.xxxl * 2, gap: Spacing.md },
  emptyText: { fontSize: FontSize.md, color: C.textSecondary },
})