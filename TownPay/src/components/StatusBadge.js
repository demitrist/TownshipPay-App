import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';

const MAP = {
  pending: { bg: colors.warning, label: 'Pending' },
  synced: { bg: colors.success, label: 'Synced' },
  'low-stock': { bg: colors.lowStock, label: 'Low stock' },
  success: { bg: colors.success, label: 'Success' },
  failed: { bg: colors.danger, label: 'Failed' },
};

export default function StatusBadge({ status = 'pending', label }) {
  const token = MAP[status] || MAP.pending;
  return (
    <View
      style={[styles.badge, { backgroundColor: token.bg }]}
      accessibilityRole="text"
      accessibilityLabel={label || token.label}
    >
      <Text style={styles.text}>{label || token.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
});
