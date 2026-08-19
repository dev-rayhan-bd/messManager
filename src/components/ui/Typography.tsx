import React from 'react';
import { Text, TextProps, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../../constants/theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption' | 'meta';
  color?: keyof typeof Colors.light;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  weight,
  align = 'left',
  style,
  ...props
}) => {
<<<<<<< HEAD
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
=======
  const scheme = useColorScheme() ?? 'light';
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
  const themeColors = Colors[scheme];

  const defaultColor = color ? themeColors[color] : themeColors.text;

  const fontStyles = styles[variant];
  const fontWeightStyle = weight ? fontWeightMap[weight] : fontStyles.fontWeight;

  return (
    <Text
      style={[
        fontStyles,
        { color: defaultColor, textAlign: align, fontWeight: fontWeightStyle as any },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

const fontWeightMap = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  meta: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
