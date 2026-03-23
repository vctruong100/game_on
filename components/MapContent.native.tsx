// components/MapContent.native.tsx
// Native-only: uses react-native-maps

import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

interface Props {
  latitude: number
  longitude: number
  title: string
  description: string
}

export default function MapContent({ latitude, longitude, title, description }: Props) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={{ latitude, longitude }} title={title} description={description} />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: { flex: 1 },
})
