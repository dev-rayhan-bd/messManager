import React from 'react';
import { Pressable, StyleSheet, useColorScheme, ViewStyle, ActivityIndicator } from 'react-native';
import { Typography } from './Typography';
import { Colors } from '../../constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  style,
}) => {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  const variantStyles = {
    primary: {
      bg: theme.primary,
      text: '#FFFFFF',
      border: 'transparent',
    },
    secondary: {
      bg: theme.secondary,
      text: '#FFFFFF',
      border: 'transparent',
    },
    outline: {
      bg: 'transparent',
      text: theme.text,
      border: theme.border,
    },
    ghost: {
      bg: theme.surfaceSubtle,
      text: theme.primary,
      border: 'transparent',
    },
    danger: {
      bg: theme.danger,
      text: '#FFFFFF',
      border: 'transparent',
    },
  }[variant];

  const sizeStyles = {
    sm: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10 },
    md: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 14 },
    lg: { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 },
  }[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        sizeStyles,
        {
          backgroundColor: variantStyles.bg,
          borderColor: variantStyles.border,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variantStyles.text} size="small" />
      ) : (
        <>
          {icon}
          <Typography
            variant={size === 'sm' ? 'caption' : 'subtitle'}
            weight="semibold"
            style={{ color: variantStyles.text, marginLeft: icon ? 6 : 0 }}>
            {label}
          </Typography>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
