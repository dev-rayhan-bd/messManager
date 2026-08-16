import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSubtle: '#F1F5F9',
    border: '#E2E8F0',
    borderSubtle: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    primary: '#2563EB',       // Royal Blue
    primaryLight: '#EFF6FF',
    secondary: '#10B981',     // Emerald Green
    secondaryLight: '#ECFDF5',
    accent: '#8B5CF6',        // Purple accent
    danger: '#EF4444',        // Crimson Red
    dangerLight: '#FEF2F2',
    warning: '#F59E0B',       // Amber
    warningLight: '#FFFBEB',
    cardGlass: 'rgba(255, 255, 255, 0.85)',
    tabBar: 'rgba(255, 255, 255, 0.95)',
  },
  dark: {
    background: '#0B0F17',
    surface: '#161E2E',
    surfaceSubtle: '#1F293D',
    border: '#2A364F',
    borderSubtle: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    primary: '#3B82F6',       // Vivid Blue
    primaryLight: 'rgba(59, 130, 246, 0.15)',
    secondary: '#10B981',     // Emerald Green
    secondaryLight: 'rgba(16, 185, 129, 0.15)',
    accent: '#A78BFA',
    danger: '#F87171',        // Coral Red
    dangerLight: 'rgba(248, 113, 113, 0.15)',
    warning: '#FBBF24',
    warningLight: 'rgba(251, 191, 36, 0.15)',
    cardGlass: 'rgba(22, 30, 46, 0.85)',
    tabBar: 'rgba(11, 15, 23, 0.92)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    mono: 'Courier',
  },
  default: {
    sans: 'normal',
    mono: 'monospace',
  },
});

export const MaxContentWidth = 800;
