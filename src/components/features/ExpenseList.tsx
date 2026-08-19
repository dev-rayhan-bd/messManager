import React from 'react';
import { View, StyleSheet, useColorScheme, FlatList } from 'react-native';
import { CustomCard } from '../ui/CustomCard';
import { Typography } from '../ui/Typography';
import { Badge } from '../ui/Badge';
import { Colors } from '../../constants/theme';
import { Expense, ExpenseCategory } from '../../types/mess';
import { ShoppingCart, Utensils, Zap, UserCheck, Tag } from 'lucide-react-native';

interface ExpenseListProps {
  expenses: Expense[];
  onAddPress?: () => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[scheme];

  const categoryIcons: Record<ExpenseCategory, React.ReactNode> = {
    grocery: <ShoppingCart size={18} stroke={theme.primary} />,
    bazar: <Utensils size={18} stroke={theme.secondary} />,
    utility: <Zap size={18} stroke={theme.warning} />,
    cook: <UserCheck size={18} stroke={theme.accent} />,
    other: <Tag size={18} stroke={theme.textSecondary} />,
  };

  const categoryNames: Record<ExpenseCategory, string> = {
    grocery: 'Grocery',
    bazar: 'Daily Bazar',
    utility: 'Utilities',
    cook: 'Cook Bill',
    other: 'Miscellaneous',
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <CustomCard variant="glass" style={styles.card}>
            <View style={styles.row}>
              <View style={[styles.iconBox, { backgroundColor: theme.surfaceSubtle }]}>
                {categoryIcons[item.category]}
              </View>

              <View style={styles.info}>
                <Typography variant="subtitle" weight="semibold">
                  {item.title}
                </Typography>
                <Typography variant="caption" color="textMuted">
                  Paid by <Typography variant="caption" weight="semibold" color="textSecondary">{item.paidBy}</Typography> • {item.date}
                </Typography>
                {item.note && (
                  <Typography variant="caption" color="textMuted" style={{ marginTop: 2 }}>
                    Note: {item.note}
                  </Typography>
                )}
              </View>

              <View style={styles.amountCol}>
                <Typography variant="h3" weight="bold" color="danger">
                  -৳{item.amount.toLocaleString()}
                </Typography>
                <Badge
                  label={categoryNames[item.category]}
                  variant="neutral"
                  size="sm"
                />
              </View>
            </View>
          </CustomCard>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  card: {
    marginVertical: 4,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    padding: 10,
    borderRadius: 14,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  amountCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
});
