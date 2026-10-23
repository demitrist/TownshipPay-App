import React from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import { TABS, ROUTES } from '../../navigation/routes';
import { colors, spacing, typography } from '../../theme';
import {
  ScreenContainer,
  Card,
  Divider,
  StatusBadge,
  Button,
  EmptyState,
} from '../../components';
import { useTransactions } from '../../context/TransactionsContext';

export default function ReceiptScreen({ navigation, route }) {
  const { getTransactionById } = useTransactions();
  const txn = getTransactionById(route.params?.transactionId);

  if (!txn) {
    return (
      <ScreenContainer scroll>
        <EmptyState
          icon="receipt-outline"
          title="Receipt not found"
          message="This transaction isn't in the mock wallet — it may have been cleared."
          actionTitle="Back to history"
          onAction={() =>
            navigation.navigate(TABS.HISTORY, { screen: ROUTES.HISTORY })
          }
        />
      </ScreenContainer>
    );
  }

  const dateLabel = txn.createdAt
    ? new Date(txn.createdAt).toLocaleString()
    : '—';

  const shareReceipt = () => {
    Share.share({
      message:
        `Payment receipt\n` +
        `Ref: ${txn.id}\n` +
        `To: ${txn.counterparty ?? '—'}\n` +
        `Amount: R ${txn.amount}\n` +
        `Status: ${txn.status}\n` +
        `Date: ${dateLabel}`,
    });
  };

  return (
    <ScreenContainer scroll>
      <Text style={styles.header}>Receipt</Text>

      <View style={styles.amountBox}>
        <Text style={styles.amount}>R {txn.amount}</Text>
        <View style={styles.badgeWrap}>
          <StatusBadge status={txn.status} />
        </View>
      </View>

      <Card>
        <Row label="Paid to" value={txn.counterparty ?? '—'} />
        <Divider />
        <Row label="Reference" value={String(txn.id)} />
        <Divider />
        <Row label="Source" value={txn.source ?? '—'} />
        <Divider />
        <Row label="Date" value={dateLabel} />
      </Card>

      <View style={styles.actions}>
        <Button title="Share receipt" onPress={shareReceipt} fullWidth />
        <Button
          title="Back to history"
          variant="outline"
          onPress={() =>
            navigation.navigate(TABS.HISTORY, { screen: ROUTES.HISTORY })
          }
          fullWidth
        />
        <Button
          title="Done"
          variant="ghost"
          onPress={() => navigation.popToTop()}
          fullWidth
        />
      </View>
    </ScreenContainer>
  );
}

// Row relies on Divider (marginVertical: spacing.md) for vertical spacing,
// so no paddingVertical here — otherwise the gap balloons to ~48px.
function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  amountBox: { alignItems: 'center', marginBottom: spacing.xl },
  amount: {
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
  },
  badgeWrap: { marginTop: spacing.sm },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: typography.sizes.md,
    color: colors.textMuted,
  },
  rowValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    maxWidth: '60%',
    textAlign: 'right',
  },
  actions: { marginTop: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxl },
});