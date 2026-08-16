import React from 'react';
import { View, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { CustomCard } from '../ui/CustomCard';
import { Typography } from '../ui/Typography';
import { Badge } from '../ui/Badge';
import { Colors } from '../../constants/theme';
import { Member } from '../../types/mess';
import { Plus, Minus, Coffee, Sun, Moon } from 'lucide-react-native';

interface MealEntryCardProps {
  member: Member;
  onUpdateMeal: (memberId: string, type: 'breakfast' | 'lunch' | 'dinner', delta: number) => void;
}

export const MealEntryCard: React.FC<MealEntryCardProps> = ({ member, onUpdateMeal }) => {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  const totalMeals =
    member.meals.breakfast * 0.5 + member.meals.lunch * 1 + member.meals.dinner * 1;

  const mealControls = [
    {
      type: 'breakfast' as const,
      title: 'Breakfast',
      weight: '0.5x',
      count: member.meals.breakfast,
      icon: <Coffee size={16} stroke={theme.warning} />,
    },
    {
      type: 'lunch' as const,
      title: 'Lunch',
      weight: '1.0x',
      count: member.meals.lunch,
      icon: <Sun size={16} stroke={theme.primary} />,
    },
    {
      type: 'dinner' as const,
      title: 'Dinner',
      weight: '1.0x',
      count: member.meals.dinner,
      icon: <Moon size={16} stroke={theme.accent} />,
    },
  ];

  return (
    <CustomCard variant="glass" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.memberInfo}>
          <View style={[styles.avatar, { backgroundColor: theme.primaryLight }]}>
            <Typography variant="h3" color="primary" weight="bold">
              {member.name.charAt(0)}
            </Typography>
          </View>
          <View style={{ marginLeft: 12 }}>
            <Typography variant="subtitle" weight="bold">
              {member.name}
            </Typography>
            <Typography variant="caption" color="textMuted">
              {member.phone || 'Member'}
            </Typography>
          </View>
        </View>

        <Badge label={`${totalMeals} Total Meals`} variant="info" size="md" />
      </View>

      <View style={styles.controlsRow}>
        {mealControls.map((ctrl) => (
          <View key={ctrl.type} style={[styles.mealBox, { backgroundColor: theme.surfaceSubtle }]}>
            <View style={styles.mealHeader}>
              {ctrl.icon}
              <Typography variant="caption" weight="semibold" style={{ marginLeft: 4 }}>
                {ctrl.title}
              </Typography>
            </View>

            <Typography variant="h3" weight="bold" align="center" style={styles.countText}>
              {ctrl.count}
            </Typography>

            <View style={styles.btnRow}>
              <Pressable
                onPress={() => onUpdateMeal(member.id, ctrl.type, -1)}
                style={({ pressed }) => [
                  styles.counterBtn,
                  { backgroundColor: theme.surface, opacity: pressed ? 0.7 : 1 },
                ]}>
                <Minus size={14} stroke={theme.text} />
              </Pressable>

              <Pressable
                onPress={() => onUpdateMeal(member.id, ctrl.type, 1)}
                style={({ pressed }) => [
                  styles.counterBtn,
                  { backgroundColor: theme.primary, opacity: pressed ? 0.7 : 1 },
                ]}>
                <Plus size={14} stroke="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  memberInfo: {
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
  controlsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  mealBox: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  countText: {
    marginVertical: 4,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
