import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Typography } from './Typography';
import { Colors } from '../../constants/theme';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  icon,
}) => {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[scheme];

  const variantStyles = {
    success: {
      bg: theme.secondaryLight,
      text: theme.secondary,
      border: 'rgba(16, 185, 129, 0.3)',
    },
    danger: {
      bg: theme.dangerLight,
      text: theme.danger,
      border: 'rgba(239, 68, 68, 0.3)',
    },
    warning: {
      bg: theme.warningLight,
      text: theme.warning,
      border: 'rgba(245, 158, 11, 0.3)',
    },
    info: {
      bg: theme.primaryLight,
      text: theme.primary,
      border: 'rgba(59, 130, 246, 0.3)',
    },
    neutral: {
      bg: theme.surfaceSubtle,
      text: theme.textSecondary,
      border: theme.border,
    },
  }[variant];

  return (
    <View
      style={[
        styles.container,
        size === 'sm' ? styles.smPadding : styles.mdPadding,
        { backgroundColor: variantStyles.bg, borderColor: variantStyles.border },
      ]}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Typography
        variant={size === 'sm' ? 'caption' : 'subtitle'}
        weight="semibold"
        style={{ color: variantStyles.text, fontSize: size === 'sm' ? 11 : 12 }}>
        {label}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
    borderWidth: 1,
  },
  smPadding: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  mdPadding: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  iconWrapper: {
    marginRight: 4,
  },
});
