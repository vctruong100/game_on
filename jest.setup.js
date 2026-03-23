// jest.setup.js
// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: ({ children }) => children,
  Redirect: () => null,
  Stack: {
    Screen: () => null,
  },
}))

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    dispatch: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useFocusEffect: jest.fn((cb) => cb()),
  DrawerActions: {
    toggleDrawer: jest.fn(),
  },
}))

// Mock expo-router/drawer
jest.mock('expo-router/drawer', () => ({
  Drawer: {
    Screen: () => null,
  },
}))

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const mockIcon = (name) => {
    const Component = (props) => React.createElement('Text', props, props.name || name)
    Component.displayName = name
    return Component
  }
  return {
    Ionicons: mockIcon('Ionicons'),
    AntDesign: mockIcon('AntDesign'),
    FontAwesome: mockIcon('FontAwesome'),
  }
})

// Mock expo-location
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({ coords: { latitude: 33.64, longitude: -117.84 } })
  ),
}))

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react')
  const MapView = (props) => React.createElement('View', { testID: 'map-view', ...props })
  MapView.Marker = (props) => React.createElement('View', { testID: 'map-marker', ...props })
  const Marker = MapView.Marker
  return { __esModule: true, default: MapView, Marker }
})

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}))

// Suppress console warnings in tests
const originalWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('componentWillReceiveProps')) return
  originalWarn(...args)
}
