// app/screens/_layout.tsx

import { Ionicons } from '@expo/vector-icons'
import { Drawer } from 'expo-router/drawer'
import React from 'react'
import { Colors } from '../../constants'

const C = Colors.light

export default function ScreensLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: C.primary,
        drawerInactiveTintColor: C.textSecondary,
        drawerStyle: { backgroundColor: C.background },
        drawerLabelStyle: { fontSize: 15, fontWeight: '600' },
      }}
    >
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="forum"
        options={{
          title: 'Forum',
          drawerIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="messages"
        options={{
          title: 'Messages',
          drawerIcon: ({ color, size }) => <Ionicons name="mail-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="yourPosts"
        options={{
          title: 'Your Posts',
          drawerIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="map"
        options={{
          title: 'Map',
          drawerIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="login"
        options={{
          title: 'Logout',
          drawerIcon: ({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="otherProfile"
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="AddPostModal"
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="direct_message"
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="FilterScreen"
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer>
  )
}
