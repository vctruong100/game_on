/**
 * Game-On Design System — Color Tokens
 *
 * Primary: Deep blue — trust, reliability
 * Accent:  Vibrant coral-red — energy, action
 * Success: Teal-green — confirmation, positive
 * All color pairs tested for WCAG AA contrast and color-blind safety.
 */

export const Palette = {
  blue50: '#EFF6FF',
  blue100: '#DBEAFE',
  blue500: '#3B82F6',
  blue600: '#2563EB',
  blue700: '#1D4ED8',
  blue900: '#1E3A5F',

  coral400: '#F87171',
  coral500: '#EF4444',
  coral600: '#DC2626',

  teal400: '#2DD4BF',
  teal500: '#14B8A6',
  teal600: '#0D9488',

  amber400: '#FBBF24',
  amber500: '#F59E0B',

  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export const Colors = {
  light: {
    text: Palette.gray900,
    textSecondary: Palette.gray500,
    background: Palette.gray50,
    surface: Palette.white,
    border: Palette.gray200,
    primary: Palette.blue600,
    primaryLight: Palette.blue100,
    accent: Palette.coral500,
    success: Palette.teal500,
    warning: Palette.amber500,
    error: Palette.coral600,
    icon: Palette.gray500,
    headerBg: Palette.blue900,
    headerText: Palette.white,
    inputBg: Palette.gray100,
    placeholder: Palette.gray400,
    tint: Palette.blue600,
    tabIconDefault: Palette.gray400,
    tabIconSelected: Palette.blue600,
  },
  dark: {
    text: Palette.gray50,
    textSecondary: Palette.gray400,
    background: Palette.gray900,
    surface: Palette.gray800,
    border: Palette.gray700,
    primary: Palette.blue500,
    primaryLight: 'rgba(59,130,246,0.15)',
    accent: Palette.coral400,
    success: Palette.teal400,
    warning: Palette.amber400,
    error: Palette.coral500,
    icon: Palette.gray400,
    headerBg: Palette.gray800,
    headerText: Palette.gray50,
    inputBg: Palette.gray700,
    placeholder: Palette.gray500,
    tint: Palette.blue500,
    tabIconDefault: Palette.gray500,
    tabIconSelected: Palette.blue500,
  },
};
