import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { useColorScheme, StyleSheet, View } from 'react-native';

import { Typography } from './ui/Typography';
import { Colors, Spacing } from '@/constants/theme';

export function WebBadge() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[scheme];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <Typography variant="caption" color="textSecondary" style={styles.versionText}>
        v{version}
      </Typography>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badgeImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  versionText: {
    textAlign: 'center',
  },
  badgeImage: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});
