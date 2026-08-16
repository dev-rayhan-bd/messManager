import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { Typography } from './ui/Typography';
import { Spacing } from '@/constants/theme';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = 'Try editing', hint = 'app/index.tsx' }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <Typography variant="body">{title}</Typography>
      <View style={styles.codeSnippet}>
        <Typography variant="caption" color="textSecondary">{hint}</Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeSnippet: {
    borderRadius: Spacing.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
});
