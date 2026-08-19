import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { CustomCard } from '../ui/CustomCard';
import { Typography } from '../ui/Typography';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { Colors } from '../../constants/theme';
import { MessSummary } from '../../types/mess';
import { PieChart, ShieldAlert } from 'lucide-react-native';

interface BudgetProgressCardProps {
  summary: MessSummary;
}

export const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({ summary }) => {
<<<<<<< HEAD
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
=======
  const scheme = useColorScheme() ?? 'light';
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
  const theme = Colors[scheme];

  const ratio = summary.budgetLimit > 0 ? summary.totalExpenses / summary.budgetLimit : 0;
  const percentage = Math.round(ratio * 100);
  const remaining = Math.max(0, summary.budgetLimit - summary.totalExpenses);

  const badgeVariant = percentage > 90 ? 'danger' : percentage > 75 ? 'warning' : 'success';

  return (
    <CustomCard variant="accent" accentColor={theme.primary} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <PieChart size={20} stroke={theme.primary} />
          <Typography variant="h3" style={{ marginLeft: 8 }}>
            Budget vs Spent
          </Typography>
        </View>
        <Badge
          label={`${percentage}% Used`}
          variant={badgeVariant}
          size="sm"
          icon={percentage > 85 ? <ShieldAlert size={12} stroke={theme.danger} /> : undefined}
        />
      </View>

      <View style={styles.amountRow}>
        <View>
          <Typography variant="caption" color="textMuted">
            TOTAL SPENT
          </Typography>
          <Typography variant="h2" weight="bold" color="primary">
            ৳{summary.totalExpenses.toLocaleString()}
          </Typography>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Typography variant="caption" color="textMuted">
            BUDGET LIMIT
          </Typography>
          <Typography variant="h3" color="textSecondary">
            ৳{summary.budgetLimit.toLocaleString()}
          </Typography>
        </View>
      </View>

      <ProgressBar progress={ratio} height={10} color={theme.primary} />

      <View style={styles.footer}>
        <Typography variant="caption" color="textSecondary">
          Remaining Budget: <Typography variant="caption" weight="bold" color={remaining < 2000 ? 'danger' : 'secondary'}>৳{remaining.toLocaleString()}</Typography>
        </Typography>
        <Typography variant="caption" color="textMuted">
          Target: ৳{summary.budgetLimit}
        </Typography>
      </View>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
