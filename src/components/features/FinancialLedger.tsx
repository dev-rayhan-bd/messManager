import React from 'react';
import { View, StyleSheet, useColorScheme, FlatList, Pressable } from 'react-native';
import { CustomCard } from '../ui/CustomCard';
import { Typography } from '../ui/Typography';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Colors } from '../../constants/theme';
import { ArrowUpRight, PlusCircle } from 'lucide-react-native';

interface LedgerItem {
  id: string;
  name: string;
  deposit: number;
  totalMeals: number;
  mealCost: number;
  netBalance: number;
  status: 'surplus' | 'due' | 'settled';
}

interface FinancialLedgerProps {
  ledger: LedgerItem[];
  onAddDeposit?: (memberId: string) => void;
}

export const FinancialLedger: React.FC<FinancialLedgerProps> = ({ ledger, onAddDeposit }) => {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  return (
    <View style={styles.container}>
      <FlatList
        data={ledger}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const isSurplus = item.netBalance > 0;
          const isDue = item.netBalance < 0;

          return (
            <CustomCard variant="glass" style={styles.card}>
              <View style={styles.topRow}>
                <View style={styles.memberHeader}>
                  <View style={[styles.avatar, { backgroundColor: isSurplus ? theme.secondaryLight : isDue ? theme.dangerLight : theme.surfaceSubtle }]}>
                    <Typography variant="h3" color={isSurplus ? 'secondary' : isDue ? 'danger' : 'textSecondary'} weight="bold">
                      {item.name.charAt(0)}
                    </Typography>
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Typography variant="subtitle" weight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="textMuted">
                      {item.totalMeals} Meals logged
                    </Typography>
                  </View>
                </View>

                <Badge
                  label={isSurplus ? `+৳${item.netBalance} (Credit)` : isDue ? `-৳${Math.abs(item.netBalance)} (Due)` : '৳0 (Settled)'}
                  variant={isSurplus ? 'success' : isDue ? 'danger' : 'neutral'}
                  size="md"
                />
              </View>

              <View style={[styles.detailsGrid, { backgroundColor: theme.surfaceSubtle }]}>
                <View style={styles.detailItem}>
                  <Typography variant="caption" color="textMuted">
                    DEPOSIT
                  </Typography>
                  <Typography variant="subtitle" weight="bold" color="secondary">
                    ৳{item.deposit}
                  </Typography>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailItem}>
                  <Typography variant="caption" color="textMuted">
                    MEAL COST
                  </Typography>
                  <Typography variant="subtitle" weight="bold" color="textSecondary">
                    ৳{item.mealCost}
                  </Typography>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailItem}>
                  <Typography variant="caption" color="textMuted">
                    NET BALANCE
                  </Typography>
                  <Typography
                    variant="subtitle"
                    weight="bold"
                    color={isSurplus ? 'secondary' : isDue ? 'danger' : 'text'}>
                    ৳{item.netBalance}
                  </Typography>
                </View>
              </View>

              {onAddDeposit && (
                <View style={styles.actionRow}>
                  <Button
                    label="Add Deposit"
                    variant="ghost"
                    size="sm"
                    icon={<PlusCircle size={14} stroke={theme.primary} />}
                    onPress={() => onAddDeposit(item.id)}
                  />
                </View>
              )}
            </CustomCard>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  card: {
    marginVertical: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(150,150,150,0.2)',
  },
  actionRow: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
});
