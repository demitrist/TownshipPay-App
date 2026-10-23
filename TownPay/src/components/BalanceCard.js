import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { formatMoney } from '../utils/format';

/** Layout helper Christopher can reuse on Home. */
export default function BalanceCard({ label = 'Available balance', amount = 0, footer }) {
  return (
    <View style={styles.card} accessibilityRole="summary" accessibilityLabel={`${label} ${amount}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.amount}>{formatMoney(amount)}</Text>
      {footer ? <Text style={styles.footer}>{footer}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.xl,
  },
  label: {
    color: colors.textOnPrimary,
    opacity: 0.9,
    fontSize: typography.sizes.sm,
  },
  amount: {
    marginTop: spacing.sm,
    color: colors.textOnPrimary,
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
  },
  footer: {
    marginTop: spacing.md,
    color: colors.textOnPrimary,
    opacity: 0.85,
    fontSize: typography.sizes.sm,
  },
});
