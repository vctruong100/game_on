import { Ionicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapContent from '../../components/MapContent'
import { Colors, Spacing, FontSize } from '../../constants'

const C = Colors.light

const DEFAULT_LAT = 33.644466014206564
const DEFAULT_LNG = -117.8366916914015

export default function MapScreen() {
  const navigation = useNavigation()
  const [location, setLocation] = useState<any>(null)
  const navigation = useNavigation()
  const [location, setLocation] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Enable location access to use the map.')
        return
      }
      const loc = await Location.getCurrentPositionAsync({})
      setLocation(loc.coords)
    })()
  }, [])

  if (!location) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={C.primary} />
        <Text style={styles.loadingText}>Loading map...</Text>
        <ActivityIndicator size="large" color={C.primary} />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="menu" size={26} color={C.headerText} />
          <Ionicons name="menu" size={26} color={C.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Map</Text>
        <View style={{ width: 26 }} />
      </View>
      <MapContent
        latitude={DEFAULT_LAT}
        longitude={DEFAULT_LNG}
        title="Middle Earth Basketball Court"
        description="6 NEEDED"
      />
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
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md },
  loadingText: { fontSize: FontSize.md, color: C.textSecondary },
})