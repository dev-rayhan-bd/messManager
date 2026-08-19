import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { CustomCard } from '../ui/CustomCard';
import { Typography } from '../ui/Typography';
import { Colors } from '../../constants/theme';
import { MessSummary } from '../../types/mess';
import { DollarSign, Wallet, Utensils, TrendingUp } from 'lucide-react-native';

interface QuickStatsProps {
  summary: MessSummary;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ summary }) => {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[scheme];

  const stats = [
    {
      title: 'Total Expenses',
      value: `৳${summary.totalExpenses.toLocaleString()}`,
      subtext: 'Monthly Bazar & Utility',
      icon: <DollarSign size={20} stroke={theme.danger} />,
      accent: theme.danger,
      bg: theme.dangerLight,
    },
    {
      title: 'Current Meal Rate',
      value: `৳${summary.mealRate}`,
      subtext: 'Per full meal cost',
      icon: <TrendingUp size={20} stroke={theme.primary} />,
      accent: theme.primary,
      bg: theme.primaryLight,
    },
    {
      title: 'Total Deposits',
      value: `৳${summary.totalDeposits.toLocaleString()}`,
      subtext: 'Collected from members',
      icon: <Wallet size={20} stroke={theme.secondary} />,
      accent: theme.secondary,
      bg: theme.secondaryLight,
    },
    {
      title: 'Total Meals',
      value: `${summary.totalMeals} Meals`,
      subtext: `${summary.totalMembers} Active Members`,
      icon: <Utensils size={20} stroke={theme.accent} />,
      accent: theme.accent,
      bg: theme.surfaceSubtle,
    },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((stat, idx) => (
        <CustomCard key={idx} variant="glass" style={styles.card}>
          <View style={styles.header}>
            <View style={[styles.iconBox, { backgroundColor: stat.bg }]}>{stat.icon}</View>
            <Typography variant="meta" color="textMuted">
              STATS
            </Typography>
          </View>
          <Typography variant="h2" weight="bold" style={styles.value}>
            {stat.value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {stat.subtext}
          </Typography>
        </CustomCard>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 8,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconBox: {
    padding: 8,
    borderRadius: 12,
  },
  value: {
    fontSize: 20,
    marginBottom: 4,
  },
});
