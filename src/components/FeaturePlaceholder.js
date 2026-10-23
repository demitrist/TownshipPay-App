import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import ScreenContainer from './ScreenContainer';
import Button from './Button';
import Card from './Card';
import StatusBadge from './StatusBadge';

export default function FeaturePlaceholder({
  title,
  owner,
  bullets = [],
  actions = [],
  params,
}) {
  return (
    <ScreenContainer scroll>
      <Text style={styles.kicker}>Placeholder screen</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.ownerRow}>
        <StatusBadge status="pending" label={`Owner: ${owner}`} />
      </View>
      <Card>
        <Text style={styles.section}>What to build</Text>
        {bullets.map((item) => (
          <Text key={item} style={styles.bullet}>
            • {item}
          </Text>
        ))}
      </Card>
      {params && Object.keys(params).length > 0 ? (
        <Card style={styles.gap}>
          <Text style={styles.section}>Route params received</Text>
          <Text style={styles.mono}>{JSON.stringify(params, null, 2)}</Text>
        </Card>
      ) : null}
      <View style={styles.actions}>
        {actions.map((action) => (
          <Button
            key={action.title}
            title={action.title}
            onPress={action.onPress}
            variant={action.variant || 'primary'}
            fullWidth
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  kicker: {
    color: colors.primary,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: spacing.xs,
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  ownerRow: {
    marginVertical: spacing.md,
  },
  section: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
  },
  bullet: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 22,
  },
  gap: {
    marginTop: spacing.md,
  },
  mono: {
    color: colors.text,
    fontSize: typography.sizes.xs,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
});
