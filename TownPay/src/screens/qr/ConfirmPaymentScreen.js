import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ROUTES } from '../../navigation/routes';
import { colors, spacing, typography } from '../../theme';
import { ScreenContainer, Card, Divider, Button } from '../../components';
import { useTransactions } from '../../context/TransactionsContext';

const VALID_SOURCES = ['qr', 'send', 'receive', 'sale'];

export default function ConfirmPaymentScreen({ navigation, route }) {
  const { addTransaction } = useTransactions();
  const amount = route.params?.amount || '0.00';
  const payee = route.params?.payee || 'Unknown';
  const source = VALID_SOURCES.includes(route.params?.source)
    ? route.params.source
    : 'qr';
  const [submitting, setSubmitting] = useState(false);

  function confirm() {
    if (submitting) return;
    setSubmitting(true);

    const txn = addTransaction({
      type: 'debit',
      amount: Number(amount),
      status: 'pending',
      source,
      counterparty: payee,
    });

    // replace → back button won't return here (avoids double-charge)
    navigation.replace(ROUTES.PAYMENT_SUCCESS, {
      amount,
      payee,
      transactionId: txn.id,
    });
  }

  return (
    <ScreenContainer scroll>
      <Text style={styles.title}>Confirm payment</Text>

      <Card>
        <Text style={styles.label}>Paying</Text>
        <Text style={styles.payee}>{payee}</Text>
        <Divider />
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.amount}>R {amount}</Text>
        <Divider />
        <Text style={styles.label}>Source</Text>
        <Text style={styles.value}>{source}</Text>
      </Card>

      <View style={styles.actions}>
        <Button
          title={`Pay R ${amount}`}
          onPress={confirm}
          loading={submitting}
          disabled={submitting}
          fullWidth
        />
        <Button
          title="Cancel"
          variant="ghost"
          onPress={() => navigation.goBack()}
          fullWidth
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  payee: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  amount: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginTop: spacing.xs,
  },
  value: {
    fontSize: typography.sizes.md,
    color: colors.text,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },
  actions: { marginTop: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxl },
});