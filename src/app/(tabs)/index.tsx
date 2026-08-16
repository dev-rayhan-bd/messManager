import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import { useMessData } from '../../hooks/useMessData';
import { QuickStats } from '../../components/features/QuickStats';
import { BudgetProgressCard } from '../../components/features/BudgetProgressCard';
import { ExpenseList } from '../../components/features/ExpenseList';
import { FinancialLedger } from '../../components/features/FinancialLedger';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/theme';
import { PlusCircle, Sparkles } from 'lucide-react-native';
import { AddExpenseModal } from '../../components/features/AddExpenseModal';

export default function DashboardScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const { summary, expenses, memberLedger, addExpense, members } = useMessData();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.headerRow}>
          <View>
            <Typography variant="meta" color="primary">
              FINTECH MESS SAAS
            </Typography>
            <Typography variant="h1" weight="bold">
              Mess Manager
            </Typography>
          </View>
          <Button
            label="Log Expense"
            size="sm"
            icon={<PlusCircle size={16} color="#FFF" />}
            onPress={() => setModalVisible(true)}
          />
        </View>

        {/* Quick Stats Grid */}
        <QuickStats summary={summary} />

        {/* Budget Progress Card */}
        <BudgetProgressCard summary={summary} />

        {/* Member Financial Ledger Snippet */}
        <View style={styles.sectionHeader}>
          <Typography variant="h2" weight="bold">
            Member Balances
          </Typography>
          <Typography variant="caption" color="primary" weight="semibold">
            Auto Calculated
          </Typography>
        </View>
        <FinancialLedger ledger={memberLedger.slice(0, 3)} />

        {/* Recent Expenses List */}
        <View style={styles.sectionHeader}>
          <Typography variant="h2" weight="bold">
            Recent Expenses
          </Typography>
          <Typography variant="caption" color="textMuted">
            Latest 5 transactions
          </Typography>
        </View>
        <ExpenseList expenses={expenses.slice(0, 4)} />
      </ScrollView>

      {/* Add Expense Modal */}
      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addExpense}
        members={members.map((m) => m.name)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 8,
  },
});
