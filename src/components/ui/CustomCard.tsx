import React from 'react';
import { View, StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import { Colors } from '../../constants/theme';

interface CustomCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'flat' | 'elevated' | 'glass' | 'accent';
  accentColor?: string;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  children,
  style,
  variant = 'glass',
  accentColor,
}) => {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[scheme];

  const getCardStyle = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: scheme === 'dark' ? 0.4 : 0.08,
          shadowRadius: 12,
          elevation: 4,
        };
      case 'accent':
        return {
          backgroundColor: theme.surface,
          borderColor: accentColor || theme.primary,
          borderWidth: 1.5,
          shadowColor: accentColor || theme.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 3,
        };
      case 'flat':
        return {
          backgroundColor: theme.surfaceSubtle,
          borderColor: theme.borderSubtle,
        };
      case 'glass':
      default:
        return {
          backgroundColor: theme.cardGlass,
          borderColor: theme.border,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: scheme === 'dark' ? 0.3 : 0.05,
          shadowRadius: 8,
          elevation: 2,
        };
    }
  };

  return <View style={[styles.card, getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
  },
});
