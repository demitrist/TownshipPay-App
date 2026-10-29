import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ROUTES } from '../../navigation/routes';
import { colors, spacing, radii, typography } from '../../theme';
import { ScreenContainer, StatusBadge, Button } from '../../components';

const CHECK_SIZE = spacing.xxl * 2 + spacing.xl;

export default function PaymentSuccessScreen({ navigation, route }) {
  const params = route.params || {};
  const amount = params.amount || '0.00';
  const payee = params.payee || 'Unknown';
  const transactionId = params.transactionId;

  return (
    <ScreenContainer>
      <View style={styles.body}>
        <View style={styles.checkCircle}>
          <Text style={styles.check}>✓</Text>
        </View>

        <Text style={styles.title}>Payment sent</Text>
        <Text style={styles.sub}>
          R {amount} to {payee}
        </Text>

        <View style={styles.badgeRow}>
          <StatusBadge status="pending" />
        </View>

        {transactionId ? (
          <Text style={styles.txnId}>Ref: {transactionId}</Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        <Button
          title="View receipt"
          onPress={() =>
            navigation.navigate(ROUTES.RECEIPT, { transactionId })
          }
          disabled={!transactionId}
          fullWidth
        />
        <Button
          title="Done"
          variant="secondary"
          onPress={() => navigation.popToTop()}
          fullWidth
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  checkCircle: {
    width: CHECK_SIZE,
    height: CHECK_SIZE,
    borderRadius: radii.pill,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  check: {
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    color: colors.textOnPrimary,
    textAlign: 'center',
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    textAlign: 'center',
  },
  sub: {
    fontSize: typography.sizes.md,
    color: colors.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  badgeRow: { marginTop: spacing.lg },
  txnId: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: spacing.md,
    fontFamily: 'monospace',
  },
  actions: { gap: spacing.md, paddingBottom: spacing.xl },
});