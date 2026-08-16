import React from 'react';
import { ScrollView, View, StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import { useMessData } from '../../hooks/useMessData';
import { MealEntryCard } from '../../components/features/MealEntryCard';
import { CustomCard } from '../../components/ui/CustomCard';
import { Typography } from '../../components/ui/Typography';
import { Badge } from '../../components/ui/Badge';
import { Colors } from '../../constants/theme';
import { Utensils, Calendar } from 'lucide-react-native';

export default function MealsScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const { members, updateMemberMeals, summary } = useMessData();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="h1" weight="bold">
            Meal Management
          </Typography>
          <View style={styles.dateBadge}>
            <Calendar size={14} color={theme.primary} />
            <Typography variant="caption" weight="semibold" color="primary" style={{ marginLeft: 4 }}>
              {today}
            </Typography>
          </View>
        </View>

        {/* Summary Card */}
        <CustomCard variant="accent" accentColor={theme.primary} style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Typography variant="caption" color="textMuted">
                TOTAL MEALS LOGGED
              </Typography>
              <Typography variant="h1" weight="bold" color="primary">
                {summary.totalMeals} <Typography variant="h3" color="textSecondary">Meals</Typography>
              </Typography>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Typography variant="caption" color="textMuted">
                ESTIMATED MEAL RATE
              </Typography>
              <Badge label={`৳${summary.mealRate} / meal`} variant="success" size="md" />
            </View>
          </View>
        </CustomCard>

        {/* Member Meal Cards List */}
        <Typography variant="h2" weight="bold" style={styles.sectionTitle}>
          Member Meal Counters
        </Typography>
        <Typography variant="caption" color="textMuted" style={{ marginBottom: 12 }}>
          Tap + / - to adjust Breakfast (0.5x), Lunch (1.0x), Dinner (1.0x)
        </Typography>

        {members.map((member) => (
          <MealEntryCard
            key={member.id}
            member={member}
            onUpdateMeal={updateMemberMeals}
          />
        ))}
      </ScrollView>
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
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  summaryCard: {
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 16,
  },
});
