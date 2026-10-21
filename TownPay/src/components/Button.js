import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';

const HEIGHT = { sm: 44, md: 48, lg: 56 };

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
}) {
  const isDisabled = disabled || loading;
  const palette = variantStyles[variant] || variantStyles.primary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        { minHeight: HEIGHT[size] || HEIGHT.md, backgroundColor: palette.bg, borderColor: palette.border },
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && { opacity: 0.88, transform: [{ scale: 0.99 }] },
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <View style={styles.row}>
          {icon ? (
            <Ionicons
              name={icon}
              size={18}
              color={palette.fg}
              style={styles.icon}
            />
          ) : null}
          <Text style={[styles.label, { color: palette.fg }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const variantStyles = {
  primary: { bg: colors.primary, fg: colors.textOnPrimary, border: colors.primary },
  secondary: { bg: colors.secondary, fg: colors.textOnPrimary, border: colors.secondary },
  outline: { bg: colors.surface, fg: colors.primary, border: colors.primary },
  danger: { bg: colors.danger, fg: colors.textOnPrimary, border: colors.danger },
  ghost: { bg: colors.transparent, fg: colors.primary, border: colors.transparent },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  disabled: {
    opacity: 0.45,
  },
});
