// app/signup.tsx

import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Colors, Spacing, FontSize, BorderRadius } from '../constants'

const C = Colors.light

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)

  const onSubmit = () => {
    router.replace('/screens/profile')
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Ionicons name="football-outline" size={48} color={C.primary} />
          <Text style={styles.appName}>Game-On</Text>
        </View>
        <Text style={styles.pageTitle}>Create Account</Text>
        <Text style={styles.subtitle}>Find your next sports partner</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="you@example.com"
            placeholderTextColor={C.placeholder}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Create a password"
            placeholderTextColor={C.placeholder}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            placeholder="Re-enter your password"
            placeholderTextColor={C.placeholder}
          />
        </View>

        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.7}
        >
          <AntDesign
            name={agreed ? 'checksquare' : 'checksquareo'}
            size={22}
            color={agreed ? C.primary : C.icon}
          />
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !agreed && styles.buttonDisabled]}
          onPress={onSubmit}
          disabled={!agreed}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.social}>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
            <FontAwesome name="google" size={22} color={C.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
            <AntDesign name="facebook-square" size={22} color={C.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
            <Ionicons name="logo-apple" size={22} color={C.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/screens/login" asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: C.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.xxxl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  appName: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: C.primary,
  },
  pageTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    textAlign: 'center',
    color: C.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: C.textSecondary,
    textAlign: 'center',
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  termsText: {
    fontSize: FontSize.sm,
    color: C.textSecondary,
  },
  termsLink: {
    color: C.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: C.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: C.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    fontSize: FontSize.xs,
    color: C.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSize.sm,
    color: C.textSecondary,
  },
  footerLink: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: C.primary,
  },
})
