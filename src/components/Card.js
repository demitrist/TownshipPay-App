import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radii, shadows, spacing } from '../theme';

const PADDING = {
  none: 0,
  sm: spacing.sm,
  md: spacing.lg,
  lg: spacing.xl,
};

export default function Card({
  children,
  onPress,
  style,
  padding = 'md',
  elevated = true,
}) {
  const content = (
    <View
      style={[
        styles.card,
        elevated && shadows.card,
        { padding: PADDING[padding] ?? PADDING.md },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.92,
  },
});
