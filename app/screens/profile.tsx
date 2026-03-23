// app/screens/profile.tsx

import { Ionicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants'

const C = Colors.light

export default function Profile() {
  const router = useRouter()
  const navigation = useNavigation()
  const [email, setEmail] = useState('tyler7128@outlook.com')
  const [username, setUsername] = useState('tylker13')
  const [zipcode, setZipCode] = useState('72881')
  const [favSport, setFavSport] = useState('Football, Tennis, Basketball')
  const [skillLevel, setLevel] = useState('FB (10 yrs), Tennis (2 yrs), Basketball (1 yr)')
  const [dob, setDOB] = useState('10/28/1989')
  const [bio, setBio] = useState('Passionate about sports and always looking for new teammates to play with. Weekend warrior and weekday strategist.')

  const onSubmit = () => {
    router.replace('/screens/forum')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="menu" size={26} color={C.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editAvatarBtn} activeOpacity={0.7}>
            <Ionicons name="camera-outline" size={16} color={C.primary} />
            <Text style={styles.editAvatarText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholderTextColor={C.placeholder} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={C.placeholder} />
          </View>

          <View style={styles.row}>
            <View style={[styles.field, { flex: 1, marginRight: Spacing.sm }]}>
              <Text style={styles.label}>Zip Code</Text>
              <TextInput style={styles.input} value={zipcode} onChangeText={setZipCode} keyboardType="number-pad" placeholderTextColor={C.placeholder} />
            </View>
            <View style={[styles.field, { flex: 1, marginLeft: Spacing.sm }]}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput style={styles.input} value={dob} onChangeText={() => {}} placeholderTextColor={C.placeholder} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Favorite Sports</Text>
            <TextInput style={styles.input} value={favSport} onChangeText={setFavSport} placeholderTextColor={C.placeholder} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Skill Level</Text>
            <TextInput style={styles.input} value={skillLevel} onChangeText={setLevel} placeholderTextColor={C.placeholder} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.bioInput}
              value={bio}
              onChangeText={setBio}
              multiline
              placeholderTextColor={C.placeholder}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onSubmit} activeOpacity={0.8}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.headerBg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    color: C.headerText,
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: Spacing.xxl,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: C.primary,
  },
  editAvatarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  editAvatarText: {
    fontSize: FontSize.sm,
    color: C.primary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: C.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: Spacing.xxl,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: C.text,
    marginBottom: Spacing.xs,
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
  bioInput: {
    backgroundColor: C.inputBg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    fontSize: FontSize.md,
    color: C.text,
    borderWidth: 1,
    borderColor: C.border,
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: C.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.xxxl,
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
})
