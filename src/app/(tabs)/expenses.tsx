import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, useColorScheme, SafeAreaView, Pressable } from 'react-native';
import { useMessData } from '../../hooks/useMessData';
import { ExpenseList } from '../../components/features/ExpenseList';
import { AddExpenseModal } from '../../components/features/AddExpenseModal';
import { CustomCard } from '../../components/ui/CustomCard';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/theme';
import { ExpenseCategory } from '../../types/mess';
import { PlusCircle, Receipt, DollarSign, Filter } from 'lucide-react-native';

export default function ExpensesScreen() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[scheme];
  const { expenses, summary, addExpense, members } = useMessData();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'all'>('all');

  const categories: { label: string; value: ExpenseCategory | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Grocery', value: 'grocery' },
    { label: 'Bazar', value: 'bazar' },
    { label: 'Utility', value: 'utility' },
    { label: 'Cook', value: 'cook' },
    { label: 'Other', value: 'other' },
  ];

  const filteredExpenses =
    selectedCategory === 'all'
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="h1" weight="bold">
              Expense Tracker
            </Typography>
            <Typography variant="caption" color="textMuted">
              Categorized Mess Expenditures
            </Typography>
          </View>

          <Button
            label="Add Expense"
            size="sm"
            icon={<PlusCircle size={16} color="#FFF" />}
            onPress={() => setModalVisible(true)}
          />
        </View>

        {/* Expense Summary Header */}
        <CustomCard variant="glass" style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={[styles.iconCircle, { backgroundColor: theme.dangerLight }]}>
              <DollarSign size={24} color={theme.danger} />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Typography variant="caption" color="textMuted">
                TOTAL EXPENSE
              </Typography>
              <Typography variant="h1" weight="bold" color="danger">
                ৳{summary.totalExpenses.toLocaleString()}
              </Typography>
            </View>
          </View>
        </CustomCard>

        {/* Category Filters */}
        <View style={styles.filterRow}>
          <Filter size={16} color={theme.textMuted} style={{ marginRight: 4 }} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <Pressable
                key={cat.value}
                onPress={() => setSelectedCategory(cat.value)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor:
                      selectedCategory === cat.value ? theme.primary : theme.surfaceSubtle,
                  },
                ]}>
                <Typography
                  variant="caption"
                  weight="semibold"
                  style={{
                    color: selectedCategory === cat.value ? '#FFFFFF' : theme.textSecondary,
                  }}>
                  {cat.label}
                </Typography>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Expense List */}
        <Typography variant="h2" weight="bold" style={{ marginTop: 12, marginBottom: 8 }}>
          Transactions ({filteredExpenses.length})
        </Typography>
        <ExpenseList expenses={filteredExpenses} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  summaryCard: {
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
});
