import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, useColorScheme, SafeAreaView, Modal, TextInput, Pressable } from 'react-native';
import { useMessData } from '../../hooks/useMessData';
import { FinancialLedger } from '../../components/features/FinancialLedger';
import { CustomCard } from '../../components/ui/CustomCard';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Colors } from '../../constants/theme';
import { Users, UserPlus, Wallet, Check, X } from 'lucide-react-native';

export default function MembersScreen() {
<<<<<<< HEAD
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
=======
  const scheme = useColorScheme() ?? 'light';
>>>>>>> 4421b6378cfb2cde19392af4b60004a53ec334df
  const theme = Colors[scheme];
  const { memberLedger, summary, addDeposit, addMember } = useMessData();

  // Modals state
  const [depositModalVisible, setDepositModalVisible] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');

  const handleOpenDepositModal = (memberId: string) => {
    setSelectedMemberId(memberId);
    setDepositModalVisible(true);
  };

  const handleSaveDeposit = () => {
    if (selectedMemberId && depositAmount && !isNaN(Number(depositAmount))) {
      addDeposit(selectedMemberId, Number(depositAmount));
      setDepositAmount('');
      setDepositModalVisible(false);
    }
  };

  const handleSaveMember = () => {
    if (newName) {
      addMember(newName, newPhone, Number(initialDeposit) || 0);
      setNewName('');
      setNewPhone('');
      setInitialDeposit('');
      setAddMemberModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="h1" weight="bold">
              Financial Ledger
            </Typography>
            <Typography variant="caption" color="textMuted">
              Member Deposits & Meal Balance Audit
            </Typography>
          </View>

          <Button
            label="Add Member"
            size="sm"
            icon={<UserPlus size={16} color="#FFF" />}
            onPress={() => setAddMemberModalVisible(true)}
          />
        </View>

        {/* Audit Stats Card */}
        <CustomCard variant="glass" style={styles.summaryCard}>
          <View style={styles.auditGrid}>
            <View style={styles.auditItem}>
              <Typography variant="caption" color="textMuted">
                ACTIVE MEMBERS
              </Typography>
              <Typography variant="h2" weight="bold" color="primary">
                {summary.totalMembers}
              </Typography>
            </View>

            <View style={styles.divider} />

            <View style={styles.auditItem}>
              <Typography variant="caption" color="textMuted">
                TOTAL DEPOSITS
              </Typography>
              <Typography variant="h2" weight="bold" color="secondary">
                ৳{summary.totalDeposits.toLocaleString()}
              </Typography>
            </View>
          </View>
        </CustomCard>

        {/* Member Financial Ledger */}
        <Typography variant="h2" weight="bold" style={{ marginTop: 12, marginBottom: 8 }}>
          Member Accounts ({memberLedger.length})
        </Typography>
        <FinancialLedger ledger={memberLedger} onAddDeposit={handleOpenDepositModal} />
      </ScrollView>

      {/* Add Deposit Modal */}
      <Modal visible={depositModalVisible} transparent animationType="fade" onRequestClose={() => setDepositModalVisible(false)}>
        <View style={styles.overlay}>
          <CustomCard variant="elevated" style={styles.modalCard}>
            <Typography variant="h2" weight="bold" style={{ marginBottom: 12 }}>
              Add Member Deposit
            </Typography>
            <Typography variant="caption" color="textMuted" style={{ marginBottom: 6 }}>
              AMOUNT TO ADD (৳)
            </Typography>
            <TextInput
              placeholder="e.g. 2000"
              placeholderTextColor={theme.textMuted}
              keyboardType="numeric"
              value={depositAmount}
              onChangeText={setDepositAmount}
              style={[styles.input, { backgroundColor: theme.surfaceSubtle, color: theme.text, borderColor: theme.border }]}
            />
            <View style={styles.modalBtnRow}>
              <Button label="Cancel" variant="outline" onPress={() => setDepositModalVisible(false)} style={{ flex: 1 }} />
              <Button label="Confirm Deposit" variant="secondary" onPress={handleSaveDeposit} style={{ flex: 1.5 }} />
            </View>
          </CustomCard>
        </View>
      </Modal>

      {/* Add Member Modal */}
      <Modal visible={addMemberModalVisible} transparent animationType="slide" onRequestClose={() => setAddMemberModalVisible(false)}>
        <View style={styles.overlay}>
          <CustomCard variant="elevated" style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Typography variant="h2" weight="bold">
                Add New Member
              </Typography>
              <Pressable onPress={() => setAddMemberModalVisible(false)}>
                <X size={20} color={theme.textMuted} />
              </Pressable>
            </View>

            <Typography variant="caption" color="textMuted" style={{ marginTop: 12, marginBottom: 4 }}>
              MEMBER FULL NAME
            </Typography>
            <TextInput
              placeholder="e.g. Hasan Ali"
              placeholderTextColor={theme.textMuted}
              value={newName}
              onChangeText={setNewName}
              style={[styles.input, { backgroundColor: theme.surfaceSubtle, color: theme.text, borderColor: theme.border }]}
            />

            <Typography variant="caption" color="textMuted" style={{ marginTop: 12, marginBottom: 4 }}>
              PHONE NUMBER
            </Typography>
            <TextInput
              placeholder="e.g. +880 1700-000000"
              placeholderTextColor={theme.textMuted}
              value={newPhone}
              onChangeText={setNewPhone}
              style={[styles.input, { backgroundColor: theme.surfaceSubtle, color: theme.text, borderColor: theme.border }]}
            />

            <Typography variant="caption" color="textMuted" style={{ marginTop: 12, marginBottom: 4 }}>
              INITIAL DEPOSIT (৳)
            </Typography>
            <TextInput
              placeholder="e.g. 3000"
              placeholderTextColor={theme.textMuted}
              keyboardType="numeric"
              value={initialDeposit}
              onChangeText={setInitialDeposit}
              style={[styles.input, { backgroundColor: theme.surfaceSubtle, color: theme.text, borderColor: theme.border }]}
            />

            <View style={styles.modalBtnRow}>
              <Button label="Cancel" variant="outline" onPress={() => setAddMemberModalVisible(false)} style={{ flex: 1 }} />
              <Button label="Add Member" variant="primary" onPress={handleSaveMember} style={{ flex: 1.5 }} />
            </View>
          </CustomCard>
        </View>
      </Modal>
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
  auditGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  auditItem: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(150,150,150,0.2)',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    borderRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 15,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
});
