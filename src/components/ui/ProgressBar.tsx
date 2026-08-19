import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  height = 8,
}) => {
<<<<<<< HEAD
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
=======
  const scheme = useColorScheme() ?? 'light';
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
  const theme = Colors[scheme];

  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const fillColor = color || (clampedProgress > 0.85 ? theme.danger : theme.primary);

  return (
    <View style={[styles.track, { height, backgroundColor: theme.surfaceSubtle }]}>
      <View
        style={[
          styles.fill,
          {
            height,
            width: `${clampedProgress * 100}%`,
            backgroundColor: fillColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 99,
  },
});
