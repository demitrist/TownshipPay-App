import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Card from '../../components/Card';
import ListItem from '../../components/ListItem';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { colors, radii, spacing, typography } from '../../theme';
import { useTransactions } from '../../context/TransactionsContext';
import { formatMoney } from '../../utils/format';
import { formatDay, formatTime } from '../../utils/salesDates';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'synced', label: 'Synced' },
];

// Transaction history list with a status filter (All / Pending / Synced).
export default function HistoryScreen() {
  const { transactions, pendingCount, isLoading } = useTransactions();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? transactions : transactions.filter((t) => t.status === filter)),
    [transactions, filter]
  );

  return (
    <ScreenContainer scroll>
      <View style={styles.filters}>
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              accessibilityRole="button"
              accessibilityLabel={`Show ${f.label} transactions`}
              accessibilityState={{ selected: active }}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.summary}>
        {transactions.length} transaction{transactions.length === 1 ? '' : 's'} · {pendingCount} pending
      </Text>

      {isLoading ? (
        <Text style={styles.summary}>Loading…</Text>
      ) : visible.length === 0 ? (
        <Card>
          <EmptyState
            icon="receipt-outline"
            title={filter === 'all' ? 'No transactions yet' : `No ${filter} transactions`}
            message={
              filter === 'all'
                ? 'Payments, received money and sales will appear here.'
                : 'Try another filter to see your other transactions.'
            }
          />
        </Card>
      ) : (
        visible.map((t) => {
          const credit = t.type === 'credit';
          return (
            <View key={t.id} style={styles.item}>
              <Card padding="sm">
                <ListItem
                  title={t.counterparty}
                  subtitle={`${formatDay(t.createdAt)} · ${formatTime(t.createdAt)}${
                    t.note ? ` · ${t.note}` : ''
                  }`}
                  showChevron={false}
                  left={
                    <Ionicons
                      name={credit ? 'arrow-down-circle-outline' : 'arrow-up-circle-outline'}
                      size={28}
                      color={credit ? colors.success : colors.primary}
                    />
                  }
                  right={
                    <View style={styles.right}>
                      <Text style={[styles.amount, credit && { color: colors.success }]}>
                        {credit ? '+' : '-'}
                        {formatMoney(t.amount)}
                      </Text>
                      <StatusBadge status={t.status === 'synced' ? 'synced' : 'pending'} />
                    </View>
                  }
                />
              </Card>
            </View>
          );
        })
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filters: { flexDirection: 'row', marginBottom: spacing.md },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  chipTextActive: { color: colors.textOnPrimary },
  summary: { color: colors.textMuted, fontSize: typography.sizes.sm, marginBottom: spacing.md },
  item: { marginBottom: spacing.sm },
  right: { alignItems: 'flex-end' },
  amount: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
});
