import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, radii } from '../../theme';
import { useTransactions } from '../../context/TransactionsContext';
import { formatMoney } from '../../utils/format';
import { ROUTES, TABS } from '../../navigation/routes';
import ListItem from '../../components/ListItem';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import Card from '../../components/Card';
import Divider from '../../components/Divider';

const FILTERS = {
  ALL: 'all',
  SENT: 'sent',
  RECEIVED: 'received',
  PENDING: 'pending',
  SYNCED: 'synced',
};

export default function HistoryScreen({ navigation }) {
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState(FILTERS.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply filter
    if (filter === FILTERS.SENT) {
      filtered = filtered.filter((t) => t.type === 'debit');
    } else if (filter === FILTERS.RECEIVED) {
      filtered = filtered.filter((t) => t.type === 'credit');
    } else if (filter === FILTERS.PENDING) {
      filtered = filtered.filter((t) => t.status === 'pending');
    } else if (filter === FILTERS.SYNCED) {
      filtered = filtered.filter((t) => t.status === 'synced');
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.counterparty?.toLowerCase().includes(query) ||
          t.note?.toLowerCase().includes(query) ||
          t.id?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [transactions, filter, searchQuery]);

  const handleTransactionPress = (transaction) => {
    navigation.navigate(TABS.QR, {
      screen: ROUTES.RECEIPT,
      params: { transactionId: transaction.id },
    });
  };

  const renderFilterButton = (filterKey, label) => {
    const isActive = filter === filterKey;
    return (
      <TouchableOpacity
        key={filterKey}
        style={[
          styles.filterButton,
          isActive && styles.filterButtonActive,
        ]}
        onPress={() => setFilter(filterKey)}
      >
        <Text
          style={[
            styles.filterButtonText,
            isActive && styles.filterButtonTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, reference, or note"
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {renderFilterButton(FILTERS.ALL, 'All')}
        {renderFilterButton(FILTERS.SENT, 'Sent')}
        {renderFilterButton(FILTERS.RECEIVED, 'Received')}
        {renderFilterButton(FILTERS.PENDING, 'Pending')}
        {renderFilterButton(FILTERS.SYNCED, 'Synced')}
      </ScrollView>

      {/* Transaction List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTransactions.length === 0 ? (
          <EmptyState
            icon="receipt-outline"
            title={
              searchQuery
                ? 'No matching transactions'
                : 'No transactions yet'
            }
            message={
              searchQuery
                ? 'Try a different search term or filter.'
                : 'Your payment history will appear here.'
            }
          />
        ) : (
          filteredTransactions.map((transaction, index) => (
            <View key={transaction.id}>
              <Card padding="sm">
                <ListItem
                  title={transaction.counterparty || 'Unknown'}
                  subtitle={
                    transaction.note
                      ? transaction.note
                      : transaction.source
                      ? transaction.source.charAt(0).toUpperCase() +
                        transaction.source.slice(1)
                      : 'Payment'
                  }
                  showChevron
                  onPress={() => handleTransactionPress(transaction)}
                  right={
                    <View style={styles.rightContent}>
                      <Text
                        style={[
                          styles.amount,
                          transaction.type === 'credit'
                            ? styles.amountCredit
                            : styles.amountDebit,
                        ]}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}
                        {formatMoney(transaction.amount)}
                      </Text>
                      <StatusBadge status={transaction.status} />
                    </View>
                  }
                />
              </Card>
              {index < filteredTransactions.length - 1 && (
                <View style={styles.dividerSpacer}>
                  <Divider />
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: spacing.xs,
  },
  filterScroll: {
    marginTop: spacing.md,
  },
  filterContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.textOnPrimary,
  },
  list: {
    flex: 1,
    marginTop: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  dividerSpacer: {
    marginVertical: spacing.sm,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  amountCredit: {
    color: colors.success,
  },
  amountDebit: {
    color: colors.text,
  },
});
