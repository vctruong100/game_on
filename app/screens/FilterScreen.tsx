// app/screens/FilterScreen.tsx

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants'

const C = Colors.light

const sports = ['All', 'Soccer', 'Basketball', 'Tennis', 'Pickleball']
const radii = ['5 miles', '10 miles', '25 miles', '50 miles']
const skills = ['All', 'Beginner', 'Intermediate', 'Advanced']

interface DropdownProps {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)} activeOpacity={0.7}>
        <Text style={styles.dropdownText}>{value}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={C.icon} />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownOptions}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.option, option === value && styles.optionSelected]}
              onPress={() => { onChange(option); setOpen(false) }}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionText, option === value && styles.optionTextSelected]}>{option}</Text>
              {option === value && <Ionicons name="checkmark" size={18} color={C.primary} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

export default function FilterScreen() {
  const navigation = useNavigation()
  const [sport, setSport] = useState('All')
  const [skill, setSkill] = useState('All')
  const [zipCode, setZipCode] = useState('')
  const [radius, setRadius] = useState('5 miles')

  const applyFilters = () => {
    (navigation as any).navigate('forum', { filters: { sport, skill, zipCode, radius } })
  }

  const resetFilters = () => {
    setSport('All')
    setSkill('All')
    setZipCode('')
    setRadius('5 miles')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="options-outline" size={22} color={C.primary} />
          <Text style={styles.headerTitle}>Filters</Text>
        </View>
        <TouchableOpacity onPress={applyFilters} activeOpacity={0.7}>
          <Ionicons name="close" size={26} color={C.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Dropdown label="Sport" options={sports} value={sport} onChange={setSport} />
        <Dropdown label="Skill Level" options={skills} value={skill} onChange={setSkill} />

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 92897"
            placeholderTextColor={C.placeholder}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="number-pad"
          />
        </View>

        <Dropdown label="Search Radius" options={radii} value={radius} onChange={setRadius} />

        <TouchableOpacity style={styles.applyButton} onPress={applyFilters} activeOpacity={0.8}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={resetFilters} activeOpacity={0.7}>
          <Text style={styles.resetText}>Reset All</Text>
        </TouchableOpacity>
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
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderColor: C.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  headerTitle: { fontSize: FontSize.xl, fontWeight: '700', color: C.text },
  content: { padding: Spacing.xl, paddingBottom: Spacing.xxxl },
  fieldGroup: { marginBottom: Spacing.xl },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: C.text,
    marginBottom: Spacing.sm,
  },
  dropdown: {
    backgroundColor: C.inputBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.border,
  },
  dropdownText: { fontSize: FontSize.md, color: C.text },
  dropdownOptions: {
    backgroundColor: C.surface,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xs,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderColor: C.border,
  },
  optionSelected: { backgroundColor: C.primaryLight },
  optionText: { fontSize: FontSize.md, color: C.text },
  optionTextSelected: { color: C.primary, fontWeight: '600' },
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
  applyButton: {
    flexDirection: 'row',
    backgroundColor: C.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  applyText: { color: '#fff', fontSize: FontSize.lg, fontWeight: '700' },
  resetButton: { alignItems: 'center', marginTop: Spacing.lg, paddingVertical: Spacing.sm },
  resetText: { color: C.accent, fontSize: FontSize.md, fontWeight: '600' },
})