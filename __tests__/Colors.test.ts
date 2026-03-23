// __tests__/Colors.test.ts

import { Colors, Palette } from '../constants/Colors'
import { Spacing, FontSize, BorderRadius } from '../constants/Theme'

describe('Design System - Colors', () => {
  it('Palette should have all base colors defined', () => {
    expect(Palette.blue600).toBeDefined()
    expect(Palette.coral500).toBeDefined()
    expect(Palette.teal500).toBeDefined()
    expect(Palette.amber500).toBeDefined()
    expect(Palette.gray50).toBeDefined()
    expect(Palette.gray900).toBeDefined()
    expect(Palette.white).toBe('#FFFFFF')
    expect(Palette.black).toBe('#000000')
  })

  it('Colors.light should have all required tokens', () => {
    const required = [
      'text', 'textSecondary', 'background', 'surface', 'border',
      'primary', 'primaryLight', 'accent', 'success', 'warning', 'error',
      'icon', 'headerBg', 'headerText', 'inputBg', 'placeholder',
      'tint', 'tabIconDefault', 'tabIconSelected',
    ]
    required.forEach((key) => {
      expect(Colors.light).toHaveProperty(key)
      expect(typeof (Colors.light as any)[key]).toBe('string')
    })
  })

  it('Colors.dark should have all required tokens', () => {
    const required = [
      'text', 'textSecondary', 'background', 'surface', 'border',
      'primary', 'primaryLight', 'accent', 'success', 'warning', 'error',
      'icon', 'headerBg', 'headerText', 'inputBg', 'placeholder',
      'tint', 'tabIconDefault', 'tabIconSelected',
    ]
    required.forEach((key) => {
      expect(Colors.dark).toHaveProperty(key)
      expect(typeof (Colors.dark as any)[key]).toBe('string')
    })
  })

  it('light and dark themes should have different backgrounds', () => {
    expect(Colors.light.background).not.toBe(Colors.dark.background)
  })

  it('all hex colors should be valid format', () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/
    const rgbaRegex = /^rgba\(\d+,\d+,\d+,[\d.]+\)$/
    Object.values(Palette).forEach((color) => {
      expect(hexRegex.test(color)).toBe(true)
    })
    Object.values(Colors.light).forEach((color) => {
      expect(hexRegex.test(color) || rgbaRegex.test(color)).toBe(true)
    })
  })
})

describe('Design System - Theme', () => {
  it('Spacing should have all size tokens', () => {
    expect(Spacing.xs).toBe(4)
    expect(Spacing.sm).toBe(8)
    expect(Spacing.md).toBe(12)
    expect(Spacing.lg).toBe(16)
    expect(Spacing.xl).toBe(20)
    expect(Spacing.xxl).toBe(24)
    expect(Spacing.xxxl).toBe(32)
  })

  it('FontSize should have all size tokens', () => {
    expect(FontSize.xs).toBeLessThan(FontSize.sm)
    expect(FontSize.sm).toBeLessThan(FontSize.md)
    expect(FontSize.md).toBeLessThan(FontSize.lg)
    expect(FontSize.lg).toBeLessThan(FontSize.xl)
    expect(FontSize.xl).toBeLessThan(FontSize.xxl)
    expect(FontSize.xxl).toBeLessThan(FontSize.xxxl)
  })

  it('BorderRadius should have all size tokens', () => {
    expect(BorderRadius.sm).toBeLessThan(BorderRadius.md)
    expect(BorderRadius.md).toBeLessThan(BorderRadius.lg)
    expect(BorderRadius.lg).toBeLessThan(BorderRadius.xl)
    expect(BorderRadius.full).toBe(9999)
  })

  it('all spacing values should be positive numbers', () => {
    Object.values(Spacing).forEach((val) => {
      expect(typeof val).toBe('number')
      expect(val).toBeGreaterThan(0)
    })
  })
})
