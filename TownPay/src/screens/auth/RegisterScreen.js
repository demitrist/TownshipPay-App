import React, { useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors, spacing, typography } from '../../theme';
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhone,
} from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../navigation/routes';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const errors = {
    name: name && !isValidName(name) ? 'Enter at least 2 characters.' : '',
    email: email && !isValidEmail(email) ? 'Enter a valid email.' : '',
    phone: phone && !isValidPhone(phone) ? 'Enter a valid phone number.' : '',
    password: password && !isValidPassword(password) ? 'At least 6 characters.' : '',
    confirm:
      confirmPassword && confirmPassword !== password ? 'Passwords do not match.' : '',
  };

  const canSubmit = useMemo(
    () =>
      isValidName(name) &&
      isValidEmail(email) &&
      isValidPhone(phone) &&
      isValidPassword(password) &&
      password === confirmPassword &&
      !loading,
    [name, email, phone, password, confirmPassword, loading],
  );

  async function onSubmit() {
    setFormError('');
    setLoading(true);
    try {
      await register({ name, email, phone, password, confirmPassword });
      navigation.navigate(ROUTES.PIN, { mode: 'set' });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer scroll>
      <Text style={styles.kicker}>New merchant</Text>
      <Text style={styles.title}>Create your TownPay profile</Text>
      <Text style={styles.subtitle}>Mock signup only — nothing leaves this device.</Text>

      <Input
        label="Full name"
        value={name}
        onChangeText={setName}
        placeholder="Amina Dlamini"
        autoCapitalize="words"
        leftIcon="person-outline"
        error={errors.name}
        returnKeyType="next"
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="amina@shop.co.za"
        keyboardType="email-address"
        leftIcon="mail-outline"
        error={errors.email}
        returnKeyType="next"
      />
      <Input
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholder="0821234567"
        keyboardType="phone-pad"
        leftIcon="call-outline"
        error={errors.phone}
        returnKeyType="next"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="At least 6 characters"
        secureTextEntry
        leftIcon="lock-closed-outline"
        error={errors.password}
        returnKeyType="next"
      />
      <Input
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Re-enter password"
        secureTextEntry
        leftIcon="lock-closed-outline"
        error={errors.confirm}
        returnKeyType="done"
        onSubmitEditing={canSubmit ? onSubmit : undefined}
      />
      {formError ? <Text style={styles.error}>{formError}</Text> : null}
      <Button
        title="Create account"
        onPress={onSubmit}
        loading={loading}
        disabled={!canSubmit}
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
  error: {
    color: colors.danger,
    marginBottom: spacing.md,
  },
});
