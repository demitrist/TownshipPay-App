import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';

export default function ListItem({
  title,
  subtitle,
  onPress,
  left,
  right,
  showChevron = true,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={title}
      style={({ pressed }) => [styles.row, pressed && onPress && styles.pressed]}
    >
      {left ? <View style={styles.left}>{left}</View> : null}
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
      {showChevron && onPress ? (
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
  },
  pressed: {
    backgroundColor: colors.background,
  },
  left: {
    marginRight: spacing.md,
  },
  body: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  subtitle: {
    marginTop: 2,
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
  },
});
