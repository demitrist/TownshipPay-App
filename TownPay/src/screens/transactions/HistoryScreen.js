
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, radii } from '../../theme';
import { useTransactions } from '../../context/TransactionsContext';
import { formatMoney } from '../../utils/format';

// Reusable filter choices
function FilterOptions({ title, options, selected, onSelect }) {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.filterLabel}>{title}</Text>

      <View style={styles.chipRow}>
        {options.map((option) => {
          const active = selected === option;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.chip,
                active && styles.activeChip,
              ]}
              onPress={() => onSelect(option)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text
                style={[
                  styles.chipText,
                  active && styles.activeChipText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date';
  }

  return date.toLocaleString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HistoryScreen() {
  const { transactions } = useTransactions();

  // Dropdown visibility
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Selected filters
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All dates');

  // Expanded transaction
  const [expandedId, setExpandedId] = useState(null);

  const activeFilterCount = [
    typeFilter !== 'All',
    statusFilter !== 'All',
    sourceFilter !== 'All',
    dateFilter !== 'All dates',
  ].filter(Boolean).length;

  const resetFilters = () => {
    setTypeFilter('All');
    setStatusFilter('All');
    setSourceFilter('All');
    setDateFilter('All dates');
  };

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    const now = new Date();

    return transactions
      .filter((transaction) => {
        if (
          typeFilter === 'Sent' &&
          transaction.type !== 'debit'
        ) {
          return false;
        }

        if (
          typeFilter === 'Received' &&
          transaction.type !== 'credit'
        ) {
          return false;
        }

        if (
          statusFilter !== 'All' &&
          transaction.status !== statusFilter.toLowerCase()
        ) {
          return false;
        }

        if (
          sourceFilter !== 'All' &&
          transaction.source !== sourceFilter.toLowerCase()
        ) {
          return false;
        }

        if (dateFilter !== 'All dates') {
          const date = new Date(transaction.createdAt);

          if (Number.isNaN(date.getTime())) {
            return false;
          }

          if (dateFilter === 'Today') {
            if (date.toDateString() !== now.toDateString()) {
              return false;
            }
          } else {
            const days = dateFilter === '7 days' ? 7 : 30;
            const cutoff =
              now.getTime() - days * 24 * 60 * 60 * 1000;

            if (
              date.getTime() < cutoff ||
              date.getTime() > now.getTime()
            ) {
              return false;
            }
          }
        }

        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
  }, [
    transactions,
    typeFilter,
    statusFilter,
    sourceFilter,
    dateFilter,
  ]);

  // Calculate totals from filtered transactions
  const totals = useMemo(() => {
    return filteredTransactions.reduce(
      (result, transaction) => {
        if (transaction.type === 'credit') {
          result.received += transaction.amount;
        } else {
          result.sent += transaction.amount;
        }

        return result;
      },
      { sent: 0, received: 0 }
    );
  }, [filteredTransactions]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Heading */}
      <Text style={styles.heading}>
        Transaction History
      </Text>

      <Text style={styles.subtitle}>
        View and filter your TownPay demo payments.
      </Text>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Ionicons
            name="arrow-up-circle-outline"
            size={26}
            color={colors.primary}
          />

          <Text style={styles.summaryLabel}>
            Total Sent
          </Text>

          <Text
            style={styles.summaryAmount}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatMoney(totals.sent)}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Ionicons
            name="arrow-down-circle-outline"
            size={26}
            color={colors.success}
          />

          <Text style={styles.summaryLabel}>
            Total Received
          </Text>

          <Text
            style={[
              styles.summaryAmount,
              { color: colors.success },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatMoney(totals.received)}
          </Text>
        </View>
      </View>

      {/* Collapsible Filters */}
      <View style={styles.filtersCard}>
        <TouchableOpacity
          style={styles.filterHeader}
          onPress={() => setFiltersOpen(!filtersOpen)}
          accessibilityRole="button"
          accessibilityLabel="Show or hide transaction filters"
          accessibilityState={{ expanded: filtersOpen }}
        >
          <View style={styles.filterHeaderLeft}>
            <Ionicons
              name="options-outline"
              size={24}
              color={colors.primary}
            />

            <Text style={styles.filterTitle}>
              Filters
            </Text>

            {activeFilterCount > 0 && (
              <View style={styles.filterCount}>
                <Text style={styles.filterCountText}>
                  {activeFilterCount}
                </Text>
              </View>
            )}
          </View>

          <Ionicons
            name={
              filtersOpen
                ? 'chevron-up-outline'
                : 'chevron-down-outline'
            }
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>

        {/* Dropdown content */}
        {filtersOpen && (
          <View style={styles.filterContent}>
            <FilterOptions
              title="Transaction Type"
              options={['All', 'Sent', 'Received']}
              selected={typeFilter}
              onSelect={setTypeFilter}
            />

            <FilterOptions
              title="Payment Status"
              options={['All', 'Pending', 'Synced']}
              selected={statusFilter}
              onSelect={setStatusFilter}
            />

            <FilterOptions
              title="Payment Source"
              options={[
                'All',
                'QR',
                'Send',
                'Receive',
                'Sale',
              ]}
              selected={sourceFilter}
              onSelect={setSourceFilter}
            />

            <FilterOptions
              title="Date"
              options={[
                'All dates',
                'Today',
                '7 days',
                '30 days',
              ]}
              selected={dateFilter}
              onSelect={setDateFilter}
            />

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetFilters}
            >
              <Ionicons
                name="refresh-outline"
                size={18}
                color={colors.primary}
              />

              <Text style={styles.resetText}>
                Reset Filters
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Transaction list heading */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>
          Transactions
        </Text>

        <Text style={styles.countText}>
          {filteredTransactions.length} found
        </Text>
      </View>

      {/* Transaction List */}
      {filteredTransactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons
            name="receipt-outline"
            size={44}
            color={colors.textMuted}
          />

          <Text style={styles.emptyTitle}>
            No transactions found
          </Text>

          <Text style={styles.emptyDescription}>
            Try changing your filters or record a new
            demo payment.
          </Text>

          {activeFilterCount > 0 && (
            <TouchableOpacity
              style={styles.emptyResetButton}
              onPress={resetFilters}
            >
              <Text style={styles.emptyResetText}>
                Clear Filters
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.transactionsCard}>
          {filteredTransactions.map((transaction, index) => {
            const isCredit = transaction.type === 'credit';
            const isSynced = transaction.status === 'synced';
            const isExpanded = expandedId === transaction.id;

            return (
              <View
                key={transaction.id}
                style={[
                  styles.transactionItem,
                  index !== filteredTransactions.length - 1 &&
                    styles.divider,
                ]}
              >
                <TouchableOpacity
                  style={styles.transactionRow}
                  onPress={() =>
                    setExpandedId(
                      isExpanded ? null : transaction.id
                    )
                  }
                  accessibilityRole="button"
                >
                  <View style={styles.transactionIcon}>
                    <Ionicons
                      name={
                        isCredit
                          ? 'arrow-down-outline'
                          : 'arrow-up-outline'
                      }
                      size={23}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.transactionInfo}>
                    <Text
                      style={styles.transactionName}
                      numberOfLines={1}
                    >
                      {transaction.counterparty}
                    </Text>

                    <Text style={styles.transactionDate}>
                      {formatDate(transaction.createdAt)}
                    </Text>

                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: isSynced
                            ? colors.statusSynced
                            : colors.statusPending,
                        },
                      ]}
                    >
                      {isSynced ? '● Synced' : '● Pending'}
                    </Text>
                  </View>

                  <View style={styles.amountColumn}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        {
                          color: isCredit
                            ? colors.success
                            : colors.text,
                        },
                      ]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {isCredit ? '+' : '-'}
                      {formatMoney(transaction.amount)}
                    </Text>

                    <Ionicons
                      name={
                        isExpanded
                          ? 'chevron-up-outline'
                          : 'chevron-down-outline'
                      }
                      size={17}
                      color={colors.textMuted}
                    />
                  </View>
                </TouchableOpacity>

                {/* Expandable transaction details */}
                {isExpanded && (
                  <View style={styles.detailsCard}>
                    <Text style={styles.detailsTitle}>
                      Transaction Details
                    </Text>

                    <Text style={styles.detailText}>
                      Type: {isCredit ? 'Received' : 'Sent'}
                    </Text>

                    <Text style={styles.detailText}>
                      Source: {transaction.source}
                    </Text>

                    <Text style={styles.detailText}>
                      Status: {transaction.status}
                    </Text>

                    <Text style={styles.detailText}>
                      Reference: {transaction.id}
                    </Text>

                    {transaction.note ? (
                      <Text style={styles.detailText}>
                        Note: {transaction.note}
                      </Text>
                    ) : null}

                    {transaction.syncedAt ? (
                      <Text style={styles.detailText}>
                        Synced: {formatDate(transaction.syncedAt)}
                      </Text>
                    ) : null}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      <Text style={styles.disclaimer}>
        Demo transactions only. No real money is transferred.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  heading: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },

  summaryLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },

  summaryAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },

  filtersCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },

  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },

  filterHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  filterTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },

  filterCount: {
    backgroundColor: colors.primary,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },

  filterCountText: {
    color: colors.textOnPrimary,
    fontSize: 12,
    fontWeight: '700',
  },

  filterContent: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.lg,
  },

  filterGroup: {
    marginBottom: spacing.lg,
  },

  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  chip: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },

  activeChipText: {
    color: colors.textOnPrimary,
  },

  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
  },

  resetText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
  },

  countText: {
    fontSize: 13,
    color: colors.textMuted,
  },

  transactionsCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.lg,
  },

  transactionItem: {
    paddingVertical: spacing.md,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: radii.lg,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },

  transactionInfo: {
    flex: 1,
  },

  transactionName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },

  transactionDate: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: spacing.xs,
  },

  amountColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    maxWidth: 125,
    gap: spacing.sm,
  },

  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
  },

  detailsCard: {
    backgroundColor: colors.background,
    borderRadius: radii.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  detailsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },

  detailText: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },

  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },

  emptyDescription: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },

  emptyResetButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  emptyResetText: {
    color: colors.textOnPrimary,
    fontWeight: '700',
  },

  disclaimer: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xl,
  },
});
