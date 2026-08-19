import React, { useState } from 'react';
import { Modal, View, StyleSheet, TextInput, useColorScheme, Pressable } from 'react-native';
import { CustomCard } from '../ui/CustomCard';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Colors } from '../../constants/theme';
import { ExpenseCategory } from '../../types/mess';
import { X, Check } from 'lucide-react-native';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (expense: { title: string; amount: number; category: ExpenseCategory; paidBy: string; note?: string; date: string }) => void;
  members: string[];
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  visible,
  onClose,
  onAdd,
  members,
}) => {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = Colors[scheme];

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('grocery');
  const [paidBy, setPaidBy] = useState(members[0] || 'Rayhan Ahmed');
  const [note, setNote] = useState('');

  const categories: { label: string; value: ExpenseCategory }[] = [
    { label: 'Grocery', value: 'grocery' },
    { label: 'Daily Bazar', value: 'bazar' },
    { label: 'Utilities', value: 'utility' },
    { label: 'Cook', value: 'cook' },
    { label: 'Other', value: 'other' },
  ];

  const handleSubmit = () => {
    if (!title || !amount || isNaN(Number(amount))) return;
    onAdd({
      title,
      amount: Number(amount),
      category,
      paidBy,
      note: note ? note : undefined,
      date: new Date().toISOString().split('T')[0],
    });
    setTitle('');
    setAmount('');
    setNote('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <CustomCard variant="elevated" style={styles.modalContent}>
          <View style={styles.header}>
            <Typography variant="h2" weight="bold">
              Add Mess Expense
            </Typography>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <X size={20} stroke={theme.textSecondary} />
            </Pressable>
          </View>

          <Typography variant="caption" color="textMuted" style={styles.label}>
            EXPENSE TITLE
          </Typography>
          <TextInput
            placeholder="e.g. Weekly Bazar, Gas Bill"
            placeholderTextColor={theme.textMuted}
            value={title}
            onChangeText={setTitle}
            style={[styles.input, { backgroundColor: theme.surfaceSubtle, color: theme.text, borderColor: theme.border }]}
          />

          <Typography variant="caption" color="textMuted" style={styles.label}>
            AMOUNT (৳)
          </Typography>
          <TextInput
            placeholder="e.g. 1500"
            placeholderTextColor={theme.textMuted}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={[styles.input, { backgroundColor: theme.surfaceSubtle, color: theme.text, borderColor: theme.border }]}
          />

          <Typography variant="caption" color="textMuted" style={styles.label}>
            CATEGORY
          </Typography>
          <View style={styles.chipRow}>
            {categories.map((cat) => (
              <Pressable
                key={cat.value}
                onPress={() => setCategory(cat.value)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: category === cat.value ? theme.primary : theme.surfaceSubtle,
                  },
                ]}>
                <Typography
                  variant="caption"
                  weight="semibold"
                  style={{ color: category === cat.value ? '#FFFFFF' : theme.textSecondary }}>
                  {cat.label}
                </Typography>
              </Pressable>
            ))}
          </View>

          <Typography variant="caption" color="textMuted" style={styles.label}>
            PAID BY
          </Typography>
          <View style={styles.chipRow}>
            {members.map((m) => (
              <Pressable
                key={m}
                onPress={() => setPaidBy(m)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: paidBy === m ? theme.secondary : theme.surfaceSubtle,
                  },
                ]}>
                <Typography
                  variant="caption"
                  weight="semibold"
                  style={{ color: paidBy === m ? '#FFFFFF' : theme.textSecondary }}>
                  {m}
                </Typography>
              </Pressable>
            ))}
          </View>

          <View style={styles.btnGroup}>
            <Button label="Cancel" variant="outline" onPress={onClose} style={{ flex: 1 }} />
            <Button label="Save Expense" variant="primary" onPress={handleSubmit} icon={<Check size={16} stroke="#FFF" />} style={{ flex: 1.5 }} />
          </View>
        </CustomCard>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  closeBtn: {
    padding: 4,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 15,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
});
