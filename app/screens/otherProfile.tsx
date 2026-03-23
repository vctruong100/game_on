// app/screens/otherProfile.tsx

import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants'

const C = Colors.light

export default function OtherProfile() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/screens/forum')}>
          <Ionicons name="arrow-back" size={24} color={C.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
          <Text style={styles.username}>tennislover134</Text>

          <View style={styles.stars}>
            {[1, 2, 3, 4].map((i) => <Ionicons key={i} name="star" size={18} color="#FBBF24" />)}
            <Ionicons name="star-outline" size={18} color="#FBBF24" />
          </View>

          <Text style={styles.followInfo}>123 Followers  ·  97 Following</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
              <Ionicons name="person-add-outline" size={16} color="#fff" />
              <Text style={styles.primaryBtnText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.7}>
              <Ionicons name="people-outline" size={16} color={C.primary} />
              <Text style={styles.secondaryBtnText}>Add Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.7}
              onPress={() => router.push({ pathname: '/screens/direct_message', params: { user: 'tennislover134' } })}
            >
              <Ionicons name="chatbubble-outline" size={16} color={C.primary} />
              <Text style={styles.secondaryBtnText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Favorite Sports</Text>
            <Text style={styles.infoValue}>Tennis, Badminton, Soccer</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Skill Level</Text>
            <Text style={styles.infoValue}>Tennis (3 yrs), Badminton (2 yrs), Soccer (5 yrs)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bio</Text>
            <Text style={styles.infoValue}>Just a student athlete who loves hitting the court. Always down for a match and meeting new players!</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.infoLabel}>Recent Friends</Text>
          <View style={styles.friendRow}>
            {[1, 2, 3].map((i) => (
              <Image key={i} source={require('../../assets/images/profile.png')} style={styles.friendImage} />
            ))}
          </View>
        </View>
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
  scrollContent: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl },
  profileSection: { alignItems: 'center', marginVertical: Spacing.xxl },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: C.primary },
  username: { fontSize: FontSize.xxl, fontWeight: '700', color: C.text, marginTop: Spacing.sm },
  stars: { flexDirection: 'row', marginTop: Spacing.xs, gap: 2 },
  followInfo: { fontSize: FontSize.sm, color: C.textSecondary, marginTop: Spacing.xs },
  buttonRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.lg },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: C.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  primaryBtnText: { color: '#fff', fontSize: FontSize.sm, fontWeight: '600' },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: C.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  secondaryBtnText: { color: C.primary, fontSize: FontSize.sm, fontWeight: '600' },
  card: {
    backgroundColor: C.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: Spacing.lg,
  },
  infoRow: { paddingVertical: Spacing.sm },
  infoLabel: { fontSize: FontSize.sm, fontWeight: '700', color: C.text, marginBottom: Spacing.xs },
  infoValue: { fontSize: FontSize.md, color: C.textSecondary, lineHeight: 22 },
  divider: { height: 1, backgroundColor: C.border, marginVertical: Spacing.xs },
  friendRow: { flexDirection: 'row', marginTop: Spacing.md, gap: Spacing.sm },
  friendImage: { width: 48, height: 48, borderRadius: BorderRadius.full },
})