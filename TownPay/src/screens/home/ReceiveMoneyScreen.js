import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing, radii } from '../../theme';
import { ROUTES } from '../../navigation/routes';
import BalanceCard from '../../components/BalanceCard';
import { useTransactions } from '../../context/TransactionsContext';
import { formatMoney } from '../../utils/format';

export default function HomeScreen({ navigation }) {
  const {
    transactions,
    balance,
    isOnline,
    toggleOnline,
    syncPendingTransactions,
    pendingCount,
  } = useTransactions();

  const recentTransactions = transactions.slice(0, 4);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>
          Welcome to TownPay
        </Text>

        <Text style={styles.subtitle}>
          Manage your payments and track your business.
        </Text>
      </View>

      {/* Balance Card */}
      <BalanceCard
        label="Demo Balance"
        amount={balance}
        footer="Your simulated TownPay wallet"
      />

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate(ROUTES.SEND_MONEY)
          }
        >
          <View style={styles.actionIcon}>
            <Ionicons
              name="arrow-up-outline"
              size={26}
              color={colors.primary}
            />
          </View>

          <Text style={styles.actionText}>
            Send Money
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate(ROUTES.RECEIVE_MONEY)
          }
        >
          <View style={styles.actionIcon}>
            <Ionicons
              name="arrow-down-outline"
              size={26}
              color={colors.primary}
            />
          </View>

          <Text style={styles.actionText}>
            Receive Money
          </Text>
        </TouchableOpacity>
      </View>

      {/* Online / Offline Status */}
      <Text style={styles.sectionTitle}>
        Connection Status
      </Text>

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusInfo}>
            <Ionicons
              name={
                isOnline
                  ? 'wifi-outline'
                  : 'cloud-offline-outline'
              }
              size={24}
              color={
                isOnline
                  ? colors.onlineBanner
                  : colors.offlineBanner
              }
            />

            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>
                {isOnline
                  ? 'Online Mode'
                  : 'Offline Mode'}
              </Text>

              <Text style={styles.statusDescription}>
                {isOnline
                  ? 'Mock payments can be synced.'
                  : 'New mock payments will be pending.'}
              </Text>
            </View>
          </View>

          <Switch
            value={isOnline}
            onValueChange={toggleOnline}
            trackColor={{
              false: colors.border,
              true: colors.secondary,
            }}
            thumbColor={colors.surface}
          />
        </View>

        {/* Sync Pending Transactions */}
        <View style={styles.syncSection}>
          <Text style={styles.pendingText}>
            {pendingCount} pending transaction(s)
          </Text>

          <TouchableOpacity
            style={[
              styles.syncButton,
              (!isOnline || pendingCount === 0) &&
                styles.disabledButton,
            ]}
            onPress={syncPendingTransactions}
            disabled={!isOnline || pendingCount === 0}
          >
            <Ionicons
              name="sync-outline"
              size={18}
              color={colors.textOnPrimary}
            />

            <Text style={styles.syncButtonText}>
              Sync Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <Text style={styles.sectionTitle}>
        Recent Transactions
      </Text>

      <View style={styles.transactionCard}>
        {recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="receipt-outline"
              size={40}
              color={colors.textMuted}
            />

            <Text style={styles.emptyTitle}>
              No transactions yet
            </Text>

            <Text style={styles.emptyDescription}>
              Your recent payments will appear here.
            </Text>
          </View>
        ) : (
          recentTransactions.map(
            (transaction, index) => (
              <View
                key={transaction.id}
                style={[
                  styles.transactionRow,
                  index !==
                    recentTransactions.length - 1 &&
                    styles.transactionDivider,
                ]}
              >
                <View style={styles.transactionIcon}>
                  <Ionicons
                    name={
                      transaction.type === 'credit'
                        ? 'arrow-down-outline'
                        : 'arrow-up-outline'
                    }
                    size={22}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.transactionDetails}>
                  <Text
                    style={styles.transactionName}
                    numberOfLines={1}
                  >
                    {transaction.counterparty}
                  </Text>

                  <Text
                    style={[
                      styles.transactionStatus,
                      {
                        color:
                          transaction.status === 'synced'
                            ? colors.statusSynced
                            : colors.statusPending,
                      },
                    ]}
                  >
                    {transaction.status === 'synced'
                      ? 'Synced'
                      : 'Pending'}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.transactionAmount,
                    {
                      color:
                        transaction.type === 'credit'
                          ? colors.success
                          : colors.text,
                    },
                  ]}
                >
                  {transaction.type === 'credit'
                    ? '+'
                    : '-'}
                  {formatMoney(transaction.amount)}
                </Text>
              </View>
            )
          )
        )}
      </View>

      {/* Demo Disclaimer */}
      <Text style={styles.disclaimer}>
        Demo application only. No real money is transferred.
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

  welcomeSection: {
    marginBottom: spacing.xl,
  },

  greeting: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  actionButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  actionIcon: {
    backgroundColor: colors.background,
    width: 54,
    height: 54,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  actionText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },

  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statusInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },

  statusDescription: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  syncSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pendingText: {
    fontSize: 13,
    color: colors.textMuted,
    flex: 1,
  },

  syncButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  disabledButton: {
    opacity: 0.45,
  },

  syncButtonText: {
    color: colors.textOnPrimary,
    fontWeight: '600',
    fontSize: 13,
  },

  transactionCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },

  transactionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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

  transactionDetails: {
    flex: 1,
  },

  transactionName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  transactionStatus: {
    fontSize: 12,
    marginTop: spacing.xs,
  },

  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.md,
  },

  emptyDescription: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
  },

  disclaimer: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 11,
    marginTop: spacing.xl,
  },
});
