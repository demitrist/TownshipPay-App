import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { colors, spacing, typography } from '../../theme';
import { isEmailOrPhone, isValidPassword } from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../navigation/routes';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const identifierError =
    identifier.length > 0 && !isEmailOrPhone(identifier)
      ? 'Use a valid email or phone number.'
      : '';
  const passwordError =
    password.length > 0 && !isValidPassword(password)
      ? 'Password must be at least 6 characters.'
      : '';

  const canSubmit = useMemo(
    () => isEmailOrPhone(identifier) && isValidPassword(password) && !loading,
    [identifier, password, loading],
  );

  async function onSubmit() {
    setFormError('');
    setLoading(true);
    try {
      await login(identifier, password);
      navigation.navigate(ROUTES.PIN, { mode: 'verify' });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer scroll>
      <Text style={styles.kicker}>Welcome back</Text>
      <Text style={styles.title}>Sign in to TownPay</Text>
      <Text style={styles.subtitle}>Use your merchant email or phone number.</Text>

      <Card style={styles.demo}>
        <Text style={styles.demoTitle}>Demo credentials</Text>
        <Text style={styles.demoLine}>Email: demo@townpay.app</Text>
        <Text style={styles.demoLine}>Password: townpay</Text>
        <Text style={styles.demoLine}>PIN: 1234</Text>
      </Card>

      <Input
        label="Email or phone"
        value={identifier}
        onChangeText={setIdentifier}
        placeholder="demo@townpay.app"
        keyboardType="email-address"
        leftIcon="mail-outline"
        error={identifierError}
        returnKeyType="next"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="At least 6 characters"
        secureTextEntry
        leftIcon="lock-closed-outline"
        error={passwordError}
        returnKeyType="done"
        onSubmitEditing={canSubmit ? onSubmit : undefined}
      />
      {formError ? <Text style={styles.error}>{formError}</Text> : null}

      <Button title="Continue" onPress={onSubmit} loading={loading} disabled={!canSubmit} fullWidth />
      <View style={styles.spacer} />
      <Button
        title="Create an account"
        variant="ghost"
        onPress={() => navigation.navigate(ROUTES.REGISTER)}
        fullWidth
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  kicker: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  title: {
    marginTop: spacing.xs,
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.textMuted,
    fontSize: typography.sizes.md,
  },
  demo: {
    marginBottom: spacing.xl,
  },
  demoTitle: {
    color: colors.text,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
  },
  demoLine: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  error: {
    color: colors.danger,
    marginBottom: spacing.md,
  },
  spacer: {
    height: spacing.sm,
  },
});
