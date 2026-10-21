import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import Button from './Button';

export default function EmptyState({
  icon = 'wallet-outline',
  title,
  message,
  actionTitle,
  onAction,
}) {
  return (
    <View style={styles.wrap} accessibilityRole="text" accessibilityLabel={title}>
      <Ionicons name={icon} size={40} color={colors.secondary} />
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionTitle ? (
        <View style={styles.action}>
          <Button title={actionTitle} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  title: {
    marginTop: spacing.md,
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    textAlign: 'center',
  },
  message: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  action: {
    marginTop: spacing.lg,
    alignSelf: 'stretch',
  },
});
