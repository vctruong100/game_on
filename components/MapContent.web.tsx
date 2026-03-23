// components/MapContent.web.tsx
// Web fallback: no react-native-maps dependency

import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../constants'

const C = Colors.light

interface Props {
  latitude: number
  longitude: number
  title: string
  description: string
}

export default function MapContent({ latitude, longitude, title, description }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="map" size={64} color={C.primary} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{description}</Text>
      <Text style={styles.coords}>
        {latitude.toFixed(4)}, {longitude.toFixed(4)}
      </Text>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        onPress={() =>
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`)
        }
      >
        <Ionicons name="open-outline" size={18} color="#fff" />
        <Text style={styles.btnText}>Open in Google Maps</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
    gap: Spacing.md,
  },
  title: { fontSize: FontSize.xxl, fontWeight: '700', color: C.text, textAlign: 'center' },
  subtitle: { fontSize: FontSize.lg, fontWeight: '600', color: C.accent },
  coords: { fontSize: FontSize.sm, color: C.textSecondary },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: C.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.lg,
  },
  btnText: { color: '#fff', fontSize: FontSize.md, fontWeight: '600' },
})
