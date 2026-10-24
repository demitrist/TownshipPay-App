import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  leftIcon,
  rightIcon,
  editable = true,
  maxLength,
  autoCapitalize = 'none',
  returnKeyType = 'done',
  onSubmitEditing,
  blurOnSubmit,
}) {
  const [hidden, setHidden] = useState(secureTextEntry);
  const showToggle = secureTextEntry;

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          error && styles.fieldError,
          !editable && styles.fieldDisabled,
        ]}
      >
        {leftIcon ? (
          <Ionicons name={leftIcon} size={18} color={colors.textMuted} style={styles.sideIcon} />
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          editable={editable}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          accessibilityLabel={label || placeholder}
          style={styles.input}
        />
        {showToggle ? (
          <Pressable
            onPress={() => setHidden((v) => !v)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
            style={styles.toggle}
          >
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textMuted} />
          </Pressable>
        ) : rightIcon ? (
          <Ionicons name={rightIcon} size={18} color={colors.textMuted} style={styles.sideIcon} />
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.sm,
  },
  field: {
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldError: {
    borderColor: colors.danger,
  },
  fieldDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: typography.sizes.md,
    paddingVertical: spacing.md,
  },
  sideIcon: {
    marginRight: spacing.sm,
  },
  toggle: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    marginTop: spacing.xs,
    color: colors.danger,
    fontSize: typography.sizes.xs,
  },
});
